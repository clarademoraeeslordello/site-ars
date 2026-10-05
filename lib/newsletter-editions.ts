import "server-only";
import { and, eq, gte, inArray, lt } from "drizzle-orm";
import { getDb } from "@/db/client";
import { newsletterEditions, newsletterSubscribers, radarArticles } from "@/db/schema";
import { sendEditionReady } from "@/lib/email/radar";
import { emailSender } from "@/lib/email/sender";
import { esc } from "@/lib/email/templates";
import { DB_LOCALES, type DbLocale } from "@/lib/radar/content";
import { absoluteUrl } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { hashToken, newToken } from "@/lib/security";

/**
 * Monthly ISO Radar edition: built on the 1st from last month's published articles (one draft
 * per language), sent only after approval in /admin/newsletter.
 */

const ROUTE_LOCALE = { "pt-BR": "pt-br", en: "en", es: "es" } as const;

function previousMonth(now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const period = `${start.getUTCFullYear()}-${String(start.getUTCMonth() + 1).padStart(2, "0")}`;
  return { start, end, period };
}

const COPY: Record<DbLocale, { title: (p: string) => string; intro: string; read: string; source: string; unsubscribe: string; preferences: string }> = {
  "pt-BR": {
    title: (p) => `ISO Radar · ${p}`,
    intro: "As mudanças nas normas que monitoramos neste mês, com o link da fonte oficial.",
    read: "Ler o artigo",
    source: "Fonte oficial",
    unsubscribe: "Cancelar inscrição",
    preferences: "Preferências",
  },
  en: {
    title: (p) => `ISO Radar · ${p}`,
    intro: "This month's changes to the standards we monitor, with a link to the official source.",
    read: "Read the article",
    source: "Official source",
    unsubscribe: "Unsubscribe",
    preferences: "Preferences",
  },
  es: {
    title: (p) => `ISO Radar · ${p}`,
    intro: "Los cambios de este mes en las normas que monitoreamos, con el enlace a la fuente oficial.",
    read: "Leer el artículo",
    source: "Fuente oficial",
    unsubscribe: "Cancelar suscripción",
    preferences: "Preferencias",
  },
};

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
    DB_LOCALES.map((locale) => ({ locale, period, title: COPY[locale].title(period), intro: COPY[locale].intro, articleGroupIds: groupIds }))
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
    const locale = (DB_LOCALES as string[]).includes(edition.locale) ? (edition.locale as DbLocale) : "pt-BR";
    const route = ROUTE_LOCALE[locale];
    const c = COPY[locale];
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

    const itemsHtml = articles
      .map((a) => {
        const url = absoluteUrl({ pathname: "/iso-radar/[slug]", params: { slug: a.slug } }, route);
        return `<h2 style="margin:24px 0 6px;font:500 20px/1.3 Georgia,serif;color:#1b1b1b;">${esc(a.title)}</h2><p style="margin:0 0 6px;font:400 15px/1.6 Arial,sans-serif;color:#4a4640;">${esc(a.summary)}</p><p style="margin:0;font:400 13px Arial,sans-serif;"><a href="${esc(url)}" style="color:#8a6a14;">${c.read}</a> · <a href="${esc(a.sourceUrl)}" style="color:#8a6a14;">${c.source}</a></p>`;
      })
      .join("");
    const itemsText = articles
      .map((a) => `${a.title}\n${a.summary}\n${absoluteUrl({ pathname: "/iso-radar/[slug]", params: { slug: a.slug } }, route)}`)
      .join("\n\n");

    for (const r of recipients) {
      // Only the hash of the manage token is stored, so each edition issues a fresh one: the
      // links in the latest email always work.
      const token = newToken();
      await db.update(newsletterSubscribers).set({ manageTokenHash: hashToken(token) }).where(eq(newsletterSubscribers.id, r.id));
      const q = `?token=${encodeURIComponent(token)}`;
      const unsubscribeUrl = `${absoluteUrl("/newsletter/cancelar", route)}${q}`;
      const preferencesUrl = `${absoluteUrl("/newsletter/preferencias", route)}${q}`;
      const oneClick = `${SITE_URL}/api/newsletter/unsubscribe/${q}`;

      const html = `<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#f7f6f2;padding:32px 16px;"><div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e3e0d8;border-radius:22px;padding:32px;"><h1 style="margin:0 0 12px;font:500 24px/1.25 Georgia,serif;color:#1b1b1b;">${esc(edition.title)}</h1>${r.name ? `<p style="margin:0 0 8px;font:400 15px Arial,sans-serif;color:#4a4640;">${esc(r.name)},</p>` : ""}<p style="margin:0;font:400 15px/1.6 Arial,sans-serif;color:#4a4640;">${esc(edition.intro ?? c.intro)}</p>${itemsHtml}</div><p style="max-width:560px;margin:16px auto 0;font:400 12px Arial,sans-serif;color:#807b6e;"><a href="${esc(preferencesUrl)}" style="color:#807b6e;">${c.preferences}</a> · <a href="${esc(unsubscribeUrl)}" style="color:#807b6e;">${c.unsubscribe}</a></p></body></html>`;
      const result = await emailSender.send({
        to: r.email,
        subject: edition.title,
        html,
        text: `${edition.title}\n\n${edition.intro ?? c.intro}\n\n${itemsText}\n\n${c.unsubscribe}: ${unsubscribeUrl}`,
        headers: { "List-Unsubscribe": `<${oneClick}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
        tag: "newsletter_edition",
      });
      if (result.ok) sent++;
      else console.error(`[newsletter] send failed for subscriber ${r.id}: ${result.error}`);
    }
    await db.update(newsletterEditions).set({ status: "sent", sentAt: new Date(), updatedAt: new Date() }).where(eq(newsletterEditions.id, edition.id));
  }
  return sent;
}

export async function discardPeriod(period: string) {
  await getDb()
    .delete(newsletterEditions)
    .where(and(eq(newsletterEditions.period, period), eq(newsletterEditions.status, "draft")));
}
