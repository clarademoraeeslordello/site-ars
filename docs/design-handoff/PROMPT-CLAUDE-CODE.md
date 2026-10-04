# Prompt para o Claude Code — Site institucional Audit Cockpits / ARS

Cole este texto no Claude Code, dentro do repositório `clarademoraeeslordello/site-ars`, junto com a pasta `design_handoff_site_institucional/`.

---

## Contexto

Construa o site institucional oficial da **Audit Cockpits** para o produto **ARS — Audit Readiness Score** (Audit Readiness Platform).

- Domínio do site: `https://auditcockpits.com/`
- Produto (login): `https://app.auditcockpits.com/` (não mexer)
- Hospedagem: Railway. Banco: Postgres (no Railway) para ISO Radar e newsletter.
- Plataforma de referência visual: repositório `clarademoraeeslordello/Audit_Readiness_Score`, pasta `frontend/` (tokens em `frontend/app/globals.css`).

A pasta `design_handoff_site_institucional/` contém o design aprovado em HTML. **Ele é referência, não código de produção.** Recrie em código real, com fidelidade visual alta. Abra `Home v3.dc.html` no navegador para ver (precisa do `support.js` ao lado). Leia o `README.md` da pasta: ele tem todos os tokens, componentes e seções detalhados.

## Stack

- **Next.js (App Router) com geração estática (SSG)**, TypeScript.
- **next-intl** para PT/EN/ES (mesmo padrão do app ARS).
- **next/font** para Fraunces, Archivo e IBM Plex Mono (auto-hospedadas).
- CSS: tokens em variáveis CSS + CSS Modules ou Tailwind com os mesmos valores. Nada de estilos inline no código final.
- **Resend** para newsletter (audience, double opt-in, unsubscribe).
- **Postgres** (Prisma ou Drizzle) para inscritos, normas monitoradas e artigos do ISO Radar.
- **GA4** preparado via variável de ambiente.
- JavaScript mínimo: só o card animado do hero, o globo, o formulário e o menu mobile são componentes de cliente.

## Regras de conteúdo (obrigatórias)

1. Não usar travessão (—) em nenhum texto. Usar "·" ou vírgula.
2. Nunca afirmar que o ARS: emite certificados, faz a auditoria, substitui auditor/DPO/consultoria, é certificado ISO 27001 ou SOC 2, tem IA, coleta evidências automaticamente, monitora infraestrutura automaticamente ou tem residência de dados completa na UE.
3. Sempre manter: "O organismo certificador decide. O ARS organiza, registra e acompanha."
4. SOC 2 é "relatório de atestação, não uma certificação".
5. Sem página nem bloco de preços.
6. Números permitidos: 37 normas e frameworks · 706 requisitos; dados do ISO Survey 2024 (com fontes).
7. Telas do produto no site são **recriadas em HTML/CSS** (não usar prints), com a legenda "dados de demonstração".
8. Não inventar clientes, depoimentos, autores, selos ou resultados.

## Identidade visual (herdada do app ARS)

- Fundo `#f7f6f2` · superfície `#ffffff` · texto `#1b1b1b` · corpo `#4a4640` · secundário `#807b6e` · borda `#e3e0d8` · divisor `#efece3`
- Dourado: botão `#c4a24e` (texto `#161618`), hover `#8a6a14` (texto branco), rótulos/links `#a27f24`, score `#8a6a14`, sobre fundo escuro `#e2c477`
- Escuro: `#161618`, cards `#1f1f22`, bordas `#2f2e2a`/`#3a3933`, texto `#faf8f4`, corpo `#c9c5bb`
- Status: OK `#eef0e6`/`#cdd4bb`/`#5f7040` · Atenção `#f3ead6`/`#d9c8a0`/`#8a6a14` · Neutro `#eceae4`/`#dcd9d1`/`#807b6e`
- Tipografia: títulos **Fraunces 500**; texto e interface **Archivo**; rótulos, códigos e datas **IBM Plex Mono** (11px, maiúsculas, espaçamento .16em, dourado)
- Raios: cards 22px · botões/inputs/badges 11px · pills 999px
- Container 1200px, margem lateral 28px, espaço entre seções `clamp(88px,10vw,128px)`

## Componentes a criar (reutilizáveis, sem duplicar por idioma)

Header, Footer, LanguageSwitcher, MobileMenu, Button, StatusBadge, Eyebrow, SectionHeading, ReadinessRuler (barra com marcador da meta 85%), ProductMock (tela inicial, jornada, evidências, renovação, relatório, certificação, ciclo), FrameworkChip, Globe, StatList, NewsletterSignup, ArticleCard, ArticlePage, SourceCitation, RelatedArticles, Breadcrumb, CTA.

## Home (`/`), em ordem

1. **Header** fixo: logo à esquerda, menu centralizado (Como funciona, Plataforma, Mercado, ISO Radar, Sobre), à direita PT/EN/ES, "Entrar" e botão "Agendar demonstração". Abaixo de 1100px, menu vira botão que abre um painel.
2. **Hero** em 2 colunas: título "Chegue à auditoria sabendo exatamente onde sua empresa está." + texto + 2 botões; à direita o card "Esta semana · ISO 27001", em que o score sobe de 61% a 67% enquanto 4 atividades aparecem uma a uma (a cada 1,5s, em loop). Abaixo, a tela inicial do ARS recriada.
3. **Perguntas da semana**: tabela com 5 perguntas, "como costuma ser" e "com o ARS".
4. **Como funciona**: texto fixo na lateral com a cadeia Requisito → Controle → Evidência → Lacuna → Ação → Score; à direita a jornada de 7 etapas recriada.
5. **Onde sua equipe recupera tempo**: 3 cards (sem caçar evidências, sem surpresa de vencimento, sem montar pacote para o auditor) + lista "Também na plataforma".
6. **Por que criamos o Audit Cockpits**: card branco com o texto da fundadora.
7. **Mercado** (faixa escura de ponta a ponta): 3 números do ISO Survey 2024, **globo 3D** que gira e pode ser arrastado com o ranking dos 8 países com mais certificados ISO 27001 ao lado, cards de Licitações no Brasil e Mercado internacional, bloco "Fontes" recolhível. **O texto sobre licitações precisa de revisão jurídica antes de publicar.**
8. **Depois da certificação**: texto + destaque "o organismo certificador decide" + cards de score do auditor e ciclo vigente.
9. **Cobertura** (faixa branca de ponta a ponta): 37 normas · 706 requisitos + chips + nota do SOC 2.
10. **ISO Radar**: formulário da newsletter + 3 últimos artigos.
11. **CTA final** escuro: "Vamos ver juntos como está a sua prontidão?", e-mail `auditreadinessscore@gmail.com`, telefone `+55 21 99758-8376`.
12. **Footer**: links, Privacidade, Termos, Entrar no ARS, idiomas.

Todos os textos exatos estão em `Home v3.dc.html` (marcação e dados no fim do arquivo). Copie a copy de lá.

## Globo

Use D3 v7 (projeção ortográfica) + `world-atlas` 110m, empacotado localmente. Implementação de referência completa em `Globo ISO.html`: cores, escala, rotação automática, arraste, rótulos que somem no lado de trás. Carregar só quando a seção entrar na tela. Com `prefers-reduced-motion`, não girar.

## Outras páginas (estrutura em `reference/Fase 2 - Arquitetura do Site.dc.html`)

Plataforma, Como funciona, Cobertura/Frameworks, ISO Radar (lista + artigo), Sobre, Contato/Demonstração, Privacidade, Termos, 404. Mesmo sistema visual e componentes da Home.

## Idiomas e SEO

- Rotas: `/` (pt-BR), `/en/`, `/es/`; ex.: `/recursos/`, `/en/resources/`, `/es/recursos/`; artigos `/iso-radar/[slug]`, `/en/iso-radar/[slug]`, `/es/iso-radar/[slug]`.
- Sem redirecionamento automático pelo idioma do navegador.
- Em cada página: title e description únicos, um H1, canonical, hreflang (pt-BR, en, es, x-default → `/`), Open Graph, `lang` correto, alt em imagens, breadcrumbs nas páginas internas.
- JSON-LD: Organization, WebSite, SoftwareApplication (sem preço nem avaliações), BreadcrumbList, NewsArticle nos artigos. FAQPage só se houver FAQ visível.
- `sitemap.xml` com as versões de idioma; `robots.txt` bloqueando `/api/`, `/admin/` e rascunhos.
- Falta criar a imagem de compartilhamento (1200×630).

## ISO Radar (detalhes em `reference/ISO Radar - Automacao.dc.html`)

- Tarefa agendada no Railway (cron diário) consulta as páginas oficiais da ISO.org das normas do catálogo e registra o status no Postgres.
- Fluxo: Detectar → Pesquisar → Comparar (com o status salvo) → Gerar rascunho → **Revisão humana** → Publicar. Nada é publicado sem aprovação.
- Área `/admin` protegida para revisar e aprovar rascunhos (não indexada).
- Campos do artigo: título, resumo, o que aconteceu, o que mudou, impacto, o que observar, status (Publicado · Em revisão · Em transição · Retirado), link da fonte oficial, data da fonte, última verificação, autor (só se real).
- Nunca copiar texto das normas; sempre linkar a fonte oficial.

## Conteúdo e autoridade (SEO editorial)

Siga o arquivo `SEO-CONTEUDO.md` desta pasta. Ele define os pilares, os artigos, as páginas por norma, o glossário, o template de artigo e como o ARS aparece de forma orgânica (bloco "Na prática" + CTA contextual). Crie as rotas, os templates e os 9 primeiros conteúdos listados lá, em PT, EN e ES. Conteúdo em Markdown/MDX versionado no repositório.

## Newsletter

- Campos: Nome, E-mail, Idioma (PT/EN/ES), consentimento com link para Privacidade.
- `POST /api/newsletter` salva no Postgres (com página de origem e data do consentimento) e envia ao Resend com double opt-in.
- Páginas de confirmação, sucesso, cancelamento e preferências.
- Manter separados os e-mails do produto e a newsletter.

## Analytics (GA4)

Eventos: `cta_demo_click`, `cta_platform_click`, `newsletter_subscribe`, `article_open`, `source_click`, `language_switch`, `form_submit`, `app_login_click`.

## Acessibilidade e performance

HTML semântico, navegação por teclado, foco visível (contorno 2px `#a27f24`), contraste mínimo 4.5:1, labels nos campos, botões e links reais, `prefers-reduced-motion` respeitado. Responsivo de verdade em celular, tablet e desktop. Sem vídeo pesado, fontes auto-hospedadas, imagens otimizadas.

## Variáveis de ambiente

`DATABASE_URL`, `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `NEXT_PUBLIC_GA_ID`, `ADMIN_PASSWORD` (ou auth equivalente), `SITE_URL=https://auditcockpits.com`.

## Checklist antes de entregar

Title/description únicos · H1 único · canonical · hreflang · sitemap · robots · OG · favicon (`assets/brand/icon.svg`) · JSON-LD · PT/EN/ES completos · 404 · mobile · teclado · contraste · nenhum travessão · nenhuma promessa proibida · visual igual ao app ARS.
