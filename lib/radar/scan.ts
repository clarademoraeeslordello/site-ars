import "server-only";
import { and, desc, eq, gt, inArray, isNull } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import { catalogByKey } from "./catalog";
import { writeDraft } from "./draft";
import { fetchCatalogDeliverables, isoStandardUrl, type IsoDeliverable } from "./iso-open-data";
import { formatStage, isCancelled, isMilestone, lifecycleFor } from "./stages";
import { sendReviewDigest } from "@/lib/email";

const { radarDeliverables, radarArticles, radarScans } = schema;

/** Upper bound on Claude drafts per scan, so a burst of ISO changes cannot run up the bill. */
const MAX_DRAFTS_PER_SCAN = 20;
/** On the first scan there is no previous state to diff against: draft what happened recently. */
const SEED_WINDOW_MONTHS = 24;

type Event = { deliverable: IsoDeliverable; stageFrom: number | null; changeKind: string };

export type ScanResult = { scanId: number; checked: number; changes: number; drafted: number; failed: number };

function changeKindFor(stage: number, isNew: boolean) {
  if (stage === 6060) return "published";
  if (stage >= 9500) return "withdrawn";
  if (stage === 9092) return "to_be_revised";
  if (stage === 9093) return "confirmed";
  return isNew ? "new_project" : "stage_change";
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
  // One scan at a time (cron and the admin button can overlap). Unfinished rows older than
  // 20 minutes are treated as crashed runs and do not block.
  const [running] = await db
    .select({ id: radarScans.id })
    .from(radarScans)
    .where(and(isNull(radarScans.finishedAt), gt(radarScans.startedAt, new Date(Date.now() - 20 * 60_000))))
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

    const events: Event[] = [];
    const seedSince = new Date(now);
    seedSince.setMonth(seedSince.getMonth() - SEED_WINDOW_MONTHS);

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
        .set({ lastVerifiedAt: now })
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
      // One article per (document, stage): reruns and discarded drafts do not come back.
      const existing = await db
        .select({ id: radarArticles.id })
        .from(radarArticles)
        .where(and(eq(radarArticles.isoId, d.isoId), eq(radarArticles.stageTo, d.stage)))
        .limit(1);
      if (existing.length) continue;

      const entry = catalogByKey(d.family);
      const replaced = d.replaces.map((id) => byId.get(id)).find((x) => x && !/\/(Amd|Cor)/.test(x.reference)) ?? null;
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

        await db.insert(radarArticles).values({
          slug,
          family: d.family,
          standard: entry?.name ?? d.reference,
          isoId: d.isoId,
          reference: d.reference,
          changeKind: event.changeKind,
          stageFrom: event.stageFrom,
          stageTo: d.stage,
          lifecycle: lifecycleFor(d.stage, Boolean(replaced)),
          content,
          sourceUrl: isoStandardUrl(d.isoId),
          sourceDate: d.publicationDate,
          detectedAt: now,
          lastVerifiedAt: now,
        });
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

    await db
      .update(radarScans)
      .set({ finishedAt: new Date(), checked: fetched.length, changes: events.length, ok: true })
      .where(eq(radarScans.id, scan.id));

    if (drafted > 0) {
      await sendReviewDigest(createdTitles).catch((err) => console.error("[radar] digest email failed", err));
    }

    return { scanId: scan.id, checked: fetched.length, changes: events.length, drafted, failed };
  } catch (err) {
    await db
      .update(radarScans)
      .set({ finishedAt: new Date(), ok: false, error: err instanceof Error ? err.message : String(err) })
      .where(eq(radarScans.id, scan.id));
    throw err;
  }
}

export async function latestScan() {
  const db = getDb();
  const [row] = await db.select().from(radarScans).orderBy(desc(radarScans.id)).limit(1);
  return row ?? null;
}
