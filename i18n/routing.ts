import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-br", "en", "es"],
  defaultLocale: "pt-br",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
