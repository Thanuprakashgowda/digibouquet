'use client';

import { ArrangementId, GreeneryId, ARRANGEMENTS, GREENERIES } from '@/components/BouquetPreview';
import clsx from 'clsx';

interface Props {
  arrangement: ArrangementId;
  greenery: GreeneryId;
  onNextArrangement: () => void;
  onNextGreenery: () => void;
  className?: string;
}

export default function ArrangementControls({
  arrangement,
  greenery,
  onNextArrangement,
  onNextGreenery,
  className,
}: Props) {
  const currentArr = ARRANGEMENTS.find((a) => a.id === arrangement)!;
  const currentGreen = GREENERIES.find((g) => g.id === greenery)!;

  return (
    <div className={clsx('flex flex-col items-center gap-3', className)}>
      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
        Customize your bouquet
      </p>
      <div className="flex gap-3">
        {/* Try a new arrangement */}
        <button
          type="button"
          onClick={onNextArrangement}
          className="flex items-center gap-2 rounded-full bg-stone-800 px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow hover:bg-stone-700 active:scale-95 transition-all duration-150"
        >
          <span>✦</span>
          <span>Try a New Arrangement</span>
          <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[9px]">
            {currentArr.label}
          </span>
        </button>

        {/* Change greenery */}
        <button
          type="button"
          onClick={onNextGreenery}
          className="flex items-center gap-2 rounded-full border-2 border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold tracking-wide text-stone-700 hover:border-green-400 hover:text-green-700 active:scale-95 transition-all duration-150"
        >
          <span>{currentGreen.emoji}</span>
          <span>Change Greenery</span>
        </button>
      </div>
    </div>
  );
}
