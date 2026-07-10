"use client";

import { useState } from "react";

type CatalogItem = { code: string; version: string; areas: string };
type CatalogGroup = { area: string; items: CatalogItem[] };
type CatalogColumns = { code: string; version: string; areas: string };

export function FrameworkCatalogAccordion({
  groups,
  columns,
}: {
  groups: CatalogGroup[];
  columns: CatalogColumns;
}) {
  const [openArea, setOpenArea] = useState<string | null>(groups[0]?.area ?? null);

  return (
    <div className="mt-8 divide-y divide-hairline border-y border-hairline">
      {groups.map((group) => {
        const isOpen = openArea === group.area;
        const panelId = `catalog-panel-${group.area.replace(/\s+/g, "-").toLowerCase()}`;

        return (
          <div key={group.area}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenArea(isOpen ? null : group.area)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
                {group.area}
              </span>
              <span className="flex items-center gap-3 text-ink-soft">
                <span className="font-data text-xs">
                  {group.items.length.toString().padStart(2, "0")}
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <div
              id={panelId}
              hidden={!isOpen}
              className="overflow-x-auto pb-6"
            >
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-hairline text-left text-ink-soft">
                    <th className="py-2 pr-4 font-medium">{columns.code}</th>
                    <th className="py-2 pr-4 font-medium">{columns.version}</th>
                    <th className="py-2 font-medium">{columns.areas}</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item) => (
                    <tr key={item.code} className="border-b border-hairline last:border-0">
                      <td className="whitespace-nowrap py-3 pr-4 font-data font-medium text-ink">
                        {item.code}
                      </td>
                      <td className="whitespace-nowrap py-3 pr-4 text-ink-soft">
                        {item.version}
                      </td>
                      <td className="py-3 leading-relaxed text-ink-soft">{item.areas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
