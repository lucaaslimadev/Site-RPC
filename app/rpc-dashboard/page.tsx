import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RPC Industrial Suite | Demonstração',
  description: 'Ambiente demonstrativo do RPC Industrial Suite com dados industriais simulados em tempo real.',
};

export default function RpcDashboardPage() {
  return (
    <main className="dashboard-route">
      <iframe
        src="/rpc-suite/dashboard.html"
        title="RPC Industrial Suite — ambiente de demonstração"
        className="dashboard-frame"
      />
    </main>
  );
}
