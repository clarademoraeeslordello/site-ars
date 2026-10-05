/**
 * Fetches a Google font as TTF for next/og (ImageResponse needs raw font data).
 * Runs at build time for the static image routes; returns null if the fetch fails so the
 * image still renders with the default font.
 */
export async function loadGoogleFont(family: string, weight: number, text?: string): Promise<ArrayBuffer | null> {
  try {
    const params = new URLSearchParams({ family: `${family}:wght@${weight}` });
    if (text) params.set("text", text);
    // An old user agent makes Google Fonts answer with TTF instead of WOFF2.
    const css = await fetch(`https://fonts.googleapis.com/css2?${params}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko)" },
    }).then((r) => r.text());
    const url = css.match(/src: url\(([^)]+)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}
