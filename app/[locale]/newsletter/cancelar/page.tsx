import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";
import { TokenPageCard, tokenPageMetadata } from "@/components/newsletter/token-page";
import { unsubscribeAction } from "@/app/actions/newsletter";
import { findByManageToken } from "@/lib/newsletter";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string; done?: string; error?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsletter.unsubscribe" });
  return tokenPageMetadata(t("metaTitle"));
}

export default async function UnsubscribePage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { token = "", done, error } = await searchParams;
  const t = await getTranslations({ locale, namespace: "newsletter.unsubscribe" });
  const tp = await getTranslations({ locale, namespace: "newsletter.preferences" });
  const tc = await getTranslations({ locale, namespace: "newsletter.confirm" });
  const sub = token.length > 20 && token.length < 100 ? await findByManageToken(token) : null;

  if (done && sub?.status === "unsubscribed") {
    return (
      <TokenPageCard title={t("doneTitle")} status="ok">
        <p className="m-0 text-base leading-[1.65] text-body">{t("doneText")}</p>
        <Link href="/" className={buttonClasses({ variant: "secondary", className: "self-start" })}>
          {tc("back")}
        </Link>
      </TokenPageCard>
    );
  }

  if (!sub || error) {
    return (
      <TokenPageCard title={tp("invalidTitle")} status="error">
        <p className="m-0 text-base leading-[1.65] text-body">{tp("invalidText")}</p>
      </TokenPageCard>
    );
  }

  return (
    <TokenPageCard title={t("title")}>
      <p className="m-0 text-base leading-[1.65] text-body">{t("text")}</p>
      <form action={unsubscribeAction}>
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="locale" value={locale} />
        <button type="submit" className={buttonClasses({ variant: "secondary" })}>
          {t("button")}
        </button>
      </form>
    </TokenPageCard>
  );
}
