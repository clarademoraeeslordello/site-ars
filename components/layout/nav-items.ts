import type { ComponentProps } from "react";
import type { Link } from "@/i18n/navigation";

type Href = ComponentProps<typeof Link>["href"];

export const MAIN_NAV: { key: string; href: Href }[] = [
  { key: "howItWorks", href: "/como-funciona" },
  { key: "platform", href: "/plataforma" },
  { key: "market", href: { pathname: "/", hash: "mercado" } },
  { key: "isoRadar", href: "/iso-radar" },
  { key: "about", href: "/sobre" },
];

export const FOOTER_NAV: { key: string; href: Href }[] = [
  { key: "howItWorks", href: "/como-funciona" },
  { key: "platform", href: "/plataforma" },
  { key: "isoRadar", href: "/iso-radar" },
  { key: "resources", href: "/recursos" },
  { key: "about", href: "/sobre" },
  { key: "privacy", href: "/privacidade" },
  { key: "terms", href: "/termos" },
];
