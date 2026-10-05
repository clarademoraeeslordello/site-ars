import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaFinal } from "@/components/marketing/cta-final";
import { JourneyMock } from "@/components/product/product-mocks";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.how.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function HowItWorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.how" });
  const th = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "pages.common" });
  const chain = t.raw("chain") as { t: string; d: string }[];
  const stages = t.raw("stages") as { t: string; d: string }[];
  const faq = t.raw("faq") as { q: string; a: string }[];

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      {/* The chain */}
      <section aria-labelledby="chain-title" className="container-site section-space">
        <h2 id="chain-title" className="m-0 font-display text-h2 font-medium">
          {t("chainTitle")}
        </h2>
        <ol className="m-0 mt-9 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px] p-0">
          {chain.map((c, i) => (
            <li key={c.t} className="flex flex-col gap-2 rounded-card border border-line bg-card p-[26px]">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
                {String(i + 1).padStart(2, "0")} · {c.t}
              </span>
              <span className="text-[15px] leading-[1.6] text-body">{c.d}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Journey */}
      <section
        aria-labelledby="journey-title"
        className="container-site section-space grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-x-14 gap-y-10"
      >
        <div className="flex flex-col gap-[18px] md:sticky md:top-24">
          <h2 id="journey-title" className="m-0 font-display text-h2 font-medium">
            {t("journeyTitle")}
          </h2>
          <p className="m-0 text-base leading-[1.65] text-body">{t("journeyLead")}</p>
          <ol className="m-0 flex list-none flex-col border-t border-line p-0">
            {stages.map((s, i) => (
              <li key={s.t} className="grid grid-cols-[28px_minmax(0,1fr)] items-baseline gap-3 border-b border-divider py-[11px]">
                <span className="font-mono text-[11px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm">
                  <span className="font-medium">{s.t}</span>
                  <span className="text-body"> · {s.d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <JourneyMock copy={th.raw("how.journey")} />
          <p className="mb-0 mt-3 text-[13px] text-muted">{tc("demoCaption")}</p>
        </div>
      </section>

      {/* FAQ (visible, so FAQPage structured data can be added in step 4) */}
      <section aria-labelledby="faq-title" className="container-site section-space">
        <h2 id="faq-title" className="m-0 font-display text-h2 font-medium">
          {t("faqTitle")}
        </h2>
        <div className="mt-9 overflow-hidden rounded-card border border-line bg-card">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-divider last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[26px] py-5 font-display text-[19px] font-medium leading-[1.3] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden="true" className="flex-none font-sans text-xl text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="m-0 max-w-[760px] px-[26px] pb-5 text-[15px] leading-[1.65] text-body">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
