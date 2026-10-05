/**
 * ISO harmonized stage codes (https://www.iso.org/stage-codes.html). ISO Open Data stores them
 * as integers: 6060 = 60.60 (published), 9599 = 95.99 (withdrawn).
 */

export function formatStage(stage: number) {
  const s = String(stage).padStart(4, "0");
  return `${s.slice(0, 2)}.${s.slice(2)}`;
}

/** xx.98 = project deleted/cancelled at that stage. */
export function isCancelled(stage: number) {
  return stage % 100 === 98 && stage < 9000;
}

const STAGE_NAMES: Record<string, { pt: string; en: string; es: string }> = {
  "00": { pt: "Proposta preliminar", en: "Preliminary", es: "Preliminar" },
  "10": { pt: "Proposta", en: "Proposal", es: "Propuesta" },
  "20": { pt: "Rascunho de trabalho (WD)", en: "Working draft (WD)", es: "Borrador de trabajo (WD)" },
  "30": { pt: "Rascunho de comitê (CD)", en: "Committee draft (CD)", es: "Borrador de comité (CD)" },
  "40": { pt: "Consulta (DIS)", en: "Enquiry (DIS)", es: "Consulta (DIS)" },
  "50": { pt: "Aprovação (FDIS)", en: "Approval (FDIS)", es: "Aprobación (FDIS)" },
  "60": { pt: "Publicada", en: "Published", es: "Publicada" },
  "90": { pt: "Revisão sistemática", en: "Systematic review", es: "Revisión sistemática" },
  "95": { pt: "Retirada", en: "Withdrawn", es: "Retirada" },
};

export function stageName(stage: number, locale: "pt-br" | "en" | "es") {
  const phase = formatStage(stage).slice(0, 2);
  const names = STAGE_NAMES[phase];
  if (!names) return formatStage(stage);
  return locale === "pt-br" ? names.pt : names[locale];
}

/**
 * Milestones that are worth an article. Intermediate sub-stages (30.20, 30.60…) only update the
 * stored state, so the review queue is not flooded with ballot bookkeeping.
 */
const MILESTONES = new Set([1099, 2000, 3060, 4020, 4060, 5020, 6060, 9092, 9093, 9599]);

export function isMilestone(stage: number) {
  return MILESTONES.has(stage);
}

export type Lifecycle = "published" | "under_review" | "transition" | "withdrawn";

export function lifecycleFor(stage: number, replacesSomething: boolean): Lifecycle {
  if (stage >= 9500) return "withdrawn";
  if (stage === 9092) return "under_review";
  if (stage === 6060) return replacesSomething ? "transition" : "published";
  if (stage >= 6000) return "published";
  return "under_review";
}
