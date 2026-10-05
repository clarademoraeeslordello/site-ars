import { cn } from "@/lib/utils";

/**
 * Readiness Ruler: 6px track, gold-deep fill, ink marker at the 85% target.
 * `animate` plays the single 1.2s entrance sweep; `transition` eases width changes.
 */
export function ReadinessRuler({
  value,
  target = 85,
  animate = false,
  transition = false,
  className,
}: {
  value: number;
  target?: number;
  animate?: boolean;
  transition?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative h-1.5 rounded-full bg-divider", className)} aria-hidden="true">
      <div
        className={cn(
          "absolute inset-y-0 left-0 rounded-full bg-gold-deep",
          animate && "ruler-fill",
          transition && "transition-[width] duration-900 ease-out-soft"
        )}
        style={{ width: `${value}%` }}
      />
      <div className="absolute -top-1 h-3.5 w-0.5 bg-ink" style={{ left: `${target}%` }} />
    </div>
  );
}
