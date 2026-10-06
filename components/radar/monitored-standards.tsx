"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useRadarFilter } from "./radar-filter";
import { RADAR_LIST_ID } from "./radar-list";

const chip =
  "rounded-full border px-[11px] py-[5px] text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep";

/** The monitored standards, as toggles that filter the article list. */
export function MonitoredStandards({ standards }: { standards: string[] }) {
  const t = useTranslations("radarPage");
  const { standard, setStandard } = useRadarFilter();

  function select(next: string | null) {
    setStandard(next);
    // On narrow screens these chips sit below the list: bring the filtered list into view.
    const list = document.getElementById(RADAR_LIST_ID);
    if (list && list.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }

  const item = (key: string, label: string, value: string | null) => {
    const active = standard === value;
    return (
      <li key={key}>
        <button
          type="button"
          aria-pressed={active}
          aria-controls={RADAR_LIST_ID}
          onClick={() => select(active && value ? null : value)}
          className={cn(chip, active ? "border-ink bg-ink text-paper" : "border-line bg-well text-body hover:border-ink hover:text-ink")}
        >
          {label}
        </button>
      </li>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="m-0 text-xs leading-[1.6] text-muted">{t("monitoringHint")}</p>
      <ul role="group" aria-label={t("filters.standard")} className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {item("all", t("filters.all"), null)}
        {standards.map((s) => item(s, s, s))}
      </ul>
    </div>
  );
}
