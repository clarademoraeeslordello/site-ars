"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, { short: string; name: string }> = {
  "pt-br": { short: "PT", name: "Português" },
  en: { short: "EN", name: "English" },
  es: { short: "ES", name: "Español" },
};

/** PT / EN / ES links that keep the visitor on the equivalent page. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const current = useLocale();
  const pathname = usePathname();
  const params = useParams();

  // next-intl's <Link locale> forces the /pt-br prefix; getPathname follows "as-needed"
  // (PT unprefixed). Dynamic routes need their params to build the localized URL.
  function localizedHref(locale: string) {
    // @ts-expect-error pathname and params come from the current route
    const path: string = getPathname({ href: { pathname, params }, locale });
    return path.endsWith("/") ? path : `${path}/`;
  }

  return (
    <span
      role="group"
      aria-label={t("languageLabel")}
      className={cn("flex gap-2.5 font-mono text-xs font-medium", className)}
    >
      {routing.locales.map((locale) => {
        const active = locale === current;
        return (
          <NextLink
            key={locale}
            href={localizedHref(locale)}
            hrefLang={locale === "pt-br" ? "pt-BR" : locale}
            aria-current={active ? "page" : undefined}
            className={cn(
              "transition-colors hover:text-ink",
              active ? "text-ink" : "text-muted"
            )}
          >
            <span aria-hidden="true">{LABELS[locale].short}</span>
            <span className="sr-only">{LABELS[locale].name}</span>
          </NextLink>
        );
      })}
    </span>
  );
}
