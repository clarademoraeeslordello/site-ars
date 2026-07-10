import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionTitle } from "@/components/marketing/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { FrameworkCatalogAccordion } from "@/components/marketing/framework-catalog-accordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "frameworks" });
  return { title: t("title"), description: t("heroText") };
}

export default function FrameworksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("frameworks");
  const th = useTranslations("home.finalCta");
  const anchors = t.raw("anchors") as { code: string; name: string; text: string }[];
  const catalogColumns = t.raw("catalogTableColumns") as {
    code: string;
    version: string;
    areas: string;
  };
  const catalogGroups = t.raw("catalogTable") as {
    area: string;
    items: { code: string; version: string; areas: string }[];
  }[];

  return (
    <>
      <PageHero eyebrow={t("title")} title={t("heroTitle")} text={t("heroText")} />

      <Section className="pb-10 sm:pb-12">
        <SectionTitle className="mt-0">{t("anchorTitle")}</SectionTitle>
        <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {anchors.map((a) => (
            <div key={a.code} className="bg-paper p-6 sm:p-8">
              <p className="font-data text-sm font-medium text-gold">{a.code}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-hairline pt-14">
          <SectionTitle className="mt-0">{t("catalogTitle")}</SectionTitle>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            {t("catalogText")}
          </p>
        </div>

        <div className="mt-14 border-t border-hairline pt-14">
          <SectionTitle className="mt-0">{t("catalogTableTitle")}</SectionTitle>
          <FrameworkCatalogAccordion groups={catalogGroups} columns={catalogColumns} />
        </div>
      </Section>

      <Section dark>
        <SectionTitle className="mt-0">{t("multiTitle")}</SectionTitle>
        <p className="mt-4 max-w-3xl leading-relaxed text-paper/80">
          {t("multiText")}
        </p>
      </Section>

      <CtaBand title={th("title")} text={th("text")} />
    </>
  );
}
