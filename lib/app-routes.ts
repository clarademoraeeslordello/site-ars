/**
 * The ARS app used to answer on auditcockpits.com before it moved to app.auditcockpits.com.
 * Old app links (invites, emails, bookmarks) still point at the apex, so these paths are sent
 * to the app instead of hitting the institutional site's 404.
 *
 * App locales: en, pt-BR, es (always prefixed). Route segments from
 * Audit_Readiness_Score/frontend/app/[locale]/(app|auth). "frameworks" and "lgpd" are left out
 * because the site has its own pages with those slugs.
 */
export const APP_ORIGIN = "https://app.auditcockpits.com";

export const APP_SEGMENTS = [
  "activities",
  "admin",
  "audit-plans",
  "audit-readiness",
  "audit-trail",
  "audits",
  "controls",
  "dashboard",
  "evidence",
  "findings",
  "login",
  "reports",
  "risks",
  "settings",
];

export const APP_API_PREFIXES = ["/api/sso", "/api/auth", "/api/audit-readiness", "/api/reports", "/api/csp-report"];

/** True when a request path belongs to the ARS app rather than the institutional site. */
export function isAppPath(pathname: string): boolean {
  // Case-sensitive on purpose: the site uses lowercase pt-br (and no PT prefix at all).
  if (pathname === "/pt-BR" || pathname.startsWith("/pt-BR/")) return true;
  if (APP_API_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true;
  const [, locale, segment] = pathname.split("/");
  return (locale === "en" || locale === "es") && APP_SEGMENTS.includes(segment);
}
