import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
import { routing, htmlLang, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  // Canonical, hreflang and per-page Open Graph are built page by page in step 4 (SEO).
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s | Audit Cockpits",
    },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: "Audit Cockpits",
      title: t("title"),
      description: t("description"),
      locale: ogLocale[locale as Locale] ?? "pt_BR",
    },
  };
}

const ogLocale: Record<Locale, string> = { "pt-br": "pt_BR", en: "en_US", es: "es_ES" };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  // Only the namespaces used by client components reach the browser. Server-rendered copy
  // (including content behind feature flags, such as the public tender text) never ships
  // in the page payload.
  const clientMessages = {
    nav: messages.nav,
    demo: { form: (messages.demo as Record<string, unknown>)?.form },
    home: { radar: { form: ((messages.home as Record<string, Record<string, unknown>>)?.radar)?.form } },
    radarPage: messages.radarPage,
  };

  return (
    <html
      lang={htmlLang[locale]}
      className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={clientMessages}>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
