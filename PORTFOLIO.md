# Portfólio RP Caconde

Reconstrução local dos dez trabalhos apresentados em https://www.rpcaconde.com.br/portfolio. As páginas preservam os títulos, resumos, descrições completas, entregas e todos os arquivos de cada galeria original. Os registros foram organizados com legendas, miniaturas, filtros por tipo, ampliação, zoom até 400% e acesso ao arquivo original.

| Trabalho | Fotos | Telas | Pranchas |
| --- | ---: | ---: | ---: |
| Inspeção e laudos de bancos de capacitores | 7 | 0 | 0 |
| Sistema de gestão integrada | 0 | 3 | 0 |
| Estação elevatória de esgoto | 9 | 0 | 2 |
| Estação pressurizadora de água | 9 | 0 | 0 |
| Poço artesiano com telemetria | 5 | 0 | 2 |
| Secador de café | 7 | 0 | 3 |
| Seladora com controle de temperatura | 4 | 0 | 1 |
| Retrofit de prensa | 9 | 0 | 2 |
| Painel de bombas com revezamento | 6 | 0 | 2 |
| Painel de proteção de motor | 1 | 0 | 0 |
| **Total** | **57** | **3** | **12** |

Os 72 arquivos foram copiados sem edição ou geração de imagens. As telas e mockups do sistema são os publicados pela empresa; a demonstração interativa local possui dados fictícios e tem acesso separado. A comparação do retrofit usa fotografias do painel existente e da nova montagem presentes no trabalho original.

## Arquivos de conteúdo

- `public/projects.json`: conteúdo editável e lista completa `media` de cada trabalho.
- `public/assets/portfolio/`: fotografias, telas e documentos locais; preservam os nomes originais.
- `PORTFOLIO-SOURCES.json`: registro da importação, URLs e SHA-256 dos arquivos, utilizado para verificar fidelidade.
- `portfolio_views.py`: HTML das capas, páginas, galerias, interfaces e documentação.
- `public/portfolio.css` e `public/app.js`: aparência e interação.

Cada item de `media` precisa de `src`, `width`, `height`, `kind`, `caption` e `alt`. Use `foto` para registros da execução, `interface` para telas ou mockups e `projeto` para desenhos e diagramas. Os campos `source`, `sourceName`, `bytes` e `sha256` documentam a origem da importação. Por padrão, a primeira mídia é a capa. `project-covers.json` pode escolher outro índice da coleção e a posição do enquadramento apenas para as capas. Todas as mídias continuam integrais nas galerias. A categoria do trabalho controla o filtro do portfólio; os tipos de mídia controlam o filtro dentro da galeria.

A ordem em `projects.json` define a sequência do portfólio. `related` relaciona trabalhos existentes; em `services.json`, a mesma chave define os exemplos de cada serviço. Projetos futuros podem ser acrescentados sem reescrever páginas HTML.

## Gerar e verificar

```sh
python3 build.py
python3 check_site.py
python3 tests/check_portfolio.py
node --check public/app.js
```

O último teste de conteúdo confere os dez projetos importados contra o registro de origem, todos os textos e todas as 72 mídias renderizadas, incluindo o SHA-256 de cada arquivo. Ao editar conteúdo editorial ou adicionar trabalhos, revise esse teste e mantenha o registro da importação original como histórico.

O site permanece em http://localhost:8088/portfolio/, servido pelo Docker local. Esta etapa não publica alterações no domínio da empresa.
