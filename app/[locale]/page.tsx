import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { HeroLiveCard } from "@/components/product/hero-live-card";
import {
  AppHomeMock,
  CertificationMock,
  EvidenceListMock,
  JourneyMock,
  RenewalMock,
  ReportCoverMock,
} from "@/components/product/product-mocks";
import { CtaFinal } from "@/components/marketing/cta-final";
import { buildMetadata } from "@/lib/seo";

const FRAMEWORKS = [
  "ISO 27001", "ISO 27701", "ISO 9001", "ISO 14001", "ISO 22301", "ISO 42001", "ISO 20000-1",
  "ISO 13485", "ISO 17025", "LGPD", "NIS2", "DORA", "Cyber Essentials", "SOC 2",
];


type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return buildMetadata({ locale, href: "/", title: t("title"), description: t("description"), absoluteTitle: true });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });


  return (
    <>
      {/* 1 · Hero */}
      <section aria-labelledby="hero-title" className="container-site pt-[clamp(56px,8vw,96px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-x-16 gap-y-12">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">{t("hero.eyebrow")}</span>
            <h1 id="hero-title" className="m-0 font-display text-h1 font-medium">
              {t("hero.title")}
            </h1>
            <p className="m-0 max-w-[640px] text-lg leading-[1.6] text-pretty text-body">{t("hero.lead")}</p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <Link href="/demonstracao" data-track="cta_demo_click" data-track-location="hero" className={buttonClasses()}>
                {t("hero.ctaDemo")}
              </Link>
              <a href="#como-funciona" className={buttonClasses({ variant: "secondary" })}>
                {t("hero.ctaHow")}
              </a>
            </div>
          </div>
          <HeroLiveCard copy={t.raw("live")} />
        </div>

        <div className="mt-[clamp(44px,6vw,64px)]">
          <AppHomeMock copy={t.raw("appMock")} />
        </div>
        <p className="mb-0 mt-3 text-[13px] text-muted">{t("appMock.caption")}</p>
      </section>

      {/* 2 · Perguntas da semana */}
      <section aria-labelledby="dia-title" className="container-site section-space flex flex-col gap-9">
        <SectionHeading id="dia-title" title={t("questions.title")} lead={t("questions.lead")} className="max-w-[780px]" />
        <QuestionsTable
          head={t.raw("questions.head")}
          items={t.raw("questions.items")}
        />
      </section>

      {/* 3 · Como funciona */}
      <section
        id="como-funciona"
        aria-labelledby="como-title"
        className="container-site section-space grid scroll-mt-20 grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-x-14 gap-y-10"
      >
        <div className="flex flex-col gap-[18px] md:sticky md:top-24">
          <h2 id="como-title" className="m-0 font-display text-h2 font-medium">
            {t("how.title")}
          </h2>
          <p className="m-0 text-base leading-[1.65] text-body">{t("how.p1")}</p>
          <p className="m-0 text-base leading-[1.65] text-body">{t("how.p2")}</p>
          <ol className="m-0 mt-1.5 flex list-none flex-col border-t border-line p-0">
            {(t.raw("how.chain") as { t: string; v: string }[]).map((c) => (
              <li
                key={c.t}
                className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-3.5 border-b border-divider py-[11px]"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{c.t}</span>
                <span className="text-sm">{c.v}</span>
              </li>
            ))}
          </ol>
        </div>
        <JourneyMock copy={t.raw("how.journey")} />
      </section>

      {/* 4 · Onde sua equipe recupera tempo */}
      <section id="plataforma" aria-labelledby="tempo-title" className="container-site section-space flex scroll-mt-20 flex-col gap-9">
        <SectionHeading id="tempo-title" title={t("time.title")} lead={t("time.lead")} className="max-w-[760px]" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[18px]">
          <FeatureCard title={t("time.evidence.title")} text={t("time.evidence.text")}>
            <EvidenceListMock control={t("time.evidence.control")} items={t.raw("time.evidence.items")} />
          </FeatureCard>
          <FeatureCard title={t("time.renewal.title")} text={t("time.renewal.text")}>
            <RenewalMock
              label={t("time.renewal.label")}
              item={t("time.renewal.item")}
              badge={t("time.renewal.badge")}
              note={t("time.renewal.note")}
            />
          </FeatureCard>
          <FeatureCard title={t("time.report.title")} text={t("time.report.text")}>
            <ReportCoverMock
              heading={t("time.report.heading")}
              code={t("time.report.code")}
              label={t("time.report.label")}
              disclaimer={t("time.report.disclaimer")}
            />
          </FeatureCard>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="mr-1.5 py-1.5 text-sm font-medium">{t("time.moreLabel")}</span>
          {(t.raw("time.more") as string[]).map((m) => (
            <span key={m} className="rounded-full border border-line bg-card px-3 py-1.5 text-[13px]">
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* 5 · Por que criamos o Audit Cockpits */}
      <section id="sobre" aria-labelledby="sobre-title" className="container-site scroll-mt-20 pt-[clamp(56px,7vw,80px)]">
        <div className="flex flex-col gap-[18px] rounded-card border border-line bg-card p-[clamp(28px,4.5vw,56px)]">
          <h2 id="sobre-title" className="eyebrow m-0">
            {t("about.eyebrow")}
          </h2>
          <p className="m-0 max-w-[860px] font-display text-[clamp(22px,2.4vw,30px)] font-normal leading-[1.4] text-pretty">
            {t("about.quote")}
          </p>
          <p className="m-0 max-w-[760px] text-base leading-[1.65] text-body">{t("about.text")}</p>
        </div>
      </section>

      {/* 7 · Depois da certificação */}
      <section
        id="certificacao"
        aria-labelledby="cert-title"
        className="container-site section-space grid scroll-mt-20 grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-14 gap-y-10"
      >
        <div className="flex flex-col gap-4">
          <span className="eyebrow">{t("cert.eyebrow")}</span>
          <h2 id="cert-title" className="m-0 font-display text-h2 font-medium">
            {t("cert.title")}
          </h2>
          <p className="m-0 text-base leading-[1.65] text-body">{t("cert.text")}</p>
          <p className="m-0 rounded-control border border-tint-line bg-tint px-4 py-3.5 text-[15px] font-medium leading-[1.6]">
            {t("cert.callout")}
          </p>
        </div>
        <CertificationMock copy={t.raw("cert")} />
      </section>

      {/* 8 · Cobertura */}
      <section aria-labelledby="cobertura-title" className="mt-[clamp(88px,10vw,128px)] border-y border-line bg-card">
        <div className="container-site flex flex-col gap-5 py-[clamp(56px,7vw,88px)]">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">{t("coverage.eyebrow")}</span>
            <h2 id="cobertura-title" className="m-0 font-display text-[clamp(26px,3vw,36px)] font-medium leading-[1.15]">
              {t("coverage.title")}
            </h2>
            <p className="m-0 text-[15px] leading-[1.6] text-body">{t("coverage.text")}</p>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {FRAMEWORKS.map((f) => (
              <li key={f} className="rounded-full border border-line bg-well px-[13px] py-[7px] text-[13px] font-medium">
                {f}
              </li>
            ))}
          </ul>
          <p className="m-0 text-[13px] text-muted">{t("coverage.soc2")}</p>
        </div>
      </section>

      {/* 10 · CTA final */}
      <CtaFinal />
    </>
  );
}

function QuestionsTable({
  head,
  items,
}: {
  head: { q: string; before: string; after: string };
  items: { q: string; before: string; after: string }[];
}) {
  const row = "grid gap-x-6 gap-y-2 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]";
  return (
    <div className="overflow-hidden rounded-card border border-line bg-card">
      <div
        className={`${row} hidden border-b border-line bg-tint px-[26px] py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] md:grid`}
        aria-hidden="true"
      >
        <span className="text-ink">{head.q}</span>
        <span className="text-muted">{head.before}</span>
        <span className="text-gold">{head.after}</span>
      </div>
      <dl className="m-0">
        {items.map((q) => (
          <div key={q.q} className={`${row} items-baseline border-b border-divider px-[26px] py-5 last:border-b-0`}>
            <dt className="font-display text-[19px] font-medium leading-[1.3]">{q.q}</dt>
            <dd className="m-0 text-sm leading-[1.55] text-muted">
              <span className="eyebrow mb-1 block text-muted md:hidden">{head.before}</span>
              {q.before}
            </dd>
            <dd className="m-0 text-sm leading-[1.55] text-ink">
              <span className="eyebrow mb-1 block md:hidden">{head.after}</span>
              {q.after}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FeatureCard({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <article className="flex flex-col gap-3 rounded-card border border-line bg-card p-[26px]">
      <h3 className="m-0 font-display text-h3 font-medium">{title}</h3>
      <p className="m-0 text-sm leading-[1.6] text-body">{text}</p>
      {children}
    </article>
  );
}

