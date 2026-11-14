"""Check a production directory and its HTTP deployment before/after cutover."""
import argparse
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import urlopen, build_opener, HTTPRedirectHandler

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('public',type=Path)
parser.add_argument('--base-url',required=True)
args=parser.parse_args()
root=args.public.resolve()
base=args.base_url.rstrip('/')
resources=set()

class Refs(HTMLParser):
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        ref=a.get('src') or a.get('href')
        if ref and ref.startswith('/'):
            resources.add(urlsplit(ref).path)

pages=list(root.rglob('index.html'))
assert len(pages)==26, len(pages)
for p in pages:
    text=p.read_text()
    route='/'+p.relative_to(root).parent.as_posix().replace('.','')
    if not route.endswith('/'):route+='/'
    resources.add(route)
    Refs().feed(text)
    if p.parent.name!='demo':
        assert 'noindex' not in text,p
        assert 'Versão local de desenvolvimento' not in text,p
        assert '<link rel="canonical"' in text,p
    with urlopen(base+route,timeout=15) as r:
        assert r.status==200,(route,r.status)
        assert r.read()==p.read_bytes(),('Page mismatch',route)
        assert 'noindex' not in r.headers.get('X-Robots-Tag',''),route

for p in root.rglob('*.css'):
    resources.update(re.findall(r'url\([\'"]?(/[^)\'"?]+)',p.read_text()))
resources.update(['/robots.txt','/sitemap.xml'])
for route in sorted(resources):
    with urlopen(base+route,timeout=15) as r:
        assert r.status==200,route
        local=root/route.lstrip('/')
        if local.is_file():
            assert hashlib.sha256(r.read()).digest()==hashlib.sha256(local.read_bytes()).digest(),route

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self,*a,**k):return None
opener=build_opener(NoRedirect)
redirects={'/rpc-dashboard':'/demo/','/automacao':'/servicos/automacao/',
           '/manutencao':'/servicos/manutencao/','/projetos-eletricos':'/servicos/engenharia-eletrica/',
           '/retrofit':'/servicos/retrofit/','/sistemas':'/servicos/sistemas/',
           '/treinamentos':'/servicos/treinamentos/','/roi-calculator':'/servicos/sistemas/'}
for p in json.loads((root/'projects.json').read_text()):
    redirects['/trabalhos/'+p['id']]='/projetos/'+p['id']+'/'
from urllib.error import HTTPError
for old,new in redirects.items():
    try:opener.open(base+old,timeout=15)
    except HTTPError as r:
        assert r.code==301,(old,r.code)
        assert urlsplit(r.headers['Location']).path==new,(old,r.headers['Location'])
    else:raise AssertionError(('Missing redirect',old))
print(f'OK: 26 production pages, {len(resources)} HTTP resources, exact content hashes, SEO headers and {len(redirects)} legacy redirects.')
