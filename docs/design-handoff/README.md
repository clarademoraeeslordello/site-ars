# Handoff: Site institucional Audit Cockpits / ARS (auditcockpits.com)

## Overview
Institutional + commercial site for **ARS — Audit Readiness Score** (Audit Readiness Platform by Audit Cockpits). Domain: `https://auditcockpits.com/`. App (login) stays at `https://app.auditcockpits.com/`. This bundle covers the **Home** (PT-BR), the ISO Radar editorial/automation spec and the site architecture.

## About the Design Files
The files here are **design references created in HTML** — prototypes showing intended look and behavior, not production code. Recreate them in the target codebase (`clarademoraeeslordello/site-ars`, deployed on Railway, Postgres for ISO Radar/newsletter). If the repo has no framework yet, use **Next.js (App Router, SSG)** with `next-intl`, mirroring the ARS app (`clarademoraeeslordello/Audit_Readiness_Score/frontend`), so tokens and fonts are shared.

Open `Home v3.dc.html` in a browser (needs `support.js` next to it) to see the design. Markup is inline-styled; extract the values below into tokens/components — do not ship inline styles.

## Fidelity
**High-fidelity.** Final colors, type, spacing, copy and interactions. Recreate pixel-accurately. All product UI on the page is **rebuilt in HTML/CSS** (no screenshots) with demo data, labeled "dados de demonstração".

## Global rules (content)
- No em dashes (—) anywhere in copy. Use "·" or commas.
- Never claim: ARS issues certificates, does the audit, replaces auditor/DPO/consultancy, is ISO 27001/SOC 2 certified, AI features, automatic evidence collection, full EU data residency.
- Always: "O organismo certificador decide. O ARS organiza, registra e acompanha." SOC 2 = "relatório de atestação, não certificação".
- No pricing on the site.
- Numbers allowed: 37 normas e frameworks · 706 requisitos; ISO Survey 2024 figures (with sources).

## Design Tokens (from ARS app `frontend/app/globals.css`)
Colors
- bg page `#f7f6f2` · surface `#ffffff` · surface-soft `#faf9f5` · gold-tint `#faf7ef` (border `#efe6cf`)
- ink `#1b1b1b` · body text `#4a4640` · muted `#807b6e` · subtle `#b0ab9c`
- border `#e3e0d8` · divider `#efece3` · track `#efece3`
- gold `#c4a24e` (primary button) · gold-hover `#8a6a14` (button hover, text white) · gold-text `#a27f24` (labels/links) · gold-deep `#8a6a14` (score) · gold-light `#e2c477` (on dark)
- dark `#161618` · dark-card `#1f1f22` · dark-border `#2f2e2a` / `#3a3933` · dark text `#faf8f4` · dark body `#c9c5bb` · dark muted `#a9a499` / `#8f8a7e`
- status OK: bg `#eef0e6` border `#cdd4bb` text `#5f7040` · WARN: bg `#f3ead6` border `#d9c8a0` text `#8a6a14` · NEUTRAL: bg `#eceae4` border `#dcd9d1` text `#807b6e` · critical text `#9a2f26`

Typography (Google Fonts, same as app)
- Display: **Fraunces** 500 (opsz 9–144). H1 `clamp(36px,4.8vw,58px)/1.08`, ls -.01em. H2 `clamp(28px,3.2vw,40px)/1.15`. H3 21px/1.25. Big numbers 36–64px, 500.
- Body/UI: **Archivo** 400/500/600. Body 15–18px/1.6–1.65. Buttons 14–15px 600.
- Mono: **IBM Plex Mono** 400/500. Eyebrow labels 11px, ls .16em, uppercase, color gold-text. Codes/dates 11–13px.
- Card labels (Archivo 600 11px, ls .16em, uppercase).

Radius: cards/panels **22px** · buttons/inputs/badges **11px** · inner panels 14px · pills 999px.
Shadow: hero mock `0 1px 2px rgba(16,16,20,.04), 0 30px 70px -40px rgba(16,16,20,.35)`; hero live card `0 1px 2px rgba(16,16,20,.04), 0 8px 24px -12px rgba(16,16,20,.1)`.
Layout: container max-width 1200px, side padding 28px. Section top padding `clamp(88px,10vw,128px)`. Grids use `repeat(auto-fit,minmax(min(100%,Npx),1fr))`.
Focus: `outline:2px solid #a27f24; outline-offset:2px`. Respect `prefers-reduced-motion` (disable all animation).

## Components
- **Header** (sticky, bg `rgba(247,246,242,.94)` + blur 8px, bottom border). 3-col grid: logo left (icon 32px r8 + "ARS" Fraunces 600 18px ls .08em / "AUDIT READINESS" Plex Mono 9px ls .2em gold) · nav centered (Como funciona, Plataforma, Mercado, ISO Radar, Sobre; Archivo 15px `#4a4640`, hover ink) · right: PT/EN/ES (mono 12px, current ink, `aria-current`), "Entrar" → app, primary button "Agendar demonstração". Nav hidden <1100px (add a disclosure menu in production).
- **Button primary**: bg `#c4a24e`, text `#161618`, 600, r11, padding 8×16 (header) / 13×20 (hero). Hover bg `#8a6a14` text white. **Secondary**: white bg, 1px `#e3e0d8`, hover border ink.
- **Badge/status pill**: Archivo 600 10–11px uppercase, padding 2×8, r11, 1px border, tone colors above.
- **Readiness Ruler**: 6px track r999 `#efece3`, fill `#8a6a14`, 2×14px ink marker at 85% (target). Fill animates width (1.2s `cubic-bezier(.22,1,.36,1)`).
- **Eyebrow**: Plex Mono 11px uppercase ls .16em gold-text, sits above H2 of chapter sections.
- Reusable list per spec: Header, Footer, LanguageSwitcher, CTA, Breadcrumb, ReadinessRuler, StatusBadge, ProductMock*, FrameworkChip, ArticleCard, ArticlePage, NewsletterSignup, SourceCitation, RelatedArticles, Globe.

## Screens / Views — Home (`/`)
Order (top → bottom):
1. **Hero** — 2-col grid (min 440px). Left: eyebrow "A prontidão para auditoria como operação contínua", H1 "Chegue à auditoria sabendo exatamente onde sua empresa está.", lead, buttons. Right: **live card "Esta semana · ISO 27001"** (white, r22, "ao vivo" green dot) — score animates 61→63→65→66→67% while 4 activity rows reveal one by one every 1.5s (opacity .18→1, translateY 6px→0, .5s), loop every 7 steps. Below: **recreated ARS home** (app top bar with tabs, dark "Prioridade agora" card with 7-step progress + dates + "Continuar jornada →", score card 67% "Risco alto", 3 KPI cards: Meu trabalho 43 / Evidências 47 / Riscos críticos 11). Caption "A tela inicial do ARS, recriada com dados de demonstração."
2. **Perguntas da semana** — H2 + lead stacked left (max 780px). Table card: header row (gold-tint bg, mono labels "A pergunta / Como costuma ser / Com o ARS"), 5 rows (question in Fraunces 19px; before muted; after ink). Copy in `Home v3.dc.html` → `questions`.
3. **Como funciona** (`#como-funciona`) — 2-col; left sticky (top 96px): H2 "Tudo ligado, do requisito ao score.", 2 paragraphs, chain list Requisito → Controle → Evidência → Lacuna → Ação → Score (mono label 96px column). Right: recreated journey: dark header card + 7 stage rows (Diagnóstico done, Planejamento in progress highlighted gold-tint, rest "Não iniciado").
4. **Onde sua equipe recupera tempo** (`#plataforma`) — 3 cards: Sem caçar evidências (evidence list mock) · Sem surpresa de vencimento (renewal mock, vertically centered, 15 days grace) · Sem montar pacote para o auditor (report cover mock, "USO INTERNO, NÃO É UM CERTIFICADO DE CONFORMIDADE"). Then chip row "Também na plataforma".
5. **Por que criamos o Audit Cockpits** (`#sobre`) — white card r22 below section 4; mono eyebrow, Fraunces quote 22–30px, paragraph about the founder.
6. **Mercado** (`#mercado`) — full-bleed dark band `#161618`. Eyebrow "Por que isso importa", H2. 3 stats (1,47 mi ISO 9001 world · 96.709 ISO/IEC 27001 · 18.536 ISO 9001 Brasil). **Globe** (left, square, max 520px) + ranking list (right, 8 countries with sqrt-scaled bars). Two cards: Licitações no Brasil (TCU, Lei 14.133, Acórdão 1091/2025) · Mercado internacional (NIS2 art. 21, UK PPN 014 Cyber Essentials). `<details>` "Fontes" with links. **Legal review required for the licitações text before publishing.**
7. **Depois da certificação** (`#certificacao`) — eyebrow, H2, text, gold-tint callout (certifier decides). Right: auditor-view score card (42% vs 85% min) + cycle card "Vigente".
8. **Cobertura** — full-bleed white band with top/bottom borders; eyebrow, H2 "37 normas e frameworks. 706 requisitos.", chips (bg `#faf9f5`), SOC 2 note.
9. **ISO Radar** (`#iso-radar`) — eyebrow "Boletim mensal", H2, text, newsletter form (Nome, E-mail, Idioma PT/EN/ES, consent checkbox → privacy, button "Receber o ISO Radar"); success state "Pronto. Enviamos um link para confirmar sua inscrição." (double opt-in). Right: 3 article rows (status badge + standard + "ISO.org", Fraunces title).
10. **CTA** (`#demonstracao`) — dark card r22: "Vamos ver juntos como está a sua prontidão?", button, email `auditreadinessscore@gmail.com`, phone `+55 21 99758-8376`.
11. **Footer** — icon + © 2026 Audit Cockpits, links (Como funciona, Plataforma, ISO Radar, Sobre, Privacidade, Termos, Entrar no ARS), PT/EN/ES.

## Globe (`Globo ISO.html`)
D3 v7 orthographic + topojson `world-atlas@2.0.2/countries-110m`. Ocean `#1f1f22`, graticule `#2a2925`, land `#34332e`. Countries with data filled by sqrt scale `#4a4232 → #e2c477`; Brasil outlined `#e2c477` 1.4px. Bubbles r sqrt 3–22px, fill `rgba(226,196,119,.25)`, stroke `#e2c477`; labels Plex Mono 11px with dark halo; hidden on the back hemisphere. Auto-rotates (0.006°/ms), drag to rotate (lat clamped ±60°), no rotation with reduced motion. Data (ISO Survey 2024, ISO/IEC 27001): China 33.359, Índia 6.758, Japão 6.644, Reino Unido 4.445, EUA 4.260, Itália 3.284, Türkiye 3.202, Alemanha 2.444. In production: render as a client component, lazy-load below the fold, bundle the topojson locally.

## Interactions & State
- Hero live card: `step` 0–6 interval 1500ms; `n=min(step,4)`; score `[61,63,65,66,67][n]`.
- Newsletter: `subscribed` boolean → POST `/api/newsletter` (name, email, locale, source page, consent timestamp) → Resend audience, double opt-in, unsubscribe + preference links.
- Analytics (GA4) events: `cta_demo_click`, `cta_platform_click`, `newsletter_subscribe`, `article_open`, `source_click`, `language_switch`, `form_submit`, `app_login_click`.

## SEO / i18n
- Routes: `/` (pt-BR), `/en/`, `/es/`; resources `/recursos/`, `/en/resources/`, `/es/recursos/`; ISO Radar `/iso-radar/<slug>` (+ localized).
- Each page: unique title/description, one H1, canonical, hreflang (pt-BR, en, es, x-default → `/`), OG (needs 1200×630 image, not yet designed). Home head already contains canonical + hreflang + og tags.
- JSON-LD: Organization, WebSite, SoftwareApplication (no price/ratings), BreadcrumbList, NewsArticle for radar posts. `sitemap.xml` with alternates; `robots.txt` disallow `/api/`, `/admin/`, drafts. No aggressive browser-language redirect. Custom 404.

## ISO Radar automation (see `reference/ISO Radar - Automacao.dc.html`)
Pipeline: Detect (scheduled job on Railway, ISO.org official pages/RSS for catalog standards) → Research → Compare (diff vs stored status in Postgres) → Draft → **Human review** → Publish. Discovery is automatic; publishing always requires editorial approval. Article fields: title, summary, o que aconteceu, o que mudou, impacto, o que observar, status (Publicado/Em revisão/Em transição/Retirado), fonte oficial URL, data da fonte, última verificação, author (only if real).

## Assets
- `assets/brand/icon.svg` — ARS app icon (from the ARS product).
- Fonts: Google Fonts (Fraunces, Archivo, IBM Plex Mono) — self-host via `next/font` in production.
- No photos/screenshots used; all UI mocks are HTML.

## Files
- `Home v3.dc.html` — the Home design (template + data in the logic class at the bottom). Needs `support.js`.
- `Globo ISO.html` — standalone globe, embedded via iframe in section 6.
- `reference/Fase 2 - Arquitetura do Site.dc.html` — site map / page architecture.
- `reference/ISO Radar - Automacao.dc.html` — ISO Radar automation and editorial flow.
