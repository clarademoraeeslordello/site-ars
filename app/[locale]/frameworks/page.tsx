import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/marketing/page-intro";
import { CtaFinal } from "@/components/marketing/cta-final";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.frameworks.meta" });
  return buildMetadata({ locale, href: "/frameworks", title: t("title"), description: t("description") });
}

export default async function FrameworksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.frameworks" });
  const groups = t.raw("groups") as { t: string; items: string[] }[];

  return (
    <>
      <PageIntro href="/frameworks" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section aria-label={t("eyebrow")} className="container-site section-space">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[18px]">
          {groups.map((g) => (
            <article key={g.t} className="flex flex-col gap-4 rounded-card border border-line bg-card p-[26px]">
              <h2 className="m-0 font-display text-h3 font-medium">{g.t}</h2>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {g.items.map((f) => (
                  <li key={f} className="rounded-full border border-line bg-well px-[13px] py-[7px] text-[13px] font-medium">
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mb-0 mt-5 text-[13px] text-muted">{t("soc2")}</p>
        <p className="mb-0 mt-2 text-[15px] text-body">
          <Link href="/demonstracao" className="text-gold underline-offset-4 hover:underline">
            {t("more")}
          </Link>
        </p>
      </section>

      <CtaFinal />
    </>
  );
}
