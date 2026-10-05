import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tone = "ok" | "warn" | "neutral";

const tones: Record<Tone, string> = {
  ok: "border-ok-line bg-ok-bg text-ok",
  warn: "border-warn-line bg-warn-bg text-warn",
  neutral: "border-neutral-line bg-neutral-bg text-neutral",
};

/** Status pill: Archivo 600, uppercase, 11px radius, tone colors from the ARS app. */
export function StatusBadge({
  tone,
  children,
  className,
}: {
  tone: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex-none rounded-control border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
