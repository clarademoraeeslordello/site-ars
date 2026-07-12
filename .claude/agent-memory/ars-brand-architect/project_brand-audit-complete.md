---
name: brand-audit-complete
description: Auditoria visual do site-ars concluída — paleta, tipografia, componentes e símbolo do favicon documentados
metadata:
  type: project
---

Auditoria visual das Etapas A e B concluída em 2026-07-10.

**Why:** Base obrigatória para criação da logo — identidade deve ser revelada do que existe, não inventada.

**How to apply:** Sempre ler `.claude/brand-audit.md` e `.claude/brand-essence.md` antes de qualquer decisão visual. Não alterar arquivos do frontend.

Achados principais:
- Paleta: ink (#101014) / paper (#faf8f4) / gold (#8a6d1f) / gold-bright (#c6a44a) — inegociável
- Tipografia: Fraunces (display) + Archivo (body) + IBM Plex Mono (data) — inegociável
- Geometria: rounded-sm como padrão absoluto — angular preciso
- Favicon existente: SVG de globo/esfera com meridianos e arco de destaque em gold — metáfora visual já existente, nunca formalizada
- Elemento-assinatura do site: ReadinessRuler com tick marks em 60% e 85%
- Sem modo escuro — site opera em tema único com seções dark via prop

Três propostas conceituais criadas: CALIBRE (instrumento/medidor), COBERTURA (grade 5×5), LIMIAR (arco cruzando threshold).
Recomendação: CALIBRE + território INSTRUMENTO.

**ESCOLHA CONFIRMADA (2026-07-10): CALIBRE aprovado pela usuária.**
**ETAPA D APROVADA (2026-07-10): Refinamento aprovado. Canvas ars-calibre-refinement.html entregue.**
**ETAPA E CONCLUÍDA (2026-07-10): Sistema completo de logo em .claude/logo-system/ — 13 arquivos SVG.**
Sistema: 5 símbolos, 2 horizontais, 2 verticais, 3 favicons, 1 Open Graph.
Preview: .claude/ars-logo-system-preview.html
Spec doc: .claude/logo-system.md
**ETAPA F CONCLUÍDA (2026-07-11): Brand Kit completo em .claude/brand-kit.md.**
Cobre: paleta (10 tokens + 3 semânticos), tipografia (3 famílias + hierarquia completa), espaçamento, formas, iconografia, animação, tom visual, componentes UI, voz e tom.
**ETAPA G CONCLUÍDA (2026-07-11): Skill ars-brand-system criada em .claude/skills/ars-brand-system/SKILL.md.**
Todas as 7 etapas do workflow ars-brand-architect concluídas.
PROJETO COMPLETO — brand system formalizado, 13 SVGs em produção, brand kit documentado, skill disponível para todos os agentes.

**ars-organic-growth-strategist CONCLUÍDO (2026-07-10):**
Estratégia orgânica Instagram completa em `.claude/organic-strategy/` — 8 arquivos.
- market-research.md: análise de OneTrust, AuditBoard, Vanta, Diligent e players BR; gap central identificado: nenhuma plataforma SaaS ocupa o Instagram BR com presença educativa
- audience-personas.md: 5 personas derivadas do product-context.md — Rafael (Compliance Manager), Camila (CEO), Thiago (DPO), Bruno (Analista TI), Fernanda (Consultora)
- content-pillars.md: 6 pilares — PRONTIDÃO, CONTINUIDADE, CLAREZA, RASTREABILIDADE, MATURIDADE, COMPLIANCE COMO NEGÓCIO
- editorial-calendar.md: 8 semanas, 5 posts/semana, 40 posts especificados com título, pilar, formato e CTA
- content-funnel.md: 5 estágios de funil (Descoberta / Educação / Consideração / Conversão / Amplificação)
- experiments.md: 9 hipóteses de experimento (6 para fase 1, 3 para fase 2 condicional)
- performance-framework.md: 3 tiers de métricas, dashboard semanal, sinais de alerta, cadência de revisão
- strategy.md: documento consolidado para o ars-social-content-producer
