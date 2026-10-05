import "server-only";
import { and, eq, gt, sql } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { getDb } from "@/db/client";
import { consentEvents, newsletterSubscribers } from "@/db/schema";
import { NEWSLETTER_CONSENT_VERSION, dbLocale, routeLocale } from "@/lib/consent";
import { emailSender } from "@/lib/email/sender";
import { emailLayout, emailText } from "@/lib/email/templates";
import { absoluteUrl } from "@/lib/seo";
import { clientIp, hashIp, hashToken, newToken, userAgent } from "@/lib/security";

const CONFIRM_TTL_MS = 48 * 60 * 60 * 1000;

type Event = "subscribe_requested" | "confirmed" | "preferences_updated" | "unsubscribed";

async function logConsent(e: {
  subscriberId: string;
  email: string;
  event: Event;
  locale: string;
  sourcePath?: string | null;
  consentTextVersion?: string | null;
}) {
  const ip = await clientIp();
  await getDb()
    .insert(consentEvents)
    .values({
      subscriberId: e.subscriberId,
      email: e.email,
      event: e.event,
      locale: e.locale,
      sourcePath: e.sourcePath ?? null,
      consentTextVersion: e.consentTextVersion ?? null,
      ipHash: hashIp(ip),
      userAgent: await userAgent(),
    });
}

/**
 * Subscription request (double opt-in). Always answers the same way whether or not the email
 * already exists, so the form cannot be used to find out who is subscribed.
 */
export async function requestSubscription(input: {
  name: string;
  email: string;
  locale: string; // route locale chosen in the form
  source: string;
  sourcePath: string | null;
}): Promise<{ ok: boolean }> {
  const db = getDb();
  const email = input.email.trim();
  const locale = dbLocale(input.locale);
  const confirmToken = newToken();
  const now = new Date();

  const [existing] = await db
    .select()
    .from(newsletterSubscribers)
    .where(sql`lower(${newsletterSubscribers.email}) = lower(${email})`)
    .limit(1);

  // Already confirmed: nothing to do, same answer as a new subscription.
  if (existing?.status === "active") return { ok: true };

  const values = {
    name: input.name.trim(),
    locale,
    status: "pending" as const,
    consentTextVersion: NEWSLETTER_CONSENT_VERSION,
    consentAt: now,
    confirmTokenHash: hashToken(confirmToken),
    confirmTokenExpiresAt: new Date(now.getTime() + CONFIRM_TTL_MS),
    source: input.source,
    sourcePath: input.sourcePath,
    unsubscribedAt: null,
    updatedAt: now,
  };

  let id: string;
  if (existing) {
    await db.update(newsletterSubscribers).set(values).where(eq(newsletterSubscribers.id, existing.id));
    id = existing.id;
  } else {
    const [row] = await db
      .insert(newsletterSubscribers)
      .values({ ...values, email, manageTokenHash: hashToken(newToken()) })
      .returning({ id: newsletterSubscribers.id });
    id = row.id;
  }

  await logConsent({
    subscriberId: id,
    email,
    event: "subscribe_requested",
    locale,
    sourcePath: input.sourcePath,
    consentTextVersion: NEWSLETTER_CONSENT_VERSION,
  });

  const sent = await sendConfirmationEmail(email, input.name.trim(), routeLocale(locale), confirmToken);
  return { ok: sent };
}

async function sendConfirmationEmail(to: string, name: string, locale: "pt-br" | "en" | "es", token: string) {
  const t = await getTranslations({ locale, namespace: "emails.confirm" });
  const url = `${absoluteUrl("/newsletter/confirmar", locale)}?token=${encodeURIComponent(token)}`;
  const paragraphs = [t("hello", { name }), t("p1"), t("p2")];
  const cta = { label: t("cta"), url };
  const footer = [t("ignore"), t("footer")];
  const result = await emailSender.send({
    to,
    subject: t("subject"),
    html: emailLayout({ preheader: t("preheader"), heading: t("heading"), paragraphs, cta, footer }),
    text: emailText(t("heading"), paragraphs, cta, footer),
    tag: "newsletter_confirmation",
  });
  return result.ok;
}

export type ConfirmResult = { ok: true; manageToken: string; locale: string } | { ok: false };

/**
 * Confirms a pending subscription. Called from a button (POST), not from the email link itself,
 * so link scanners in mail servers cannot confirm on the person's behalf.
 */
export async function confirmSubscription(token: string): Promise<ConfirmResult> {
  const db = getDb();
  const [sub] = await db
    .select()
    .from(newsletterSubscribers)
    .where(
      and(
        eq(newsletterSubscribers.confirmTokenHash, hashToken(token)),
        gt(newsletterSubscribers.confirmTokenExpiresAt, new Date())
      )
    )
    .limit(1);
  if (!sub) return { ok: false };

  // A fresh manage token is issued on confirmation and shown on the success page.
  const manageToken = newToken();
  const now = new Date();
  await db
    .update(newsletterSubscribers)
    .set({
      status: "active",
      confirmedAt: now,
      confirmTokenHash: null,
      confirmTokenExpiresAt: null,
      manageTokenHash: hashToken(manageToken),
      updatedAt: now,
    })
    .where(eq(newsletterSubscribers.id, sub.id));

  await logConsent({
    subscriberId: sub.id,
    email: sub.email,
    event: "confirmed",
    locale: sub.locale,
    sourcePath: sub.sourcePath,
    consentTextVersion: sub.consentTextVersion,
  });
  return { ok: true, manageToken, locale: sub.locale };
}

/** Looks up a confirm token without consuming it (to show the confirm button or an error). */
export async function isConfirmTokenValid(token: string) {
  const [row] = await getDb()
    .select({ id: newsletterSubscribers.id })
    .from(newsletterSubscribers)
    .where(
      and(
        eq(newsletterSubscribers.confirmTokenHash, hashToken(token)),
        gt(newsletterSubscribers.confirmTokenExpiresAt, new Date())
      )
    )
    .limit(1);
  return Boolean(row);
}

export async function findByManageToken(token: string) {
  const [sub] = await getDb()
    .select({
      id: newsletterSubscribers.id,
      email: newsletterSubscribers.email,
      locale: newsletterSubscribers.locale,
      status: newsletterSubscribers.status,
    })
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.manageTokenHash, hashToken(token)))
    .limit(1);
  return sub ?? null;
}

export async function updatePreferences(token: string, locale: string): Promise<boolean> {
  const sub = await findByManageToken(token);
  if (!sub || sub.status === "unsubscribed") return false;
  const next = dbLocale(locale);
  await getDb()
    .update(newsletterSubscribers)
    .set({ locale: next, updatedAt: new Date() })
    .where(eq(newsletterSubscribers.id, sub.id));
  await logConsent({ subscriberId: sub.id, email: sub.email, event: "preferences_updated", locale: next });
  return true;
}

/** Unsubscribes; idempotent (a second call is a no-op that still answers ok). */
export async function unsubscribe(token: string): Promise<boolean> {
  const sub = await findByManageToken(token);
  if (!sub) return false;
  if (sub.status === "unsubscribed") return true;
  const now = new Date();
  await getDb()
    .update(newsletterSubscribers)
    .set({ status: "unsubscribed", unsubscribedAt: now, confirmTokenHash: null, confirmTokenExpiresAt: null, updatedAt: now })
    .where(eq(newsletterSubscribers.id, sub.id));
  await logConsent({ subscriberId: sub.id, email: sub.email, event: "unsubscribed", locale: sub.locale });
  return true;
}
