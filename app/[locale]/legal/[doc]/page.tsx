import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { routing } from "@/i18n/routing";

const DOCS: Record<string, "privacyTitle" | "cookiesTitle" | "termsTitle"> = {
  privacidade: "privacyTitle",
  cookies: "cookiesTitle",
  termos: "termsTitle",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(DOCS).map((doc) => ({ locale, doc }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale, doc } = await params;
  const key = DOCS[doc];
  if (!key) return {};
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t(key), robots: { index: false } };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale, doc } = await params;
  const key = DOCS[doc];
  if (!key) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <>
      <PageHero eyebrow="ARS" title={t(key)} />
      <Section>
        <p className="max-w-3xl leading-relaxed text-silver">
          {t("placeholder")}
        </p>
      </Section>
    </>
  );
}
