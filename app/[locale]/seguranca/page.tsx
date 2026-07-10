import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageHero } from "@/components/marketing/page-hero";
import { FeatureSections } from "@/components/marketing/feature-sections";
import { CtaBand } from "@/components/marketing/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "security" });
  return { title: t("title"), description: t("heroText") };
}

export default function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("security");
  const th = useTranslations("home.finalCta");
  const sections = t.raw("sections") as { title: string; text: string }[];

  return (
    <>
      <PageHero eyebrow={t("title")} title={t("heroTitle")} text={t("heroText")} />
      <FeatureSections sections={sections} />
      <CtaBand title={th("title")} text={th("text")} />
    </>
  );
}
