## 1. Situação atual

Em 13/10/2026, as funcionalidades de IA generativa da **plataforma** Audit Cockpits **não estão ativas**
em produção: não há provedor de IA configurado. O código prevê duas funções de apoio, ainda sem tela
para o usuário: análise de lacunas com texto explicativo e sugestão de controles (esta responde "não
disponível" até existir busca semântica).

No **site institucional**, a seção de notícias (ISO Radar) usa IA para redigir resumos de notícias
públicas sobre normas, com revisão humana antes de publicar. Nenhum dado pessoal é usado.

## 2. Princípios (valem para qualquer ativação futura)

1. **IA como copiloto:** a IA sugere e explica; **nunca toma decisão de compliance**, não aprova
   evidências, não muda status de controles, nem altera o score.
2. **Ação humana:** a IA só roda quando um usuário pede, e o resultado é apresentado como sugestão.
3. **Transparência:** conteúdo gerado por IA é identificado como tal na interface.
4. **Rastreabilidade:** cada chamada registra o pedido e a resposta, com modelo e uso, por 2 anos.
5. **Minimização:** só o necessário vai para o provedor; dados sensíveis não são enviados.
6. **Sem treino com dados de clientes:** o provedor contratado não pode usar os dados enviados para
   treinar modelos.
7. **Plano e escolha do cliente:** a IA só funciona para clientes cujo plano a inclua.
8. **Antes de ativar:** RIPD/DPIA (procedimento), inclusão do provedor na
   lista de suboperadores com o aviso prévio do DPA, e atualização da Política de Privacidade.

## 3. Classificação no AI Act

As funções previstas são de apoio à documentação de compliance, sem decisão automatizada sobre pessoas.
Nossa avaliação preliminar é que não se enquadram como sistemas de **alto risco** (Anexo III do AI Act);
aplicam-se as obrigações de transparência do art. 50 quando houver interação ou conteúdo gerado.

## 4. Uso interno de IA no desenvolvimento

A empresa usa agentes de IA para desenvolver o software. Eles não recebem segredos nem dados de
clientes, e todas as mudanças passam por revisão e aprovação humana
(Desenvolvimento Seguro).

## 5. Contato

Dúvidas e pedidos de revisão humana: **dpo@auditcockpits.com**.
