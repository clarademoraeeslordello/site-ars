import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BrandIcon } from "@/components/brand/brand-icon";
import { LanguageSwitcher } from "./language-switcher";
import { FOOTER_NAV } from "./nav-items";
import { APP_URL, COMPANY_NAME } from "@/lib/site";
import { CookiePreferencesButton } from "@/components/analytics/consent-banner";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-[clamp(64px,8vw,96px)] border-t border-line">
      <div className="container-site flex flex-wrap items-center justify-between gap-x-11 gap-y-[22px] pb-[30px] pt-9 text-sm">
        <span className="flex items-center gap-2.5">
          <BrandIcon size={26} className="rounded-[6px]" />
          <span className="whitespace-nowrap text-[13px] text-muted">
            © {year} {COMPANY_NAME}
          </span>
        </span>
        <nav aria-label={t("label")} className="flex flex-wrap gap-x-6 gap-y-2.5">
          {FOOTER_NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="whitespace-nowrap text-body hover:text-ink"
            >
              {item.key === "privacy" || item.key === "terms" ? t(item.key) : tn(item.key)}
            </Link>
          ))}
          <a href={APP_URL} data-track="app_login_click" data-track-location="footer" className="whitespace-nowrap text-body hover:text-ink">
            {t("loginApp")}
          </a>
          <CookiePreferencesButton />
        </nav>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
