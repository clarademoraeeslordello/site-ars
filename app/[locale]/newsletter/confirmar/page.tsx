import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";
import { TokenPageCard, tokenPageMetadata } from "@/components/newsletter/token-page";
import { confirmAction } from "@/app/actions/newsletter";
import { isConfirmTokenValid } from "@/lib/newsletter";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string; error?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsletter.confirm" });
  return tokenPageMetadata(t("metaTitle"));
}

export default async function ConfirmPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { token = "", error } = await searchParams;
  const t = await getTranslations({ locale, namespace: "newsletter.confirm" });
  const valid = !error && token.length > 20 && token.length < 100 && (await isConfirmTokenValid(token));

  if (!valid) {
    return (
      <TokenPageCard title={t("invalidTitle")} status="error">
        <p className="m-0 text-base leading-[1.65] text-body">{t("invalidText")}</p>
        <Link
          href={{ pathname: "/", hash: "iso-radar" }}
          className={buttonClasses({ variant: "secondary", className: "self-start" })}
        >
          {t("back")}
        </Link>
      </TokenPageCard>
    );
  }

  // Confirmation happens on this button (POST), not on opening the email link, so mail
  // scanners that pre-open links cannot confirm a subscription on someone's behalf.
  return (
    <TokenPageCard title={t("title")}>
      <p className="m-0 text-base leading-[1.65] text-body">{t("text")}</p>
      <form action={confirmAction}>
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="locale" value={locale} />
        <button type="submit" className={buttonClasses()}>
          {t("button")}
        </button>
      </form>
    </TokenPageCard>
  );
}
