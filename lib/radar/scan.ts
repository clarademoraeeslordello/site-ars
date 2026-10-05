import "server-only";
import { randomUUID } from "node:crypto";
import { and, desc, eq, gt, inArray } from "drizzle-orm";
import { getDb } from "@/db/client";
import { radarArticles, radarDeliverables, radarScans, radarStandards } from "@/db/schema";
import { sendReviewDigest } from "@/lib/email";
import { RADAR_CATALOG, catalogByKey } from "./catalog";
import { DB_LOCALES, toMarkdown } from "./content";
import { writeDraft } from "./draft";
import { fetchCatalogDeliverables, isoStandardUrl, type IsoDeliverable } from "./iso-open-data";
import { formatStage, isCancelled, isMilestone, lifecycleFor, type Lifecycle } from "./stages";

/** Upper bound on Claude drafts per scan, so a burst of ISO changes cannot run up the bill. */
const MAX_DRAFTS_PER_SCAN = 20;
/** On the first scan there is no previous state to diff against: draft what happened recently. */
const SEED_WINDOW_MONTHS = 24;

type Event = { deliverable: IsoDeliverable; stageFrom: number | null; changeKind: string };

export type ScanResult = { scanId: string; checked: number; changes: number; drafted: number; failed: number };

const DRAFT_LOCALE = { "pt-BR": "pt-br", en: "en", es: "es" } as const;

const STANDARD_STATUS: Record<Lifecycle, string> = {
  published: "published",
  under_review: "under_review",
  transition: "in_transition",
  withdrawn: "withdrawn",
};

function changeKindFor(stage: number, isNew: boolean) {
  if (stage === 6060) return "published";
  if (stage >= 9500) return "withdrawn";
  if (stage === 9092) return "to_be_revised";
  if (stage === 9093) return "confirmed";
  return isNew ? "new_project" : "stage_change";
}

const isSupplement = (reference: string) => /\/(Amd|DAmd|CD Amd|Cor)\b/.test(reference);

/** radar_articles.category (fixed set in the schema) for a detected change. */
function categoryFor(changeKind: string, d: IsoDeliverable, replacesEdition: boolean) {
  if (changeKind === "withdrawn") return "withdrawal";
  if (isSupplement(d.reference)) return "amendment";
  if (changeKind === "published") return replacesEdition ? "new_edition" : "new_standard";
  return "revision";
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function runScan(): Promise<ScanResult> {
  const db = getDb();

  // One scan at a time (cron and the admin button can overlap). Rows still "running" after
  // 20 minutes are treated as crashed runs and do not block.
  const [running] = await db
    .select({ id: radarScans.id })
    .from(radarScans)
    .where(and(eq(radarScans.status, "running"), gt(radarScans.startedAt, new Date(Date.now() - 20 * 60_000))))
    .limit(1);
  if (running) throw new Error("A scan is already running");

  const [scan] = await db.insert(radarScans).values({}).returning({ id: radarScans.id });

  try {
    const fetched = await fetchCatalogDeliverables();
    const byId = new Map(fetched.map((d) => [d.isoId, d]));
    const stored = await db.select().from(radarDeliverables);
    const previous = new Map(stored.map((d) => [d.isoId, d]));
    const firstRun = stored.length === 0;
    const now = new Date();
    const seedSince = new Date(now);
    seedSince.setMonth(seedSince.getMonth() - SEED_WINDOW_MONTHS);

    const events: Event[] = [];
    for (const d of fetched) {
      const prev = previous.get(d.isoId);
      if (firstRun) {
        const recentlyPublished = d.stage === 6060 && d.publicationDate && new Date(d.publicationDate) >= seedSince;
        const inDevelopment = d.stage >= 2000 && d.stage < 6000 && !isCancelled(d.stage);
        if (recentlyPublished || inDevelopment) {
          events.push({ deliverable: d, stageFrom: null, changeKind: changeKindFor(d.stage, true) });
        }
      } else if (!prev) {
        if (!isCancelled(d.stage) && d.stage < 9500) {
          events.push({ deliverable: d, stageFrom: null, changeKind: changeKindFor(d.stage, true) });
        }
      } else if (prev.stage !== d.stage && isMilestone(d.stage) && !isCancelled(d.stage)) {
        events.push({ deliverable: d, stageFrom: prev.stage, changeKind: changeKindFor(d.stage, false) });
      }
    }

    // Published articles are re-verified on every scan: the date shown on the site is real.
    const verifiedIds = fetched.map((d) => d.isoId);
    if (verifiedIds.length) {
      await db
        .update(radarArticles)
        .set({ verifiedAt: now })
        .where(and(eq(radarArticles.status, "published"), inArray(radarArticles.isoId, verifiedIds)));
    }

    let drafted = 0;
    let failed = 0;
    const createdTitles: string[] = [];
    // Changes whose draft failed or did not fit in this run keep their old stored state, so the
    // next scan sees the same change again and retries it instead of losing it.
    const unresolved = new Set(events.slice(MAX_DRAFTS_PER_SCAN).map((e) => e.deliverable.isoId));

    for (const event of events.slice(0, MAX_DRAFTS_PER_SCAN)) {
      const d = event.deliverable;
      // One article per (document, stage): reruns and archived drafts do not come back.
      const existing = await db
        .select({ id: radarArticles.id })
        .from(radarArticles)
        .where(and(eq(radarArticles.isoId, d.isoId), eq(radarArticles.stageTo, d.stage)))
        .limit(1);
      if (existing.length) continue;

      const entry = catalogByKey(d.family);
      const replaced = d.replaces.map((id) => byId.get(id)).find((x) => x && !isSupplement(x.reference)) ?? null;
      try {
        const content = await writeDraft({
          standardName: entry?.name ?? d.reference,
          changeKind: event.changeKind,
          deliverable: d,
          stageFrom: event.stageFrom,
          previous: replaced,
        });

        let slug = slugify(d.reference);
        const taken = await db.select({ id: radarArticles.id }).from(radarArticles).where(eq(radarArticles.slug, slug)).limit(1);
        if (taken.length) slug = `${slug}-${slugify(formatStage(d.stage))}`;

        const shared = {
          groupId: randomUUID(),
          slug,
          category: categoryFor(event.changeKind, d, Boolean(replaced)),
          standards: [entry?.name ?? d.reference],
          standardStatus: STANDARD_STATUS[lifecycleFor(d.stage, Boolean(replaced))],
          sourceUrl: isoStandardUrl(d.isoId),
          sourceTitle: `${d.reference} · ISO.org`,
          sourceDate: d.publicationDate,
          verifiedAt: now,
          status: "draft",
          scanId: scan.id,
          isoId: d.isoId,
          reference: d.reference,
          changeKind: event.changeKind,
          stageFrom: event.stageFrom,
          stageTo: d.stage,
        };
        await db.insert(radarArticles).values(
          DB_LOCALES.map((locale) => {
            const body = content[DRAFT_LOCALE[locale]];
            return { ...shared, locale, title: body.title, summary: body.summary, bodyMd: toMarkdown(body, locale) };
          })
        );
        drafted++;
        createdTitles.push(content["pt-br"].title);
      } catch (err) {
        failed++;
        unresolved.add(d.isoId);
        console.error(`[radar] draft failed for ${d.reference}`, err);
      }
    }

    for (const d of fetched) {
      if (unresolved.has(d.isoId)) continue;
      const row = {
        family: d.family,
        reference: d.reference,
        titleEn: d.titleEn,
        stage: d.stage,
        publicationDate: d.publicationDate,
        edition: d.edition,
        replaces: d.replaces,
        replacedBy: d.replacedBy,
        lastCheckedAt: now,
      };
      await db
        .insert(radarDeliverables)
        .values({ isoId: d.isoId, ...row })
        .onConflictDoUpdate({ target: radarDeliverables.isoId, set: row });
    }

    await syncStandards(fetched, now);

    await db
      .update(radarScans)
      .set({ finishedAt: new Date(), standardsChecked: fetched.length, changesFound: events.length, status: "ok" })
      .where(eq(radarScans.id, scan.id));

    if (drafted > 0) {
      await sendReviewDigest(createdTitles).catch((err) => console.error("[radar] digest email failed", err));
    }

    return { scanId: scan.id, checked: fetched.length, changes: events.length, drafted, failed };
  } catch (err) {
    await db
      .update(radarScans)
      .set({ finishedAt: new Date(), status: "failed", error: err instanceof Error ? err.message : String(err) })
      .where(eq(radarScans.id, scan.id));
    throw err;
  }
}

/** Keeps radar_standards (one row per monitored standard) in step with the catalog and ISO data. */
async function syncStandards(fetched: IsoDeliverable[], now: Date) {
  const db = getDb();
  for (const entry of RADAR_CATALOG) {
    const docs = fetched.filter((d) => d.family === entry.key && !isSupplement(d.reference));
    if (!docs.length) continue;
    const current = docs
      .filter((d) => d.stage >= 6000 && d.stage < 9500)
      .sort((a, b) => (b.publicationDate ?? "").localeCompare(a.publicationDate ?? ""))[0];
    const inDevelopment = docs.find((d) => d.stage >= 2000 && d.stage < 6000 && !isCancelled(d.stage));
    const shown = inDevelopment ?? current ?? docs[0];
    const row = {
      title: current?.titleEn ?? null,
      isoUrl: isoStandardUrl((current ?? shown).isoId),
      lastEdition: current?.reference ?? null,
      lastStage: formatStage(shown.stage),
      lastCheckedAt: now,
      updatedAt: now,
    };
    await db
      .insert(radarStandards)
      .values({ code: entry.name, ...row })
      .onConflictDoUpdate({ target: radarStandards.code, set: row });
  }
}

export async function latestScan() {
  const [row] = await getDb().select().from(radarScans).orderBy(desc(radarScans.startedAt)).limit(1);
  return row ?? null;
}
