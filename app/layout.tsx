import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'RP Caconde | Engenharia, Automação e Sistemas Industriais',
  description: 'Soluções industriais sob medida: automação, engenharia elétrica, SCADA, MES, ERP, IIoT e retrofitting de máquinas.',
  openGraph: {
    title: 'RP Caconde | Do chão de fábrica à decisão',
    description: 'Engenharia, automação e sistemas industriais sob medida para conectar toda a sua operação.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'Do chão de fábrica à decisão — RP Caconde' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RP Caconde | Do chão de fábrica à decisão',
    description: 'Engenharia, automação e sistemas industriais sob medida para conectar toda a sua operação.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
