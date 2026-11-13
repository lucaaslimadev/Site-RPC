# Direção visual RP Caconde

A abertura usa “Potência. Controle. Inteligência.”, com uma palavra por linha e texto de apoio direto, sem travessões decorativos.

A página inicial reúne uma abertura cinematográfica, um percurso entre energia, controle e informação, exploração interativa das quatro especialidades principais, apresentação do acompanhamento pelo celular, projetos em composição assimétrica, detalhes de execução e contato. Os oito serviços e dez casos continuam com páginas próprias.

## Implementação

- `premium_views.py`: composição e conteúdo da página inicial.
- `public/premium.css`: direção visual, hierarquia, adaptações e transições.
- `project-covers.json`: índice e posição da foto de capa de cada projeto. As imagens integrais permanecem nas galerias.
- `public/app.js`: escolha de especialidades, teclado, alinhamento da energia à imagem, movimento opcional e interações existentes.
- `hero_energy.py`: trajetos dos pulsos sobre os fios, nas coordenadas originais de 1774 × 887 pixels.

As transições respeitam `prefers-reduced-motion`. A abertura possui controle de pausa conjunto para o pulso, as telas e os gráficos da IHM.

O impulso luminoso repete a cada seis segundos: sai dos cabos do motor, percorre os circuitos do painel e segue pelos cabos verdes do piso. Os trajetos usam as coordenadas da imagem original; imagem, luz e IHM compartilham o enquadramento em cada largura.

A IHM é projetada no vidro da porta, preservando a perspectiva e a moldura da arte. Alterna entre operação do motor, grandezas elétricas e produção, a cada seis segundos, em um ciclo de dezoito segundos. Os valores são demonstrativos; a tela possui a indicação “DEMO”. Os gráficos são animados junto com as telas.

Pausar preserva o instante dos pulsos, gráficos e transições. As animações também pausam fora da tela ou com a aba oculta. Com redução de movimento, a IHM mantém a tela de operação estática e os pulsos ficam ocultos. Os detalhes iluminados aparecem após a decodificação da imagem para evitar que surjam sobre uma arte ainda não carregada.

Não há download adicional de vídeo, rolagem controlada por JavaScript ou som automático. O celular possui composição vertical, e o enquadramento de tablet mantém a IHM visível.

## Arte institucional

Criada com a ferramenta nativa de geração de imagens (`imagegen`), sem CLI/API adicional. A composição é conceitual; não representa uma instalação executada. Essa distinção aparece no texto alternativo e nos créditos do site. Fotografias, telas e pranchas dos casos reais foram preservadas.

- Original: `public/assets/engenharia-conectada-hero.png`.
- Arquivo servido: `public/assets/engenharia-conectada-hero.jpg`.
- Paleta: petróleo `#102634`, tinta `#18343f`, branco frio `#f3f5f3`, prata e verde da marca `#cfde70`.
- Tipografia: IBM Plex Sans local, pesos 400 e 500; títulos de maior escala concentrados na abertura e na chamada final.

O prompt completo está em `HERO-PROMPT.md`.

## Revisão

Verificação dos 26 documentos, recursos e navegação local, fidelidade dos dez casos e das 72 mídias, sintaxe JavaScript e testes da demonstração. Revisão visual da abertura, soluções, projetos, galeria e páginas internas em desktop e em prévia móvel de 390 pixels. As abas de soluções também funcionam com setas, Home e End.
