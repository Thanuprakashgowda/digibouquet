import React from 'react';
import { SelectedFlower, WrapperId } from '@/lib/types';
import { GetFlowerSVG } from './FlowerSVG';
import { ArrangementId, GreeneryId } from './BouquetPreview';

// ── Layout definitions ─────────────────────────────────────────────────────
// Each position: { cx, cy, scale, z } within a 280×300 canvas

type Slot = { cx: number; cy: number; scale: number; z: number };

function getSlots(arrangement: ArrangementId, count: number): Slot[] {
  const n = Math.min(count, 7);

  const allSlots: Record<ArrangementId, Slot[]> = {
    circle: [
      { cx: 140, cy: 162, scale: 1.05, z: 4 },    // center-front
      { cx: 88,  cy: 140, scale: 0.88, z: 3 },    // left-mid
      { cx: 192, cy: 140, scale: 0.88, z: 3 },    // right-mid
      { cx: 140, cy: 102, scale: 0.74, z: 2 },    // center-back
      { cx: 58,  cy: 160, scale: 0.82, z: 2 },    // far-left
      { cx: 222, cy: 160, scale: 0.82, z: 2 },    // far-right
      { cx: 140, cy: 72,  scale: 0.66, z: 1 },    // top
    ],
    fan: [
      { cx: 140, cy: 180, scale: 1.10, z: 5 },    // big center-bottom
      { cx: 88,  cy: 148, scale: 0.90, z: 4 },
      { cx: 192, cy: 148, scale: 0.90, z: 4 },
      { cx: 56,  cy: 168, scale: 0.84, z: 3 },
      { cx: 224, cy: 168, scale: 0.84, z: 3 },
      { cx: 140, cy: 112, scale: 0.78, z: 2 },
      { cx: 140, cy: 82,  scale: 0.68, z: 1 },
    ],
    cascade: [
      { cx: 200, cy: 90,  scale: 0.72, z: 1 },
      { cx: 180, cy: 118, scale: 0.80, z: 2 },
      { cx: 158, cy: 146, scale: 0.88, z: 3 },
      { cx: 136, cy: 170, scale: 0.96, z: 4 },
      { cx: 112, cy: 190, scale: 1.02, z: 5 },
      { cx: 88,  cy: 158, scale: 0.84, z: 3 },
      { cx: 224, cy: 128, scale: 0.76, z: 2 },
    ],
    bunch: [
      { cx: 140, cy: 152, scale: 1.06, z: 5 },    // center
      { cx: 100, cy: 130, scale: 0.88, z: 4 },
      { cx: 180, cy: 130, scale: 0.88, z: 4 },
      { cx: 78,  cy: 160, scale: 0.82, z: 3 },
      { cx: 202, cy: 160, scale: 0.82, z: 3 },
      { cx: 140, cy: 110, scale: 0.80, z: 3 },
      { cx: 140, cy: 82,  scale: 0.68, z: 2 },
    ],
    diamond: [
      { cx: 140, cy: 68,  scale: 0.76, z: 2 },    // top
      { cx: 80,  cy: 128, scale: 0.88, z: 3 },    // left-upper
      { cx: 200, cy: 128, scale: 0.88, z: 3 },    // right-upper
      { cx: 140, cy: 160, scale: 1.06, z: 5 },    // center
      { cx: 68,  cy: 178, scale: 0.84, z: 4 },    // left-lower
      { cx: 212, cy: 178, scale: 0.84, z: 4 },    // right-lower
      { cx: 140, cy: 220, scale: 0.78, z: 3 },    // bottom
    ],
  };

  return allSlots[arrangement].slice(0, n);
}

// ── Greenery SVG paths ─────────────────────────────────────────────────────

interface GreeneryDef {
  bg: string;
  leaves: React.ReactNode;
}

function getGreenery(g: GreeneryId): GreeneryDef {
  switch (g) {
    case 'lush':
      return {
        bg: '#d1fae5',
        leaves: <>
          <path d="M140,250 Q60,200 20,160" stroke="#16a34a" strokeWidth="2.5" fill="none"/>
          <path d="M140,250 Q60,220 10,200" stroke="#15803d" strokeWidth="2" fill="none"/>
          <path d="M140,250 Q220,200 260,160" stroke="#16a34a" strokeWidth="2.5" fill="none"/>
          <path d="M140,250 Q220,220 270,200" stroke="#15803d" strokeWidth="2" fill="none"/>
          <ellipse cx="22" cy="162" rx="18" ry="10" fill="#22c55e" transform="rotate(-30 22 162)" opacity="0.85"/>
          <ellipse cx="258" cy="162" rx="18" ry="10" fill="#22c55e" transform="rotate(30 258 162)" opacity="0.85"/>
          <ellipse cx="12" cy="202" rx="16" ry="9" fill="#4ade80" transform="rotate(-50 12 202)" opacity="0.75"/>
          <ellipse cx="268" cy="202" rx="16" ry="9" fill="#4ade80" transform="rotate(50 268 202)" opacity="0.75"/>
          <path d="M140,250 Q120,210 100,185" stroke="#15803d" strokeWidth="2" fill="none"/>
          <ellipse cx="100" cy="186" rx="14" ry="8" fill="#16a34a" transform="rotate(-20 100 186)" opacity="0.8"/>
          <path d="M140,250 Q160,210 180,185" stroke="#15803d" strokeWidth="2" fill="none"/>
          <ellipse cx="180" cy="186" rx="14" ry="8" fill="#16a34a" transform="rotate(20 180 186)" opacity="0.8"/>
        </>,
      };
    case 'minimal':
      return {
        bg: '#f5f5f4',
        leaves: <>
          <path d="M140,250 Q90,220 60,190" stroke="#86efac" strokeWidth="1.8" fill="none"/>
          <path d="M140,250 Q190,220 220,190" stroke="#86efac" strokeWidth="1.8" fill="none"/>
          <ellipse cx="62" cy="192" rx="14" ry="7" fill="#bbf7d0" transform="rotate(-25 62 192)" opacity="0.7"/>
          <ellipse cx="218" cy="192" rx="14" ry="7" fill="#bbf7d0" transform="rotate(25 218 192)" opacity="0.7"/>
        </>,
      };
    case 'tropical':
      return {
        bg: '#ccfbf1',
        leaves: <>
          <path d="M140,250 Q50,190 15,140" stroke="#0d9488" strokeWidth="3" fill="none"/>
          <path d="M140,250 Q230,190 265,140" stroke="#0d9488" strokeWidth="3" fill="none"/>
          {/* Palm-like wide leaves */}
          <path d="M140,240 Q40,190 10,140" fill="#2dd4bf" opacity="0.7"/>
          <path d="M140,240 Q240,190 270,140" fill="#2dd4bf" opacity="0.7"/>
          <ellipse cx="14" cy="143" rx="20" ry="10" fill="#0d9488" transform="rotate(-45 14 143)" opacity="0.8"/>
          <ellipse cx="266" cy="143" rx="20" ry="10" fill="#0d9488" transform="rotate(45 266 143)" opacity="0.8"/>
          <path d="M140,250 Q100,195 85,160" stroke="#14b8a6" strokeWidth="2" fill="none"/>
          <path d="M140,250 Q180,195 195,160" stroke="#14b8a6" strokeWidth="2" fill="none"/>
        </>,
      };
    case 'none':
      return { bg: '#fdf2f8', leaves: null };
    case 'soft':
    default:
      return {
        bg: '#f0fdf4',
        leaves: <>
          <path d="M140,250 Q70,210 36,175" stroke="#4ade80" strokeWidth="2" fill="none"/>
          <path d="M140,250 Q210,210 244,175" stroke="#4ade80" strokeWidth="2" fill="none"/>
          <ellipse cx="38" cy="177" rx="16" ry="8" fill="#86efac" transform="rotate(-30 38 177)" opacity="0.8"/>
          <ellipse cx="242" cy="177" rx="16" ry="8" fill="#86efac" transform="rotate(30 242 177)" opacity="0.8"/>
          <path d="M140,250 Q110,215 96,192" stroke="#4ade80" strokeWidth="1.5" fill="none"/>
          <path d="M140,250 Q170,215 184,192" stroke="#4ade80" strokeWidth="1.5" fill="none"/>
          <ellipse cx="97" cy="193" rx="12" ry="6" fill="#bbf7d0" transform="rotate(-15 97 193)" opacity="0.75"/>
          <ellipse cx="183" cy="193" rx="12" ry="6" fill="#bbf7d0" transform="rotate(15 183 193)" opacity="0.75"/>
        </>,
      };
  }
}

// ── Main Component ─────────────────────────────────────────────────────────

interface Props {
  flowers: SelectedFlower[];
  arrangement?: ArrangementId;
  greenery?: GreeneryId;
  wrapper?: WrapperId;
  animate?: boolean;
  width?: number;
}

export default function BouquetCanvas({
  flowers,
  arrangement = 'circle',
  greenery = 'soft',
  wrapper = 'ribbon-pink',
  animate = false,
  width = 280,
}: Props) {
  const height = Math.round(width * (310 / 280));
  const slots = getSlots(arrangement, flowers.length);
  const gdef = getGreenery(greenery);

  // Sort slots by z so lower z renders first (background)
  const sorted = slots
    .map((slot, i) => ({ slot, flower: flowers[i] }))
    .sort((a, b) => a.slot.z - b.slot.z);

  return (
    <svg
      viewBox="0 0 280 310"
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
    >
      {/* ── Background circle ── */}
      <circle cx="140" cy="155" r="130" fill={gdef.bg} opacity="0.6" />

      {/* ── Greenery leaves (behind flowers) ── */}
      {gdef.leaves}

      {/* ── Stem bundle ── */}
      {flowers.slice(0, slots.length).map((_, i) => {
        const slot = slots[i];
        const targetX = 140 + (i % 2 === 0 ? (i - slots.length / 2) * 4 : -(i - slots.length / 2) * 4);
        return (
          <line key={i}
            x1={slot.cx} y1={slot.cy + 22 * slot.scale}
            x2={targetX}  y2={274}
            stroke="#16a34a" strokeWidth={1.5 * slot.scale} opacity="0.85"
          />
        );
      })}

      {/* ── Wrappers / Vases ── */}
      {(() => {
        switch (wrapper) {
          case 'ribbon-blue':
            return (
              <g>
                <path d="M110,268 Q140,258 170,268 Q155,280 140,278 Q125,280 110,268 Z" fill="#93c5fd" opacity="0.9" />
                <path d="M106,264 L112,272 M174,264 L168,272" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="110" y1="268" x2="110" y2="290" stroke="#bfdbfe" strokeWidth="8" strokeLinecap="round" opacity="0.8"/>
                <line x1="170" y1="268" x2="170" y2="290" stroke="#bfdbfe" strokeWidth="8" strokeLinecap="round" opacity="0.8"/>
                <ellipse cx="140" cy="268" rx="10" ry="6" fill="#3b82f6" />
                <ellipse cx="140" cy="268" rx="6" ry="4" fill="#93c5fd" />
              </g>
            );
          case 'kraft-paper':
            return (
              <g>
                <path d="M60,190 Q140,230 220,190 L175,290 Q140,310 105,290 Z" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="2" opacity="0.95" />
                {/* Tie around paper */}
                <path d="M125,260 Q140,265 155,260" stroke="#78716c" strokeWidth="2" fill="none" />
                <ellipse cx="140" cy="261" rx="4" ry="2" fill="#78716c" />
              </g>
            );
          case 'glass-vase':
            return (
              <g>
                <path d="M110,240 Q140,265 170,240 L180,300 Q140,310 100,300 Z" fill="#bae6fd" opacity="0.4" stroke="#7dd3fc" strokeWidth="2" />
                <ellipse cx="140" cy="242" rx="30" ry="8" fill="none" stroke="#7dd3fc" strokeWidth="2" opacity="0.6" />
                {/* Reflection highlight */}
                <path d="M115,250 Q118,275 110,295" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.5" strokeLinecap="round" />
              </g>
            );
          case 'ceramic-vase':
            return (
              <g>
                <path d="M115,240 Q140,235 165,240 C 185,260 190,290 165,305 Q140,312 115,305 C 90,290 95,260 115,240 Z" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="2" />
                {/* Lip */}
                <ellipse cx="140" cy="240" rx="25" ry="6" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="2" />
                {/* Shadow detail */}
                <path d="M115,240 C 90,290 95,260 115,305" stroke="#d6d3d1" strokeWidth="8" fill="none" opacity="0.3" />
              </g>
            );
          case 'ribbon-pink':
          default:
            return (
              <g>
                <path d="M110,268 Q140,258 170,268 Q155,280 140,278 Q125,280 110,268 Z" fill="#f9a8d4" opacity="0.9" />
                <path d="M106,264 L112,272 M174,264 L168,272" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="110" y1="268" x2="110" y2="290" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" opacity="0.8"/>
                <line x1="170" y1="268" x2="170" y2="290" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" opacity="0.8"/>
                <ellipse cx="140" cy="268" rx="10" ry="6" fill="#ec4899" />
                <ellipse cx="140" cy="268" rx="6" ry="4" fill="#f9a8d4" />
              </g>
            );
        }
      })()}

      {/* ── Flowers (sorted back-to-front) ── */}
      {sorted.map(({ slot, flower }, i) => {
        if (!flower) return null;
        const flowerSize = 60 * slot.scale;
        return (
          <g key={flower.code + i}
            style={animate ? {
              animation: `flowerReveal 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s both`,
            } : undefined}
          >
            <foreignObject
              x={slot.cx - flowerSize / 2}
              y={slot.cy - flowerSize / 2}
              width={flowerSize}
              height={flowerSize}
            >
              <div style={{ width: flowerSize, height: flowerSize }}>
                <div className={animate ? "animate-sway" : ""} style={{ animationDelay: `${i * 0.4}s` }}>
                  <GetFlowerSVG code={flower.code} scale={slot.scale} />
                </div>
              </div>
            </foreignObject>
          </g>
        );
      })}

      {/* ── Inline keyframes ── */}
      {animate && (
        <style>{`
          @keyframes flowerReveal {
            from { opacity: 0; transform: scale(0) rotate(-20deg); transform-origin: center; }
            to   { opacity: 1; transform: scale(1) rotate(0deg);  transform-origin: center; }
          }
        `}</style>
      )}
    </svg>
  );
}
