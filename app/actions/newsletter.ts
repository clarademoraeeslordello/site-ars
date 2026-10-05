"use server";

import { getPathname } from "@/i18n/navigation";
import { redirect } from "next/navigation";
import { confirmSubscription, unsubscribe, updatePreferences } from "@/lib/newsletter";
import { routeLocale } from "@/lib/consent";
import { clientIp, rateLimit } from "@/lib/security";

function str(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.slice(0, 200) : "";
}

async function limited() {
  return !rateLimit(`newsletter-action:${await clientIp()}`, 20, 10 * 60 * 1000);
}

function path(href: "/newsletter/confirmar" | "/newsletter/preferencias" | "/newsletter/cancelar", locale: string) {
  const p = getPathname({ href, locale });
  return p.endsWith("/") ? p : `${p}/`;
}

export async function confirmAction(form: FormData) {
  const locale = str(form, "locale") || "pt-br";
  const token = str(form, "token");
  if (await limited()) redirect(`${path("/newsletter/confirmar", locale)}?error=1`);
  const result = await confirmSubscription(token);
  if (!result.ok) redirect(`${path("/newsletter/confirmar", locale)}?error=1`);
  // The success screen is the preferences page, reached with the new manage token.
  const l = routeLocale(result.locale);
  redirect(`${path("/newsletter/preferencias", l)}?token=${encodeURIComponent(result.manageToken)}&confirmed=1`);
}

export async function preferencesAction(form: FormData) {
  const locale = str(form, "locale") || "pt-br";
  const token = str(form, "token");
  const chosen = str(form, "newsletterLocale");
  if (await limited()) redirect(`${path("/newsletter/preferencias", locale)}?token=${encodeURIComponent(token)}`);
  const ok = await updatePreferences(token, chosen);
  redirect(`${path("/newsletter/preferencias", locale)}?token=${encodeURIComponent(token)}${ok ? "&saved=1" : ""}`);
}

export async function unsubscribeAction(form: FormData) {
  const locale = str(form, "locale") || "pt-br";
  const token = str(form, "token");
  if (await limited()) redirect(`${path("/newsletter/cancelar", locale)}?token=${encodeURIComponent(token)}`);
  const ok = await unsubscribe(token);
  redirect(`${path("/newsletter/cancelar", locale)}?token=${encodeURIComponent(token)}${ok ? "&done=1" : "&error=1"}`);
}
