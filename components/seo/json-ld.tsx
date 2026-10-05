import { htmlLang, type Locale } from "@/i18n/routing";
import { CONTACT, COMPANY_NAME, PRODUCT_NAME, SITE_URL } from "@/lib/site";

/** Renders one JSON-LD block. "<" is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Organization + WebSite, rendered once in the layout. No address or tax ID until provided. */
export function siteGraph(locale: Locale, homeUrl: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: COMPANY_NAME,
        url: `${SITE_URL}/`,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo-512.png`, width: 512, height: 512 },
        email: CONTACT.email,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT.email,
          telephone: CONTACT.phone.replace(/[^\d+]/g, ""),
          availableLanguage: ["pt-BR", "en", "es"],
        },
        brand: { "@type": "Brand", name: `${PRODUCT_NAME}, Audit Readiness Score` },
      },
      {
        "@type": "WebSite",
        "@id": `${homeUrl}#website`,
        name: COMPANY_NAME,
        url: homeUrl,
        description,
        inLanguage: htmlLang[locale],
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

/** BreadcrumbList from absolute URLs, first item is the locale's home. */
export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** SoftwareApplication for the ARS product page. No price, rating or review (not available). */
export function softwareApplication(locale: Locale, url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${PRODUCT_NAME} · Audit Readiness Score`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    description,
    inLanguage: htmlLang[locale],
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** FAQPage, only for pages where the questions and answers are visible. */
export function faqPage(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
