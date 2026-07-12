# Semana 2 · Quarta-feira — Carrossel (8 slides)

**Status:** Produzido como parte do piloto de 2 semanas — referência de qualidade: `semana-1-segunda-carrossel.md`
**Fonte:** `.claude/organic-strategy/editorial-calendar.md` — Semana 2, Quarta

---

## Ficha do conteúdo

| Campo | Valor |
|---|---|
| Tema do calendário | "SOA — Statement of Applicability: o que é, para que serve, quem assina" |
| Pilar | RASTREABILIDADE |
| Formato | Carrossel · 8 slides |
| Persona primária | Rafael — Compliance Manager sobrecarregado |
| Persona secundária | Fernanda — Consultora de compliance |
| Dor | Sabe que o SOA existe mas não entende o que deve conter, como manter atualizado e o que acontece se estiver errado na auditoria |
| Etapa do funil | Educação / Consideração (MoFu) |
| CTA do calendário | "Tem dúvida sobre o SOA? Me manda um direct" |
| Métrica principal | Saves + DMs recebidos |

## Justificativa do formato

O carrossel de 8 slides é o formato correto por três razões:

1. **O SOA tem dimensões múltiplas que precisam de progressão.** O que é → o que contém → por que o "Não Aplicável" exige justificativa → quem assina → o erro mais comum → como manter atualizado → CTA. Cada dimensão merece um slide — não um tópico em lista.
2. **MoFu + RASTREABILIDADE = conteúdo de referência.** Rafael vai salvar e voltar para este post quando precisar montar ou revisar o SOA. Save rate alto é o indicador esperado. Carrossel com profundidade real — não apenas definição superficial — é o que gera essa densidade de valor.
3. **O CTA de direct é ativado por conteúdo que gera dúvidas específicas.** "Tem dúvida sobre o SOA? Me manda um direct" só funciona se o conteúdo for preciso o suficiente para gerar uma pergunta de detalhe — não genérico o suficiente para resolver tudo sem dúvidas. 8 slides com esta estrutura equilibra ensino e abertura de diálogo.

## Mensagem principal

O SOA não é um formulário de compliance — é a declaração formal de quais controles se aplicam ao seu negócio, por qual razão, e como você os implementou. Sem SOA correto e atualizado, não existe ISO 27001.

## Hook

"O auditor externo vai pedir o SOA antes de qualquer outra coisa. Você sabe o que tem no seu?" — pergunta de autoavaliação que ativa o desconforto produtivo de Rafael. Quem tem o SOA mas não sabe exatamente o que está nele vai sentir urgência de continuar lendo.

---

## Conteúdo completo — slide a slide

### Slide 1 — Capa
- **Objetivo:** parar o scroll de Rafael e criar urgência específica — não genérica — sobre o SOA como documento crítico.
- Eyebrow: `ISO 27001 · RASTREABILIDADE`
- Headline (Fraunces 600, paper): "SOA"
- Sub-headline (Fraunces 400, paper): Statement of Applicability
- Corpo (Archivo 400, paper): O documento que o auditor vai pedir antes de qualquer outra coisa.
- Destaque (IBM Plex Mono 500, gold-bright): O QUE É · PARA QUE SERVE · QUEM ASSINA
- Handle: `@ars.compliance` — canto inferior esquerdo, silver
- Logo: `logo-horizontal-dark.svg`, canto inferior direito

### Slide 2 — O que é o SOA (tradução humana)
- **Objetivo:** entregar a definição que Rafael vai usar para explicar o SOA para o CEO — em linguagem de negócios, não normativa.
- Eyebrow: `O QUE É`
- Headline (Fraunces 600, paper): "A declaração formal de quais controles de segurança se aplicam ao seu negócio — e por quê."
- Separador hairline-dark
- Corpo (Archivo 400, paper): Toda ISO 27001 tem um conjunto de controles de segurança no Anexo A. O SOA declara, para cada um desses controles:
- Lista (Archivo 400, paper):
  - — Se ele é aplicável à sua organização ou não
  - — Por qual razão (justificativa de inclusão ou exclusão)
  - — Como ele está sendo implementado (se aplicável)
- Rodapé (Archivo 400, silver): O SOA transforma a norma genérica em decisão documentada da sua organização.

### Slide 3 — O que o SOA deve conter
- **Objetivo:** tornar os campos obrigatórios do SOA concretos e verificáveis — Rafael deve conseguir olhar para o seu SOA e dizer se está completo.
- Eyebrow: `O QUE DEVE CONTER`
- Headline (Fraunces 600, paper): "Para cada controle: quatro campos. Sem exceção."
- Quatro cards (border-radius 2px, fundo hairline-dark, padding 16px, gap 8px):
  - Card 1 — `01` (IBM Plex Mono 500, gold-bright) · **Controle** (Archivo 500, paper) · Identificação do controle (número e nome conforme o Anexo A da norma)
  - Card 2 — `02` (IBM Plex Mono 500, gold-bright) · **Aplicabilidade** (Archivo 500, paper) · Aplicável ou Não Aplicável — decisão binária
  - Card 3 — `03` (IBM Plex Mono 500, gold-bright) · **Justificativa** (Archivo 500, paper) · Por que foi incluído ou excluído — obrigatório em ambos os casos
  - Card 4 — `04` (IBM Plex Mono 500, gold-bright) · **Status de implementação** (Archivo 500, paper) · Como está sendo implementado (para controles aplicáveis)
- Rodapé (Archivo 400, silver): Controle sem justificativa é o erro mais comum — e o auditor vai encontrar.

### Slide 4 — Por que "Não Aplicável" precisa de justificativa
- **Objetivo:** resolver o equívoco mais frequente — que marcar um controle como NA é simples e não requer explicação. Este slide é o que Rafael vai mostrar para a equipe que está montando o SOA.
- Eyebrow: `O ERRO MAIS COMUM`
- Headline (Fraunces 600, paper): "Marcar um controle como Não Aplicável sem justificativa é uma não-conformidade em potencial."
- Corpo (Archivo 400, paper): Quando você declara que um controle não se aplica ao seu negócio, você está fazendo uma afirmação com consequências. O auditor vai perguntar: por quê?
- Dois blocos de contraste:
  - Bloco superior (silver, itálico, fundo hairline-dark, border-radius 2px): "Controle 5.7 — Inteligência de ameaças: Não Aplicável."
  - Seta descendente (SVG stroke-only, gold-bright)
  - Bloco inferior (paper, fundo hairline-dark mais claro): "Controle 5.7 — Não Aplicável. Justificativa: empresa não opera em setor com ameaças avançadas persistentes e não possui equipe dedicada de threat intelligence. Escopo limitado a PME de tecnologia sem infra crítica."
- Rodapé (Archivo 400, silver): Sem justificativa, o auditor pode inferir que a exclusão foi por negligência — não por decisão informada.

### Slide 5 — Quem assina o SOA
- **Objetivo:** responder a pergunta de governança que Rafael frequentemente se faz — quem tem a autoridade formal para aprovar o SOA.
- Eyebrow: `GOVERNANÇA · QUEM ASSINA`
- Headline (Fraunces 600, paper): "O SOA precisa ser aprovado por quem tem autoridade para tomar decisões de segurança."
- Corpo (Archivo 400, paper): Não existe uma regra única — a norma exige que o SOA reflita decisões da liderança. Na prática:
- Lista (Archivo 400, paper):
  - — CISO ou responsável de segurança da informação (quando existe)
  - — Compliance Officer ou gestor do SGSI (na maioria das PMEs)
  - — CEO ou Diretor, quando a empresa não tem função dedicada
- Rodapé (IBM Plex Mono 400, uppercase, silver): A ASSINATURA NÃO É FORMALIDADE — É EVIDÊNCIA DE QUE A LIDERANÇA ENDOSSA AS DECISÕES DE ESCOPO.
- Nota (Archivo 400, silver, menor): Em empresas com conselho ou comitê de segurança, o SOA pode exigir aprovação formal nesse nível.

### Slide 6 — O SOA na auditoria
- **Objetivo:** criar urgência específica mostrando o que acontece quando o SOA está errado ou desatualizado no momento da auditoria.
- Eyebrow: `NA AUDITORIA`
- Headline (Fraunces 600, paper): "O auditor não vai aceitar um SOA que não bate com a implementação real."
- Corpo (Archivo 400, paper): Duas situações que geram não-conformidade imediata:
- Lista numerada (Archivo 400, paper):
  - 1. SOA declara controle como Aplicável, mas não existe evidência de implementação
  - 2. SOA declara controle como Não Aplicável, mas o auditor identifica que ele é necessário para o escopo declarado
- Separador hairline-dark
- Destaque (IBM Plex Mono 500, gold-bright): SOA INCONSISTENTE = NC POTENCIAL
- Rodapé (Archivo 400, silver): O SOA é o contrato entre sua organização e a norma. Qualquer descasamento será explorado.

### Slide 7 — Como manter o SOA atualizado
- **Objetivo:** mostrar que o SOA é um documento vivo, não um artefato produzido uma vez — conectando naturalmente ao conceito de Continuous Compliance e, de forma suave, à gestão de controles na ARS.
- Eyebrow: `COMO MANTER ATUALIZADO`
- Headline (Fraunces 600, paper): "O SOA precisa ser revisado sempre que o escopo do SGSI mudar."
- Corpo (Archivo 400, paper): Gatilhos para revisão do SOA:
- Lista (Archivo 400, paper):
  - — Nova área de negócio ou produto incluído no escopo
  - — Mudança tecnológica relevante (novo sistema, migração de infraestrutura)
  - — Resultado de auditoria interna que identifica controles mal classificados
  - — Renovação anual do ciclo de certificação
- Separador hairline-dark
- Corpo adicional (Archivo 400, silver): Na plataforma ARS, a aplicabilidade de cada controle é gerenciada diretamente no cadastro do controle — o SOA é dinâmico e reflete o estado atual, não uma declaração feita uma vez na implantação.
- Rodapé (Archivo 400, silver): Um SOA desatualizado é quase tão problemático quanto não ter um.

### Slide 8 — CTA
- **Objetivo:** abrir canal de diálogo direto com Rafael; ancorar a marca como fonte de resposta para dúvidas específicas de compliance.
- Eyebrow: `TEM DÚVIDA SOBRE O SOA?`
- Headline (Fraunces 600, paper): "Me manda um direct."
- Corpo (Archivo 400, paper): SOA com escopo mal definido, justificativas incompletas ou controles classificados errado são problemas comuns — e resolvíveis antes da auditoria.
- Handle: `@ars.compliance` (gold-bright, IBM Plex Mono 500)
- Logo: `logo-horizontal-dark.svg`, centralizado
- Teaser (Archivo 400, silver, menor): Próxima quarta: CAPA — como funciona o ciclo completo de não-conformidade.

---

## Direção de arte

Território visual INSTRUMENTO — precisão de documento técnico, não estética de infográfico empresarial. Fundo `ink` (#101014) em todos os 8 slides. O slide 3 (os 4 campos) e o slide 6 (as 2 situações de NC) têm a maior densidade visual — usar espaçamento generoso (padding 16px mínimo nos cards) para não comprometer a leitura mobile. O slide 4 tem a seta descendente como único elemento iconográfico — SVG stroke-only, linha gold-bright indicando progressão de "errado" para "correto".

### Aplicação da identidade visual
- Logo: `logo-horizontal-dark.svg`, clear space respeitado, largura mínima 160px, nunca rotacionada — slides 1 e 8
- Cores: `--color-ink` (#101014) fundo · `--color-paper` (#faf8f4) texto principal · `--color-gold-bright` (#c6a44a) numerações/destaques/handle · `--color-silver` (#6e6e73) eyebrows/rodapés · `--color-hairline-dark` (#3a3a40) bordas/separadores/fundo de cards — sem azul, sem gradiente, sem box-shadow · cores semânticas (ok/risk/nc) não utilizadas diretamente neste conteúdo exceto se houver referência futura a score
- Fontes: Fraunces 600 (headlines, mín. 18px) · Archivo 400/500 (corpo e bullets) · IBM Plex Mono 400/500 (eyebrows uppercase, destaques de dado, rodapés de destaque, letter-spacing ≥0.12em)
- Composição: `border-radius: 2px` em todos os elementos retangulares, gap-px pattern nos cards do slide 3, espaçamento em múltiplos de 8px, margem mínima 32px

### Imagens recomendadas
100% tipográfico e de composição. Slide 3: quatro cards numerados, ocupação de toda a área útil do slide. Slide 4: dois blocos de contraste com seta SVG entre eles. Slide 6: dois itens de lista numerada com destaque mono. Nenhuma fotografia, nenhuma ilustração. Seta SVG (slide 4): stroke-only, stroke-width 1.5, stroke-linecap round, cor gold-bright, viewBox 24×24.

---

## Legenda

O Statement of Applicability — SOA — é o documento que declara quais controles de segurança se aplicam ao seu negócio e por quê.

Para cada controle do Anexo A da ISO 27001: aplicabilidade (sim ou não), justificativa (obrigatória nos dois casos) e status de implementação.

O erro mais comum: marcar um controle como "Não Aplicável" sem explicar o motivo. O auditor vai perguntar.

O SOA precisa ser assinado por quem tem autoridade para tomar decisões de segurança na organização. E precisa ser revisado sempre que o escopo mudar.

Tem dúvida sobre o SOA? Me manda um direct.

## CTA

"Tem dúvida sobre o SOA? Me manda um direct" — CTA MoFu de conversação. Abre canal de DM sem exigir link, alinhado ao estágio de consideração. O Rafael que chegou até o slide 8 tem uma dúvida específica — não uma dúvida genérica. Este CTA converte essa especificidade em contato qualificado.

## Hashtags

7 hashtags — 3 Bloco A + 2 Bloco B + 2 Bloco C: `#ISO27001` `#auditoria` `#GRC` `#gestao` `#governanca` `#auditreadiness` `#compliancecontinuo`

**Nota de rotação:** variação em relação à segunda-feira — substitui #compliance e #segurancadainformacao por #auditoria e #GRC (mais específicos para MoFu); Bloco B com #governanca em vez de #startups.

## Palavras-chave

SOA Statement of Applicability · o que é SOA ISO 27001 · como preencher SOA · controles Anexo A ISO 27001 · não aplicável ISO 27001 · quem assina SOA · SOA auditoria · como manter SOA atualizado

## Texto alternativo (por slide)

1. Carrossel educativo, fundo escuro. Eyebrow mono: "ISO 27001 · RASTREABILIDADE". Título grande: "SOA". Subtítulo: "Statement of Applicability". Corpo: "O documento que o auditor vai pedir antes de qualquer outra coisa." Destaque dourado mono: "O QUE É · PARA QUE SERVE · QUEM ASSINA". Handle e logo ARS.
2. Fundo escuro. Eyebrow: "O QUE É". Headline: "A declaração formal de quais controles de segurança se aplicam ao seu negócio — e por quê." Lista em creme com três itens: aplicabilidade, justificativa, implementação. Rodapé em cinza.
3. Fundo escuro. Eyebrow: "O QUE DEVE CONTER". Headline: "Para cada controle: quatro campos. Sem exceção." Quatro cards com numeração dourada: 01 Controle, 02 Aplicabilidade, 03 Justificativa, 04 Status de implementação.
4. Fundo escuro. Eyebrow: "O ERRO MAIS COMUM". Headline: "Marcar um controle como Não Aplicável sem justificativa é uma não-conformidade em potencial." Dois blocos de contraste: bloco superior em cinza com exemplo incompleto, seta descendente em dourado, bloco inferior com exemplo correto com justificativa completa.
5. Fundo escuro. Eyebrow: "GOVERNANÇA · QUEM ASSINA". Headline: "O SOA precisa ser aprovado por quem tem autoridade para tomar decisões de segurança." Lista em creme: CISO, Compliance Officer, CEO. Rodapé mono em cinza uppercase sobre a assinatura como evidência.
6. Fundo escuro. Eyebrow: "NA AUDITORIA". Headline: "O auditor não vai aceitar um SOA que não bate com a implementação real." Lista numerada com duas situações de NC. Destaque dourado mono: "SOA INCONSISTENTE = NC POTENCIAL".
7. Fundo escuro. Eyebrow: "COMO MANTER ATUALIZADO". Headline: "O SOA precisa ser revisado sempre que o escopo do SGSI mudar." Lista em creme com quatro gatilhos de revisão. Parágrafo em cinza sobre gestão de SOA na plataforma ARS.
8. Fundo escuro. Eyebrow: "TEM DÚVIDA SOBRE O SOA?". Headline: "Me manda um direct." Corpo em creme. Handle @ars.compliance em dourado. Logo ARS centralizado. Teaser em cinza.

---

## Validação de produto (`ars-product-truth` + `docs/product-context.md`)

| Afirmação | Status | Referência |
|---|---|---|
| SOA como documento obrigatório da ISO 27001 | FATO NORMATIVO | ISO/IEC 27001:2022, cláusula 6.1.3(d) |
| Quatro campos por controle (identificação, aplicabilidade, justificativa, status) | FATO NORMATIVO | ISO/IEC 27001:2022, cláusula 6.1.3 |
| "Não Aplicável" exige justificativa | FATO NORMATIVO | ISO 27001 exige justificativas de exclusão — auditores verificam |
| "Controles com SOA" na plataforma ARS | IMPLEMENTADO | product-context.md "Já implementado": "Controles com SOA, Atividades (CRUD), Evidências" |
| "Na plataforma ARS, a aplicabilidade de cada controle é gerenciada diretamente no cadastro do controle" | IMPLEMENTADO | product-context.md confirma controles com SOA em produção |
| SOA inconsistente = NC potencial | FATO NORMATIVO | Alinhado com definição de não-conformidade da ISO 27001 |
| Nenhuma menção a funcionalidades futuras | VALIDADO — ausente | — |
| Nenhuma promessa de aprovação garantida | VALIDADO — ausente | claim proibido não utilizado |

## Validação de marca (`ars-brand-system`)

Fundo ink (#101014) em todos os 8 slides — série coesa · gold-bright (#c6a44a) como único acento em fundos escuros · silver (#6e6e73) para rodapés e eyebrows · cores semânticas (ok/risk/nc) não utilizadas neste slide — correto · Fraunces/Archivo/IBM Plex Mono sem quarta família · border-radius 2px em todos os elementos retangulares · gap-px pattern no slide 3 (quatro cards) · seta SVG stroke-only 1.5px no slide 4 · sem box-shadow, sem gradiente, sem azul · logo horizontal dark com clear space respeitado · IBM Plex Mono uppercase com letter-spacing ≥0.12em nos eyebrows e destaques · Fraunces mínimo 18px.

## Métrica e hipótese

**Métrica principal:** save rate (benchmark: >3% bom, >5% excelente) + número de DMs recebidos sobre SOA.

**Hipótese:** carrossel de profundidade sobre SOA com CTA de conversação (direct) gera maior número de DMs qualificados que conteúdos com CTA de link, porque a especificidade do tema filtra naturalmente para Rafael (Compliance Manager) que está ativamente preparando ou revisando a documentação ISO 27001. Dúvidas sobre SOA são recorrentes e específicas — a abertura do canal de direct é um teste de demanda qualificada pré-produto.

---

*Produzido por `ars-social-content-producer` · validado contra `ars-product-truth` (menção de SOA na ARS como IMPLEMENTADO, sem claims não verificados), `ars-brand-system` (identidade visual integral), `ars-organic-content-playbook` (Pilar RASTREABILIDADE · MoFu · carrossel 8 slides) · Semana 2 do piloto de 2 semanas.*
