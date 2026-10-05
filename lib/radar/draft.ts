import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod/v4";
import type { ArticleBody, ArticleLocale } from "@/lib/db/schema";
import { formatStage, stageName } from "./stages";
import { isoStandardUrl, type IsoDeliverable } from "./iso-open-data";

const MODEL = "claude-opus-5-5";

const Body = z.object({
  title: z.string(),
  summary: z.string(),
  whatHappened: z.string(),
  whatChanged: z.string(),
  impact: z.string(),
  watch: z.string(),
});

const Draft = z.object({ "pt-br": Body, en: Body, es: Body });

// Frozen so the prompt prefix stays cacheable across the drafts of one scan.
const SYSTEM = `You write ISO Radar articles for Audit Cockpits (product: ARS, Audit Readiness Score), a platform that helps companies stay ready for ISO certification audits. Readers are compliance, quality and information security managers.

Each request gives you facts taken from ISO Open Data, the official machine-readable catalog ISO publishes. Write one article about the change, in Brazilian Portuguese ("pt-br"), English ("en") and Spanish ("es"), with the same content in each language.

Fields:
- title: specific, under 90 characters, names the standard and edition.
- summary: one or two sentences for the list page.
- whatHappened: the fact, with the date when one is given, and the ISO stage in plain words.
- whatChanged: what is different from the previous state or edition. You only know what the data says (stage, edition, publication date, which document it replaces). If the content changes of the new edition are not in the facts, say that ISO has not summarised them in the source and point the reader to the official page. Do not invent clauses, controls or requirements.
- impact: who is affected (certified organisations, organisations preparing for certification, auditors). Mark interpretation explicitly, starting the paragraph with "Análise:" / "Analysis:" / "Análisis:".
- watch: what to monitor next (next ISO stage, transition arrangements). Transition deadlines are set by accreditation bodies (IAF), not by ISO: unless a deadline is given in the facts, write that the transition period is still to be confirmed.

Rules:
- Use only the facts given. Never quote or paraphrase the text of the standard.
- No marketing, no promises about certification outcomes, no mention of ARS.
- Plain, direct sentences. Do not use em dashes or en dashes; use commas, colons or full stops.
- Dates in each language's usual format.`;

export type DraftInput = {
  standardName: string;
  changeKind: string;
  deliverable: IsoDeliverable;
  stageFrom: number | null;
  previous?: IsoDeliverable | null; // edition this one replaces, when known
};

function factsFor(input: DraftInput) {
  const d = input.deliverable;
  const lines = [
    `Standard family: ${input.standardName}`,
    `Change detected: ${input.changeKind}`,
    `Document: ${d.reference}`,
    d.titleEn ? `Official title (en): ${d.titleEn}` : null,
    `Current ISO stage: ${formatStage(d.stage)} (${stageName(d.stage, "en")})`,
    input.stageFrom != null ? `Previous ISO stage: ${formatStage(input.stageFrom)} (${stageName(input.stageFrom, "en")})` : null,
    d.edition != null ? `Edition: ${d.edition}` : null,
    d.publicationDate ? `Publication date: ${d.publicationDate}` : "Publication date: not published yet",
    input.previous
      ? `Replaces: ${input.previous.reference} (published ${input.previous.publicationDate ?? "date unknown"})`
      : null,
    `Official page: ${isoStandardUrl(d.isoId)}`,
  ];
  return lines.filter(Boolean).join("\n");
}

let client: Anthropic | null = null;

export async function writeDraft(input: DraftInput): Promise<Record<ArticleLocale, ArticleBody>> {
  client ??= new Anthropic();
  const response = await client.beta.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    // On a policy decline the API retries on the model's default fallback inside the same call.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(Draft) },
    system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: `Facts:\n${factsFor(input)}` }],
  });

  if (response.stop_reason === "refusal") {
    throw new Error(`Draft refused (${response.stop_details?.category ?? "unknown"})`);
  }
  if (!response.parsed_output) {
    throw new Error(`Draft could not be parsed (stop_reason: ${response.stop_reason})`);
  }
  return response.parsed_output;
}
