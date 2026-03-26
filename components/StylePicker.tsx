'use client';
import { CardStyle } from '@/lib/types';
import { CARD_STYLES } from '@/lib/styles';
import clsx from 'clsx';

interface Props {
  selected: CardStyle | null;
  onSelect: (s: CardStyle) => void;
}

export default function StylePicker({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {CARD_STYLES.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onSelect(s)}
          className={clsx(
            'rounded-2xl border-2 p-5 text-sm font-medium transition-all duration-200 cursor-pointer',
            `bg-gradient-to-br ${s.bg}`,
            selected?.id === s.id
              ? 'border-rose-400 shadow-md shadow-rose-200'
              : 'border-stone-200 hover:border-rose-300 hover:shadow-md hover:-translate-y-0.5',
            s.accent
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
