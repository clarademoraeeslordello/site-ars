"use client";

import { useId, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/button";
import { subscribeToRadar } from "@/app/actions/newsletter";

const LOCALE_OPTIONS = [
  { value: "pt-br", label: "Português" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

const field =
  "h-9 rounded-control border border-line bg-well px-3 font-sans text-sm text-ink disabled:cursor-not-allowed disabled:opacity-70";

/**
 * ISO Radar signup (name, email, language, consent) with double opt-in.
 * `enabled` is false when the site has no database: the form is shown but cannot be submitted,
 * so nobody believes they subscribed when nothing was saved.
 */
export function NewsletterSignup({ enabled = false }: { enabled?: boolean }) {
  const t = useTranslations("home.radar.form");
  const locale = useLocale();
  const id = useId();
  const noteId = `${id}-note`;
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  if (state === "done") {
    return (
      <p role="status" className="m-0 rounded-control border border-tint-line bg-tint px-4 py-3.5 text-[15px] font-medium">
        {t("success")}
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-2.5 pt-1.5"
      aria-describedby={enabled ? undefined : noteId}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await subscribeToRadar({
            name: String(f.get("name") ?? ""),
            email: String(f.get("email") ?? ""),
            locale: String(f.get("locale") ?? locale) as "pt-br" | "en" | "es",
            consent: f.get("consent") === "on",
            sourcePage: window.location.pathname,
          });
          setState(res.ok ? "done" : "error");
        });
      }}
    >
      <fieldset disabled={!enabled || pending} className="m-0 flex min-w-0 flex-col gap-2.5 border-0 p-0">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-2.5">
          <label className="flex flex-col gap-1.5 text-[13px] font-medium">
            {t("name")}
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-medium">
            {t("email")}
            <input name="email" type="email" required autoComplete="email" className={field} />
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
          className={buttonClasses({ size: "sm", className: "self-start disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gold-cta disabled:hover:text-dark" })}
        >
          {t("submit")}
        </button>
      </fieldset>
      {state === "error" && (
        <p role="alert" className="m-0 text-[13px] text-crit">
          {t("error")}
        </p>
      )}
      {!enabled && (
        <p id={noteId} className="m-0 text-[13px] text-muted">
          {t("soon")}
        </p>
      )}
    </form>
  );
}
