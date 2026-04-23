'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface Props {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // After flap opens (600ms), wait a bit, then fade out the whole envelope and call onOpen
    setTimeout(() => {
      onOpen();
    }, 1200); // 600ms for flap, 600ms pause, then onOpen triggers unboxed state fade in
  };

  return (
    <div 
      className={clsx(
        "cursor-pointer group flex items-center justify-center transition-transform hover:scale-105 active:scale-95",
        isOpen && "envelope-fade-out"
      )}
      onClick={handleClick}
      style={{
        animationDelay: isOpen ? '0.7s' : '0s' // Fade out after flap animation
      }}
    >
      <div className="relative w-80 h-52 bg-rose-200 rounded-md shadow-2xl overflow-visible">
        {/* Back of envelope (inside) */}
        <div className="absolute inset-0 bg-stone-100 rounded-md border-2 border-rose-200"></div>

        {/* Flap (Top side) */}
        <div 
          className={clsx(
            "absolute top-0 left-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[100px] border-solid border-transparent border-t-rose-300 transform origin-top z-10 transition-colors",
            isOpen ? "envelope-open border-t-rose-200" : "group-hover:border-t-rose-400"
          )}
        ></div>

        {/* Bottom fold */}
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-r-[160px] border-b-[100px] border-solid border-transparent border-b-rose-200 z-0"></div>

        {/* Left fold */}
        <div className="absolute top-0 left-0 w-0 h-0 border-t-[104px] border-b-[104px] border-l-[160px] border-solid border-transparent border-l-rose-200/90 z-0 drop-shadow-md"></div>

        {/* Right fold */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[104px] border-b-[104px] border-r-[160px] border-solid border-transparent border-r-rose-200/90 z-0 drop-shadow-md"></div>

        {/* Decorative Seal */}
        <div 
          className={clsx(
            "absolute top-[80px] left-1/2 -translate-x-1/2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-md z-20 transition-opacity",
            isOpen ? "opacity-0 duration-300" : "opacity-100"
          )}
        >
          <span className="text-white text-xl">🌸</span>
        </div>

        {/* Instruction text */}
        <div 
          className={clsx(
            "absolute -bottom-12 left-0 right-0 text-center text-stone-400 text-sm tracking-widest uppercase transition-opacity",
            isOpen ? "opacity-0" : "opacity-100"
          )}
        >
          Tap to open
        </div>
      </div>
    </div>
  );
}
