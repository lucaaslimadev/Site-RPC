"""Checks generated pages, local links, assets and core content before visual QA."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
from urllib.request import urlopen
ROOT=Path(__file__).resolve().parent/'public'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.refs=[];self.ids=set();self.h1=0;self.title=False
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='title':self.title=True
  if 'id' in attrs:
   assert attrs['id'] not in self.ids,('Duplicate id',attrs['id'])
   self.ids.add(attrs['id'])
  if tag in ['a','script','img','link']:
   ref=attrs.get('href') or attrs.get('src')
   if ref:self.refs.append(ref)
pages={}
for f in ROOT.rglob('index.html'):
 page=Page();page.feed(f.read_text());assert page.h1==1,(f,page.h1);assert page.title,f
 pages[f]=page
resources=set()
for f,page in pages.items():
 for ref in page.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:continue
  path=unquote(u.path)
  target=(ROOT/path.lstrip('/')) if path else f
  if target.is_dir():target=target/'index.html'
  assert target.is_file(),(f,ref)
  if u.fragment:
   parsed=pages.get(target)
   assert parsed and u.fragment in parsed.ids,(f,ref)
  resources.add('/'+str(target.relative_to(ROOT)).replace('index.html',''))
import json
expected=8+len(json.loads((ROOT.parent/'services.json').read_text()))+len(json.loads((ROOT/'projects.json').read_text()))
assert len(pages)==expected,(len(pages),expected)
for resource in resources:
 with urlopen('http://localhost:8088'+resource,timeout=10) as response:assert response.status==200,resource
print(f'OK: {len(pages)} pages, {len(resources)} local HTTP resources, one H1 per page, unique IDs, internal links and anchors.')
