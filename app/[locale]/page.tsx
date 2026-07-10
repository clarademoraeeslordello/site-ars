import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { ReadinessRuler } from "@/components/marketing/readiness-ruler";
import { Section, Eyebrow, SectionTitle } from "@/components/marketing/section";
import { CtaBand } from "@/components/marketing/cta-band";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  const tc = useTranslations("cta");

  const problems = t.raw("problem.items") as { title: string; text: string }[];
  const questions = t.raw("questions.items") as { q: string; a: string }[];
  const steps = t.raw("journey.steps") as { title: string; text: string }[];
  const capabilities = t.raw("capabilities.items") as { title: string; text: string }[];
  const profiles = t.raw("profiles.items") as { role: string; text: string }[];
  const trust = t.raw("trust.items") as { title: string; text: string }[];

  return (
    <>
      {/* Hero */}
      <Section className="pt-20 sm:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/demonstracao"
                className="rounded-sm bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                {tc("requestDemo")}
              </Link>
              <Link
                href="/plataforma"
                className="rounded-sm border border-ink px-6 py-3 font-medium text-ink transition-colors hover:bg-gold-faint"
              >
                {tc("seeHow")}
              </Link>
            </div>
          </div>
          <div className="rounded-md border border-hairline bg-paper-raised p-6 shadow-sm sm:p-8">
            <ReadinessRuler
              value={87}
              label={t("hero.rulerLabel")}
              bandLow={t("hero.rulerBandLow")}
              bandMid={t("hero.rulerBandMid")}
              bandHigh={t("hero.rulerBandHigh")}
            />
          </div>
        </div>
      </Section>

      {/* Problem */}
      <Section className="border-t border-hairline">
        <Eyebrow>{t("problem.eyebrow")}</Eyebrow>
        <SectionTitle>{t("problem.title")}</SectionTitle>
        <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2">
          {problems.map((p) => (
            <div key={p.title} className="bg-paper p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Five questions — dark editorial band */}
      <Section dark>
        <Eyebrow dark>{t("questions.eyebrow")}</Eyebrow>
        <SectionTitle>{t("questions.title")}</SectionTitle>
        <ol className="mt-12 space-y-0 divide-y divide-hairline-dark border-y border-hairline-dark">
          {questions.map((item, i) => (
            <li
              key={item.q}
              className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr_1.4fr] sm:items-baseline sm:gap-6"
            >
              <span className="font-data text-sm text-gold-bright">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-semibold sm:text-2xl">
                {item.q}
              </h3>
              <p className="text-sm leading-relaxed text-paper/75">{item.a}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Journey */}
      <Section>
        <Eyebrow>{t("journey.eyebrow")}</Eyebrow>
        <SectionTitle>{t("journey.title")}</SectionTitle>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="relative border-l-2 border-gold pl-5">
              <span className="font-data text-xs text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Capabilities */}
      <Section className="border-t border-hairline">
        <Eyebrow>{t("capabilities.eyebrow")}</Eyebrow>
        <SectionTitle>{t("capabilities.title")}</SectionTitle>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.title}>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Profiles */}
      <Section className="border-t border-hairline">
        <Eyebrow>{t("profiles.eyebrow")}</Eyebrow>
        <SectionTitle>{t("profiles.title")}</SectionTitle>
        <dl className="mt-10 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((p) => (
            <div key={p.role} className="bg-paper p-6">
              <dt className="font-data text-xs uppercase tracking-widest text-gold">
                {p.role}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">
                {p.text}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Trust — dark band */}
      <Section dark>
        <Eyebrow dark>{t("trust.eyebrow")}</Eyebrow>
        <SectionTitle>{t("trust.title")}</SectionTitle>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {trust.map((item) => (
            <div key={item.title} className="border-t border-gold-bright/40 pt-4">
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/75">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Frameworks strip */}
      <Section>
        <Eyebrow>{t("frameworks.eyebrow")}</Eyebrow>
        <SectionTitle>{t("frameworks.title")}</SectionTitle>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
          {t("frameworks.text")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {["ISO 27001", "ISO 9001", "ISO 20000-1", "ISO 22301", "ISO 27701", "LGPD"].map(
            (f) => (
              <span
                key={f}
                className="rounded-sm border border-hairline bg-paper-raised px-4 py-2 font-data text-sm"
              >
                {f}
              </span>
            )
          )}
        </div>
        <Link
          href="/frameworks"
          className="mt-6 inline-block text-sm font-medium text-gold underline-offset-4 hover:underline"
        >
          {t("frameworks.viewAll")} →
        </Link>
      </Section>

      <CtaBand title={t("finalCta.title")} text={t("finalCta.text")} />
    </>
  );
}
