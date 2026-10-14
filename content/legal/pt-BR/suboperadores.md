Estes são os fornecedores que tratam dados pessoais para que o Audit Cockpits funcione:

| Fornecedor | Finalidade | Dados | Local | Salvaguarda |
|---|---|---|---|---|
| Railway | Hospedagem da plataforma (aplicação, banco de dados e provedor de identidade) | Dados da plataforma | União Europeia (Países Baixos) | Contrato e DPA do fornecedor |
| Railway | Hospedagem do site institucional | Pedidos de demonstração e inscrições na newsletter | Estados Unidos | Contrato, DPA do fornecedor e cláusulas contratuais padrão |
| Cloudflare | DNS, proteção na entrada do login, armazenamento de evidências e backups (R2) e encaminhamento dos e-mails recebidos | Tráfego em trânsito; evidências e backups; mensagens enviadas a dpo@ e suporte@ | Armazenamento na UE; rede de borda global | DPA do fornecedor e cláusulas contratuais padrão |
| Google (Gmail / Google Workspace) | Caixa de destino dos e-mails enviados a dpo@ e suporte@ | Pedidos de titulares e chamados de suporte | Estados Unidos e outros locais da infraestrutura do Google | Termos de proteção de dados do fornecedor e cláusulas contratuais padrão |
| Resend | Envio de e-mails transacionais (convites, ativação, alertas) e da newsletter do site | Nome, e-mail, conteúdo da notificação | Estados Unidos | DPA do fornecedor e cláusulas contratuais padrão |
| GitHub | Teste automático semanal de restauração de backups | Backups criptografados; durante o teste semanal de restauração, a cópia é descriptografada num ambiente temporário do GitHub Actions e descartada ao fim do teste | Estados Unidos | DPA do fornecedor e cláusulas contratuais padrão |

O provedor de identidade (login, senhas e MFA) é operado pelo próprio Audit Cockpits. Funcionalidades de
IA não estão ativas; se forem ativadas, o provedor será incluído aqui antes do uso.

**Como avisamos mudanças:** atualizamos esta página e enviamos e-mail aos administradores das empresas
clientes com antecedência mínima de **30 dias**, durante os quais é possível objetar (ver o
[DPA](legal:dpa), cláusula 6).

**Contato:** `dpo@auditcockpits.com`.
