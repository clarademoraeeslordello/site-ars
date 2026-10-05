import type { ComponentProps } from "react";
import type { Link } from "@/i18n/navigation";

type Href = ComponentProps<typeof Link>["href"];

// Recursos (/recursos/) joins the menu and footer
// when its page exists (step 7), so nothing links to a 404.
export const MAIN_NAV: { key: string; href: Href }[] = [
  { key: "howItWorks", href: "/como-funciona" },
  { key: "platform", href: "/plataforma" },
  { key: "market", href: "/mercado" },
  { key: "about", href: "/sobre" },
  { key: "isoRadar", href: "/iso-radar" },
];

export const FOOTER_NAV: { key: string; href: Href }[] = [
  { key: "howItWorks", href: "/como-funciona" },
  { key: "platform", href: "/plataforma" },
  { key: "certification", href: "/certificacao-e-manutencao" },
  { key: "frameworks", href: "/frameworks" },
  { key: "security", href: "/seguranca" },
  { key: "about", href: "/sobre" },
  { key: "privacy", href: "/privacidade" },
  { key: "terms", href: "/termos" },
];
