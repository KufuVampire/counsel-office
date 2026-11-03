import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import { Spinner } from '@/shared/ui/Spinner';
import { type ButtonSize, type ButtonVariant, buttonStyles } from './button.variants';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly loading?: boolean;
  readonly fullWidth?: boolean;
  readonly iconStart?: ReactNode;
  readonly iconEnd?: ReactNode;
  readonly ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  iconStart,
  iconEnd,
  disabled,
  className,
  children,
  type = 'button',
  ref,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...rest}
    >
      {loading ? <Spinner size={size === 'lg' ? 'md' : 'sm'} /> : iconStart}
      <span>{children}</span>
      {!loading && iconEnd}
    </button>
  );
}
