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
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title"), description: t("heroTitle") };
}

export default function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("faq");
  const th = useTranslations("home.finalCta");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <>
      <PageHero eyebrow={t("title")} title={t("heroTitle")} />
      <Section>
        <div className="max-w-3xl divide-y divide-hairline border-y border-hairline">
          {items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="font-data text-gold transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand title={th("title")} text={th("text")} />
    </>
  );
}
