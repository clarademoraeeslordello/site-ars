# ARS — Design System

Fonte de verdade visual do site institucional da Audit Readiness Score. Use este documento para aplicar a mesma identidade no produto (app da plataforma).

## 1. Conceito

Editorial executivo: base preto/marfim, tipografia serifada de destaque, acentos em dourado envelhecido. Comunica governança, precisão e maturidade sem recorrer a clichês de SaaS (sem roxo/gradiente, sem glassmorphism, sem ilustrações genéricas). O elemento de assinatura é a **Readiness Ruler**: uma régua horizontal com preenchimento e faixas de interpretação (não auditável / risco moderado / audit ready), usada como metáfora visual do score.

## 2. Cores

Todas as cores vivem em `app/globals.css` como CSS variables (`@theme`), consumidas via classes Tailwind (`bg-ink`, `text-gold`, etc.).

| Token | Hex | Uso |
|---|---|---|
| `--color-ink` | `#101014` | Texto principal, fundos escuros (seções dark, header CTA, footer) |
| `--color-ink-soft` | `#26262c` | Texto secundário, hover de fundos escuros |
| `--color-paper` | `#faf8f4` | Fundo padrão (marfim, não branco puro) |
| `--color-paper-raised` | `#ffffff` | Cards e inputs elevados sobre o fundo marfim |
| `--color-gold` | `#8a6d1f` | Acento primário sobre fundo claro (labels, eyebrows, links de destaque) |
| `--color-gold-bright` | `#c6a44a` | Acento sobre fundo escuro; CTA principal |
| `--color-gold-faint` | `#f3ecd9` | Fundo de destaque suave (seleção de texto, badges, hover) |
| `--color-silver` | `#6e6e73` | Texto terciário, metadados, placeholders |
| `--color-hairline` | `#e5e1d8` | Bordas e divisores sobre fundo claro |
| `--color-hairline-dark` | `#3a3a40` | Bordas e divisores sobre fundo escuro |
| `--color-ok` | `#3d6b4f` | Indicador semântico: conforme / aprovado |
| `--color-risk` | `#a3542e` | Indicador semântico: risco / atenção |
| `--color-nc` | `#8c3a3a` | Indicador semântico: não conformidade / erro |

Regra: nunca usar branco puro (`#ffffff`) como fundo de página, apenas em elementos elevados (cards, inputs) sobre o marfim. Nunca introduzir azul, roxo ou verde saturado.

## 3. Tipografia

| Papel | Fonte | CSS var | Uso |
|---|---|---|---|
| Display | Fraunces (serifada, `opsz` variável) | `--font-display` | Títulos H1–H3, número do score |
| Corpo | Archivo (sans-serif) | `--font-body` | Parágrafos, UI, botões |
| Dado/mono | IBM Plex Mono (400/500) | `--font-data` | Eyebrows, códigos de norma (ex: `ISO 27001`), métricas numéricas, labels técnicos |

Escala tipográfica em uso (Tailwind):
- H1 hero: `text-4xl sm:text-5xl`, `font-semibold`, `leading-[1.1]`, `tracking-tight`
- H2 seção: `text-3xl sm:text-4xl`, `font-semibold`, `leading-tight`, `tracking-tight`
- H3 card: `text-lg`, `font-semibold`
- Corpo: `text-base`/`text-lg` (hero), `leading-relaxed`, cor `text-ink-soft`
- Eyebrow (rótulo acima de título): `font-data text-xs uppercase tracking-[0.2em] text-gold`

## 4. Espaçamento e grid

- Largura de conteúdo: `max-w-7xl` centralizado (`mx-auto`)
- Padding lateral: `px-4 sm:px-6`
- Seção padrão: `py-16 sm:py-24`
- Divisores internos dentro de uma mesma seção (quando várias sub-seções compartilham uma faixa): `border-t border-hairline` + `pt-14`/`mt-14`, evitando empilhar dois `py-16/24` seguidos (isso cria vazios grandes)
- Bordas: `rounded-sm` (controles, botões) e `rounded-md` (cards, tabelas)
- Divisores de página: `border-b border-hairline` (header, hero)

## 5. Componentes

### Botão primário (sobre fundo escuro)
```
bg-gold-bright text-ink hover:bg-gold-faint rounded-sm px-6 py-3 font-medium
```

### Botão primário (sobre fundo claro)
```
bg-ink text-paper hover:bg-ink-soft rounded-sm px-6 py-3 font-medium
```

### Link de navegação
```
text-sm text-ink-soft hover:text-ink transition-colors
+ (ativo) font-medium text-ink
```

### Card
```
bg-paper-raised (ou bg-paper) border border-hairline rounded-md p-6 sm:p-8
```
Grade de cards: `grid gap-px bg-hairline` com cada card em `bg-paper`, criando divisores de 1px sem `divide-*` (efeito "grid editorial").

### Input / Select / Textarea
```
w-full rounded-sm border border-hairline bg-paper-raised px-3 py-2.5 text-sm
placeholder:text-silver focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold
```
Erro: `border-nc` + mensagem `text-xs text-nc`.

### Checkbox chip (seleção de frameworks no formulário)
```
border border-hairline rounded-sm px-3 py-2
has-[:checked]:border-gold has-[:checked]:bg-gold-faint
```

### Accordion (catálogo de frameworks)
- Cabeçalho: label em `font-data uppercase tracking-wide text-gold` + contador (`01`, `02`...) + chevron SVG que rotaciona 180° via `transition-transform` quando aberto
- Painel: `hidden` (atributo HTML nativo) quando fechado, tabela simples quando aberto
- Divisores: `divide-y divide-hairline` entre grupos, `border-y border-hairline` envolvendo o conjunto

### Tabela
```
border-collapse, thead com border-b border-hairline text-ink-soft
tbody com border-b border-hairline last:border-0 por linha
código da norma em font-data font-medium text-ink
```

### Readiness Ruler (elemento de assinatura)
Barra de progresso com:
- Valor numérico grande em `font-data text-gold`
- Trilho: `h-3 rounded-full bg-hairline`
- Preenchimento: `bg-gold` com animação `ruler-sweep` (crescimento de 0% ao valor real em 1.2s, `cubic-bezier(0.22, 1, 0.36, 1)`)
- Marcas de faixa (tick marks) nos limites 60% e 85%
- Legendas das 3 faixas abaixo, com a faixa "Audit Ready" destacada em `text-gold`

Este componente é a metáfora visual central do produto: **todo indicador de score/cobertura no app deveria derivar deste padrão**, não de gráficos circulares genéricos.

## 6. Estados

| Estado | Tratamento |
|---|---|
| Hover (botão claro) | `hover:bg-gold-faint` |
| Hover (botão escuro) | `hover:bg-ink-soft` |
| Focus visível | `outline: 2px solid var(--color-gold); outline-offset: 2px` (global, via `:focus-visible`) |
| Seleção de texto | `background: var(--color-gold-faint)` |
| Disabled | `opacity-60` |
| Erro de formulário | borda `border-nc` + texto `text-nc text-xs` |
| Sucesso de formulário | card `border-gold bg-gold-faint`, título em `font-display` |
| `prefers-reduced-motion` | todas as transições/animações reduzidas a `0.01ms` globalmente |

## 7. Acessibilidade (já implementada no site)

- Skip link para `#main`
- `:focus-visible` com contorno dourado em todo elemento interativo
- Accordion com `aria-expanded`/`aria-controls` e painel via atributo `hidden`
- Formulário com `aria-invalid`/`aria-describedby` ligado à mensagem de erro
- Sem dependência exclusiva de cor: estados de erro/sucesso têm ícone ou texto, não só cor

## 8. O que evitar (aplicável também ao produto)

- Branco puro como fundo de página
- Azul, roxo, verde saturado ou gradientes decorativos
- Glassmorphism, sombras pesadas, cards com `rounded-2xl` genérico
- Ícones decorativos sem função (escudos, cadeados, robôs)
- Gráficos de rosca/circulares como padrão único de indicador — priorizar a métrica linear (ruler) e tabelas/accordions editoriais

## 9. Onde aplicar no produto

Ao portar para o app (dashboard, controles, evidências, auditorias):
- Reutilizar a paleta e tokens exatamente como estão em `app/globals.css` (copiar o bloco `@theme`)
- Usar Fraunces para títulos de página e números de destaque (score), Archivo para UI/corpo, IBM Plex Mono para códigos, IDs, badges técnicos e timestamps
- O componente `ReadinessRuler` (`components/marketing/readiness-ruler.tsx`) pode ser adaptado diretamente para o Audit Readiness Score dentro do produto
- O padrão de accordion do catálogo é reaproveitável para listas longas e agrupáveis no produto (ex: controles por requisito, evidências por controle)
