/*
 * ARS product screens recreated in HTML/CSS with demo data (no screenshots).
 * Each mock receives its copy from messages, so it renders in PT, EN and ES.
 */
import { BrandIcon } from "@/components/brand/brand-icon";
import { StatusBadge, type Tone } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import { ReadinessRuler } from "./readiness-ruler";

type AppHomeCopy = {
  aria: string;
  tabs: string[];
  priority: { label: string; title: string; sub: string; dates: { l: string; v: string }[]; cta: string };
  score: { label: string; badge: string; meta: string };
  kpis: { t: string; v: string; d: string }[];
};

const KPI_COLORS = ["text-gold-deep", "text-ink", "text-crit"];

/** ARS home screen: top bar, dark priority card, score card and three KPI cards. */
export function AppHomeMock({ copy }: { copy: AppHomeCopy }) {
  return (
    <div
      role="img"
      aria-label={copy.aria}
      className="overflow-hidden rounded-card border border-line bg-paper shadow-mock"
    >
      <div className="flex items-center gap-[26px] overflow-hidden whitespace-nowrap border-b border-line bg-paper px-6 py-3">
        <span className="flex flex-none items-center gap-2">
          <BrandIcon size={22} className="rounded-[5px]" />
          <span className="flex flex-col gap-0.5">
            <span className="font-display text-xs font-semibold leading-none tracking-[0.08em]">ARS</span>
            <span className="font-mono text-[7px] font-medium leading-none tracking-[0.2em] text-gold">
              AUDIT READINESS
            </span>
          </span>
        </span>
        <span className="flex gap-5 text-[13px] text-muted">
          {copy.tabs.map((tab, i) => (
            <span
              key={tab}
              className={cn(i === 0 && "pb-1 font-medium text-ink shadow-[inset_0_-2px_0_var(--gold-cta)]")}
            >
              {tab}
            </span>
          ))}
        </span>
        <span className="ml-auto h-[26px] w-[26px] flex-none rounded-full bg-gold-cta text-center text-[10px] font-semibold leading-[26px] text-dark">
          VT
        </span>
      </div>

      <div className="flex flex-col gap-3.5 p-[clamp(16px,2.4vw,28px)]">
        <div className="flex flex-wrap gap-3.5">
          <div className="relative flex min-w-0 flex-[2_1_420px] flex-col gap-3.5 overflow-hidden rounded-card bg-dark px-[26px] py-6 text-dark-ink">
            <span
              aria-hidden="true"
              className="absolute -right-20 -top-[90px] h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(196,162,78,.18),rgba(196,162,78,0))]"
            />
            <span className="card-label relative text-gold-cta">{copy.priority.label}</span>
            <span className="relative font-display text-[clamp(20px,2.4vw,28px)] font-medium leading-[1.1]">
              {copy.priority.title}
            </span>
            <span className="relative text-[13px] text-dark-muted">{copy.priority.sub}</span>
            <div className="relative grid grid-cols-7 gap-[5px] pb-2.5 pt-1">
              {Array.from({ length: 7 }, (_, i) => (
                <span key={i} className={cn("h-[5px] rounded-[9px]", i === 0 ? "bg-gold-cta" : "bg-[#33322d]")} />
              ))}
            </div>
            <div className="relative flex flex-wrap items-end gap-x-7 gap-y-3.5">
              {copy.priority.dates.map((d) => (
                <span key={d.l} className="flex flex-col gap-[3px]">
                  <span className="text-xs text-dark-subtle">{d.l}</span>
                  <span className="font-mono text-[13px]">{d.v}</span>
                </span>
              ))}
              <span className="ml-auto rounded-control bg-gold-cta px-3.5 py-2 text-[13px] font-semibold text-dark">
                {copy.priority.cta}
              </span>
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-3 rounded-card border border-line bg-card px-6 py-[22px]">
            <div className="flex items-center justify-between gap-2">
              <span className="card-label text-gold">{copy.score.label}</span>
              <StatusBadge tone="warn" className="text-[11px] tracking-[0.02em]">
                {copy.score.badge}
              </StatusBadge>
            </div>
            <span className="mt-auto font-display text-[52px] font-medium leading-none text-gold-deep">
              67<span className="text-xl text-muted">%</span>
            </span>
            <ReadinessRuler value={67} animate />
            <span className="text-xs text-muted">{copy.score.meta}</span>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
          {copy.kpis.map((k, i) => (
            <div key={k.t} className="flex flex-col gap-2 rounded-card border border-line bg-card px-[22px] py-[18px]">
              <span className="card-label text-gold">{k.t}</span>
              <span className={cn("font-display text-4xl font-medium leading-none", KPI_COLORS[i])}>{k.v}</span>
              <span className="text-xs text-muted">{k.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type JourneyCopy = {
  aria: string;
  back: string;
  label: string;
  title: string;
  sub: string;
  stages: { t: string; d: string }[];
  status: { done: string; now: string; todo: string };
};

/** ISO 27001 journey: dark header card and the seven stages (1 done, 1 in progress). */
export function JourneyMock({ copy }: { copy: JourneyCopy }) {
  return (
    <div role="img" aria-label={copy.aria} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2.5 rounded-card bg-dark px-[26px] py-6 text-dark-ink">
        <span className="font-mono text-[11px] tracking-[0.16em] text-dark-subtle">{copy.back}</span>
        <span className="text-[11px] font-semibold tracking-[0.16em] text-gold-cta">{copy.label}</span>
        <span className="font-display text-2xl font-medium leading-[1.15]">{copy.title}</span>
        <span className="text-[13px] text-dark-muted">{copy.sub}</span>
      </div>
      <div className="overflow-hidden rounded-card border border-line bg-card">
        {copy.stages.map((stage, i) => {
          const kind = i === 0 ? "done" : i === 1 ? "now" : "todo";
          const tone: Tone = kind === "done" ? "ok" : kind === "now" ? "warn" : "neutral";
          return (
            <div
              key={stage.t}
              className={cn(
                "flex items-center gap-3.5 border-b border-divider px-5 py-[13px] last:border-b-0",
                kind === "now" ? "bg-tint" : "bg-card"
              )}
            >
              <span
                className={cn(
                  "box-border h-[26px] w-[26px] flex-none rounded-full border text-center text-xs font-semibold leading-6",
                  kind === "done" && "border-ok bg-ok text-white",
                  kind === "now" && "border-gold-cta bg-gold-cta text-dark",
                  kind === "todo" && "border-line bg-card text-muted"
                )}
              >
                {kind === "done" ? "✓" : i + 1}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-sm font-medium">{stage.t}</span>
                <span className="font-mono text-xs text-muted">{stage.d}</span>
              </span>
              <StatusBadge tone={tone} className="tracking-[0.04em]">
                {copy.status[kind]}
              </StatusBadge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const EVIDENCE_TONES: Tone[] = ["warn", "warn", "neutral"];

/** Evidence list inside a control (card "Sem caçar evidências"). */
export function EvidenceListMock({
  control,
  items,
}: {
  control: string;
  items: { t: string; m: string; s: string }[];
}) {
  return (
    <div className="mt-auto overflow-hidden rounded-panel border border-divider" aria-hidden="true">
      {items.map((e, i) => (
        <div key={e.t} className="flex items-center gap-2.5 border-b border-divider px-3.5 py-[11px] last:border-b-0">
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-[13px] font-medium leading-[1.35]">{e.t}</span>
            <span className="font-mono text-[11px] text-gold">{control}</span>
            <span className="text-[11px] text-muted">{e.m}</span>
          </span>
          <StatusBadge tone={EVIDENCE_TONES[i]} className="px-[7px]">
            {e.s}
          </StatusBadge>
        </div>
      ))}
    </div>
  );
}

/** Renewal queue item (card "Sem surpresa de vencimento"). */
export function RenewalMock({ label, item, badge, note }: { label: string; item: string; badge: string; note: string }) {
  return (
    <div className="my-auto flex flex-col gap-2.5 rounded-panel border border-divider bg-well p-3.5" aria-hidden="true">
      <span className="font-mono text-[10px] tracking-[0.16em] text-subtle">{label}</span>
      <div className="flex items-center justify-between gap-2.5 text-[13px] font-medium leading-[1.35]">
        <span className="min-w-0">{item}</span>
        <StatusBadge tone="warn" className="px-[7px]">
          {badge}
        </StatusBadge>
      </div>
      <div className="h-1 rounded-[9px] bg-divider">
        <div className="h-1 w-1/5 rounded-[9px] bg-gold-deep" />
      </div>
      <span className="text-xs leading-normal text-muted">{note}</span>
    </div>
  );
}

/** Readiness report cover (card "Sem montar pacote para o auditor"). */
export function ReportCoverMock({
  heading,
  code,
  label,
  disclaimer,
}: {
  heading: string;
  code: string;
  label: string;
  disclaimer: string;
}) {
  return (
    <div className="mt-auto flex flex-col gap-2.5 rounded-panel border border-divider bg-card px-[18px] py-4" aria-hidden="true">
      <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
        <span className="font-display text-[15px] font-medium">{heading}</span>
        <span className="font-mono text-[9px] tracking-[0.1em] text-muted">{code}</span>
      </div>
      <span className="font-mono text-[9px] tracking-[0.2em] text-gold">{label}</span>
      <span className="font-display text-[40px] font-medium leading-none">
        67<span className="text-[15px] text-muted">%</span>
      </span>
      <div className="relative h-2.5 bg-divider">
        <div className="absolute inset-y-0 left-0 w-[67%] bg-gold-deep" />
      </div>
      <span className="font-mono text-[9px] tracking-[0.06em] text-muted">{disclaimer}</span>
    </div>
  );
}

type CertificationCopy = {
  aria: string;
  auditor: { title: string; badge: string; text: string; value: string; min: string };
  cycle: { title: string; badge: string; text: string; note: string };
};

/** Auditor-view score (42% vs 85% minimum) and the active compliance cycle. */
export function CertificationMock({ copy }: { copy: CertificationCopy }) {
  return (
    <div role="img" aria-label={copy.aria} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 rounded-card border border-line bg-card px-6 py-[22px]">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-[15px] font-medium">{copy.auditor.title}</span>
          <StatusBadge tone="warn">{copy.auditor.badge}</StatusBadge>
        </div>
        <span className="text-[13px] text-muted">{copy.auditor.text}</span>
        <ReadinessRuler value={42} />
        <div className="flex justify-between font-mono text-xs text-muted">
          <span>{copy.auditor.value}</span>
          <span>{copy.auditor.min}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-card border border-line bg-card px-6 py-[22px]">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-[15px] font-medium">{copy.cycle.title}</span>
          <StatusBadge tone="ok">{copy.cycle.badge}</StatusBadge>
        </div>
        <span className="text-[13px] text-muted">{copy.cycle.text}</span>
        <span className="rounded-control border border-ok-line bg-ok-bg px-3 py-2.5 text-[13px] text-[#3f4a2a]">
          {copy.cycle.note}
        </span>
      </div>
    </div>
  );
}
