import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionTitle } from "@/components/marketing/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { ReadinessRuler } from "@/components/marketing/readiness-ruler";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "score" });
  return { title: t("title"), description: t("heroText") };
}

export default function ScorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("score");
  const th = useTranslations("legacyHome");
  const bands = t.raw("bands") as { range: string; name: string; text: string }[];

  return (
    <>
      <PageHero eyebrow={t("title")} title={t("heroTitle")} text={t("heroText")} />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle className="mt-0">{t("howTitle")}</SectionTitle>
            <p className="mt-4 leading-relaxed text-ink-soft">{t("howText")}</p>
          </div>
          <div className="rounded-md border border-hairline bg-paper-raised p-6 sm:p-8">
            <ReadinessRuler
              value={87}
              label={th("hero.rulerLabel")}
              bandLow={th("hero.rulerBandLow")}
              bandMid={th("hero.rulerBandMid")}
              bandHigh={th("hero.rulerBandHigh")}
            />
          </div>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionTitle className="mt-0">{t("bandsTitle")}</SectionTitle>
        <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-3">
          {bands.map((band, i) => (
            <div key={band.name} className="bg-paper p-6 sm:p-8">
              <p className="font-data text-sm text-silver">{band.range}</p>
              <h3
                className={
                  i === 2
                    ? "mt-2 font-display text-xl font-semibold text-gold"
                    : "mt-2 font-display text-xl font-semibold"
                }
              >
                {band.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {band.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section dark>
        <SectionTitle className="mt-0">{t("decayTitle")}</SectionTitle>
        <p className="mt-4 max-w-3xl leading-relaxed text-paper/80">
          {t("decayText")}
        </p>
      </Section>

      <Section>
        <SectionTitle className="mt-0">{t("trendTitle")}</SectionTitle>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
          {t("trendText")}
        </p>
      </Section>

      <CtaBand title={th("finalCta.title")} text={th("finalCta.text")} />
    </>
  );
}
