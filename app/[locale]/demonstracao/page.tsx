import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/marketing/page-intro";
import { ContactLine } from "@/components/marketing/cta-final";
import { DemoRequestForm } from "@/components/forms/demo-request-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.demo.meta" });
  return buildMetadata({ locale, href: "/demonstracao", title: t("title"), description: t("description") });
}

export default async function DemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.demo" });
  const next = t.raw("next") as string[];

  return (
    <>
      <PageIntro href="/demonstracao" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section aria-label={t("eyebrow")} className="container-site pt-[clamp(48px,6vw,72px)]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="rounded-card border border-line bg-card p-[clamp(24px,4vw,40px)]">
            <DemoRequestForm />
          </div>
          <aside className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="m-0 font-display text-h3 font-medium">{t("nextTitle")}</h2>
              <ol className="m-0 flex list-none flex-col border-t border-line p-0">
                {next.map((step, i) => (
                  <li key={step} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 border-b border-divider py-3 text-sm text-body">
                    <span className="font-mono text-[11px] leading-5 text-gold">{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="m-0 font-display text-h3 font-medium">{t("contactTitle")}</h2>
              <ContactLine light />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
