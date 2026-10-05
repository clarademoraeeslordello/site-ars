import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { JsonLd, softwareApplication } from "@/components/seo/json-ld";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaFinal } from "@/components/marketing/cta-final";
import { buttonClasses } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { ReadinessRuler } from "@/components/product/readiness-ruler";
import { EvidenceListMock, ReportCoverMock } from "@/components/product/product-mocks";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.platform.meta" });
  return buildMetadata({ locale, href: "/plataforma", title: t("title"), description: t("description") });
}

export default async function PlatformPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.platform" });
  const th = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "pages.common" });
  const features = t.raw("features") as { id: string; title: string; text: string }[];

  // A recreated product detail for the features where the Home already has one.
  const mocks: Record<string, React.ReactNode> = {
    evidencias: (
      <EvidenceListMock control={th("time.evidence.control")} items={th.raw("time.evidence.items")} />
    ),
    relatorios: (
      <ReportCoverMock
        heading={th("time.report.heading")}
        code={th("time.report.code")}
        label={th("time.report.label")}
        disclaimer={th("time.report.disclaimer")}
      />
    ),
  };

  return (
    <>
      <JsonLd data={softwareApplication(locale as Locale, absoluteUrl("/plataforma", locale as Locale), t("meta.description"))} />
      <PageIntro href="/plataforma" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")}>
        <div className="flex flex-wrap gap-2.5 pt-1">
          <Link href="/demonstracao" data-track="cta_demo_click" data-track-location="platform_intro" className={buttonClasses()}>
            {th("hero.ctaDemo")}
          </Link>
          <Link href="/como-funciona" className={buttonClasses({ variant: "secondary" })}>
            {th("hero.ctaHow")}
          </Link>
        </div>
      </PageIntro>

      {/* Score */}
      <section aria-labelledby="score-title" className="container-site section-space">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-14 gap-y-10 rounded-card border border-line bg-card p-[clamp(28px,4.5vw,56px)]">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">{t("score.eyebrow")}</span>
            <h2 id="score-title" className="m-0 font-display text-h2 font-medium">
              {t("score.title")}
            </h2>
            <p className="m-0 text-base leading-[1.65] text-body">{t("score.text")}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-card border border-line bg-paper px-6 py-[22px]" aria-hidden="true">
            <div className="flex items-center justify-between gap-2">
              <span className="card-label text-gold">{th("appMock.score.label")}</span>
              <StatusBadge tone="warn">{th("appMock.score.badge")}</StatusBadge>
            </div>
            <span className="font-display text-[52px] font-medium leading-none text-gold-deep">
              67<span className="text-xl text-muted">%</span>
            </span>
            <ReadinessRuler value={67} animate />
            <span className="text-xs text-muted">{th("appMock.score.meta")}</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section aria-label={t("eyebrow")} className="container-site section-space">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-[18px]">
          {features.map((f) => (
            <article key={f.id} id={f.id} className="flex scroll-mt-24 flex-col gap-3 rounded-card border border-line bg-card p-[26px]">
              <h2 className="m-0 font-display text-h3 font-medium">{f.title}</h2>
              <p className="m-0 text-sm leading-[1.6] text-body">{f.text}</p>
              {mocks[f.id]}
            </article>
          ))}
        </div>
        <p className="mb-0 mt-3 text-[13px] text-muted">{tc("demoCaption")}</p>
      </section>

      {/* Certification link */}
      <section aria-labelledby="cert-link-title" className="container-site pt-[clamp(56px,7vw,80px)]">
        <div className="flex flex-col items-start gap-3 rounded-card border border-tint-line bg-tint p-[clamp(24px,4vw,40px)]">
          <h2 id="cert-link-title" className="m-0 font-display text-h3 font-medium">
            {t("certLink.title")}
          </h2>
          <p className="m-0 max-w-[680px] text-[15px] leading-[1.6] text-body">{t("certLink.text")}</p>
          <Link href="/certificacao-e-manutencao" className={buttonClasses({ variant: "secondary", size: "sm" })}>
            {t("certLink.cta")}
          </Link>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
