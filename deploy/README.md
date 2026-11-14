# Publicação na VPS

A prévia local continua em `http://localhost:8088/`, com bloqueio de indexação. Gere os arquivos públicos de produção em uma pasta separada:

```sh
python3 build.py --production --output /caminho/release/public --site-url https://www.rpcaconde.com.br
cp deploy/Dockerfile deploy/nginx.conf deploy/compose.vps.yml deploy/verify.py /caminho/release/
```

O contexto de build contém esses quatro arquivos e `public/`. Empacote sem metadados específicos do macOS. Na VPS, os releases ficam em `/opt/rpc-site/releases/`. O Docker publica somente no endereço local `127.0.0.1` (porta padrão `13021`) e o Nginx existente encerra o HTTPS.

```sh
export RPC_SITE_RELEASE=nome-do-release
docker compose -f compose.vps.yml up -d --build
python3 verify.py public --base-url http://127.0.0.1:13021
```

Antes da troca, faça uma cópia da configuração ativa do Nginx do domínio e registre seu destino real. Altere apenas os dois upstreams das rotas institucionais de `rpcaconde.com.br` e `www.rpcaconde.com.br`, preservando ERP, ScadaBR, câmeras e outros domínios. Execute `nginx -t`, recarregue e confira a publicação:

```sh
python3 verify.py public --base-url https://www.rpcaconde.com.br
```

O verificador confere as 26 páginas, recursos por hash, cabeçalhos de indexação, conteúdo de produção e redirecionamentos antigos. A demo mantém noindex por usar dados fictícios.

O rollback consiste em restaurar a cópia da configuração anterior, executar `nginx -t` e recarregar o Nginx. Os serviços anteriores permanecem disponíveis; nenhuma base de dados é alterada.

## Atualização com duas versões em paralelo

Use uma pasta de release nova. Seu arquivo `.env` pode definir `RPC_SITE_RELEASE`, `RPC_SITE_PROJECT` e `RPC_SITE_PORT`. Escolha um projeto Docker e uma porta local livres para validar a nova versão antes de trocar o upstream institucional no Nginx. Mantenha o projeto e a configuração anteriores para retorno.

A versão de refinamento de 14/11/2026 usa o projeto `rpc-site-refined` e a porta local `13022`; a versão preta e verde anterior continua em `13021`.
