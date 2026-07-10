import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.auditreadinessscore.com";

const PATHS = [
  "",
  "/plataforma",
  "/audit-readiness-score",
  "/frameworks",
  "/lgpd",
  "/auditorias",
  "/seguranca",
  "/solucoes",
  "/consultorias",
  "/sobre",
  "/faq",
  "/demonstracao",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${BASE_URL}/${routing.defaultLocale}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale === "pt-br" ? "pt-BR" : locale,
          `${BASE_URL}/${locale}${path}`,
        ])
      ),
    },
  }));
}
