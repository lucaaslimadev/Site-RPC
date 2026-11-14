"""Portfolio presentation. Original descriptions and media live in projects.json."""
import html,json
from collections import Counter
from pathlib import Path
COVERS=json.loads((Path(__file__).parent/"project-covers.json").read_text())
STORIES=json.loads((Path(__file__).parent/"project-stories.json").read_text())

def e(value):return html.escape(str(value),quote=True)
def href(p):return '/projetos/'+p['id']+'/'
def image(m,lazy=True,cls=''):
 return f'<img class="{cls}" src="{e(m["src"])}" alt="{e(m.get("alt",m["caption"]))}" width="{m["width"]}" height="{m["height"]}" {"loading=lazy" if lazy else "fetchpriority=high"} decoding="async">'
def media_for(p):return p.get('media',[])
def kind_label(kind):return {'foto':'Fotografia da execução','interface':'Tela do sistema','projeto':'Projeto técnico'}[kind]
def summary_count(p):
 c=Counter(m['kind'] for m in media_for(p));parts=[]
 for key,singular,plural in [('foto','foto','fotos'),('interface','tela','telas'),('projeto','prancha','pranchas')]:
  if c[key]:parts.append(str(c[key])+' '+(singular if c[key]==1 else plural))
 return ' · '.join(parts)
def render_feature(p,heading='h2'):
 story=STORIES[p['id']]
 media=media_for(p)
 return f'''<article class="execution-feature" aria-labelledby="execution-title">
 <div class="execution-copy"><p class="execution-kicker">Em campo · {e(p['year'])}</p>
 <{heading} id="execution-title">A engenharia aparece<br>em cada detalhe.</{heading}>
 <p class="execution-project">Estação elevatória de esgoto</p>
 <p class="execution-description">Do projeto executivo ao comando das motobombas. Elétrica, automação e alimentação de reserva reunidas na mesma estação.</p>
 <dl class="execution-facts"><div><dt>Acionamento</dt><dd>2 motobombas de 40 cv</dd></div><div><dt>Controle</dt><dd>CLP Siemens e IHM</dd></div><div><dt>Continuidade</dt><dd>Gerador e no-break para o controle</dd></div></dl>
 <a class="execution-link" href="{href(p)}">Conheça o projeto completo <span aria-hidden="true">↗</span></a></div>
 <div class="execution-media"><figure class="execution-primary">{image(media[2])}<figcaption>CCM e acionamentos</figcaption></figure>
 <div class="execution-details"><figure>{image(media[3])}<figcaption>Automação e conexões</figcaption></figure><figure class="execution-drawing">{image(media[9])}<figcaption>Projeto executivo original</figcaption></figure></div></div>
 <p class="execution-source">Fotografias da execução e documento do projeto RP Caconde.</p></article>'''

def render_project_card(p,wide=False):
 media=media_for(p);direction=COVERS.get(p['id'],{});cover=media[direction.get('index',0)]
 detail=direction.get('detail')
 montage=detail is not None and detail!=direction.get('index',0)
 extra=f'<div class="archive-detail">{image(media[detail])}</div>' if montage else ''
 return f'''<article class="project-card archive-card" data-category="{e(p['category'])}"><a href="{href(p)}" aria-labelledby="archive-title-{e(p['id'])}"><div class="archive-visual kind-{cover['kind']} {'has-detail' if montage else ''}" style="--cover-position:{e(direction.get('position','center'))};--cover-fit:{e(direction.get('fit','cover'))}"><div class="archive-cover">{image(cover)}</div>{extra}<span class="archive-year">{e(p['year'])}</span><span class="archive-view-cue" aria-hidden="true">↗</span></div><div class="archive-card-meta"><span>{e(p['service'])}</span><span>{summary_count(p)}</span></div><div class="archive-title"><h3 id="archive-title-{e(p['id'])}">{e(p['title'])}</h3></div><p class="archive-summary">{e(p['summary'])}</p><p class="archive-proof">{e(STORIES[p['id']]['proof'])}</p><span class="archive-open">Explore o caso <span aria-hidden="true">↗</span></span></a></article>'''

def case_story(p):
 story=STORIES[p['id']];evidence=media_for(p)[story['evidence']]
 return f'''<section class="project-story" id="historia"><div class="wrap project-story-layout">
 <div class="project-story-copy"><p class="eyebrow">O projeto em contexto</p><h2>{e(story['headline'])}</h2>
 <div class="project-story-step"><h3>O desafio</h3><p>{e(story['challenge'])}</p></div>
 <div class="project-story-step"><h3>A solução</h3><p>{e(story['solution'])}</p></div>
 <div class="project-story-outcome"><h3>A entrega</h3><p>{e(story['outcome'])}</p></div></div>
 <figure class="project-story-evidence">{image(evidence)}<figcaption><span>Registro do trabalho</span>{e(evidence['caption'])}</figcaption></figure>
 </div></section>'''

def render_portfolio(projects):
 counts=Counter(p['category'] for p in projects)
 options=[('todos','Todos os trabalhos',len(projects)),('sistemas','Sistemas',counts['sistemas']),('automacao','Automação',counts['automacao']),('retrofit','Retrofit',counts['retrofit']),('projetos-eletricos','Engenharia elétrica',counts['projetos-eletricos']),('manutencao','Manutenção',counts['manutencao'])]
 filters=''.join(f'<button class="{"active" if key=="todos" else ""}" aria-pressed="{str(key=="todos").lower()}" data-filter="{key}">{label}<small>{count}</small></button>' for key,label,count in options if count)
 total=sum(len(media_for(p)) for p in projects)
 feature=render_feature(next(p for p in projects if p['id']=='estacao-elevatoria-esgoto'))
 return f'''<section class="portfolio-intro archive-intro wrap"><nav class="breadcrumbs" aria-label="Localização"><a href="/">Início</a><span aria-hidden="true">/</span><span>Trabalhos realizados</span></nav><div class="portfolio-heading"><div><p class="eyebrow">Portfólio RP Caconde</p><h1>Trabalhos realizados.</h1></div><p>Projetos, instalações e sistemas.<br>Conheça o escopo e os registros<br>de cada entrega.</p></div><div class="archive-intro-note"><span>{len(projects)} trabalhos</span><span>{total} registros entre fotos, interfaces e pranchas</span></div></section><section class="wrap portfolio-feature" aria-label="Projeto em destaque">{feature}</section><section class="wrap portfolio-collection"><div class="collection-heading"><h2>Explore cada entrega.</h2><p>Escolha uma especialidade e conheça os registros completos.</p></div><div class="project-filters archive-filters" role="group" aria-label="Filtrar por serviço">{filters}<span id="project-count" aria-live="polite">{len(projects)} projetos</span></div></section><section class="wrap archive-grid" id="projects" aria-label="Trabalhos realizados">{''.join(render_project_card(p) for p in projects)}</section><section class="section wrap portfolio-end"><p>Conte qual instalação, máquina ou sistema precisa evoluir na sua empresa.</p><a class="text-link" href="/contato/">Converse sobre seu projeto <span aria-hidden="true">↗</span></a></section>'''

def gallery(p):
 media=media_for(p);initial=COVERS.get(p['id'],{}).get('index',0);first=media[initial];counts=Counter(m['kind'] for m in media)
 labels={'foto':'Fotos da execução','interface':'Telas do sistema','projeto':'Projeto técnico'}
 categories=[key for key in ['foto','interface','projeto'] if counts[key]]
 if len(categories)>1:
  controls='<div class="work-gallery-filters" role="group" aria-label="Selecionar tipo de registro"><button aria-pressed="true" data-gallery-filter="all">Todos <small>'+str(len(media))+'</small></button>'+''.join(f'<button aria-pressed="false" data-gallery-filter="{k}">{labels[k]} <small>{counts[k]}</small></button>' for k in categories)+'</div>'
 else:controls=f'<div class="work-gallery-label">{labels[categories[0]]}<span>{len(media)} {"registro" if len(media)==1 else "registros"}</span></div>'
 json_data=json.dumps([{k:m[k] for k in ['src','caption','kind','width','height']} for m in media],ensure_ascii=False).replace('<','\\u003c')
 thumbs=''.join(f'<button data-gallery-index="{i}" data-kind="{m["kind"]}" aria-pressed="{str(i==initial).lower()}" aria-label="Ver {e(m["caption"])}"><img src="{e(m["src"])}" alt="" width="{m["width"]}" height="{m["height"]}" loading="lazy"><span>{e(m["caption"])}</span></button>' for i,m in enumerate(media))
 return f'''<div class="work-gallery" data-project-gallery data-gallery-initial="{initial}" id="registros"><script type="application/json" data-gallery-data>{json_data}</script>{controls}<div class="work-gallery-stage kind-{first['kind']}" data-gallery-stage><button class="work-main-open" data-gallery-open aria-label="Ampliar {e(first['caption'])}">{image(first,False,'work-main-image')}</button><span class="work-media-type" data-gallery-type>{kind_label(first['kind'])}</span></div><div class="work-gallery-caption"><div><strong data-gallery-caption>{e(first['caption'])}</strong><span data-gallery-count>{initial+1} de {len(media)}</span></div><button class="work-enlarge" data-gallery-open>Ampliar <span aria-hidden="true">⤢</span></button></div><div class="work-gallery-navigation"><button data-gallery-step="-1" aria-label="Registro anterior" {'disabled' if len(media)==1 else ''}>←</button><p>Selecione uma miniatura para explorar o trabalho.</p><button data-gallery-step="1" aria-label="Próximo registro" {'disabled' if len(media)==1 else ''}>→</button></div><div class="work-thumbnails" aria-label="Registros do projeto">{thumbs}</div></div>'''

def technical_section(p):
 indexed=[(i,m) for i,m in enumerate(media_for(p)) if m['kind']=='projeto']
 if not indexed:return ''
 cards=''.join(f'<article class="work-document"><button data-document-index="{i}" aria-label="Ampliar {e(m["caption"])}"><span class="work-document-image">{image(m)}</span><span class="work-document-copy"><small>Prancha do projeto</small><strong>{e(m["caption"])}</strong><span>Ampliar para leitura <b aria-hidden="true">↗</b></span></span></button></article>' for i,m in indexed)
 return f'''<section class="work-documents section" id="projeto-tecnico"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Do desenho à execução</p><h2>Projeto e documentação.</h2></div><p>Explore os desenhos e os detalhes<br>técnicos deste trabalho.</p></div><div class="work-document-grid {'single-document' if len(indexed)==1 else ''}">{cards}</div></div></section>'''

def interface_section(p):
 if p['category']!='sistemas':return ''
 media=media_for(p)
 return f'''<section class="work-interfaces section wrap" id="interfaces"><div class="section-heading"><div><p class="eyebrow">Telas da aplicação</p><h2>Gestão, serviços e finanças.<br>No mesmo sistema.</h2></div><p>Finanças, comercial e serviços<br>em uma visão integrada.</p></div><div class="work-interface-grid">{''.join(f'<figure><button data-document-index="{i}" aria-label="Ampliar {e(m["caption"])}">{image(m)}</button><figcaption>{e(m["caption"])}</figcaption></figure>' for i,m in enumerate(media) if i>0)}</div><div class="work-demo-invitation"><div><h3>Explore uma demonstração das possibilidades.</h3><p>A demo interativa apresenta exemplos de operação e gestão com dados fictícios.</p></div><a class="button button-dark" href="/demo/">Abrir demonstração <span aria-hidden="true">↗</span></a></div></section>'''

def comparison(p):
 if not p.get('comparison'):return ''
 cards=''.join(f'<figure><button data-document-index="{item["index"]}" aria-label="Ampliar {e(item["label"])}">{image(media_for(p)[item["index"]])}</button><figcaption>{e(item["label"])}</figcaption></figure>' for item in p['comparison'])
 return f'<section class="section wrap work-comparison"><div class="section-heading"><h2>A evolução do comando.</h2><p>Registros do painel existente<br>e da nova montagem elétrica.</p></div><div>{cards}</div></section>'

def render_case(p,projects,nextp):
 media=media_for(p)
 facts=[('Cliente / setor',p['sector']),('Ano',p['year'])]
 if p.get('location'):facts.append(('Local',p['location']))
 facts_html=''.join(f'<div><dt>{label}</dt><dd>{e(value)}</dd></div>' for label,value in facts)
 library=''.join(f'<button type="button" data-zoom="{e(m["src"])}" data-caption="{e(m["caption"])}" data-kind="{m["kind"]}" aria-label="Ampliar {e(m["caption"])}"></button>' for m in media)
 toc='<a href="#historia">O caso</a><a href="#escopo">Escopo e entregas</a><a href="#registros">Fotos e registros</a>'
 if any(m['kind']=='projeto' for m in media):toc+='<a href="#projeto-tecnico">Projeto técnico</a>'
 if p['category']=='sistemas':toc+='<a href="#interfaces">Interfaces do sistema</a>'
 ids=p.get('related',[])
 related=[x for x in projects if x['id'] in ids and x['id']!=p['id']]
 if not related:related=[x for x in projects if x['category']==p['category'] and x['id']!=p['id']]
 if not related:related=[x for x in projects if x['id']!=p['id']][:2]
 related=related[:3]
 return f'''<article class="work-detail"><section class="work-introduction wrap"><nav class="breadcrumbs" aria-label="Localização"><a href="/">Início</a><span aria-hidden="true">/</span><a href="/portfolio/">Trabalhos</a><span aria-hidden="true">/</span><span>{e(p['service'])}</span></nav><div class="work-exhibit"><div class="work-intro-copy"><p class="eyebrow">{e(p['service'])}</p><h1>{e(p['title'])}</h1><p class="work-lead">{e(p['summary'])}</p><p class="work-proof">{e(STORIES[p["id"]]["proof"])}</p><dl class="work-facts">{facts_html}</dl><p class="work-record-summary">{summary_count(p)}</p><a class="button button-dark" href="/contato/?projeto={e(p['id'])}">Converse sobre um projeto parecido <span aria-hidden="true">↗</span></a></div>{gallery(p)}</div></section><nav class="work-content-nav wrap" aria-label="Seções deste trabalho">{toc}<a href="/portfolio/">Todos os trabalhos <span aria-hidden="true">↗</span></a></nav>{case_story(p)}<section class="work-scope section wrap" id="escopo"><div class="work-description"><p class="eyebrow">O trabalho realizado</p><h2>O escopo em detalhe.</h2><p>{e(p['context'])}</p></div><div class="work-deliverables"><p class="eyebrow">Entregas registradas</p><h2>O que foi feito.</h2><ul>{''.join(f'<li><span aria-hidden="true">✓</span><p>{e(item)}</p></li>' for item in p['deliverables'])}</ul></div></section>{comparison(p)}{technical_section(p)}{interface_section(p)}<div class="work-media-library" hidden>{library}</div><section class="section wrap work-related"><div class="section-heading"><h2>Continue conhecendo<br>nosso trabalho.</h2><a class="text-link" href="/portfolio/">Portfólio completo <span aria-hidden="true">↗</span></a></div><div class="related-projects">{''.join(render_project_card(x) for x in related)}</div></section><a class="next-project" href="{href(nextp)}"><div class="wrap"><p>Próximo trabalho</p><h2>{e(nextp['title'])}</h2><span aria-hidden="true">↗</span></div></a></article>'''
