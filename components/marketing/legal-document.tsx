import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/marketing/page-intro";

/** Legal page shell. The text stays a placeholder until the legal review is done. */
export async function LegalDocument({
  locale,
  titleKey,
  href,
}: {
  locale: string;
  titleKey: "privacyTitle" | "termsTitle";
  href: "/privacidade" | "/termos";
}) {
  const t = await getTranslations({ locale, namespace: "legal" });
  return (
    <>
      <PageIntro href={href} eyebrow="Audit Cockpits" crumb={t(titleKey)} title={t(titleKey)} />
      <section className="container-site pt-10">
        <p className="m-0 max-w-3xl leading-relaxed text-body">{t("placeholder")}</p>
      </section>
    </>
  );
}
