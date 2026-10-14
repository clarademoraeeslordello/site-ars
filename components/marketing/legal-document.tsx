import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/marketing/page-intro";
import { LegalMarkdown, legalToc } from "@/components/legal/legal-markdown";
import { getLegalBody, getLegalMeta, type LegalSlug } from "@/lib/legal/documents";

function formatDate(iso: string | null, locale: string) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "pt-br" ? "pt-BR" : locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** Document title without the " — Audit Cockpits" suffix used in the source files. */
export function legalTitle(title: string) {
  return title.replace(/\s+—\s+Audit Cockpits$/, "");
}

/**
 * Public legal document (privacy, terms, cookies…). Text exported from the platform repository
 * (see lib/legal/documents.ts). `/privacidade` and `/termos` use the standard page intro with
 * breadcrumb; `/legal/[slug]` pages have no `href` (the breadcrumb only takes static routes) and
 * link back to the document index instead.
 */
export async function LegalDocument({
  locale,
  slug,
  href,
}: {
  locale: string;
  slug: LegalSlug;
  href?: "/privacidade" | "/termos";
}) {
  const t = await getTranslations({ locale, namespace: "legal" });
  const meta = getLegalMeta(slug, locale);
  const body = getLegalBody(slug, locale);
  const toc = legalToc(body);
  const updated = formatDate(meta.updated, locale);
  const title = legalTitle(meta.title);
  const details = [
    meta.version ? t("version", { version: meta.version }) : null,
    updated ? t("updated", { date: updated }) : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      {href ? (
        <PageIntro href={href} eyebrow={t("eyebrow")} crumb={title} title={title} lead={details} />
      ) : (
        <section aria-labelledby="page-title" className="container-site pt-[clamp(32px,5vw,56px)]">
          <Link href="/legal" className="text-[13px] text-muted hover:text-ink">
            ‹ {t("allDocuments")}
          </Link>
          <div className="mt-[clamp(32px,5vw,56px)] flex max-w-[820px] flex-col gap-5">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1 id="page-title" className="m-0 font-display text-h1 font-medium">
              {title}
            </h1>
            {details && <p className="m-0 text-[15px] text-muted">{details}</p>}
          </div>
        </section>
      )}

      <section className="container-site pt-10">
        {locale === "es" && (
          <p role="note" className="m-0 mb-8 max-w-[820px] rounded-md border border-line bg-well px-4 py-3 text-[15px] text-body">
            {t("esNotice")}
          </p>
        )}
        {toc.length > 3 && (
          <nav aria-label={t("toc")} className="mb-10 max-w-[820px] rounded-md border border-line px-5 py-4">
            <p className="m-0 mb-3 text-label uppercase tracking-[0.08em] text-muted">{t("toc")}</p>
            <ol className="m-0 grid list-none gap-1.5 p-0 sm:grid-cols-2">
              {toc.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-[14px] text-body hover:text-ink">
                    {s.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <LegalMarkdown source={body} />
        <p className="mb-0 mt-12 max-w-[820px] border-t border-line pt-6 text-[14px] text-muted">
          {t("contact")}{" "}
          <a href="mailto:dpo@auditcockpits.com" className="text-ink underline underline-offset-2">
            dpo@auditcockpits.com
          </a>
        </p>
      </section>
    </>
  );
}
