import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import type { PropsWithChildren } from 'react';

import Sidebar from '@/components/Sidebar';
import Navigation from '@/components/Navigation';
import './globals.css';

const rubikFont = Rubik({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: 'CASHINO - Gamble your way to victory',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${rubikFont.className} antialiased`}>
        <div className="flex h-full flex-col">
          <Navigation />
          <div className="flex h-full">
            <Sidebar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
