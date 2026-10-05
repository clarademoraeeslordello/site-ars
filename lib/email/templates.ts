import "server-only";

/** HTML escaping for every dynamic value placed in an email. */
export function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Minimal, table-based layout that renders in common email clients, in the site's palette:
 * paper background, white card, Georgia as the serif fallback for Fraunces.
 */
export function emailLayout({
  preheader,
  heading,
  paragraphs,
  cta,
  footer,
}: {
  preheader: string;
  heading: string;
  paragraphs: string[];
  cta?: { label: string; url: string };
  footer: string[];
}) {
  const p = paragraphs
    .map((t) => `<p style="margin:0 0 16px;font:400 15px/1.6 Arial,sans-serif;color:#4a4640;">${esc(t)}</p>`)
    .join("");
  const button = cta
    ? `<p style="margin:24px 0;"><a href="${esc(cta.url)}" style="display:inline-block;background:#c4a24e;color:#161618;font:600 15px Arial,sans-serif;text-decoration:none;padding:13px 20px;border-radius:11px;">${esc(cta.label)}</a></p>
       <p style="margin:0 0 16px;font:400 12px/1.5 Arial,sans-serif;color:#807b6e;word-break:break-all;">${esc(cta.url)}</p>`
    : "";
  const f = footer
    .map((t) => `<p style="margin:0 0 6px;font:400 12px/1.5 Arial,sans-serif;color:#807b6e;">${t}</p>`)
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;background:#f7f6f2;">
<span style="display:none;max-height:0;overflow:hidden;">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f6f2;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding:0 4px 16px;font:600 18px Georgia,serif;letter-spacing:.08em;color:#1b1b1b;">ARS <span style="font:500 10px Arial,sans-serif;letter-spacing:.2em;color:#a27f24;">AUDIT READINESS</span></td></tr>
<tr><td style="background:#ffffff;border:1px solid #e3e0d8;border-radius:22px;padding:32px;">
<h1 style="margin:0 0 16px;font:500 24px/1.25 Georgia,serif;color:#1b1b1b;">${esc(heading)}</h1>
${p}${button}
</td></tr>
<tr><td style="padding:16px 4px 0;">${f}</td></tr>
</table></td></tr></table></body></html>`;
}

/** Plain-text version of the same email (some clients and filters prefer it). */
export function emailText(heading: string, paragraphs: string[], cta?: { label: string; url: string }, footer: string[] = []) {
  return [heading, "", ...paragraphs, "", ...(cta ? [`${cta.label}: ${cta.url}`, ""] : []), ...footer.map((f) => f.replace(/<[^>]+>/g, ""))].join("\n");
}
