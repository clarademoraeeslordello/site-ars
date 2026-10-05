"use client";

import { useEffect, useState } from "react";
import { StatusBadge, type Tone } from "@/components/ui/status-badge";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import { ReadinessRuler } from "./readiness-ruler";

const SCORES = [61, 63, 65, 66, 67];
const TONES: Tone[] = ["warn", "ok", "warn", "ok"];
const STEPS = 7; // 4 reveals + 3 beats holding the full card, then loop
const INTERVAL_MS = 1500;

type Copy = {
  aria: string;
  label: string;
  live: string;
  scoreLabel: string;
  target: string;
  foot: string;
  items: { t: string; m: string; s: string }[];
};

/** "Esta semana · ISO 27001": the score climbs 61→67% while four activities appear one by one. */
export function HeroLiveCard({ copy }: { copy: Copy }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS), INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced]);

  // With reduced motion the card shows its final state, without animating.
  const n = reduced ? 4 : Math.min(step, 4);
  const score = SCORES[n];

  return (
    <div
      role="group"
      aria-label={copy.aria}
      className="flex flex-col gap-[18px] rounded-card border border-line bg-card px-[26px] py-6 shadow-card"
    >
      <div className="flex items-center justify-between gap-2.5">
        <span className="card-label text-gold">{copy.label}</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-ok">
          <span className="h-[7px] w-[7px] rounded-full bg-ok" aria-hidden="true" />
          {copy.live}
        </span>
      </div>
      <div className="flex items-end gap-4">
        {/* aria-hidden: the changing number would be noisy for screen readers */}
        <span
          aria-hidden="true"
          className="font-display text-[64px] font-medium leading-[0.9] tabular-nums text-gold-deep"
        >
          {score}
          <span className="text-[22px] text-muted">%</span>
        </span>
        <span className="pb-1 text-[13px] leading-[1.45] text-muted">
          {copy.scoreLabel}
          <br />
          {copy.target}
        </span>
      </div>
      <ReadinessRuler value={score} transition />
      <ul className="m-0 flex list-none flex-col border-t border-divider p-0">
        {copy.items.map((item, k) => {
          const shown = k < n;
          return (
            <li
              key={item.t}
              className={cn(
                "flex items-center gap-3 border-b border-divider py-3 transition-[opacity,transform] duration-500 ease-out-soft",
                shown ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-[0.18]"
              )}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="text-sm font-medium leading-[1.35]">{item.t}</span>
                <span className="font-mono text-[11px] text-muted">{item.m}</span>
              </span>
              <StatusBadge tone={TONES[k]}>{item.s}</StatusBadge>
            </li>
          );
        })}
      </ul>
      <span className="text-xs text-muted">{copy.foot}</span>
    </div>
  );
}
