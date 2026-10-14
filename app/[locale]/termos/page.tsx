import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { LegalDocument, legalTitle } from "@/components/marketing/legal-document";
import { getLegalMeta } from "@/lib/legal/documents";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const title = legalTitle(getLegalMeta("termos", locale).title);
  return buildMetadata({ locale, href: "/termos", title, description: t("description", { title }) });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument locale={locale} slug="termos" href="/termos" />;
}
