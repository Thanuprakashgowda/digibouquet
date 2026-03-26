import clsx from 'clsx';

const STEPS = [
  'Occasion',
  'Flowers',
  'Style',
  'Message',
  'Share',
];

interface Props {
  current: number; // 1-based
}

export default function StepIndicator({ current }: Props) {
  return (
    <div className="flex items-center gap-0 w-full max-w-md mx-auto mb-8">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all',
                  done
                    ? 'bg-rose-400 text-white'
                    : active
                    ? 'bg-rose-100 border-2 border-rose-400 text-rose-600'
                    : 'bg-stone-100 text-stone-400'
                )}
              >
                {done ? '✓' : step}
              </div>
              <span
                className={clsx(
                  'mt-1 hidden sm:block text-[10px] font-medium',
                  active ? 'text-rose-500' : done ? 'text-stone-500' : 'text-stone-300'
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={clsx(
                  'flex-1 h-0.5 mx-1 transition-all',
                  done ? 'bg-rose-400' : 'bg-stone-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
