# Direção visual RP Caconde

A página inicial reúne uma abertura cinematográfica, um percurso entre energia, controle e informação, exploração interativa das quatro especialidades principais, apresentação do acompanhamento pelo celular, projetos em composição assimétrica, detalhes de execução e contato. Os oito serviços e dez casos continuam com páginas próprias.

## Implementação

- `premium_views.py`: composição e conteúdo da página inicial.
- `public/premium.css`: direção visual, hierarquia, adaptações e transições.
- `project-covers.json`: índice e posição da foto de capa de cada projeto. As imagens integrais permanecem nas galerias.
- `public/app.js`: escolha de especialidades, teclado, movimento opcional e interações existentes.

As transições respeitam `prefers-reduced-motion`. A abertura possui controle de pausa. O fluxo de sinal pausa quando está fora da tela. Não há rolagem controlada por JavaScript, som automático ou vídeo obrigatório. No celular, o enquadramento e a composição da abertura são próprios para a tela vertical.

## Arte institucional

Criada com a ferramenta nativa de geração de imagens (`imagegen`), sem CLI/API adicional. A composição é conceitual; não representa uma instalação executada. Essa distinção aparece no texto alternativo e nos créditos do site. Fotografias, telas e pranchas dos casos reais foram preservadas.

- Original: `public/assets/engenharia-conectada-hero.png`.
- Arquivo servido: `public/assets/engenharia-conectada-hero.jpg`.
- Paleta: petróleo `#102634`, tinta `#18343f`, branco frio `#f3f5f3`, prata e verde da marca `#cfde70`.
- Tipografia: IBM Plex Sans local, pesos 400 e 500; títulos de maior escala concentrados na abertura e na chamada final.

O prompt completo está em `HERO-PROMPT.md`.

## Revisão

Verificação dos 26 documentos, recursos e navegação local, fidelidade dos dez casos e das 72 mídias, sintaxe JavaScript e testes da demonstração. Revisão visual da abertura, soluções, projetos, galeria e páginas internas em desktop e em prévia móvel de 390 pixels. As abas de soluções também funcionam com setas, Home e End.
