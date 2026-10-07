/**
 * Article bodies are stored as Markdown (radar_articles.body_md) with four fixed sections.
 * Drafts arrive as structured fields and are turned into that Markdown here; pages render it
 * back with `parseBody`.
 */

export type DbLocale = "pt-BR" | "en" | "es";
export const DB_LOCALES: DbLocale[] = ["pt-BR", "en", "es"];

/** Route locale (pt-br, en, es) → database locale (pt-BR, en, es). */
export function toDbLocale(locale: string): DbLocale {
  return locale === "en" || locale === "es" ? locale : "pt-BR";
}

export type DraftHeadline = { title: string; summary: string };

export type DraftBody = DraftHeadline & {
  whatHappened: string;
  whatChanged: string;
  impact: string;
  watch: string;
};

const HEADINGS: Record<DbLocale, [string, string, string, string]> = {
  "pt-BR": ["O que aconteceu", "O que mudou", "Impacto", "O que observar"],
  en: ["What happened", "What changed", "Impact", "What to watch"],
  es: ["Qué pasó", "Qué cambió", "Impacto", "Qué observar"],
};

/** Language of a stored body, read from its first heading (null when it has none of ours). */
export function bodyLocale(md: string): DbLocale | null {
  const first = /^## (.+)$/m.exec(md)?.[1].trim();
  return DB_LOCALES.find((l) => HEADINGS[l][0] === first) ?? null;
}

export function toMarkdown(body: DraftBody, locale: DbLocale) {
  const [a, b, c, d] = HEADINGS[locale];
  return [
    `## ${a}`,
    body.whatHappened,
    `## ${b}`,
    body.whatChanged,
    `## ${c}`,
    body.impact,
    `## ${d}`,
    body.watch,
  ].join("\n\n");
}

export type BodySection = { heading: string | null; paragraphs: string[] };

/** Minimal Markdown reader for the article body: "## " headings and blank-line paragraphs. */
export function parseBody(md: string): BodySection[] {
  const sections: BodySection[] = [];
  let current: BodySection = { heading: null, paragraphs: [] };
  for (const block of md.replace(/\r\n/g, "\n").split(/\n{2,}/)) {
    const text = block.trim();
    if (!text) continue;
    if (text.startsWith("## ")) {
      if (current.heading || current.paragraphs.length) sections.push(current);
      current = { heading: text.slice(3).trim(), paragraphs: [] };
    } else {
      current.paragraphs.push(text);
    }
  }
  if (current.heading || current.paragraphs.length) sections.push(current);
  return sections;
}
