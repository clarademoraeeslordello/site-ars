# ARS Brand Kit — Especificação Completa

Versão: 1.0
Data: 2026-07-10
Status: Oficial — derivado integralmente do código implementado em `app/globals.css` e `app/[locale]/layout.tsx`

---

## 1. Identidade da Marca

**Nome:** ARS
**Nome completo:** Audit Readiness Score
**Categoria:** Compliance Intelligence Platform
**Tagline oficial:** Audit Readiness Score
**Descritor secundário:** Compliance Intelligence Platform

**Personalidade visual:**
Instrumento de precisão. Governança mensurável. Clareza sem ornamento.
A marca fala como um instrumento de medição: direta, calibrada, confiável.
Não decora — informa. Não impressiona — demonstra.

---

## 2. Logo CALIBRE

O símbolo oficial da ARS é CALIBRE: um semicírculo de instrumento de medição com
ponteiro em 87%, ticks nos thresholds do produto (60% e 85%), arco Audit Ready em gold,
e a letra A emergindo do pivô — o apex compartilhado é a decisão estrutural central.

Para especificação técnica completa, coordenadas e regras de uso: ver `.claude/logo-system.md`.
Para todos os arquivos SVG de produção: ver `.claude/logo-system/`.
Para preview visual: abrir `.claude/ars-logo-system-preview.html`.

---

## 3. Paleta de Cores

Todos os tokens estão declarados em `app/globals.css` dentro do bloco `@theme {}`.
Nenhuma cor pode ser substituída por uma aproximação — os hexadecimais abaixo são
inegociáveis.

### 3.1 Paleta Principal

| Nome do token | CSS var | Hex | RGB | HSL | Uso primário |
|---|---|---|---|---|---|
| Ink | `--color-ink` | `#101014` | 16, 16, 20 | 240°, 11%, 7% | Texto principal, A do símbolo (fundo claro) |
| Ink Soft | `--color-ink-soft` | `#26262c` | 38, 38, 44 | 240°, 7%, 16% | Texto secundário escuro, superfícies elevadas escuras |
| Paper | `--color-paper` | `#faf8f4` | 250, 248, 244 | 40°, 43%, 97% | Fundo principal do site e dos materiais |
| Paper Raised | `--color-paper-raised` | `#ffffff` | 255, 255, 255 | 0°, 0%, 100% | Cards, modais, superfícies elevadas sobre paper |
| Gold | `--color-gold` | `#8a6d1f` | 138, 109, 31 | 41°, 63%, 33% | Accent principal, símbolo (fundo claro), destaque editorial |
| Gold Bright | `--color-gold-bright` | `#c6a44a` | 198, 164, 74 | 41°, 49%, 53% | Accent em fundo escuro, hover states, links no footer |
| Gold Faint | `--color-gold-faint` | `#f3ecd9` | 243, 236, 217 | 41°, 55%, 90% | Background de destaque suave, seleção de texto, badges informativos |
| Silver | `--color-silver` | `#6e6e73` | 110, 110, 115 | 240°, 2%, 44% | Texto de suporte, labels, tagline do wordmark, metadados |
| Hairline | `--color-hairline` | `#e5e1d8` | 229, 225, 216 | 40°, 25%, 87% | Bordas, divisores, ticks menores do símbolo |
| Hairline Dark | `--color-hairline-dark` | `#3a3a40` | 58, 58, 64 | 240°, 5%, 24% | Bordas em fundo escuro, ticks menores do símbolo (escuro) |

### 3.2 Cores Semânticas (indicadores do produto)

Usadas exclusivamente para feedback de status do compliance. Desaturadas
intencionalmente — não são cores "de sucesso/erro" genéricas de UI, são cores
de maturidade de compliance.

| Nome do token | CSS var | Hex | RGB | HSL | Uso |
|---|---|---|---|---|---|
| Ok | `--color-ok` | `#3d6b4f` | 61, 107, 79 | 142°, 27%, 33% | Score Audit Ready (≥85%), status positivo, NC resolvida |
| Risk | `--color-risk` | `#a3542e` | 163, 84, 46 | 22°, 56%, 41% | Risco moderado (60–84%), alertas de prazo |
| NC | `--color-nc` | `#8c3a3a` | 140, 58, 58 | 0°, 41%, 39% | Não-conformidade, score Nao Auditável (<60%), NC Major |

### 3.3 Combinações Aprovadas

| Foreground | Background | Ratio estimado | Uso |
|---|---|---|---|
| Ink (#101014) | Paper (#faf8f4) | ~18:1 | Texto principal |
| Ink (#101014) | Paper Raised (#fff) | ~21:1 | Texto em cards |
| Gold (#8a6d1f) | Paper (#faf8f4) | ~5.2:1 | Accent em fundo claro (passa AA) |
| Gold Bright (#c6a44a) | Ink (#101014) | ~6.1:1 | Accent em fundo escuro (passa AA) |
| Paper (#faf8f4) | Ink (#101014) | ~18:1 | Texto invertido |
| Silver (#6e6e73) | Paper (#faf8f4) | ~4.6:1 | Labels e metadados (passa AA) |
| Ok (#3d6b4f) | Paper (#faf8f4) | ~5.1:1 | Status positivo |
| NC (#8c3a3a) | Paper (#faf8f4) | ~5.4:1 | Status negativo |

### 3.4 Combinações Proibidas

- Azul de qualquer matiz — nenhuma adição de azul ao sistema
- Gold (#8a6d1f) sobre Ink (#101014) — contraste insuficiente (~3.5:1, abaixo de AA)
- Ok/Risk/NC como cores de interface geral — são exclusivas de indicadores de produto
- Gold Faint (#f3ecd9) como texto — é apenas cor de fundo/destaque
- Qualquer cor fora da paleta oficial — nenhuma aproximação ou variação

---

## 4. Tipografia

Os três typefaces são carregados via `next/font/google` em `app/[locale]/layout.tsx`
e declarados como CSS variables no `<html>`. Nenhuma alteração de família sem
justificativa técnica e visual documentada.

### 4.1 Famílias Oficiais

| Papel | Família | Variable CSS | Fonte | Pesos carregados |
|---|---|---|---|---|
| Display | Fraunces | `--font-display` | Google Fonts | Variable (opsz axis: 9–144) |
| Body | Archivo | `--font-body` | Google Fonts | Variable (todos os pesos) |
| Data / Mono | IBM Plex Mono | `--font-data` | Google Fonts | 400 (Regular), 500 (Medium) |

**Fraunces** — Serif display variável com eixo óptico (opsz). Carregada com
`axes: ["opsz"]`, o que ativa o comportamento óptico: fontes menores parecem
mais espessas, fontes maiores ficam mais refinadas. Usa principalmente em 600
(SemiBold) para headings e no wordmark ARS.

**Archivo** — Grotesque sans-serif com ampla disponibilidade de pesos. Corpo e
UI em geral. Leitura confortável em tamanhos de 13px a 20px.

**IBM Plex Mono** — Monospace IBM com caráter técnico e editorial. Usada para
dados numéricos, labels de categoria, eyebrows, código, taglines e metadados.
Transmite precisão instrumental — é a voz técnica da marca.

### 4.2 Hierarquia Tipográfica

| Nível | Família | Peso | Tamanho base | Line-height | Letter-spacing | Uso |
|---|---|---|---|---|---|---|
| Display / H1 | Fraunces | 600 | 3xl–5xl (clamp) | 1.05 | -0.02em | Headline hero, título de página |
| H2 / Section Title | Fraunces | 600 | 2xl–3xl | 1.1 | -0.02em | Títulos de seção |
| H3 | Fraunces | 400–600 | xl–2xl | 1.2 | -0.01em | Subtítulos, card titles |
| Body Large | Archivo | 400 | lg (1.125rem) | 1.7 | 0 | Lead paragraph, intro |
| Body | Archivo | 400 | base (1rem) | 1.65 | 0 | Corpo de texto padrão |
| Body Small | Archivo | 400 | sm (0.875rem) | 1.6 | 0 | Texto auxiliar, footnotes |
| UI Label | Archivo | 500 | sm (0.875rem) | 1.4 | 0 | Labels de formulário, nav |
| Eyebrow | IBM Plex Mono | 400 | xs (0.75rem) | 1 | 0.16–0.22em | Labels de seção acima de títulos |
| Caption / Meta | IBM Plex Mono | 400 | xs (0.75rem) | 1.5 | 0.08em | Datas, autores, metadados |
| Data Value | IBM Plex Mono | 500 | 2xl–4xl | 1 | 0 | Score, percentuais, números grandes |
| Data Label | IBM Plex Mono | 400 | 0.6–0.65rem | 1 | 0.12–0.16em uppercase | Labels abaixo de valores |
| Code | IBM Plex Mono | 400 | sm | 1.6 | 0 | Trechos de código inline |
| Tagline (wordmark) | IBM Plex Mono | 400 | 7.5px | 1 | 0.16em | "AUDIT READINESS SCORE" abaixo do ARS |

### 4.3 Regras Tipográficas

- Fraunces nunca abaixo de 18px — display face, não funciona em tamanhos pequenos
- IBM Plex Mono em UPPERCASE requer letter-spacing mínimo de 0.12em para legibilidade
- Archivo em weights acima de 600 somente em casos excepcionais de UI de destaque
- Não misturar Fraunces e Archivo no mesmo bloco textual — cada família tem seu domínio
- Nenhuma família externa pode ser adicionada ao projeto sem aprovação explícita
- Fraunces com opsz: deixar o eixo óptico funcionar automaticamente — não override manual
- IBM Plex Mono peso 500 (Medium) reservado para valores de dados em destaque

---

## 5. Espaçamento e Grid

O sistema de espaçamento segue a escala padrão do Tailwind v4, configurada via
`@theme` em `globals.css`. A unidade base é `0.25rem` (4px).

### 5.1 Escala de Espaçamento

| Token Tailwind | rem | px | Uso típico |
|---|---|---|---|
| `1` | 0.25rem | 4px | Micro-espaços, gaps mínimos |
| `2` | 0.5rem | 8px | Padding interno de badges |
| `3` | 0.75rem | 12px | Padding de botão sm |
| `4` | 1rem | 16px | Padding de botão md, gap de componente |
| `5` | 1.25rem | 20px | Padding interno de card sm |
| `6` | 1.5rem | 24px | Espaçamento entre elementos de seção |
| `8` | 2rem | 32px | Padding de card |
| `10` | 2.5rem | 40px | Gap de grid |
| `12` | 3rem | 48px | Padding de seção mobile |
| `16` | 4rem | 64px | Padding de seção desktop |
| `20` | 5rem | 80px | Espaço entre seções grandes |
| `24` | 6rem | 96px | Padding hero mobile |
| `32` | 8rem | 128px | Padding hero desktop |

### 5.2 Grid de Layout

| Contexto | Colunas | Gutter | Margem lateral |
|---|---|---|---|
| Mobile (<375px) | 1 | 1rem | 1rem |
| Mobile (375px–767px) | 1–2 | 1.5rem | 1.5rem |
| Tablet (768px–1023px) | 2–3 | 2rem | 2rem |
| Desktop (≥1024px) | 12 (implícito) | 2rem | auto (max-width container) |

### 5.3 Breakpoints

| Nome | Valor | rem |
|---|---|---|
| xs (custom ARS) | 375px | 23.4375rem |
| sm | 640px | 40rem |
| md | 768px | 48rem |
| lg | 1024px | 64rem |
| xl | 1280px | 80rem |
| 2xl | 1536px | 96rem |

O breakpoint `xs` é customizado via `--breakpoint-xs: 23.4375rem` e usado para
ajustes de tipografia e layout em telas muito pequenas (iPhone SE).

### 5.4 Container

`max-w-7xl` (1280px) com padding horizontal `px-4` (16px) mobile / `px-6` (24px)
tablet / `px-8` (32px) desktop. Centralizado com `mx-auto`.

---

## 6. Formas e Bordas

### 6.1 Border-radius

O sistema usa `rounded-sm` como padrão absoluto. Isso equivale a `border-radius: 2px`
no Tailwind v4.

| Token | Valor | Uso |
|---|---|---|
| `rounded-sm` | 2px | Padrão universal: cards, botões, badges, inputs, imagens |
| `rounded-full` | 9999px | Apenas para elementos circulares funcionais: progress bars, avatares redondos, pivô do símbolo |
| `rounded-none` | 0 | Bordas sharp em elementos de separação, tabelas, regras horizontais |

**Regra:** `rounded-md`, `rounded-lg`, `rounded-xl` não são usados no sistema ARS.
O arredondamento mínimo de 2px é deliberado: preserva a sensação de precisão
instrumental sem ser excessivamente sharp ou suave.

### 6.2 Border width

- `border` = 1px: hairlines, divisores, bordas de card
- `border-2`: nunca usado em bordas de componente
- Técnica gap-px: container com `gap: 1px; background: hairline`, células com
  `background: paper-raised` — cria bordas por exposição do fundo do container

### 6.3 Sombras

O sistema não usa sombras decorativas. `shadow-*` é ausente no design system.
A elevação é comunicada por variação de background (paper vs. paper-raised),
não por box-shadow.

---

## 7. Iconografia

### 7.1 Biblioteca

Não há biblioteca de ícones externa. Todos os ícones são SVGs inline customizados,
desenhados com traço (stroke), sem preenchimento (fill="none").

### 7.2 Estilo Padrão

| Atributo | Valor |
|---|---|
| Estilo | Outline (stroke only) |
| stroke-width | 1.5 |
| stroke-linecap | round |
| stroke-linejoin | round |
| fill | none |
| Viewbox padrão | 24×24 |
| Tamanhos de uso | 16px, 20px, 24px |

### 7.3 Cores de Ícone

- Ícone principal: `text-ink` / `currentColor`
- Ícone de suporte: `text-silver`
- Ícone de destaque: `text-gold` ou `text-gold-bright`
- Nunca usar cores semânticas (ok/risk/nc) em ícones de navegação

### 7.4 Regras

- Ícones nunca preenchidos (filled/solid) — contraria a linguagem do instrumento
- Ícones duotone não fazem parte do sistema atual
- stroke-width mínimo: 1.5 (abaixo, desaparece em tamanhos pequenos)
- stroke-width máximo: 2 (acima, perde o refinamento)

---

## 8. Animacao e Motion

### 8.1 Keyframe oficial

```css
@keyframes ruler-sweep {
  from { width: 0%; }
}
.ruler-fill {
  animation: ruler-sweep 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

| Atributo | Valor |
|---|---|
| Duração | 1.2s |
| Easing | cubic-bezier(0.22, 1, 0.36, 1) — "spring" suave |
| Direction | `both` (preenche forward e backward) |
| Repetição | Single run (não loop) |

O `ruler-sweep` é a assinatura animada da marca. É o único keyframe declarado
no sistema. Representa o indicador chegando ao valor medido — prontidão alcançada.

### 8.2 Regras de Motion

- `prefers-reduced-motion` é respeitado: todas as animações são desativadas para
  `duration: 0.01ms`
- Nenhuma animação de loop contínuo nos elementos da logo ou do site
- Transições de UI usam `transition-colors` e `transition-opacity` com duração de
  150–200ms
- Hover states: mudanças de cor instantâneas ou com transition máxima de 200ms
- Scroll-triggered reveals se usados: usar `IntersectionObserver`, nunca GSAP sem
  necessidade

---

## 9. Tom Visual

### 9.1 Fundos e Superfícies

| Superfície | Cor | Uso |
|---|---|---|
| Fundo principal | `paper` (#faf8f4) | Background padrão de todo o site |
| Superfície elevada | `paper-raised` (#fff) | Cards, modais, inputs |
| Superfície escura | `ink` (#101014) | Seções hero com prop `dark`, footer, overlays |
| Superfície escura soft | `ink-soft` (#26262c) | Nunca como background de página, apenas em elementos de UI escuros |

**Regra:** O site não tem modo escuro automático. A alternância de light/dark
é controlada por seção via prop — não por `prefers-color-scheme`. Cada componente
sabe em que fundo está porque recebe a prop.

### 9.2 Texturas e Padroes

O sistema não usa texturas, padrões, gradientes ou imagens de fundo decorativas.
A riqueza visual vem da tipografia, da escala e da composição.

**Unica exceção:** o grid gap-px, que cria um padrão de grade usando a cor
hairline como "linhas" por exposição de background.

### 9.3 Imagens e Fotografia

O site atual não usa fotografia ou ilustração. Se imagens forem introduzidas:
- Fotografia editorial: alta fidelidade, sem filtros, paleta neutra-fria ou
  neutro-quente alinhada com paper/ink
- Nenhuma fotografia stock com paleta de cores saturadas
- Nenhuma ilustração cartoon ou iconográfica colorida
- Screenshots de produto com fundo paper ou ink

### 9.4 Gradientes

Não existem no sistema atual. Se introduzidos, somente:
- Do `ink` para `ink-soft` (transição de escuro para menos escuro)
- Do `gold-faint` para `paper` (transição suave de destaque)
- Nunca gradientes coloridos ou com múltiplas cores da paleta

---

## 10. Componentes de UI — Especificação

### 10.1 Botões

| Variante | Background | Texto | Border | Hover |
|---|---|---|---|---|
| Primary | `ink` | `paper` | nenhuma | `ink-soft` bg |
| Secondary | `paper-raised` | `ink` | 1px `hairline` | `gold-faint` bg |
| Ghost | transparent | `ink` | nenhuma | `gold-faint` bg |
| Gold (CTA) | `gold` | `paper` | nenhuma | `gold-bright` bg |

- Border-radius: `rounded-sm` (2px)
- Padding: `px-4 py-2` (sm), `px-6 py-3` (md), `px-8 py-4` (lg)
- Fonte: Archivo 500, `text-sm` uppercase com `tracking-wide` — ou Archivo 500
  case normal para ações principais
- Transition: `transition-colors duration-150`
- Focus: outline 2px `gold`, offset 2px (definido globalmente em `:focus-visible`)
- Disabled: opacity-50, cursor-not-allowed

### 10.2 Inputs

| Estado | Border | Background |
|---|---|---|
| Default | 1px `hairline` | `paper-raised` |
| Focus | 1px `gold`, outline 2px `gold` | `paper-raised` |
| Error | 1px `nc` | `paper-raised` |
| Disabled | 1px `hairline` | `paper` |

- Border-radius: `rounded-sm` (2px)
- Padding: `px-3 py-2`
- Fonte: Archivo 400 base
- Placeholder: silver, opacity 0.6
- Label: Archivo 500 sm, ink

### 10.3 Badges

| Variante | Background | Texto |
|---|---|---|
| Default | `hairline` | `silver` |
| Info | `gold-faint` | `gold` |
| Success | ok-faint (derivar de ok com opacity) | `ok` |
| Warning | risk-faint (derivar de risk com opacity) | `risk` |
| Danger | nc-faint (derivar de nc com opacity) | `nc` |

- Border-radius: `rounded-sm` (2px)
- Padding: `px-2 py-0.5`
- Fonte: IBM Plex Mono 400 xs uppercase letra-spacing 0.12em

### 10.4 Cards

- Background: `paper-raised`
- Border: 1px `hairline` (ou técnica gap-px quando em grid)
- Border-radius: `rounded-sm` (2px)
- Shadow: nenhuma
- Padding interno: `p-6` (24px) padrão / `p-4` (16px) compacto
- Hover (se interativo): `border-gold` + `shadow-none` — sem elevação

### 10.5 Tabelas

- Header: IBM Plex Mono xs uppercase silver, border-bottom 1px hairline
- Linha: Archivo base ink, border-bottom 1px hairline opacity-50
- Linha hover: background gold-faint
- Nenhum border ao redor da tabela — apenas separadores horizontais

### 10.6 Navegacao (Header)

- Background: paper com `backdrop-blur-sm` quando sticky
- Borda inferior: 1px hairline
- Logo: CALIBRE + "ARS" Fraunces 600
- Links: Archivo 500 sm, ink → gold no hover
- CTA: botão Primary ou Gold
- Sticky: `position: sticky; top: 0; z-index: 50`

### 10.7 Footer

- Background: `ink`
- Texto: `paper`
- Links: `silver` → `gold-bright` no hover
- Tagline: `gold-bright`
- Logo: variante fundo escuro (CALIBRE dark)

### 10.8 ReadinessRuler (elemento-assinatura)

| Elemento | Estilo |
|---|---|
| Label | IBM Plex Mono xs uppercase silver |
| Valor (score) | IBM Plex Mono 3xl–4xl weight 500 gold |
| Track | `h-3 rounded-full bg-hairline` |
| Fill | `rounded-full bg-gold ruler-fill` (animado) |
| Tick 60% | `h-2 w-px bg-silver/60` |
| Tick 85% | `h-2 w-px bg-gold` |
| Label de banda | Plex Mono 0.6rem uppercase silver, último em gold |

---

## 11. Voz e Tom

### 11.1 Principios de Linguagem Visual

A ARS escreve como um instrumento de medição: direta, sem rodeios, precisa.

- **Direta:** diz o que é, não o que poderia ser
- **Calculada:** usa números quando os tem, não quando não tem
- **Sem pedantismo:** linguagem de negócio, não normativa
- **Sem exagero:** não usa adjetivos de marketing sem substância

### 11.2 Vocabulario Proibido na UI e em Materiais

Nunca usar: "revolucionário", "disruptivo", "game-changer", "único no mercado",
"100% automático", "sem esforço", "solução completa".

### 11.3 Vocabulario Preferido

"Calculado", "rastreável", "guiado", "contínuo", "previsível", "mensurável",
"auditável", "determinístico".

---

## 12. Aplicacao do Sistema

### 12.1 Hierarquia de Decisao Visual

Ao tomar qualquer decisão visual (nova cor, novo peso, novo componente):

1. Existe um token para isso em `globals.css`? Usar o token.
2. Existe um padrão de componente documentado neste brand kit? Seguir o padrão.
3. A decisão é coerente com o territorio INSTRUMENTO e os adjetivos da marca?
   (prontidão / clareza / inteligência / confiança / governança / rastreabilidade /
   organização / previsibilidade / tecnologia / maturidade)
4. Se nenhum dos acima: documentar a decisão, justificar, e propor a adição ao brand kit
   antes de aplicar.

### 12.2 O que nunca alterar sem aprovacao explícita

- Os 13 tokens de cor do `@theme` — incluindo os hexadecimais exatos
- As três famílias tipográficas e seus pesos carregados
- O border-radius padrão (rounded-sm / 2px)
- O símbolo CALIBRE e suas coordenadas
- A animação ruler-sweep e seus parâmetros

### 12.3 Checklist de Consistencia

Antes de publicar qualquer novo componente, página ou material:

- [ ] Todas as cores vêm dos tokens oficiais
- [ ] Tipografia usa apenas Fraunces / Archivo / IBM Plex Mono nos pesos carregados
- [ ] Border-radius é rounded-sm (2px) ou rounded-full (circular funcional)
- [ ] Nenhuma sombra decorativa
- [ ] Nenhuma textura, gradiente ou padrão não aprovado
- [ ] Ícones em stroke 1.5, outline, fill none
- [ ] Logo usa apenas as variantes do sistema `.claude/logo-system/`
- [ ] `prefers-reduced-motion` é respeitado em qualquer animação
- [ ] Contrastes: texto sobre paper ≥4.5:1, texto grande ≥3:1

---

## 13. Arquivos de Referencia

| Arquivo | Conteúdo |
|---|---|
| `app/globals.css` | Todos os tokens CSS (fonte primária de verdade) |
| `app/[locale]/layout.tsx` | Carregamento de fontes e CSS variables |
| `.claude/brand-audit.md` | Auditoria completa do site existente (Etapa A) |
| `.claude/brand-essence.md` | Essência, territórios e conceitos (Etapas B+C) |
| `.claude/logo-refinement.md` | Especificação técnica do símbolo CALIBRE (Etapa D) |
| `.claude/logo-system.md` | Sistema completo de logo, coordenadas, variações (Etapa E) |
| `.claude/logo-system/` | Diretório com todos os 13 SVGs de produção |
| `.claude/ars-logo-system-preview.html` | Preview visual do sistema de logo |
| `.claude/ars-calibre-refinement.html` | Canvas de refinamento anotado |
| `.claude/ars-brand-visual.html` | Canvas inicial com paleta, tipografia e três conceitos |
| `docs/product-context.md` | Contexto completo do produto ARS |

---

## 14. Proxima Etapa

Etapa G: Criar a skill `ars-brand-system` em `.claude/skills/ars-brand-system/SKILL.md`
para que todos os agentes do projeto possam consultar o brand system ao produzir
conteúdo visual ou orientações de design.
