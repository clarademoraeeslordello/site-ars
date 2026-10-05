import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaFinal } from "@/components/marketing/cta-final";
import { CertificationMock } from "@/components/product/product-mocks";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.cert.meta" });
  return buildMetadata({ locale, href: "/certificacao-e-manutencao", title: t("title"), description: t("description") });
}

export default async function CertificationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.cert" });
  const th = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "pages.common" });
  const cycle = t.raw("cycle") as { t: string; d: string }[];

  return (
    <>
      <PageIntro href="/certificacao-e-manutencao" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")}>
        <p className="m-0 max-w-[680px] rounded-control border border-tint-line bg-tint px-4 py-3.5 text-[15px] font-medium leading-[1.6]">
          {t("callout")}
        </p>
      </PageIntro>

      <section aria-labelledby="cycle-title" className="container-site section-space">
        <h2 id="cycle-title" className="m-0 font-display text-h2 font-medium">
          {t("cycleTitle")}
        </h2>
        <ol className="m-0 mt-9 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[18px] p-0">
          {cycle.map((c, i) => (
            <li key={c.t} className="flex flex-col gap-2 border-l-2 border-gold-cta pl-4">
              <span className="font-mono text-[11px] text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-h3 font-medium">{c.t}</span>
              <span className="text-sm leading-[1.6] text-body">{c.d}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="typical-title"
        className="container-site section-space grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-14 gap-y-10"
      >
        <div className="flex flex-col gap-4">
          <h2 id="typical-title" className="m-0 font-display text-h2 font-medium">
            {t("typicalTitle")}
          </h2>
          <p className="m-0 text-base leading-[1.65] text-body">{t("typical")}</p>
        </div>
        <div>
          <CertificationMock copy={th.raw("cert")} />
          <p className="mb-0 mt-3 text-[13px] text-muted">{tc("demoCaption")}</p>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
