import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";
import { TokenPageCard, tokenPageMetadata } from "@/components/newsletter/token-page";
import { preferencesAction } from "@/app/actions/newsletter";
import { findByManageToken } from "@/lib/newsletter";
import { routeLocale } from "@/lib/consent";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string; saved?: string; confirmed?: string }>;
};

const OPTIONS = [
  { value: "pt-br", label: "Português" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsletter.preferences" });
  return tokenPageMetadata(t("metaTitle"));
}

export default async function PreferencesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { token = "", saved, confirmed } = await searchParams;
  const t = await getTranslations({ locale, namespace: "newsletter.preferences" });
  const tc = await getTranslations({ locale, namespace: "newsletter.confirm" });
  const sub = token.length > 20 && token.length < 100 ? await findByManageToken(token) : null;

  if (!sub || sub.status === "unsubscribed") {
    return (
      <TokenPageCard title={t("invalidTitle")} status="error">
        <p className="m-0 text-base leading-[1.65] text-body">{t("invalidText")}</p>
        <Link href="/" className={buttonClasses({ variant: "secondary", className: "self-start" })}>
          {tc("back")}
        </Link>
      </TokenPageCard>
    );
  }

  return (
    <TokenPageCard title={confirmed ? tc("doneTitle") : t("title")} status={confirmed ? "ok" : undefined}>
      {confirmed && <p className="m-0 text-base leading-[1.65] text-body">{tc("doneText")}</p>}
      <p className="m-0 text-[15px] leading-[1.6] text-body">{t("text")}</p>
      <form action={preferencesAction} className="flex flex-wrap items-end gap-3">
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="locale" value={locale} />
        <label className="flex flex-col gap-1.5 text-[13px] font-medium">
          {t("locale")}
          <select
            name="newsletterLocale"
            defaultValue={routeLocale(sub.locale)}
            className="h-10 rounded-control border border-line bg-well px-3 text-sm"
          >
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className={buttonClasses({ size: "sm", className: "h-10" })}>
          {t("save")}
        </button>
      </form>
      {saved && (
        <p role="status" className="m-0 rounded-control border border-ok-line bg-ok-bg px-3.5 py-2.5 text-sm text-ok">
          {t("saved")}
        </p>
      )}
      <div className="mt-2 border-t border-divider pt-4">
        <p className="m-0 mb-2 text-sm text-muted">{t("unsubscribeTitle")}</p>
        <Link
          href={{ pathname: "/newsletter/cancelar", query: { token } }}
          className="text-sm text-body underline underline-offset-2 hover:text-ink"
        >
          {t("unsubscribe")}
        </Link>
      </div>
    </TokenPageCard>
  );
}
