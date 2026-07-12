# Logo Refinement — CALIBRE
**Etapa D — Refinamento do Conceito Escolhido**
Data: 2026-07-10
Status: Em refinamento

---

## Decisão de Base

**Conceito aprovado:** CALIBRE
**Território visual:** INSTRUMENTO
**Data da escolha:** 2026-07-10

---

## 1. Anatomia do Símbolo — Especificação Geométrica

O símbolo CALIBRE é construído sobre uma grade de referência de 32×32 unidades (unidade base = 1u). Todas as proporções são derivadas dessa grade.

### Centro e Pivô

O pivô do instrumento está em: **x = 16u, y = 24u**

Esse posicionamento coloca o pivô no terço inferior do símbolo, dando espaço para o arco acima e para a base tipográfica abaixo.

### O Arco — Escala do Instrumento

- **Raio do arco principal:** 12u (do pivô ao traço externo da escala)
- **Raio interno (espessura da escala):** 11u (o arco tem 1u de espessura)
- **Abertura do arco:** 180 graus — semicírculo perfeito, de 0° (esquerda) a 180° (direita), com o topo no meridiano superior
- **Ponto esquerdo (0%):** x = 4u, y = 24u
- **Ponto direito (100%):** x = 28u, y = 24u
- **Ponto superior (50%):** x = 16u, y = 12u
- **Cor do arco base:** `--color-hairline` (#e5e1d8)
- **Espessura do traço:** 1u (strokeWidth em SVG)

### Tick Marks — Marcas de Calibração

As marcas são posicionadas sobre o arco nos ângulos correspondentes às faixas do score.

**Cálculo de posicionamento:**
- O arco vai de 180° (esquerda/0%) a 0° (direita/100%) no sistema de coordenadas SVG
- Ângulo para N% = 180° - N × 1.8°
- Comprimento externo (ponto na borda do arco + extensão): tick parte de r=11u e vai até r=13.5u (2.5u de comprimento)

**Tick de 60% (threshold Não Auditável → Risco Moderado):**
- Ângulo = 180 - 60×1.8 = 72°
- Ponto base: x = 16 + 11×cos(72°) = 16 + 3.4 = 19.4u, y = 24 - 11×sin(72°) = 24 - 10.5 = 13.5u
- Ponto externo: x = 16 + 13.5×cos(72°) = 16 + 4.2 = 20.2u, y = 24 - 13.5×sin(72°) = 24 - 12.8 = 11.2u
- Cor: `--color-silver` (#6e6e73)
- Espessura: 0.8u

**Tick de 85% (threshold Risco Moderado → Audit Ready) — tick primário:**
- Ângulo = 180 - 85×1.8 = 27°
- Ponto base: x = 16 + 11×cos(27°) = 16 + 9.8 = 25.8u, y = 24 - 11×sin(27°) = 24 - 5.0 = 19.0u
- Ponto externo: x = 16 + 13.5×cos(27°) = 16 + 12.0 = 28.0u, y = 24 - 13.5×sin(27°) = 24 - 6.1 = 17.9u
- Cor: `--color-gold` (#8a6d1f)
- Espessura: 1.2u — mais espessa que os demais, sinalizando importância

**Ticks menores (cada 20%):**
- 20%: ângulo = 144°, comprimento 1.5u, silver/40%
- 40%: ângulo = 108°, comprimento 1.5u, silver/40%
- 80%: ângulo = 36°, comprimento 1.5u, silver/40%

### Setor Audit Ready — Arco de Destaque

O arco entre 85% e 100% é desenhado em camada separada com traço mais espesso.

- **De:** ponto do tick 85% (ângulo 27°)
- **Até:** ponto direito (ângulo 0°, x=28u, y=24u)
- **Cor:** `--color-gold` (#8a6d1f)
- **Espessura:** 1.8u (mais espessa que o arco base)
- **stroke-linecap:** round

### O Ponteiro — Needle

O ponteiro é a forma mais expressiva do símbolo. Ele indica o score atual (87% na versão primária).

- **Ângulo de 87%:** 180 - 87×1.8 = 23.4°
- **Origem:** pivô (16u, 24u)
- **Comprimento:** 10u (atinge 83% do caminho até o arco)
- **Ponta:** x = 16 + 10×cos(23.4°) = 16 + 9.18 = 25.2u, y = 24 - 10×sin(23.4°) = 24 - 3.97 = 20.0u
- **Cor:** `--color-gold` (#8a6d1f)
- **Espessura:** 1u na base, afinando para 0 na ponta (linha simples com linecap round)

**Pivô visual (círculo):**
- Círculo externo: r = 1.8u, fill `--color-gold`
- Círculo interno (highlight): r = 0.7u, fill `--color-paper` ou `--color-ink` dependendo do fundo
- Isso cria a aparência de pino metálico característico de instrumentos analógicos

### A Base — Letra A

A letra A não é tipográfica — é geométrica, desenhada como path SVG para controle preciso.

- **Largura total:** 10u (de x=11u a x=21u)
- **Altura:** 8u (de y=24u a y=32u — abaixo do pivô)
- **Apex:** x=16u (alinhado ao pivô), y=24u (coincide com o pivô)
- **Pernas:** divergem do apex em ângulo de aproximadamente 25° de cada lado
- **Travessa:** y=28u, de x=13u a x=19u (no terço superior da altura do A)
- **Espessura do traço:** 1.4u
- **Cor:** `--color-ink` (#101014) em fundos claros, `--color-paper` (#faf8f4) em fundos escuros
- **stroke-linejoin:** round

**Relação apex/pivô:** O apex do A e o pivô do ponteiro compartilham o mesmo ponto (16u, 24u). Isso cria unidade entre letra e instrumento — o A emerge do instrumento, não está separado dele.

---

## 2. Proporções do Sistema de Logo

### Versão Principal (Horizontal)

Layout: símbolo à esquerda, logotipo à direita.

```
[SÍMBOLO]  [ARS]
           [AUDIT READINESS SCORE]
```

- **Símbolo:** 40px de altura (viewBox 32×32 escalado)
- **ARS:** Fraunces, 24px, semibold (600), letter-spacing -0.01em
- **Tagline:** IBM Plex Mono, 8px, weight 400, uppercase, letter-spacing 0.18em, silver
- **Gap entre símbolo e wordmark:** 14px
- **Alinhamento vertical:** centro do símbolo alinhado à linha de base do "ARS"
- **Relação símbolo/texto:** o símbolo tem 40px de altura; "ARS" tem 28px de cap-height — o símbolo é ligeiramente maior para compensar a leveza visual do semicírculo

### Versão Vertical (Empilhada)

Layout: símbolo centrado acima, nome e tagline centralizados abaixo.

```
   [SÍMBOLO]
     [ARS]
[AUDIT READINESS SCORE]
```

- Símbolo: 56px de altura
- Gap símbolo/ARS: 16px
- Gap ARS/tagline: 4px

### Versão Compacta (Só Símbolo)

Símbolo isolado — favicon, avatar, ícone de app.

- **Versão 32px:** arco + ponteiro + pivot + A simplificado (sem ticks menores, apenas tick do 85%)
- **Versão 16px:** arco + ponteiro + pivot, sem A (demasiado pequeno)
- **Fundo obrigatório:** `--color-ink` (#101014) quando em contexto monocromático

### Versão Texto (Só Wordmark)

"ARS" em Fraunces semibold quando o símbolo não é possível.

- Em contexto de texto corrido, email plain-text, etc.
- Nunca substituir a versão principal em materiais visuais

---

## 3. Testes de Escala

### 16px (favicon, menu mobile, ícone de aba)

**Decisão:** versão ultra-simplificada
- Arco base sem espessura (linha fina)
- Tick de 85% único
- Ponteiro em direção ao setor Audit Ready
- Sem A (ilegível a 16px)
- Sem ticks menores
- Fundo ink obrigatório para contraste
- Resultado: lê como instrumento de precisão, distinguível de outros ícones

### 32px (favicon HD, avatar pequeno, header de email)

**Decisão:** versão intermediária
- Arco com espessura reduzida (0.8px)
- Ticks de 60% e 85%
- Ponteiro completo
- A simplificado (ângulo mais aberto, travessa ligeiramente mais baixa)
- Fundo ink ou paper-raised

### 64px (Open Graph, favicon retina, app icon)

**Decisão:** versão completa com todos os detalhes
- Todos os ticks (menores e maiores)
- Ponteiro com pivot completo (duplo círculo)
- A completo com travessa
- Arco de Audit Ready em gold mais espesso

### 120px+ (header de site, materiais impressos, slide de apresentação)

**Decisão:** versão completa + possibilidade de adicionar label "87%" próximo ao ponteiro em IBM Plex Mono ultrafine

### 400px+ (poster, billboard, fundo de apresentação)

**Decisão:** versão completa em escala. A partir de 400px, o símbolo pode aparecer isolado sem wordmark — tem densidade suficiente para carregar identidade sozinho. Possibilidade de adicionar linhas de grid de calibração como elemento de fundo, derivadas da geometria do instrumento.

---

## 4. Variações de Cor

### Variação 1 — Full Color em Fundo Claro (versão primária)

- **Fundo:** `--color-paper` (#faf8f4)
- **Arco base:** `--color-hairline` (#e5e1d8)
- **Ticks menores:** `--color-silver` (#6e6e73) 40% opacidade
- **Tick de 60%:** `--color-silver` (#6e6e73)
- **Tick de 85%:** `--color-gold` (#8a6d1f)
- **Arco Audit Ready:** `--color-gold` (#8a6d1f)
- **Ponteiro e pivot:** `--color-gold` (#8a6d1f)
- **A:** `--color-ink` (#101014)
- **ARS wordmark:** `--color-ink` (#101014)
- **Tagline:** `--color-silver` (#6e6e73)

### Variação 2 — Full Color em Fundo Escuro

- **Fundo:** `--color-ink` (#101014)
- **Arco base:** `--color-hairline-dark` (#3a3a40)
- **Ticks menores:** `--color-hairline-dark` (#3a3a40)
- **Tick de 60%:** `--color-silver` (#6e6e73) 60% opacidade
- **Tick de 85%:** `--color-gold-bright` (#c6a44a)
- **Arco Audit Ready:** `--color-gold-bright` (#c6a44a)
- **Ponteiro e pivot:** `--color-gold-bright` (#c6a44a)
- **A:** `--color-paper` (#faf8f4)
- **ARS wordmark:** `--color-paper` (#faf8f4)
- **Tagline:** `--color-silver` (#6e6e73)

### Variação 3 — Monocromática Preta

- **Fundo:** branco ou transparente
- **Todos os elementos:** `--color-ink` (#101014)
- **Diferenciação:** arco Audit Ready em strokeWidth 2x maior que o arco base (espessura como único diferenciador)
- **Uso:** impressão em uma cor, carimbo, bordado, gravação

### Variação 4 — Monocromática Branca

- **Fundo:** obrigatoriamente escuro (ink ou cor sólida escura)
- **Todos os elementos:** #ffffff
- **Uso:** camiseta, brindes, hot-stamping em materiais de papelaria

### Variação 5 — Monocromática Gold

- **Fundo:** ink (#101014) ou paper (#faf8f4)
- **Todos os elementos:** `--color-gold` (#8a6d1f) em fundo claro ou `--color-gold-bright` (#c6a44a) em fundo escuro
- **Uso:** materiais premium, certificados, versão de prestígio

---

## 5. Zonas de Proteção e Tamanho Mínimo

### Zona de Proteção (Clear Space)

A zona de proteção mínima ao redor de qualquer versão da logo é igual à largura da letra **A** da fonte Fraunces no tamanho utilizado, medida a partir do bounding box externo da logo.

Na prática:
- **Versão principal (horizontal):** zona de 1× a altura do "ARS"
- **Versão compacta (só símbolo):** zona de 1× o raio do arco

### Tamanho Mínimo de Reprodução

| Versão | Mínimo em pixels | Mínimo em mm (impressão 300dpi) |
|---|---|---|
| Principal (horizontal) | 120px de largura | 32mm |
| Vertical (empilhada) | 80px de largura | 21mm |
| Compacta (só símbolo) | 24px de altura | 6mm |
| Favicon | 16px de altura | — |

Abaixo desses valores, usar a versão imediatamente mais simples.

### O Que Não Pode Ser Feito com a Logo (Regras de Uso Incorreto)

1. **Não distorcer proporções** — A logo nunca é esticada ou comprimida. Escala uniforme apenas.
2. **Não rotacionar o símbolo** — O arco é sempre na posição horizontal (base alinhada).
3. **Não alterar posição do ponteiro** — O ponteiro fica em 87% (Audit Ready) em todas as versões padrão. Posições alternativas são para materiais de campanha específicos, com aprovação prévia.
4. **Não usar gold em fundos que não sejam ink ou paper** — Em fundos coloridos, usar apenas monocromático.
5. **Não separar o A do instrumento** — O A é parte do símbolo, não pode ser reposicionado independentemente.
6. **Não usar múltiplas cores do sistema** — A logo nunca aparece em gradiente, com múltiplas cores de accent, ou com filtros.
7. **Não adicionar sombra ou glow** — Zero efeitos adicionados ao símbolo.
8. **Não colocar a logo sobre imagens** — Apenas sobre fundos sólidos das variações aprovadas.
9. **Não reconstruir o símbolo à mão** — Usar apenas os arquivos SVG originais aprovados.
10. **Não usar o wordmark "ARS" em fonte diferente de Fraunces** — Em contextos onde Fraunces não está disponível, usar o SVG exportado.

---

## 6. Decisões de Refinamento e Justificativas

### Decisão 1: Apex do A coincide com o pivô do ponteiro

**Justificativa:** cria unidade estrutural entre a letra e o instrumento. O A não é uma decoração — é a fundação do instrumento. Quando o ponteiro se move, ele emerge do topo do A. Essa sobreposição é intencional e não é um acidente geométrico.

**Alternativa considerada e rejeitada:** A separado abaixo do instrumento, como base de sustentação. Rejeitado porque criaria dois elementos desconectados — instrumento acima, letra abaixo — sem relação estrutural.

### Decisão 2: Semicírculo de 180° (não mais, não menos)

**Justificativa:** 180° é o ângulo natural de leitura de um instrumento analógico. Ângulos maiores (270°) lembram velocímetros de carro — associação errada para compliance. Ângulos menores (90°) são muito compactos para acomodar os tick marks com clareza. 180° é o sweet spot entre completude e legibilidade.

**Alternativa considerada e rejeitada:** Arco de 270° (formato velocímetro). Rejeitado por associação com velocidade/aceleração, que contradiz a natureza calculada e precisa do produto.

### Decisão 3: Ponteiro em 87% (não 85%, não 90%, não 100%)

**Justificativa:** 87% está dentro da faixa Audit Ready mas não no limite. Não é perfeito, não é extremo — é o estado operacional típico de uma organização bem gerenciada. O produto não promete 100% de conformidade — promete clareza sobre onde você está. Um ponteiro em 87% é honesto: você está pronto, mas o trabalho continua.

**Alternativa considerada:** 100% (ponteiro no máximo). Rejeitado porque sugere que o compliance é um estado final, o que contradiz o conceito de Continuous Compliance e Decay Effect.

### Decisão 4: A em Fraunces geométrico, não tipográfico

**Justificativa:** usar o A tipográfico de Fraunces diretamente criaria conflito de pesos com o traço do instrumento. O A geométrico SVG permite controle preciso de strokeWidth para manter coerência visual com o arco e o ponteiro. Todos os elementos do símbolo têm a mesma família de traço.

### Decisão 5: Tick de 85% em gold, tick de 60% em silver

**Justificativa:** o threshold de 85% é o ponto mais importante do produto inteiro — é onde a organização cruza para Audit Ready. Ele merece tratamento visual especial: cor gold e espessura maior. O threshold de 60% é relevante (separa Não Auditável de Risco Moderado) mas secundário — silver mantém hierarquia correta.

### Decisão 6: Sem número no símbolo padrão

**Justificativa:** o label "87%" pode ser tentador, mas tornaria o símbolo dependente de texto e illegível em tamanhos pequenos. O ponteiro já comunica posição sem precisar de número. Em versões de apresentação grandes (400px+), o número pode aparecer como elemento opcional.

---

## 7. Comparativo Antes/Depois do Refinamento

### Antes (conceito inicial)

- Geometria aproximada, sem grade de referência
- Posição do A indefinida (aproximada no visual)
- Tick marks em posições estimadas
- Espessura de traço inconsistente entre arco e ticks
- Ponteiro sem duplo círculo no pivô

### Depois (versão refinada)

- Grade de 32×32u com todos os pontos calculados matematicamente
- Apex do A coincide exatamente com o pivô (16u, 24u)
- Ticks em ângulos precisos baseados na fórmula real do score (180° - N×1.8°)
- Hierarquia de espessura: ticks menores 0.8u < arco base 1u < tick 60% 1u < ponteiro 1u < tick 85% 1.2u < arco Audit Ready 1.8u
- Pivô com duplo círculo (externo gold, interno paper) — lê como pino de instrumento

---

## Status

Etapa D concluída.

Aguardando aprovação final do conceito refinado para avançar à Etapa E (criação do sistema completo de logo com todos os arquivos).
