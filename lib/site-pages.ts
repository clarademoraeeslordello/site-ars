import type { AppPathname } from "@/i18n/routing";

/**
 * Registry of the site's static pages. The sitemap, llms.txt and anything else that lists pages
 * reads from here. `index: false` pages exist but stay out of search (legal placeholders).
 * Article, standard and glossary pages join in step 7, ISO Radar posts in step 6.
 */
export const SITE_PAGES: { href: AppPathname; index: boolean; priority: number }[] = [
  { href: "/", index: true, priority: 1 },
  { href: "/plataforma", index: true, priority: 0.9 },
  { href: "/como-funciona", index: true, priority: 0.9 },
  { href: "/certificacao-e-manutencao", index: true, priority: 0.8 },
  { href: "/mercado", index: true, priority: 0.7 },
  { href: "/iso-radar", index: true, priority: 0.8 },
  { href: "/frameworks", index: true, priority: 0.8 },
  { href: "/seguranca", index: true, priority: 0.6 },
  { href: "/sobre", index: true, priority: 0.6 },
  { href: "/demonstracao", index: true, priority: 0.7 },
  // Legal documents (text exported from the platform repo, see lib/legal/documents.ts).
  { href: "/privacidade", index: true, priority: 0.3 },
  { href: "/termos", index: true, priority: 0.3 },
  { href: "/legal", index: true, priority: 0.3 },
];
