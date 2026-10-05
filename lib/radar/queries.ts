import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { radarArticles } from "@/db/schema";
import { toDbLocale } from "./content";

export type RadarArticleRow = typeof radarArticles.$inferSelect;

export function hasDb() {
  return Boolean(process.env.DATABASE_URL);
}

/** Published articles in one language, newest first. Empty (not an error) without a database. */
export async function listPublished(locale: string): Promise<RadarArticleRow[]> {
  if (!hasDb()) return [];
  try {
    return await getDb()
      .select()
      .from(radarArticles)
      .where(and(eq(radarArticles.status, "published"), eq(radarArticles.locale, toDbLocale(locale))))
      .orderBy(desc(radarArticles.publishedAt));
  } catch (err) {
    console.error("[radar] list failed", err);
    return [];
  }
}

export async function getPublished(locale: string, slug: string): Promise<RadarArticleRow | null> {
  if (!hasDb()) return null;
  const [row] = await getDb()
    .select()
    .from(radarArticles)
    .where(
      and(eq(radarArticles.slug, slug), eq(radarArticles.locale, toDbLocale(locale)), eq(radarArticles.status, "published"))
    )
    .limit(1);
  return row ?? null;
}

/** Slugs for the sitemap: every language shares the slug of its article group. */
export async function listPublishedSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  if (!hasDb()) return [];
  try {
    return await getDb()
      .select({ slug: radarArticles.slug, updatedAt: radarArticles.updatedAt })
      .from(radarArticles)
      .where(and(eq(radarArticles.status, "published"), eq(radarArticles.locale, "pt-BR")));
  } catch (err) {
    console.error("[radar] sitemap list failed", err);
    return [];
  }
}
