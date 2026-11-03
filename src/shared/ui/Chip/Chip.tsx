import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import { cn } from '@/shared/lib/cn';

export interface ChipProps extends ComponentPropsWithoutRef<'button'> {
  readonly selected?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
  readonly ref?: Ref<HTMLButtonElement>;
}

export function Chip({
  selected = false,
  className,
  children,
  type = 'button',
  ref,
  ...rest
}: ChipProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={cn(
        'inline-flex h-control-sm items-center justify-center rounded-full px-3 text-small font-sans select-none',
        'focus-ring transition-colors duration-fast',
        selected
          ? 'bg-primary text-primary-fg border border-transparent font-medium'
          : 'bg-surface text-fg-muted border border-line hover:bg-hover hover:text-fg',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
