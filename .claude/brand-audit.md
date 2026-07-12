# Brand Audit — ARS (Audit Readiness Score)
**Etapa A — Auditoria Visual Completa**
Data: 2026-07-10

---

## Contexto Técnico

Site marketing construído em Next.js 15 (App Router) com Tailwind CSS v4. A configuração de tema está inteiramente no `app/globals.css` via diretiva `@theme` — não existe `tailwind.config.*`. Internacionalização via next-intl (pt-br, en, es). Sem modo escuro implementado; o site opera em tema único com variação light/dark via classe `dark` prop nos componentes (`Section dark`, `CtaBand`, `SiteFooter`).

---

## 1. Paleta de Cores

### Tokens CSS Oficiais (`app/globals.css`)

| Token | Hexadecimal | Papel |
|---|---|---|
| `--color-ink` | `#101014` | Preto-base. Texto principal, fundos escuros, CTA primário |
| `--color-ink-soft` | `#26262c` | Preto suavizado. Textos secundários, hover de elementos escuros |
| `--color-paper` | `#faf8f4` | Creme-base. Fundo geral do site |
| `--color-paper-raised` | `#ffffff` | Branco puro. Superfícies elevadas: cards, inputs |
| `--color-gold` | `#8a6d1f` | Dourado saturado (tom mais escuro). Accent primário: barras, bordas ativas, links |
| `--color-gold-bright` | `#c6a44a` | Dourado luminoso. Usado em fundos escuros: eyebrows, texto de destaque no footer |
| `--color-gold-faint` | `#f3ecd9` | Dourado diluído. Background de hover, estado selecionado, success state |
| `--color-silver` | `#6e6e73` | Cinza neutro. Labels de suporte, texto terciário |
| `--color-hairline` | `#e5e1d8` | Linha de divisão quente. Bordas em fundos claros |
| `--color-hairline-dark` | `#3a3a40` | Linha de divisão fria. Bordas em fundos escuros |

### Cores Semânticas (indicadores de produto)

| Token | Hexadecimal | Papel |
|---|---|---|
| `--color-ok` | `#3d6b4f` | Verde dessaturado. Status positivo/aprovado |
| `--color-risk` | `#a3542e` | Laranja-ferrugem. Risco moderado |
| `--color-nc` | `#8c3a3a` | Vermelho-escuro. Não-conformidade, erro de formulário |

### Uso de Transparências

- `text-paper/75` — texto em fundos escuros (80% opacidade)
- `text-paper/80` — variante alternativa em seções escuras
- `border-gold-bright/40` — borda dourada translúcida em cards do trust section
- `accent-[#8a6d1f]` — cor literal para checkbox accent (única instância de valor inline)

### Gradientes
Não há gradientes CSS definidos. A progressão visual é construída exclusivamente por blocos sólidos e transições entre `paper` e `ink`.

### Temperatura da Paleta
Quente-neutra. O paper (`#faf8f4`) tem subtom creme, não azul. O hairline (`#e5e1d8`) tem subtom areia. O gold ancora toda a identidade cromaticamente.

---

## 2. Tipografia

### Famílias Carregadas (Google Fonts via `next/font`)

| Variável | Família | Papel |
|---|---|---|
| `--font-fraunces` | Fraunces | Display / headings. Serif óptico com eixo `opsz` ativado |
| `--font-archivo` | Archivo | Body / UI. Sans-serif expandido |
| `--font-plex-mono` | IBM Plex Mono | Data / labels / código. Monospace |

Pesos carregados do IBM Plex Mono: 400 e 500.
Fraunces com eixo óptico variável (`axes: ["opsz"]`).
Archivo sem restrição de pesos (todos os pesos disponíveis).

### Escala de Tamanhos Identificada (por uso no código)

| Uso | Tamanho | Peso | Fonte | Notas |
|---|---|---|---|---|
| Hero H1 | 4xl / 5xl / 6xl (responsivo) | semibold (600) | display (Fraunces) | leading-[1.08], tracking-tight |
| Section H2 | 3xl / 4xl (responsivo) | semibold | display | leading-tight, tracking-tight |
| Feature H2 | 2xl | semibold | display | — |
| Feature H3 | lg | semibold | display | — |
| Body principal | lg | regular | body (Archivo) | leading-relaxed |
| Body secundário | base | regular | body | leading-relaxed |
| Body small | sm | regular | body | leading-relaxed |
| Eyebrow | xs | regular | data (IBM Plex Mono) | uppercase, tracking-[0.2em] |
| Data label | xs | regular | data | uppercase, tracking-widest |
| Score display | 3xl / 4xl | medium (500) | data | tracking-normal |
| Numeração sequencial | xs | regular | data | zero-padded (01, 02, 03) |
| Nav links | sm | regular/medium | body | — |
| Footer tagline | 0.65rem | regular | data | uppercase, tracking-[0.18em] |
| Caption footer | 0.65rem | regular | data | uppercase, tracking-[0.18em] |

### Combinações Tipográficas Identificadas

**Padrão Editorial Primário:**
- Eyebrow: IBM Plex Mono xs uppercase gold + tracking largo
- Título: Fraunces 3xl–6xl semibold ink + tracking-tight
- Corpo: Archivo base/sm ink-soft + leading-relaxed

**Padrão Instrumento/Dado:**
- Label: IBM Plex Mono xs uppercase silver
- Valor: IBM Plex Mono 3xl–4xl medium gold

**Padrão de Lista Numerada:**
- Número: IBM Plex Mono xs gold (zero-padded)
- Título: Fraunces lg–2xl semibold ink
- Texto: Archivo sm ink-soft

---

## 3. Espaçamento e Grid

### Container e Max-Width
- Max-width padrão: `max-w-7xl` (1280px)
- Padding lateral: `px-4 sm:px-6`

### Ritmo Vertical de Seções
- Seção padrão: `py-16 sm:py-24`
- PageHero: `pt-20 sm:pt-28`, `pb-14`
- CtaBand: `py-16 sm:py-20`
- Footer: `py-14`

### Padrões de Gap em Grids
- Gap entre cards: `gap-px` (bordas coladas via grid com hairline como background)
- Gap entre itens de lista: `gap-8`, `gap-10`
- Gap colunas: `gap-x-10`, `gap-x-12`

### Breakpoints
- `xs`: 375px (23.4375rem) — custom
- `sm`: 640px (Tailwind padrão)
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Padrão de Grid de Cards
- 2 colunas: `sm:grid-cols-2`
- 3 colunas: `lg:grid-cols-3`
- Hero: `lg:grid-cols-[1.15fr_1fr]` (assimétrico, coluna de texto maior)

---

## 4. Formas e Geometria

### border-radius
- `rounded-sm` — padrão absoluto para botões, badges, inputs, checkboxes de framework
- `rounded-md` — cards e containers elevados (ReadinessRuler card, banded grid container)
- `rounded-full` — exclusivo para a barra de progresso (readiness ruler fill)

### Padrão Geométrico Dominante
**Angular com suavização mínima.** O site rejeita cantos completamente arredondados. A maioria dos elementos usa `rounded-sm` — quase quadrado, com um pixel de suavização. Isso comunica precisão instrumental, não acolhimento.

### Formas Decorativas Recorrentes
- Barra de progresso horizontal com `rounded-full` — único elemento circular
- Linha vertical de acento: `border-l-2 border-gold` em listas de features
- Grid de gap-px: cria "vitrine" de células separadas por linhas finas
- Tick marks no ruler: `h-2 w-px` — linhas verticais de calibração

### Ângulos
Não há formas inclinadas, diagonais ou skewed. O site é estritamente ortogonal — sem elementos decorativos em ângulo.

---

## 5. Iconografia

### Biblioteca
Não há biblioteca de ícones de terceiros. Todos os ícones são SVG inline customizados e minimalistas:

- **Menu hamburger** (3 linhas horizontais `M2 4.5h14 / M2 9h14 / M2 13.5h14`)
- **Menu close** (X: `M3 3l12 12M15 3L3 15`)
- **Chevron down** (accordion: `M4 6l4 4 4-4`)

### Estilo
Thin/outline. strokeWidth de 1.5. Traço simples, sem fill, sem sombra. Precisão de instrumento.

### Tamanhos
- 18×18px: hamburguer/close
- 16×16px: chevron

---

## 6. Imagens e Elementos Gráficos

### Fotografias e Ilustrações
**Nenhuma.** O site é inteiramente textual e componencial. Não há imagens, ilustrações ou assets visuais além do SVG do favicon.

### Elementos Decorativos
- `bg-hairline` como grid background — cria efeito de borda entre células sem bordas individuais
- Linha vertical gold (`border-l-2 border-gold`) como elemento decorativo-funcional
- Tick marks no ruler (linhas `w-px`) como micro-elementos de calibração

### O Favicon (apple-icon.tsx) — Único Ativo Visual Existente
SVG em 32×32 sobre fundo `#101014`:
- Círculo externo: `cx=16 cy=16 r=10.5` — stroke `#c6a44a`, strokeWidth 1.1
- Elipse interna vertical: `rx=4.6 ry=10.5` — representa meridiano/globo
- Linha horizontal central: `M5.5 16h21`
- Duas linhas de latitude: `M7.1 10.5h17.8` e `M7.1 21.5h17.8`
- Arco de destaque (ouro escuro `#8a6d1f`, strokeWidth 1.6): `M16 5.5 a10.5 10.5 0 0 1 8.6 16.5` — arco no quadrante superior direito, sugerindo progressão/prontidão

**Metáfora visual do favicon:** esfera/globo com meridianos e paralelos, com arco de acento marcando o setor "pronto". É uma bússola, um globo ou um instrumento de medição circular. Já existe uma decisão de símbolo implícita no produto.

### Animações
- `ruler-sweep`: animação de preenchimento da barra de readiness. `0% → 100%` em width, 1.2s, cubic-bezier(0.22, 1, 0.36, 1). Uma vez, sem loop.
- `transition-colors`: botões e links — sem duração especificada (Tailwind padrão 150ms)
- `transition-transform duration-200`: chevron do accordion

---

## 7. Componentes-Chave

### Botões

**Primário escuro:**
`rounded-sm bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-ink-soft`

**Primário dourado (apenas no CtaBand):**
`rounded-sm bg-gold-bright px-6 py-3 font-medium text-ink transition-colors hover:bg-gold-faint`

**Secundário (outline):**
`rounded-sm border border-ink px-6 py-3 font-medium text-ink transition-colors hover:bg-gold-faint`

**Link textual:**
`text-sm font-medium text-gold underline-offset-4 hover:underline`

**Header CTA (menor):**
`rounded-sm bg-ink px-4 py-2 text-sm font-medium text-paper`

Padrão: sempre `rounded-sm`, sempre font-medium. Sem sombras. Sem ícones dentro dos botões.

### Cards

**Card elevado (ReadinessRuler container):**
`rounded-md border border-hairline bg-paper-raised p-6 sm:p-8 shadow-sm`

**Grid de cards (problem/profiles):**
`grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline` → cada célula: `bg-paper p-6 sm:p-8`
Técnica de borda: background do container é `hairline`, as células são `paper` — o gap-px expõe o container, criando borda de 1px entre células.

**Card de score band:**
`bg-paper p-6 sm:p-8` (dentro do grid gap-px com `rounded-md`)

### Badges de Framework
`rounded-sm border border-hairline bg-paper-raised px-4 py-2 font-data text-sm`
Estilo de etiqueta monospace em superfície branca com borda fina.

### Checkbox de Framework (demo form)
`rounded-sm border border-hairline bg-paper-raised px-3 py-2 text-sm has-[:checked]:border-gold has-[:checked]:bg-gold-faint`
Estado ativo: borda dourada + fundo creme-dourado.

### Inputs
`w-full rounded-sm border border-hairline bg-paper-raised px-3 py-2.5 text-sm text-ink placeholder:text-silver focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold`
Focus state: borda e ring em gold. Error state: border-nc (vermelho escuro).

### Navegação
Header sticky com backdrop-blur. Links sm em ink-soft com hover ink. Link ativo em ink + font-medium. Sem sublinhado, sem indicador visual além do peso.

### ReadinessRuler (elemento-assinatura)
- Label: IBM Plex Mono xs uppercase silver
- Valor numérico: IBM Plex Mono 3xl–4xl medium gold
- Barra: `h-3 rounded-full bg-hairline` com fill `rounded-full bg-gold ruler-fill`
- Tick marks: `h-2 w-px` em 60% (silver/60) e 85% (gold) — marcas de band boundaries
- Labels de banda: Plex Mono 0.6rem uppercase silver, última em gold

### Seções Escuras
`bg-ink text-paper` — alternância de seção. Eyebrows mudam para `gold-bright`, corpo de texto para `paper/75`, links para `hover:text-gold-bright`.

### Accordion (Framework Catalog)
- Cabeçalho: font-display sm semibold uppercase gold
- Contador: font-data xs ink-soft
- Seta: SVG inline, rotate-180 com duration-200
- Conteúdo: tabela com thead em ink-soft, tbody em ink + ink-soft
- font-data para códigos de norma (ISO 27001, etc.)

---

## 8. Personalidade Visual

### Temperatura Emocional
**Fria-neutra tendendo ao quente.** O ink quase-preto e o paper creme criam uma tensão calculada. O gold aquece, mas nunca exagera — é usado com contenção.

### Registro Visual
**Minimalista editorial de alta precisão.** Não é austero (o gold impede), não é denso (há espaço generoso), não é arrojado (sem gestos expansivos). É preciso, calculado, instruído — como um documento financeiro de qualidade ou um instrumento científico.

### Referências Estéticas Observadas
- **Tipografia editorial financeira** (The Economist, FT): uso de serif com sans-serif monospace para dados
- **Instrumentação científica**: ticks, escalas, numeração zero-padded
- **Swiss typography modernista**: grid rigoroso, hierarquia tipográfica clara, sem ornamento desnecessário
- **Material editorial britânico**: serif nobre em display, sem excessos decorativos

### Adjetivos Que o Site Comunica Visualmente
Preciso. Sério. Confiável. Legível. Estruturado. Calculado. Maduro. Eficiente. Discretamente sofisticado. Instrumental.

### Que Tipo de Empresa Parece Ser
Uma empresa que sabe o que faz e não precisa se justificar. Profissional sem ser fria. Especialista sem ser inacessível. O visual sugere uma empresa fundada por pessoas que conhecem o problema profundamente — não uma startup que adotou um template Figma.

---

## 9. Gaps de Consistência Identificados

1. **Logo sem símbolo oficial**: O header usa apenas o wordmark "ARS" em Fraunces semibold. O favicon tem um símbolo SVG (globo/esfera) que nunca aparece no site.

2. **Dois valores de dourado sem nomeação clara de contexto**: `gold` vs `gold-bright` são usados por regra tácita (claro/escuro), mas a regra não está documentada formalmente.

3. **Accent inline hardcoded**: `accent-[#8a6d1f]` no checkbox é o único valor literal de cor fora das variáveis CSS.

4. **Tagline inconsistente**: No header: "Audit Readiness Score" (font-data tracking-[0.18em]). No footer: `t("tagline")` (tradução). Mesma estrutura visual, conteúdo potencialmente diferente por locale.

5. **Sem favicon SVG no site**: O símbolo globo existe no apple-icon.tsx mas não há ícone SVG vetorial separado para uso no brand system.

6. **Sem estados de loading visual**: Além do `disabled:opacity-60` no submit button, não há skeletons ou placeholders.

7. **Nenhum ícone de produto**: As páginas de feature não usam ícones para distinguir funcionalidades — apenas numeração sequencial e títulos.

---

## 10. Tokens de Design: Formalizados vs. Implícitos

### Formalizados (em variáveis CSS)
Todos os 13 tokens de cor, as 3 famílias tipográficas e o breakpoint xs.

### Implícitos (presentes no código mas não em tokens)
- Escala de border-radius (sm, md, full — usada consistentemente mas sem variável)
- Max-width de container (`max-w-7xl` — repetida em cada Section)
- Padding lateral de seção (`px-4 sm:px-6` — repetido)
- Ritmo vertical de seção (`py-16 sm:py-24` — repetido)
- tracking-[0.18em] e tracking-[0.2em] para eyebrows — valores repetidos sem variável
- shadow-sm — único nível de sombra, usado pontualmente

---

## Sumário Executivo da Auditoria

O site da ARS possui uma identidade visual já consolidada, coerente e deliberada. Não é uma identidade acidental — as decisões de cor, tipografia e forma revelam autoria intencional. A paleta preto/creme/dourado é sofisticada e incomum em SaaS de compliance (que tendem ao azul-cinza corporativo). A combinação Fraunces + Archivo + IBM Plex Mono é a escolha mais diferenciadora do sistema: o serif óptico no display, o sans expanded no corpo e o monospace nos dados criam um sistema tipográfico que funciona como instrumento editorial.

O único gap sistêmico é a ausência de um símbolo de marca oficial e formalizado. O wordmark "ARS" existe. O favicon tem um símbolo de globo/esfera. Mas não há sistema de logo documentado, não há símbolo oficial aprovado, e o símbolo do favicon não foi elevado ao nível de identidade primária do site.

Essa é a lacuna que este trabalho vem preencher.
