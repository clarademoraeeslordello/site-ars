import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { DemoRequestForm } from "@/components/forms/demo-request-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demo" });
  return { title: t("title"), description: t("heroText") };
}

export default function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("demo");

  return (
    <>
      <PageHero eyebrow={t("title")} title={t("heroTitle")} text={t("heroText")} />
      <Section>
        <div className="mx-auto max-w-2xl">
          <DemoRequestForm />
        </div>
      </Section>
    </>
  );
}
