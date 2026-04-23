import Link from 'next/link';
import Button from '@/components/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank you note – PocketPetals',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ThanksPage({ searchParams }: Props) {
  const params = await searchParams;
  const msgParam = params.msg as string | undefined;
  const fromParam = params.from as string | undefined;

  let decodedMsg = 'Thank you!';
  if (msgParam) {
    try {
      decodedMsg = decodeURIComponent(atob(msgParam));
    } catch {
      decodedMsg = 'Thank you!';
    }
  }

  const sender = fromParam ? decodeURIComponent(fromParam) : 'Someone special';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 fade-in py-10">
      <div className="text-center mb-8 slide-up" style={{ animationDelay: '0.1s' }}>
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">A message from</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-800">{sender}</h1>
      </div>

      <div className="w-full max-w-sm rounded-2xl bg-linear-to-br from-stone-50 via-neutral-50 to-stone-100 p-8 shadow-xl border border-white/60 slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="text-4xl mb-4 text-center">💌</div>
        <p className="font-serif text-lg leading-relaxed whitespace-pre-wrap text-stone-700 text-center">
          {decodedMsg}
        </p>
      </div>

      <div className="mt-12 text-center slide-up delay-300 opacity-0 relative top-6">
        <p className="text-sm text-stone-400 mb-3">Want to send another bouquet?</p>
        <Link href="/">
          <Button size="lg">🌸 Build a Bouquet</Button>
        </Link>
      </div>
    </div>
  );
}
