import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { htmlLang, routing, type AppPathname, type Locale } from "@/i18n/routing";
import { COMPANY_NAME, SITE_URL } from "@/lib/site";

type Href = AppPathname | { pathname: AppPathname; params: Record<string, string> };

const OG_LOCALE: Record<Locale, string> = { "pt-br": "pt_BR", en: "en_US", es: "es_ES" };

/** Absolute URL of a route in a locale, with the trailing slash used across the site. */
export function absoluteUrl(href: Href, locale: Locale): string {
  // @ts-expect-error static and dynamic hrefs share this helper
  const path: string = getPathname({ href, locale });
  return SITE_URL + (path.endsWith("/") ? path : `${path}/`);
}

/** hreflang map for a route: one entry per locale plus x-default (the PT version). */
export function languageAlternates(href: Href, locales: readonly Locale[] = routing.locales) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[htmlLang[l]] = absoluteUrl(href, l);
  languages["x-default"] = absoluteUrl(href, routing.defaultLocale);
  return languages;
}

/**
 * Metadata for one page: unique title and description, self-referencing canonical,
 * hreflang (pt-BR, en, es, x-default), Open Graph and X/Twitter card with the localized image.
 */
export function buildMetadata({
  locale,
  href,
  title,
  description,
  absoluteTitle = false,
  noindex = false,
  ogType = "website",
}: {
  locale: string;
  href: Href;
  title: string;
  description: string;
  /** Use the title as is (no " | Audit Cockpits" suffix), e.g. on the Home. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  ogType?: "website" | "article";
}): Metadata {
  const l = locale as Locale;
  const url = absoluteUrl(href, l);
  const fullTitle = absoluteTitle ? title : `${title} | ${COMPANY_NAME}`;
  const image = { url: `${SITE_URL}/og/${l}/`, width: 1200, height: 630, alt: fullTitle };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(href) },
    openGraph: {
      type: ogType,
      url,
      siteName: COMPANY_NAME,
      title: fullTitle,
      description,
      locale: OG_LOCALE[l],
      alternateLocale: routing.locales.filter((x) => x !== l).map((x) => OG_LOCALE[x]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
