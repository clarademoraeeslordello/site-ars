import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const archivo = Archivo({
  subsets: ["latin"],
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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.auditreadinessscore.com";
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: `%s | Audit Readiness Score`,
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-BR": "/pt-br",
        en: "/en",
        es: "/es",
        "x-default": "/pt-br",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Audit Readiness Score",
      title: t("title"),
      description: t("description"),
      locale: locale === "pt-br" ? "pt_BR" : locale,
    },
  };
}

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

  return (
    <html
      lang={locale === "pt-br" ? "pt-BR" : locale}
      className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
