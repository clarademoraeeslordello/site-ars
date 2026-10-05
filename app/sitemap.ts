import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, htmlLang, type AppPathname } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { listPublished } from "@/lib/radar/queries";

// Interim list of existing pages; step 4 (SEO) replaces this with the full route registry.
const PATHS: AppPathname[] = [
  "/",
  "/plataforma",
  "/como-funciona",
  "/mercado",
  "/iso-radar",
  "/frameworks",
  "/lgpd",
  "/certificacao-e-manutencao",
  "/seguranca",
  "/solucoes",
  "/consultorias",
  "/sobre",
  "/faq",
  "/demonstracao",
];

function url(href: AppPathname, locale: (typeof routing.locales)[number]) {
  // @ts-expect-error static pathnames only (no params) in this list
  const path = getPathname({ href, locale });
  // trailingSlash: true in next.config, so every URL ends with "/".
  return SITE_URL + (path.endsWith("/") ? path : `${path}/`);
}

// Regenerated hourly so newly published ISO Radar articles are listed.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = (await listPublished()).map((a) => {
    const href = { pathname: "/iso-radar/[slug]" as const, params: { slug: a.slug } };
    const at = (locale: (typeof routing.locales)[number]) => {
      const path = getPathname({ href, locale });
      return SITE_URL + (path.endsWith("/") ? path : `${path}/`);
    };
    return {
      url: at(routing.defaultLocale),
      lastModified: a.updatedAt,
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [htmlLang[l], at(l)])) },
    };
  });
  return [...PATHS.map((path) => ({
    url: url(path, routing.defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [htmlLang[locale], url(path, locale)])
      ),
    },
  })), ...articles];
}
