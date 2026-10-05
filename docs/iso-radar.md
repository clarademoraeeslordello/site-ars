# ISO Radar: como funciona e como colocar no ar

## Fluxo

1. **Detectar**: todo dia, às 06:00 (Brasília), o cron chama `POST /api/cron/radar/`. O site baixa o arquivo oficial da ISO (ISO Open Data, licença ODC-BY) e compara o estágio de cada documento das normas do catálogo (`lib/radar/catalog.ts`) com o que está salvo no Postgres.
2. **Rascunhar**: para cada mudança relevante (novo projeto, DIS, FDIS, publicação, revisão sistemática, retirada), o Claude escreve o rascunho em PT, EN e ES usando só os dados oficiais. Mudanças intermediárias de votação só atualizam o banco.
3. **Avisar**: se surgiu rascunho, os e-mails de `ADMIN_EMAILS` recebem um resumo.
4. **Revisar**: em `/admin/radar`, cada rascunho pode ser aprovado, editado (os três idiomas, status, prazo de transição com fonte) ou descartado. Nada vai para o site sem aprovação.
5. **Reverificar**: cada varredura atualiza a "última verificação" dos artigos publicados. Se o status de uma norma mudar de novo, um novo rascunho entra na fila.

Na primeira varredura não há estado anterior para comparar. Por isso, ela cria rascunhos para o que aconteceu nos últimos 24 meses e para os projetos em andamento.

O site da ISO.org bloqueia robôs com uma verificação do Cloudflare. Por isso a fonte é o ISO Open Data, e cada artigo traz o link para a página oficial da norma.

## Newsletter

- Inscrição com dupla confirmação: o formulário envia um e-mail, e só quem clica no link fica como "confirmado".
- No dia 1 de cada mês, `POST /api/cron/newsletter/` monta a edição com os artigos publicados no mês anterior e avisa os admins.
- Em `/admin/newsletter`, a edição só é enviada depois do clique em "Aprovar e enviar". Cada e-mail traz o link de descadastro (com cabeçalho `List-Unsubscribe`).

## Colocar no ar (Railway)

1. **Variáveis no serviço do site** (veja `.env.example`): `DATABASE_URL`, `NEWSLETTER_TOKEN_SECRET` (opcional; usa `ADMIN_SESSION_SECRET` se não existir), `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NEWSLETTER_FROM_EMAIL`, `ADMIN_EMAILS`, `ADMIN_SESSION_SECRET`, `CRON_SECRET`, `SITE_URL`.
2. **Tabelas**: o esquema fica em `db/schema.ts` e as migrações em `db/migrations`. O `pnpm start` roda `scripts/migrate.mjs` antes do `next start`. O Radar automático usa `radar_deliverables` (o estado de cada documento da ISO), `radar_standards`, `radar_scans` e `radar_articles` (uma linha por idioma, ligadas por `group_id`). A newsletter usa `newsletter_subscribers`, `newsletter_editions` (uma por idioma e mês) e `consent_events` (registro LGPD que só aceita inclusões).
3. **Dois serviços de cron no Railway** (o horário do Railway é UTC):
   - Radar, diário: agendamento `0 9 * * *`, comando
     `curl -fsS -X POST -H "Authorization: Bearer $CRON_SECRET" https://auditcockpits.com/api/cron/radar/`
   - Newsletter, mensal: agendamento `0 12 1 * *`, comando
     `curl -fsS -X POST -H "Authorization: Bearer $CRON_SECRET" https://auditcockpits.com/api/cron/newsletter/`
4. **Resend**: verificar o domínio de envio (`auditcockpits.com`) para que os e-mails não caiam no spam.

## Comandos

- `pnpm db:generate`: gera uma nova migração depois de alterar `db/schema.ts`.
- `pnpm db:migrate`: aplica as migrações pendentes (usa `DATABASE_URL`).
