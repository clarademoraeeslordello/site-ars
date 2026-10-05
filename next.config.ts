import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

type LocalizedPath = { pt: string; en: string; es: string };

// Renamed pages and PT slugs under /en and /es, and their new homes.
// The old /pt-br prefix is not handled here: next.config matching ignores case and would also
// catch the ARS app's /pt-BR links. next-intl strips /pt-br and middleware.ts sends /pt-BR to the app.
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
  // Pages retired in step 3, consolidated into Frameworks, Plataforma and Como funciona.
  {
    from: { pt: "/lgpd", en: "/lgpd", es: "/lgpd" },
    to: { pt: "/frameworks", en: "/frameworks", es: "/marcos" },
  },
  {
    from: { pt: "/solucoes", en: "/solucoes", es: "/solucoes" },
    to: { pt: "/plataforma", en: "/platform", es: "/plataforma" },
  },
  {
    from: { pt: "/consultorias", en: "/consultorias", es: "/consultorias" },
    to: { pt: "/plataforma", en: "/platform", es: "/plataforma" },
  },
  {
    from: { pt: "/faq", en: "/faq", es: "/faq" },
    to: { pt: "/como-funciona", en: "/how-it-works", es: "/como-funciona" },
  },
];

function movedRedirects() {
  const rules: { source: string; destination: string; permanent: true }[] = [];
  for (const { from, to } of MOVED) {
    // Destinations end with "/" (trailingSlash) so each old URL resolves in a single hop.
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
    ];
  },
};

export default withNextIntl(nextConfig);
