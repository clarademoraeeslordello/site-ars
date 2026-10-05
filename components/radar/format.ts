import type { Tone } from "@/components/ui/status-badge";

export type Lifecycle = "published" | "under_review" | "transition" | "withdrawn";

export const LIFECYCLE_TONE: Record<Lifecycle, Tone> = {
  published: "ok",
  transition: "warn",
  under_review: "neutral",
  withdrawn: "neutral",
};

/** "2026-09-16" or an ISO timestamp → localized day. Plain dates are read as UTC so they do not shift a day. */
export function formatDay(value: string | Date, locale: string) {
  const date = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00Z`) : new Date(value);
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}
