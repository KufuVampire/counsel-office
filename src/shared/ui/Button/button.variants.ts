import { cn } from '@/shared/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-active border border-transparent',
  secondary: 'bg-surface text-fg hover:bg-hover active:bg-surface-muted border border-line',
  ghost: 'bg-transparent text-fg hover:bg-hover active:bg-surface-muted border border-transparent',
  inverse:
    'bg-surface text-inverse hover:bg-surface-muted active:bg-selected border border-transparent',
};

export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: 'h-control-sm px-3 text-small gap-1.5',
  md: 'h-control-md px-4 text-small gap-2',
  lg: 'h-control-lg px-6 text-body gap-2.5',
};

export interface ButtonStyleOptions {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly fullWidth?: boolean;
  readonly className?: string;
}

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    'inline-flex items-center justify-center font-sans font-medium rounded-md focus-ring select-none transition-colors duration-fast cursor-pointer',
    'disabled:bg-disabled disabled:text-disabled-fg disabled:border-transparent disabled:cursor-not-allowed disabled:pointer-events-none',
    buttonVariantStyles[variant],
    buttonSizeStyles[size],
    fullWidth && 'w-full',
    className,
  );
}
