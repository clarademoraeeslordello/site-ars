# Post Estático/Vertical — "Planilha de compliance: o que ela não consegue fazer"

**Status:** Produzido por `ars-social-content-producer` — piloto de 2 semanas
**Fonte:** Readaptação de `.claude/organic-strategy/pilot/semana-1-sexta-carrossel.md` — condensação para post único 4:5

---

## Ficha do conteúdo

| Campo | Valor |
|---|---|
| Tema | "Planilha de compliance: o que ela não consegue fazer" |
| Pilar | PRODUTO (introdução suave) |
| Formato | Post estático · vertical 4:5 (1080×1350px) · feed Instagram |
| Persona | Rafael — Compliance Manager sobrecarregado |
| Dor | Gerencia compliance em planilhas desatualizadas que ninguém consegue interpretar, que não calculam prontidão e que falham justo quando há uma auditoria marcada |
| Etapa do funil | Consideração / Conversão (BoFu) |
| CTA | "Veja como a ARS resolve isso — [LINK NA BIO — URL A CONFIRMAR PELA USUÁRIA]" |
| Experimento vinculado | Experimento 3 (`experiments.md`) — conteúdo de produto na sexta converte mais; Experimento 4 — comparação de formato (carrossel 8 slides vs. post único) |
| Métrica principal | Cliques no link da bio |

## Decisão editorial: qual abordagem para condensar

O carrossel original (`semana-1-sexta-carrossel.md`) tem 8 slides expondo 7 limitações estruturais da planilha de compliance.

Para um único frame 4:5, a decisão foi pelo **formato de lista compacta das 7 limitações**, e não pela seleção de uma única limitação mais forte, por duas razões convergentes:

1. **O valor do argumento está na completude.** O Rafael que consome este post já usa planilha — e vai reconhecer pelo menos 3 das 7 limitações de imediato. Mostrar todas as 7 em um único frame cria o "efeito de espelho": quanto mais itens ele reconhece, mais inevitável parece a mudança. Uma única limitação não tem o mesmo poder de acumulação.
2. **Lista de 7 itens é visualmente gerenciável em 4:5.** Em formato 4:5 (1080×1350px), 7 itens de uma linha cada ocupam aproximadamente 35% da altura total — deixando espaço para headline impactante no topo e CTA legível no rodapé, sem compressão ilegível.

O CTA original ("Veja como a ARS resolve isso — link na bio") é mantido com substituição da URL por placeholder explícito `[LINK NA BIO — URL A CONFIRMAR PELA USUÁRIA]`.

## Mensagem principal

Planilha não é a ferramenta errada — é a ferramenta certa para outra coisa. As 7 limitações abaixo não são críticas ao instrumento: são incompatibilidades estruturais com o que compliance auditável, contínuo e rastreável exige.

## Hook

"Planilha de compliance: o que ela não consegue fazer." — descritivo, sem julgamento, sem condescendência. Afirmação técnica que ativa o reconhecimento de Rafael: ele já sente essas limitações, mas nunca as viu listadas com precisão suficiente para comunicar à liderança por que precisa de algo diferente.

---

## Conteúdo completo — visual único

### Composição do frame 4:5 (de cima para baixo)

**Zona superior — Contexto e hook (aprox. 22% da altura)**
- Eyebrow (IBM Plex Mono 400, silver, uppercase, letter-spacing 0.16em): `7 LIMITAÇÕES REAIS`
- Separador: linha hairline-dark 1px
- Headline (Fraunces 600, paper, mín. 20px): "Planilha de compliance: o que ela não consegue fazer."
- Sub-headline (Archivo 400, silver, mín. 13px): Não é crítica à ferramenta. É sobre o que compliance auditável estruturalmente exige.

**Zona central — As 7 limitações (aprox. 56% da altura)**

Lista numerada compacta. Cada item em linha única (Archivo 400, paper, mín. 13px). Numeração em IBM Plex Mono 500, gold-bright. Espaçamento entre itens: 10px. Margem lateral mínima 32px.

```
01  Não calcula o score de prontidão para auditoria
02  Não avisa quando evidências estão vencendo
03  Não tem trilha de auditoria imutável
04  Não distribui responsabilidades com notificação automática
05  Não consolida múltiplas normas no mesmo lugar
06  Não tem histórico de tendência de cobertura
07  Não gera relatório exportável para auditores
```

Separador: linha hairline-dark 1px após o item 07 (fechando a lista antes do rodapé).

**Zona inferior — Rodapé e CTA (aprox. 22% da altura)**
- Destaque (Archivo 400, silver, mín. 13px): Não são críticas. São incompatibilidades estruturais.
- Espaço 12px
- CTA (Archivo 500, paper, mín. 14px): "Veja como a ARS resolve isso — [LINK NA BIO — URL A CONFIRMAR PELA USUÁRIA]"
- Espaço 12px
- Linha rodapé: handle `@ars.compliance` (IBM Plex Mono 400, silver, lado esquerdo) · Logo `logo-horizontal-dark.svg` (lado direito, largura mínima 120px)

---

## Direção de arte

Território visual INSTRUMENTO com estrutura de listagem técnica — o post lembra um relatório de auditoria mais do que um infográfico. Fundo ink (#101014) fixo. O contraste é puramente tipográfico: numeração gold-bright em IBM Plex Mono como elemento visual dominante de cada item, texto paper para as afirmações, sub-headline em silver para o enquadramento editorial. Não há ícones decorativos nem elementos visuais além de dois separadores de 1px.

**TÍTULO:** "Planilha de compliance: o que ela não consegue fazer."

**TEXTO DA CAPA (o que aparece no frame):**
```
7 LIMITAÇÕES REAIS
─────────────────────────────────────
Planilha de compliance: o que ela não consegue fazer.
Não é crítica à ferramenta. É sobre o que compliance auditável estruturalmente exige.

01  Não calcula o score de prontidão para auditoria
02  Não avisa quando evidências estão vencendo
03  Não tem trilha de auditoria imutável
04  Não distribui responsabilidades com notificação automática
05  Não consolida múltiplas normas no mesmo lugar
06  Não tem histórico de tendência de cobertura
07  Não gera relatório exportável para auditores

─────────────────────────────────────
Não são críticas. São incompatibilidades estruturais.

Veja como a ARS resolve isso — [LINK NA BIO — URL A CONFIRMAR PELA USUÁRIA]

@ars.compliance                        [logo ARS]
```

### Aplicação da identidade visual

**Logo:** `logo-horizontal-dark.svg` · clear space equivalente à altura do "A" do wordmark em todos os lados · largura mínima 120px · nunca rotacionada, nunca distorcida

**Cores:**
- `--color-ink` (#101014): fundo do frame
- `--color-paper` (#faf8f4): headline, itens da lista, texto do CTA
- `--color-gold-bright` (#c6a44a): numeração 01–07 — nunca `--color-gold` (#8a6d1f) sobre fundo escuro (contraste insuficiente ~3.5:1)
- `--color-silver` (#6e6e73): eyebrow, sub-headline, rodapé "não são críticas", handle
- `--color-hairline-dark` (#3a3a40): dois separadores de 1px
- Nenhum azul · nenhum gradiente · nenhum box-shadow · cores semânticas (ok/risk/nc) não utilizadas neste conteúdo

**Fontes:**
- Fraunces 600: headline — mínimo 20px no arquivo de design
- Archivo 500: texto do CTA — mínimo 14px
- Archivo 400: sub-headline, itens da lista, texto do rodapé — mínimo 13px
- IBM Plex Mono 500: numeração 01–07 — mínimo 14px
- IBM Plex Mono 400: eyebrow uppercase (letter-spacing ≥0.16em), handle

**Elementos:**
- Dois separadores de 1px hairline-dark (um abaixo da sub-headline, um acima do rodapé)
- Lista compacta sem bullets — numeração substitui marcadores visuais

**Imagens:**
100% tipográfico. Nenhuma fotografia de stock, nenhuma ilustração, nenhum ícone. A numeração gold-bright em IBM Plex Mono é o único elemento visual além do logo.

---

## Legenda

Planilha não é a ferramenta errada para compliance. É a ferramenta certa para outra coisa.

O problema é que compliance auditável exige coisas que planilha estruturalmente não entrega:

1. Score calculado com pesos por criticidade — não uma contagem de células verdes
2. Alertas quando evidências estão vencendo — não uma descoberta reativa na véspera da auditoria
3. Trilha de auditoria imutável — não um histórico editável por quem tem acesso ao arquivo
4. Responsabilidades com notificação automática — não cobranças manuais por e-mail
5. Múltiplas normas no mesmo ambiente — não uma aba por certificação
6. Histórico de tendência de cobertura — não apenas o estado atual do dia
7. Relatório exportável para o auditor — não uma planilha com filtros que ele precisa interpretar

Essas não são críticas. São incompatibilidades estruturais.

Veja como a ARS resolve isso — [LINK NA BIO — URL A CONFIRMAR PELA USUÁRIA]

## CTA

"Veja como a ARS resolve isso — [LINK NA BIO — URL A CONFIRMAR PELA USUÁRIA]" — CTA de BoFu. O playbook instrui: "reservar link para posts de BoFu." O argumento de 7 limitações em um único frame constrói o conjunto de reconhecimentos necessário para que o clique no link seja uma decisão informada. Placeholder de URL deve ser substituído pela usuária com o link definitivo antes da publicação. **O link deve ser distinto do link principal do site** (usar URL única para rastreamento de origem Instagram, conforme instrução do playbook de performance).

## Hashtags

7 hashtags — 3 Bloco A + 2 Bloco B + 2 Bloco C (rotação distinta do carrossel de referência, que usou #compliance #ISO27001 #segurancadainformacao #startups #tecnologia #auditreadiness #compliancedigital):

`#GRC` `#auditoria` `#compliance` `#gestao` `#governanca` `#compliancedigital` `#compliancecontinuo`

**Nota de rotação:** substituição de #ISO27001 e #segurancadainformacao por #GRC e #auditoria (termos que Rafael busca quando está em processo ativo de certificação, não apenas aprendendo sobre a norma); #startups e #tecnologia por #gestao e #governanca (atingindo Rafael em contexto de operação de compliance, não de descoberta de segmento).

## Palavras-chave

ferramentas de compliance · alternativa à planilha de compliance · software de gestão de compliance · como organizar compliance sem planilha · audit readiness score · score de prontidão auditoria · gestão de conformidade

## Texto alternativo

Post estático, fundo escuro. Eyebrow em fonte monospace uppercase: "7 LIMITAÇÕES REAIS". Headline em destaque creme: "Planilha de compliance: o que ela não consegue fazer." Subtítulo em cinza: "Não é crítica à ferramenta. É sobre o que compliance auditável estruturalmente exige." Lista compacta com sete itens numerados de 01 a 07 em dourado, texto de cada item em creme: 01 — Não calcula o score de prontidão para auditoria. 02 — Não avisa quando evidências estão vencendo. 03 — Não tem trilha de auditoria imutável. 04 — Não distribui responsabilidades com notificação automática. 05 — Não consolida múltiplas normas no mesmo lugar. 06 — Não tem histórico de tendência de cobertura. 07 — Não gera relatório exportável para auditores. Rodapé em cinza: "Não são críticas. São incompatibilidades estruturais." CTA em branco: "Veja como a ARS resolve isso — link na bio." Handle @ars.compliance em cinza à esquerda. Logo ARS à direita.

---

## Validação de produto (`ars-product-truth` + `docs/product-context.md`)

| Afirmação | Status | Referência |
|---|---|---|
| "Não calcula o score de prontidão para auditoria" [planilha] | FATO EDITORIAL — afirmação sobre planilha, não sobre o produto ARS; serve de contraste para funcionalidade implementada | Contraste com Audit Readiness Score Engine (IMPLEMENTADO) — product-context.md seção 10 |
| Score calculado com pesos por criticidade (no CTA da legenda) | IMPLEMENTADO | product-context.md seção 10 — fórmula com Critical=4, High=3, Medium=2, Low=1; ars-product-truth seção 10 |
| "Não avisa quando evidências estão vencendo" [planilha] | FATO EDITORIAL | Contraste com motor de renovação e notificações automáticas (IMPLEMENTADO) — product-context.md seção 9 |
| Alertas automáticos quando evidências vencem (na legenda) | IMPLEMENTADO | product-context.md seção 9 — "notificações por e-mail e in-app"; motor de renovação contínua |
| "Não tem trilha de auditoria imutável" [planilha] | FATO EDITORIAL | Contraste com Audit Trail append-only com hash encadeado (IMPLEMENTADO) — product-context.md seção 9 |
| Trilha de auditoria imutável (na legenda) | IMPLEMENTADO | product-context.md seção 9 — "Audit Trail append-only com hash encadeado" |
| "Não distribui responsabilidades com notificação automática" [planilha] | FATO EDITORIAL | Contraste com Atividades com ownership e notificações (IMPLEMENTADO) — product-context.md seção 9 |
| Responsabilidades com notificação automática (na legenda) | IMPLEMENTADO | product-context.md seção 9 — Atividades com CRUD, ownership e notificações in-app e e-mail |
| "Não consolida múltiplas normas no mesmo lugar" [planilha] | FATO EDITORIAL | Contraste com catálogo de 30+ frameworks (IMPLEMENTADO) — ars-product-truth seção 10 |
| Múltiplas normas no mesmo ambiente (na legenda) | IMPLEMENTADO | product-context.md seção 9 — "Catálogo de 30 frameworks + LGPD"; ars-product-truth — "Catálogo de mais de 30 frameworks normativos" |
| "Não tem histórico de tendência de cobertura" [planilha] | FATO EDITORIAL | Contraste com Coverage Engine com snapshots (IMPLEMENTADO) — product-context.md seção 9 |
| Histórico de cobertura (na legenda) | IMPLEMENTADO | product-context.md seção 9 — "Coverage Engine com snapshots e histórico" |
| "Não gera relatório exportável para auditores" [planilha] | FATO EDITORIAL | Contraste com relatórios exportáveis (IMPLEMENTADO) — product-context.md seção 9 |
| Relatório exportável para o auditor (na legenda) | IMPLEMENTADO | product-context.md seção 9 — "Relatórios exportáveis (Audit Readiness, SOA, evidências consolidadas, maturidade)" |
| URL no CTA substituída por placeholder explícito | PLACEHOLDER — aguarda confirmação da usuária | Instrução da tarefa: não inventar URL |
| Nenhuma menção a Compliance Graph, Cross-Mapping automático pleno, AI Advisor ou funcionalidades futuras | AUSENTE — validado | — |
| Nenhuma comparação numérica com concorrentes sem fonte | AUSENTE — validado | claim proibido não utilizado |
| Nenhuma promessa de aprovação garantida | AUSENTE — validado | claim proibido não utilizado |

## Validação de marca (`ars-brand-system`)

Fundo ink (#101014) fixo no frame · gold-bright (#c6a44a) na numeração 01–07 como único acento sobre fundo escuro — nunca gold (#8a6d1f) sobre ink · silver para eyebrow, sub-headline, rodapé e handle · paper para headline, itens da lista e CTA · hairline-dark para dois separadores de 1px · sem azul em qualquer tonalidade · sem gradiente, sem box-shadow · Fraunces/Archivo/IBM Plex Mono sem quarta família tipográfica · Fraunces mínimo 20px · IBM Plex Mono uppercase com letter-spacing ≥0.16em no eyebrow · logo horizontal dark com clear space no rodapé · nenhuma fotografia de stock · nenhum ícone decorativo · sem elementos além de tipografia, separadores e logo.

## Métrica e hipótese

**Métrica principal:** cliques no link da bio durante a semana de publicação. Benchmark: >3% dos visualizadores do post = bom (conforme performance-framework.md para Story com link; parâmetro adaptado para post BoFu com link na bio). Rastrear com URL único de bio Instagram distinto do link do site, conforme instrução do playbook.

**Hipótese:** Post estático de BoFu com as 7 limitações da planilha em formato de lista compacta gera taxa de clique no link da bio comparável ao carrossel de 8 slides (`semana-1-sexta-carrossel.md`), porque o Rafael que lê a lista completa em um único frame passa pelo mesmo conjunto de reconhecimentos de dor que o leitor do carrossel — com menor tempo de exposição. O formato único pode ter taxa de swipe menor, mas maior proporção de leitores que chegam ao CTA (sem abandono por cansaço de deslizar). Vínculo com **Experimento 3** (`experiments.md`): se publicado na sexta, entra no pool de dados sobre eficácia de conteúdo de produto na sexta vs. outros dias. Dado adicional para **Experimento 4**: comparação informal entre este post único (1 frame) e o carrossel equivalente (8 frames) sobre o mesmo tema.

---

*Produzido por `ars-social-content-producer` · validado contra `ars-product-truth` (todos os 7 claims sobre funcionalidades ARS são IMPLEMENTADOS; URL do CTA substituída por placeholder a pedido da tarefa), `ars-brand-system` (identidade visual integral), `ars-organic-content-playbook` (Pilar PRODUTO suave · BoFu · post estático 4:5) · Piloto de 2 semanas — adaptação de semana-1-sexta-carrossel.md.*
