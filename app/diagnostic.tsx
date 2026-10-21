'use client';

import { useMemo, useState } from 'react';

const challenges = [
  ['paradas', 'Paradas e gargalos'],
  ['dados', 'Dados sem integração'],
  ['obsolescencia', 'Máquinas obsoletas'],
  ['energia', 'Energia e desperdício'],
];

const stages = [
  ['manual', 'Majoritariamente manual'],
  ['ilhas', 'Automação em ilhas'],
  ['conectada', 'Operação conectada'],
];

const recommendations: Record<string, { title:string; text:string; modules:string[] }> = {
  paradas: { title:'Disponibilidade e performance', text:'Mapear causas de parada, instrumentar os pontos críticos e transformar eventos em uma fila clara de prioridades.', modules:['Coleta de dados','OEE e alarmes','Manutenção'] },
  dados: { title:'Integração de ponta a ponta', text:'Criar uma camada única entre máquinas, supervisão e gestão para eliminar decisões baseadas em informação fragmentada.', modules:['SCADA / MES','Historiador','Integração ERP'] },
  obsolescencia: { title:'Retrofit com evolução planejada', text:'Modernizar controle, segurança e interfaces preservando o que ainda gera valor na máquina.', modules:['CLP e IHM','NR-12','FAT / SAT'] },
  energia: { title:'Inteligência energética', text:'Medir consumo por processo, cruzar energia com produção e atacar desperdícios com contexto operacional.', modules:['Medidores IIoT','Dashboards','Alertas'] },
};

export default function Diagnostic() {
  const [challenge,setChallenge] = useState('paradas');
  const [stage,setStage] = useState('ilhas');
  const recommendation = recommendations[challenge];
  const message = useMemo(() => encodeURIComponent(`Olá! Fiz o diagnóstico no site da RP Caconde. Meu principal desafio é ${challenges.find(([v])=>v===challenge)?.[1]} e hoje nossa maturidade é ${stages.find(([v])=>v===stage)?.[1]}. Gostaria de conversar sobre um projeto.`), [challenge,stage]);

  return (
    <div className="diagnostic-grid">
      <div className="diagnostic-controls">
        <div className="question-block">
          <span className="question-number">01</span>
          <div><p>Qual é o principal desafio da sua operação?</p><div className="choice-grid">{challenges.map(([value,label])=><button className={challenge===value?'active':''} key={value} onClick={()=>setChallenge(value)}><i />{label}</button>)}</div></div>
        </div>
        <div className="question-block">
          <span className="question-number">02</span>
          <div><p>Em que estágio tecnológico a planta está?</p><div className="choice-grid three">{stages.map(([value,label])=><button className={stage===value?'active':''} key={value} onClick={()=>setStage(value)}><i />{label}</button>)}</div></div>
        </div>
      </div>
      <aside className="diagnostic-result" aria-live="polite">
        <div className="result-head"><span>PRIMEIRA LEITURA</span><b>RPC / DX</b></div>
        <span className="result-label">Foco recomendado</span>
        <h3>{recommendation.title}</h3>
        <p>{recommendation.text}</p>
        <div className="module-list">{recommendation.modules.map((item,i)=><span key={item}><b>0{i+1}</b>{item}</span>)}</div>
        <a className="button primary result-button" target="_blank" rel="noreferrer" href={`https://wa.me/5514996088035?text=${message}`}>Aprofundar este diagnóstico <span>↗</span></a>
        <small>Sem compromisso. Conversa direta com nossa engenharia.</small>
      </aside>
    </div>
  );
}
