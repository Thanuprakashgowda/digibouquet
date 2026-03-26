import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="text-6xl">🥀</div>
      <h1 className="font-serif text-3xl text-stone-700">Bouquet not found</h1>
      <p className="text-stone-400 max-w-sm">
        The bouquet you&apos;re looking for may have moved or the link might be incorrect.
      </p>
      <Link
        href="/"
        className="rounded-full bg-rose-400 px-6 py-3 text-sm font-medium text-white hover:bg-rose-500 transition-colors"
      >
        🌸 Build a new bouquet
      </Link>
    </div>
  );
}
