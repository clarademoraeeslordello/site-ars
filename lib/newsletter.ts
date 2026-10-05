import "server-only";
import { createHash, createHmac, randomBytes, randomUUID } from "node:crypto";
import { and, eq, gt, gte, inArray, lt, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { getDb } from "@/db/client";
import { consentEvents, newsletterEditions, newsletterSubscribers, radarArticles } from "@/db/schema";
import { requestIpHash } from "@/lib/admin/auth";
import { escapeHtml, sendEditionReady, sendNewsletterEdition, sendSubscriptionConfirm } from "@/lib/email";
import { DB_LOCALES, type DbLocale } from "@/lib/radar/content";
import { SITE_URL } from "@/lib/site";

/** Version of the consent text shown next to the signup form; stored with every consent event. */
export const CONSENT_TEXT_VERSION = "iso-radar-2026-10";
const CONFIRM_HOURS = 72;

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

function tokenSecret() {
  const s = process.env.NEWSLETTER_TOKEN_SECRET ?? process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("NEWSLETTER_TOKEN_SECRET (or ADMIN_SESSION_SECRET) must be set");
  return s;
}

/**
 * The manage (unsubscribe) token is derived from the subscriber id with a server secret, so
 * every edition can carry a working link while the database only keeps its hash.
 */
function manageToken(subscriberId: string) {
  return createHmac("sha256", tokenSecret()).update(`manage:${subscriberId}`).digest("base64url");
}

export function routeLocale(locale: string): "pt-br" | "en" | "es" {
  return locale === "en" || locale === "es" ? locale : "pt-br";
}

export function articleUrl(locale: string, slug: string) {
  const l = routeLocale(locale);
  return `${SITE_URL}${l === "pt-br" ? "" : `/${l}`}/iso-radar/${slug}/`;
}

async function logConsent(event: string, row: { id: string; email: string; locale: string; sourcePath?: string | null }) {
  const h = await headers();
  await getDb()
    .insert(consentEvents)
    .values({
      subscriberId: row.id,
      email: row.email,
      event,
      consentTextVersion: CONSENT_TEXT_VERSION,
      locale: row.locale,
      sourcePath: row.sourcePath ?? null,
      ipHash: await requestIpHash(),
      userAgent: h.get("user-agent")?.slice(0, 300) ?? null,
    });
}

export async function subscribe(input: { name: string; email: string; locale: DbLocale; sourcePath?: string }) {
  const db = getDb();
  const email = input.email.trim().toLowerCase();
  const [existing] = await db
    .select()
    .from(newsletterSubscribers)
    .where(sql`lower(${newsletterSubscribers.email}) = ${email}`)
    .limit(1);
  if (existing?.status === "active") return; // already in: send nothing new

  const id = existing?.id ?? randomUUID();
  const confirmToken = randomBytes(24).toString("base64url");
  const now = new Date();
  const values = {
    name: input.name.trim(),
    locale: input.locale,
    status: "pending",
    consentTextVersion: CONSENT_TEXT_VERSION,
    consentAt: now,
    confirmTokenHash: sha256(confirmToken),
    confirmTokenExpiresAt: new Date(now.getTime() + CONFIRM_HOURS * 3_600_000),
    manageTokenHash: sha256(manageToken(id)),
    source: "iso_radar",
    sourcePath: input.sourcePath ?? null,
    unsubscribedAt: null,
    updatedAt: now,
  };
  if (existing) await db.update(newsletterSubscribers).set(values).where(eq(newsletterSubscribers.id, id));
  else await db.insert(newsletterSubscribers).values({ id, email, ...values });

  await logConsent("subscribe_requested", { id, email, locale: input.locale, sourcePath: input.sourcePath });
  await sendSubscriptionConfirm(email, routeLocale(input.locale), confirmToken);
}

export async function confirmSubscription(token: string) {
  const [row] = await getDb()
    .update(newsletterSubscribers)
    .set({ status: "active", confirmedAt: new Date(), confirmTokenHash: null, confirmTokenExpiresAt: null, updatedAt: new Date() })
    .where(
      and(
        eq(newsletterSubscribers.confirmTokenHash, sha256(token)),
        gt(newsletterSubscribers.confirmTokenExpiresAt, new Date())
      )
    )
    .returning();
  if (row) await logConsent("confirmed", row);
  return row ?? null;
}

export async function unsubscribe(token: string) {
  const [row] = await getDb()
    .update(newsletterSubscribers)
    .set({ status: "unsubscribed", unsubscribedAt: new Date(), updatedAt: new Date() })
    .where(eq(newsletterSubscribers.manageTokenHash, sha256(token)))
    .returning();
  if (row) await logConsent("unsubscribed", row);
  return row ?? null;
}

function previousMonth(now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const period = `${start.getUTCFullYear()}-${String(start.getUTCMonth() + 1).padStart(2, "0")}`;
  return { start, end, period };
}

const EDITION_COPY: Record<DbLocale, { title: (p: string) => string; intro: string; read: string; source: string; unsubscribe: string }> = {
  "pt-BR": {
    title: (p) => `ISO Radar · ${p}`,
    intro: "As mudanças nas normas que monitoramos neste mês, com o link da fonte oficial.",
    read: "Ler o artigo",
    source: "Fonte oficial",
    unsubscribe: "Cancelar inscrição",
  },
  en: {
    title: (p) => `ISO Radar · ${p}`,
    intro: "This month's changes to the standards we monitor, with a link to the official source.",
    read: "Read the article",
    source: "Official source",
    unsubscribe: "Unsubscribe",
  },
  es: {
    title: (p) => `ISO Radar · ${p}`,
    intro: "Los cambios de este mes en las normas que monitoreamos, con el enlace a la fuente oficial.",
    read: "Leer el artículo",
    source: "Fuente oficial",
    unsubscribe: "Cancelar suscripción",
  },
};

/** Runs on the 1st: one draft edition per language with last month's published articles. */
export async function buildMonthlyEdition() {
  const db = getDb();
  const { start, end, period } = previousMonth();
  const exists = await db.select({ id: newsletterEditions.id }).from(newsletterEditions).where(eq(newsletterEditions.period, period)).limit(1);
  if (exists.length) return { period, created: false, count: 0 };

  const rows = await db
    .selectDistinct({ groupId: radarArticles.groupId })
    .from(radarArticles)
    .where(and(eq(radarArticles.status, "published"), gte(radarArticles.publishedAt, start), lt(radarArticles.publishedAt, end)));
  if (!rows.length) return { period, created: false, count: 0 };

  const groupIds = rows.map((r) => r.groupId);
  await db.insert(newsletterEditions).values(
    DB_LOCALES.map((locale) => ({
      locale,
      period,
      title: EDITION_COPY[locale].title(period),
      intro: EDITION_COPY[locale].intro,
      articleGroupIds: groupIds,
    }))
  );
  await sendEditionReady(period, groupIds.length).catch((err) => console.error("[newsletter] notify failed", err));
  return { period, created: true, count: groupIds.length };
}

/** Sends every draft edition of a period, each to the active subscribers of its language. */
export async function sendPeriod(period: string) {
  const db = getDb();
  // Claim the drafts first so a double click cannot send them twice.
  const editions = await db
    .update(newsletterEditions)
    .set({ status: "approved", updatedAt: new Date() })
    .where(and(eq(newsletterEditions.period, period), eq(newsletterEditions.status, "draft")))
    .returning();
  if (!editions.length) throw new Error("No draft edition for this period");

  let sent = 0;
  for (const edition of editions) {
    const locale = edition.locale as DbLocale;
    const c = EDITION_COPY[locale] ?? EDITION_COPY["pt-BR"];
    const articles = edition.articleGroupIds.length
      ? await db
          .select()
          .from(radarArticles)
          .where(and(inArray(radarArticles.groupId, edition.articleGroupIds), eq(radarArticles.locale, locale), eq(radarArticles.status, "published")))
      : [];
    const recipients = await db
      .select()
      .from(newsletterSubscribers)
      .where(and(eq(newsletterSubscribers.status, "active"), eq(newsletterSubscribers.locale, locale)));

    const items = articles
      .map(
        (a) =>
          `<h3 style="font-family:Georgia,serif;margin:24px 0 6px">${escapeHtml(a.title)}</h3><p style="margin:0 0 6px">${escapeHtml(a.summary)}</p><p style="margin:0;font-size:13px"><a href="${articleUrl(locale, a.slug)}">${c.read}</a> · <a href="${escapeHtml(a.sourceUrl)}">${c.source}</a></p>`
      )
      .join("");

    for (const r of recipients) {
      const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe/?token=${encodeURIComponent(manageToken(r.id))}`;
      try {
        await sendNewsletterEdition({
          to: r.email,
          subject: edition.title,
          html: `${r.name ? `<p>${escapeHtml(r.name)},</p>` : ""}<p>${escapeHtml(edition.intro ?? c.intro)}</p>${items}<p style="margin-top:28px;font-size:12px"><a href="${unsubscribeUrl}" style="color:#6e6e73">${c.unsubscribe}</a></p>`,
          unsubscribeUrl,
        });
        sent++;
      } catch (err) {
        console.error(`[newsletter] send failed for subscriber ${r.id}`, err);
      }
    }
    await db
      .update(newsletterEditions)
      .set({ status: "sent", sentAt: new Date(), updatedAt: new Date() })
      .where(eq(newsletterEditions.id, edition.id));
  }
  return sent;
}

export async function discardPeriod(period: string) {
  await getDb()
    .delete(newsletterEditions)
    .where(and(eq(newsletterEditions.period, period), eq(newsletterEditions.status, "draft")));
}
