"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "platform", href: "/plataforma" },
  { key: "score", href: "/audit-readiness-score" },
  { key: "frameworks", href: "/frameworks" },
  { key: "lgpd", href: "/lgpd" },
  { key: "audits", href: "/auditorias" },
  { key: "solutions", href: "/solucoes" },
] as const;

const LOCALES = [
  { code: "pt-br", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-tight">
            ARS
          </span>
          <span className="hidden font-data text-[0.65rem] uppercase tracking-[0.18em] text-silver lg:inline">
            Audit Readiness Score
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 xl:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "text-sm text-ink-soft transition-colors hover:text-ink",
                pathname === item.href && "font-medium text-ink"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="locale-select">
            {t("languageLabel")}
          </label>
          <select
            id="locale-select"
            value={locale}
            onChange={(e) => switchLocale(e.target.value)}
            className="hidden rounded-sm border border-hairline bg-paper px-2 py-1.5 font-data text-xs text-ink-soft sm:block"
          >
            {LOCALES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>

          <Link
            href="/demonstracao"
            className="hidden rounded-sm bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink-soft md:inline-block"
          >
            {t("requestDemo")}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-hairline xl:hidden"
          >
            <span className="sr-only">{open ? t("menuClose") : t("menuOpen")}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {open ? (
                <path d="M3 3l12 12M15 3L3 15" />
              ) : (
                <path d="M2 4.5h14M2 9h14M2 13.5h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Principal"
          className="border-t border-hairline bg-paper px-4 py-4 xl:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-2 py-2.5 text-sm text-ink-soft hover:bg-gold-faint hover:text-ink"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/demonstracao"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-sm bg-ink px-4 py-2.5 text-center text-sm font-medium text-paper"
              >
                {t("requestDemo")}
              </Link>
            </li>
            <li className="mt-3">
              <label className="sr-only" htmlFor="locale-select-mobile">
                {t("languageLabel")}
              </label>
              <select
                id="locale-select-mobile"
                value={locale}
                onChange={(e) => switchLocale(e.target.value)}
                className="w-full rounded-sm border border-hairline bg-paper px-2 py-2 font-data text-xs text-ink-soft"
              >
                {LOCALES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
