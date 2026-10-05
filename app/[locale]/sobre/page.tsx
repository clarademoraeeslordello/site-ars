import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaFinal } from "@/components/marketing/cta-final";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.about" });

  return (
    <>
      <section aria-labelledby="page-title" className="container-site pt-[clamp(32px,5vw,56px)]">
        <Breadcrumb items={[{ label: t("eyebrow") }]} />
        <div className="mt-[clamp(32px,5vw,56px)] flex flex-col gap-[18px] rounded-card border border-line bg-card p-[clamp(28px,4.5vw,56px)]">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 id="page-title" className="m-0 font-display text-h2 font-medium">
            {t("title")}
          </h1>
          <p className="m-0 max-w-[860px] font-display text-[clamp(22px,2.4vw,30px)] font-normal leading-[1.4] text-pretty">
            {t("quote")}
          </p>
          <p className="m-0 max-w-[760px] text-base leading-[1.65] text-body">{t("text")}</p>
        </div>
      </section>

      <section aria-labelledby="names-title" className="container-site section-space">
        <div className="flex max-w-[760px] flex-col gap-4">
          <h2 id="names-title" className="m-0 font-display text-h2 font-medium">
            {t("namesTitle")}
          </h2>
          <p className="m-0 text-base leading-[1.65] text-body">{t("names")}</p>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
