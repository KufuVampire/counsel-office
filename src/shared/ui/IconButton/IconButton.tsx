import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import { cn } from '@/shared/lib/cn';
import { type ButtonVariant, buttonVariantStyles } from '@/shared/ui/Button';
import { type IconButtonSize, iconButtonSizeStyles } from './icon-button.variants';

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  readonly label: string;
  readonly variant?: ButtonVariant;
  readonly size?: IconButtonSize;
  readonly children: ReactNode;
  readonly ref?: Ref<HTMLButtonElement>;
}

export function IconButton({
  label,
  variant = 'ghost',
  size = 'md',
  className,
  children,
  type = 'button',
  ref,
  ...rest
}: IconButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center rounded-md focus-ring transition-colors duration-fast select-none',
        'disabled:bg-disabled disabled:text-disabled-fg disabled:cursor-not-allowed',
        buttonVariantStyles[variant],
        iconButtonSizeStyles[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
