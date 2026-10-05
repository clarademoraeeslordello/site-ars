"use client";

import { useId, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const LOCALE_OPTIONS = [
  { value: "pt-br", label: "Português" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

const field =
  "h-9 rounded-control border border-line bg-well px-3 font-sans text-sm text-ink disabled:cursor-not-allowed disabled:opacity-70";

type State = "idle" | "sending" | "done" | "error" | "invalid";

/**
 * ISO Radar signup (name, email, language, consent) → POST /api/newsletter (double opt-in).
 * `enabled` is false while sending email is not configured: the form shows but cannot be sent,
 * so nobody believes they subscribed when nothing could be confirmed.
 */
export function NewsletterSignup({ enabled = false }: { enabled?: boolean }) {
  const t = useTranslations("home.radar.form");
  const tn = useTranslations("newsletter.form");
  const locale = useLocale();
  const pathname = usePathname();
  const id = useId();
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          locale: data.get("locale"),
          consent: data.get("consent") === "on",
          sourcePath: pathname,
          website: data.get("website") ?? "",
        }),
      });
      if (res.ok) {
        setState("done");
        trackEvent("newsletter_subscribe", { source: pathname, locale: String(data.get("locale")) });
      } else {
        setState(res.status === 400 ? "invalid" : "error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p role="status" className="m-0 mt-1.5 rounded-control border border-ok-line bg-ok-bg px-3.5 py-3 text-sm leading-normal text-ok">
        {t("success")}
      </p>
    );
  }

  const disabled = !enabled || state === "sending";
  return (
    <form className="flex flex-col gap-2.5 pt-1.5" onSubmit={onSubmit} aria-describedby={`${id}-note`}>
      <fieldset disabled={!enabled} className="m-0 flex min-w-0 flex-col gap-2.5 border-0 p-0">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-2.5">
          <label className="flex flex-col gap-1.5 text-[13px] font-medium">
            {t("name")}
            <input name="name" required minLength={2} maxLength={120} autoComplete="name" className={field} />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-medium">
            {t("email")}
            <input name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-medium">
            {t("locale")}
            <select name="locale" defaultValue={locale} className={`${field} px-2.5`}>
              {LOCALE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="flex items-start gap-2.5 text-[13px] leading-normal text-body">
          <input type="checkbox" name="consent" required className="mt-[3px] accent-gold" />
          <span>
            {t.rich("consent", {
              link: (chunks) => (
                <Link href="/privacidade" className="text-ink underline underline-offset-2 hover:text-gold-deep">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        <button
          type="submit"
          disabled={disabled}
          className={buttonClasses({
            size: "sm",
            className: "self-start disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gold-cta disabled:hover:text-dark",
          })}
        >
          {state === "sending" ? tn("sending") : t("submit")}
        </button>
      </fieldset>
      <p id={`${id}-note`} role={state === "error" || state === "invalid" ? "alert" : undefined} className="m-0 text-[13px] text-muted empty:hidden">
        {!enabled ? t("soon") : state === "error" ? tn("error") : state === "invalid" ? tn("invalid") : ""}
      </p>
    </form>
  );
}
