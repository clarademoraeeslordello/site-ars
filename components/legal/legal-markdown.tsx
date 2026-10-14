import { Fragment, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { parseMarkdown, type Block, type Inline } from "@/lib/legal/markdown";
import { isLegalSlug, type LegalSlug } from "@/lib/legal/documents";

/** Internal link to another legal document (`legal:<slug>` in the exported Markdown). */
export function legalHref(slug: LegalSlug) {
  if (slug === "privacidade") return "/privacidade" as const;
  if (slug === "termos") return "/termos" as const;
  return { pathname: "/legal/[slug]" as const, params: { slug } };
}

function renderInline(nodes: Inline[]): ReactNode {
  return nodes.map((n, i) => {
    switch (n.t) {
      case "text":
        return <Fragment key={i}>{n.v}</Fragment>;
      case "strong":
        return (
          <strong key={i} className="font-semibold text-ink">
            {renderInline(n.c)}
          </strong>
        );
      case "em":
        return <em key={i}>{renderInline(n.c)}</em>;
      case "code":
        return (
          <code key={i} className="break-all rounded bg-well px-1 font-mono text-[0.9em]">
            {n.v}
          </code>
        );
      case "link": {
        const slug = n.href.startsWith("legal:") ? n.href.slice("legal:".length) : null;
        if (slug && isLegalSlug(slug))
          return (
            <Link key={i} href={legalHref(slug)} className="text-ink underline underline-offset-2">
              {renderInline(n.c)}
            </Link>
          );
        const external = /^https?:/.test(n.href);
        return (
          <a
            key={i}
            href={n.href}
            className="text-ink underline underline-offset-2"
            {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
          >
            {renderInline(n.c)}
          </a>
        );
      }
    }
  });
}

function renderBlock(b: Block, i: number): ReactNode {
  switch (b.t) {
    case "h2":
      return (
        <h2 key={i} id={b.id} className="mb-0 mt-12 scroll-mt-24 font-display text-h3 font-medium text-ink">
          {renderInline(b.c)}
        </h2>
      );
    case "p":
      return (
        <p key={i} className="m-0 mt-4 leading-relaxed text-body">
          {renderInline(b.c)}
        </p>
      );
    case "ul":
    case "ol": {
      const Tag = b.t;
      return (
        <Tag key={i} className={`m-0 mt-4 flex flex-col gap-2 pl-6 leading-relaxed text-body ${b.t === "ul" ? "list-disc" : "list-decimal"}`}>
          {b.items.map((it, j) => (
            <li key={j}>{renderInline(it)}</li>
          ))}
        </Tag>
      );
    }
    case "table":
      return (
        <div key={i} className="mt-5 overflow-x-auto rounded-md border border-line">
          <table className="w-full border-collapse text-left text-[14px] leading-snug">
            <thead className="bg-well">
              <tr>
                {b.head.map((c, j) => (
                  <th key={j} scope="col" className="border-b border-line px-3 py-2 align-top font-semibold text-ink">
                    {renderInline(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, j) => (
                <tr key={j} className="border-b border-divider last:border-0">
                  {r.map((c, k) => (
                    <td key={k} className="px-3 py-2 align-top text-body">
                      {renderInline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "hr":
      return <hr key={i} className="my-10 border-line" />;
  }
}

/** Renders an exported legal document (server component, no client JS). */
export function LegalMarkdown({ source }: { source: string }) {
  return <div className="max-w-[820px]">{parseMarkdown(source).map(renderBlock)}</div>;
}

/** Section headings, for the table of contents. */
export function legalToc(source: string): { id: string; text: string }[] {
  return parseMarkdown(source)
    .filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2")
    .map((b) => ({ id: b.id, text: b.text.replace(/[*`]/g, "") }));
}
