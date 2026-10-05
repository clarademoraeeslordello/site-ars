import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/marketing/legal-document";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  // noindex while the text is a placeholder pending legal review.
  return buildMetadata({ locale, href: "/privacidade", title: t("privacyTitle"), description: t("privacyTitle"), noindex: true });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument locale={locale} titleKey="privacyTitle" href="/privacidade" />;
}
