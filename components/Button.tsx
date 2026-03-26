import clsx from 'clsx';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-rose-400 text-white hover:bg-rose-500 shadow hover:shadow-md active:scale-95':
            variant === 'primary',
          'border-2 border-rose-400 text-rose-600 hover:bg-rose-50 active:scale-95':
            variant === 'outline',
          'text-stone-600 hover:text-rose-500 hover:bg-rose-50 active:scale-95':
            variant === 'ghost',
        },
        {
          'px-3 py-1.5 text-xs': size === 'sm',
          'px-5 py-2.5 text-sm': size === 'md',
          'px-8 py-3.5 text-base': size === 'lg',
        },
        className
      )}
    >
      {children}
    </button>
  );
}
