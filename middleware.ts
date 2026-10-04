import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals, files with an extension and metadata routes without one.
  matcher: "/((?!api|_next|_vercel|apple-icon|opengraph-image|.*\\..*).*)",
};
