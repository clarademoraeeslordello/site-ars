/**
 * Minimal Markdown parser for the legal documents (exported from the platform repo by
 * docs/politicas/build/export_public.py). Supports exactly what those texts use: level-2
 * headings, paragraphs, bullet and numbered lists (with continuation lines), tables, horizontal
 * rules and inline **bold**, *italic*, `code` and [links](url). It returns a small AST that the
 * React renderer turns into elements — no HTML string is ever produced, so nothing is injected.
 */

export type Inline =
  | { t: "text"; v: string }
  | { t: "strong"; c: Inline[] }
  | { t: "em"; c: Inline[] }
  | { t: "code"; v: string }
  | { t: "link"; href: string; c: Inline[] };

export type Block =
  | { t: "h2"; id: string; c: Inline[]; text: string }
  | { t: "p"; c: Inline[] }
  | { t: "ul" | "ol"; items: Inline[][] }
  | { t: "table"; head: Inline[][]; rows: Inline[][][] }
  | { t: "hr" };

const INLINE = /(\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*|`([^`]+)`)/;

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  let rest = text;
  while (rest.length > 0) {
    const m = INLINE.exec(rest);
    if (!m) {
      out.push({ t: "text", v: rest });
      break;
    }
    if (m.index > 0) out.push({ t: "text", v: rest.slice(0, m.index) });
    if (m[2] !== undefined) out.push({ t: "link", href: m[3], c: parseInline(m[2]) });
    else if (m[4] !== undefined) out.push({ t: "strong", c: parseInline(m[4]) });
    else if (m[5] !== undefined) out.push({ t: "em", c: parseInline(m[5]) });
    else if (m[6] !== undefined) out.push({ t: "code", v: m[6] });
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const LIST_ITEM = /^\s*([-*]|\d+\.)\s+(.*)$/;
const cells = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

export function parseMarkdown(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (/^##\s+/.test(line)) {
      const text = line.replace(/^##\s+/, "").trim();
      blocks.push({ t: "h2", id: slugify(text), c: parseInline(text), text });
      i++;
      continue;
    }
    if (/^-{3,}\s*$/.test(line)) {
      blocks.push({ t: "hr" });
      i++;
      continue;
    }
    if (line.trimStart().startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) rows.push(lines[i++]);
      const body = rows.filter((r, idx) => !(idx === 1 && /^\s*\|?\s*:?-{2,}/.test(r)));
      const [head, ...rest] = body;
      blocks.push({
        t: "table",
        head: cells(head).map(parseInline),
        rows: rest.map((r) => cells(r).map(parseInline)),
      });
      continue;
    }
    const li = LIST_ITEM.exec(line);
    if (li) {
      const ordered = /\d+\./.test(li[1]);
      const items: string[] = [];
      while (i < lines.length) {
        const m = LIST_ITEM.exec(lines[i]);
        if (m && /\d+\./.test(m[1]) === ordered) {
          items.push(m[2]);
          i++;
        } else if (lines[i].trim() && /^\s+/.test(lines[i]) && items.length) {
          items[items.length - 1] += " " + lines[i].trim();
          i++;
        } else break;
      }
      blocks.push({ t: ordered ? "ol" : "ul", items: items.map(parseInline) });
      continue;
    }
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^##\s+/.test(lines[i]) &&
      !lines[i].trimStart().startsWith("|") &&
      !LIST_ITEM.test(lines[i]) &&
      !/^-{3,}\s*$/.test(lines[i])
    ) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push({ t: "p", c: parseInline(para.join(" ")) });
  }
  return blocks;
}
