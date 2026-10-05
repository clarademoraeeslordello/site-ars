import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { htmlLang, type Locale } from "@/i18n/routing";
import { NewsletterSignup } from "@/components/forms/newsletter-signup";
import { RadarList, type RadarListItem } from "@/components/radar/radar-list";
import { RADAR_CATALOG } from "@/lib/radar/catalog";
import { listPublished } from "@/lib/radar/queries";
import { newsletterEnabled } from "@/lib/email/sender";
import { buildMetadata } from "@/lib/seo";
import type { Lifecycle } from "@/components/radar/format";

// Rebuilt at most every 5 minutes; publishing in /admin also revalidates it right away.
export const revalidate = 300;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "radarPage" });
  return buildMetadata({ locale, href: "/iso-radar", title: t("title"), description: t("metaDescription") });
}

export default async function IsoRadarPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "radarPage" });
  const items: RadarListItem[] = (await listPublished(locale)).map((a) => ({
    slug: a.slug,
    standard: a.standards[0] ?? a.reference ?? "ISO",
    lifecycle: a.standardStatus as Lifecycle,
    title: a.title,
    summary: a.summary,
    sourceDate: a.sourceDate,
    lastVerifiedAt: (a.verifiedAt ?? a.updatedAt).toISOString(),
  }));

  return (
    <div className="container-site section-space grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)]">
      <div className="flex min-w-0 flex-col gap-8">
        <header className="flex flex-col gap-3">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="m-0 font-display text-h2 font-medium">{t("title")}</h1>
          <p className="m-0 max-w-[640px] text-base leading-[1.65] text-body">{t("text")}</p>
        </header>
        <RadarList items={items} dateLocale={htmlLang[locale as Locale]} />
      </div>

      <aside className="flex flex-col gap-8 lg:sticky lg:top-24">
        <section aria-labelledby="radar-subscribe" className="flex flex-col gap-3 rounded-card border border-line bg-card p-6">
          <h2 id="radar-subscribe" className="m-0 font-display text-h3 font-medium">
            {t("subscribeTitle")}
          </h2>
          <NewsletterSignup enabled={newsletterEnabled()} />
        </section>
        <section aria-labelledby="radar-monitoring" className="flex flex-col gap-3">
          <h2 id="radar-monitoring" className="eyebrow m-0">
            {t("monitoring")}
          </h2>
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
            {RADAR_CATALOG.map((e) => (
              <li key={e.key} className="rounded-full border border-line bg-well px-[11px] py-[5px] text-xs font-medium">
                {e.name}
              </li>
            ))}
          </ul>
          <p className="m-0 text-xs leading-[1.6] text-muted">{t("dataNote")}</p>
        </section>
      </aside>
    </div>
  );
}
