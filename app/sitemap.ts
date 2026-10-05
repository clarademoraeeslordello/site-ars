import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";

// One <url> per page and locale, each with the full set of hreflang alternates.
// No <lastmod> for static pages: a fake "now" would only teach crawlers to ignore it.
// ISO Radar posts will bring their real updated_at in step 6.
export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES.filter((p) => p.index).flatMap((page) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(page.href, locale),
      priority: page.priority,
      alternates: { languages: languageAlternates(page.href) },
    }))
  );
}
