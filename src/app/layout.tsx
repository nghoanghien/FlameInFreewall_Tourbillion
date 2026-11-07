import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FlameGuard AI — Flame in Freefall | NASA Space Apps Challenge',
  description:
    'Evidence-first scientific research and spacecraft fire safety intelligence platform exploring microgravity combustion investigations from NASA Physical Sciences Informatics (PSI).',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] antialiased selection:bg-[#D4FC02]/30 selection:text-[#0B2374]">
        {children}
      </body>
    </html>
  );
}
