import type { ClientRequest, IncomingMessage } from "node:http";
import { createReadStream } from "node:fs";
import { get } from "node:https";
import { createInterface } from "node:readline";
import { catalogEntryForReference } from "./catalog";

/**
 * ISO Open Data: the official, machine-readable list of every ISO deliverable and its current
 * stage, published by ISO under ODC-BY (https://www.iso.org/open-data.html). iso.org pages sit
 * behind a bot challenge, so this file is the radar's source of truth.
 */
export const ISO_OPEN_DATA_URL =
  "https://isopublicstorageprod.blob.core.windows.net/opendata/_latest/iso_deliverables_metadata/json/iso_deliverables_metadata.jsonl";

export function isoStandardUrl(isoId: number) {
  return `https://www.iso.org/standard/${isoId}.html`;
}

type RawDeliverable = {
  id: number;
  deliverableType: string;
  reference: string;
  title?: { en?: string | null } | null;
  publicationDate: string | null;
  edition: number | null;
  currentStage: number;
  replaces: number[] | null;
  replacedBy: number[] | null;
};

export type IsoDeliverable = {
  isoId: number;
  family: string;
  reference: string;
  titleEn: string | null;
  stage: number;
  publicationDate: string | null;
  edition: number | null;
  replaces: number[];
  replacedBy: number[];
};

/**
 * Streams the ~80 MB JSONL file line by line and keeps only International Standards in the
 * catalog. Uses node:https rather than fetch: Next.js wraps fetch, and buffering a body this
 * size through it is very slow.
 */
export async function fetchCatalogDeliverables(): Promise<IsoDeliverable[]> {
  // ISO_OPEN_DATA_FILE points at a local copy of the JSONL (tests and offline development).
  const input = process.env.ISO_OPEN_DATA_FILE ? createReadStream(process.env.ISO_OPEN_DATA_FILE) : await download();
  const out: IsoDeliverable[] = [];
  for await (const line of createInterface({ input, crlfDelay: Infinity })) {
    // Cheap pre-filter before JSON.parse: most of the 80k lines are unrelated standards.
    if (!line.includes('"deliverableType":"IS"')) continue;
    const d = JSON.parse(line) as RawDeliverable;
    const entry = catalogEntryForReference(d.reference);
    if (!entry) continue;
    out.push({
      isoId: d.id,
      family: entry.key,
      reference: d.reference,
      titleEn: d.title?.en ?? null,
      stage: d.currentStage,
      publicationDate: d.publicationDate,
      edition: d.edition,
      replaces: d.replaces ?? [],
      replacedBy: d.replacedBy ?? [],
    });
  }
  return out;
}

async function download() {
  const res = await new Promise<IncomingMessage>((resolve, reject) => {
    get(ISO_OPEN_DATA_URL, { timeout: 120_000 }, resolve).on("error", reject).on("timeout", function (this: ClientRequest) {
      this.destroy(new Error("ISO Open Data request timed out"));
    });
  });
  if (res.statusCode !== 200) {
    res.resume();
    throw new Error(`ISO Open Data responded ${res.statusCode}`);
  }
  return res;
}
