import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppPathname, Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { JsonLd, breadcrumbList } from "@/components/seo/json-ld";

/**
 * Visible breadcrumb for internal pages (Início › … › current page) plus the matching
 * BreadcrumbList structured data. The last item is the current page and is not a link.
 */
export async function Breadcrumb({ items }: { items: { label: string; href: AppPathname }[] }) {
  const t = await getTranslations("pages.common");
  const locale = (await getLocale()) as Locale;
  const trail = [{ label: t("home"), href: "/" as AppPathname }, ...items];

  return (
    <>
      <nav aria-label={t("breadcrumb")} className="text-[13px] text-muted">
        <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
          {trail.map((item, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-body">
                    {item.label}
                  </span>
                ) : (
                  // @ts-expect-error static pathnames only (no params)
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                )}
                {!last && <span aria-hidden="true">›</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbList(trail.map((item) => ({ name: item.label, url: absoluteUrl(item.href, locale) })))} />
    </>
  );
}
