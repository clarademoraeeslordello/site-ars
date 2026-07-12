---
name: ars-product-truth
description: >
  Camada de governança de verdade de produto da ARS — Audit Readiness Score.
  Carregue esta skill sempre que um agente precisar falar, escrever ou decidir
  sobre o que a plataforma é, o que ela faz, quais funcionalidades existem,
  quais são visão futura, quais claims são permitidos e qual terminologia é
  oficial. Obrigatória para todos os agentes ARS antes de qualquer produção.
metadata:
  priority: 10
  sessionStart: false
  pathPatterns:
    - "**"
  promptSignals:
    phrases:
      - "ARS"
      - "Audit Readiness"
      - "compliance platform"
      - "ars-brand-architect"
      - "ars-organic-growth-strategist"
      - "ars-social-content-producer"
      - "produto ARS"
      - "funcionalidades ARS"
    minScore: 1
---

# ars-product-truth — Camada de Governança de Produto

Esta skill é a fonte primária de verdade sobre a ARS para todos os agentes do projeto.
Ela não substitui a leitura do documento completo. Ela impõe regras de uso e fornece
orientação rápida sobre o que pode e o que não pode ser dito ou criado.

**Documento de referência oficial:** `docs/product-context.md`
Leia o documento completo quando precisar de detalhes, números, fórmulas, personas,
faixas de score, definições de maturidade ou qualquer informação que não esteja
sintetizada aqui.

---

## 1. O que é a ARS

A ARS é uma **Compliance Intelligence Platform** — plataforma SaaS B2B que transforma
o processo de obtenção, manutenção e renovação de certificações normativas em uma
jornada guiada, contínua e orientada a resultados mensuráveis.

A ARS **não é**:
- software de checklist
- ferramenta de auditoria tradicional
- repositório de documentos com fluxo de aprovação
- consultoria digital

A ARS **é**: uma Central de Comando de Compliance — o único lugar onde uma organização
sabe, em tempo real, se está pronta para ser auditada e o que precisa fazer caso não esteja.

---

## 2. Missão, Visão e Posicionamento

**Missão:** Tornar o compliance acessível, contínuo e previsível para qualquer
organização — independente de tamanho, maturidade ou orçamento.

**Categoria:** Compliance Intelligence Platform (categoria emergente, ainda sem nome
consolidado no mercado).

**Posicionamento:** Mais inteligente e guiada que GRC tradicionais. Mais robusta que
gestores de tarefas. Mais acessível que suítes enterprise (OneTrust, AuditBoard).

**North Star Metric:** Número de organizações que atingiram e mantiveram Audit
Readiness Score ≥ 85% por 90 dias consecutivos.

---

## 3. As 5 Perguntas Centrais da Plataforma

Todo conteúdo, feature, copy ou argumento de venda deve responder ao menos uma:

1. **Onde estamos?** — score atual, maturidade, cobertura por norma
2. **O que falta?** — controles sem evidência, atividades pendentes, lacunas
3. **Quem precisa agir?** — ownership, áreas atrasadas, responsáveis com SLA vencido
4. **Quando algo vence?** — expiração de evidências, renovação de políticas
5. **Estamos prontos para auditoria?** — Audit Readiness Score como resposta definitiva

---

## 4. Públicos e Personas

- CEOs e Fundadores — precisam de visibilidade executiva e ROI de compliance
- Diretores e VPs — precisam reportar status e cobrar áreas sem parecer arbitrários
- Compliance Officers e GRC Managers — precisam de operação central, rastreável, escalável
- DPOs e responsáveis por LGPD — precisam de ROPA, RIPD, incidentes e direitos dos titulares
- Times de TI e Segurança — precisam de fila personalizada e alertas antecipados
- Recursos Humanos — precisam de renovação automática de documentos críticos
- Consultorias de Compliance — precisam de multi-tenant, escala e relatórios automatizados

---

## 5. Pilares Oficiais do Produto

1. **Readiness** — prontidão para auditoria, score em tempo real
2. **Coverage** — cobertura de requisitos normativos por evidências aprovadas
3. **Governance** — estrutura de responsabilidades, aprovações, prazos, NCs
4. **Traceability** — registros imutáveis, cadeia de custódia, trilha de auditoria
5. **Collaboration** — distribuição de responsabilidades dentro da plataforma
6. **Continuous Compliance** — operação viva, Decay Effect, renovação automática

---

## 6. Diferenciais Estratégicos Oficiais

- **Guided Compliance** — jornada guiada com diagnóstico e geração automática de atividades
- **Continuous Compliance** — Decay Effect, RenewalGrace, score vivo
- **Audit Readiness Engine** — cálculo determinístico com pesos por criticidade
- **Cross-Mapping de Controles** — uma evidência satisfaz múltiplas normas (parcialmente implementado)
- **AI Compliance Copilot** — gap analysis por IA (parcialmente implementado)
- **CMM-ARS** — modelo de maturidade em 5 níveis (implementado)
- **Compliance Graph** — visualização de dependências em rede (VISÃO FUTURA)

---

## 7. Audit Readiness Score — Definição Oficial

- Expresso em percentual (0–100%)
- Cálculo determinístico baseado em cobertura ponderada por criticidade
- Pesos: Critical = 4, High = 3, Medium = 2, Low = 1
- Faixas: 0–59% = Não Auditável | 60–84% = Risco Moderado | 85–100% = Audit Ready
- **Não é estimativa.** Não é percepção. É um número calculado.

---

## 8. Terminologia Oficial

Use sempre estes termos. Nunca invente variações.

| Termo correto | Nunca usar |
|---|---|
| Audit Readiness Score | pontuação de auditoria, nota de conformidade |
| Compliance Intelligence Platform | software de GRC genérico |
| Guided Compliance | compliance guiado (minúsculo), compliance assistido |
| Continuous Compliance | compliance contínuo (minúsculo), compliance permanente |
| Coverage | cobertura normativa, percentual de cobertura |
| Decay Effect | decaimento de score, queda automática |
| CMM-ARS | modelo de maturidade ARS |
| Audit Trail | trilha de auditoria (aceitável em pt-BR) |
| NC Major | não-conformidade maior |
| CAPA | plano de ação corretiva |
| SOA | Statement of Applicability |
| Framework | norma, certificação (em contexto técnico) |
| Central de Comando de Compliance | não use outras metáforas sem aprovação |

---

## 9. Estado de Implementação — Regra Absoluta

Todo agente DEVE distinguir explicitamente entre estas quatro categorias:

### IMPLEMENTADO E EM PRODUÇÃO (pode afirmar com segurança)
- Catálogo de 30+ frameworks + LGPD com busca, filtros, paginação
- Controles com SOA, Atividades (CRUD), Evidências (upload, aprovação, versionamento, renovação)
- Audit Readiness Score Engine (pesos por criticidade, NC Major com ImpactScope)
- Coverage Engine com snapshots e histórico
- Auditorias, Achados, NC/CAPA; acesso temporário de auditor externo (≤72h)
- Jornada guiada de auditoria (AuditPlan + diagnóstico + geração automática de atividades)
- Módulo LGPD completo: ROPA, RIPD, incidentes, direitos dos titulares
- Modelo comercial de entitlements (Plan/Subscription/OrganizationFramework)
- AI Copilot — gap analysis (sujeito a entitlement)
- Relatórios exportáveis (Audit Readiness, SOA, evidências, maturidade)
- Notificações por e-mail e in-app
- Audit Trail append-only com hash encadeado

### PARCIALMENTE IMPLEMENTADO (mencionar com ressalva explícita)
- Cross-Mapping: modelo de dados existe (ControlRequirement), injeção automática multinorma incompleta
- AI Copilot: apenas gap analysis entregue; outros módulos de IA são visão futura

### VISÃO FUTURA — NÃO IMPLEMENTADO (jamais apresentar como disponível)
- Cross-Mapping automático de controles em produção plena
- Compliance Graph
- Time-Travel Slider
- Risk Register / Risk Exposure
- AI Evidence Assistant
- AI Policy Generator
- AI Readiness Advisor
- Previsão de Audit Ready Date
- Busca semântica / embeddings
- Comentários e colaboração in-app (menções, discussões contextuais)
- Ranking de aderência por departamento
- Políticas e Treinamentos como aggregates próprios
- Dashboard executivo da jornada
- Painel administrativo completo

### INFORMAÇÃO NÃO VALIDADA (requer verificação antes de publicar)
- Número de clientes ativos
- Resultados específicos de clientes
- Métricas de crescimento
- Integrações com sistemas externos
- Qualquer certificação da própria empresa
- Qualquer dado de mercado não citado em fonte verificável

---

## 10. Claims Permitidos vs. Proibidos

### PERMITIDOS (suportados pelo produto implementado)
- "A ARS calcula em tempo real se sua organização está pronta para ser auditada"
- "Catálogo de mais de 30 frameworks normativos incluindo ISO 27001, ISO 9001, LGPD"
- "Jornada guiada de auditoria com diagnóstico automático e geração de atividades"
- "Score de Audit Readiness com cálculo determinístico e pesos por criticidade"
- "Trilha de auditoria imutável com hash encadeado"
- "Módulo LGPD com ROPA, RIPD, gestão de incidentes e direitos dos titulares"
- "Acesso temporário de auditor externo com escopo e prazo controlados (≤72h)"
- "Motor de decaimento automático: o score cai quando evidências vencem"
- "Evidências com versionamento, aprovação e renovação automática"
- "AI Copilot para gap analysis [sujeito a entitlement do plano]"

### PROIBIDOS (não suportados ou ainda visão)
- Qualquer afirmação sobre Compliance Graph como funcionalidade disponível
- Previsão de Audit Ready Date como feature disponível
- Integrações automáticas com AWS, GitHub ou outros sistemas técnicos (Vanta-style)
- Número de clientes ou organizações certificadas com a ARS (não validado)
- Percentuais de redução de tempo, custo ou esforço sem fonte
- Comparações numéricas com concorrentes sem fonte verificável
- "Aprovação garantida em auditoria"
- "Compliance em X dias/semanas" sem qualificação
- AI Evidence Assistant, AI Policy Generator ou AI Readiness Advisor como disponíveis

---

## 11. Tom Comercial Oficial

A ARS fala com **profissionalismo sem pedantismo**. Linguagem de negócios, não normativa.

- Direta: o usuário sabe o que fazer a seguir
- Confiante: sem hedges desnecessários onde os dados sustentam a afirmação
- Humana: sem jargão onde uma palavra simples resolve
- Precisa: nunca promete o que não entrega
- Respeitosa com a complexidade do compliance: não trivializa o problema

**Não usar:** "revolucionário", "disruptivo", "game-changer", "solução completa para todos os desafios", "único no mundo", "100% automático", "sem esforço".

**Usar:** "calculado", "rastreável", "guiado", "contínuo", "previsível", "mensurável", "auditável", "determinístico".

---

## 12. Instrução Final para Agentes

Antes de produzir qualquer conteúdo, resposta, estratégia ou material:

1. **Consulte este documento** para verificar se o tema está coberto aqui.
2. **Leia `docs/product-context.md`** se precisar de detalhes que não estão aqui.
3. **Classifique explicitamente** cada afirmação: implementado / parcial / visão / não validado.
4. **Nunca invente** funcionalidades, clientes, métricas, resultados, certificações ou integrações.
5. **Nunca apresente** recursos futuros como disponíveis hoje.
6. **Se não souber**, diga que a informação precisa ser validada. Nunca preencha lacunas com suposições.
