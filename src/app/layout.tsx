import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Manrope, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

const display = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext', 'cyrillic-ext'],
  variable: '--font-display-family',
  display: 'swap',
});

const body = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-body-family',
  display: 'swap',
});

const tech = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-tech-family',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Официальный сервис Gaggenau',
  description:
    'Ремонт техники Gaggenau · Москва и Подмосковье до 100 км',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} ${tech.variable}`}>
      <body>{children}</body>
    </html>
  );
}
