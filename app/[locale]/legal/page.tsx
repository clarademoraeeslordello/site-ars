import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/marketing/page-intro";
import { legalHref } from "@/components/legal/legal-markdown";
import { legalTitle } from "@/components/marketing/legal-document";
import { listLegalDocuments } from "@/lib/legal/documents";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return buildMetadata({ locale, href: "/legal", title: t("allDocuments"), description: t("indexLead") });
}

/** Index of the public legal documents. */
export default async function LegalIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const docs = listLegalDocuments(locale);

  return (
    <>
      <PageIntro href="/legal" eyebrow={t("eyebrow")} title={t("allDocuments")} lead={t("indexLead")} />
      <section className="container-site pt-10">
        <ul className="m-0 grid max-w-[820px] list-none gap-0 border-t border-line p-0">
          {docs.map((d) => (
            <li key={d.slug} className="border-b border-divider">
              <Link href={legalHref(d.slug)} className="block py-4 text-[17px] text-ink hover:text-gold-deep">
                {legalTitle(d.title)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
