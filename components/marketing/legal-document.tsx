import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";

/** Legal page shell. The text stays a placeholder until the legal review is done. */
export async function LegalDocument({
  locale,
  titleKey,
}: {
  locale: string;
  titleKey: "privacyTitle" | "termsTitle";
}) {
  const t = await getTranslations({ locale, namespace: "legal" });
  return (
    <>
      <PageHero eyebrow="Audit Cockpits" title={t(titleKey)} />
      <Section>
        <p className="max-w-3xl leading-relaxed text-body">{t("placeholder")}</p>
      </Section>
    </>
  );
}
