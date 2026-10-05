import type { ComponentProps } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Href = ComponentProps<typeof Link>["href"];

/** Visible breadcrumb for internal pages: Início › … › current page (not a link). */
export async function Breadcrumb({ items }: { items: { label: string; href?: Href }[] }) {
  const t = await getTranslations("pages.common");
  const trail = [{ label: t("home"), href: "/" as Href }, ...items];
  return (
    <nav aria-label={t("breadcrumb")} className="text-[13px] text-muted">
      <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined} className={last ? "text-body" : undefined}>
                  {item.label}
                </span>
              ) : (
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
  );
}
