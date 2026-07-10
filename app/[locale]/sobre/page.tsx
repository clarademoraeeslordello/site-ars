import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionTitle } from "@/components/marketing/section";
import { CtaBand } from "@/components/marketing/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("missionText") };
}

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("about");
  const th = useTranslations("home.finalCta");
  const paragraphs = t.raw("paragraphs") as string[];
  const principles = t.raw("principles") as { title: string; text: string }[];

  return (
    <>
      <PageHero eyebrow={t("title")} title={t("heroTitle")} />
      <Section>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-ink-soft">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>
      <Section dark>
        <SectionTitle className="mt-0">{t("missionTitle")}</SectionTitle>
        <p className="mt-4 max-w-3xl font-display text-2xl leading-relaxed text-gold-bright">
          {t("missionText")}
        </p>
      </Section>
      <Section>
        <SectionTitle className="mt-0">{t("principlesTitle")}</SectionTitle>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="border-t border-gold pt-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title={th("title")} text={th("text")} />
    </>
  );
}
