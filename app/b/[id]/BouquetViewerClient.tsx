'use client';

import { useEffect, useRef, useState } from 'react';
import { Bouquet } from '@/lib/types';
import BouquetPreview from '@/components/BouquetPreview';
import Button from '@/components/Button';
import Envelope from '@/components/Envelope';
import Link from 'next/link';
import clsx from 'clsx';

interface Props {
  bouquet: Bouquet;
}

export default function BouquetViewerClient({ bouquet }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [unboxed, setUnboxed] = useState(false);
  const [views, setViews] = useState(bouquet.views || 0);
  const [animationKey, setAnimationKey] = useState(0);

  const [isFlipped, setIsFlipped] = useState(false);
  const [thanksMsg, setThanksMsg] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (unboxed) {
      import('canvas-confetti').then((confetti) => {
        confetti.default({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f9a8d4', '#fbcfe8', '#bae6fd', '#bbf7d0']
        });
      });
    }
  }, [unboxed]);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.remove('slide-up');
    }
    const timer = setTimeout(() => {
      cardRef.current?.classList.add('slide-up');
    }, 400);

    return () => clearTimeout(timer);
  }, [animationKey]);

  useEffect(() => {
    // Increment views
    fetch(`/api/bouquets/${bouquet.id}/view`, { method: 'PATCH' })
      .then(res => res.json())
      .then(data => {
        if (data.views) setViews(data.views);
      })
      .catch(console.error);
  }, [bouquet.id]);

  const replayAnimation = () => setAnimationKey((k) => k + 1);

  const handleGenerateThanks = () => {
    if (!thanksMsg.trim()) return;
    const encoded = btoa(encodeURIComponent(thanksMsg));
    const url = `${window.location.origin}/thanks?msg=${encoded}&from=${encodeURIComponent(bouquet.recipient || 'Someone')}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!unboxed) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] fade-in">
        <Envelope onOpen={() => setUnboxed(true)} />
      </div>
    );
  }

  return (
    <div key={`view-${animationKey}`} className="flex flex-col items-center gap-10 py-8 fade-in">
      {/* Header */}
      <div className="text-center slide-up" style={{ animationDelay: '0.2s' }}>
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">
          {bouquet.recipient ? `A bouquet for ${bouquet.recipient}` : 'Someone sent you a bouquet'}
        </p>
        {bouquet.title && (
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-800">
            {bouquet.title}
          </h1>
        )}
      </div>

      {/* Bouquet cluster – uses saved arrangement + greenery */}
      <div className="bouquet-flower" style={{ animationDelay: '0.1s' }}>
        <BouquetPreview
          key={`prev-${animationKey}`}
          flowers={bouquet.flowers}
          arrangement={bouquet.arrangement ?? 'circle'}
          greenery={bouquet.greenery ?? 'soft'}
          wrapper={bouquet.wrapper ?? 'ribbon-pink'}
          animate
          size={220}
        />
      </div>

      {/* Replay Controls */}
      <div className="slide-up delay-300 opacity-0 -mt-6">
        <button 
          onClick={replayAnimation}
          className="text-xs text-stone-400 hover:text-stone-600 transition-colors flex items-center gap-1 bg-white/50 px-3 py-1.5 rounded-full border border-stone-200"
        >
          <span>↺</span> Replay Bloom
        </button>
      </div>

      {/* Card Wrapper for Flip */}
      <div ref={cardRef} className="w-full max-w-sm opacity-0 perspective-1000">
        <div className={clsx('w-full flip-card-inner', isFlipped && 'flip-back')}>
          
          {/* Front of Card */}
          <div className={clsx(
            'flip-front rounded-2xl bg-linear-to-br p-8 shadow-xl border border-white/60 flex flex-col',
            bouquet.style.bg
          )}>
            {bouquet.title && (
              <p className={clsx('text-xs uppercase tracking-widest mb-2', bouquet.style.accent)}>
                {bouquet.title}
              </p>
            )}
            <p className={clsx(
                'font-serif text-lg leading-relaxed whitespace-pre-wrap',
                bouquet.style.accent
              )}
            >
              {bouquet.message}
            </p>
            <div className="mt-4 flex flex-wrap gap-1">
              {bouquet.flowers.map((f) => (
                <span key={f.code} className="text-xl" title={f.name}>
                  {f.emoji}
                </span>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-black/10 flex flex-col gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className={clsx('w-full bg-white/50 border-white/60 hover:bg-white/80', bouquet.style.accent)}
                onClick={() => setIsFlipped(true)}
              >
                Say Thanks 💌
              </Button>
              <div className="flex justify-between items-end">
                <p className="text-xs opacity-60 font-medium">
                  👁 Viewed {views} time{views !== 1 && 's'}
                </p>
                <p className="text-xs opacity-40">
                  {new Date(bouquet.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Back of Card (Say Thanks Form) */}
          <div className={clsx(
            'flip-back rounded-2xl bg-linear-to-br p-8 shadow-xl border border-white/60 flex flex-col',
            bouquet.style.bg
          )}>
            <h3 className={clsx('font-serif text-xl mb-4', bouquet.style.accent)}>
              Send a Thank You
            </h3>
            <textarea
              className="w-full rounded-xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none flex-1 min-h-[120px] mb-4"
              placeholder="Type a quick message..."
              value={thanksMsg}
              onChange={(e) => setThanksMsg(e.target.value)}
            />
            <div className="mt-auto flex flex-col gap-2">
              <Button 
                onClick={handleGenerateThanks} 
                disabled={!thanksMsg.trim()}
                className="w-full"
              >
                {copied ? '✓ Link Copied!' : 'Copy Link to Reply'}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={clsx('w-full opacity-70 hover:opacity-100', bouquet.style.accent)}
                onClick={() => setIsFlipped(false)}
              >
                ← Back to Card
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-center mt-3 text-stone-500">
                Link copied! Paste it in your chat with the sender.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Flower legend */}
      <div className="w-full max-w-sm rounded-2xl border border-stone-100 bg-white p-5 shadow-sm slide-up delay-500 opacity-0">
        <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-4">
          What these flowers mean
        </h3>
        <ul className="space-y-3">
          {bouquet.flowers.map((f) => (
            <li key={f.code} className="flex items-start gap-3 text-sm">
              <span className="text-2xl shrink-0">{f.emoji}</span>
              <div>
                <p className="font-medium text-stone-700">{f.name}</p>
                <p className="text-stone-400 text-xs leading-snug">{f.meaning}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center slide-up delay-700 opacity-0">
        <p className="text-sm text-stone-400 mb-3">Want to send your own bouquet?</p>
        <Link href="/">
          <Button size="lg">🌸 Build a Bouquet</Button>
        </Link>
      </div>
    </div>
  );
}
