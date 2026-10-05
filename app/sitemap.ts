import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import { listPublishedSlugs } from "@/lib/radar/queries";

// Regenerated hourly so newly published ISO Radar articles are listed.
export const revalidate = 3600;

// One <url> per page and locale, each with the full set of hreflang alternates.
// No <lastmod> for static pages: a fake "now" would only teach crawlers to ignore it.
// ISO Radar articles carry their real updated_at.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = SITE_PAGES.filter((p) => p.index).flatMap((page) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(page.href, locale),
      priority: page.priority,
      alternates: { languages: languageAlternates(page.href) },
    }))
  );
  const articles = (await listPublishedSlugs()).flatMap(({ slug, updatedAt }) => {
    const href = { pathname: "/iso-radar/[slug]" as const, params: { slug } };
    return routing.locales.map((locale) => ({
      url: absoluteUrl(href, locale),
      lastModified: updatedAt,
      priority: 0.6,
      alternates: { languages: languageAlternates(href) },
    }));
  });
  return [...pages, ...articles];
}
