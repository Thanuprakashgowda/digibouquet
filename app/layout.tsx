import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'DigiBouquet – Build & Share Digital Flower Bouquets',
  description:
    'Create beautiful digital bouquets with personalised messages. Pick flowers, choose a card style, and share your creation with a unique link.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-stone-50 text-stone-800 min-h-screen antialiased">
        {/* Nav */}
        <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <span className="font-serif text-lg text-rose-500 font-semibold tracking-tight">
                DigiBouquet
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium text-stone-500">
              <Link
                href="/library"
                className="hover:text-rose-500 transition-colors"
              >
                Flower Library
              </Link>
              <Link
                href="/"
                className="rounded-full bg-rose-400 px-4 py-1.5 text-white hover:bg-rose-500 transition-colors"
              >
                Build a Bouquet
              </Link>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>

        <footer className="mt-16 border-t border-stone-200 bg-white py-8 text-center text-xs text-stone-400">
          <p>🌸 DigiBouquet – share blooms, spread joy</p>
          <p className="mt-1">
            Created by{' '}
            <a
              href="https://www.linkedin.com/in/thanuprakash-gowda/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-500 hover:text-rose-400 underline underline-offset-2 transition-colors"
            >
              Thanuprakash Gowda
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
