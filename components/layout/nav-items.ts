import type { ComponentProps } from "react";
import type { Link } from "@/i18n/navigation";

type Href = ComponentProps<typeof Link>["href"];

// ISO Radar (/iso-radar/) and Recursos (/recursos/) join the menu and footer
// when their pages exist (steps 3 and 7), so nothing links to a 404.
export const MAIN_NAV: { key: string; href: Href }[] = [
  { key: "howItWorks", href: "/como-funciona" },
  { key: "platform", href: "/plataforma" },
  { key: "market", href: { pathname: "/", hash: "mercado" } },
  { key: "about", href: "/sobre" },
];

export const FOOTER_NAV: { key: string; href: Href }[] = [
  { key: "howItWorks", href: "/como-funciona" },
  { key: "platform", href: "/plataforma" },
  { key: "about", href: "/sobre" },
  { key: "privacy", href: "/privacidade" },
  { key: "terms", href: "/termos" },
];
