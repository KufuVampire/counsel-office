import type { ComponentPropsWithoutRef, Ref } from 'react';
import { cn } from '@/shared/lib/cn';

export interface BurgerButtonProps extends ComponentPropsWithoutRef<'button'> {
  readonly open: boolean;
  readonly controls: string;
  readonly label?: string;
  readonly ref?: Ref<HTMLButtonElement>;
}

export function BurgerButton({
  open,
  controls,
  label = open ? 'Закрыть меню' : 'Открыть меню',
  className,
  onClick,
  ref,
  ...rest
}: BurgerButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      aria-label={label}
      onClick={onClick}
      className={cn(
        'relative inline-flex h-control-md w-control-md items-center justify-center rounded-md',
        'text-fg hover:bg-hover active:bg-surface-muted focus-ring transition-colors duration-fast select-none cursor-pointer',
        className,
      )}
      {...rest}
    >
      <div className="relative flex h-4 w-5 flex-col justify-between">
        <span
          className={cn(
            'block h-0.5 w-full bg-current rounded-full transition-all duration-base ease-standard origin-center',
            open ? 'translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0',
          )}
        />
        <span
          className={cn(
            'block h-0.5 w-full bg-current rounded-full transition-all duration-base ease-standard',
            open ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100',
          )}
        />
        <span
          className={cn(
            'block h-0.5 w-full bg-current rounded-full transition-all duration-base ease-standard origin-center',
            open ? '-translate-y-[7px] -rotate-45' : 'translate-y-0 rotate-0',
          )}
        />
      </div>
    </button>
  );
}
