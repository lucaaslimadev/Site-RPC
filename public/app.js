'use strict';
// Shared navigation, portfolio and interactive examples. No data is stored or submitted to this server.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Explore an engineering specialty without leaving the institutional presentation.
const capabilityExplorer = document.querySelector('[data-capability-explorer]');
if (capabilityExplorer) {
  const tabs = [...capabilityExplorer.querySelectorAll('[data-capability]')];
  const panels = [...capabilityExplorer.querySelectorAll('[role="tabpanel"]')];
  function selectCapability(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCapability(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectCapability(next, true); }
    });
  });
}

// The artwork and cable pulses share one frame, including every responsive crop.
const signatureHero = document.querySelector('.signature-hero');
const motionButton = document.querySelector('[data-motion-toggle]');
let motionPaused = false;
if (signatureHero && motionButton) {
  const image = signatureHero.querySelector('.signature-art img');
  const scene = signatureHero.querySelector('.signature-scene');
  const energy = signatureHero.querySelector('.hero-energy');
  let artworkReady = false;
  function alignEnergy() {
    if (!artworkReady || !energy || !image.naturalWidth || !image.clientWidth || !image.clientHeight) return;
    const width = image.clientWidth;
    const height = image.clientHeight;
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const renderedWidth = image.naturalWidth * scale;
    const renderedHeight = image.naturalHeight * scale;
    const [positionX, positionY] = getComputedStyle(image).objectPosition.split(' ').map(value => parseFloat(value) / 100);
    Object.assign(energy.style, {
      width: renderedWidth + 'px', height: renderedHeight + 'px',
      left: (width - renderedWidth) * positionX + 'px',
      top: (height - renderedHeight) * positionY + 'px'
    });
    energy.classList.add('is-aligned');
  }
  function showArtworkDetails() {
    // An async-decoded bitmap must be ready before illuminated details appear.
    const decoded = image.decode ? image.decode() : Promise.resolve();
    decoded.catch(() => {}).then(() => { artworkReady = true; alignEnergy(); });
  }
  image.addEventListener('load', showArtworkDetails);
  if (image.complete && image.naturalWidth) showArtworkDetails();
  if ('ResizeObserver' in window) new ResizeObserver(alignEnergy).observe(image);
  else window.addEventListener('resize', alignEnergy);
  let ticking = false;
  const updateDepth = () => {
    if (motionPaused) { ticking = false; return; }
    const visible = signatureHero.getBoundingClientRect().bottom > 0;
    const enabled = visible && !motionPaused && !reducedMotion.matches && window.innerWidth > 820;
    scene.style.setProperty('--hero-shift', enabled ? Math.min(window.scrollY * .055, 28) + 'px' : '0px');
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateDepth); ticking = true; }
  }, { passive: true });
  motionButton.addEventListener('click', () => {
    motionPaused = !motionPaused;
    document.body.classList.toggle('motion-paused', motionPaused);
    motionButton.setAttribute('aria-pressed', String(motionPaused));
    motionButton.setAttribute('aria-label', motionPaused ? 'Retomar movimento da apresentação' : 'Pausar movimento da apresentação');
    motionButton.querySelector('[data-motion-label]').textContent = motionPaused ? 'Retomar movimento' : 'Pausar movimento';
    motionButton.firstElementChild.textContent = motionPaused ? '▷' : 'Ⅱ';
    updateDepth();
  });
  reducedMotion.addEventListener('change', updateDepth);
  document.addEventListener('visibilitychange', () => signatureHero.classList.toggle('tab-inactive', document.hidden));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('outside-viewport', !entry.isIntersecting);
    }));
    document.querySelectorAll('.signature-hero, .signal-map').forEach(element => observer.observe(element));
  }
}

const menu = document.querySelector('#solutions-menu');
const menuButtons = [...document.querySelectorAll('[data-menu]')];
function setMenu(open, restoreFocus=false) {
  menu.hidden = !open;
  menuButtons.forEach(button => button.setAttribute('aria-expanded', String(open)));
  if (!open && restoreFocus) menuButtons.find(button => button.getBoundingClientRect().width > 0)?.focus();
}
menuButtons.forEach(button => button.addEventListener('click', () => setMenu(menu.hidden)));
document.addEventListener('click', event => {
  if (!menu.hidden && !event.target.closest('.site-header')) setMenu(false);
});
document.addEventListener('keydown', event => { if(event.key === 'Escape' && !menu.hidden) setMenu(false,true); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.querySelectorAll('nav a').forEach(link => {if (link.pathname === location.pathname) link.setAttribute('aria-current','page');});

// Work filters keep real project pages available without JavaScript.
const cards = [...document.querySelectorAll('#projects .project-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
filters.forEach(button => button.addEventListener('click', () => {
  const value = button.dataset.filter;
  filters.forEach(item => {const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected));});
  cards.forEach(card => {card.hidden=value!=='todos' && card.dataset.category!==value;});
  document.querySelector('#projects').classList.toggle('is-filtered',value!=='todos');
  const count=cards.filter(card=>!card.hidden).length;
  document.querySelector('#project-count').textContent=`${count} ${count===1?'projeto':'projetos'}`;
}));

// Image enlargement with native dialog focus handling, keyboard navigation and full originals.
const imageDialog=document.querySelector('#image-dialog');
const imageItems=[...document.querySelectorAll('[data-zoom]')];
let imageIndex=0;
let imageTrigger;
let imageZoom=1;
let fittedImageWidth=0;
const viewerStage=document.querySelector('#image-viewer-stage');
const viewerImage=document.querySelector('#large-image');
const kindLabels={foto:'Fotografia da execução',interface:'Tela do sistema',projeto:'Projeto técnico'};
function applyImageZoom(zoom){
 if(!viewerImage.naturalWidth||!viewerStage.clientWidth)return;
 const oldWidth=parseFloat(viewerImage.style.width)||fittedImageWidth;
 const oldLeft=viewerStage.scrollLeft,oldTop=viewerStage.scrollTop;
 imageZoom=Math.max(1,Math.min(4,zoom));
 viewerImage.style.width=Math.round(fittedImageWidth*imageZoom)+'px';
 viewerStage.classList.toggle('is-zoomed',imageZoom>1);
 document.querySelector('#image-zoom-label').textContent=imageZoom===1?'Ajustada à tela':`Zoom ${Math.round(imageZoom*100)}%`;
 document.querySelector('[data-viewer-zoom="out"]').disabled=imageZoom===1;
 document.querySelector('[data-viewer-zoom="in"]').disabled=imageZoom===4;
 if(imageZoom===1){viewerStage.scrollLeft=0;viewerStage.scrollTop=0;}
 else if(oldWidth){const scale=fittedImageWidth*imageZoom/oldWidth;viewerStage.scrollLeft=(oldLeft+viewerStage.clientWidth/2)*scale-viewerStage.clientWidth/2;viewerStage.scrollTop=(oldTop+viewerStage.clientHeight/2)*scale-viewerStage.clientHeight/2;}
}
function fitViewerImage(){
 if(!viewerImage.naturalWidth||!viewerStage.clientWidth)return;
 const ratio=viewerImage.naturalWidth/viewerImage.naturalHeight;
 fittedImageWidth=Math.min(viewerImage.naturalWidth,viewerStage.clientWidth-24,(viewerStage.clientHeight-24)*ratio);
 applyImageZoom(1);
}
function presentImage(index){
 if(!imageItems.length)return;
 imageIndex=(index+imageItems.length)%imageItems.length;
 const item=imageItems[imageIndex];
 viewerImage.onload=fitViewerImage;
 viewerImage.src=item.dataset.zoom;
 viewerImage.alt=item.dataset.caption;
 document.querySelector('#image-caption').textContent=item.dataset.caption;
 document.querySelector('#image-title').textContent=`${kindLabels[item.dataset.kind]||'Registro do trabalho'} · ${imageIndex+1} de ${imageItems.length}`;
 document.querySelector('#image-original').href=item.dataset.zoom;
 if(viewerImage.complete&&viewerImage.naturalWidth)fitViewerImage();
}
function openImageAt(index,trigger=document.activeElement){
 imageTrigger=trigger;
 if(!imageDialog.open)imageDialog.showModal();
 presentImage(index);
}
imageItems.forEach((button,index)=>button.addEventListener('click',()=>openImageAt(index,button)));
document.querySelectorAll('[data-viewer-zoom]').forEach(button=>button.addEventListener('click',()=>{
 const command=button.dataset.viewerZoom;
 if(command==='fit')fitViewerImage();
 else applyImageZoom(imageZoom+(command==='in'?.5:-.5));
}));
viewerImage.addEventListener('dblclick',()=>applyImageZoom(imageZoom===1?2:1));
imageDialog.addEventListener('keydown',event=>{
 if(event.key==='+'||event.key==='='){event.preventDefault();applyImageZoom(imageZoom+.5);}
 if(event.key==='-'){event.preventDefault();applyImageZoom(imageZoom-.5);}
 if(event.key==='0'){event.preventDefault();fitViewerImage();}
});
window.addEventListener('resize',()=>{if(imageDialog.open)fitViewerImage();});

// A single collection per project: photos, original interfaces and technical sheets.
const projectGallery=document.querySelector('[data-project-gallery]');
if(projectGallery){
 const records=JSON.parse(projectGallery.querySelector('[data-gallery-data]').textContent);
 const thumbnails=[...projectGallery.querySelectorAll('[data-gallery-index]')];
 const galleryFilters=[...projectGallery.querySelectorAll('[data-gallery-filter]')];
 const mainImage=projectGallery.querySelector('.work-main-image');
 mainImage.addEventListener('load',()=>{
  if(!reducedMotion.matches)mainImage.animate([{opacity:.35},{opacity:1}],{duration:220,easing:'ease-out'});
 });
 const mainOpen=projectGallery.querySelector('.work-main-open');
 const thumbnailRail=projectGallery.querySelector('.work-thumbnails');
 let galleryFilter='all';let selectedRecord=Number(projectGallery.dataset.galleryInitial)||0;
 const visibleRecords=()=>records.map((record,index)=>({record,index})).filter(({record})=>galleryFilter==='all'||record.kind===galleryFilter).map(({index})=>index);
 function selectRecord(index,scroll=true){
  selectedRecord=index;
  const record=records[index];
  mainImage.src=record.src;mainImage.alt=record.caption;
  mainImage.width=record.width;mainImage.height=record.height;
  mainOpen.setAttribute('aria-label','Ampliar '+record.caption);
  const stage=projectGallery.querySelector('[data-gallery-stage]');
  ['foto','interface','projeto'].forEach(kind=>stage.classList.toggle('kind-'+kind,kind===record.kind));
  projectGallery.querySelector('[data-gallery-type]').textContent=kindLabels[record.kind];
  projectGallery.querySelector('[data-gallery-caption]').textContent=record.caption;
  const visible=visibleRecords();
  projectGallery.querySelector('[data-gallery-count]').textContent=`${visible.indexOf(index)+1} de ${visible.length}`;
  thumbnails.forEach((thumb,i)=>{thumb.setAttribute('aria-pressed',String(i===index));thumb.hidden=!visible.includes(i);});
  projectGallery.querySelectorAll('[data-gallery-step]').forEach(button=>button.disabled=visible.length<2);
  if(scroll){const thumb=thumbnails[index];thumbnailRail.scrollTo({left:Math.max(0,thumb.offsetLeft-(thumbnailRail.clientWidth-thumb.clientWidth)/2),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
 }
 function selectFilter(kind){
  galleryFilter=kind;
  galleryFilters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.galleryFilter===kind)));
  const visible=visibleRecords();
  if(!visible.includes(selectedRecord))selectedRecord=visible[0];
  selectRecord(selectedRecord);
 }
 thumbnails.forEach((thumb,index)=>thumb.addEventListener('click',()=>selectRecord(index)));
 galleryFilters.forEach(button=>button.addEventListener('click',()=>selectFilter(button.dataset.galleryFilter)));
 projectGallery.querySelectorAll('[data-gallery-step]').forEach(button=>button.addEventListener('click',()=>{
  const visible=visibleRecords();const position=visible.indexOf(selectedRecord);
  selectRecord(visible[(position+Number(button.dataset.galleryStep)+visible.length)%visible.length]);
 }));
 projectGallery.querySelectorAll('[data-gallery-open]').forEach(button=>button.addEventListener('click',()=>openImageAt(selectedRecord,button)));
 projectGallery.addEventListener('keydown',event=>{
  if(event.key!=='ArrowRight'&&event.key!=='ArrowLeft')return;
  event.preventDefault();const visible=visibleRecords();const position=visible.indexOf(selectedRecord);
  selectRecord(visible[(position+(event.key==='ArrowRight'?1:-1)+visible.length)%visible.length]);
 });
 document.querySelectorAll('[data-document-index]').forEach(button=>button.addEventListener('click',()=>{
  const index=Number(button.dataset.documentIndex);
  if(!visibleRecords().includes(index))selectFilter(records[index].kind);
  selectRecord(index,false);openImageAt(index,button);
 }));
 selectRecord(selectedRecord,false);
}

if(imageItems.length>1){
  const controls=document.createElement('div');controls.className='lightbox-controls';
  const previous=document.createElement('button');previous.textContent='←';previous.setAttribute('aria-label','Imagem anterior');previous.addEventListener('click',()=>presentImage(imageIndex-1));
  const next=document.createElement('button');next.textContent='→';next.setAttribute('aria-label','Próxima imagem');next.addEventListener('click',()=>presentImage(imageIndex+1));
  controls.append(previous,next);document.querySelector('.lightbox-top').insertBefore(controls,document.querySelector('[data-close-image]'));
}
document.querySelector('[data-close-image]').addEventListener('click',()=>imageDialog.close());
imageDialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'){event.preventDefault();presentImage(imageIndex+1);}
  if(event.key==='ArrowLeft'){event.preventDefault();presentImage(imageIndex-1);}
});
imageDialog.addEventListener('close',()=>imageTrigger?.focus({preventScroll:true}));
const credits=document.querySelector('#credits-dialog');
document.querySelector('[data-credits]').addEventListener('click',()=>credits.showModal());
document.querySelector('[data-close-credits]').addEventListener('click',()=>credits.close());
[imageDialog,credits].forEach(dialog=>dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const bounds=dialog.getBoundingClientRect();
  if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();
}));

// A purposeful demo of how a connected operation can be consulted on a phone.
const phoneTabs=[...document.querySelectorAll('[data-phone]')];
const phoneExamples={
 producao:{title:'Visão da produção',label:'Produção do dia',value:'1.248',unit:'peças',metrics:[['Disponibilidade','96,2%'],['Ordens ativas','04']],events:[['Linha de produção A','Operação normal','Exemplo de consulta: estado da máquina, ordem em execução e último registro do processo.'],['Manutenção programada','Consultar evento','Exemplo de evento: orientação e registro disponíveis conforme o módulo e as permissões do usuário.']]},
 energia:{title:'Visão da energia',label:'Consumo do dia',value:'2.460',unit:'kWh',metrics:[['Demanda','182 kW'],['Pontos monitorados','08']],events:[['Medição por setor','Histórico disponível','Exemplo de consulta: consumo registrado por ponto de medição e período selecionado.'],['Atenção à demanda','Consultar evento','Exemplo de alerta configurável, condicionado à instrumentação e à integração previstas no projeto.']]},
 gestao:{title:'Visão da gestão',label:'Serviços em andamento',value:'12',unit:'ordens',metrics:[['Para hoje','05'],['Equipe em campo','03']],events:[['Ordens de serviço','Consulte o andamento','Exemplo de consulta: escopo, programação e registros associados a uma ordem de serviço.'],['Material para revisão','Consultar pendência','Exemplo de registro de uma necessidade de compra associada ao fluxo de trabalho da equipe.']]}
};
function bindPhoneEvents(){
 document.querySelectorAll('.phone-event').forEach(button=>button.addEventListener('click',()=>{
  const expanded=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!expanded));button.nextElementSibling.hidden=expanded;
 }));
}
function selectPhone(tab,focus=false){
 const data=phoneExamples[tab.dataset.phone];
 phoneTabs.forEach(item=>{item.setAttribute('aria-selected',String(item===tab));item.tabIndex=item===tab?0:-1;});
 document.querySelector('#phone-preview').setAttribute('aria-labelledby',tab.id);
 document.querySelector('#phone-heading').textContent=data.title;
 document.querySelector('#phone-stat-label').textContent=data.label;
 const stat=document.querySelector('#phone-stat-value');stat.replaceChildren(document.createTextNode(data.value+' '));const unit=document.createElement('small');unit.textContent=data.unit;stat.append(unit);
 const metrics=document.querySelector('#phone-metrics');metrics.replaceChildren();
 data.metrics.forEach(([label,value])=>{const cell=document.createElement('div');const name=document.createElement('span');name.textContent=label;const number=document.createElement('strong');number.textContent=value;cell.append(name,number);metrics.append(cell);});
 const events=document.querySelector('#phone-events');events.replaceChildren();
 data.events.forEach(([title,subtitle,description],index)=>{
  const button=document.createElement('button');button.className='phone-event';button.setAttribute('aria-expanded','false');
  const indicator=document.createElement('i');indicator.className='status-dot'+(index===1?' amber':'');
  const text=document.createElement('span');text.textContent=title;const small=document.createElement('small');small.textContent=subtitle;text.append(small);
  const chevron=document.createElement('b');chevron.textContent='⌄';chevron.setAttribute('aria-hidden','true');button.append(indicator,text,chevron);
  const detail=document.createElement('p');detail.className='event-detail';detail.textContent=description;detail.hidden=true;events.append(button,detail);
 });
 bindPhoneEvents();if(focus)tab.focus();
}
phoneTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectPhone(tab));
 tab.addEventListener('keydown',event=>{
  let next=index;
  if(event.key==='ArrowRight')next=(index+1)%phoneTabs.length;
  else if(event.key==='ArrowLeft')next=(index+phoneTabs.length-1)%phoneTabs.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=phoneTabs.length-1;
  else return;
  event.preventDefault();selectPhone(phoneTabs[next],true);
 });
});
bindPhoneEvents();

// Only opens a prepared message in WhatsApp. The visitor still reviews and sends it.
const contactForm=document.querySelector('#contact-form');
if(contactForm){
 const params=new URLSearchParams(location.search);
 const interest=document.querySelector('#interest');
 if([...interest.options].some(option=>option.value===params.get('servico')))interest.value=params.get('servico');
 if(params.has('projeto')){
  const project=params.get('projeto').replace(/[^a-z0-9-]/g,'');
  document.querySelector('#challenge').value=`Conheci o trabalho ${project.replaceAll('-',' ')} no portfólio e gostaria de conversar sobre uma necessidade parecida.`;
 }
 contactForm.addEventListener('submit',event=>{
  event.preventDefault();
  const name=document.querySelector('#name').value.trim();const company=document.querySelector('#company').value.trim();const challenge=document.querySelector('#challenge').value.trim();
  const subject=interest.selectedOptions[0].textContent;
  const message=['Olá! Conheci a RP Caconde pelo site.',name?'Meu nome é '+name+'.':'',company?'Empresa: '+company:'','Interesse: '+subject,challenge].filter(Boolean).join('\n\n');
  window.open('https://wa.me/5514996088035?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
 });
}
// Preserve project addresses from the first local prototype.
if(location.pathname==='/'&&/^#projeto\/[a-z0-9-]+$/.test(location.hash))location.replace('/projetos/'+location.hash.split('/')[1]+'/');
