import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { getDb, hasDb, schema } from "@/lib/db";
import type { ArticleLocale, RadarArticle } from "@/lib/db/schema";

const { radarArticles } = schema;

export function toArticleLocale(locale: string): ArticleLocale {
  return locale === "en" || locale === "es" ? locale : "pt-br";
}

/** Published articles, newest first. Empty (not an error) when the site runs without a database. */
export async function listPublished(): Promise<RadarArticle[]> {
  if (!hasDb()) return [];
  try {
    return await getDb()
      .select()
      .from(radarArticles)
      .where(eq(radarArticles.status, "published"))
      .orderBy(desc(radarArticles.publishedAt));
  } catch (err) {
    console.error("[radar] list failed", err);
    return [];
  }
}

export async function getPublished(slug: string): Promise<RadarArticle | null> {
  if (!hasDb()) return null;
  const [row] = await getDb()
    .select()
    .from(radarArticles)
    .where(and(eq(radarArticles.slug, slug), eq(radarArticles.status, "published")))
    .limit(1);
  return row ?? null;
}
