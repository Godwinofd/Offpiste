import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import CursorTrail from '@/components/effects/CursorTrail';
import { ThemeProvider } from '@/context/ThemeContext';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OFFPISTE | Cinematic Ski Adventures',
  description: 'Experience the thrill of untouched powder. World-class ski expeditions, luxury chalet retreats, and heli-ski adventures.',
  keywords: ['ski', 'adventure', 'travel', 'luxury', 'offpiste', 'mountains'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        'min-h-screen bg-deep-black font-sans antialiased overflow-x-hidden selection:bg-warm-gold-500 selection:text-white',
        oswald.variable,
        inter.variable
      )}>
        <ThemeProvider>
          <CursorTrail />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
