import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { CtaBand } from "@/components/marketing/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });
  return { title: t("title"), description: t("heroText") };
}

export default function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("solutions");
  const th = useTranslations("legacyHome.finalCta");
  const profiles = t.raw("profiles") as {
    role: string;
    pain: string;
    value: string;
  }[];

  return (
    <>
      <PageHero eyebrow={t("title")} title={t("heroTitle")} text={t("heroText")} />
      <Section>
        <div className="space-y-0 divide-y divide-hairline border-y border-hairline">
          {profiles.map((p) => (
            <article
              key={p.role}
              className="grid gap-4 py-10 md:grid-cols-[1fr_1.2fr_1.2fr] md:gap-10"
            >
              <h2 className="font-display text-2xl font-semibold">{p.role}</h2>
              <p className="leading-relaxed text-silver italic">{p.pain}</p>
              <p className="leading-relaxed text-ink-soft">{p.value}</p>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand title={th("title")} text={th("text")} />
    </>
  );
}
