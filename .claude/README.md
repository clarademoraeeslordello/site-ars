# .claude — Arquitetura de Agentes e Skills da ARS

Arquitetura oficial de agentes e skills da **Audit Readiness Score (ARS)**
no Claude Code. Define responsabilidades, dependências, regras de delegação
e capacidades disponíveis para cada agente do projeto.

---

## Estrutura

```
.claude/
├── agents/
│   ├── ars-brand-architect.md           — Identidade visual, logo, brand system
│   ├── ars-organic-growth-strategist.md — Estratégia orgânica, pesquisa, planejamento
│   └── ars-social-content-producer.md  — Produção de conteúdo para Instagram
│
├── skills/
│   └── ars-product-truth/
│       └── SKILL.md                     — Camada de governança de produto (obrigatória)
│
└── README.md                            — Este documento
```

**Skills não criadas ainda** (aguardam aprovação das etapas anteriores):
- `.claude/skills/ars-brand-system/` — criada pelo `ars-brand-architect` na Etapa G
- `.claude/skills/ars-organic-content-playbook/` — criada após aprovação da estratégia

---

## Skill: ars-product-truth

**Arquivo:** `.claude/skills/ars-product-truth/SKILL.md`

**Propósito:** Camada de governança que define a verdade oficial do produto.
Obrigatória para todos os agentes ARS antes de qualquer produção.

**O que governa:**
- O que é a ARS e o que ela não é
- O que está implementado em produção hoje
- O que é parcialmente implementado
- O que é visão futura — jamais apresentar como disponível
- Terminologia oficial obrigatória
- Claims permitidos e proibidos
- Tom comercial da marca

**Fonte de verdade primária:** `docs/product-context.md`
A skill é camada de governança — o documento completo deve ser consultado
para detalhes técnicos, fórmulas, personas e definições completas.

**Como carregar:** `/ars-product-truth` ou referenciando a skill no contexto do agente.

---

## Agente 1: ars-brand-architect

**Arquivo:** `.claude/agents/ars-brand-architect.md`

**Responsabilidade:**
Analisar a identidade visual do site, criar a logo oficial, consolidar o
brand system e preparar ativos de marca para todos os canais da ARS.

**Quando usar:**
- Auditoria visual do site
- Criação de conceitos de logo
- Consolidação do design system
- Geração do brand kit
- Criação da skill `ars-brand-system`

**Não usar para:** produção de posts, estratégia de conteúdo, copywriting.

**Skills associadas:**
| Skill | Finalidade |
|-------|-----------|
| `ars-product-truth` | Obrigatória — ancoragem no produto |
| `frontend-design` | Análise e orientação de design de interface |
| `canvas-design` | Criação e visualização de conceitos visuais |
| `web-design-guidelines` | Auditoria de padrões de UI e identidade web |
| `design:design-system` | Documentação e consolidação de design system |
| `design:design-critique` | Análise crítica de propostas visuais |
| `design:design-handoff` | Especificações técnicas para implementação |
| `design:accessibility-review` | Verificação de contraste e acessibilidade visual |

**Ferramentas:** `Read`, `Glob`, `Grep`, `Write`, `Edit`, `Skill`

**Modelo:** `claude-sonnet-4-6`

**Etapas de trabalho:**
```
A → Auditoria visual do site
B → Definição da essência e territórios visuais  [APROVAÇÃO]
C → Apresentação de 3+ conceitos de logo         [APROVAÇÃO]
D → Refinamento do conceito escolhido             [APROVAÇÃO]
E → Sistema final de logo
F → Brand kit
G → Criação da skill ars-brand-system
```

**Como chamar:** `use ars-brand-architect` ou delegação automática em tasks de identidade visual.

---

## Agente 2: ars-organic-growth-strategist

**Arquivo:** `.claude/agents/ars-organic-growth-strategist.md`

**Responsabilidade:**
Pesquisar o mercado, definir a estratégia orgânica da ARS para Instagram
e outros canais, planejar a arquitetura editorial e analisar desempenho.

**Quando usar:**
- Pesquisa de concorrentes de conteúdo
- Definição de pilares editoriais
- Planejamento de calendário temático
- Estratégia de crescimento orgânico
- Hipóteses e experimentos de conteúdo
- Análise de performance

**Não usar para:** produção de posts individuais, criação de peças de conteúdo.

**Skills associadas:**
| Skill | Finalidade |
|-------|-----------|
| `ars-product-truth` | Obrigatória — ancoragem no produto |
| `marketing:competitive-brief` | Análise de concorrentes e gaps de conteúdo |
| `marketing:campaign-plan` | Planejamento de campanhas e calendário |
| `marketing:brand-review` | Auditoria de estratégia contra voz da marca |
| `marketing:performance-report` | Frameworks de métricas e análise |
| `marketing:seo-audit` | Pesquisa de keywords e oportunidades orgânicas |

**Ferramentas:** `Read`, `Glob`, `Grep`, `Write`, `Edit`, `WebSearch`, `WebFetch`, `Skill`

**Modelo:** `claude-sonnet-4-6`

**Workflow:**
```
PESQUISAR → PLANEJAR → PRIORIZAR → DEFINIR ESTRATÉGIA → ANALISAR RESULTADOS
```

**Dependência:** Consolida templates visuais permanentes apenas após existência de `ars-brand-system`.

**Como chamar:** `use ars-organic-growth-strategist` ou delegação automática em tasks de estratégia.

---

## Agente 3: ars-social-content-producer

**Arquivo:** `.claude/agents/ars-social-content-producer.md`

**Responsabilidade:**
Produzir conteúdos completos para Instagram: posts, carrosséis, Stories,
Reels, roteiros, legendas, hooks, CTAs e briefings visuais.

**Quando usar:**
- Produção de post específico
- Criação de carrossel sobre tema definido
- Roteiro de Reel
- Série de Stories
- Pack de conteúdos para período ou campanha
- Briefing visual para designer

**Pré-condição:** Estratégia aprovada por `ars-organic-growth-strategist`.
Sem estratégia aprovada, informar ao usuário e sugerir que o strategist seja acionado.

**Não usar para:** estratégia, pesquisa de mercado, identidade visual.

**Skills associadas:**
| Skill | Finalidade |
|-------|-----------|
| `ars-product-truth` | Obrigatória — validação de claims |
| `marketing:draft-content` | Redação de legendas, hooks e CTAs |
| `marketing:content-creation` | Briefings e estruturação de peças |
| `marketing:brand-review` | Auditoria final de cada peça produzida |
| `canvas-design` | Visualização e mockups quando necessário |
| `writing-guidelines` | Revisão de qualidade textual |
| `ars-brand-system` | Quando disponível — regras visuais oficiais |
| `ars-organic-content-playbook` | Quando disponível — regras de conteúdo |

**Ferramentas:** `Read`, `Glob`, `Grep`, `Write`, `Edit`, `Skill`

**Modelo:** `claude-sonnet-4-6`

**Entrega obrigatória por conteúdo:** Objetivo, Público, Funil, Pilar, Formato,
Tema, Problema, Mensagem, Hook, Título, Capa, Conteúdo, Direção Visual, Cores,
Fontes, Elementos, Imagens, Legenda, CTA, Hashtags, Alt text, Validação de Claims,
Métrica, Hipótese.

**Como chamar:** `use ars-social-content-producer` ou delegação automática em tasks de produção.

---

## Cadeia de Dependências

```
docs/product-context.md
        ↓
ars-product-truth (skill) ← todos os agentes dependem desta
        ↓
ars-brand-architect → [cria] → ars-brand-system (skill)
        ↓                              ↓
ars-organic-growth-strategist → [cria] → ars-organic-content-playbook (skill)
        ↓
ars-social-content-producer
```

---

## Capacidades Disponíveis no Ambiente

### Skills de Identidade e Design
| Nome exato | Tipo | Disponível |
|-----------|------|-----------|
| `frontend-design` | Skill | ✓ |
| `canvas-design` | Skill | ✓ |
| `web-design-guidelines` | Skill | ✓ |
| `design:design-system` | Design Plugin | ✓ |
| `design:design-critique` | Design Plugin | ✓ |
| `design:design-handoff` | Design Plugin | ✓ |
| `design:accessibility-review` | Design Plugin | ✓ |
| `design:user-research` | Design Plugin | ✓ |
| `design:ux-copy` | Design Plugin | ✓ |

### Skills de Marketing e Conteúdo
| Nome exato | Tipo | Disponível |
|-----------|------|-----------|
| `marketing:competitive-brief` | Marketing Plugin | ✓ |
| `marketing:campaign-plan` | Marketing Plugin | ✓ |
| `marketing:brand-review` | Marketing Plugin | ✓ |
| `marketing:draft-content` | Marketing Plugin | ✓ |
| `marketing:content-creation` | Marketing Plugin | ✓ |
| `marketing:performance-report` | Marketing Plugin | ✓ |
| `marketing:seo-audit` | Marketing Plugin | ✓ |
| `marketing:email-sequence` | Marketing Plugin | ✓ |
| `writing-guidelines` | Skill | ✓ |

### Skills de Projeto
| Nome exato | Tipo | Disponível |
|-----------|------|-----------|
| `skill-creator` | Skill | ✓ |
| `ars-product-truth` | Skill (projeto) | ✓ (criada nesta arquitetura) |
| `ars-brand-system` | Skill (projeto) | ✗ (a criar — Etapa G do brand-architect) |
| `ars-organic-content-playbook` | Skill (projeto) | ✗ (a criar — após aprovação editorial) |

---

## Regras Gerais da Arquitetura

1. **Todo agente carrega `ars-product-truth` antes de qualquer produção.**
2. **Nenhum agente inventa** funcionalidades, clientes, métricas, resultados ou integrações.
3. **Nenhum agente apresenta** recursos futuros como disponíveis hoje.
4. **Nenhum agente tem permissão** de push, deploy ou alteração de ambiente de produção.
5. **Aprovações visuais são gates obrigatórios** — o `ars-brand-architect` não avança etapas sem aprovação.
6. **O `ars-social-content-producer`** informa explicitamente quando `ars-brand-system` não existe.
7. **O `ars-organic-growth-strategist`** não consolida regras permanentes de conteúdo sem `ars-brand-system`.
8. **Memória em nível de projeto** é usada por todos os agentes para acumular decisões, aprendizados e aprovações específicas da ARS.
