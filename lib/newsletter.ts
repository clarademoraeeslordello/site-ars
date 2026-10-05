import "server-only";
import { randomBytes } from "node:crypto";
import { and, eq, gte, inArray, lt } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import type { ArticleLocale } from "@/lib/db/schema";
import { escapeHtml, sendEditionReady, sendNewsletterEdition, sendSubscriptionConfirm } from "@/lib/email";
import { SITE_URL } from "@/lib/site";

const { newsletterSubscribers: subs, newsletterEditions: editions, radarArticles: articles } = schema;

export function articleUrl(locale: ArticleLocale, slug: string) {
  const prefix = locale === "pt-br" ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}/iso-radar/${slug}/`;
}

export async function subscribe(input: { name: string; email: string; locale: ArticleLocale; sourcePage?: string }) {
  const db = getDb();
  const email = input.email.trim().toLowerCase();
  const [existing] = await db.select().from(subs).where(eq(subs.email, email)).limit(1);
  if (existing?.status === "confirmed") return; // already in: say nothing new, send nothing
  const token = existing?.token ?? randomBytes(24).toString("base64url");
  const values = {
    name: input.name.trim(),
    locale: input.locale,
    status: "pending",
    token,
    sourcePage: input.sourcePage ?? null,
    consentAt: new Date(),
    unsubscribedAt: null,
  };
  if (existing) await db.update(subs).set(values).where(eq(subs.id, existing.id));
  else await db.insert(subs).values({ email, ...values });
  await sendSubscriptionConfirm(email, input.locale, token);
}

export async function confirmSubscription(token: string) {
  const [row] = await getDb()
    .update(subs)
    .set({ status: "confirmed", confirmedAt: new Date() })
    .where(and(eq(subs.token, token), inArray(subs.status, ["pending", "confirmed"])))
    .returning({ locale: subs.locale });
  return row ?? null;
}

export async function unsubscribe(token: string) {
  const [row] = await getDb()
    .update(subs)
    .set({ status: "unsubscribed", unsubscribedAt: new Date() })
    .where(eq(subs.token, token))
    .returning({ locale: subs.locale });
  return row ?? null;
}

function previousMonth(now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const key = `${start.getUTCFullYear()}-${String(start.getUTCMonth() + 1).padStart(2, "0")}`;
  return { start, end, key };
}

/** Runs on the 1st: gathers last month's published articles into a draft edition for approval. */
export async function buildMonthlyEdition() {
  const db = getDb();
  const { start, end, key } = previousMonth();
  const [exists] = await db.select({ id: editions.id }).from(editions).where(eq(editions.month, key)).limit(1);
  if (exists) return { month: key, created: false, count: 0 };

  const rows = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.status, "published"), gte(articles.publishedAt, start), lt(articles.publishedAt, end)));
  if (!rows.length) return { month: key, created: false, count: 0 };

  await db.insert(editions).values({ month: key, articleIds: rows.map((r) => r.id) });
  await sendEditionReady(key, rows.length).catch((err) => console.error("[newsletter] notify failed", err));
  return { month: key, created: true, count: rows.length };
}

const EDITION_COPY: Record<ArticleLocale, { subject: (m: string) => string; intro: string; read: string; source: string; unsubscribe: string }> = {
  "pt-br": {
    subject: (m) => `ISO Radar · ${m}`,
    intro: "As mudanças nas normas que monitoramos neste mês, com o link da fonte oficial.",
    read: "Ler o artigo",
    source: "Fonte oficial",
    unsubscribe: "Cancelar inscrição",
  },
  en: {
    subject: (m) => `ISO Radar · ${m}`,
    intro: "This month's changes to the standards we monitor, with a link to the official source.",
    read: "Read the article",
    source: "Official source",
    unsubscribe: "Unsubscribe",
  },
  es: {
    subject: (m) => `ISO Radar · ${m}`,
    intro: "Los cambios de este mes en las normas que monitoreamos, con el enlace a la fuente oficial.",
    read: "Leer el artículo",
    source: "Fuente oficial",
    unsubscribe: "Cancelar suscripción",
  },
};

export async function sendEdition(editionId: number) {
  const db = getDb();
  const [edition] = await db.select().from(editions).where(eq(editions.id, editionId)).limit(1);
  if (!edition || edition.status !== "draft") throw new Error("Edition is not a draft");
  const list = await db.select().from(articles).where(inArray(articles.id, edition.articleIds));
  const recipients = await db.select().from(subs).where(eq(subs.status, "confirmed"));

  // Claim the edition first so a double click cannot send it twice.
  const claimed = await db
    .update(editions)
    .set({ status: "sending" })
    .where(and(eq(editions.id, editionId), eq(editions.status, "draft")))
    .returning({ id: editions.id });
  if (!claimed.length) throw new Error("Edition already being sent");

  let sent = 0;
  for (const r of recipients) {
    const locale = (["pt-br", "en", "es"].includes(r.locale) ? r.locale : "pt-br") as ArticleLocale;
    const c = EDITION_COPY[locale];
    const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe/?token=${encodeURIComponent(r.token)}`;
    const items = list
      .map((a) => {
        const body = a.content[locale];
        return `<h3 style="font-family:Georgia,serif;margin:24px 0 6px">${escapeHtml(body.title)}</h3><p style="margin:0 0 6px">${escapeHtml(body.summary)}</p><p style="margin:0;font-size:13px"><a href="${articleUrl(locale, a.slug)}">${c.read}</a> · <a href="${escapeHtml(a.sourceUrl)}">${c.source}</a></p>`;
      })
      .join("");
    try {
      await sendNewsletterEdition({
        to: r.email,
        subject: c.subject(edition.month),
        html: `<p>${escapeHtml(r.name)},</p><p>${c.intro}</p>${items}<p style="margin-top:28px;font-size:12px"><a href="${unsubscribeUrl}" style="color:#6e6e73">${c.unsubscribe}</a></p>`,
        unsubscribeUrl,
      });
      sent++;
    } catch (err) {
      console.error(`[newsletter] send failed for subscriber ${r.id}`, err);
    }
  }

  await db.update(editions).set({ status: "sent", sentAt: new Date(), sentCount: sent }).where(eq(editions.id, editionId));
  return sent;
}
