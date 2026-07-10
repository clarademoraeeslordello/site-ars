# Product Context — Audit Readiness Score (ARS)
### Compliance Intelligence Platform
**Versão:** 2.0 — Consolidação Estratégica  
**Classificação:** Documento oficial de produto. Referência para Produto, UX, Engenharia, IA, Growth, Investidores e Consultores de Compliance.

---

> ⚠️ **Estado de implementação (jul/2026 — conferido contra `origin/main`).** Este documento descreve a **visão** do produto; nem tudo abaixo existe no código hoje. Para evitar confusão entre visão e realidade:
>
> **Já implementado e em produção (mergeado em `main`):**
> - Catálogo de 30 frameworks + LGPD, com requisitos bilíngues, busca/filtros/paginação e taxonomia de categoria
> - Controles com SOA, Atividades (CRUD + telas de Inbox `/activities` e Kanban `/activities/kanban`), Evidências (upload R2, aprovação/rejeição, versionamento, renovação com RenewalGrace/Decay)
> - Audit Readiness Score Engine (pesos por criticidade, penalidade de NC Major com ImpactScope) + Coverage Engine com snapshots e histórico
> - Auditorias, Achados, NC/CAPA; acesso temporário de auditor externo (grants ≤72h escopados)
> - **Jornada guiada de auditoria** (`AuditPlan` + diagnóstico guiado + geração automática de atividades a partir de lacunas) — primeira materialização real do "Guided Compliance"
> - Módulo LGPD completo: ROPA, RIPD, incidentes de privacidade, direitos dos titulares (backend + telas)
> - **Modelo comercial de entitlements** (`Plan`/`Subscription`/`OrganizationFramework`): limite de frameworks e recursos por plano (AI Copilot, relatórios avançados, acesso de auditor, múltiplos planos de auditoria)
> - AI Copilot — gap analysis (`POST /api/v1/ai-copilot/gap-analysis`, sujeito a entitlement); toda interação registrada como `AIInteraction`
> - Relatórios exportáveis (Audit Readiness, SOA, evidências consolidadas, maturidade); notificações por e-mail e in-app; Audit Trail append-only com hash encadeado
>
> **Ainda visão / não implementado** (citado nas seções abaixo, sem código correspondente hoje): Cross-Mapping automático de controles em produção plena, Compliance Graph, Time-Travel Slider, Risk Register / Risk Exposure, AI Evidence Assistant, AI Policy Generator, AI Readiness Advisor, previsão de Audit Ready Date, busca semântica/embeddings, comentários e colaboração in-app (menções, discussões contextuais), ranking de aderência por departamento (não há entidade Departamento), Políticas e Treinamentos como aggregates próprios, Ciclos de compliance, onboarding com diagnóstico inicial de organização (issue #153), dashboard executivo da jornada (issue #155), painel administrativo (épico #252).
>
> Detalhe do que existe: `docs/domain-model.md`, `docs/api.md`, `docs/screens.md`, `docs/roadmap.md`.

---

## 1. Product Vision

### O que é a ARS

A ARS — Compliance Intelligence Platform — é uma plataforma SaaS B2B que transforma o processo de obtenção, manutenção e renovação de certificações normativas em uma jornada guiada, contínua e orientada a resultados mensuráveis.

A ARS não é um software de checklist. Não é uma ferramenta de auditoria tradicional. Não é um repositório de documentos com fluxo de aprovação. A ARS é uma Central de Comando de Compliance: o único lugar onde uma organização sabe, em tempo real, se está pronta para ser auditada — e o que precisa fazer caso não esteja.

### Por que ela existe

A grande maioria das organizações que buscam certificações como ISO 27001, ISO 9001, ISO 20000-1, ISO 22301, ISO 27701 e LGPD — entre as mais de 30 normas do catálogo da plataforma — enfrenta o mesmo problema estrutural: o processo é opaco, fragmentado e dependente de conhecimento especializado que a maioria das empresas não possui internamente. O resultado é previsível — meses de esforço desorganizado, planilhas que ninguém consegue interpretar, consultorias caras e, frequentemente, reprovações em auditoria que poderiam ter sido evitadas.

A ARS existe para acabar com essa opacidade. Para tornar a conformidade compreensível, guiada e previsível — da mesma forma que ferramentas como o Duolingo tornaram o aprendizado de idiomas acessível a qualquer pessoa, independente de experiência prévia.

### Qual transformação gera

A ARS transforma o compliance de um projeto pontual de alto estresse em uma capacidade organizacional contínua. Empresas que usam a ARS deixam de preparar uma organização para uma auditoria específica e passam a operar em estado permanente de prontidão. O processo de certificação, que antes era um evento traumático e dependente de consultores externos, torna-se uma jornada estruturada que a própria equipe consegue conduzir.

### Qual problema resolve

O problema central é a **ausência de visibilidade operacional sobre o estado real do compliance**. Sem a ARS, nenhum gestor, diretor ou CEO consegue responder com precisão às cinco perguntas que determinam o resultado de uma auditoria:

> *Onde estamos? O que falta? Quem precisa agir? Quando algo vence? Estamos prontos para auditoria?*

A ARS resolve isso entregando essas respostas em tempo real, para todos os níveis da organização, de forma contextualizada ao perfil e à maturidade de cada empresa.

---

## 2. Product Mission

> **Tornar o compliance acessível, contínuo e previsível para qualquer organização — independente de tamanho, maturidade ou orçamento.**

A ARS tem a missão de democratizar o acesso à conformidade normativa. Assim como a automação transformou a contabilidade e o RH, a ARS transforma o GRC de uma disciplina reservada a especialistas em uma capacidade operacional que qualquer equipe consegue desenvolver e manter.

A missão se traduz em três compromissos concretos:

**1. Clareza.** Qualquer colaborador, independente de formação técnica ou jurídica, deve entender o que precisa fazer e por quê. A plataforma jamais usa jargão onde uma linguagem simples resolve.

**2. Continuidade.** Compliance não é um projeto com início, meio e fim. É uma operação viva. A ARS é projetada para funcionar como infraestrutura permanente de governança, não como ferramenta de sprint pré-auditoria.

**3. Previsibilidade.** A organização deve saber, com antecedência calculada, quando estará pronta para uma auditoria. A ARS entrega uma data — não uma estimativa vaga.

---

## 3. Product Positioning

### Categoria do produto

A ARS ocupa uma categoria emergente que ainda não tem nome consolidado no mercado: **Compliance Intelligence Platform**. É mais inteligente e guiada que as ferramentas de GRC tradicionais, mais robusta e auditável que as ferramentas de gestão de tarefas e mais acessível que as suítes enterprise como OneTrust e AuditBoard.

### Mercado-alvo

O mercado endereçável primário da ARS é composto por empresas de médio porte nos setores de tecnologia, serviços, saúde e finanças que precisam de certificações ISO ou conformidade com a LGPD e não possuem equipe interna especializada para conduzir o processo sozinhas. O mercado secundário inclui consultorias de compliance que buscam uma plataforma para entregar seus serviços com mais escala e rastreabilidade.

> **Cobertura de catálogo por setor (estado atual, jul/2026).** Tecnologia e serviços são plenamente atendidos hoje (ISO 27001, 27701, 20000-1, 9001, 22301, LGPD). **Saúde** é atendida em nível de cláusula por ISO 13485 (dispositivos médicos) e ISO 45001 (saúde e segurança ocupacional); normas de saúde regulatória setorial (ex: HIPAA, RDC/ANVISA) são **roadmap de conteúdo**. **Finanças** é atendida hoje apenas por normas transversais (segurança, privacidade e continuidade — 27001/27701/22301); normas financeiras setoriais (PCI-DSS, DORA, BACEN/CMN) ainda **não estão modeladas** e são roadmap. O motor é agnóstico de norma — a expansão é trabalho de conteúdo normativo, não de engenharia.

### Posicionamento competitivo

A ARS se diferencia dos concorrentes por ser a única plataforma que combina três atributos simultaneamente: **acessibilidade para iniciantes**, **robustez para organizações maduras** e **inteligência artificial nativa** para acelerar cada etapa do processo.

#### Análise conceitual dos concorrentes

**OneTrust**
Plataforma enterprise de GRC e privacidade. Extremamente completa, porém projetada para grandes corporações com times dedicados de compliance. Curva de implementação longa, custo elevado e interface densa tornam a ferramenta inacessível para PMEs. A ARS serve o mercado que o OneTrust ignora: empresas que ainda não têm maturidade para absorver sua complexidade.

**AuditBoard**
Focado em auditoria interna e SOX compliance para grandes empresas. Interface robusta para auditores experientes, mas sem o conceito de jornada guiada ou onboarding para iniciantes. Assume que o usuário já sabe o que fazer. A ARS não faz essa suposição.

**Vanta**
Focado primariamente em SOC 2 e ISO 27001 para startups de tecnologia. Forte em automação de evidências via integrações técnicas (AWS, GitHub, etc.), mas com escopo restrito de normas e pouco suporte a processos manuais ou organizações não-tech. A ARS abrange um espectro mais amplo de normas e perfis de empresa.

**Diligent**
Suite de governança corporativa focada em boards e liderança executiva. Excelente para grandes empresas com comitês de auditoria formalizados. Distante do operacional de compliance. A ARS conecta a visão estratégica da liderança ao trabalho operacional de compliance de forma integrada, o que o Diligent não faz.

### Diferenciação central

A ARS vence não por ter mais funcionalidades, mas por ser a única plataforma que **guia ativamente** o usuário durante todo o processo. Enquanto os concorrentes entregam ferramentas, a ARS entrega uma jornada.

---

## 4. Product Philosophy

A filosofia da ARS é construída sobre seis princípios fundamentais que orientam cada decisão de produto, cada tela, cada notificação e cada interação com o usuário.

### Compliance deve ser compreensível

Nenhum usuário deve precisar de um consultor externo para entender o que a plataforma está pedindo. Termos técnicos como "Statement of Applicability", "CAPA" e "controles do Anexo A" existem na arquitetura de dados — não na interface. O usuário vê linguagem de negócios, não linguagem normativa.

### Compliance deve ser guiado

A plataforma nunca abandona o usuário diante de uma tela em branco. Em cada momento da jornada, o sistema oferece o próximo passo mais inteligente — baseado no perfil da empresa, no estado atual do compliance e nas prioridades de alto impacto. A ARS funciona como um consultor silencioso que sempre sabe o que fazer a seguir.

### Compliance deve ser contínuo

Conformidade não é um estado binário (certificado / não certificado). É um espectro dinâmico que sobe quando evidências são adicionadas e cai quando documentos vencem ou controles ficam descobertos. A ARS é projetada para ser usada todos os dias, não apenas nos meses que antecedem uma auditoria. O score de prontidão reflete a realidade em tempo real — incluindo o decaimento causado pela inatividade.

### Compliance deve ser colaborativo

Compliance é um esporte coletivo. A maior parte das evidências vem de áreas que não são compliance — TI, RH, jurídico, operações. A ARS centraliza a comunicação, distribui responsabilidades com clareza (quem faz, quem aprova, quem é notificado) e elimina o ciclo improdutivo de e-mails e planilhas compartilhadas.

### Compliance deve ser rastreável

Cada ação na plataforma gera um registro imutável. Quem aprovou, quando aprovou, qual versão do documento foi usada, qual justificativa foi fornecida. Essa trilha de auditoria não é um log técnico — é a evidência de que o processo foi conduzido corretamente, e será o que o auditor externo vai querer ver.

### Compliance deve gerar previsibilidade

O maior valor da ARS não é o score atual — é a previsão do score futuro. Com base no ritmo da equipe, nos prazos de expiração e nas lacunas identificadas, a plataforma projeta matematicamente quando a organização atingirá o estado de Audit Ready. Compliance deixa de ser uma caixa preta e passa a ser um projeto com data de entrega calculada.

---

## 5. As 5 Perguntas Centrais da Plataforma

Toda tela, todo componente e toda funcionalidade da ARS deve ser capaz de contribuir para responder pelo menos uma destas cinco perguntas. Se uma funcionalidade não responde a nenhuma delas, sua existência no produto precisa ser justificada.

### 1. Onde estamos?

Qual é o estado atual do compliance da organização? Qual o score de Audit Readiness? Qual o nível de maturidade? Quais normas estão ativas e qual é a cobertura de cada uma? Esta pergunta é respondida pelo dashboard principal, pelo Compliance Score e pelo Maturity Model. É a pergunta do CEO e do CISO às segundas-feiras de manhã.

### 2. O que falta?

Quais controles estão sem evidência? Quais políticas venceram? Quais atividades estão pendentes? Quais lacunas estão bloqueando o avanço do score? Esta pergunta é respondida pelo Gap Finder, pelo AI Gap Analysis e pela lista de atividades priorizadas. É a pergunta do compliance manager que precisa montar o plano da semana.

### 3. Quem precisa agir?

Qual área da organização está atrasada? Qual responsável tem atividades vencidas? Qual gestor precisa aprovar evidências? Esta pergunta é respondida pelo Ownership Dashboard, pelo ranking de aderência por departamento e pelos alertas de SLA vencido. É a pergunta do gestor que precisa cobrar sem parecer arbitrário.

### 4. Quando algo vence?

Quais evidências estão na janela de expiração? Quando é a próxima auditoria? Quando vence a política de segurança? Esta pergunta é respondida pelo Monitor de Prazos, pelo Roadmap Temporal Executivo e pelos alertas automáticos de recertificação. É a pergunta que ninguém faz — até que algo vence e o score cai.

### 5. Estamos prontos para auditoria?

Esta é a pergunta definitiva do produto. A resposta não é um "sim" ou "não" subjetivo — é um número: o Audit Readiness Score. É a pergunta que o CEO faz antes de confirmar a data com a certificadora. A plataforma não apenas responde — ela mostra o que precisa acontecer para que a resposta seja "sim".

---

## 6. Problemas que a ARS Resolve

### CEOs e Fundadores
Não sabem se a empresa está pronta para auditoria. Recebem relatórios de compliance inconsistentes e desatualizados. Dependem de consultores externos para ter uma visão do estado real. Não têm como justificar o investimento em compliance para o board sem dados concretos.

**A ARS resolve:** dashboard executivo com score em tempo real, previsão de Audit Ready Date e visão consolidada de riscos para a liderança.

### Diretores e VPs
Precisam reportar o status de compliance para o CEO mas não têm visibilidade do que suas equipes estão fazendo. Não sabem quais áreas estão atrasando o processo. Ficam sabendo de problemas apenas quando é tarde demais.

**A ARS resolve:** ranking de aderência por departamento, alertas de SLA vencido e notificações automáticas quando algo crítico regride.

### Compliance Officers e GRC Managers
Gerenciam o processo em planilhas Excel e e-mails. Dependem de cada gestor de área para coletar evidências. Não conseguem mostrar progresso de forma objetiva. Vivem em modo reativo — apagando incêndios em vez de construindo maturidade.

**A ARS resolve:** plataforma central que distribui responsabilidades, automatiza cobranças, calcula cobertura por área e gera relatórios exportáveis para auditores externos.

### DPOs e responsáveis por LGPD
Precisam manter o mapeamento de tratamento de dados atualizado, gerenciar solicitações de titulares e documentar bases legais — tudo em ferramentas desconectadas. Vivem com o risco de uma auditoria da ANPD sem saber exatamente qual é o estado de conformidade da empresa.

**A ARS resolve:** módulo LGPD integrado ao modelo de cobertura geral, com ROPA, RIPD, gestão de incidentes e direitos dos titulares rastreáveis e auditáveis.

### Times de TI e Segurança
São os principais produtores de evidências de segurança da informação, mas não têm visibilidade de quais controles precisam de evidência e quais documentos estão vencendo. Recebem solicitações urgentes de compliance às vésperas de auditorias.

**A ARS resolve:** fila personalizada de atividades por responsável, alertas antecipados de expiração e vinculação automática de evidências a controles via IA.

### Recursos Humanos
Responsáveis por evidências críticas como treinamentos de conscientização, contratos de confidencialidade e políticas de acesso — mas raramente têm clareza de quando esses documentos vencem ou precisam ser renovados.

**A ARS resolve:** motor de renovação contínua que reabre automaticamente atividades para o responsável quando um documento entra na janela de expiração.

### Consultorias de Compliance
Gerenciam múltiplos clientes com processos diferentes, cada um em uma planilha diferente. Dificuldade de escalar o serviço sem aumentar proporcionalmente a equipe. Entregam relatórios manuais que ficam desatualizados no mesmo dia.

**A ARS resolve:** plataforma multi-tenant que permite à consultoria gerenciar todos os clientes em um único ambiente, com visibilidade centralizada e relatórios automatizados.

---

## 7. Diferenciais Estratégicos

> Nota de estado: dos diferenciais abaixo, **Guided Compliance** (jornada guiada de auditoria com diagnóstico e geração de atividades), **Continuous Compliance** (Decay Effect, RenewalGrace) e o **Audit Readiness Engine** já estão implementados. **Cross-Mapping** existe no modelo de dados (`ControlRequirement`) mas a injeção automática de progresso multinorma ainda não está completa. **AI Compliance Copilot** está parcialmente entregue (apenas gap analysis). **CMM-ARS** está implementado no cálculo de maturidade. **Compliance Graph** é visão futura — não implementado.

### Guided Compliance
A ARS não entrega uma ferramenta — entrega uma jornada. Desde o onboarding com diagnóstico inicial até a preparação para auditoria externa, cada etapa do processo é guiada por orientações claras, próximos passos priorizados e linguagem acessível. O usuário nunca fica sem saber o que fazer a seguir.

### Cross-Mapping de Controles
Uma evidência pode satisfazer requisitos de múltiplas normas simultaneamente. A ARS identifica e mapeia essas sobreposições automaticamente. Ao anexar uma Política de Gestão de Identidade, o sistema injeta o progresso em ISO 27001, ISO 27701 e LGPD ao mesmo tempo — sem que o usuário precise fazer isso manualmente. Isso reduz drasticamente o volume de trabalho em empresas que precisam de múltiplas certificações.

### Continuous Compliance
O compliance na ARS não é um projeto — é uma operação. O Score de Audit Readiness é um indicador vivo que sobe com a adição de evidências aprovadas e cai quando documentos vencem ou controles ficam descobertos. O "Decay Effect" garante que a plataforma reflita a realidade em tempo real, não o estado histórico mais favorável.

### AI Compliance Copilot
A inteligência artificial na ARS não é um chatbot genérico — é uma camada de aceleração integrada ao fluxo de trabalho. O AI Evidence Assistant identifica automaticamente a quais controles um documento se aplica. O AI Gap Analysis calcula o impacto de cada ação pendente no score geral. O AI Readiness Advisor explica em linguagem de negócios por que o score mudou e o que fazer. O AI Policy Generator redige políticas em tempo real. Em cada caso, a IA remove o trabalho braçal e deixa o usuário focado nas decisões que requerem julgamento humano.

### Audit Readiness Engine
O coração da plataforma é um motor de cálculo que transforma dados operacionais em um número único e interpretável: o Audit Readiness Score. Esse número incorpora cobertura de controles, status de evidências, pesos por criticidade, proximidade de expiração e histórico de não-conformidades. Não é uma estimativa — é um cálculo determinístico que qualquer membro da equipe pode entender e qualquer auditor pode verificar.

### Compliance Maturity Model (CMM-ARS)
Diferente de ferramentas que tratam compliance como binário (conforme ou não conforme), a ARS adota um modelo de maturidade em cinco níveis que reflete a jornada real das organizações. Empresas não saem do zero para o Otimizado da noite para o dia — e a ARS celebra e orienta cada passo dessa progressão, tornando o progresso visível e motivador.

### Compliance Graph
Uma representação visual em rede dos relacionamentos entre controles, evidências, riscos e normas. O Compliance Graph revela dependências ocultas — mostra que remover uma evidência pode derrubar três controles de duas normas diferentes, ou que um único documento novo pode fechar lacunas em múltiplos frameworks simultaneamente. É o mapa que transforma compliance de uma lista em um ecossistema.

---

## 8. Pilares do Produto

### Readiness
O pilar central. Tudo na ARS contribui para a prontidão da organização para uma auditoria. O Audit Readiness Score é o indicador principal, calculado em tempo real e visível em todos os níveis da organização. Sem Readiness, os demais pilares perdem contexto.

### Coverage
A cobertura mede o quanto dos requisitos normativos está efetivamente demonstrado por evidências aprovadas. A cobertura não é binária — é multidimensional: por norma, por área, por controle, por domínio e globalmente. Um alto nível de cobertura é condição necessária (mas não suficiente) para o Audit Readiness.

### Governance
A governança é a estrutura que garante que o compliance seja conduzido de forma organizada, responsável e rastreável. Inclui a definição de responsabilidades (quem faz, quem aprova, quem é notificado), os fluxos de revisão e aprovação de evidências, o controle de prazos e a gestão de não-conformidades.

### Traceability
Cada ação na plataforma gera um registro imutável. Toda evidência tem uma cadeia de custódia: quem submeteu, quando, qual versão, quem aprovou, com qual justificativa. Toda não-conformidade tem um histórico completo do ciclo de vida. Essa rastreabilidade é o que diferencia um compliance operacional de um compliance defensável perante um auditor externo.

### Collaboration
Compliance é produzido por muitas pessoas em muitas áreas. O pilar de colaboração garante que as discussões, aprovações e cobranças aconteçam dentro da plataforma — não em canais externos que não ficam registrados. Comentários contextuais, menções diretas, workflows de revisão e notificações automáticas mantêm todos os envolvidos alinhados sem reuniões desnecessárias.

### Continuous Compliance
O compliance não termina quando o certificado é emitido. Políticas vencem. Treinamentos precisam ser renovados. Auditorias de vigilância são anuais. O pilar de Continuous Compliance garante que a plataforma funcione como infraestrutura permanente de governança — com motores de renovação, alertas de expiração e um score que reflete o estado real da organização a qualquer momento.

---

## 9. Governança de Cobertura

### O que é cobertura

Cobertura é a medida de quanto dos requisitos normativos de uma certificação está efetivamente demonstrado por evidências aprovadas e controles implementados. Uma cobertura de 80% em ISO 27001 significa que 80% dos controles aplicáveis têm pelo menos uma evidência aprovada vinculada a eles.

Cobertura não é o mesmo que conformidade declarada. Um controle pode ser marcado como "em implementação" sem nenhuma evidência — isso não conta para a cobertura. Apenas evidências com status Aprovado, dentro da validade, vinculadas a controles declarados como Aplicáveis contribuem para o cálculo.

### Níveis de cobertura

**Cobertura Global**
Percentual agregado de todos os controles aplicáveis em todos os frameworks ativos da organização, ponderado pelo peso de criticidade de cada controle. É o número que aparece no dashboard executivo quando a pergunta é "como estamos no geral".

**Cobertura por Certificação (Framework)**
Percentual de cobertura específico de uma norma. Uma empresa pode ter 90% de cobertura em ISO 9001 e 45% em ISO 27001 simultaneamente. A visão por framework revela qual certificação está mais próxima do estado de Audit Ready e qual precisa de atenção prioritária.

**Cobertura por Área**
Cada norma é organizada em seções ou domínios (ex: ISO 27001 tem seções como Políticas de Segurança, Controle de Acesso, Gestão de Incidentes). A cobertura por área revela quais domínios estão bem atendidos e quais estão bloqueando o avanço do score geral. É o drill-down que o compliance manager usa para priorizar o trabalho da semana.

**Cobertura por Controle**
Nível mais granular. Cada controle individual tem um estado binário de cobertura: tem evidência aprovada ou não tem. A visão por controle é usada pelo executor para saber exatamente o que precisa ser entregue e pelo auditor interno para verificar ponto a ponto.

**Cobertura Documental**
Percentual de controles que possuem pelo menos uma evidência de qualquer tipo (arquivo, link ou formulário) em qualquer estado (incluindo pendente de aprovação). Diferente da cobertura padrão, a cobertura documental mostra o esforço que já foi feito — mesmo que ainda não tenha sido aprovado. Útil para comunicar progresso para a liderança antes que as aprovações sejam concluídas.

### Como a cobertura é impactada

A cobertura sobe quando evidências são aprovadas. Cai quando evidências vencem (Decay Effect), quando controles são declarados aplicáveis sem evidência associada, ou quando uma NC Major é aberta contra um controle (que tem sua cobertura zerada até a resolução). Controles declarados como Não Aplicáveis no SOA são excluídos do denominador — não penalizam nem beneficiam a cobertura.

---

## 10. Governança de Score

### Audit Readiness Score — definição

O Audit Readiness Score é o indicador central da plataforma. Expresso em percentual (0–100%), representa o grau de prontidão da organização para submeter-se a uma auditoria externa de certificação. Não é uma estimativa subjetiva — é um cálculo determinístico baseado em dados operacionais verificáveis.

### Fórmula de cálculo

O score é calculado como a razão ponderada entre controles cobertos e controles aplicáveis, onde o peso de cada controle é determinado pela sua criticidade:

```
Score = Σ(controles cobertos × peso) / Σ(controles aplicáveis × peso) × 100

Pesos por criticidade:
  Critical  = 4
  High      = 3
  Medium    = 2
  Low       = 1
```

Controles com `SoaApplicability = NotApplicable` são excluídos do denominador. Controles bloqueados por NC Major têm sua cobertura zerada independente das evidências existentes.

### Faixas de interpretação

| Faixa | Score | Significado operacional |
|-------|-------|-------------------------|
| **Não Auditável** | 0 – 59% | A organização apresenta lacunas críticas que resultariam em reprovação imediata. Controles fundamentais estão descobertos. A recomendação é não agendar auditoria externa até superar esta faixa. |
| **Risco Moderado** | 60 – 84% | A organização tem uma base sólida, mas existem lacunas relevantes que um auditor experiente identificará. É possível agendar auditoria, mas com risco calculado de não-conformidades. A recomendação é resolver as lacunas de alto impacto antes de confirmar a data. |
| **Audit Ready** | 85 – 100% | A organização está em condições de receber uma auditoria externa com expectativa razoável de aprovação. Isso não garante aprovação — o auditor pode identificar aspectos não capturados pela plataforma — mas indica que o processo interno foi conduzido com rigor. |

### Efeito de decaimento (Decay Effect)

O score não é estático. Evidências têm prazo de validade. Políticas precisam ser renovadas anualmente. Treinamentos de conscientização têm periodicidade obrigatória. Quando um documento vence e não é renovado, o controle associado perde cobertura automaticamente, e o score cai para refletir a realidade. Isso garante que um score de 90% em setembro não seja confundido com um score de 90% em março, se nada foi atualizado nesse período.

### Score histórico e tendência

A plataforma armazena snapshots periódicos do score, permitindo a visualização de tendência ao longo do tempo. Um score atual de 78% com tendência de alta consistente é mais favorável do que um score de 82% com tendência de queda — e a plataforma comunica essa diferença ativamente.

---

## 11. Governança de Maturidade — CMM-ARS

O Compliance Maturity Model da ARS (CMM-ARS) é uma escala de cinco níveis que descreve a evolução da capacidade organizacional de compliance ao longo do tempo. Diferente do score de prontidão (que mede o estado atual), o modelo de maturidade mede a solidez estrutural do processo — a capacidade de manter e melhorar o compliance de forma sustentável.

### Nível 1 — Inicial

**Score de referência:** 0 – 39%

A organização não possui processos formais de compliance. O conhecimento é individual e não documentado. As respostas a requisitos normativos são reativas e dependentes de pessoas-chave. Não há rastreabilidade nem responsabilidades formalmente definidas. O compliance existe, se existe, como uma iniciativa isolada sem suporte estrutural.

*Perfil típico:* empresa buscando sua primeira certificação, nunca passou por auditoria estruturada, usa planilhas como ferramenta principal.

### Nível 2 — Repetível

**Score de referência:** 40 – 59%

A organização começou a formalizar seus processos de compliance. Políticas básicas existem, mas com cobertura parcial. Alguns controles têm evidências associadas. O processo é repetível para partes do escopo, mas ainda há dependência excessiva de indivíduos e ausência de ciclos de revisão. A organização sabe o que precisa fazer — mas ainda não faz de forma consistente.

*Perfil típico:* empresa que iniciou o processo de certificação, tem um responsável pelo compliance mas sem equipe dedicada.

### Nível 3 — Gerenciado

**Score de referência:** 60 – 74%

Os processos de compliance estão documentados, comunicados e sendo executados pela organização. Responsabilidades estão definidas. A maioria dos controles críticos tem evidências aprovadas. Existem processos de revisão periódica. O compliance é gerenciado ativamente — não apenas reativamente. A organização está em condições de submeter-se a uma auditoria com risco moderado.

*Perfil típico:* empresa com 6–18 meses de processo estruturado, buscando sua primeira certificação ou na fase de vigilância pós-certificação.

### Nível 4 — Mensurado

**Score de referência:** 75 – 89%

O compliance é mensurado com precisão. A organização monitora KPIs de compliance regularmente, tem visibilidade de tendências e consegue identificar riscos antes que se tornem não-conformidades. Os processos são revisados com base em dados, não em percepções. A liderança recebe relatórios periódicos e toma decisões informadas sobre o compliance. A organização está em estado de Audit Readiness confortável.

*Perfil típico:* empresa certificada, em ciclo de manutenção, com compliance integrado à gestão operacional.

### Nível 5 — Otimizado

**Score de referência:** 90 – 100%

O compliance é uma capacidade organizacional estratégica. Os processos são continuamente melhorados com base em aprendizado sistemático. A organização usa dados de compliance para antecipar riscos, identificar oportunidades de melhoria e demonstrar valor para parceiros, clientes e investidores. O compliance não é um custo — é uma vantagem competitiva.

*Perfil típico:* empresa com múltiplas certificações ativas, compliance integrado à cultura organizacional, usando dados de conformidade para diferenciação de mercado.

---

## 12. Métricas Estratégicas do Produto

As métricas a seguir compõem o sistema de indicadores oficial da ARS. São os números que a plataforma calcula, monitora e entrega para diferentes audiências.

### Coverage Score
Percentual de controles aplicáveis com pelo menos uma evidência aprovada e vigente. Calculado por norma, por área e globalmente. É o indicador de esforço realizado — quanto do trabalho de compliance foi efetivamente concluído e aprovado.

### Audit Readiness Score
O indicador principal da plataforma. Calculado com pesos por criticidade, reflete a prontidão real da organização para auditoria. Incorpora o Decay Effect de evidências vencidas e o impacto de NCs abertas. (Ver seção 10 para detalhes completos.)

### Maturity Score
Nível atual no CMM-ARS (1–5), derivado do Audit Readiness Score e da consistência histórica do processo. Reflete não apenas onde a organização está, mas a solidez estrutural que a levou até ali.

### Expiration Risk
Índice de risco de expiração: percentual do score total em risco de decaimento nos próximos 30 e 60 dias, baseado nos documentos que entrarão na janela de renovação. Permite ação preventiva antes que o score caia.

### MTTR — Mean Time to Resolve
Tempo médio de resolução de não-conformidades, desde a abertura do achado até o fechamento verificado do CAPA. Indicador de eficiência operacional do time de compliance e de saúde do processo de melhoria contínua.

### SLA Compliance
Percentual de atividades e CAPAs concluídos dentro do prazo definido. Indicador de disciplina operacional e confiabilidade dos processos da organização. Uma alta taxa de SLA indica que a organização cumpre o que se compromete — o que é exatamente o que auditores externos querem ver.

### Risk Exposure — *visão futura*
Indicador agregado de exposição a riscos baseado no Risk Register: soma ponderada dos riscos inerentes não mitigados, considerando probabilidade e impacto. Decresce à medida que controles de mitigação são implementados e evidenciados. *(O Risk Register não está implementado — não existe aggregate `Risk` no código.)*

### Audit Success Rate
Taxa histórica de auditorias internas concluídas sem NCs Maiores. Indicador preditivo da probabilidade de aprovação em auditoria externa. Organizações com alta taxa de sucesso interno consistentemente têm melhores resultados em auditorias externas.

---

## 13. Modelo Mental do Usuário

A ARS adota o princípio de **Progressive Disclosure** — a plataforma revela complexidade de forma progressiva, à medida que o usuário e a organização ganham maturidade. Nenhum recurso avançado é imposto sobre um usuário iniciante, e nenhum recurso básico é ocultado de um usuário experiente.

### First Mile — A Empresa Iniciante

**Pergunta central:** "Por onde eu começo?"

O usuário chega à plataforma sem saber por onde começar. Nunca passou por uma auditoria, não conhece a estrutura de controles do ISO 27001 e não tem equipe dedicada. Para esse perfil, a plataforma é linear e diretiva: o Diagnóstico Inicial entrega um Plano de Voo com os 5 primeiros passos de alto impacto. A interface oculta o mapa de relacionamentos, a matriz de riscos interativa e os relatórios analíticos avançados — não porque o usuário não possa vê-los, mas porque eles não são relevantes ainda. O foco é gerar o primeiro movimento e mostrar que é possível progredir.

### Scale Up — A Empresa em Crescimento

**Pergunta central:** "Como manter tudo organizado à medida que cresce?"

A organização já completou o ciclo inicial. Tem controles definidos, algumas evidências aprovadas e uma primeira auditoria interna concluída. Agora o desafio é diferente: a equipe cresceu, existem múltiplas áreas produzindo evidências e a coordenação está se tornando complexa. A plataforma revela os recursos de colaboração, os workflows de revisão entre áreas, os alarmes de expiração temporal e a visão de aderência por departamento. O compliance começa a ser distribuído — e a ARS orquestra essa distribuição.

### Continuous GRC — A Empresa Estruturada

**Pergunta central:** "Como escalar e blindar a operação?"

A organização já tem uma ou mais certificações ativas, um time de compliance estruturado e um processo maduro. O desafio agora é escalar sem perder controle — gerenciar múltiplos frameworks, identificar sobreposições de controles, antecipar riscos e demonstrar valor estratégico para a liderança. A plataforma revela o Cross-Mapping automático de controles, o Compliance Graph de relacionamentos, as análises preditivas de IA, o Time-Travel Slider e os relatórios executivos de analytics. O compliance deixa de ser operacional e passa a ser estratégico.

---

## 14. Dual Experience

A ARS foi projetada para servir organizações em diferentes estágios de maturidade sem fragmentar o produto. A mesma plataforma oferece experiências adaptadas ao perfil de cada empresa.

### Empresa Pequena — Fluxos Simplificados

Uma empresa de 50 pessoas buscando sua primeira certificação ISO 27001 precisa de clareza, não de completude. A ARS entrega:

- Onboarding com diagnóstico de 10 minutos que gera um Plano de Voo imediato
- Interface focada em tarefas: "O que eu faço hoje?"
- Linguagem sem jargão normativo — "Política de Segurança" em vez de "Controle A.5.1"
- Score visível a todo momento como motivador de progresso
- IA que explica o que precisa ser feito em vez de mostrar o que está faltando
- Sem exposição a riscos, grafos ou analytics avançados até que sejam relevantes

### Empresa Média — Fluxos Colaborativos

Uma empresa de 500 pessoas em processo de renovação de certificação ISO 9001 e ISO 27001 precisa de coordenação entre áreas. A ARS entrega:

- Dashboard de ownership que mostra qual departamento está atrasando o processo
- Workflows de revisão e aprovação com RACI contextual
- Visão de cobertura por área para priorizar esforço onde o impacto é maior
- Alertas automáticos de expiração que reabrem atividades para os responsáveis
- Cross-Mapping que mostra quais evidências servem a múltiplas normas
- Auditoria interna integrada com modo de execução focado

### Empresa Estruturada — Fluxos Avançados

Uma empresa com múltiplas certificações ativas, equipe dedicada de compliance e maturidade nível 4–5 precisa de inteligência e escala. A ARS entrega *(itens majoritariamente de visão futura — ver nota de estado no topo do documento)*:

- Compliance Graph para visualização de dependências entre controles e normas
- Analytics executivo com KPIs estratégicos para comitê de governança
- Time-Travel Slider para auditorias retroativas e demonstração histórica de conformidade
- Análise preditiva de Audit Ready Date com projeção de curva de entrega
- Integração com Risk Register e amarração de riscos a controles
- Sala do Auditor Externo com trilha de auditoria imutável e cadeia de custódia

---

## 15. Product Principles

Os princípios a seguir são permanentes. Orientam decisões de produto, UX, engenharia e comunicação. Não são features — são critérios.

**1. Score antes de status.** Números comunicam mais que etiquetas. Onde uma etiqueta diz "em progresso", a ARS mostra "67% coberto".

**2. Próximo passo sempre visível.** Nenhuma tela termina sem indicar ao usuário o que fazer a seguir. O compliance nunca para porque o usuário não sabe por onde continuar.

**3. Linguagem humana, não normativa.** A plataforma fala com pessoas, não com auditores. O jargão fica na arquitetura de dados.

**4. Cobertura não é declaração.** Um controle marcado como "implementado" sem evidência aprovada não contribui para o score. A realidade importa mais que a intenção.

**5. A IA acelera, o humano decide.** A inteligência artificial remove trabalho braçal e sugere caminhos. A decisão final — aprovar, rejeitar, excluir — é sempre humana. A ARS não automatiza compliance: automatiza o trabalho operacional que envolve compliance.

**6. Rastreabilidade não é opcional.** Toda ação relevante gera registro imutável. Isso não é uma funcionalidade de segurança — é a fundação da confiabilidade da plataforma perante auditores.

**7. Complexidade revelada, não imposta.** Funcionalidades avançadas existem, mas não poluem a experiência de quem não precisa delas ainda. O Progressive Disclosure é um princípio de design, não uma feature.

**8. O score cai se nada for feito.** A plataforma é honesta sobre o Decay Effect. Um score alto conquistado com esforço não se mantém sozinho — e a ARS não finge que sim.

**9. Ownership sempre explícito.** Toda pendência tem um nome. Toda evidência tem um responsável. Todo vencimento tem um dono. Compliance sem ownership é compliance sem resultado.

**10. Multi-norma por padrão.** A ARS é projetada desde a fundação para suportar múltiplos frameworks simultaneamente. Nenhuma decisão de produto pode privilegiar uma norma ao custo de impossibilitar outra.

**11. Auditável por design.** A plataforma é construída para que o auditor externo possa verificar tudo — não apenas o resultado final, mas o processo que levou a ele. Cadeia de custódia, histórico de versões, trilha de aprovações.

**12. Colaboração onde o trabalho acontece.** Discussões sobre compliance acontecem dentro da plataforma, contextualizadas ao controle ou evidência em questão. Não em e-mails. Não em WhatsApp. Não em reuniões sem registro.

**13. Previsibilidade é o produto.** O maior valor que a ARS entrega não é o score atual — é a capacidade de prever quando a organização estará pronta. Uma data é mais útil que um percentual.

**14. Falhas visíveis, não mascaradas.** Uma NC Maior não pode ser escondida atrás de um score alto. O sistema penaliza ativamente qualquer tentativa de mascarar falhas operacionais.

**15. Compliance é contínuo ou não é compliance.** Qualquer funcionalidade que incentive comportamento de sprint pré-auditoria em detrimento de manutenção contínua vai contra a filosofia do produto.

---

## 16. Product North Star

### North Star Metric

> **Número de organizações que atingiram e mantiveram Audit Readiness Score ≥ 85% por 90 dias consecutivos.**

Esta métrica captura o valor central da plataforma: não basta atingir 85% — é preciso manter. Organizações que sustentam esse patamar por 90 dias demonstraram que o compliance na ARS não foi um esforço pontual pré-auditoria, mas uma operação contínua. Elas são as clientes que renovam, indicam e servem de prova de conceito para o mercado.

### Métricas auxiliares

| Métrica | O que mede |
|---------|-----------|
| **Audit Ready Date accuracy** | Quão precisa é a previsão da plataforma vs. a data real de prontidão — valida a confiabilidade do score |
| **Time to First Score** | Tempo desde o cadastro até o primeiro Audit Readiness Score calculado — mede a eficácia do onboarding |
| **Coverage Velocity** | Velocidade de aumento de cobertura por semana — mede o engajamento ativo da equipe |
| **Evidence Approval Rate** | % de evidências submetidas que são aprovadas na primeira tentativa — mede a clareza das expectativas |
| **NC Resolution Rate** | % de não-conformidades resolvidas dentro do prazo definido no CAPA — mede disciplina operacional |
| **Multi-framework Adoption** | % de clientes com 2 ou mais frameworks ativos — mede expansão de valor dentro da conta |
| **Renewal Rate** | % de organizações que renovam após o primeiro ciclo de certificação — mede retenção e valor entregue |

---

## 17. Success Definition

Uma organização teve sucesso usando a ARS quando:

**Sucesso operacional:** Concluiu uma auditoria interna completa com todos os achados registrados e os CAPAs de não-conformidades com prazo e responsável definidos.

**Sucesso de prontidão:** Atingiu Audit Readiness Score ≥ 85% e agendou (ou passou) uma auditoria externa de certificação.

**Sucesso de continuidade:** Manteve o score acima de 75% por pelo menos 90 dias após a primeira certificação, sem dependência de consultores externos para operar a plataforma.

**Sucesso de independência:** Um membro da equipe interno — não necessariamente da área de compliance — consegue operar a plataforma, submeter evidências, entender o score e saber quais são os próximos passos sem precisar de treinamento adicional.

**Sucesso estratégico:** A liderança da organização usa os dados do dashboard executivo da ARS em reuniões de governança como evidência do estado de conformidade da empresa — substituindo relatórios manuais e apresentações de consultoria.

---

## 18. Product Narrative

### Para investidores, parceiros e futuros clientes

---

Existe um momento que toda empresa em crescimento enfrenta, e que quase ninguém fala sobre: o dia em que um cliente importante, um banco ou um parceiro estratégico exige um certificado ISO ou uma comprovação de conformidade com a LGPD — e a empresa percebe que não tem absolutamente nada estruturado.

Nesse momento, começa uma corrida que dura meses. A empresa contrata uma consultoria. Reúne documentos espalhados em servidores, e-mails e mentes de colaboradores. Monta planilhas que ninguém sabe interpretar. Prepara um dossiê para o auditor externo que fica desatualizado no mesmo dia em que é finalizado. E depois de meses de esforço e tensão, há uma chance razoável de reprovação por detalhes que poderiam ter sido evitados com organização básica.

A ARS existe para mudar essa história.

Nós acreditamos que compliance é uma capacidade que qualquer organização pode desenvolver — não um serviço prestado por especialistas inacessíveis. Assim como o Duolingo democratizou o aprendizado de idiomas ao torná-lo guiado, contínuo e medido, a ARS democratiza o compliance ao transformar requisitos normativos complexos em jornadas claras, tarefas executáveis e resultados mensuráveis.

A Central de Comando de Compliance da ARS entrega algo que nenhuma planilha, consultoria ou ferramenta tradicional de GRC consegue entregar de forma simples: a resposta em tempo real para a pergunta que realmente importa. **"Estamos prontos para ser auditados agora?"**

Não como uma estimativa. Não como uma percepção. Como um número calculado, ponderado pela criticidade de cada controle, corrigido pelo decaimento natural de evidências que vencem, e acompanhado de um plano claro do que fazer para melhorá-lo.

O mercado que a ARS endereça é vasto e estruturalmente mal atendido. As ferramentas enterprise de GRC — OneTrust, AuditBoard, Diligent — foram construídas para grandes corporações com times dedicados e orçamentos de sete dígitos. As ferramentas simples de checklist não têm a robustez para suportar auditorias reais. E as consultorias de compliance, por mais competentes que sejam, não escalam.

A ARS ocupa o espaço entre esses dois mundos: robusta o suficiente para suportar um catálogo de mais de 30 frameworks normativos simultaneamente — com ISO 27001, ISO 9001, ISO 20000-1, ISO 22301, ISO 27701 e LGPD como normas certificáveis-âncora — e simples o suficiente para ser operada por uma equipe que nunca passou por uma auditoria antes.

Nossa tese é direta: as organizações que adotam a ARS não preparam uma auditoria — elas operam em estado permanente de prontidão. E quando a data com o auditor chega, elas não estressam. Elas simplesmente abrem a plataforma, exportam o relatório e mostram o score.

---

*Este documento é a referência oficial de Product Context da plataforma Audit Readiness Score (ARS).*  
*Versão 2.0 — Consolidação Estratégica com base no Blueprint UX/UI V3.2.*
