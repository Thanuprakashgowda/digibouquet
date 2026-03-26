'use client';
import { SelectedFlower } from '@/lib/types';
import BouquetCanvas from './BouquetCanvas';

// ── Arrangement / Greenery types & data ───────────────────────────────────
export type ArrangementId = 'circle' | 'fan' | 'cascade' | 'bunch' | 'diamond';
export type GreeneryId    = 'soft' | 'lush' | 'minimal' | 'tropical' | 'none';

export const ARRANGEMENTS: { id: ArrangementId; label: string }[] = [
  { id: 'circle',  label: 'Circle'  },
  { id: 'fan',     label: 'Fan'     },
  { id: 'cascade', label: 'Cascade' },
  { id: 'bunch',   label: 'Bunch'   },
  { id: 'diamond', label: 'Diamond' },
];

export const GREENERIES: { id: GreeneryId; label: string; emoji: string; bg: string }[] = [
  { id: 'soft',     label: 'Soft',      emoji: '🌿', bg: 'from-green-50 to-emerald-100'  },
  { id: 'lush',     label: 'Lush',      emoji: '🍃', bg: 'from-emerald-100 to-green-200' },
  { id: 'minimal',  label: 'Minimal',   emoji: '🪴', bg: 'from-stone-50 to-stone-100'    },
  { id: 'tropical', label: 'Tropical',  emoji: '🌴', bg: 'from-teal-50 to-cyan-100'      },
  { id: 'none',     label: 'No leaves', emoji: '⬜', bg: 'from-white to-pink-50'         },
];

// ── Component ─────────────────────────────────────────────────────────────
interface Props {
  flowers: SelectedFlower[];
  arrangement?: ArrangementId;
  greenery?: GreeneryId;
  animate?: boolean;
  size?: number;
}

export default function BouquetPreview({
  flowers,
  arrangement = 'circle',
  greenery = 'soft',
  animate = false,
  size = 220,
}: Props) {
  if (!flowers.length) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-stone-50 border-2 border-dashed border-stone-200 text-stone-400 text-sm"
        style={{ width: size, height: size }}
      >
        Pick flowers
      </div>
    );
  }

  return (
    <BouquetCanvas
      flowers={flowers}
      arrangement={arrangement}
      greenery={greenery}
      animate={animate}
      width={size}
    />
  );
}
