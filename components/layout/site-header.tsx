"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BrandIcon } from "@/components/brand/brand-icon";
import { buttonClasses } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { MAIN_NAV } from "./nav-items";
import { APP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the panel on navigation and on Escape (returning focus to the toggle).
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/94 backdrop-blur-[8px]">
      <a
        href="#main"
        className="sr-only rounded-control focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-dark focus:px-4 focus:py-2 focus:text-dark-ink"
      >
        {t("skipToContent")}
      </a>
      <div className="container-site grid grid-cols-[minmax(0,1fr)_auto] items-center gap-[clamp(14px,2.4vw,32px)] py-3 nav:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Link
          href="/"
          aria-label={t("homeLabel")}
          className="flex flex-none items-center gap-2.5 whitespace-nowrap text-ink"
        >
          <BrandIcon size={32} className="block rounded-[8px]" />
          <span className="flex flex-col gap-[3px]">
            <span className="font-display text-[18px] font-semibold leading-none tracking-[0.08em]">
              ARS
            </span>
            <span className="font-mono text-[9px] font-medium leading-none tracking-[0.2em] text-gold">
              AUDIT READINESS
            </span>
          </span>
        </Link>

        <nav
          aria-label={t("mainLabel")}
          className="hidden justify-self-start gap-[clamp(14px,2vw,26px)] pl-[clamp(16px,3vw,48px)] whitespace-nowrap text-[15px] nav:flex"
        >
          {MAIN_NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-body transition-colors hover:text-ink"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-[clamp(10px,1.6vw,18px)] whitespace-nowrap">
          <LanguageSwitcher className="hidden sm:flex" />
          <a
            href={APP_URL}
            className="hidden text-sm font-medium text-ink hover:text-gold-deep sm:inline"
          >
            {t("login")}
          </a>
          <Link
            href="/demonstracao"
            className={buttonClasses({ size: "sm", className: "hidden sm:inline-flex" })}
          >
            {t("bookDemo")}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 items-center justify-center rounded-control border border-line bg-card text-ink nav:hidden"
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
              {open ? <path d="M3 3l12 12M15 3L3 15" /> : <path d="M2 4.5h14M2 9h14M2 13.5h14" />}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={t("mainLabel")}
        hidden={!open}
        className={cn("border-t border-line bg-paper nav:hidden")}
      >
        <div className="container-site py-4">
          <ul className="flex flex-col">
            {MAIN_NAV.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-control px-2 py-3 text-[15px] text-body hover:bg-hover hover:text-ink"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-divider pt-4 sm:hidden">
            <Link href="/demonstracao" className={buttonClasses({ className: "w-full" })}>
              {t("bookDemo")}
            </Link>
            <a href={APP_URL} className={buttonClasses({ variant: "secondary", className: "w-full" })}>
              {t("login")}
            </a>
            <LanguageSwitcher className="justify-center gap-5 py-2 text-sm" />
          </div>
        </div>
      </nav>
    </header>
  );
}
