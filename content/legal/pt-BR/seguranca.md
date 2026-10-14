Uma plataforma de prontidão para auditoria precisa ser, ela própria, auditável. Estes são os controles
que aplicamos hoje.

## Acesso e identidade
- Login centralizado com padrões abertos (OIDC), em provedor de identidade operado por nós.
- **Segundo fator (MFA) obrigatório** para contas administrativas e política de senha forte.
- Convites por link de ativação de **uso único, válido por 72 horas**; nunca enviamos senha por e-mail.
- Permissões por papel; consultorias e auditores externos só acessam com autorização com prazo, papel
  limitado e revogação a qualquer momento pelo administrador do cliente.

## Isolamento e dados
- Cada organização é isolada em todas as consultas, com **testes automáticos** que verificam que não há
  vazamento entre clientes.
- Plataforma hospedada na **União Europeia** (Países Baixos); criptografia em trânsito (HTTPS) em todas
  as conexões; banco de dados sem acesso público.
- Evidências acessíveis apenas por **links temporários assinados (até 15 minutos)**. Arquivos enviados
  passam por uma área de quarentena e têm sua integridade registrada pelo servidor.

## Continuidade
- **Backups diários criptografados** dos bancos, protegidos contra exclusão por 35 dias, com **teste
  automático semanal de restauração**.
- Proteções automáticas contra erros de configuração entre ambientes.

## Rastreabilidade
- **Trilha de auditoria** com cadeia de integridade verificável.
- Registro de eventos de login e de ações administrativas, com alertas operacionais.
- Procedimento formal de resposta a incidentes; clientes afetados são comunicados em até 48 horas após a
  confirmação (ver [DPA](legal:dpa)).

## Responsabilidade compartilhada

| Audit Cockpits | Cliente |
|---|---|
| Infraestrutura, isolamento, criptografia, backups, trilha de auditoria | Quem é convidado e com qual papel; remover quem sai |
| Disponibilizar e exigir MFA para administradores | Manter MFA e proteger credenciais e dispositivos |
| Controles de acesso de consultorias (prazo, teto, revogação) | Revisar e revogar autorizações de consultorias |
| Proteger o conteúdo armazenado | Não enviar dados sensíveis ou desnecessários; licitude do conteúdo |

## Políticas internas

O programa de segurança segue um conjunto de políticas alinhadas à ISO/IEC 27001 e ao SOC 2 (controle de
acesso, criptografia, backup, logs, vulnerabilidades, desenvolvimento seguro, fornecedores, continuidade,
classificação da informação e incidentes). Clientes podem pedir os resumos sob acordo de
confidencialidade.

## Reportar uma vulnerabilidade

Encontrou algo? Escreva para **`dpo@auditcockpits.com`** e siga a
[Política de Divulgação Responsável](legal:divulgacao-responsavel).
