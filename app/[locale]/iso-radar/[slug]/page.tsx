import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { htmlLang, type Locale } from "@/i18n/routing";
import { StatusBadge } from "@/components/ui/status-badge";
import { JsonLd } from "@/components/seo/json-ld";
import { LIFECYCLE_TONE, formatDay, type Lifecycle } from "@/components/radar/format";
import { bodyLocale, parseBody, toDbLocale } from "@/lib/radar/content";
import { getPublished } from "@/lib/radar/queries";
import { formatStage, stageName } from "@/lib/radar/stages";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { COMPANY_NAME } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getPublished(locale, slug);
  if (!article) return {};
  return buildMetadata({
    locale,
    href: { pathname: "/iso-radar/[slug]", params: { slug } },
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.summary,
    ogType: "article",
  });
}

export default async function RadarArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await getPublished(locale, slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "radarPage" });
  const dateLocale = htmlLang[locale as Locale];
  const lang = toDbLocale(locale) === "pt-BR" ? "pt-br" : (locale as "en" | "es");
  const lifecycle = article.standardStatus as Lifecycle;
  // Spanish articles carry the English text until someone writes a Spanish one in /admin.
  const textLocale = bodyLocale(article.bodyMd);
  const otherLanguage = textLocale && textLocale !== toDbLocale(locale) ? textLocale : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    inLanguage: dateLocale,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    publisher: { "@type": "Organization", name: COMPANY_NAME },
    isBasedOn: article.sourceUrl,
    mainEntityOfPage: absoluteUrl({ pathname: "/iso-radar/[slug]", params: { slug } }, locale as Locale),
  };

  const facts: [string, React.ReactNode][] = [];
  if (article.reference) facts.push([t("document"), article.reference]);
  if (article.stageTo != null) facts.push([t("stage"), `${formatStage(article.stageTo)} · ${stageName(article.stageTo, lang)}`]);
  if (article.sourceDate) facts.push([t("sourceDate"), formatDay(article.sourceDate, dateLocale)]);
  facts.push([t("detected"), formatDay(article.createdAt, dateLocale)]);
  if (article.verifiedAt) facts.push([t("lastVerified"), formatDay(article.verifiedAt, dateLocale)]);
  facts.push([
    t("transition"),
    article.transitionDeadline ? (
      article.transitionSource ? (
        <a href={article.transitionSource} rel="noopener" className="underline underline-offset-2 hover:text-gold-deep">
          {formatDay(article.transitionDeadline, dateLocale)}
        </a>
      ) : (
        formatDay(article.transitionDeadline, dateLocale)
      )
    ) : (
      t("toConfirm")
    ),
  ]);

  return (
    <article className="container-site section-space grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
      <JsonLd data={jsonLd} />
      <div className="flex min-w-0 flex-col gap-8">
        <Link href="/iso-radar" className="text-sm text-body hover:text-ink">
          ← {t("back")}
        </Link>
        <header className="flex flex-col gap-4">
          <span className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-muted">
            {LIFECYCLE_TONE[lifecycle] && <StatusBadge tone={LIFECYCLE_TONE[lifecycle]}>{t(`status.${lifecycle}`)}</StatusBadge>}
            {article.standards.join(", ")}
          </span>
          <h1 className="m-0 font-display text-[clamp(30px,3.6vw,44px)] font-medium leading-[1.12]">{article.title}</h1>
          <p className="m-0 text-lg leading-[1.6] text-body">{article.summary}</p>
          {article.authorName && <p className="m-0 text-sm text-muted">{article.authorName}</p>}
        </header>
        {otherLanguage && (
          <p className="m-0 rounded-control border border-line bg-well px-4 py-3 text-sm text-body">{t(`textIn.${otherLanguage}`)}</p>
        )}
        <div lang={otherLanguage ?? undefined} className="flex flex-col gap-8">
          {parseBody(article.bodyMd).map((section, i) => (
            <section key={i} className="flex flex-col gap-2.5">
              {section.heading && <h2 className="m-0 font-display text-h3 font-medium">{section.heading}</h2>}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="m-0 text-base leading-[1.7] text-body">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="m-0 border-t border-line pt-5 text-xs leading-[1.6] text-muted">{t("dataNote")}</p>
      </div>

      <aside className="flex flex-col gap-4 rounded-card border border-line bg-card p-6 lg:sticky lg:top-24">
        <span className="eyebrow">{t("source")}</span>
        <dl className="m-0 flex flex-col gap-3">
          {facts.map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5">
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="m-0 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        {!article.transitionDeadline && <p className="m-0 text-xs leading-[1.6] text-muted">{t("toConfirmNote")}</p>}
        <a
          href={article.sourceUrl}
          rel="noopener"
          className="inline-flex items-center justify-center rounded-control border border-ink px-4 py-2.5 text-sm font-semibold text-ink hover:bg-ink hover:text-paper"
        >
          {t("officialPage")} ↗
        </a>
      </aside>
    </article>
  );
}
