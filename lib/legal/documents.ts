import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Public legal documents. Source of truth: the platform repository (docs/legal, docs/lgpd,
 * docs/politicas); `docs/politicas/build/export_public.py` there writes the public versions into
 * content/legal/<lang>/<slug>.md and content/legal/index.json here. Do not edit those files by
 * hand — edit the source and export again.
 *
 * Portuguese and English texts exist; Spanish shows the English text with a notice.
 */

export const LEGAL_SLUGS = [
  "privacidade",
  "termos",
  "cookies",
  "uso-aceitavel",
  "seguranca",
  "divulgacao-responsavel",
  "suboperadores",
  "dpa",
  "uso-de-ia",
  "acessibilidade",
] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

/** Slugs served by /legal/[slug]; privacy and terms keep their own localized routes. */
export const GENERIC_LEGAL_SLUGS = LEGAL_SLUGS.filter((s) => s !== "privacidade" && s !== "termos");

type Lang = "pt-BR" | "en";
interface Meta {
  title: string;
  version: string | null;
  updated: string | null;
}
type IndexEntry = { slug: LegalSlug } & Record<Lang, Meta>;

const DIR = path.join(process.cwd(), "content", "legal");

export function isLegalSlug(value: string): value is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(value);
}

/** Route locale (pt-br | en | es) → content language. */
export function contentLang(locale: string): Lang {
  return locale === "pt-br" ? "pt-BR" : "en";
}

function index(): IndexEntry[] {
  return JSON.parse(readFileSync(path.join(DIR, "index.json"), "utf8")) as IndexEntry[];
}

export function getLegalMeta(slug: LegalSlug, locale: string): Meta {
  const entry = index().find((e) => e.slug === slug);
  if (!entry) throw new Error(`legal document not exported: ${slug}`);
  return entry[contentLang(locale)];
}

export function getLegalBody(slug: LegalSlug, locale: string): string {
  return readFileSync(path.join(DIR, contentLang(locale), `${slug}.md`), "utf8");
}

export function listLegalDocuments(locale: string): { slug: LegalSlug; title: string }[] {
  return LEGAL_SLUGS.map((slug) => ({ slug, title: getLegalMeta(slug, locale).title }));
}
