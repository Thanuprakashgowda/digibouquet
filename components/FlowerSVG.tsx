import React from 'react';

// Each flower is rendered in a 60×60 viewBox and accepts a `scale` prop

interface FlowerProps {
  scale?: number;
  style?: React.CSSProperties;
  className?: string;
}

// ── ROSE ──────────────────────────────────────────────────────────────────
export function RoseRed({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="rr-outer" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#be123c" />
        </radialGradient>
        <radialGradient id="rr-mid" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </radialGradient>
        <radialGradient id="rr-center" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#9f1239" />
        </radialGradient>
      </defs>
      {/* Outer petals */}
      {[0,72,144,216,288].map(a=>(
        <ellipse key={a} cx="30" cy="12" rx="7.5" ry="16" fill="url(#rr-outer)"
          transform={`rotate(${a} 30 30)`} opacity="0.9" />
      ))}
      {/* Mid petals */}
      {[36,108,180,252,324].map(a=>(
        <ellipse key={a} cx="30" cy="16" rx="6" ry="13" fill="url(#rr-mid)"
          transform={`rotate(${a} 30 30)`} opacity="0.95" />
      ))}
      {/* Inner petals */}
      {[18,90,162,234,306].map(a=>(
        <ellipse key={a} cx="30" cy="21" rx="4.5" ry="10" fill="url(#rr-center)"
          transform={`rotate(${a} 30 30)`} />
      ))}
      {/* Center */}
      <circle cx="30" cy="30" r="5" fill="#9f1239" />
      <circle cx="29" cy="29" r="2" fill="#fda4af" opacity="0.5" />
    </svg>
  );
}

export function RosePink({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="rp-outer" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#db2777" />
        </radialGradient>
        <radialGradient id="rp-center" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#9d174d" />
        </radialGradient>
      </defs>
      {[0,72,144,216,288].map(a=>(
        <ellipse key={a} cx="30" cy="12" rx="7.5" ry="16" fill="url(#rp-outer)"
          transform={`rotate(${a} 30 30)`} opacity="0.9" />
      ))}
      {[36,108,180,252,324].map(a=>(
        <ellipse key={a} cx="30" cy="17" rx="5.5" ry="12" fill="url(#rp-center)"
          transform={`rotate(${a} 30 30)`} opacity="0.95" />
      ))}
      {[0,60,120,180,240,300].map(a=>(
        <ellipse key={a} cx="30" cy="23" rx="3.5" ry="8" fill="#fbcfe8"
          transform={`rotate(${a} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="4.5" fill="#be185d" />
      <circle cx="29" cy="28.5" r="2" fill="#fbcfe8" opacity="0.5" />
    </svg>
  );
}

export function RoseWhite({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="rw-outer" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
      </defs>
      {[0,72,144,216,288].map(a=>(
        <ellipse key={a} cx="30" cy="12" rx="7.5" ry="16" fill="url(#rw-outer)" stroke="#e2e8f0" strokeWidth="0.5"
          transform={`rotate(${a} 30 30)`} opacity="0.9" />
      ))}
      {[36,108,180,252,324].map(a=>(
        <ellipse key={a} cx="30" cy="17" rx="5.5" ry="12" fill="white" stroke="#e2e8f0" strokeWidth="0.3"
          transform={`rotate(${a} 30 30)`} opacity="0.95" />
      ))}
      {[0,60,120,180,240,300].map(a=>(
        <ellipse key={a} cx="30" cy="23" rx="3.5" ry="8" fill="#f8fafc"
          transform={`rotate(${a} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="4.5" fill="#fde68a" />
      <circle cx="29" cy="29" r="2" fill="#fef9c3" opacity="0.8" />
    </svg>
  );
}

// ── SUNFLOWER ─────────────────────────────────────────────────────────────
export function Sunflower({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="sf-petal" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <radialGradient id="sf-center" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#3b1a08" />
        </radialGradient>
      </defs>
      {/* Outer petals */}
      {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map(a=>(
        <ellipse key={a} cx="30" cy="10" rx="4" ry="11" fill="url(#sf-petal)"
          transform={`rotate(${a} 30 30)`} opacity="0.95" />
      ))}
      {/* Dark center disk */}
      <circle cx="30" cy="30" r="11" fill="url(#sf-center)" />
      {/* Center texture dots */}
      {Array.from({length:12},(_,i)=>{
        const a=i*30*Math.PI/180; const r=5;
        return <circle key={i} cx={30+r*Math.cos(a)} cy={30+r*Math.sin(a)} r="1.2" fill="#92400e" opacity="0.8"/>;
      })}
      {Array.from({length:6},(_,i)=>{
        const a=i*60*Math.PI/180; const r=2;
        return <circle key={i} cx={30+r*Math.cos(a)} cy={30+r*Math.sin(a)} r="1" fill="#b45309" opacity="0.6"/>;
      })}
    </svg>
  );
}

// ── TULIP ─────────────────────────────────────────────────────────────────
export function TulipPink({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <linearGradient id="tp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {/* Left petal */}
      <path d="M30,42 C18,38 10,26 16,10 C22,4 28,8 30,16 Z" fill="url(#tp)" opacity="0.85" />
      {/* Right petal */}
      <path d="M30,42 C42,38 50,26 44,10 C38,4 32,8 30,16 Z" fill="url(#tp)" opacity="0.85" />
      {/* Center petal */}
      <path d="M30,42 C22,36 20,22 24,8 C26,2 34,2 36,8 C40,22 38,36 30,42 Z" fill="#f472b6" />
      {/* Highlight */}
      <path d="M30,38 C26,32 26,20 28,10" stroke="#fbcfe8" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

export function TulipYellow({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <linearGradient id="ty" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
      <path d="M30,42 C18,38 10,26 16,10 C22,4 28,8 30,16 Z" fill="url(#ty)" opacity="0.85" />
      <path d="M30,42 C42,38 50,26 44,10 C38,4 32,8 30,16 Z" fill="url(#ty)" opacity="0.85" />
      <path d="M30,42 C22,36 20,22 24,8 C26,2 34,2 36,8 C40,22 38,36 30,42 Z" fill="#facc15" />
      <path d="M30,38 C26,32 26,20 28,10" stroke="#fef9c3" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

// ── DAISY ─────────────────────────────────────────────────────────────────
export function Daisy({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="dc" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>(
        <ellipse key={a} cx="30" cy="10" rx="4" ry="12" fill="white" stroke="#e7e5e4" strokeWidth="0.5"
          transform={`rotate(${a} 30 30)`} opacity="0.95" />
      ))}
      <circle cx="30" cy="30" r="9" fill="url(#dc)" />
      {Array.from({length:8},(_,i)=>{
        const a=i*45*Math.PI/180; const r=4.5;
        return <circle key={i} cx={30+r*Math.cos(a)} cy={30+r*Math.sin(a)} r="1.5" fill="#a16207" opacity="0.5"/>;
      })}
      <circle cx="30" cy="30" r="3" fill="#fef9c3" />
    </svg>
  );
}

// ── LILY ──────────────────────────────────────────────────────────────────
export function LilyWhite({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      {/* 6 petals */}
      {[0,60,120,180,240,300].map(a=>(
        <ellipse key={a} cx="30" cy="10" rx="6" ry="18" fill="white" stroke="#d1fae5" strokeWidth="0.5"
          transform={`rotate(${a} 30 30)`} opacity="0.95" />
      ))}
      {/* Center stamens */}
      {[0,60,120,180,240,300].map(a=>(
        <line key={a} x1="30" y1="30" x2={30+8*Math.cos((a-90)*Math.PI/180)}
          y2={30+8*Math.sin((a-90)*Math.PI/180)}
          stroke="#6ee7b7" strokeWidth="1" />
      ))}
      {[0,60,120,180,240,300].map(a=>(
        <circle key={a} cx={30+9*Math.cos((a-90)*Math.PI/180)} cy={30+9*Math.sin((a-90)*Math.PI/180)}
          r="1.5" fill="#f59e0b" />
      ))}
      <circle cx="30" cy="30" r="4" fill="#ecfdf5" />
    </svg>
  );
}

export function LilyOrange({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <linearGradient id="lo" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      {[0,60,120,180,240,300].map(a=>(
        <ellipse key={a} cx="30" cy="10" rx="6" ry="18" fill="url(#lo)" stroke="#ea580c" strokeWidth="0.5"
          transform={`rotate(${a} 30 30)`} opacity="0.9" />
      ))}
      {/* Spots for tiger lily effect */}
      {[0,60,120,180,240,300].map(a=>{
        const rad=(a-90)*Math.PI/180;
        return <circle key={a} cx={30+12*Math.cos(rad)} cy={30+12*Math.sin(rad)} r="1.5" fill="#7c2d12" opacity="0.7"/>;
      })}
      {[0,60,120,180,240,300].map(a=>(
        <line key={a} x1="30" y1="30" x2={30+9*Math.cos((a-90)*Math.PI/180)}
          y2={30+9*Math.sin((a-90)*Math.PI/180)} stroke="#15803d" strokeWidth="1.2" />
      ))}
      {[0,60,120,180,240,300].map(a=>(
        <circle key={a} cx={30+10*Math.cos((a-90)*Math.PI/180)} cy={30+10*Math.sin((a-90)*Math.PI/180)}
          r="1.5" fill="#854d0e" />
      ))}
      <circle cx="30" cy="30" r="4" fill="#fff7ed" />
    </svg>
  );
}

// ── LAVENDER ──────────────────────────────────────────────────────────────
export function Lavender({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <linearGradient id="lav" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* Three stems */}
      <line x1="30" y1="58" x2="30" y2="20" stroke="#4ade80" strokeWidth="2" />
      <line x1="30" y1="50" x2="20" y2="28" stroke="#4ade80" strokeWidth="1.5" />
      <line x1="30" y1="50" x2="40" y2="28" stroke="#4ade80" strokeWidth="1.5" />
      {/* Buds on center stem */}
      {[20,24,28,32,36,40].map((y,i)=>(
        <ellipse key={i} cx={30+(i%2===0?-3.5:3.5)} cy={y} rx="3.5" ry="5" fill="url(#lav)" opacity="0.9" />
      ))}
      {/* Buds on side stems */}
      {[28,32,36].map((offset,i)=>(
        <ellipse key={i} cx={20+(i%2===0?-2.5:2.5)} cy={offset} rx="2.5" ry="4" fill="url(#lav)" opacity="0.8" />
      ))}
      {[28,32,36].map((offset,i)=>(
        <ellipse key={i} cx={40+(i%2===0?-2.5:2.5)} cy={offset} rx="2.5" ry="4" fill="url(#lav)" opacity="0.8" />
      ))}
    </svg>
  );
}

// ── ORCHID ────────────────────────────────────────────────────────────────
export function Orchid({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="orch" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#9333ea" />
        </radialGradient>
        <radialGradient id="orch-lip" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#fdf4ff" />
          <stop offset="100%" stopColor="#c026d3" />
        </radialGradient>
      </defs>
      {/* Top 2 petals */}
      <ellipse cx="30" cy="12" rx="7" ry="14" fill="url(#orch)" transform="rotate(-25 30 30)" opacity="0.9" />
      <ellipse cx="30" cy="12" rx="7" ry="14" fill="url(#orch)" transform="rotate(25 30 30)" opacity="0.9" />
      {/* Side petals */}
      <ellipse cx="30" cy="30" rx="16" ry="7" fill="url(#orch)" opacity="0.85" />
      {/* Lip petal – the distinctive orchid feature */}
      <path d="M30,28 C20,32 18,44 30,48 C42,44 40,32 30,28 Z" fill="url(#orch-lip)" />
      <path d="M30,32 C26,36 26,42 30,45 C34,42 34,36 30,32 Z" fill="#86198f" opacity="0.5" />
      {/* Center */}
      <ellipse cx="30" cy="29" rx="5" ry="4" fill="#fdf4ff" />
      <circle cx="30" cy="28" r="2" fill="#d946ef" />
    </svg>
  );
}

// ── PEONY ─────────────────────────────────────────────────────────────────
export function Peony({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="peon-out" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#fecdd3" />
          <stop offset="100%" stopColor="#fb7185" />
        </radialGradient>
        <radialGradient id="peon-in" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffe4e6" />
          <stop offset="100%" stopColor="#f43f5e" />
        </radialGradient>
      </defs>
      {/* Outermost 8 petals */}
      {[0,45,90,135,180,225,270,315].map(a=>(
        <ellipse key={a} cx="30" cy="9" rx="7" ry="15" fill="url(#peon-out)"
          transform={`rotate(${a} 30 30)`} opacity="0.85" />
      ))}
      {/* Middle 6 petals */}
      {[0,60,120,180,240,300].map(a=>(
        <ellipse key={a} cx="30" cy="15" rx="6" ry="12" fill="url(#peon-in)"
          transform={`rotate(${a} 30 30)`} opacity="0.9" />
      ))}
      {/* Inner 5 petals */}
      {[0,72,144,216,288].map(a=>(
        <ellipse key={a} cx="30" cy="20" rx="5" ry="9" fill="#fecdd3"
          transform={`rotate(${a} 30 30)`} opacity="0.95" />
      ))}
      {/* Center */}
      <circle cx="30" cy="30" r="6" fill="#fda4af" />
      <circle cx="29" cy="29" r="3" fill="#ffe4e6" opacity="0.7" />
    </svg>
  );
}

// ── HYDRANGEA ─────────────────────────────────────────────────────────────
export function Hydrangea({ scale = 1, style, className }: FlowerProps) {
  const colors = ['#bfdbfe','#93c5fd','#60a5fa','#a5f3fc','#ddd6fe'];
  const florets = [
    {x:30,y:28},{x:20,y:22},{x:40,y:22},{x:22,y:36},{x:38,y:36},
    {x:30,y:16},{x:15,y:30},{x:45,y:30},{x:22,y:42},{x:38,y:42},
  ];
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      {florets.map((pos,i)=>(
        <g key={i}>
          {[0,90,180,270].map(a=>(
            <ellipse key={a} cx={pos.x} cy={pos.y-5} rx="3.5" ry="5.5" fill={colors[i%colors.length]}
              transform={`rotate(${a} ${pos.x} ${pos.y})`} opacity="0.9" />
          ))}
          <circle cx={pos.x} cy={pos.y} r="2" fill="#fef9c3" />
        </g>
      ))}
    </svg>
  );
}

// ── CHERRY BLOSSOM ────────────────────────────────────────────────────────
export function CherryBlossom({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      {[0,72,144,216,288].map(a=>(
        <path key={a}
          d={`M30,30 C${30},${15} ${37},${10} ${30},${8} C${23},${10} ${30},${15} ${30},${30}`}
          fill="#fbcfe8" stroke="#f472b6" strokeWidth="0.5" opacity="0.9"
          transform={`rotate(${a} 30 30)`} />
      ))}
      {/* Notched petals – cherry blossom signature */}
      {[0,72,144,216,288].map(a=>(
        <path key={a} d={`M30,${18} L${27},${12} L${30},${8} L${33},${12} Z`}
          fill="#f9a8d4" transform={`rotate(${a} 30 30)`} opacity="0.6"/>
      ))}
      {/* Stamens */}
      {[0,45,90,135,180,225,270,315].map(a=>(
        <line key={a} x1="30" y1="30" x2={30+6*Math.cos((a-90)*Math.PI/180)}
          y2={30+6*Math.sin((a-90)*Math.PI/180)} stroke="#f9a8d4" strokeWidth="0.8" />
      ))}
      {[0,45,90,135,180,225,270,315].map(a=>(
        <circle key={a} cx={30+7*Math.cos((a-90)*Math.PI/180)} cy={30+7*Math.sin((a-90)*Math.PI/180)}
          r="1" fill="#db2777" />
      ))}
      <circle cx="30" cy="30" r="3.5" fill="#fdf2f8" />
    </svg>
  );
}

// ── MARIGOLD ──────────────────────────────────────────────────────────────
export function Marigold({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="mg" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#ea580c" />
        </radialGradient>
        <radialGradient id="mg-in" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
      </defs>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>(
        <ellipse key={a} cx="30" cy="10" rx="5.5" ry="13" fill="url(#mg)"
          transform={`rotate(${a} 30 30)`} opacity="0.9" />
      ))}
      {[15,75,135,195,255,315].map(a=>(
        <ellipse key={a} cx="30" cy="16" rx="4.5" ry="10" fill="url(#mg-in)"
          transform={`rotate(${a} 30 30)`} opacity="0.95" />
      ))}
      <circle cx="30" cy="30" r="7" fill="#fef08a" />
      <circle cx="30" cy="30" r="4" fill="#ca8a04" />
    </svg>
  );
}

// ── CARNATION ─────────────────────────────────────────────────────────────
export function CarnationPink({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="carn" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#db2777" />
        </radialGradient>
      </defs>
      {/* Jagged carnation petals */}
      {[0,40,80,120,160,200,240,280,320].map(a=>(
        <path key={a}
          d={`M30,30 L${30+14*Math.cos((a-90)*Math.PI/180)},${30+14*Math.sin((a-90)*Math.PI/180)}
            C${30+18*Math.cos((a-70)*Math.PI/180)},${30+18*Math.sin((a-70)*Math.PI/180)}
              ${30+18*Math.cos((a-110)*Math.PI/180)},${30+18*Math.sin((a-110)*Math.PI/180)} 30,30`}
          fill="url(#carn)" opacity="0.85" />
      ))}
      {/* Inner ruffled layer */}
      {[20,60,100,140,180,220,260,300,340].map(a=>(
        <path key={a}
          d={`M30,30 L${30+9*Math.cos((a-90)*Math.PI/180)},${30+9*Math.sin((a-90)*Math.PI/180)}
            C${30+12*Math.cos((a-70)*Math.PI/180)},${30+12*Math.sin((a-70)*Math.PI/180)}
              ${30+12*Math.cos((a-110)*Math.PI/180)},${30+12*Math.sin((a-110)*Math.PI/180)} 30,30`}
          fill="#fbcfe8" opacity="0.9" />
      ))}
      <circle cx="30" cy="30" r="4" fill="#fce7f3" />
    </svg>
  );
}

// ── IRIS ──────────────────────────────────────────────────────────────────
export function IrisPurple({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <linearGradient id="iris-fall" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
        <linearGradient id="iris-stand" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* Falls (3 drooping petals) */}
      <path d="M30,30 C20,28 12,36 14,46 C18,50 26,46 30,38 Z" fill="url(#iris-fall)" opacity="0.9"/>
      <path d="M30,30 C40,28 48,36 46,46 C42,50 34,46 30,38 Z" fill="url(#iris-fall)" opacity="0.9"/>
      <path d="M30,30 C30,40 28,48 30,52 C32,48 30,40 30,30 Z" fill="url(#iris-fall)" opacity="0.85"/>
      {/* Standards (3 upright petals) */}
      <path d="M30,30 C22,24 16,14 22,8 C26,4 30,10 30,20 Z" fill="url(#iris-stand)" opacity="0.9" />
      <path d="M30,30 C38,24 44,14 38,8 C34,4 30,10 30,20 Z" fill="url(#iris-stand)" opacity="0.9" />
      <path d="M24,20 C24,10 28,4 30,2 C32,4 36,10 36,20 Z" fill="#c4b5fd" opacity="0.8" />
      {/* Beard (yellow stripe in center) */}
      <path d="M28,34 Q30,36 32,34" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
      <circle cx="30" cy="30" r="4" fill="#ede9fe" />
    </svg>
  );
}

// ── MAGNOLIA ──────────────────────────────────────────────────────────────
export function Magnolia({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <linearGradient id="mag" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fefce8" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
      {/* 6 large tepals */}
      {[0,60,120,180,240,300].map(a=>(
        <ellipse key={a} cx="30" cy="10" rx="8" ry="19" fill="white" stroke="#fde68a" strokeWidth="0.5"
          transform={`rotate(${a} 30 30)`} opacity="0.9" />
      ))}
      {/* Inner 3 tepals */}
      {[30,150,270].map(a=>(
        <ellipse key={a} cx="30" cy="16" rx="6" ry="13" fill="url(#mag)"
          transform={`rotate(${a} 30 30)`} opacity="0.85" />
      ))}
      {/* Stamens */}
      {Array.from({length:12},(_,i)=>{
        const a=i*30*Math.PI/180; const r=5;
        return <line key={i} x1="30" y1="30" x2={30+r*Math.cos(a)} y2={30+r*Math.sin(a)}
          stroke="#d97706" strokeWidth="1" />;
      })}
      <circle cx="30" cy="30" r="5" fill="#fef9c3" />
    </svg>
  );
}

// ── VIOLET ────────────────────────────────────────────────────────────────
export function Violet({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      {/* 5 petals - viola style */}
      <ellipse cx="30" cy="13" rx="7" ry="13" fill="#7c3aed" opacity="0.9" />
      <ellipse cx="30" cy="13" rx="7" ry="13" fill="#8b5cf6" transform="rotate(-72 30 30)" opacity="0.85" />
      <ellipse cx="30" cy="13" rx="7" ry="13" fill="#6d28d9" transform="rotate(72 30 30)" opacity="0.9" />
      <ellipse cx="30" cy="13" rx="8" ry="14" fill="#4c1d95" transform="rotate(144 30 30)" opacity="0.8" />
      <ellipse cx="30" cy="13" rx="8" ry="14" fill="#4c1d95" transform="rotate(-144 30 30)" opacity="0.8" />
      {/* Nectar guides (lines) */}
      <line x1="30" y1="30" x2="30" y2="42" stroke="#fef08a" strokeWidth="1.5" opacity="0.7" />
      <line x1="30" y1="30" x2={30+5} y2={30+10} stroke="#fef08a" strokeWidth="1" opacity="0.6" />
      <line x1="30" y1="30" x2={30-5} y2={30+10} stroke="#fef08a" strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="30" r="4" fill="#fef9c3" />
      <circle cx="30" cy="30" r="2" fill="#d97706" />
    </svg>
  );
}

// ── FORGET-ME-NOT ─────────────────────────────────────────────────────────
export function ForgetMeNot({ scale = 1, style, className }: FlowerProps) {
  const florets = [
    {x:30,y:30},{x:20,y:24},{x:40,y:24},{x:22,y:38},{x:38,y:38},
    {x:30,y:18},{x:16,y:31},{x:44,y:31},
  ];
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      {florets.map((pos,i)=>(
        <g key={i}>
          {[0,72,144,216,288].map(a=>(
            <ellipse key={a} cx={pos.x} cy={pos.y-4} rx="3" ry="5"
              fill={i===0?"#93c5fd":"#bfdbfe"}
              transform={`rotate(${a} ${pos.x} ${pos.y})`} opacity="0.9" />
          ))}
          <circle cx={pos.x} cy={pos.y} r="1.8" fill={i===0?"#fef9c3":"white"} />
        </g>
      ))}
    </svg>
  );
}

// ── ZINNIA ────────────────────────────────────────────────────────────────
export function Zinnia({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="zin" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
      </defs>
      {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map(a=>(
        <ellipse key={a} cx="30" cy="11" rx="4.5" ry="12" fill="url(#zin)"
          transform={`rotate(${a} 30 30)`} opacity="0.88" />
      ))}
      {[0,45,90,135,180,225,270,315].map(a=>(
        <ellipse key={a} cx="30" cy="18" rx="3.5" ry="9" fill="#f87171"
          transform={`rotate(${a} 30 30)`} opacity="0.9" />
      ))}
      <circle cx="30" cy="30" r="7" fill="#fef08a" />
      <circle cx="30" cy="30" r="4.5" fill="#ca8a04" />
      {Array.from({length:8},(_,i)=>{
        const a=i*45*Math.PI/180;
        return <circle key={i} cx={30+3*Math.cos(a)} cy={30+3*Math.sin(a)} r="1" fill="#92400e" opacity="0.6"/>;
      })}
    </svg>
  );
}

export function Chrysanthemum({ scale = 1, style, className }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 60" width={60 * scale} height={60 * scale} style={style} className={className}>
      <defs>
        <radialGradient id="chry" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#f97316" />
        </radialGradient>
      </defs>
      {[0,18,36,54,72,90,108,126,144,162,180,198,216,234,252,270,288,306,324,342].map(a=>(
        <ellipse key={a} cx="30" cy="11" rx="3.2" ry="14" fill="url(#chry)"
          transform={`rotate(${a} 30 30)`} opacity="0.88" />
      ))}
      {[9,27,45,63,81,99,117,135,153,171,189,207,225,243,261,279,297,315,333,351].map(a=>(
        <ellipse key={a} cx="30" cy="17" rx="2.5" ry="10" fill="#fdba74"
          transform={`rotate(${a} 30 30)`} opacity="0.9" />
      ))}
      <circle cx="30" cy="30" r="7" fill="#fef3c7" />
      <circle cx="30" cy="30" r="4" fill="#d97706" />
    </svg>
  );
}

// ── MASTER MAP ────────────────────────────────────────────────────────────

export const FLOWER_SVG_MAP: Record<string, React.ComponentType<FlowerProps>> = {
  'rose-red':       RoseRed,
  'rose-pink':      RosePink,
  'rose-white':     RoseWhite,
  'sunflower':      Sunflower,
  'tulip-pink':     TulipPink,
  'tulip-yellow':   TulipYellow,
  'lavender':       Lavender,
  'daisy':          Daisy,
  'lily-white':     LilyWhite,
  'lily-orange':    LilyOrange,
  'orchid':         Orchid,
  'peony':          Peony,
  'hydrangea':      Hydrangea,
  'chrysanthemum':  Chrysanthemum,
  'forget-me-not':  ForgetMeNot,
  'violet':         Violet,
  'marigold':       Marigold,
  'carnation-pink': CarnationPink,
  'iris':           IrisPurple,
  'magnolia':       Magnolia,
  'cherry-blossom': CherryBlossom,
  'zinnia':         Zinnia,
};

export function GetFlowerSVG({ code, scale = 1, style, className }: { code: string } & FlowerProps) {
  const Comp = FLOWER_SVG_MAP[code];
  if (!Comp) return <Sunflower scale={scale} style={style} className={className} />;
  return <Comp scale={scale} style={style} className={className} />;
}
