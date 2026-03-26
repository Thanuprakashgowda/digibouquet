'use client';
import { SelectedFlower } from '@/lib/types';

interface Props {
  flower: SelectedFlower;
  onRemove?: (code: string) => void;
}

export default function SelectedFlowerChip({ flower, onRemove }: Props) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium shadow-sm border border-stone-200 bg-white"
      style={{ borderLeftColor: flower.color, borderLeftWidth: 3 }}
    >
      <span>{flower.emoji}</span>
      <span className="text-stone-700">{flower.name}</span>
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(flower.code)}
          className="ml-0.5 text-stone-400 hover:text-rose-500 transition-colors"
          aria-label={`Remove ${flower.name}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
