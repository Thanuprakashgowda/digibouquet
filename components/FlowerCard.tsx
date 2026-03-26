'use client';
import { Flower } from '@/lib/types';
import { GetFlowerSVG } from './FlowerSVG';
import clsx from 'clsx';

interface Props {
  flower: Flower;
  selected: boolean;
  onToggle: (flower: Flower) => void;
  disabled?: boolean;
}

export default function FlowerCard({ flower, selected, onToggle, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(flower)}
      disabled={disabled && !selected}
      className={clsx(
        'relative flex flex-col items-center gap-2 rounded-2xl border-2 p-3 text-center transition-all duration-200 cursor-pointer',
        'hover:shadow-lg hover:-translate-y-0.5',
        selected
          ? 'border-rose-400 bg-rose-50 shadow-rose-200 shadow-md'
          : 'border-stone-200 bg-white hover:border-rose-300',
        disabled && !selected && 'opacity-40 cursor-not-allowed'
      )}
    >
      {selected && (
        <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-400 text-white text-xs font-bold z-10">
          ✓
        </span>
      )}

      {/* Realistic SVG illustration */}
      <div className="flex items-center justify-center" style={{ height: 64 }}>
        <GetFlowerSVG code={flower.code} scale={1.07} />
      </div>

      {/* Color dot */}
      <div
        className="h-2 w-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: flower.color }}
      />
      <p className="text-sm font-semibold text-stone-800 leading-tight">{flower.name}</p>
      <p className="text-xs text-stone-500 leading-snug line-clamp-2">{flower.meaning}</p>
    </button>
  );
}
