import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

type LocalizedPath = { pt: string; en: string; es: string };

// Old URLs (PT with /pt-br prefix, renamed pages, PT slugs under /en and /es) and their new homes.
const MOVED: { from: LocalizedPath; to: LocalizedPath }[] = [
  {
    from: { pt: "/audit-readiness-score", en: "/audit-readiness-score", es: "/audit-readiness-score" },
    to: { pt: "/como-funciona", en: "/how-it-works", es: "/como-funciona" },
  },
  {
    from: { pt: "/auditorias", en: "/auditorias", es: "/auditorias" },
    to: { pt: "/certificacao-e-manutencao", en: "/certification-maintenance", es: "/certificacion-y-mantenimiento" },
  },
  {
    from: { pt: "/legal/privacidade", en: "/legal/privacidade", es: "/legal/privacidade" },
    to: { pt: "/privacidade", en: "/privacy", es: "/privacidad" },
  },
  {
    from: { pt: "/legal/cookies", en: "/legal/cookies", es: "/legal/cookies" },
    to: { pt: "/privacidade", en: "/privacy", es: "/privacidad" },
  },
  {
    from: { pt: "/legal/termos", en: "/legal/termos", es: "/legal/termos" },
    to: { pt: "/termos", en: "/terms", es: "/terminos" },
  },
  {
    from: { pt: "/plataforma", en: "/plataforma", es: "/plataforma" },
    to: { pt: "/plataforma", en: "/platform", es: "/plataforma" },
  },
  {
    from: { pt: "/seguranca", en: "/seguranca", es: "/seguranca" },
    to: { pt: "/seguranca", en: "/security", es: "/seguridad" },
  },
  {
    from: { pt: "/sobre", en: "/sobre", es: "/sobre" },
    to: { pt: "/sobre", en: "/about", es: "/sobre" },
  },
  {
    from: { pt: "/demonstracao", en: "/demonstracao", es: "/demonstracao" },
    to: { pt: "/demonstracao", en: "/demo", es: "/demostracion" },
  },
  {
    from: { pt: "/frameworks", en: "/frameworks", es: "/frameworks" },
    to: { pt: "/frameworks", en: "/frameworks", es: "/marcos" },
  },
];

function movedRedirects() {
  const rules: { source: string; destination: string; permanent: true }[] = [];
  for (const { from, to } of MOVED) {
    // Destinations end with "/" (trailingSlash) so each old URL resolves in a single hop.
    // /pt-br/<old> always moves to the unprefixed PT URL.
    rules.push({ source: `/pt-br${from.pt}`, destination: `${to.pt}/`, permanent: true });
    if (from.pt !== to.pt) rules.push({ source: from.pt, destination: `${to.pt}/`, permanent: true });
    if (from.en !== to.en) rules.push({ source: `/en${from.en}`, destination: `/en${to.en}/`, permanent: true });
    if (from.es !== to.es) rules.push({ source: `/es${from.es}`, destination: `/es${to.es}/`, permanent: true });
  }
  return rules;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
    return [
      ...movedRedirects(),
      { source: "/pt-br", destination: "/", permanent: true },
      { source: "/pt-br/:path+", destination: "/:path+/", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
