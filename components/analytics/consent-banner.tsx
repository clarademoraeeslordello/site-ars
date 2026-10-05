"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";
import { CONSENT_STORAGE_KEY, OPEN_CONSENT_EVENT, trackEvent, type AnalyticsEvent } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function readChoice(): string | null {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function loadGa(id: string) {
  if (document.getElementById("ga4")) return;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });
  const s = document.createElement("script");
  s.id = "ga4";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/**
 * Cookie consent for analytics (LGPD): nothing loads before a choice, "Recusar" is as easy as
 * "Aceitar", and the choice can be changed from the footer. Without NEXT_PUBLIC_GA_ID there are
 * no analytics cookies at all, so the banner does not show.
 */
export function ConsentBanner() {
  const t = useTranslations("consentBanner");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const choice = readChoice();
    if (choice === "granted") loadGa(GA_ID);
    else if (choice !== "denied") setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Delegated click tracking: any element with data-track="<event>" (and optional
  // data-track-location) sends that event once GA is active.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      trackEvent(el.dataset.track as AnalyticsEvent, el.dataset.trackLocation ? { location: el.dataset.trackLocation } : {});
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID || !open) return null;

  function choose(choice: "granted" | "denied") {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Private mode: the choice simply is not remembered.
    }
    if (choice === "granted" && GA_ID) loadGa(GA_ID);
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("manage")}
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-[760px] flex-col gap-4 rounded-card border border-line bg-card p-5 shadow-mock sm:flex-row sm:items-center">
        <p className="m-0 flex-1 text-sm leading-normal text-body">
          {t("text")}{" "}
          <Link href="/privacidade" className="text-ink underline underline-offset-2">
            {t("policy")}
          </Link>
        </p>
        <div className="flex flex-none gap-2">
          <button type="button" onClick={() => choose("denied")} className={buttonClasses({ variant: "secondary", size: "sm" })}>
            {t("reject")}
          </button>
          <button type="button" onClick={() => choose("granted")} className={buttonClasses({ size: "sm" })}>
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner. Rendered only when analytics is configured. */
export function CookiePreferencesButton() {
  const t = useTranslations("consentBanner");
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="whitespace-nowrap text-body hover:text-ink"
    >
      {t("manage")}
    </button>
  );
}
