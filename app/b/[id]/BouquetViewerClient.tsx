'use client';

import { useEffect, useRef } from 'react';
import { Bouquet } from '@/lib/types';
import BouquetPreview from '@/components/BouquetPreview';
import Button from '@/components/Button';
import Link from 'next/link';
import clsx from 'clsx';

interface Props {
  bouquet: Bouquet;
}

export default function BouquetViewerClient({ bouquet }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      cardRef.current?.classList.add('slide-up');
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 py-8 fade-in">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">
          Someone sent you a bouquet
        </p>
        {bouquet.title && (
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-800">
            {bouquet.title}
          </h1>
        )}
      </div>

      {/* Bouquet cluster – uses saved arrangement + greenery */}
      <div className="bouquet-flower" style={{ animationDelay: '0.1s' }}>
        <BouquetPreview
          flowers={bouquet.flowers}
          arrangement={bouquet.arrangement ?? 'circle'}
          greenery={bouquet.greenery ?? 'soft'}
          animate
          size={220}
        />
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className={clsx(
          'w-full max-w-sm opacity-0 rounded-2xl bg-linear-to-br p-8 shadow-xl border border-white/60',
          bouquet.style.bg
        )}
      >
        {bouquet.title && (
          <p className={clsx('text-xs uppercase tracking-widest mb-2', bouquet.style.accent)}>
            {bouquet.title}
          </p>
        )}
        <p
          className={clsx(
            'font-serif text-lg leading-relaxed whitespace-pre-wrap',
            bouquet.style.accent
          )}
        >
          {bouquet.message}
        </p>
        <div className="mt-4 flex flex-wrap gap-1">
          {bouquet.flowers.map((f) => (
            <span key={f.code} className="text-xl" title={f.name}>
              {f.emoji}
            </span>
          ))}
        </div>
        <p className="mt-4 text-right text-xs opacity-40">
          {new Date(bouquet.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Flower legend */}
      <div className="w-full max-w-sm rounded-2xl border border-stone-100 bg-white p-5 shadow-sm slide-up delay-500 opacity-0">
        <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4">
          What these flowers mean
        </h3>
        <ul className="space-y-3">
          {bouquet.flowers.map((f) => (
            <li key={f.code} className="flex items-start gap-3 text-sm">
              <span className="text-2xl shrink-0">{f.emoji}</span>
              <div>
                <p className="font-medium text-stone-700">{f.name}</p>
                <p className="text-stone-400 text-xs leading-snug">{f.meaning}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center slide-up delay-700 opacity-0">
        <p className="text-sm text-stone-400 mb-3">Want to send your own bouquet?</p>
        <Link href="/">
          <Button size="lg">🌸 Build a Bouquet</Button>
        </Link>
      </div>
    </div>
  );
}
