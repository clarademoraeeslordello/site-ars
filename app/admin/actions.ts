"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { consumeMagicLink, endSession, requestMagicLink, requireAdmin } from "@/lib/admin/auth";
import { getDb, schema } from "@/lib/db";
import type { ArticleBody, ArticleLocale } from "@/lib/db/schema";
import { buildMonthlyEdition, sendEdition } from "@/lib/newsletter";
import { runScan } from "@/lib/radar/scan";

const { radarArticles, newsletterEditions } = schema;

function refreshPublicPages() {
  revalidatePath("/[locale]/iso-radar", "layout");
}

export async function requestLinkAction(_: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  try {
    await requestMagicLink(email);
  } catch (err) {
    console.error("[admin] magic link failed", err);
  }
  // Same answer whether or not the address is an admin.
  return { sent: true };
}

export async function verifyLinkAction(formData: FormData) {
  const ok = await consumeMagicLink(String(formData.get("token") ?? ""));
  redirect(ok ? "/admin/radar" : "/admin/login?erro=link");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

export async function publishAction(formData: FormData) {
  const reviewer = await requireAdmin();
  const id = Number(formData.get("id"));
  await getDb()
    .update(radarArticles)
    .set({ status: "published", publishedAt: new Date(), updatedAt: new Date(), reviewedBy: reviewer })
    .where(and(eq(radarArticles.id, id), eq(radarArticles.status, "draft")));
  refreshPublicPages();
  revalidatePath("/admin/radar");
}

export async function discardAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await getDb().update(radarArticles).set({ status: "discarded", updatedAt: new Date() }).where(eq(radarArticles.id, id));
  refreshPublicPages();
  revalidatePath("/admin/radar");
}

export async function unpublishAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await getDb().update(radarArticles).set({ status: "draft", updatedAt: new Date() }).where(eq(radarArticles.id, id));
  refreshPublicPages();
  revalidatePath("/admin/radar");
}

const LOCALES: ArticleLocale[] = ["pt-br", "en", "es"];
const FIELDS: (keyof ArticleBody)[] = ["title", "summary", "whatHappened", "whatChanged", "impact", "watch"];
const dateOrEmpty = z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]);
const urlOrEmpty = z.union([z.literal(""), z.string().url()]);

export async function saveArticleAction(formData: FormData) {
  const reviewer = await requireAdmin();
  const id = Number(formData.get("id"));
  const content = Object.fromEntries(
    LOCALES.map((l) => [l, Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(`${l}.${f}`) ?? "").trim()]))])
  ) as Record<ArticleLocale, ArticleBody>;
  const lifecycle = z.enum(["published", "under_review", "transition", "withdrawn"]).parse(formData.get("lifecycle"));
  const deadline = dateOrEmpty.parse(String(formData.get("transitionDeadline") ?? ""));
  const deadlineSource = urlOrEmpty.parse(String(formData.get("transitionSource") ?? "").trim());
  const publish = formData.get("intent") === "publish";

  await getDb()
    .update(radarArticles)
    .set({
      content,
      lifecycle,
      transitionDeadline: deadline || null,
      transitionSource: deadlineSource || null,
      updatedAt: new Date(),
      ...(publish ? { status: "published" as const, publishedAt: new Date(), reviewedBy: reviewer } : {}),
    })
    .where(eq(radarArticles.id, id));
  refreshPublicPages();
  revalidatePath("/admin/radar");
  redirect(publish ? "/admin/radar?ok=publicado" : `/admin/radar/${id}?ok=salvo`);
}

export async function scanNowAction() {
  await requireAdmin();
  let result;
  try {
    result = await runScan();
  } catch (err) {
    console.error("[admin] manual scan failed", err);
    redirect(`/admin/radar?erro=${encodeURIComponent(err instanceof Error ? err.message : "falha")}`);
  }
  refreshPublicPages();
  revalidatePath("/admin/radar");
  redirect(`/admin/radar?varredura=${result.checked}-${result.changes}-${result.drafted}-${result.failed}`);
}

export async function buildEditionAction() {
  await requireAdmin();
  await buildMonthlyEdition();
  revalidatePath("/admin/newsletter");
}

export async function sendEditionAction(formData: FormData) {
  await requireAdmin();
  const sent = await sendEdition(Number(formData.get("id")));
  revalidatePath("/admin/newsletter");
  redirect(`/admin/newsletter?enviados=${sent}`);
}

export async function discardEditionAction(formData: FormData) {
  await requireAdmin();
  await getDb()
    .update(newsletterEditions)
    .set({ status: "discarded" })
    .where(and(eq(newsletterEditions.id, Number(formData.get("id"))), eq(newsletterEditions.status, "draft")));
  revalidatePath("/admin/newsletter");
}
