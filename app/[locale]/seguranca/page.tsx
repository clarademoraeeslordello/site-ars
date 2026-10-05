import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaFinal, ContactLine } from "@/components/marketing/cta-final";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.security.meta" });
  return buildMetadata({ locale, href: "/seguranca", title: t("title"), description: t("description") });
}

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.security" });
  const items = t.raw("items") as { t: string; d: string }[];

  return (
    <>
      <PageIntro href="/seguranca" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section aria-label={t("eyebrow")} className="container-site section-space">
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-10 gap-y-0 border-t border-line p-0">
          {items.map((item) => (
            <li key={item.t} className="flex flex-col gap-1.5 border-b border-divider py-6">
              <h2 className="m-0 font-display text-h3 font-medium">{item.t}</h2>
              <p className="m-0 text-[15px] leading-[1.6] text-body">{item.d}</p>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-body">
          {t("note")} <ContactLine light />
        </p>
      </section>

      <CtaFinal />
    </>
  );
}
