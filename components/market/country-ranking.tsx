import { ISO27001_MAX, ISO27001_TOP_COUNTRIES } from "@/lib/iso-survey";

/** Ranking of the 8 countries with the most ISO/IEC 27001 certificates, bars on a sqrt scale. */
export function CountryRanking({
  label,
  names,
  numberLocale,
}: {
  label: string;
  names: Record<string, string>;
  numberLocale: string;
}) {
  const format = new Intl.NumberFormat(numberLocale);
  return (
    <div className="flex flex-col gap-4">
      <span className="card-label text-gold-cta">{label}</span>
      <ol className="m-0 flex list-none flex-col border-t border-dark-line-2 p-0">
        {ISO27001_TOP_COUNTRIES.map((c) => {
          const width = Math.max(4, Math.round(Math.sqrt(c.value / ISO27001_MAX) * 100));
          return (
            <li
              key={c.key}
              className="grid grid-cols-[minmax(0,120px)_minmax(0,1fr)_64px] items-center gap-3.5 border-b border-dark-line py-2.5"
            >
              <span className="text-sm text-dark-ink">{names[c.key]}</span>
              <span className="h-[5px] rounded-[9px] bg-dark-line" aria-hidden="true">
                <span className="block h-[5px] rounded-[9px] bg-gold-cta" style={{ width: `${width}%` }} />
              </span>
              <span className="text-right font-mono text-[13px] text-gold-light">{format.format(c.value)}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
