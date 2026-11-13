# RPC Suite — demonstração interativa

Endereço local: **http://localhost:8088/demo/**. O endereço `/rpc-dashboard` também redireciona para a demo após iniciar o container com a configuração atualizada.

A demo usa o mesmo Docker do site institucional. Não há servidor de aplicação, credenciais de produção, chamadas a CLPs ou conexão com dados reais.

## O que o visitante pode explorar

1. **Visão geral:** eficiência global, produção, disponibilidade, qualidade, tendência do turno ou semana, alertas e ordens.
2. **Equipamentos:** busca por código, área ou nome; filtro por estado; detalhes, variáveis e tendência de cada ativo.
3. **Supervisão:** sinótico clicável de tanque, misturador e envase. Os pontos abrem detalhes e manutenção relacionada.
4. **Ordens de produção:** criação de registros fictícios, início, conclusão e progresso ao avançar o cenário.
5. **Manutenção:** solicitação por equipamento, checklist, conclusão e registros no histórico.
6. **Energia:** consumo, demanda, distribuição por área e estimativa de custo pela tarifa configurada.
7. **Estoque:** materiais, mínimos, pesquisa e entradas de exemplo, que atualizam a disponibilidade.
8. **Análises e OEE:** composição do indicador e leitura das perdas de tempo.
9. **Relatórios:** CSV de indicadores, ordens, manutenção, energia, estoque e histórico. Dados refletem as ações do visitante.
10. **Perfis de acesso:** exemplos de responsabilidades com pessoas fictícias. Não existe autenticação ou aplicação real de permissões.
11. **Histórico:** ações realizadas na demonstração e registros de referência.
12. **Configurações:** temperatura de atenção do misturador e tarifa ilustrativa. Os parâmetros afetam os módulos correspondentes.

O botão **Explorar em 2 minutos** inicia uma apresentação de cinco etapas. A busca superior localiza equipamentos, ordens, solicitações e materiais.

## Experimente uma jornada

- Abra a supervisão e selecione o misturador.
- Consulte a temperatura e registre ciência da condição. O alerta permanece enquanto a variável estiver acima do limite; registrar ciência não é corrigir a condição.
- Abra a manutenção relacionada, marque o checklist e conclua a solicitação fictícia.
- Consulte o histórico para ver as ações.
- Crie uma ordem de produção de exemplo e veja o plano mudar na visão geral.
- Avance o cenário para simular cinco minutos e até 120 unidades em uma ordem ativa.
- Consulte o estoque, registre uma entrada e veja mudar a quantidade de itens abaixo do mínimo.
- Baixe um relatório CSV e reinicie o exemplo quando quiser.

## Coerência do cenário

O cenário inicial tem seis ativos, três ordens e produção acumulada de 4.860 unidades para um plano de 6.000. O OEE é calculado como disponibilidade × performance × qualidade: 94% × 92,8% × 98,6% = aproximadamente 86,0%. As perdas ilustrativas somam 28,8 minutos em uma janela de 480 minutos, correspondentes à disponibilidade de 94%.

Concluir uma ordem preenche a quantidade restante. A envasadora não aceita duas ordens simultâneas no exemplo. Sem ordem ativa, os equipamentos da etapa de envase ficam disponíveis. O compressor em manutenção é um equipamento de reserva, para não sugerir que a linha dependa de um compressor parado.

Esses números representam um exemplo de leitura de indicadores; não constituem resultado de cliente, capacidade garantida ou promessa de performance.

## Persistência e reinício

Os registros são salvos no `localStorage` deste navegador, sob a chave `rpc-suite-premium-demo-v1`. Recarregar a página mantém as ações. O botão **Reiniciar exemplo** restaura os registros fictícios iniciais. Navegadores sem armazenamento disponível podem usar a demo na sessão atual.

Não digite informações confidenciais em registros de demonstração. O próprio formulário orienta o uso de dados fictícios. O contato da empresa é um link explícito e externo ao cenário.

## Arquivos

- `public/demo/index.html`: estrutura da aplicação.
- `public/demo/demo.css`: identidade visual e adaptação ao celular.
- `public/demo/demo.js`: telas, navegação, formulários e interações.
- `public/demo/model.js`: dados, regras do cenário e geração de relatórios.
- `tests/demo-model.test.mjs`: nove testes de produção, alertas, manutenção, estoque, parâmetros e CSV.

Não há dependências JavaScript a instalar. Execute os testes com:

```sh
node --test tests/demo-model.test.mjs
```

O site institucional liga a demo pelo menu, pela página inicial, pela área de sistemas, pela seção de acompanhamento móvel e pelo rodapé. O gerador `build.py` preserva os arquivos da demo.

## Referência e limites

A demo anterior da empresa foi usada para entender a cobertura dos módulos: https://www.rpcaconde.com.br/rpc-dashboard. A nova interface e o cenário foram construídos para esta versão local.

É uma demonstração comercial interativa, não um sistema industrial de produção. Autenticação, integrações, armazenamento de servidor, notificações externas e comandos remotos precisam de implementação própria em um projeto real. Não houve alteração ou publicação no site da empresa nem no VPS.
