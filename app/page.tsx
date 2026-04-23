'use client';

import { useState } from 'react';
import { Occasion, CardStyle, SelectedFlower, WrapperId } from '@/lib/types';
import { FLOWERS, getFlowersByOccasion } from '@/lib/flowers';
import { CARD_STYLES } from '@/lib/styles';
import OccasionPicker from '@/components/OccasionPicker';
import FlowerCard from '@/components/FlowerCard';
import StylePicker from '@/components/StylePicker';
import BouquetPreview, { ArrangementId, GreeneryId, ARRANGEMENTS, GREENERIES } from '@/components/BouquetPreview';
import CardPreview from '@/components/CardPreview';
import SelectedFlowerChip from '@/components/SelectedFlowerChip';
import StepIndicator from '@/components/StepIndicator';
import Button from '@/components/Button';
import ArrangementControls from '@/components/ArrangementControls';
import WrapperControls, { WRAPPERS } from '@/components/WrapperControls';
import QRCodeViewer from '@/components/QRCodeViewer';

function nextIndex<T>(arr: T[], current: T): number {
  const i = arr.findIndex((x) => x === current);
  return (i + 1) % arr.length;
}

export default function HomePage() {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlower[]>([]);
  const [cardStyle, setCardStyle] = useState<CardStyle | null>(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [customSlug, setCustomSlug] = useState('');

  // Arrangement + greenery + wrapper
  const [arrangement, setArrangement] = useState<ArrangementId>('circle');
  const [greenery, setGreenery] = useState<GreeneryId>('soft');
  const [wrapper, setWrapper] = useState<WrapperId>('ribbon-pink');

  const [loading, setLoading] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recommendedFlowers = occasion ? getFlowersByOccasion(occasion) : FLOWERS;

  function toggleFlower(flower: SelectedFlower) {
    setSelectedFlowers((prev) => {
      const exists = prev.find((f) => f.code === flower.code);
      if (exists) return prev.filter((f) => f.code !== flower.code);
      if (prev.length >= 7) return prev;
      return [...prev, flower];
    });
  }

  function handleNextArrangement() {
    const ids = ARRANGEMENTS.map((a) => a.id);
    const next = ids[nextIndex(ids, arrangement)];
    setArrangement(next);
  }

  function handleNextGreenery() {
    const ids = GREENERIES.map((g) => g.id);
    const next = ids[nextIndex(ids, greenery)] as GreeneryId;
    setGreenery(next);
  }

  function handleNextWrapper() {
    const ids = WRAPPERS.map((w) => w.id);
    const next = ids[nextIndex(ids, wrapper)];
    setWrapper(next);
  }

  async function handleSubmit() {
    if (!occasion || !selectedFlowers.length || !message.trim() || !cardStyle) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/bouquets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          title: title.trim() || undefined,
          flowers: selectedFlowers,
          message: message.trim(),
          recipient: recipient.trim() || undefined,
          style: cardStyle,
          arrangement,
          greenery,
          wrapper,
          customSlug: customSlug.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Something went wrong');
      }
      const data = await res.json();
      setShareUrl(data.shareUrl);
      setStep(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  async function suggestMessage() {
    if (!occasion || !selectedFlowers.length) return;
    setSuggesting(true);
    setError(null);
    try {
      const res = await fetch('/api/suggest-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occasion, flowers: selectedFlowers }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Failed to generate message');
      }
      const data = await res.json();
      if (data.suggestions && data.suggestions.length > 0) {
        // Just pick a random one, or cycle. For now just pick the first one 
        // that's not already the message, or append. Let's just pick random.
        const randomIndex = Math.floor(Math.random() * data.suggestions.length);
        setMessage(data.suggestions[randomIndex]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown AI error');
    } finally {
      setSuggesting(false);
    }
  }

  async function copyUrl() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── STEP 5: Share screen ─────────────────────────────────────────────────
  if (step === 5 && shareUrl) {
    return (
      <div className="flex flex-col items-center gap-8 py-10 fade-in">
        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="font-serif text-3xl text-stone-800 mb-2">Your bouquet is ready!</h1>
          <p className="text-stone-500 text-sm">Share the link below with someone special.</p>
        </div>

        {/* Preview */}
        <div className="flex flex-col sm:flex-row items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <BouquetPreview
              flowers={selectedFlowers}
              arrangement={arrangement}
              greenery={greenery}
              wrapper={wrapper}
              animate
            />
            {/* Arrangement controls on share screen too */}
            <div className="flex flex-col gap-2 relative z-20">
              <ArrangementControls
                arrangement={arrangement}
                greenery={greenery}
                onNextArrangement={handleNextArrangement}
                onNextGreenery={handleNextGreenery}
              />
              <WrapperControls wrapper={wrapper} onNextWrapper={handleNextWrapper} />
            </div>
          </div>
          <CardPreview
            style={cardStyle!}
            title={title}
            message={message}
            flowers={selectedFlowers}
          />
        </div>

        {/* Share URL box & QR */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg items-center sm:items-stretch">
          <div className="flex-1 flex flex-col gap-3 w-full">
            <div className="flex gap-3 w-full">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-600 shadow-inner focus:outline-none"
              />
              <Button onClick={copyUrl} size="md">
                {copied ? '✓ Copied!' : 'Copy link'}
              </Button>
            </div>
            <p className="text-xs text-stone-400 mt-2 px-2">
              Tip: Visit your share link anytime to see how many times it has been viewed!
            </p>
            {/* Flower legend moved here for layout balance optionally, or keep below */}
            <div className="w-full rounded-2xl border border-stone-100 bg-white p-5 shadow-sm hidden sm:block">
              <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                Flowers in this bouquet
              </h3>
              <ul className="space-y-2">
                {selectedFlowers.map((f) => (
                  <li key={f.code} className="flex items-start gap-3 text-sm">
                    <span className="text-2xl">{f.emoji}</span>
                    <div>
                      <p className="font-medium text-stone-700">{f.name}</p>
                      <p className="text-stone-400 text-xs">{f.meaning}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="shrink-0 flex items-center justify-center">
            <QRCodeViewer url={shareUrl} />
          </div>
        </div>

        {/* Flower legend (mobile only) */}
        <div className="w-full max-w-lg rounded-2xl border border-stone-100 bg-white p-5 shadow-sm sm:hidden mt-2">
          <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-3">
            Flowers in this bouquet
          </h3>
          <ul className="space-y-2">
            {selectedFlowers.map((f) => (
              <li key={f.code} className="flex items-start gap-3 text-sm">
                <span className="text-2xl">{f.emoji}</span>
                <div>
                  <p className="font-medium text-stone-700">{f.name}</p>
                  <p className="text-stone-400 text-xs">{f.meaning}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>



        <Button
          variant="outline"
          onClick={() => {
            setStep(1);
            setOccasion(null);
            setSelectedFlowers([]);
            setCardStyle(null);
            setTitle('');
            setMessage('');
            setRecipient('');
            setShareUrl(null);
            setArrangement('circle');
            setGreenery('soft');
            setWrapper('ribbon-pink');
            setCustomSlug('');
          }}
        >
          Build another bouquet
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      {step === 1 && (
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-800 mb-3 leading-tight">
            Build a beautiful<br />
            <span className="text-rose-400">digital bouquet</span>
          </h1>
          <p className="text-stone-500 max-w-md mx-auto">
            Choose flowers that match your mood, write a heartfelt message, and
            share a link that blooms wherever it lands.
          </p>
        </div>
      )}

      <StepIndicator current={step} />

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ── STEP 1: OCCASION ────────────────────────────────────────────── */}
      {step === 1 && (
        <section>
          <h2 className="font-serif text-2xl text-stone-700 mb-6 text-center">
            What&apos;s the occasion?
          </h2>
          <OccasionPicker
            selected={occasion}
            onSelect={(o) => {
              setOccasion(o);
              setSelectedFlowers([]);
            }}
          />
          <div className="mt-8 flex justify-end">
            <Button size="lg" disabled={!occasion} onClick={() => setStep(2)}>
              Next → Pick Flowers
            </Button>
          </div>
        </section>
      )}

      {/* ── STEP 2: FLOWERS ─────────────────────────────────────────────── */}
      {step === 2 && (
        <section>
          <h2 className="font-serif text-2xl text-stone-700 mb-2 text-center">
            Choose your flowers
          </h2>
          <p className="text-stone-400 text-sm text-center mb-4">
            Pick 3–7 flowers · recommended for your occasion are shown first
          </p>
          {selectedFlowers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5 justify-center">
              {selectedFlowers.map((f) => (
                <SelectedFlowerChip
                  key={f.code}
                  flower={f}
                  onRemove={(code) =>
                    setSelectedFlowers((prev) => prev.filter((x) => x.code !== code))
                  }
                />
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {recommendedFlowers.map((flower) => (
              <FlowerCard
                key={flower.code}
                flower={flower}
                selected={selectedFlowers.some((f) => f.code === flower.code)}
                onToggle={toggleFlower}
                disabled={selectedFlowers.length >= 7}
              />
            ))}
          </div>

          {/* Live preview with arrangement controls */}
          {selectedFlowers.length > 0 && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <BouquetPreview
                flowers={selectedFlowers}
                arrangement={arrangement}
                greenery={greenery}
                wrapper={wrapper}
              />
              <div className="flex flex-col gap-2">
                <ArrangementControls
                  arrangement={arrangement}
                  greenery={greenery}
                  onNextArrangement={handleNextArrangement}
                  onNextGreenery={handleNextGreenery}
                />
                <WrapperControls wrapper={wrapper} onNextWrapper={handleNextWrapper} />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>
            <Button size="lg" disabled={selectedFlowers.length < 1} onClick={() => setStep(3)}>
              Next → Card Style
            </Button>
          </div>
        </section>
      )}

      {/* ── STEP 3: STYLE ───────────────────────────────────────────────── */}
      {step === 3 && (
        <section>
          <h2 className="font-serif text-2xl text-stone-700 mb-6 text-center">
            Choose a card style
          </h2>
          <StylePicker selected={cardStyle} onSelect={setCardStyle} />
          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(2)}>← Back</Button>
            <Button size="lg" disabled={!cardStyle} onClick={() => setStep(4)}>
              Next → Write Message
            </Button>
          </div>
        </section>
      )}

      {/* ── STEP 4: MESSAGE ─────────────────────────────────────────────── */}
      {step === 4 && (
        <section>
          <h2 className="font-serif text-2xl text-stone-700 mb-6 text-center">
            Write your message
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 items-start">
            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5">
                  Title (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Happy Birthday Emma!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={60}
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5">
                  Recipient Name (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Emma"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  maxLength={50}
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs uppercase tracking-widest text-stone-400">
                    Message *
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={suggestMessage}
                    disabled={suggesting}
                    className="text-xs py-1 h-auto"
                  >
                    {suggesting ? '✨ Thinking...' : '✨ Suggest Message'}
                  </Button>
                </div>
                <textarea
                  placeholder="Write your heartfelt message here…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  maxLength={400}
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                />
                <p className="text-right text-xs text-stone-300 mt-1">{message.length}/400</p>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5">
                  Custom URL (optional)
                </label>
                <div className="flex bg-white rounded-xl border border-stone-200 overflow-hidden focus-within:ring-2 focus-within:ring-rose-300">
                  <span className="bg-stone-50 border-r border-stone-200 px-3 py-2.5 text-sm text-stone-400 select-none flex items-center">
                    digibouquet.com/b/
                  </span>
                  <input
                    type="text"
                    placeholder="my-custom-name"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                    maxLength={30}
                    className="flex-1 px-3 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live preview */}
            <div className="flex flex-col items-center gap-5">
              <BouquetPreview
                flowers={selectedFlowers}
                arrangement={arrangement}
                greenery={greenery}
                wrapper={wrapper}
              />
              <div className="flex flex-col gap-2">
                <ArrangementControls
                  arrangement={arrangement}
                  greenery={greenery}
                  onNextArrangement={handleNextArrangement}
                  onNextGreenery={handleNextGreenery}
                />
                <WrapperControls wrapper={wrapper} onNextWrapper={handleNextWrapper} />
              </div>
              <CardPreview
                style={cardStyle!}
                title={title}
                message={message}
                flowers={selectedFlowers}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(3)}>← Back</Button>
            <Button
              size="lg"
              disabled={!message.trim() || loading}
              onClick={handleSubmit}
            >
              {loading ? '🌿 Creating…' : '🌸 Create Bouquet'}
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
