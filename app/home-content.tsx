import Image from 'next/image';
import Diagnostic from './diagnostic';
import DashboardPreview from './dashboard-preview';

const solutions = [
  { n:'01', code:'PLC', title:'Automação industrial', text:'Controle robusto, preciso e escalável para máquinas, células e processos completos.', items:['CLPs, IHMs e servoacionamentos','Redes e comunicação industrial','Comissionamento e startup'] },
  { n:'02', code:'ENG', title:'Engenharia elétrica', text:'Do diagrama ao painel energizado: engenharia segura, documentada e pronta para operar.', items:['Quadros, CCMs e painéis','Projetos, laudos e ART','NR-10, NR-12 e as-built'] },
  { n:'03', code:'SYS', title:'Sistemas industriais', text:'Software criado ao redor do seu processo — não o contrário.', items:['SCADA, MES, ERP e IIoT','Dashboards e relatórios','Aplicações web sob medida'] },
  { n:'04', code:'RFX', title:'Retrofit e evolução', text:'Mais vida útil, segurança e performance para ativos que ainda têm muito a entregar.', items:['Migração de tecnologias','Adequação e novos controles','Testes FAT / SAT e treinamento'] },
];

const process = [
  {n:'01',title:'Imersão',text:'Entramos no processo, ouvimos operação e manutenção e identificamos onde está o valor.'},
  {n:'02',title:'Arquitetura',text:'Desenhamos a solução elétrica, de automação e software como um único sistema.'},
  {n:'03',title:'Construção',text:'Desenvolvemos, integramos e testamos com documentação clara em cada etapa.'},
  {n:'04',title:'Evolução',text:'Comissionamos, capacitamos o time e deixamos a base pronta para crescer.'},
];

const faq = [
  ['Vocês trabalham com projetos totalmente personalizados?','Sim. A solução nasce do processo, da infraestrutura e dos objetivos de cada empresa. Podemos integrar equipamentos existentes, desenvolver novas camadas de controle e criar softwares específicos para a operação.'],
  ['É possível modernizar uma máquina sem substituir tudo?','Sim. Em um retrofit, avaliamos o que pode ser preservado e modernizamos os pontos de controle, segurança, acionamento e interface que limitam o equipamento.'],
  ['Vocês entregam automação, elétrica e software no mesmo projeto?','Sim. Essa integração é um dos nossos principais diferenciais: menos ruído entre fornecedores e uma arquitetura pensada de ponta a ponta.'],
  ['Como começa um projeto com a RP Caconde?','Começamos por uma conversa técnica e um entendimento do desafio. A partir daí definimos levantamento, escopo, arquitetura e critérios de sucesso.'],
];

export default function HomeContent() {
  return <main>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="RP Caconde — início"><Image src="/images/rpc-logo.png" alt="RP Caconde" width={214} height={45} priority /></a>
      <nav className="desktop-nav" aria-label="Navegação principal"><a href="#solucoes">Soluções</a><a href="#metodo">Como entregamos</a><a href="#tecnologias">Tecnologias</a><a href="/rpc-dashboard">Demonstração</a><a href="#contato">Contato</a></nav>
      <a className="header-cta" href="#diagnostico">Iniciar um projeto <span aria-hidden="true">↗</span></a>
    </header>

    <section className="hero" id="inicio">
      <Image className="hero-image" src="/images/rpc-hero-industrial.jpg" alt="Linha industrial automatizada e integrada pela RP Caconde" fill sizes="100vw" priority quality={90} />
      <div className="hero-scrim" /><div className="grid-lines" aria-hidden="true" />
      <div className="hero-content">
        <div className="eyebrow"><span /> Engenharia que move a indústria</div>
        <h1>Do chão de fábrica<br />à <em>decisão.</em></h1>
        <p className="hero-copy">Criamos ecossistemas industriais sob medida — automação, engenharia elétrica e software — para sua operação produzir mais, decidir melhor e evoluir sem limites.</p>
        <div className="hero-actions"><a className="button primary" href="#diagnostico">Falar com um especialista <span>↗</span></a><a className="button secondary" href="/rpc-dashboard"><span className="play">▶</span> Abrir sistema demo</a></div>
        <div className="proof-strip" aria-label="Principais competências"><div><strong>01</strong><span>Automação<br />industrial</span></div><div><strong>02</strong><span>Engenharia<br />elétrica</span></div><div><strong>03</strong><span>SCADA · MES<br />ERP · IIoT</span></div><div><strong>04</strong><span>Soluções<br />sob medida</span></div></div>
      </div>
      <aside className="live-card" aria-label="Indicadores de uma operação integrada">
        <div className="live-head"><span><i /> OPERAÇÃO CONECTADA</span><b>LIVE</b></div>
        <div className="live-main"><span>Eficiência global</span><strong>94,2<small>%</small></strong><div className="spark" aria-hidden="true">{Array.from({length:12}).map((_,i)=><i key={i} />)}</div></div>
        <div className="live-stats"><div><span>Disponibilidade</span><strong>98,7%</strong></div><div><span>Energia</span><strong className="cyan">−12,4%</strong></div></div>
        <p><span>●</span> Dados que viram decisões em tempo real</p>
      </aside>
      <div className="hero-foot"><span className="scroll-mark">⌄</span><span>DESCUBRA O QUE PODEMOS CONSTRUIR JUNTOS</span><div className="status"><i /> ENGENHARIA + TECNOLOGIA + RESULTADO</div></div>
    </section>

    <section className="manifesto section-pad">
      <div className="section-kicker"><span>001</span> NOSSA VISÃO</div>
      <div className="manifesto-grid"><h2>Uma indústria conectada não nasce de peças soltas.</h2><div><p>Nasce quando elétrica, automação e software são pensados como <strong>um único sistema.</strong></p><p>É aí que a RP Caconde atua: transformando complexidade técnica em uma operação mais visível, confiável e preparada para o próximo passo.</p></div></div>
      <div className="signal-line"><span>CAMPO</span><i /><span>CONTROLE</span><i /><span>DADOS</span><i /><span>GESTÃO</span><b>FLUXO INTEGRADO →</b></div>
    </section>

    <section className="solutions section-pad" id="solucoes">
      <div className="section-heading"><div><div className="section-kicker"><span>002</span> SOLUÇÕES INTEGRADAS</div><h2>Uma única engenharia.<br/><em>Todo o caminho.</em></h2></div><p>Da potência ao dado, construímos cada camada para funcionar em conjunto — e gerar resultado no mundo real.</p></div>
      <div className="solutions-grid">{solutions.map((s)=><article className="solution-card" key={s.n}><div className="solution-top"><span>{s.n}</span><b>{s.code}</b></div><h3>{s.title}</h3><p>{s.text}</p><ul>{s.items.map(item=><li key={item}>{item}</li>)}</ul><a href="#diagnostico" aria-label={`Conversar sobre ${s.title}`}>CONVERSAR SOBRE ESTA SOLUÇÃO <span>↗</span></a></article>)}</div>
    </section>

    <section className="system-showcase" id="tecnologias">
      <div className="system-image"><Image src="/images/rpc-control-panel.jpg" alt="Comissionamento de painel elétrico industrial" fill sizes="(max-width: 900px) 100vw, 50vw" quality={88} /></div>
      <div className="system-content"><div className="section-kicker light"><span>003</span> ENGENHARIA EM CAMADAS</div><h2>Seu processo.<br/><em>Sua lógica.</em><br/>Seu sistema.</h2><p>Não vendemos uma plataforma engessada. Mapeamos a realidade da operação e construímos a arquitetura certa para ela.</p><div className="layer-stack"><div><b>L4</b><span><strong>Gestão</strong>ERP · BI · Aplicações personalizadas</span></div><div><b>L3</b><span><strong>Operação</strong>MES · SCADA · Historiadores</span></div><div><b>L2</b><span><strong>Controle</strong>CLPs · IHMs · Supervisão</span></div><div><b>L1</b><span><strong>Campo</strong>Sensores · Acionamentos · Instrumentação</span></div></div></div>
    </section>

    <section className="suite section-pad">
      <div className="section-heading suite-heading"><div><div className="section-kicker"><span>004</span> INTELIGÊNCIA OPERACIONAL</div><h2>Enxergue a operação.<br/><em>Antecipe a decisão.</em></h2></div><p>Interfaces que organizam a complexidade e mostram o que realmente exige atenção.</p></div>
      <DashboardPreview />
      <p className="demo-note">Interface demonstrativa com dados simulados. Explore monitoramento, ordens, manutenção, energia, relatórios e todos os módulos do RPC Industrial Suite.</p>
      <div className="demo-actions"><a className="button demo-button" href="/rpc-dashboard"><span className="play">▶</span> Explorar demonstração completa <span>↗</span></a></div>
    </section>

    <section className="method section-pad" id="metodo">
      <div className="section-heading"><div><div className="section-kicker"><span>005</span> NOSSO MÉTODO</div><h2>Da primeira conversa<br/>ao <em>primeiro resultado.</em></h2></div><p>Um processo técnico, transparente e construído junto com quem vive a operação todos os dias.</p></div>
      <div className="process-line">{process.map((p)=><article key={p.n}><span>{p.n}</span><i/><h3>{p.title}</h3><p>{p.text}</p></article>)}</div>
      <div className="tech-ticker" aria-label="Tecnologias e protocolos"><span>OPC UA</span><i/> <span>MODBUS TCP</span><i/> <span>MQTT</span><i/> <span>PROFINET</span><i/> <span>REST API</span><i/> <span>SQL</span><i/> <span>EDGE + CLOUD</span></div>
    </section>

    <section className="diagnostic section-pad" id="diagnostico">
      <div className="section-heading"><div><div className="section-kicker"><span>006</span> DIAGNÓSTICO INICIAL</div><h2>Onde sua operação<br/>pode <em>chegar?</em></h2></div><p>Responda a duas perguntas. Nós mostramos um primeiro caminho de engenharia para o seu cenário.</p></div>
      <Diagnostic />
    </section>

    <section className="faq section-pad">
      <div className="faq-title"><div className="section-kicker"><span>007</span> PERGUNTAS FREQUENTES</div><h2>Clareza antes<br/>do <em>primeiro passo.</em></h2><p>Se sua dúvida não estiver aqui, fale diretamente com nossa equipe técnica.</p></div>
      <div className="faq-list">{faq.map(([q,a],i)=><details key={q}><summary><span>0{i+1}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div>
    </section>

    <section className="contact" id="contato">
      <div className="contact-grid" aria-hidden="true" />
      <div className="section-kicker light"><span>008</span> PRÓXIMO PASSO</div><h2>O seu desafio pode ser<br/>nosso <em>próximo projeto.</em></h2><p>Conte o que hoje limita sua operação. Nossa engenharia ajuda a transformar esse ponto em uma solução clara, segura e escalável.</p>
      <div className="contact-actions"><a className="button primary" target="_blank" rel="noreferrer" href="https://wa.me/5514996088035?text=Olá!%20Gostaria%20de%20conversar%20sobre%20uma%20solução%20industrial.">Conversar pelo WhatsApp <span>↗</span></a><a className="button secondary" href="mailto:rafaelmpcaconde@gmail.com">Enviar briefing por e-mail <span>↗</span></a></div>
      <div className="contact-meta"><span><b>TELEFONE</b><a href="tel:+5519981399786">(19) 98139-9786</a></span><span><b>WHATSAPP</b><a href="https://wa.me/5514996088035">(14) 99608-8035</a></span><span><b>E-MAIL</b><a href="mailto:rafaelmpcaconde@gmail.com">rafaelmpcaconde@gmail.com</a></span></div>
    </section>

    <footer><a className="brand" href="#inicio"><Image src="/images/rpc-logo.png" alt="RP Caconde" width={190} height={40}/></a><p>Engenharia que conecta.<br/>Tecnologia que entrega.</p><nav><a href="#solucoes">Soluções</a><a href="#metodo">Método</a><a href="#diagnostico">Diagnóstico</a><a href="#contato">Contato</a></nav><small>© {new Date().getFullYear()} RP Caconde. Todos os direitos reservados.</small></footer>
  </main>;
}
