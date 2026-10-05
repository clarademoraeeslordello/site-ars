import { ImageResponse } from "next/og";
import { routing, type Locale } from "@/i18n/routing";
import { loadGoogleFont } from "@/lib/og-font";
import pt from "@/messages/pt-BR.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

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
    loadGoogleFont("Fraunces", 500, `ARS ${title}`),
    loadGoogleFont("IBM Plex Mono", 500, `ARS AUDIT READINESS ${eyebrow.toUpperCase()} auditcockpits.com`),
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
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="6" fill="#101014" />
            <path d="M4 24 A12 12 0 0 1 28 24" stroke="#3a3a40" strokeWidth="1" fill="none" />
            <path d="M26.7 18.5 A12 12 0 0 1 28 24" stroke="#c6a44a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <line x1="16" y1="24" x2="25.6" y2="19.8" stroke="#c6a44a" strokeWidth="1" strokeLinecap="round" />
            <circle cx="16" cy="24" r="1.8" fill="#c6a44a" />
            <path d="M11 31 L16 24 L21 31" stroke="#faf8f4" strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: "Fraunces", fontSize: 30, letterSpacing: 2.4 }}>ARS</span>
            <span style={{ fontFamily: "Plex", fontSize: 14, letterSpacing: 4, color: "#e2c477" }}>AUDIT READINESS</span>
          </div>
        </div>

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
