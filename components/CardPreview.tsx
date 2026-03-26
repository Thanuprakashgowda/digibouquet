'use client';
import { CardStyle, SelectedFlower } from '@/lib/types';
import clsx from 'clsx';

interface Props {
  style: CardStyle;
  title?: string;
  message: string;
  flowers: SelectedFlower[];
}

export default function CardPreview({ style, title, message, flowers }: Props) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-gradient-to-br p-6 shadow-lg border border-white/60 max-w-sm w-full',
        style.bg
      )}
    >
      {title && (
        <p className={clsx('text-xs uppercase tracking-widest font-medium mb-1', style.accent)}>
          {title}
        </p>
      )}
      <p
        className={clsx(
          'font-serif text-lg leading-relaxed whitespace-pre-wrap',
          style.accent
        )}
      >
        {message || (
          <span className="opacity-40 italic">Your message will appear here…</span>
        )}
      </p>
      {flowers.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1">
          {flowers.map((f) => (
            <span key={f.code} className="text-lg" title={f.name}>
              {f.emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
