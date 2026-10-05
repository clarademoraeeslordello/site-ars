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
  const t = await getTranslations({ locale, namespace: "platform" });
  return { title: t("title"), description: t("heroText") };
}

export default function PlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("platform");
  const th = useTranslations("legacyHome.finalCta");
  const sections = t.raw("sections") as { title: string; text: string }[];

  return (
    <>
      <PageHero eyebrow={t("title")} title={t("heroTitle")} text={t("heroText")} />
      <Section>
        <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {sections.map((s, i) => (
            <li key={s.title} className="border-l-2 border-gold pl-6">
              <span className="font-data text-xs text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1 font-display text-2xl font-semibold">
                {s.title}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <CtaBand title={th("title")} text={th("text")} />
    </>
  );
}
