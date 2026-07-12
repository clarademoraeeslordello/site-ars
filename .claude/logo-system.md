# Etapa E — Sistema de Logo ARS CALIBRE

Data: 2026-07-10
Status: Aprovado para produção

---

## Visão Geral

O sistema de logo da ARS é composto por seis arquivos SVG de símbolo, dois de logo
horizontal, dois de logo vertical, três de favicon e um de Open Graph. Todos os
arquivos estão em `.claude/logo-system/`.

O símbolo CALIBRE é construído sobre grade de 32×32 unidades com pivô em (16u, 24u).
O apex da letra A coincide com o pivô do ponteiro — decisão estrutural central: o A
emerge do instrumento.

---

## Arquivos do Sistema

### Símbolos (símbolo solo, sem wordmark)

| Arquivo | Variante | Fundo recomendado |
|---------|---------|-------------------|
| `symbol-32.svg` | Full Color · Claro | paper (#faf8f4), paper-raised (#fff) |
| `symbol-dark-32.svg` | Full Color · Escuro | ink (#101014) |
| `symbol-mono-black-32.svg` | Monocromatica Preta | branco, papel creme |
| `symbol-mono-white-32.svg` | Monocromatica Branca | ink (#101014), qualquer escuro |
| `symbol-mono-gold-32.svg` | Monocromatica Gold-Bright | ink (#101014) |

### Logos Horizontais (símbolo + wordmark, disposição horizontal)

| Arquivo | Variante | Canvas |
|---------|---------|--------|
| `logo-horizontal-light.svg` | Full Color · Fundo Claro | 220×48 |
| `logo-horizontal-dark.svg` | Full Color · Fundo Escuro | 220×48 |

### Logos Verticais (símbolo acima, wordmark abaixo, centrado)

| Arquivo | Variante | Canvas |
|---------|---------|--------|
| `logo-vertical-light.svg` | Full Color · Fundo Claro | 120×110 |
| `logo-vertical-dark.svg` | Full Color · Fundo Escuro | 120×110 |

### Favicons

| Arquivo | Tamanho | Variante | Simplificação |
|---------|---------|---------|---------------|
| `favicon-16.svg` | 16×16 | Fundo ink, gold-bright | Sem A, sem ticks menores, só arco+AU Ready arc+needle+pivot |
| `favicon-32.svg` | 32×32 | Fundo ink, gold-bright | Sem ticks menores (20%, 40%, 80%), todos outros presentes |
| `favicon-64.svg` | 64×64 | Fundo ink, gold-bright | Completo — todos os elementos |

### Open Graph

| Arquivo | Tamanho | Composição |
|---------|---------|-----------|
| `open-graph-1200x630.svg` | 1200×630 | Fundo ink, símbolo ×7.5, wordmark 96px, tagline, descriptor gold |

---

## Especificação Técnica do Símbolo

### Grade de referência
- Canvas: 32×32 unidades
- Pivô / apex do A: (16, 24)
- Arco base: r=12, centro=(16,24), 180° de (4,24) a (28,24)

### Elementos e coordenadas

**Arco base**
- `M4 24 A12 12 0 0 1 28 24`
- stroke: `--color-hairline` (#e5e1d8) no claro / `--color-hairline-dark` (#3a3a40) no escuro
- stroke-width: 1u

**Ticks menores (20%, 40%, 80%)**
- 20°: base (6.6, 17.1) → outer (5.3, 15.3), ângulo 144°
- 40°: base (12.3, 12.6) → outer (11.5, 11.0), ângulo 108°
- 80°: base (25.4, 17.1) → outer (26.7, 15.3), ângulo 36°
- stroke: hairline com opacity 0.45, stroke-width: 0.6u

**Tick 60% (silver)**
- base (19.7, 12.6) → outer (20.4, 11.0), ângulo 72°
- stroke: `--color-silver` (#6e6e73), stroke-width: 0.8u

**Tick 85% (gold)**
- base (26.7, 18.5) → outer (28.2, 17.8), ângulo 27°
- stroke: `--color-gold` (#8a6d1f) / `--color-gold-bright` (#c6a44a) no escuro
- stroke-width: 1.2u

**Arco Audit Ready (85%→100%)**
- `M26.7 18.5 A12 12 0 0 1 28 24`
- stroke: gold (#8a6d1f) / gold-bright (#c6a44a)
- stroke-width: 1.8u, stroke-linecap: round

**Ponteiro (87°)**
- de (16, 24) para (25.6, 19.8), ângulo 23.4°
- stroke: gold (#8a6d1f) / gold-bright (#c6a44a)
- stroke-width: 1u, stroke-linecap: round

**Pivô**
- Círculo externo: cx=16, cy=24, r=1.8, fill: gold
- Círculo interno (eye): r=0.7, fill: paper (#faf8f4) / ink (#101014)

**Letra A**
- Apex: (16, 24) — idêntico ao pivô
- Perna esq: (16,24)→(11,31)
- Perna dir: (16,24)→(21,31)
- Crossbar: x1=13 y1=28, x2=19 y2=28
- stroke: ink (#101014) / paper (#faf8f4) no escuro
- perna stroke-width: 1.4u | crossbar stroke-width: 1.2u
- stroke-linejoin: round, stroke-linecap: round

---

## Wordmark

**Nome:** ARS
- Família: Fraunces (Google Fonts, variável, opsz)
- Peso: 600 (SemiBold)
- Tamanho: proporcional ao símbolo (~28px na versão horizontal principal)
- Letter-spacing: -0.01em
- Cor: ink (#101014) claro / paper (#faf8f4) escuro

**Tagline:** AUDIT READINESS SCORE
- Família: IBM Plex Mono
- Peso: 400
- Tamanho: 7.5px na versão horizontal principal
- Letter-spacing: 0.16em (1.2px em 7.5px)
- Transformação: uppercase
- Cor: silver (#6e6e73)

---

## Variações de Cor

### Full Color · Fundo Claro (principal)
- Arco base: #e5e1d8 (hairline)
- Ticks menores: #e5e1d8 op.45
- Tick 60%: #6e6e73 (silver)
- Tick 85% + AU Ready arc + ponteiro + pivô: #8a6d1f (gold)
- Eye do pivô: #faf8f4 (paper)
- A: #101014 (ink)

### Full Color · Fundo Escuro
- Arco base: #3a3a40 (hairline-dark)
- Ticks menores: #3a3a40 op.7
- Tick 60%: #6e6e73 op.6
- Tick 85° + AU Ready arc + ponteiro + pivô: #c6a44a (gold-bright)
- Eye do pivô: #101014 (ink)
- A: #faf8f4 (paper)

### Monocromatica Preta
- Todos os elementos: #101014
- Hierarquia por opacidade: ticks menores op.35, tick 60% op.6, tick 85°=1
- Hierarquia por espessura: arco base=1u, AU Ready arc=2.5u
- Eye do pivô: #ffffff

### Monocromatica Branca (para fundo escuro)
- Todos os elementos: #ffffff
- Hierarquia por opacidade: arco base op.35, ticks menores op.25, tick 60% op.55
- Hierarquia por espessura: arco base=1u, AU Ready arc=2.5u
- Eye do pivô: #101014

### Monocromatica Gold (para fundo escuro)
- Todos os elementos: #c6a44a (gold-bright)
- Hierarquia por opacidade: arco base op.28, ticks menores op.2, tick 60% op.5
- Eye do pivô: #101014

---

## Zona de Proteção

A zona de proteção mínima ao redor do bounding box externo da logo (símbolo +
wordmark) é equivalente à altura do caractere "A" maiúsculo do wordmark — medida
em pixels à escala de uso.

No sistema SVG de 32 unidades, a zona de proteção é de 4 unidades em cada lado.

**Nunca:**
- Posicionar outro elemento visual dentro da zona de proteção
- Sobrepor a logo a fundos texturizados sem criar uma área de fundo sólido
- Reduzir abaixo do tamanho mínimo por variante

---

## Tamanho Mínimo de Reprodução

| Variante | Tamanho mínimo |
|---------|----------------|
| Logo horizontal completa | 160px de largura total |
| Símbolo + ARS (sem tagline) | 80px de largura total |
| Símbolo solo | 24px |
| Favicon (apenas arco+needle) | 16px |

Abaixo de 24px de símbolo: usar versão favicon-16 (sem A, sem ticks).

---

## Regras de Uso Incorreto

1. Não distorcer proporções em nenhum eixo
2. Não rotacionar o símbolo (arco é sempre horizontal)
3. Não reposicionar o ponteiro para ângulos diferentes dos arquivos oficiais
4. Não aplicar gradiente, sombra, glow ou filtros ao símbolo
5. Não usar sobre fundos que não sejam paper, paper-raised ou ink — usar versão
   monocromatica para qualquer outro fundo
6. Não separar o símbolo do wordmark na versão horizontal sem razão funcional
7. Não usar letra "A" com proporções alteradas (crossbar não pode mudar de y=28)
8. Não substituir a tipografia do wordmark por outra família
9. Não usar versão full-color sobre fundos coloridos ou fotográficos
10. Não alterar os valores hexadecimais dos tokens — usar somente os definidos aqui

---

## Aplicações Recomendadas

| Variante | Aplicações |
|---------|-----------|
| Logo horizontal claro | Header do site, e-mail, proposta comercial, documentos |
| Logo vertical claro | Capa de relatório, slide de abertura, banner |
| Logo horizontal escuro | Footer do site, fundo ink em apresentações |
| Logo vertical escuro | Cartão de visita fundo escuro, poster |
| Símbolo solo claro | Badge em UI, avatar interno, watermark claro |
| Símbolo solo escuro | App icon, avatar, ícone de notificação |
| Favicon 16 | Browser tab, favicon base |
| Favicon 32 | Retina favicon, PWA icon pequeno |
| Favicon 64 | PWA icon médio, touch icon |
| Open Graph 1200×630 | OG tags, links sociais, preview cards |

---

## Próxima Etapa

Etapa F: Brand Kit completo em `.claude/brand-kit.md`
