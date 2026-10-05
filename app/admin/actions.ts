"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb } from "@/db/client";
import { radarArticles } from "@/db/schema";
import { consumeMagicLink, endSession, requestMagicLink, requireAdmin } from "@/lib/admin/auth";
import { buildMonthlyEdition, discardPeriod, sendPeriod } from "@/lib/newsletter";
import { DB_LOCALES } from "@/lib/radar/content";
import { runScan } from "@/lib/radar/scan";

function refreshPublicPages() {
  revalidatePath("/[locale]/iso-radar", "layout");
}

const groupIdOf = (formData: FormData) => z.string().uuid().parse(formData.get("groupId"));

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
  const now = new Date();
  await getDb()
    .update(radarArticles)
    .set({ status: "published", publishedAt: now, updatedAt: now, reviewedBy: reviewer })
    .where(and(eq(radarArticles.groupId, groupIdOf(formData)), eq(radarArticles.status, "draft")));
  refreshPublicPages();
  revalidatePath("/admin/radar");
}

export async function discardAction(formData: FormData) {
  await requireAdmin();
  await getDb()
    .update(radarArticles)
    .set({ status: "archived", updatedAt: new Date() })
    .where(eq(radarArticles.groupId, groupIdOf(formData)));
  refreshPublicPages();
  revalidatePath("/admin/radar");
}

export async function unpublishAction(formData: FormData) {
  await requireAdmin();
  await getDb()
    .update(radarArticles)
    .set({ status: "draft", updatedAt: new Date() })
    .where(eq(radarArticles.groupId, groupIdOf(formData)));
  refreshPublicPages();
  revalidatePath("/admin/radar");
}

const dateOrEmpty = z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]);
const urlOrEmpty = z.union([z.literal(""), z.string().url()]);

export async function saveArticleAction(formData: FormData) {
  const reviewer = await requireAdmin();
  const groupId = groupIdOf(formData);
  const standardStatus = z.enum(["published", "under_review", "in_transition", "withdrawn"]).parse(formData.get("standardStatus"));
  const deadline = dateOrEmpty.parse(String(formData.get("transitionDeadline") ?? ""));
  const deadlineSource = urlOrEmpty.parse(String(formData.get("transitionSource") ?? "").trim());
  const publish = formData.get("intent") === "publish";
  const now = new Date();
  const db = getDb();

  for (const locale of DB_LOCALES) {
    const field = (name: string) => z.string().trim().min(1).parse(formData.get(`${locale}.${name}`));
    await db
      .update(radarArticles)
      .set({
        title: field("title"),
        summary: field("summary"),
        bodyMd: field("bodyMd"),
        standardStatus,
        transitionDeadline: deadline || null,
        transitionSource: deadlineSource || null,
        updatedAt: now,
        ...(publish ? { status: "published", publishedAt: now, reviewedBy: reviewer } : {}),
      })
      .where(and(eq(radarArticles.groupId, groupId), eq(radarArticles.locale, locale)));
  }
  refreshPublicPages();
  revalidatePath("/admin/radar");
  redirect(publish ? "/admin/radar?ok=publicado" : `/admin/radar/${groupId}?ok=salvo`);
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
  const sent = await sendPeriod(String(formData.get("period")));
  revalidatePath("/admin/newsletter");
  redirect(`/admin/newsletter?enviados=${sent}`);
}

export async function discardEditionAction(formData: FormData) {
  await requireAdmin();
  await discardPeriod(String(formData.get("period")));
  revalidatePath("/admin/newsletter");
}
