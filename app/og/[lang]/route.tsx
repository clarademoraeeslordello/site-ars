import { ImageResponse } from "next/og";
import { routing, type Locale } from "@/i18n/routing";
import { loadGoogleFont } from "@/lib/og-font";
import pt from "@/messages/pt-BR.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Horizontal logo for dark backgrounds, from the brand kit (public/brand).
const LOGO = `data:image/svg+xml;base64,${readFileSync(
  join(process.cwd(), "public/brand/ac-logo-horizontal_fundo-escuro.svg"),
).toString("base64")}`;

// Share image (1200×630) per locale: dark brand card with the Home headline.
export const dynamic = "force-static";

const MESSAGES = { "pt-br": pt, en, es } as const;

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (routing.locales as readonly string[]).includes(lang) ? (lang as Locale) : routing.defaultLocale;
  const m = MESSAGES[locale].home;
  const title = m.hero.title;
  const eyebrow = m.hero.eyebrow;

  const [fraunces, plex] = await Promise.all([
    loadGoogleFont("Fraunces", 500, title),
    loadGoogleFont("IBM Plex Mono", 500, `${eyebrow.toUpperCase()} auditcockpits.com`),
  ]);
  const fonts = [
    ...(fraunces ? [{ name: "Fraunces", data: fraunces, weight: 500 as const }] : []),
    ...(plex ? [{ name: "Plex", data: plex, weight: 500 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#161618",
          color: "#faf8f4",
          padding: "64px 72px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- brand kit logo rendered by next/og */}
        <img src={LOGO} width={490} height={35} alt="Audit Cockpits" />

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontFamily: "Plex", fontSize: 18, letterSpacing: 3, color: "#c4a24e", textTransform: "uppercase" }}>
            {eyebrow}
          </span>
          <span style={{ fontFamily: "Fraunces", fontSize: 66, lineHeight: 1.08, maxWidth: 1000 }}>{title}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", width: 560, height: 8, borderRadius: 999, background: "#2f2e2a", position: "relative" }}>
            <div style={{ display: "flex", width: "67%", height: 8, borderRadius: 999, background: "#c4a24e" }} />
            <div style={{ position: "absolute", left: "85%", top: -6, width: 3, height: 20, background: "#faf8f4" }} />
          </div>
          <span style={{ fontFamily: "Plex", fontSize: 20, color: "#a9a499" }}>auditcockpits.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}
