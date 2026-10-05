import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-br", "en", "es"],
  defaultLocale: "pt-br",
  // Portuguese lives at the root (/plataforma/); EN and ES are prefixed.
  localePrefix: "as-needed",
  // The language changes only through the switcher: no redirect by browser language
  // and no locale cookie.
  localeDetection: false,
  localeCookie: false,
  pathnames: {
    "/": "/",
    "/plataforma": { "pt-br": "/plataforma", en: "/platform", es: "/plataforma" },
    "/como-funciona": { "pt-br": "/como-funciona", en: "/how-it-works", es: "/como-funciona" },
    "/certificacao-e-manutencao": {
      "pt-br": "/certificacao-e-manutencao",
      en: "/certification-maintenance",
      es: "/certificacion-y-mantenimiento",
    },
    "/frameworks": { "pt-br": "/frameworks", en: "/frameworks", es: "/marcos" },
    "/seguranca": { "pt-br": "/seguranca", en: "/security", es: "/seguridad" },
    "/sobre": { "pt-br": "/sobre", en: "/about", es: "/sobre" },
    "/demonstracao": { "pt-br": "/demonstracao", en: "/demo", es: "/demostracion" },
    "/privacidade": { "pt-br": "/privacidade", en: "/privacy", es: "/privacidad" },
    "/termos": { "pt-br": "/termos", en: "/terms", es: "/terminos" },
    "/mercado": { "pt-br": "/mercado", en: "/market", es: "/mercado" },
    "/iso-radar": "/iso-radar",
    "/iso-radar/[slug]": "/iso-radar/[slug]",
    "/recursos": { "pt-br": "/recursos", en: "/resources", es: "/recursos" },
    "/artigos/[slug]": { "pt-br": "/artigos/[slug]", en: "/articles/[slug]", es: "/articulos/[slug]" },
    "/normas/[slug]": { "pt-br": "/normas/[slug]", en: "/standards/[slug]", es: "/normas/[slug]" },
    "/glossario": { "pt-br": "/glossario", en: "/glossary", es: "/glosario" },
    "/prontidao-para-auditoria": {
      "pt-br": "/prontidao-para-auditoria",
      en: "/audit-readiness",
      es: "/preparacion-para-auditoria",
    },
    "/certificacao-iso": { "pt-br": "/certificacao-iso", en: "/iso-certification", es: "/certificacion-iso" },

    // Legacy pages, consolidated into the new sitemap in step 3 (then removed with 301s).
    "/lgpd": "/lgpd",
    "/solucoes": "/solucoes",
    "/consultorias": "/consultorias",
    "/faq": "/faq",
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

/** hreflang / `lang` value for each route locale. */
export const htmlLang: Record<Locale, string> = { "pt-br": "pt-BR", en: "en", es: "es" };
