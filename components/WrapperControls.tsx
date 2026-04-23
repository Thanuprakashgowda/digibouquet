'use client';

import { WrapperId } from '@/lib/types';

export const WRAPPERS: { id: WrapperId; label: string; icon: string }[] = [
  { id: 'ribbon-pink', label: 'Pink Ribbon', icon: '🎀' },
  { id: 'ribbon-blue', label: 'Blue Ribbon', icon: '🎗️' },
  { id: 'kraft-paper', label: 'Kraft Paper', icon: '📜' },
  { id: 'glass-vase', label: 'Glass Vase', icon: '🏺' },
  { id: 'ceramic-vase', label: 'Ceramic Vase', icon: '🍶' },
];

interface Props {
  wrapper: WrapperId;
  onNextWrapper: () => void;
}

export default function WrapperControls({ wrapper, onNextWrapper }: Props) {
  const currentWrapper = WRAPPERS.find((w) => w.id === wrapper) || WRAPPERS[0];

  return (
    <div className="flex bg-white rounded-full p-1.5 shadow-sm border border-stone-200">
      <div className="flex items-center gap-2 px-3 py-1">
        <span className="text-stone-400 text-xs font-semibold tracking-wider uppercase">
          Container
        </span>
        <button
          onClick={onNextWrapper}
          className="flex items-center gap-2 hover:bg-stone-50 px-2 py-1 rounded-full transition-colors group"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">{currentWrapper.icon}</span>
          <span className="text-sm font-medium text-stone-700 w-24 text-left">
            {currentWrapper.label}
          </span>
          <span className="text-stone-300 text-xs">↻</span>
        </button>
      </div>
    </div>
  );
}
