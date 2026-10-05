import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { APP_ORIGIN, isAppPath } from "./lib/app-routes";

const intl = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // One canonical host: www.auditcockpits.com → auditcockpits.com (avoids duplicate content).
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  if (host.startsWith("www.")) {
    return NextResponse.redirect(`https://${host.slice(4)}${pathname}${search}`, 308);
  }
  // Old ARS app links on the apex domain go to app.auditcockpits.com (path and query kept).
  if (isAppPath(pathname)) {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    return NextResponse.redirect(`${APP_ORIGIN}${path}${search}`, 308);
  }
  // Old /pt-br prefix (PT is unprefixed now): permanent redirect. next-intl would answer 307,
  // which search engines treat as temporary. Lowercase only: /pt-BR belongs to the app (above).
  if (pathname === "/pt-br" || pathname.startsWith("/pt-br/")) {
    const rest = pathname.slice("/pt-br".length) || "/";
    // Public host from the proxy headers (request.url carries the container's internal host).
    const proto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
    return NextResponse.redirect(`${proto}://${host}${rest}${search}`, 308);
  }
  // The site's own API routes are not localized.
  if (pathname.startsWith("/api/")) return NextResponse.next();
  const response = intl(request);
  // Preview hosts (*.up.railway.app) must not compete with auditcockpits.com in search.
  if (host.endsWith(".up.railway.app")) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  // Skip Next internals, files with an extension and metadata routes without one.
  // /api is included only for the app's API paths handled above.
  matcher: ["/((?!api|_next|_vercel|apple-icon|og/|.*\\..*).*)", "/api/:path*"],
};
