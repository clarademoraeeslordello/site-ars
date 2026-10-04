# Estratégia de conteúdo e SEO · auditcockpits.com

Objetivo: tornar o site uma **referência** quando alguém pesquisa sobre certificações ISO, preparação para auditoria e plataformas de apoio. O ARS deve aparecer **de forma orgânica**, como a ferramenta que resolve o problema explicado no texto, nunca como propaganda no meio do artigo.

Este documento complementa o `PROMPT-CLAUDE-CODE.md`. O Claude Code deve criar a estrutura, os templates e os primeiros conteúdos descritos aqui.

---

## 1. Princípio editorial

Cada página responde a uma dúvida real **antes** de falar do produto.

Ordem fixa em todo conteúdo:
**Dúvida → Explicação completa → Exemplo prático → Como organizar isso no dia a dia → Onde o ARS entra → Próximo passo**

Regras:
- O texto precisa ser útil mesmo para quem nunca vai comprar o ARS. É isso que gera links, citações e posição no Google e em respostas de IA.
- O produto aparece **uma vez no corpo** (no bloco "Como organizar isso no dia a dia") e **uma vez no fim** (CTA contextual). Nunca no primeiro parágrafo.
- Linguagem de quem faz o trabalho: gestor de qualidade, segurança da informação, compliance, DPO, consultor. Sem jargão de marketing.
- Toda afirmação sobre normas cita a fonte oficial (ISO.org, ABNT, ANPD, TCU, EUR-Lex, gov.uk). Nunca copiar texto de norma.
- Nada de promessa: não usar "garanta sua certificação", "certifique em X dias".
- Sem travessão (—) nos textos.

## 2. Arquitetura de tópicos (pilares e clusters)

Cada **pilar** é uma página longa e definitiva sobre o tema. Os **clusters** são artigos menores que respondem perguntas específicas e linkam de volta ao pilar. O pilar linka para todos os clusters.

### Pilar 1 · Audit readiness (prontidão para auditoria)
URL: `/prontidao-para-auditoria/` · EN `/en/audit-readiness/` · ES `/es/preparacion-para-auditoria/`
Clusters:
- O que é audit readiness e por que ela não começa no dia da auditoria
- Como medir a prontidão para uma auditoria (score, meta, criticidade)
- Diferença entre requisito, controle e evidência
- Pré-auditoria: o que é e quando fazer
- Planilha ou plataforma: quando a planilha deixa de funcionar

### Pilar 2 · Evidências de auditoria
URL: `/evidencias-de-auditoria/`
Clusters:
- Como organizar evidências para uma auditoria ISO
- Validade de evidências: o que acontece quando vencem
- Exemplos de evidências por tipo de controle
- O que o auditor externo costuma pedir

### Pilar 3 · Certificação ISO: do início à manutenção
URL: `/certificacao-iso/`
Clusters:
- Etapas da certificação ISO (diagnóstico até manutenção)
- Auditoria interna, auditoria de certificação e auditoria de manutenção
- Quem emite o certificado: o papel do organismo certificador
- Como manter a certificação entre auditorias
- Renovação da certificação: o ciclo de 3 anos

### Pilar 4 · Uma página por norma do catálogo
URL: `/normas/iso-27001/`, `/normas/iso-9001/`, `/normas/iso-14001/`, `/normas/iso-22301/`, `/normas/iso-27701/`, `/normas/iso-42001/`, `/normas/lgpd/`, `/normas/nis2/`, `/normas/dora/`, `/normas/soc-2/` (como relatório de atestação), `/normas/cyber-essentials/`
Estrutura de cada página de norma:
1. O que é a norma, em 3 frases
2. Para quem ela é exigida ou recomendada
3. Edição vigente e status (link ISO.org, data da última verificação)
4. Estrutura da norma em linguagem simples (sem copiar o texto)
5. Como se preparar, passo a passo
6. Evidências mais comuns
7. Erros frequentes
8. Como organizar isso no dia a dia (onde o ARS entra)
9. Perguntas frequentes (com FAQPage schema)
10. Últimas atualizações do ISO Radar sobre essa norma
Clusters por norma (começar pela ISO 27001 e ISO 9001):
- Como se preparar para uma auditoria ISO 27001
- O que é a SOA (Declaração de Aplicabilidade)
- ISO 9001:2026: o que muda e como planejar a transição
- ISO 14001:2026: o que muda

### Pilar 5 · CAPA e não conformidades
URL: `/capa-acao-corretiva/`
Clusters:
- O que é CAPA
- Como tratar uma não conformidade de auditoria
- Diferença entre correção, ação corretiva e ação preventiva

### Pilar 6 · Certificação como vantagem de mercado
URL: `/certificacao-licitacoes-e-mercado-internacional/`
Clusters:
- Certificação ISO em licitações: o que o TCU admite (com revisão jurídica)
- NIS2 e a exigência de segurança na cadeia de fornecedores
- Cyber Essentials para fornecedores do governo do Reino Unido
- Números da certificação ISO no mundo e no Brasil (ISO Survey)

### Pilar 7 · Plataformas de apoio à conformidade (página comercial-informativa)
URL: `/plataforma-de-gestao-de-auditoria/`
Responde: "o que uma plataforma de prontidão deve ter", com critérios honestos de avaliação (rastreabilidade requisito→evidência, validade, ações, score, relatórios, acesso do auditor, histórico por ciclo, multilíngue, isolamento por organização). O ARS é apresentado como uma opção que atende esses critérios, sem comparar nomes de concorrentes e sem inventar diferenciais.

### ISO Radar (notícias)
URL: `/iso-radar/[slug]`. Cada notícia linka para a página da norma correspondente e para o pilar 3. É o que mantém o site "fresco" para o Google e mostra autoridade.

## 3. Como o ARS aparece de forma orgânica

### Bloco "Como organizar isso no dia a dia"
Componente fixo, no fim do corpo de cada pilar e artigo. Explica o método de forma genérica primeiro e só depois cita o ARS. Modelo:

> Para não depender da memória da equipe, cada requisito precisa estar ligado ao controle que o atende, e cada controle à evidência que o comprova, com responsável e validade. Quando falta algo, a lacuna vira uma ação com prazo. No ARS, essa cadeia fica num só lugar e o score mostra, a qualquer momento, quanto falta para a meta de prontidão.

Visual: card branco r22, eyebrow "Na prática", uma mini tela recriada do ARS relacionada ao tema (evidências, SOA, jornada, CAPA) com a legenda "dados de demonstração".

### CTA contextual (fim do artigo)
Texto muda conforme o tema, sempre no tom de convite:
- Artigo de evidências: "Veja como o ARS liga cada evidência ao controle que ela comprova."
- Artigo de ISO 27001: "Veja uma jornada ISO 27001 completa no ARS."
- Artigo de transição de norma: "Veja como acompanhar a transição para a nova edição no ARS."
Botões: "Agendar demonstração" e "Conhecer a plataforma".

### Links internos
- Termos técnicos no texto (SOA, CAPA, evidência, controle, score) linkam para o glossário ou para o artigo que explica.
- Cada artigo linka 1 pilar, 2 a 3 artigos relacionados e 1 página de produto.
- Âncoras descritivas ("como organizar evidências para auditoria"), nunca "clique aqui".

### Glossário
URL: `/glossario/`. Termos: audit readiness, requisito, controle, evidência, lacuna, SOA, CAPA, não conformidade, organismo certificador, auditoria de certificação, auditoria de manutenção, recertificação, relatório de atestação, escopo, ciclo de conformidade. Cada termo tem âncora própria (`/glossario/#soa`) e schema `DefinedTerm`.

## 4. Busca por IA (Google AI Overviews, ChatGPT, Perplexity, Claude)

Para o conteúdo ser citado em respostas de IA:
- Começar cada seção com uma **resposta direta de 1 a 2 frases**, depois aprofundar.
- Usar H2/H3 em forma de pergunta ("O que é a SOA?").
- Listas e tabelas curtas para passos e comparações.
- Datas visíveis: publicação, atualização e "última verificação na fonte oficial".
- Autor ou responsável editorial real com página própria (`/sobre/`), quando existir. Sem nomes inventados.
- `llms.txt` na raiz listando pilares, normas e glossário.
- Não bloquear crawlers de IA no `robots.txt` (exceto `/admin/` e `/api/`).

## 5. Palavras-chave de partida (validar no Search Console depois do lançamento)

PT: prontidão para auditoria, como se preparar para auditoria ISO 27001, evidências de auditoria ISO, o que é SOA ISO 27001, declaração de aplicabilidade, o que é CAPA, ação corretiva não conformidade, ISO 9001 2026 o que muda, manutenção da certificação ISO, auditoria de manutenção ISO, software para gestão de auditoria, plataforma de conformidade ISO, certificação ISO licitação.
EN: audit readiness, ISO 27001 audit preparation, audit evidence management, statement of applicability, ISO 9001:2026 changes, compliance readiness platform.
ES: preparación para auditoría ISO, evidencias de auditoría, declaración de aplicabilidad, ISO 9001:2026 cambios, plataforma de cumplimiento.

As versões EN e ES são **adaptadas**, não traduzidas literalmente: ajustar exemplos (ex.: LGPD no PT, GDPR/NIS2 no EN, normas locais no ES).

## 6. Dados estruturados por tipo de página

- Pilares e artigos: `Article` + `BreadcrumbList` + `FAQPage` (só com FAQ visível).
- ISO Radar: `NewsArticle` com `datePublished`, `dateModified`, `citation` (link oficial).
- Páginas de norma: `Article` + `FAQPage` + `about` com o nome da norma.
- Glossário: `DefinedTermSet` + `DefinedTerm`.
- Página da plataforma: `SoftwareApplication` (categoria BusinessApplication, sem preço nem avaliações).
- Todas: `Organization` e `WebSite` no layout.

## 7. Template visual de artigo (seguir o sistema da Home)

- Breadcrumb (Archivo 13px, `#807b6e`)
- Eyebrow com a categoria (Plex Mono 11px, dourado)
- H1 Fraunces 500 `clamp(32px,4vw,48px)`
- Linha de metadados: autor (se houver) · publicado · atualizado · última verificação (Plex Mono 12px)
- Resumo em destaque (card `#faf7ef`, borda `#efe6cf`, r14): "Em resumo", 2 a 3 frases
- Corpo: largura máxima 720px, Archivo 17px/1.7, H2 Fraunces 28px, H3 Fraunces 21px
- Índice lateral fixo no desktop (Archivo 14px)
- Bloco "Na prática" com o ARS
- Fontes oficiais (componente SourceCitation: nome da fonte, link, data)
- Artigos relacionados (3 ArticleCards)
- CTA contextual
- Newsletter ISO Radar

## 8. Primeiros conteúdos (lançamento)

Começar com poucos e bons, nesta ordem:
1. Pilar: Prontidão para auditoria
2. Página de norma: ISO 27001
3. Página de norma: ISO 9001 (com a edição 2026, após confirmar o status no ISO.org)
4. Artigo: Como organizar evidências para uma auditoria ISO
5. Artigo: O que é a SOA
6. Artigo: O que é CAPA
7. Pilar: Certificação ISO, do início à manutenção
8. Glossário
9. Três notícias do ISO Radar (ISO 9001:2026, ISO 14001:2026, ISO 9000:2026), confirmadas na fonte

Depois: um artigo novo por semana, priorizando o que o Search Console mostrar com impressões e posição entre 8 e 20.

## 9. Rotina depois do lançamento

- Mensal: revisar no Search Console as páginas com impressão alta e CTR baixo (reescrever title e description) e as consultas novas (criar ou ampliar conteúdo).
- Trimestral: atualizar páginas de norma com o status atual e a data de verificação.
- Toda mudança de norma detectada pelo ISO Radar: atualizar a página da norma correspondente, além de publicar a notícia.
