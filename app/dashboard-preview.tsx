'use client';

import { useState } from 'react';

type ModuleKey = 'overview' | 'production' | 'energy' | 'alarms' | 'maintenance';

type ModuleData = {
  label: string;
  eyebrow: string;
  title: string;
  chartTitle: string;
  chartLabel: string;
  bars: number[];
  metrics: Array<{ label: string; value: string; detail: string; tone?: 'warning' | 'cyan' }>;
  listTitle: string;
  rows: Array<{ name: string; status: string; tone?: 'warning' | 'cyan' }>;
};

const modules: Record<ModuleKey, ModuleData> = {
  overview: {
    label: 'Visão geral', eyebrow: 'Bom dia, Operação', title: 'Visão geral da planta',
    chartTitle: 'Performance · últimas 12h', chartLabel: 'OEE',
    bars: [52, 63, 48, 69, 74, 61, 82, 78, 88, 84, 91, 94],
    metrics: [
      { label: 'OEE global', value: '94,2%', detail: '↑ 3,8% no período' },
      { label: 'Produção hoje', value: '8.420', detail: 'peças / meta 9.100' },
      { label: 'Energia / peça', value: '1,84', detail: 'kWh · ↓ 12,4%', tone: 'cyan' },
      { label: 'Alarmes ativos', value: '03', detail: '1 requer atenção', tone: 'warning' },
    ],
    listTitle: 'Status das células',
    rows: [
      { name: 'Linha A', status: 'Operando' }, { name: 'Linha B', status: 'Operando' },
      { name: 'Robô 03', status: 'Atenção', tone: 'warning' }, { name: 'Utilidades', status: 'Operando' },
    ],
  },
  production: {
    label: 'Produção', eyebrow: 'Execução em tempo real', title: 'Ritmo e qualidade da produção',
    chartTitle: 'Peças produzidas · por hora', chartLabel: 'REAL × META',
    bars: [45, 58, 66, 61, 72, 77, 69, 83, 88, 81, 92, 87],
    metrics: [
      { label: 'Produção hoje', value: '8.420', detail: '92,5% da meta' },
      { label: 'Ritmo atual', value: '612', detail: 'peças / hora' },
      { label: 'Tempo de ciclo', value: '18,6s', detail: '↓ 1,2s no turno', tone: 'cyan' },
      { label: 'Refugo', value: '1,3%', detail: 'dentro do limite' },
    ],
    listTitle: 'Ordens em execução',
    rows: [
      { name: 'OP 1842 · Linha A', status: '68%' }, { name: 'OP 1844 · Linha B', status: '41%' },
      { name: 'OP 1847 · Robô 03', status: 'Pausada', tone: 'warning' }, { name: 'OP 1849 · Célula 04', status: '12%' },
    ],
  },
  energy: {
    label: 'Energia', eyebrow: 'Gestão de utilidades', title: 'Consumo e eficiência energética',
    chartTitle: 'Demanda · últimas 12h', chartLabel: 'kW',
    bars: [68, 71, 64, 77, 73, 81, 88, 76, 69, 65, 61, 58],
    metrics: [
      { label: 'Energia / peça', value: '1,84', detail: 'kWh por unidade' },
      { label: 'Demanda atual', value: '742 kW', detail: 'faixa controlada' },
      { label: 'Economia', value: '12,4%', detail: 'vs. período anterior', tone: 'cyan' },
      { label: 'Pico do turno', value: '812 kW', detail: 'às 10h42', tone: 'warning' },
    ],
    listTitle: 'Maiores consumidores',
    rows: [
      { name: 'Prensas', status: '31%' }, { name: 'Ar comprimido', status: '24%' },
      { name: 'Refrigeração', status: '18%', tone: 'cyan' }, { name: 'Linha de pintura', status: '14%' },
    ],
  },
  alarms: {
    label: 'Alarmes', eyebrow: 'Eventos e rastreabilidade', title: 'Alarmes que exigem atenção',
    chartTitle: 'Ocorrências · últimas 12h', chartLabel: 'EVENTOS',
    bars: [22, 34, 18, 46, 29, 55, 31, 25, 64, 38, 21, 28],
    metrics: [
      { label: 'Alarmes ativos', value: '03', detail: '2 em diagnóstico', tone: 'warning' },
      { label: 'Prioridade alta', value: '01', detail: 'Robô 03', tone: 'warning' },
      { label: 'Reconhecidos', value: '12', detail: 'no turno atual' },
      { label: 'Resposta média', value: '8 min', detail: '↓ 22% no mês', tone: 'cyan' },
    ],
    listTitle: 'Últimos eventos',
    rows: [
      { name: 'Robô 03 · temperatura', status: 'Alta', tone: 'warning' }, { name: 'Linha B · sensor S14', status: 'Reconhecido' },
      { name: 'Utilidades · pressão', status: 'Normal', tone: 'cyan' }, { name: 'Linha A · proteção', status: 'Resolvido' },
    ],
  },
  maintenance: {
    label: 'Manutenção', eyebrow: 'Confiabilidade dos ativos', title: 'Saúde e disponibilidade da planta',
    chartTitle: 'Disponibilidade · últimos 12 dias', chartLabel: 'ATIVOS',
    bars: [74, 78, 82, 76, 86, 89, 85, 91, 88, 94, 92, 97],
    metrics: [
      { label: 'Disponibilidade', value: '96,8%', detail: '↑ 2,1% no mês' },
      { label: 'OS abertas', value: '04', detail: '2 programadas' },
      { label: 'MTBF', value: '186 h', detail: 'entre falhas' },
      { label: 'MTTR', value: '42 min', detail: '↓ 11 min no mês', tone: 'cyan' },
    ],
    listTitle: 'Próximas intervenções',
    rows: [
      { name: 'Prensa P02', status: 'Hoje · 16h' }, { name: 'Robô 03', status: 'Amanhã · 08h', tone: 'warning' },
      { name: 'Compressor C01', status: '03 set' }, { name: 'Painel CCM-02', status: '05 set' },
    ],
  },
};

const moduleKeys = Object.keys(modules) as ModuleKey[];

export default function DashboardPreview() {
  const [activeKey, setActiveKey] = useState<ModuleKey>('overview');
  const [refreshCount, setRefreshCount] = useState(0);
  const active = modules[activeKey];

  return (
    <div className="dashboard-preview" aria-label="Demonstração interativa resumida do RPC Industrial Suite">
      <div className="preview-topbar">
        <span className="preview-brand"><i aria-hidden="true" /> RPC / INDUSTRIAL OS</span>
        <div className="preview-top-status">
          <span>PLANTA 01</span><b><i aria-hidden="true" /> CONECTADA</b>
          <span className="preview-demo-badge">DEMO INTERATIVA</span>
        </div>
      </div>

      <div className="preview-layout">
        <nav className="preview-nav" aria-label="Módulos da demonstração">
          {moduleKeys.map((key) => (
            <button
              type="button"
              key={key}
              className={activeKey === key ? 'active' : ''}
              aria-pressed={activeKey === key}
              onClick={() => setActiveKey(key)}
            >
              <span>{modules[key].label}</span><small aria-hidden="true">0{moduleKeys.indexOf(key) + 1}</small>
            </button>
          ))}
          <a href="/rpc-dashboard" className="preview-nav-full">Sistema completo <span>↗</span></a>
        </nav>

        <div className="preview-main" key={activeKey}>
          <div className="preview-titlebar">
            <div><span>{active.eyebrow}</span><strong>{active.title}</strong></div>
            <button type="button" onClick={() => setRefreshCount((count) => count + 1)} aria-label="Atualizar dados demonstrativos">
              <i aria-hidden="true" /> ATUALIZADO AGORA{refreshCount > 0 ? ` · ${refreshCount + 1}` : ''}
            </button>
          </div>

          <div className="preview-kpis">
            {active.metrics.map((metric) => (
              <article key={metric.label} className={metric.tone ? `tone-${metric.tone}` : ''}>
                <span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}</small>
              </article>
            ))}
          </div>

          <div className="preview-data-grid">
            <article className="preview-chart">
              <div className="preview-panel-head"><span>{active.chartTitle}</span><b>— {active.chartLabel}</b></div>
              <div className="preview-bars" aria-label={`Gráfico demonstrativo de ${active.chartTitle.toLowerCase()}`}>
                {active.bars.map((height, index) => <i key={`${activeKey}-${index}`} style={{ height: `${height}%`, animationDelay: `${index * 28}ms` }} />)}
              </div>
              <div className="preview-chart-axis"><span>INÍCIO</span><span>AGORA</span></div>
            </article>

            <article className="preview-list">
              <div className="preview-panel-head"><span>{active.listTitle}</span><b>AO VIVO</b></div>
              <div className="preview-rows">
                {active.rows.map((row) => (
                  <div key={row.name} className={row.tone ? `tone-${row.tone}` : ''}>
                    <span><i aria-hidden="true" />{row.name}</span><b>{row.status}</b>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="preview-footer">
            <p><i aria-hidden="true" /> Você está explorando uma simulação resumida com dados ilustrativos.</p>
            <a href="/rpc-dashboard">Explorar plataforma completa <span>↗</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}
