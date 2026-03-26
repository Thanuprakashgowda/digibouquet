'use client';
import { Occasion } from '@/lib/types';
import clsx from 'clsx';

const OCCASIONS: { value: Occasion; label: string; emoji: string }[] = [
  { value: 'birthday', label: 'Birthday', emoji: '🎂' },
  { value: 'love', label: 'Love', emoji: '❤️' },
  { value: 'friendship', label: 'Friendship', emoji: '🤝' },
  { value: 'congratulations', label: 'Congratulations', emoji: '🎉' },
  { value: 'gratitude', label: 'Gratitude', emoji: '🙏' },
  { value: 'apology', label: 'Apology', emoji: '🕊️' },
  { value: 'sympathy', label: 'Sympathy', emoji: '💙' },
  { value: 'general', label: 'Just Because', emoji: '🌸' },
];

interface Props {
  selected: Occasion | null;
  onSelect: (o: Occasion) => void;
}

export default function OccasionPicker({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {OCCASIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onSelect(o.value)}
          className={clsx(
            'flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200',
            'hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
            selected === o.value
              ? 'border-rose-400 bg-rose-50 shadow-rose-200 shadow-md'
              : 'border-stone-200 bg-white hover:border-rose-300'
          )}
        >
          <span className="text-3xl">{o.emoji}</span>
          <span className="text-sm font-medium text-stone-700">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
