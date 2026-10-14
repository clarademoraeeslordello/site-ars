import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { LegalDocument, legalTitle } from "@/components/marketing/legal-document";
import { GENERIC_LEGAL_SLUGS, getLegalMeta, isLegalSlug } from "@/lib/legal/documents";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => GENERIC_LEGAL_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLegalSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: "legal" });
  const title = legalTitle(getLegalMeta(slug, locale).title);
  return buildMetadata({
    locale,
    href: { pathname: "/legal/[slug]", params: { slug } },
    title,
    description: t("description", { title }),
  });
}

export default async function LegalSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLegalSlug(slug) || slug === "privacidade" || slug === "termos") notFound();
  setRequestLocale(locale);
  return <LegalDocument locale={locale} slug={slug} />;
}
