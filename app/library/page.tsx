'use client';

import { useState } from 'react';
import { FLOWERS } from '@/lib/flowers';
import { Occasion } from '@/lib/types';
import { CARD_STYLES } from '@/lib/styles';
import BouquetPreview from '@/components/BouquetPreview';
import CardPreview from '@/components/CardPreview';
import Link from 'next/link';
import clsx from 'clsx';

const OCCASION_FILTERS: { value: Occasion | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All Flowers', emoji: '🌿' },
  { value: 'birthday', label: 'Birthday', emoji: '🎂' },
  { value: 'love', label: 'Love', emoji: '❤️' },
  { value: 'friendship', label: 'Friendship', emoji: '🤝' },
  { value: 'congratulations', label: 'Congratulations', emoji: '🎉' },
  { value: 'gratitude', label: 'Gratitude', emoji: '🙏' },
  { value: 'apology', label: 'Apology', emoji: '🕊️' },
  { value: 'sympathy', label: 'Sympathy', emoji: '💙' },
];

const SAMPLE_BOUQUETS = [
  {
    id: 'sample-birthday',
    label: 'Birthday Joy',
    occasion: 'birthday' as Occasion,
    flowers: ['sunflower', 'tulip-pink', 'rose-pink', 'marigold'].map(
      (code) => FLOWERS.find((f) => f.code === code)!
    ),
    message: 'Wishing you a day as bright and beautiful as these blooms. Happy Birthday! 🎉',
    style: CARD_STYLES[3], // sunrise
  },
  {
    id: 'sample-love',
    label: 'Love Letter',
    occasion: 'love' as Occasion,
    flowers: ['rose-red', 'lavender', 'peony', 'carnation-pink'].map(
      (code) => FLOWERS.find((f) => f.code === code)!
    ),
    message: 'Every petal in this bouquet holds a piece of my heart. Thinking of you always.',
    style: CARD_STYLES[0], // blossom
  },
  {
    id: 'sample-sympathy',
    label: 'Gentle Comfort',
    occasion: 'sympathy' as Occasion,
    flowers: ['lily-white', 'hydrangea', 'rose-white', 'iris'].map(
      (code) => FLOWERS.find((f) => f.code === code)!
    ),
    message: 'Sending you warmth, peace, and love during this difficult time. You are not alone.',
    style: CARD_STYLES[4], // ocean
  },
];

export default function LibraryPage() {
  const [filter, setFilter] = useState<Occasion | 'all'>('all');
  const [expandedSample, setExpandedSample] = useState<string | null>(null);

  const visibleFlowers =
    filter === 'all'
      ? FLOWERS
      : FLOWERS.filter((f) => f.bestForOccasions.includes(filter));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl text-stone-800 mb-3">
          🌿 Flower Library
        </h1>
        <p className="text-stone-500 max-w-md mx-auto">
          Every flower carries a meaning. Explore our collection and find the
          perfect blooms for your bouquet.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {OCCASION_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
              filter === f.value
                ? 'border-rose-400 bg-rose-50 text-rose-600 shadow-sm'
                : 'border-stone-200 bg-white text-stone-500 hover:border-rose-300 hover:text-rose-500'
            )}
          >
            <span>{f.emoji}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Flower grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {visibleFlowers.map((flower) => (
          <div
            key={flower.code}
            className="flex items-start gap-4 rounded-2xl border border-stone-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl shadow-inner"
              style={{ backgroundColor: flower.color + '33' }}
            >
              {flower.emoji}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-stone-800 text-sm">{flower.name}</p>
              <p className="text-xs text-stone-500 mt-0.5 leading-snug">{flower.meaning}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {flower.bestForOccasions.map((o) => (
                  <span
                    key={o}
                    className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] text-rose-500 font-medium"
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sample Bouquets */}
      <section>
        <h2 className="font-serif text-2xl text-stone-700 mb-6 text-center">
          Sample Bouquets
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {SAMPLE_BOUQUETS.map((sample) => (
            <div key={sample.id} className="flex flex-col items-center gap-4">
              <button
                onClick={() =>
                  setExpandedSample(
                    expandedSample === sample.id ? null : sample.id
                  )
                }
                className="w-full rounded-2xl border border-stone-100 bg-white p-4 shadow-sm hover:shadow-md transition-all text-center cursor-pointer"
              >
                <p className="font-semibold text-stone-700 mb-3">{sample.label}</p>
                <div className="flex justify-center">
                  <BouquetPreview flowers={sample.flowers} />
                </div>
                <p className="text-xs text-rose-400 mt-3">
                  {expandedSample === sample.id ? '▲ Hide details' : '▼ Show card'}
                </p>
              </button>

              {expandedSample === sample.id && (
                <div className="w-full slide-up">
                  <CardPreview
                    style={sample.style}
                    message={sample.message}
                    flowers={sample.flowers}
                  />
                  <ul className="mt-3 space-y-1.5">
                    {sample.flowers.map((f) => (
                      <li key={f.code} className="flex items-center gap-2 text-xs text-stone-500">
                        <span>{f.emoji}</span>
                        <span className="font-medium text-stone-700">{f.name}</span>
                        {' – '}
                        <span className="italic">{f.meaning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-14 text-center">
        <p className="text-stone-400 mb-4">Ready to build your own?</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-rose-400 px-8 py-3 text-base font-medium text-white hover:bg-rose-500 transition-colors shadow hover:shadow-md"
        >
          🌸 Build a Bouquet
        </Link>
      </div>
    </div>
  );
}
