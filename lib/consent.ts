/**
 * Versions of the consent text shown next to each form. The version is stored with every
 * subscription and consent event, so it is always possible to prove which wording a person
 * accepted. When the wording changes, add a new version here (never edit an old one).
 */
export const NEWSLETTER_CONSENT_VERSION = "newsletter-2026-10-v1";

export const NEWSLETTER_CONSENT_TEXT: Record<string, Record<string, string>> = {
  "newsletter-2026-10-v1": {
    "pt-BR": "Quero receber o ISO Radar e li a Política de Privacidade.",
    en: "I want to receive ISO Radar and I have read the Privacy Policy.",
    es: "Quiero recibir ISO Radar y leí la Política de Privacidad.",
  },
};

/** Route locale (pt-br) to the locale stored in the database (pt-BR). */
export function dbLocale(locale: string): "pt-BR" | "en" | "es" {
  return locale === "en" ? "en" : locale === "es" ? "es" : "pt-BR";
}

/** Database locale (pt-BR) back to the route locale (pt-br). */
export function routeLocale(locale: string): "pt-br" | "en" | "es" {
  return locale === "en" ? "en" : locale === "es" ? "es" : "pt-br";
}
