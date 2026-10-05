"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import { LIFECYCLE_TONE, formatDay, type Lifecycle } from "./format";

export type RadarListItem = {
  slug: string;
  standard: string;
  lifecycle: Lifecycle;
  title: string;
  summary: string;
  sourceDate: string | null;
  lastVerifiedAt: string;
};

const chip =
  "rounded-full border px-[13px] py-[6px] text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep";

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(chip, active ? "border-ink bg-ink text-paper" : "border-line bg-card text-body hover:border-ink hover:text-ink")}
    >
      {children}
    </button>
  );
}

export function RadarList({ items, dateLocale }: { items: RadarListItem[]; dateLocale: string }) {
  const t = useTranslations("radarPage");
  const [standard, setStandard] = useState<string | null>(null);
  const [status, setStatus] = useState<Lifecycle | null>(null);

  const standards = useMemo(() => [...new Set(items.map((i) => i.standard))].sort(), [items]);
  const statuses = useMemo(
    () => (["published", "transition", "under_review", "withdrawn"] as const).filter((s) => items.some((i) => i.lifecycle === s)),
    [items]
  );
  const visible = items.filter((i) => (!standard || i.standard === standard) && (!status || i.lifecycle === status));

  if (!items.length) {
    return <p className="m-0 rounded-card border border-line bg-card p-6 text-[15px] text-body">{t("empty")}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div role="group" aria-label={t("filters.label")} className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">{t("filters.standard")}</span>
          <Chip active={!standard} onClick={() => setStandard(null)}>
            {t("filters.all")}
          </Chip>
          {standards.map((s) => (
            <Chip key={s} active={standard === s} onClick={() => setStandard(standard === s ? null : s)}>
              {s}
            </Chip>
          ))}
        </div>
        {statuses.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-1">{t("filters.status")}</span>
            <Chip active={!status} onClick={() => setStatus(null)}>
              {t("filters.allStatuses")}
            </Chip>
            {statuses.map((s) => (
              <Chip key={s} active={status === s} onClick={() => setStatus(status === s ? null : s)}>
                {t(`status.${s}`)}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <p className="m-0 text-[13px] text-muted" aria-live="polite">
        {t("count", { count: visible.length })}
      </p>

      {visible.length === 0 ? (
        <p className="m-0 text-[15px] text-body">
          {t("emptyFiltered")}{" "}
          <button
            type="button"
            onClick={() => {
              setStandard(null);
              setStatus(null);
            }}
            className="text-ink underline underline-offset-2 hover:text-gold-deep"
          >
            {t("clear")}
          </button>
        </p>
      ) : (
        <ul className="m-0 flex list-none flex-col border-t border-line p-0">
          {visible.map((a) => (
            <li key={a.slug} className="border-b border-line">
              <Link href={{ pathname: "/iso-radar/[slug]", params: { slug: a.slug } }} className="group flex flex-col gap-2 py-5">
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-muted">
                  <StatusBadge tone={LIFECYCLE_TONE[a.lifecycle]}>{t(`status.${a.lifecycle}`)}</StatusBadge>
                  <span>{a.standard}</span>
                  {a.sourceDate && (
                    <span>
                      · {t("sourceDate")}: {formatDay(a.sourceDate, dateLocale)}
                    </span>
                  )}
                  <span>· ISO.org</span>
                </span>
                <span className="font-display text-[21px] font-medium leading-[1.3] group-hover:text-gold-deep">{a.title}</span>
                <span className="text-[15px] leading-[1.6] text-body">{a.summary}</span>
                <span className="text-xs text-subtle">
                  {t("lastVerified")}: {formatDay(a.lastVerifiedAt, dateLocale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
