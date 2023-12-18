import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConvexClientProvider from './ConvexClientProvider';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

let title = 'notesGPT - Take notes with your voice';
let description = 'Generate action items from your notes in seconds';
let url = 'https://www.notesgpt.vercel.app';
let ogimage = 'https://www.notesgpt.vercel.app/images/og-image.png';
let sitename = 'notesgpt.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          {children}
          <Footer />{' '}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
