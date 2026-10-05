import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { htmlLang, type Locale } from "@/i18n/routing";
import { Globe } from "@/components/market/globe";
import { CountryRanking } from "@/components/market/country-ranking";
import { features } from "@/lib/features";

const SOURCE_LINKS = {
  survey: "https://www.iso.org/the-iso-survey.html",
  tcu: "https://licitacoesecontratos.tcu.gov.br/5-5-2-habilitacao-tecnica/",
  ppn: "https://assets.publishing.service.gov.uk/media/67af78c8a75f02dffca29bd8/PPN_014_Cyber_essentials_scheme.pdf",
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.market" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  return { title: nav("market"), description: t("text") };
}

export default async function MarketPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const numberLocale = htmlLang[locale as Locale];

  const sourceLink = (href: string) =>
    function SourceLink(chunks: ReactNode) {
      return (
        <a href={href} className="text-gold-light underline-offset-2 hover:underline" rel="noopener">
          {chunks}
        </a>
      );
    };
  const countries = t.raw("market.countries") as Record<string, string>;

  return (
    <section
      id="mercado"
      aria-labelledby="mercado-title"
      className="mt-[clamp(88px,10vw,128px)] bg-dark text-dark-ink"
    >
      <div className="container-site flex flex-col gap-12 py-[clamp(64px,8vw,104px)]">
        <div className="flex max-w-[780px] flex-col gap-4">
          <span className="eyebrow text-gold-cta">{t("market.eyebrow")}</span>
          <h1 id="mercado-title" className="m-0 font-display text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.12]">
            {t("market.title")}
          </h1>
          <p className="m-0 text-base leading-[1.65] text-dark-body">{t("market.text")}</p>
        </div>

        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] border-t border-dark-line-2">
          {(t.raw("market.stats") as { v: string; t: string }[]).map((s) => (
            <div key={s.v} className="flex flex-col-reverse gap-2 pb-2 pr-6 pt-6">
              <dt className="text-sm leading-normal text-dark-body">{s.t}</dt>
              <dd className="m-0 font-display text-[clamp(36px,4vw,48px)] font-medium leading-none text-gold-light">
                {s.v}
              </dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-x-14 gap-y-8">
          <Globe
            title={t("market.globeTitle")}
            loadingLabel={t("market.globeLoading")}
            names={countries}
            numberLocale={numberLocale}
          />
          <div className="flex flex-col gap-4">
            <CountryRanking label={t("market.rankingLabel")} names={countries} numberLocale={numberLocale} />
            <span className="text-[13px] leading-[1.55] text-dark-muted">{t("market.rankingNote")}</span>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
          {features.licitacoes && (
            <MarketCard label={t("market.bids.label")} title={t("market.bids.title")} text={t("market.bids.text")} />
          )}
          <MarketCard label={t("market.intl.label")} title={t("market.intl.title")} text={t("market.intl.text")} />
        </div>

        <details className="text-xs leading-[1.6] text-dark-subtle">
          <summary className="cursor-pointer text-dark-body">{t("market.sources.label")}</summary>
          <ol className="mb-0 mt-2.5 flex flex-col gap-1 pl-[18px]">
            <li>{t.rich("market.sources.survey", { link: sourceLink(SOURCE_LINKS.survey) })}</li>
            {features.licitacoes && <li>{t.rich("market.sources.tcu", { link: sourceLink(SOURCE_LINKS.tcu) })}</li>}
            <li>{t("market.sources.nis2")}</li>
            <li>{t.rich("market.sources.ppn", { link: sourceLink(SOURCE_LINKS.ppn) })}</li>
          </ol>
        </details>
      </div>
    </section>

  );
}

function MarketCard({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <article className="flex flex-col gap-2.5 rounded-card border border-dark-line bg-dark-card p-[26px]">
      <span className="card-label text-gold-cta">{label}</span>
      <h2 className="m-0 font-display text-h3 font-medium leading-[1.3]">{title}</h2>
      <p className="m-0 text-sm leading-[1.6] text-dark-body">{text}</p>
    </article>
  );
}
