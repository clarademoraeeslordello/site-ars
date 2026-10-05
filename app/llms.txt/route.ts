import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";
import pt from "@/messages/pt-BR.json";
import en from "@/messages/en.json";

// llms.txt (https://llmstxt.org): a plain map of the site for AI assistants.
export const dynamic = "force-static";

const PAGE_KEYS: Record<string, keyof typeof pt.pages | "home"> = {
  "/": "home",
  "/plataforma": "platform",
  "/como-funciona": "how",
  "/certificacao-e-manutencao": "cert",
  "/frameworks": "frameworks",
  "/seguranca": "security",
  "/sobre": "about",
  "/demonstracao": "demo",
};

function describe(messages: typeof pt, key: string) {
  if (key === "home") return { title: messages.home.meta.title, description: messages.home.meta.description };
  const page = messages.pages[key as keyof typeof messages.pages] as { meta?: { title: string; description: string } };
  return page.meta!;
}

export function GET() {
  const pages = SITE_PAGES.filter((p) => p.index && PAGE_KEYS[p.href]);
  const section = (messages: typeof pt, locale: (typeof routing.locales)[number], heading: string) =>
    [
      `## ${heading}`,
      "",
      ...pages.map((p) => {
        const d = describe(messages, PAGE_KEYS[p.href]);
        return `- [${d.title}](${absoluteUrl(p.href, locale)}): ${d.description}`;
      }),
      "",
    ].join("\n");

  const body = [
    "# Audit Cockpits · ARS, Audit Readiness Score",
    "",
    `> ${en.home.meta.description}`,
    "",
    "ARS organizes requirements, controls, evidence and actions for audit readiness. The certification body decides on certification; ARS organizes, records and tracks. ARS does not issue certificates and does not replace auditors or consultants.",
    "",
    section(pt as typeof pt, "pt-br", "Português (pt-BR)"),
    section(en as unknown as typeof pt, "en", "English"),
    "## Optional",
    "",
    `- [Sitemap](${absoluteUrl("/", "pt-br").replace(/\/$/, "")}/sitemap.xml)`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
