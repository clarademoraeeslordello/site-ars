# Site ARS — Audit Readiness Score

Site institucional e comercial da **Audit Readiness Score (ARS)** — Compliance Intelligence Platform. Trilíngue (PT-BR, EN, ES), orientado à solicitação de demonstração.

## Stack

- Next.js 15 (App Router, React 19, TypeScript)
- Tailwind CSS v4 (tokens do design system em `app/globals.css`)
- next-intl v4 (rotas `/pt-br`, `/en`, `/es`)
- react-hook-form + Zod (formulário de demonstração)

## Desenvolvimento

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm build      # build de produção
```

## Estrutura

```
app/[locale]/          páginas (home, plataforma, audit-readiness-score, frameworks,
                       lgpd, auditorias, seguranca, solucoes, consultorias,
                       demonstracao, sobre, faq, legal/[doc])
components/layout/     header (com seletor de idioma) e footer
components/marketing/  seções, ReadinessRuler (elemento de assinatura), CTA band
components/forms/      formulário de demonstração
messages/              pt-BR.json, en.json, es.json — todo texto visível vive aqui
i18n/                  routing, request e navigation do next-intl
docs/                  product-context.md (fonte oficial de verdade do produto)
```

## Design system

Paleta preto/branco + dourado (tokens em `app/globals.css`): `ink`, `paper`,
`gold`, `gold-bright`, `silver`, `hairline` + cores semânticas de produto
(`ok`, `risk`, `nc`). Tipografia: Fraunces (display), Archivo (corpo),
IBM Plex Mono (dados/score). O elemento de assinatura visual é a **Régua de
Prontidão** (`ReadinessRuler`) — a faixa instrumental do score com as três
bandas de interpretação.

## Conteúdo e i18n

- Nenhuma string visível é hardcoded em componente — tudo em `messages/*.json`.
- Os três idiomas são experiências completas; PT-BR é apenas o fallback técnico
  de detecção (preferência salva → idioma do navegador → pt-br).
- A comunicação comercial usa somente capacidades validadas no
  `docs/product-context.md`. Não anunciar capacidades classificadas como visão
  futura (Compliance Graph, Risk Register, previsão de Audit Ready Date, etc.).

## Formulário de demonstração — ponto de integração

O formulário (`components/forms/demo-request-form.tsx`) valida com Zod e está
pronto para integrar. **Ainda não envia para nenhum backend** (por decisão):
o `onSubmit` registra o payload e simula sucesso. Para integrar, substituir o
corpo de `onSubmit` por um `fetch` para o endpoint definido (ou Server Action)
e tratar os estados de erro já previstos nas mensagens.

## SEO

- `sitemap.xml` e `robots.txt` gerados por `app/sitemap.ts` / `app/robots.ts`.
- hreflang e canonical no layout de locale.
- Defina `NEXT_PUBLIC_SITE_URL` no ambiente quando o domínio oficial existir.

## Publicação

Nenhum deploy automático configurado. Push, deploy e merge exigem autorização
explícita da Clara (ver convenções do repositório principal).
