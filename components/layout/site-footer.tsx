import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline-dark bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold">ARS</p>
            <p className="mt-1 font-data text-[0.65rem] uppercase tracking-[0.18em] text-gold-bright">
              {t("tagline")}
            </p>
          </div>
          <nav aria-label={t("product")}>
            <p className="font-data text-xs uppercase tracking-widest text-silver">
              {t("product")}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="hover:text-gold-bright" href="/plataforma">{tn("platform")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/audit-readiness-score">{tn("score")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/frameworks">{tn("frameworks")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/lgpd">{tn("lgpd")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/auditorias">{tn("audits")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/seguranca">{tn("security")}</Link></li>
            </ul>
          </nav>
          <nav aria-label={t("company")}>
            <p className="font-data text-xs uppercase tracking-widest text-silver">
              {t("company")}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="hover:text-gold-bright" href="/sobre">{tn("about")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/solucoes">{tn("solutions")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/consultorias">{tn("consultancies")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/faq">{tn("faq")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/demonstracao">{tn("requestDemo")}</Link></li>
            </ul>
          </nav>
          <nav aria-label={t("legal")}>
            <p className="font-data text-xs uppercase tracking-widest text-silver">
              {t("legal")}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="hover:text-gold-bright" href="/legal/privacidade">{t("privacy")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/legal/cookies">{t("cookies")}</Link></li>
              <li><Link className="hover:text-gold-bright" href="/legal/termos">{t("terms")}</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 border-t border-hairline-dark pt-6 text-xs text-silver">
          <p>© {year} Audit Readiness Score. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
