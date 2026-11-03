import type { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { type IconSize, iconPixelSizes } from './icon.variants';

export interface IconProps extends Omit<LucideProps, 'size' | 'ref'> {
  readonly icon: LucideIcon;
  readonly size?: IconSize;
  readonly label?: string;
  readonly className?: string;
}

export function Icon({ icon: Component, size = 'md', label, className, ...rest }: IconProps) {
  const pixelSize = iconPixelSizes[size];

  if (label) {
    return (
      <Component
        size={pixelSize}
        role="img"
        aria-label={label}
        className={cn('inline-block shrink-0', className)}
        {...rest}
      />
    );
  }

  return (
    <Component
      size={pixelSize}
      aria-hidden="true"
      focusable="false"
      className={cn('inline-block shrink-0', className)}
      {...rest}
    />
  );
}
