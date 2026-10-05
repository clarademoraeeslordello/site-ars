import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { htmlLang, type Locale } from "@/i18n/routing";
import { StatusBadge } from "@/components/ui/status-badge";
import { LIFECYCLE_TONE, formatDay } from "@/components/radar/format";
import { getPublished, toArticleLocale } from "@/lib/radar/queries";
import { formatStage, stageName } from "@/lib/radar/stages";
import { articleUrl } from "@/lib/newsletter";
import { COMPANY_NAME } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getPublished(slug);
  if (!article) return {};
  const body = article.content[toArticleLocale(locale)];
  return { title: body.title, description: body.summary };
}

const SECTIONS = ["whatHappened", "whatChanged", "impact", "watch"] as const;

export default async function RadarArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await getPublished(slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "radarPage" });
  const lang = toArticleLocale(locale);
  const body = article.content[lang];
  const dateLocale = htmlLang[locale as Locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: body.title,
    description: body.summary,
    inLanguage: dateLocale,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    publisher: { "@type": "Organization", name: COMPANY_NAME },
    isBasedOn: article.sourceUrl,
    mainEntityOfPage: articleUrl(lang, article.slug),
  };

  const facts: [string, React.ReactNode][] = [
    [t("document"), article.reference],
    [t("stage"), `${formatStage(article.stageTo)} · ${stageName(article.stageTo, lang)}`],
    ...(article.sourceDate ? [[t("sourceDate"), formatDay(article.sourceDate, dateLocale)] as [string, string]] : []),
    [t("detected"), formatDay(article.detectedAt, dateLocale)],
    [t("lastVerified"), formatDay(article.lastVerifiedAt, dateLocale)],
    [
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
    ],
  ];

  return (
    <article className="container-site section-space grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="flex min-w-0 flex-col gap-8">
        <Link href="/iso-radar" className="text-sm text-body hover:text-ink">
          ← {t("back")}
        </Link>
        <header className="flex flex-col gap-4">
          <span className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-muted">
            <StatusBadge tone={LIFECYCLE_TONE[article.lifecycle]}>{t(`status.${article.lifecycle}`)}</StatusBadge>
            {article.standard}
          </span>
          <h1 className="m-0 font-display text-[clamp(30px,3.6vw,44px)] font-medium leading-[1.12]">{body.title}</h1>
          <p className="m-0 text-lg leading-[1.6] text-body">{body.summary}</p>
        </header>
        {SECTIONS.map((key) => (
          <section key={key} className="flex flex-col gap-2.5">
            <h2 className="m-0 font-display text-h3 font-medium">{t(`sections.${key}`)}</h2>
            {body[key].split(/\n{2,}/).map((p, i) => (
              <p key={i} className="m-0 text-base leading-[1.7] text-body">
                {p}
              </p>
            ))}
          </section>
        ))}
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
