---
name: ars-brand-system
description: ARS brand system reference for all agents working on the Audit Readiness Score project. Load this skill whenever producing, describing, validating, or reviewing any visual content, UI components, copy, logos, color decisions, typography choices, or design patterns for the ARS brand. Use it when building new pages, writing CSS, creating marketing materials, reviewing pull requests for visual consistency, or answering any question that touches on how ARS should look, feel, or communicate. Also load when deciding which logo file to use, which color token to apply, or whether a design choice is consistent with the brand.
---

# ARS Brand System

ARS is a **Compliance Intelligence Platform** — visually, it communicates like a precision instrument: calibrated, legible, honest. Every design decision should reinforce the brand territory **INSTRUMENTO**: the world of measurement tools, gauges, and scientific instruments translated into digital software.

Brand personality adjectives: prontidão · clareza · inteligência · confiança · governança · rastreabilidade · organização · previsibilidade · tecnologia · maturidade

For full specs, see `.claude/brand-kit.md`. For product truth (what features exist, what claims are allowed), load the `ars-product-truth` skill.

---

## Color Tokens

All colors are declared in `app/globals.css` inside `@theme {}`. These hexadecimais are inviolable — use the CSS variable names, never hardcode approximations.

### Core Palette

| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#101014` | Primary text, dark surfaces, A glyph in symbol |
| `--color-ink-soft` | `#26262c` | Secondary dark UI surfaces |
| `--color-paper` | `#faf8f4` | Site background, light surface default |
| `--color-paper-raised` | `#ffffff` | Cards, modals, elevated surfaces |
| `--color-gold` | `#8a6d1f` | Primary accent on light backgrounds, symbol needle |
| `--color-gold-bright` | `#c6a44a` | Accent on dark backgrounds, hover states, footer links |
| `--color-gold-faint` | `#f3ecd9` | Subtle highlight, text selection bg, badge info bg |
| `--color-silver` | `#6e6e73` | Labels, metadata, taglines, icon support |
| `--color-hairline` | `#e5e1d8` | Borders and dividers on light backgrounds |
| `--color-hairline-dark` | `#3a3a40` | Borders and dividers on dark backgrounds |

### Semantic (product indicators only — not general UI)

| Token | Hex | Use |
|---|---|---|
| `--color-ok` | `#3d6b4f` | Score ≥85% (Audit Ready), resolved NCs |
| `--color-risk` | `#a3542e` | Score 60–84% (Moderate Risk), warnings |
| `--color-nc` | `#8c3a3a` | Score <60% (Nao Auditável), non-conformities, errors |

### Rules

- **No blue of any hue** — this is an absolute constraint, no exceptions
- Semantic colors (ok/risk/nc) are reserved for compliance status indicators, not general UI feedback
- `gold` (#8a6d1f) must not appear on `ink` (#101014) background — contrast is insufficient (~3.5:1); use `gold-bright` (#c6a44a) on dark instead
- `gold-faint` is a background color only, never use as text color

---

## Typography

Fonts are loaded via `next/font/google` in `app/[locale]/layout.tsx` and exposed as CSS variables.

| Role | Family | CSS var | Weights loaded | When to use |
|---|---|---|---|---|
| Display | Fraunces | `--font-display` | Variable (opsz axis) | Headings H1–H3, wordmark "ARS" |
| Body | Archivo | `--font-body` | Variable | Body text, UI labels, nav, buttons |
| Data / Mono | IBM Plex Mono | `--font-data` | 400, 500 | Scores, percentages, eyebrows, labels, taglines, code |

### Key rules

- Fraunces minimum size: 18px — it is a display face and loses character at small sizes
- IBM Plex Mono in uppercase requires letter-spacing 0.12em minimum for legibility
- The "ARS" wordmark is Fraunces 600 — do not use other weights for the brand name
- The tagline "AUDIT READINESS SCORE" is IBM Plex Mono 400 uppercase, ~7.5px in the logo
- Never introduce a fourth font family

### Hierarchy quick-reference

| Level | Family | Weight | Tracking |
|---|---|---|---|
| H1 / Hero | Fraunces | 600 | -0.02em |
| H2 / Section | Fraunces | 600 | -0.02em |
| H3 | Fraunces | 400–600 | -0.01em |
| Body | Archivo | 400 | 0 |
| UI Label | Archivo | 500 | 0 |
| Eyebrow | IBM Plex Mono | 400 | 0.16–0.22em, uppercase |
| Data Value | IBM Plex Mono | 500 | 0 |
| Data Label | IBM Plex Mono | 400 | 0.12–0.16em, uppercase |

---

## Logo System CALIBRE

### What the symbol is

CALIBRE is a semicircular instrument scale — like a precision gauge — with:
- **Arco base**: 180° arc, r=12u, center at (16,24), in hairline color
- **Tick 60%**: silver, marks the threshold between Nao Auditável and Risco Moderado
- **Tick 85%**: gold, marks the Audit Ready threshold
- **Arco Audit Ready (85–100%)**: gold, strokeWidth 1.8u, round linecap
- **Ponteiro**: needle at 87° (just past the Audit Ready threshold), in gold
- **Pivô**: gold circle r=1.8u with paper/ink eye r=0.7u at (16u, 24u)
- **Letra A**: apex at (16u, 24u) — the same point as the pivot. The A emerges from the instrument. This structural coincidence is the central design decision.

### File inventory

All 13 production SVG files live in `.claude/logo-system/`. Full geometry spec in `.claude/logo-system.md`.

| File | Use |
|---|---|
| `symbol-32.svg` | Symbol solo, full color, light backgrounds |
| `symbol-dark-32.svg` | Symbol solo, full color, dark backgrounds |
| `symbol-mono-black-32.svg` | Monochromatic black (1-color print, embroidery) |
| `symbol-mono-white-32.svg` | Monochromatic white (on dark) |
| `symbol-mono-gold-32.svg` | Monochromatic gold-bright (hot-stamp, on dark) |
| `logo-horizontal-light.svg` | Symbol + wordmark, horizontal, light (220×48) |
| `logo-horizontal-dark.svg` | Symbol + wordmark, horizontal, dark (220×48) |
| `logo-vertical-light.svg` | Symbol + wordmark, stacked, light (120×110) |
| `logo-vertical-dark.svg` | Symbol + wordmark, stacked, dark (120×110) |
| `favicon-16.svg` | 16px: arc + AU Ready arc + needle + pivot only (no A) |
| `favicon-32.svg` | 32px: standard, no minor ticks |
| `favicon-64.svg` | 64px: complete symbol |
| `open-graph-1200x630.svg` | OG card, symbol ×7.5, wordmark 96px |

### Logo usage rules

- Minimum symbol solo: 24px — below this, use favicon-16 (simplified, no A)
- Minimum horizontal logo: 160px wide
- Clear space: equal to the height of the "A" in the wordmark on all sides
- Never distort proportions (scale uniformly only)
- Never rotate the symbol (arc is always horizontal, base at bottom)
- Never move the needle to a different angle than the file
- Never add gradients, drop shadows, glow, or filters
- Full-color logo only on paper (#faf8f4), paper-raised (#fff), or ink (#101014) — use monochromatic variants on any other background

---

## Design Rules

### Shape and border

- `border-radius: 2px` (Tailwind `rounded-sm`) is the universal default for all UI components — cards, buttons, badges, inputs, images
- `rounded-full` (9999px) only for functionally circular elements: progress bars, avatar circles, the pivot dot in the symbol
- Do not use `rounded-md`, `rounded-lg`, `rounded-xl` — they are not part of this system

### Elevation

Elevation is communicated through background color, not shadow:
- Layer 0 (base): `paper` (#faf8f4)
- Layer 1 (raised): `paper-raised` (#fff)
- Layer dark: `ink` (#101014)

There are no `box-shadow` values in this system. If you're reaching for a shadow, reach for a background change instead.

### Borders

- Light context: 1px solid `hairline` (#e5e1d8)
- Dark context: 1px solid `hairline-dark` (#3a3a40)
- **Gap-px grid pattern**: set container `gap: 1px; background: var(--color-hairline)`, cells `background: var(--color-paper-raised)` — the hairline color bleeds through the gaps, creating borders without explicit border declarations. Use this for card grids and data tables.

### Iconography

All icons are SVG inline, hand-drawn style:
- `stroke-only` (fill="none")
- `stroke-width: 1.5`
- `stroke-linecap: round`
- `stroke-linejoin: round`
- ViewBox: 24×24
- Sizes: 16px, 20px, 24px
- No icon library — all custom

### Animation

The single official keyframe is `ruler-sweep`:

```css
@keyframes ruler-sweep { from { width: 0%; } }
.ruler-fill {
  animation: ruler-sweep 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

- Single-run only, never loop
- Represents the score arriving at its measured value
- Always include `@media (prefers-reduced-motion: reduce)` protection — the `globals.css` already sets `animation-duration: 0.01ms` globally for reduced-motion users

---

## Component Quick-Reference

### Buttons

| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | `ink` | `paper` | none |
| Secondary | `paper-raised` | `ink` | 1px `hairline` |
| Ghost | transparent | `ink` | none |
| Gold (CTA) | `gold` | `paper` | none |

- All: `rounded-sm`, Archivo 500, `transition-colors duration-150`
- Focus: 2px solid `gold`, offset 2px (global `:focus-visible` rule handles this)

### Cards

- `paper-raised` background, 1px `hairline` border, `rounded-sm`, no shadow
- Padding: `p-6` (24px) default, `p-4` (16px) compact
- Hover (if interactive): border color → `gold`, no elevation

### Badges

- IBM Plex Mono 400 xs uppercase, `rounded-sm`
- Padding: `px-2 py-0.5`
- Color per state: info=`gold-faint` bg/`gold` text, success=ok-derived, warning=risk-derived, error=nc-derived

### ReadinessRuler (signature component)

- Label: IBM Plex Mono xs uppercase `silver`
- Value: IBM Plex Mono 3xl–4xl weight 500 `gold`
- Track: `h-3 rounded-full bg-hairline`
- Fill: `rounded-full bg-gold ruler-fill` (animated)
- Tick 60%: `h-2 w-px bg-silver/60`
- Tick 85%: `h-2 w-px bg-gold`

### Header

- Sticky, `backdrop-blur-sm`, 1px hairline bottom border
- Logo: CALIBRE horizontal light variant
- Links: Archivo 500 sm, `ink` → `gold` on hover

### Footer

- Background: `ink`, text: `paper`
- Links: `silver` → `gold-bright` on hover
- Tagline: `gold-bright`
- Logo: CALIBRE horizontal dark variant

---

## What agents must never do

1. Add blue in any form — no blue-adjacent neutrals, no blue grays
2. Use any color not in the token list above
3. Change the font families (no system-ui, no Inter, no other Google Fonts)
4. Use `rounded-md` or larger on UI components
5. Add `box-shadow` for decoration
6. Use semantic colors (ok/risk/nc) for general UI feedback unrelated to compliance scores
7. Alter `app/globals.css`, `app/[locale]/layout.tsx`, or any frontend component files
8. Create logo files outside `.claude/logo-system/`
9. Rotate, distort, or modify the CALIBRE symbol
10. Present product features that are not yet implemented — always check `ars-product-truth`

---

## Reference files

When you need more detail than this skill provides:

| File | What it contains |
|---|---|
| `app/globals.css` | All color tokens — source of truth |
| `app/[locale]/layout.tsx` | Font loading configuration |
| `.claude/brand-kit.md` | Complete brand kit with all specifications |
| `.claude/logo-system.md` | Full logo geometry, coordinates, color specs |
| `.claude/logo-system/` | 13 production SVG files |
| `.claude/brand-audit.md` | Visual audit of the implemented site |
| `.claude/brand-essence.md` | Brand essence, territories, logo concept rationale |
| `.claude/logo-refinement.md` | Symbol geometry spec (Etapa D) |
| `docs/product-context.md` | Product truth — load via `ars-product-truth` skill |
