# Post Estático/Vertical — "ISO 27001 em 60 segundos"

**Status:** Produzido por `ars-social-content-producer` — piloto de 2 semanas
**Fonte:** Readaptação de `.claude/organic-strategy/pilot/semana-2-segunda-carrossel.md` — condensação para post único 4:5

---

## Ficha do conteúdo

| Campo | Valor |
|---|---|
| Tema | "ISO 27001 em 60 segundos — sem jargão, sem enrolação" |
| Pilar | CLAREZA |
| Formato | Post estático · vertical 4:5 (1080×1350px) · feed Instagram |
| Persona primária | Camila — CEO que recebeu exigência de cliente ou parceiro |
| Persona secundária | Bruno — Analista de TI que produz evidências |
| Dor | Não sabe o que é ISO 27001 e precisa responder a um cliente, tomar uma decisão ou explicar para o board o que a certificação realmente exige |
| Etapa do funil | Descoberta (ToFu) |
| CTA | "Compartilha com quem precisa entender isso hoje" |
| Métrica principal | Taxa de compartilhamento (shares) + save rate |
| Experimento vinculado | Sem vínculo direto com experiments.md — ver hipótese |

## Decisão editorial: qual insight do carrossel original condensar

O carrossel original (`semana-2-segunda-carrossel.md`) tem 7 slides com a seguinte progressão:
1. Capa/hook · 2. O mito · 3. A definição real · 4. O que ela exige (três elementos) · 5. Quem precisa · 6. Como funciona a certificação · 7. CTA

Para um único frame 4:5, o insight escolhido é o **Slide 4 — "Três elementos. Sem atalho."** pela convergência de três razões:

1. **Máxima síntese visual.** Três cards numerados traduzem diretamente para uma composição visual organizada e legível em tela mobile — sem precisar de progressão, sem perda de estrutura.
2. **Independência de contexto.** Este é o slide que funciona sem os anteriores: o leitor não precisa ter lido os slides 2 e 3 para compreender "o que ISO 27001 exige". A Camila que vê este post pela primeira vez entende o conteúdo e o compartilha.
3. **Máximo valor de save.** Os três elementos (avaliação de riscos / controles implementados / evidências documentadas) são informação acionável que o leitor vai querer guardar. A frase-rodapé "Os três precisam existir. Ter dois não certifica nada." é de forte retenção mnemônica.

O hook da capa do carrossel ("ISO 27001 parece código secreto. Não é.") foi adaptado como eyebrow + headline no topo do frame único para ancorar o conteúdo com contexto mínimo necessário.

## Mensagem principal

ISO 27001 não é papelada: é um sistema de gestão construído sobre três elementos concretos. Sem os três, não existe certificação.

## Hook

"ISO 27001 parece código secreto. Não é." — mesmo hook contrarian do carrossel original, adaptado como texto de abertura do frame. Ativa identificação imediata em Camila (que recebeu o pedido sem saber o que responder) e em Bruno (que convive com o tema sem ter tido explicação clara).

---

## Conteúdo completo — visual único

### Composição do frame 4:5 (de cima para baixo)

**Zona superior — Contexto e hook (aprox. 20% da altura)**
- Eyebrow (IBM Plex Mono 400, silver, uppercase, letter-spacing 0.16em): `ISO 27001 · EM 60 SEGUNDOS`
- Separador: linha hairline-dark 1px
- Headline (Fraunces 600, paper, mín. 22px): "Três elementos. Sem atalho."
- Sub-headline (Archivo 400, silver, mín. 14px): ISO 27001 parece código secreto. Não é — é um sistema de gestão com exigências claras.

**Zona central — Os três elementos (aprox. 58% da altura)**

Três cards verticais empilhados, gap-px pattern: container com `gap: 8px; background: var(--color-hairline-dark)`, cada card com `background: var(--color-ink)`, `border-radius: 2px`, `padding: 16px`.

- **Card 1**
  - Número (IBM Plex Mono 500, gold-bright, mín. 28px): `01`
  - Título (Archivo 500, paper): Avaliação de riscos
  - Corpo (Archivo 400, silver, mín. 14px): Quais riscos existem para suas informações — e como você os trata.

- **Card 2**
  - Número (IBM Plex Mono 500, gold-bright, mín. 28px): `02`
  - Título (Archivo 500, paper): Controles implementados
  - Corpo (Archivo 400, silver, mín. 14px): As medidas concretas que você adotou para reduzir os riscos identificados.

- **Card 3**
  - Número (IBM Plex Mono 500, gold-bright, mín. 28px): `03`
  - Título (Archivo 500, paper): Evidências documentadas
  - Corpo (Archivo 400, silver, mín. 14px): A prova de que você faz o que diz. É o que o auditor vai pedir primeiro.

**Zona inferior — Rodapé e identidade (aprox. 22% da altura)**
- Separador: linha hairline-dark 1px
- Destaque (IBM Plex Mono 400, gold-bright, uppercase, letter-spacing 0.12em): `OS TRÊS PRECISAM EXISTIR. TER DOIS NÃO CERTIFICA NADA.`
- Separador 8px
- Linha rodapé: handle `@ars.compliance` (IBM Plex Mono 400, silver, lado esquerdo) · Logo `logo-horizontal-dark.svg` (lado direito, largura mínima 120px em formato 4:5)

---

## Direção de arte

Território visual INSTRUMENTO — legibilidade máxima de painel de leitura. Fundo ink (#101014) fixo em todo o frame. A composição é inteiramente tipográfica: três cards como elemento central, cada um com hierarquia interna (número dominante → título → corpo). A escala do número `01/02/03` em IBM Plex Mono é o elemento visual primário que organiza o olhar — não é decorativo, é dado de sequência.

**TÍTULO:** "Três elementos. Sem atalho."

**TEXTO DA CAPA (o que aparece no frame):**
```
ISO 27001 · EM 60 SEGUNDOS
────────────────────────────
Três elementos. Sem atalho.
ISO 27001 parece código secreto. Não é — é um sistema de gestão com exigências claras.

[01]
Avaliação de riscos
Quais riscos existem para suas informações — e como você os trata.

[02]
Controles implementados
As medidas concretas que você adotou para reduzir os riscos identificados.

[03]
Evidências documentadas
A prova de que você faz o que diz. É o que o auditor vai pedir primeiro.

────────────────────────────
OS TRÊS PRECISAM EXISTIR. TER DOIS NÃO CERTIFICA NADA.

@ars.compliance                              [logo ARS]
```

### Aplicação da identidade visual

**Logo:** `logo-horizontal-dark.svg` · clear space equivalente à altura do "A" do wordmark · largura mínima 120px (formato mais compacto que carrossel dado o espaço do frame 4:5) · nunca rotacionada, nunca distorcida

**Cores:**
- `--color-ink` (#101014): fundo do frame e fundo interno dos cards
- `--color-paper` (#faf8f4): headline principal e títulos dos cards
- `--color-gold-bright` (#c6a44a): números `01/02/03` e rodapé destaque mono — nunca `--color-gold` (#8a6d1f) sobre fundo escuro (contraste insuficiente)
- `--color-silver` (#6e6e73): eyebrow, sub-headline, corpo dos cards, handle
- `--color-hairline-dark` (#3a3a40): separadores e gaps entre cards (padrão gap-px grid)
- Nenhum azul em qualquer tonalidade · Nenhum gradiente · Nenhum box-shadow · Cores semânticas (ok/risk/nc) não utilizadas neste conteúdo

**Fontes:**
- Fraunces 600: headline "Três elementos. Sem atalho." — mínimo 22px no arquivo de design
- Archivo 500: títulos dos cards — mínimo 15px
- Archivo 400: sub-headline, corpo dos cards — mínimo 14px
- IBM Plex Mono 500: números 01/02/03 — mínimo 28px, letter-spacing padrão
- IBM Plex Mono 400: eyebrow uppercase (letter-spacing ≥0.16em), handle, rodapé destaque (letter-spacing ≥0.12em)

**Elementos:**
- Três cards retangulares empilhados com gap-px pattern (container hairline-dark, cards ink, border-radius 2px, padding 16px, gap 8px)
- Dois separadores de 1px hairline-dark (um entre eyebrow e headline, um acima do rodapé)
- Logo horizontal dark no rodapé direito

**Imagens:**
100% tipográfico e de composição — nenhuma fotografia de stock, nenhuma ilustração figurativa, nenhum ícone decorativo. A numeração IBM Plex Mono em gold-bright em tamanho grande é o elemento visual principal de cada card.

---

## Legenda

ISO 27001 não é um projeto de documentação. É um sistema de gestão.

E todo sistema de gestão tem uma estrutura. No caso da ISO 27001, são três elementos — e os três precisam coexistir:

01 · Avaliação de riscos — o que ameaça as suas informações e como você responde
02 · Controles implementados — as medidas concretas para reduzir esses riscos
03 · Evidências documentadas — a prova de que você realmente faz o que diz

Ter dois dos três não certifica nada. A auditoria verifica os três.

Compartilha com quem precisa entender isso hoje.

## CTA

"Compartilha com quem precisa entender isso hoje" — CTA de alcance, alinhado à etapa ToFu. Ativa compartilhamento sem exigir saída da plataforma. A Camila que entendeu vai mandar para o time técnico ou para o board. Não inclui link — correto para ToFu (algoritmo penaliza links em posts de feed; reservar link para BoFu conforme instrução do playbook).

## Hashtags

7 hashtags — 3 Bloco A + 2 Bloco B + 2 Bloco C (rotação distinta da publicação de carrossel de referência, que usou #ISO27001 #compliance #segurancadainformacao #gestao #startups #auditreadiness #compliancedigital):

`#ISO27001` `#certificacaoiso` `#gestaoderisco` `#empreendedorismo` `#PME` `#auditreadiness` `#compliancedigital`

**Nota de rotação:** substituição de #compliance por #certificacaoiso (mais específico para quem está no início do processo), #segurancadainformacao por #gestaoderisco (vocabulário de quem avalia risco, não apenas segurança técnica), #gestao e #startups por #empreendedorismo e #PME (atingindo Camila em contexto de negócio, não de gestão operacional).

## Palavras-chave

o que é ISO 27001 · ISO 27001 explicado simples · o que exige ISO 27001 · avaliação de riscos ISO 27001 · evidências de auditoria · controles de segurança da informação · certificação ISO 27001 PME

## Texto alternativo

Post estático, fundo escuro. Eyebrow em fonte monospace uppercase: "ISO 27001 · EM 60 SEGUNDOS". Headline em destaque creme: "Três elementos. Sem atalho." Subtítulo em cinza: "ISO 27001 parece código secreto. Não é — é um sistema de gestão com exigências claras." Três cards numerados em sequência vertical: Card 01 — "Avaliação de riscos — quais riscos existem para suas informações e como você os trata." Card 02 — "Controles implementados — as medidas concretas para reduzir os riscos." Card 03 — "Evidências documentadas — a prova de que você faz o que diz. É o que o auditor vai pedir primeiro." Rodapé em dourado monospace uppercase: "OS TRÊS PRECISAM EXISTIR. TER DOIS NÃO CERTIFICA NADA." Handle @ars.compliance em cinza à esquerda. Logo ARS à direita.

---

## Validação de produto (`ars-product-truth` + `docs/product-context.md`)

| Afirmação | Status | Referência |
|---|---|---|
| "ISO 27001 é um sistema de gestão com exigências claras" | FATO NORMATIVO — independente do produto ARS | ISO/IEC 27001:2022 (fato público); distinção sistema de gestão vs. papelada é posicionamento editorial sobre a norma |
| "Exige avaliação de riscos" | FATO NORMATIVO | ISO 27001:2022, cláusulas 6.1 e 8.2 |
| "Exige controles implementados" | FATO NORMATIVO | ISO 27001:2022, cláusula 6.1.3 e Anexo A |
| "Exige evidências documentadas" | FATO NORMATIVO | ISO 27001:2022, cláusula 7.5 e 8.1 |
| "Os três precisam existir. Ter dois não certifica nada." | FATO NORMATIVO — posicionamento editorial sobre a norma, sem claim de produto ARS | Reflete processo de certificação acreditado |
| "É o que o auditor vai pedir primeiro" (evidências) | FATO NORMATIVO — reflete prática padrão de auditoria Stage 2 | Baseado em processo padrão de organismos acreditados |
| Nenhum claim de funcionalidade da ARS foi feito | VALIDADO — ausente | Conteúdo CLAREZA ToFu — ARS aparece exclusivamente como fonte (@ars.compliance e logo) |
| Nenhuma menção a funcionalidades futuras | VALIDADO — ausente | — |
| Nenhuma promessa de aprovação garantida | VALIDADO — ausente | claim proibido não utilizado |

**Nota editorial:** Este conteúdo é educativo puro sobre a norma ISO 27001 (Pilar CLAREZA, ToFu). Todos os claims são sobre a norma, não sobre funcionalidades da ARS. A marca aparece exclusivamente como autora e fonte de autoridade.

## Validação de marca (`ars-brand-system`)

Fundo ink (#101014) fixo no frame inteiro · gold-bright (#c6a44a) como único acento sobre fundo escuro, nunca gold (#8a6d1f) sobre ink · silver para eyebrow, sub-headline, corpo dos cards e handle · hairline-dark para gaps e separadores · nenhum azul em qualquer tonalidade · sem gradiente, sem box-shadow · Fraunces/Archivo/IBM Plex Mono sem quarta família tipográfica · Fraunces mínimo 22px · IBM Plex Mono uppercase com letter-spacing ≥0.12em no rodapé e ≥0.16em no eyebrow · border-radius 2px em todos os elementos retangulares · gap-px pattern nos três cards · logo horizontal dark com clear space respeitado · nenhuma fotografia de stock · nenhum ícone decorativo · sem box-shadow.

## Métrica e hipótese

**Métrica principal:** taxa de compartilhamento (shares) + save rate. Conteúdo de clareza ToFu tem share como principal indicador de alcance orgânico e save como indicador de valor percebido.

**Hipótese:** Post estático que condensa o insight mais acionável do carrossel ISO 27001 (os três elementos exigidos) em uma única imagem tem save rate equivalente ou superior ao carrossel de 7 slides, porque a densidade de valor por frame é maior e o custo cognitivo de consumo é menor. Propõe-se comparação informal entre save rate deste post estático e o save rate do carrossel `semana-2-segunda-carrossel.md` publicado na mesma janela temporal — dado para alimentar Experimento 4 (carrossel 6 slides vs. 10 slides) com uma variante de formato extremo (1 frame vs. N frames). **Vínculo com experiments.md:** adjacente ao Experimento 4, sem ser o teste formal definido. Declarar sem experimento específico; registrar resultado como dado qualitativo de formato.

---

*Produzido por `ars-social-content-producer` · validado contra `ars-product-truth` (conteúdo educativo puro — sem claims de produto), `ars-brand-system` (identidade visual integral), `ars-organic-content-playbook` (Pilar CLAREZA · ToFu · post estático 4:5) · Piloto de 2 semanas — adaptação de semana-2-segunda-carrossel.md.*
