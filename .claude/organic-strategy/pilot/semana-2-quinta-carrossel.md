# Semana 2 · Quinta-feira — Carrossel (9 slides)

**Status:** Produzido como parte do piloto de 2 semanas — referência de qualidade: `semana-1-segunda-carrossel.md`
**Fonte:** `.claude/organic-strategy/editorial-calendar.md` — Semana 2, Quinta

---

## Ficha do conteúdo

| Campo | Valor |
|---|---|
| Tema do calendário | "CAPA: como funciona o ciclo de não-conformidade de verdade" |
| Pilar | CLAREZA |
| Formato | Carrossel · 9 slides |
| Persona primária | Rafael — Compliance Manager sobrecarregado |
| Persona secundária | Fernanda — Consultora de compliance |
| Dor | Gerencia não-conformidades de forma reativa, não sabe exatamente quais são as etapas formais do ciclo, frequentemente fecha CAPAs sem verificar eficácia |
| Etapa do funil | Educação / Consideração (MoFu) |
| CTA do calendário | "Salva — você vai usar isso na próxima auditoria" |
| Métrica principal | Save rate (benchmark: >3% bom, >5% excelente) |

## Justificativa do formato

O carrossel de 9 slides é o formato correto por três razões:

1. **O ciclo de CAPA tem 5 etapas sequenciais.** O argumento não pode ser comprimido sem perder precisão. A sequência NC aberta → análise de causa raiz → plano de ação → implementação → verificação de eficácia → fechamento precisa de pelo menos um slide por etapa, mais introdução e CTA.
2. **MoFu + CLAREZA = conteúdo de profundidade com alta densidade de saves.** Rafael vai salvar este post para consultar antes da próxima auditoria ou para usar como referência na formação do time. O playbook prevê que conteúdos de referência operacional têm os maiores save rates.
3. **CAPA é um tema com vocabulário específico que precisa ser desmistificado.** O Pilar CLAREZA exige que cada termo seja traduzido para linguagem de negócios. 9 slides permite fazer isso com profundidade sem comprometer a progressão do argumento.

## Mensagem principal

CAPA não é uma punição por errar — é o processo documentado que prova que sua organização identificou o problema, entendeu a causa e tomou ação para que não volte a acontecer. Auditores procuram evidência do ciclo completo, não apenas da ação tomada.

## Hook

"CAPA não é punição. É a prova de que sua organização aprende." — afirmação que reposiciona o CAPA de algo temido para algo estratégico. Ativa identificação de Rafael, que provavelmente já lidou com CAPAs de forma reativa e não sabia exatamente o que o auditor esperava ver.

---

## Conteúdo completo — slide a slide

### Slide 1 — Capa
- **Objetivo:** reposicionar o CAPA antes que o leitor forme a expectativa de que é um conteúdo burocrático ou punitivo; criar curiosidade sobre como o ciclo realmente funciona.
- Eyebrow: `ISO 27001 · CLAREZA`
- Headline (Fraunces 600, paper): "CAPA"
- Sub-headline (Fraunces 400, paper): Corrective and Preventive Action
- Corpo (Archivo 400, paper): Como funciona o ciclo de não-conformidade de verdade.
- Destaque (IBM Plex Mono 500, gold-bright): NÃO É PUNIÇÃO. É O PROCESSO QUE PROVA QUE SUA ORGANIZAÇÃO APRENDE.
- Handle: `@ars.compliance` — canto inferior esquerdo, silver
- Logo: `logo-horizontal-dark.svg`, canto inferior direito

### Slide 2 — O que é uma não-conformidade
- **Objetivo:** estabelecer o ponto de partida do ciclo — o que é uma NC — antes de explicar o CAPA. Rafael precisa entender que o CAPA começa com a NC, não é uma entidade independente.
- Eyebrow: `ONDE TUDO COMEÇA`
- Headline (Fraunces 600, paper): "Uma não-conformidade é qualquer falha em atender a um requisito do SGSI."
- Corpo (Archivo 400, paper): Pode ser identificada por:
- Lista (Archivo 400, paper):
  - — Auditor interno ou externo durante uma auditoria
  - — Incidente de segurança que expõe falha de controle
  - — Revisão gerencial que identifica desvio de processo
  - — Monitoramento contínuo que detecta evidência vencida ou controle descoberto
- Separador hairline-dark
- Rodapé (Archivo 400, silver): Toda NC precisa de um CAPA. Sem CAPA documentado, a NC permanece aberta — e o auditor vai encontrar na próxima visita.

### Slide 3 — NC Maior vs. NC Menor
- **Objetivo:** esclarecer a diferença entre NC Major e NC Minor — o impacto de cada uma no processo de certificação e no score.
- Eyebrow: `NC MAIOR VS. NC MENOR`
- Headline (Fraunces 600, paper): "Não são a mesma coisa. E o impacto no processo de certificação é muito diferente."
- Dois blocos lado a lado (border-radius 2px):
  - Bloco esquerdo — Eyebrow mono: `NC MAIOR` (cor: --color-nc, #8c3a3a) · Titulo (Archivo 500, paper): Falha sistêmica · Corpo (Archivo 400, paper): Compromete a eficácia do SGSI ou viola um requisito fundamental. Pode resultar em reprovação da certificação ou suspensão do certificado. Requer resolução verificada antes de encerramento da auditoria.
  - Bloco direito — Eyebrow mono: `NC MENOR` (cor: --color-risk, #a3542e) · Título (Archivo 500, paper): Falha isolada · Corpo (Archivo 400, paper): Desvio pontual que não compromete o sistema como um todo. Não bloqueia a certificação, mas exige CAPA com prazo definido.
- Rodapé (IBM Plex Mono 400, uppercase, silver): NA ARS, NC MAJOR ZERA A COBERTURA DO CONTROLE AFETADO ATÉ QUE O CAPA SEJA RESOLVIDO.

### Slide 4 — O início do ciclo
- **Objetivo:** marcar com precisão onde o ciclo de CAPA começa — o momento do achado — e o que deve acontecer imediatamente.
- Eyebrow: `ETAPA 1 · O INÍCIO`
- Headline (Fraunces 600, paper): "NC aberta. Relógio começa."
- Corpo (Archivo 400, paper): Quando uma não-conformidade é identificada, o ciclo exige três ações imediatas:
- Lista numerada (Archivo 400, paper):
  - 1. Registrar o achado com descrição precisa do que foi observado
  - 2. Definir um responsável (não um departamento — uma pessoa)
  - 3. Estabelecer um prazo para a análise de causa raiz
- Separador hairline-dark
- Destaque (Archivo 500, gold-bright): Sem responsável nomeado e prazo definido, o CAPA não existe — existe uma intenção.
- Rodapé (Archivo 400, silver): O achado documentado é o ponto de partida da trilha de auditoria do CAPA.

### Slide 5 — Análise de causa raiz
- **Objetivo:** explicar por que a análise de causa raiz é obrigatória — não opcional — e o que o auditor espera encontrar nela.
- Eyebrow: `ETAPA 2 · CAUSA RAIZ`
- Headline (Fraunces 600, paper): "Não resolva o sintoma. Resolva a causa."
- Corpo (Archivo 400, paper): O erro mais comum em CAPA: tratar a ação corretiva como se fosse a solução do problema imediato. O auditor quer ver que você entendeu por que o problema aconteceu — não apenas o que você fez para corrigir a ocorrência específica.
- Exemplo visual (dois blocos):
  - Bloco superior (silver, itálico, fundo hairline-dark): "NC: evidência de treinamento de segurança não encontrada." / Ação: "Reenviamos o certificado de treinamento." (símbolo ✗ em risk, ou X em risk color)
  - Bloco inferior (paper, fundo hairline-dark): "NC: evidência de treinamento de segurança não encontrada." / Causa raiz: "Processo de coleta de evidências pós-treinamento não estava documentado nem atribuído a um responsável." / Ação: "Criamos procedimento com responsável definido e alerta automático de coleta pós-treinamento." (símbolo ✓ em ok color)
- Rodapé (Archivo 400, silver): Sem causa raiz documentada, a NC vai se repetir. E a próxima vez é uma NC Maior.

### Slide 6 — O plano de ação (CAPA)
- **Objetivo:** detalhar o que um CAPA precisa conter para ser aceito pelo auditor — transformando o conceito em lista verificável.
- Eyebrow: `ETAPA 3 · O PLANO`
- Headline (Fraunces 600, paper): "O CAPA é um plano. Não um e-mail."
- Corpo (Archivo 400, paper): Um CAPA válido contém:
- Lista (Archivo 400, paper, bullets):
  - — Descrição da NC com referência ao requisito violado
  - — Análise de causa raiz documentada
  - — Ações corretivas específicas (o quê, quem, até quando)
  - — Ações preventivas (o que muda no processo para que não volte)
  - — Evidências planejadas para cada ação
  - — Critério de verificação de eficácia
- Rodapé (IBM Plex Mono 400, uppercase, silver): SEM AÇÕES PREVENTIVAS, O CAPA CORRIGE O PASSADO — MAS NÃO PROTEGE O FUTURO.

### Slide 7 — Implementação e evidências
- **Objetivo:** mostrar que a implementação das ações sem evidência equivale a não ter feito nada — conectando ao conceito de rastreabilidade.
- Eyebrow: `ETAPA 4 · IMPLEMENTAÇÃO`
- Headline (Fraunces 600, paper): "Fazer sem documentar é o mesmo que não fazer."
- Corpo (Archivo 400, paper): Em compliance, a ação que não tem evidência não aconteceu para o auditor. Para cada ação do CAPA:
- Lista (Archivo 400, paper):
  - — Documente a execução (data, responsável, o que foi feito)
  - — Colete a evidência correspondente (documento, print, ata, registro)
  - — Vincule a evidência ao CAPA — não a um arquivo avulso
- Separador hairline-dark
- Destaque (Archivo 500, gold-bright): A cadeia de custódia do CAPA é o que o auditor vai verificar na auditoria de vigilância.
- Rodapé (Archivo 400, silver): A rastreabilidade do ciclo é tão importante quanto a ação em si.

### Slide 8 — Verificação de eficácia e fechamento
- **Objetivo:** explicar o passo que mais frequentemente é pulado — verificar se o CAPA realmente resolveu o problema antes de fechá-lo.
- Eyebrow: `ETAPA 5 · VERIFICAÇÃO`
- Headline (Fraunces 600, paper): "Fechar o CAPA sem verificar a eficácia é o erro que cria a próxima não-conformidade."
- Corpo (Archivo 400, paper): Antes de fechar um CAPA, você precisa demonstrar que:
- Lista (Archivo 400, paper):
  - — A causa raiz foi efetivamente eliminada (não apenas mitigada)
  - — A mesma situação não se repetiu no período seguinte
  - — O processo corrigido está funcionando como esperado
- Separador hairline-dark
- Corpo adicional (Archivo 400, paper): A verificação de eficácia deve acontecer depois de um período razoável — não no dia seguinte ao da implementação. O prazo adequado depende do tipo de NC e do processo afetado.
- Rodapé (IBM Plex Mono 400, uppercase, silver): CAPA FECHADO SEM VERIFICAÇÃO = NC RECORRENTE NA PRÓXIMA AUDITORIA.

### Slide 9 — CTA
- **Objetivo:** converter o engajamento em save; ancorar a marca; criar expectativa para o conteúdo de sexta-feira.
- Eyebrow: `SALVA ESSE POST`
- Headline (Fraunces 600, paper): "Você vai usar isso na próxima auditoria."
- Corpo (Archivo 400, paper): O ciclo completo de CAPA: NC aberta → causa raiz → plano de ação → implementação com evidência → verificação de eficácia → fechamento.
- Handle: `@ars.compliance` (gold-bright, IBM Plex Mono 500)
- Logo: `logo-horizontal-dark.svg`, centralizado
- Teaser (Archivo 400, silver, menor): Amanhã: o que um auditor externo faz durante uma auditoria — desmistificando o processo.

---

## Direção de arte

Território visual INSTRUMENTO — rigor de manual operacional, não estética de apresentação corporativa. Fundo `ink` (#101014) em todos os 9 slides. Slide 3 usa as duas cores semânticas (nc e risk) de forma precisa e restrita: `--color-nc` (#8c3a3a) para NC Maior, `--color-risk` (#a3542e) para NC Menor — exatamente para o uso para o qual foram criadas (indicadores de status de não-conformidade). Slide 5 usa contraste de blocos (errado vs. correto) sem usar as cores semânticas como fundo — apenas como marcadores sutis (símbolo X ou check mark em uma linha antes do bloco).

### Aplicação da identidade visual
- Logo: `logo-horizontal-dark.svg`, clear space respeitado, largura mínima 160px — slides 1 e 9
- Cores: `--color-ink` (#101014) fundo · `--color-paper` (#faf8f4) texto principal · `--color-gold-bright` (#c6a44a) destaques/handle/numerações · `--color-silver` (#6e6e73) rodapés/eyebrows/texto secundário · `--color-hairline-dark` (#3a3a40) separadores/bordas · `--color-nc` (#8c3a3a) eyebrow de NC Maior (slide 3 apenas) · `--color-risk` (#a3542e) eyebrow de NC Menor (slide 3 apenas) — nenhuma outra cor adicionada, sem azul, sem gradiente, sem box-shadow
- Fontes: Fraunces 600 (headlines, mín. 18px) · Archivo 400/500 (corpo, bullets, destaques intermediários) · IBM Plex Mono 400/500 (eyebrows uppercase, destaques de dado e rodapés técnicos, letter-spacing ≥0.12em)
- Composição: `border-radius: 2px` em todos os elementos retangulares, espaçamento em múltiplos de 8px, margens mínimas 32px, dois blocos no slide 3 e no slide 5

### Imagens recomendadas
100% tipográfico e de composição. Slide 3: dois cards lado a lado com eyebrows coloridos (nc e risk). Slide 5: dois blocos empilhados (errado/correto) com marcador de check/X antes de cada bloco. Nenhuma fotografia ou ilustração. Se check marks e X marks forem usados: SVG stroke-only, stroke-width 1.5, viewBox 24×24, cores `--color-risk` (X) e `--color-ok` (check).

---

## Legenda

CAPA não é punição. É o processo documentado que prova que sua organização identifica problemas, entende as causas e evita recorrências.

O ciclo completo:
1. NC identificada e registrada com responsável e prazo
2. Análise de causa raiz (não apenas o sintoma)
3. Plano de ação com ações corretivas e preventivas
4. Implementação com evidência documentada
5. Verificação de eficácia antes do fechamento

O erro mais comum: fechar o CAPA sem verificar se o problema voltou a acontecer. Na próxima auditoria, o auditor vai verificar.

Salva — você vai usar isso na próxima auditoria.

## CTA

"Salva — você vai usar isso na próxima auditoria" — CTA MoFu de referência operacional. Ativa saves com promessa direta de utilidade futura. Correto para o perfil de Rafael, que frequentemente busca referências para consultar em momento de uso — não apenas para consumo imediato. Sem link, sem saída do app.

## Hashtags

7 hashtags — 3 Bloco A + 2 Bloco B + 2 Bloco C: `#compliance` `#auditoria` `#gestaoderisco` `#gestao` `#PME` `#compliancedigital` `#auditreadiness`

**Nota de rotação:** Bloco A com #gestaoderisco (ausente nas publicações anteriores desta semana). Bloco B retorna com #PME para ampliar o alcance em gestores de empresas menores.

## Palavras-chave

CAPA compliance · o que é CAPA ISO 27001 · ciclo de não-conformidade · análise de causa raiz auditoria · como fechar CAPA · NC Maior NC Menor · corrective action ISO · verificação de eficácia CAPA

## Texto alternativo (por slide)

1. Carrossel educativo, fundo escuro. Eyebrow mono: "ISO 27001 · CLAREZA". Título grande: "CAPA". Subtítulo: "Corrective and Preventive Action". Corpo em creme: "Como funciona o ciclo de não-conformidade de verdade." Destaque dourado mono: "NÃO É PUNIÇÃO. É O PROCESSO QUE PROVA QUE SUA ORGANIZAÇÃO APRENDE." Handle e logo ARS.
2. Fundo escuro. Eyebrow: "ONDE TUDO COMEÇA". Headline: "Uma não-conformidade é qualquer falha em atender a um requisito do SGSI." Lista em creme com quatro fontes de identificação de NC. Rodapé em cinza sobre a obrigatoriedade de CAPA para toda NC.
3. Fundo escuro. Eyebrow: "NC MAIOR VS. NC MENOR". Headline sobre impactos diferentes. Dois cards lado a lado: esquerdo com eyebrow vermelho escuro "NC MAIOR" — falha sistêmica, pode reprovar; direito com eyebrow laranja escuro "NC MENOR" — falha isolada, exige prazo. Rodapé mono em cinza sobre NC Major na ARS.
4. Fundo escuro. Eyebrow: "ETAPA 1 · O INÍCIO". Headline: "NC aberta. Relógio começa." Lista numerada com três ações imediatas. Destaque em dourado sobre responsável e prazo. Rodapé em cinza sobre a trilha de auditoria.
5. Fundo escuro. Eyebrow: "ETAPA 2 · CAUSA RAIZ". Headline: "Não resolva o sintoma. Resolva a causa." Dois blocos empilhados: superior com exemplo de ação incorreta (só corrige o sintoma), inferior com exemplo correto (identifica causa raiz e cria processo). Rodapé em cinza sobre recorrência.
6. Fundo escuro. Eyebrow: "ETAPA 3 · O PLANO". Headline: "O CAPA é um plano. Não um e-mail." Lista em creme com seis itens que um CAPA válido deve conter. Rodapé mono em cinza sobre ações preventivas.
7. Fundo escuro. Eyebrow: "ETAPA 4 · IMPLEMENTAÇÃO". Headline: "Fazer sem documentar é o mesmo que não fazer." Lista em creme com três requisitos de documentação. Destaque em dourado sobre cadeia de custódia do CAPA. Rodapé em cinza.
8. Fundo escuro. Eyebrow: "ETAPA 5 · VERIFICAÇÃO". Headline: "Fechar o CAPA sem verificar a eficácia é o erro que cria a próxima não-conformidade." Lista em creme com três critérios de verificação. Rodapé mono em cinza uppercase sobre CAPA sem verificação e NC recorrente.
9. Fundo escuro. Eyebrow: "SALVA ESSE POST". Headline: "Você vai usar isso na próxima auditoria." Resumo do ciclo em creme. Handle @ars.compliance em dourado. Logo ARS centralizado. Teaser sobre o conteúdo de amanhã.

---

## Validação de produto (`ars-product-truth` + `docs/product-context.md`)

| Afirmação | Status | Referência |
|---|---|---|
| "NC/CAPA" como módulo da plataforma ARS | IMPLEMENTADO | product-context.md "Já implementado": "Auditorias, Achados, NC/CAPA" |
| "NC Major zera a cobertura do controle afetado até que o CAPA seja resolvido" | IMPLEMENTADO | product-context.md "Audit Readiness Score Engine (pesos por criticidade, penalidade de NC Major com ImpactScope)" |
| Ciclo de CAPA (NC → causa raiz → plano → implementação → verificação) | FATO NORMATIVO | ISO 27001:2022, cláusula 10.1 — Nonconformity and corrective action |
| NC Maior vs. NC Menor e seus impactos na certificação | FATO NORMATIVO | Processo padrão de organismos de certificação acreditados |
| "MTTR — Mean Time to Resolve" como métrica de eficiência de CAPA | IMPLEMENTADO | product-context.md seção 12 "MTTR — Mean Time to Resolve" |
| "A cadeia de custódia do CAPA é o que o auditor vai verificar" | POSICIONAMENTO EDITORIAL — sem claim específico de funcionalidade | Princípio normativo de rastreabilidade, não claim de produto |
| Nenhuma menção a funcionalidades futuras | VALIDADO — ausente | — |
| Nenhuma promessa de aprovação garantida | VALIDADO — ausente | claim proibido não utilizado |

**Nota:** A referência ao NC Major com ImpactScope no slide 3 é um claim de produto IMPLEMENTADO. A referência a CAPA como módulo é explicitamente confirmada em product-context.md. O conteúdo é primariamente educativo sobre o conceito normativo — a conexão com o produto é restrita ao que está em produção.

## Validação de marca (`ars-brand-system`)

Fundo ink (#101014) em todos os 9 slides · gold-bright (#c6a44a) como único acento em fundos escuros · silver (#6e6e73) para rodapés e eyebrows · cores semânticas (nc/risk) utilizadas exclusivamente no slide 3 e para os fins corretos (indicadores de status de não-conformidade — exatamente para o que foram criadas) · ok/risk/nc não usados para UI geral · Fraunces/Archivo/IBM Plex Mono sem quarta família · border-radius 2px em todos os elementos retangulares · sem box-shadow, sem gradiente, sem azul · logo horizontal dark com clear space respeitado · IBM Plex Mono uppercase com letter-spacing ≥0.12em · Fraunces mínimo 18px em todos os slides.

## Métrica e hipótese

**Métrica principal:** save rate (benchmark: >3% bom, >5% excelente). CAPA é um processo que Rafael vai precisar consultar — conteúdo de referência operacional tem os maiores save rates entre os pilares.

**Hipótese:** carrossel de 9 slides sobre o ciclo de CAPA com hook de reposicionamento ("não é punição — é o processo que prova que sua organização aprende") gera save rate acima de 5%, porque combina dois gatilhos de alto valor: (1) reposicionamento de um conceito temido como algo estratégico — cria alívio em Rafael, e (2) estrutura de checklist que o leitor quer ter em mãos na próxima auditoria. Contribui para o Experimento 4 de `experiments.md` (carrossel 10 slides vs. 6 slides): aqui temos 9 slides de alta densidade — benchmark comparativo para profundidade de conteúdo.

---

*Produzido por `ars-social-content-producer` · validado contra `ars-product-truth` (NC/CAPA IMPLEMENTADO; NC Major com ImpactScope IMPLEMENTADO; MTTR IMPLEMENTADO), `ars-brand-system` (identidade visual integral; cores semânticas usadas apenas para indicadores de conformidade), `ars-organic-content-playbook` (Pilar CLAREZA · MoFu · carrossel 9 slides) · Semana 2 do piloto de 2 semanas.*
