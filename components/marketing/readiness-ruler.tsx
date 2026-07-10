import { cn } from "@/lib/utils";

interface ReadinessRulerProps {
  value: number;
  label: string;
  bandLow: string;
  bandMid: string;
  bandHigh: string;
  className?: string;
}

/**
 * Signature visual element: an instrument-strip rendering of the
 * Audit Readiness Score with its three interpretation bands.
 */
export function ReadinessRuler({
  value,
  label,
  bandLow,
  bandMid,
  bandHigh,
  className,
}: ReadinessRulerProps) {
  return (
    <figure className={cn("w-full", className)}>
      <div className="flex items-baseline justify-between">
        <figcaption className="font-data text-xs uppercase tracking-[0.18em] text-silver">
          {label}
        </figcaption>
        <span className="font-data text-3xl font-medium text-gold sm:text-4xl">
          {value}%
        </span>
      </div>

      <div
        role="img"
        aria-label={`${label}: ${value}%`}
        className="mt-3 h-3 w-full overflow-hidden rounded-full bg-hairline"
      >
        <div
          className="ruler-fill h-full rounded-full bg-gold"
          style={{ width: `${value}%` }}
        />
      </div>

      {/* tick marks at band boundaries */}
      <div className="relative mt-1 h-2" aria-hidden="true">
        <span className="absolute left-[60%] h-2 w-px bg-silver/60" />
        <span className="absolute left-[85%] h-2 w-px bg-gold" />
      </div>

      <div className="mt-1 flex font-data text-[0.6rem] uppercase tracking-wider text-silver sm:text-[0.65rem]">
        <span className="w-[60%]">{bandLow}</span>
        <span className="w-[25%]">{bandMid}</span>
        <span className="w-[15%] text-right text-gold">{bandHigh}</span>
      </div>
    </figure>
  );
}
