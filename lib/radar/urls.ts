import { SITE_URL } from "@/lib/site";

export type NewsletterNotice = "confirmed" | "unsubscribed" | "invalid";

/** /iso-radar/ in the subscriber's language, with a notice the page shows once. */
export function radarPageUrl(locale: string | undefined, notice: NewsletterNotice) {
  const prefix = locale === "en" || locale === "es" ? `/${locale}` : "";
  return `${SITE_URL}${prefix}/iso-radar/?newsletter=${notice}`;
}
