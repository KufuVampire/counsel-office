import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { type TextSize, type TextTone, textSizeStyles, textToneStyles } from './text.variants';

export interface TextProps<T extends ElementType = 'p'> {
  readonly as?: T;
  readonly size?: TextSize;
  readonly tone?: TextTone;
  readonly className?: string;
  readonly children?: ReactNode;
}

export function Text<T extends ElementType = 'p'>({
  as,
  size = 'body',
  tone = 'default',
  className,
  children,
  ...rest
}: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>) {
  const Component = as || 'p';

  return (
    <Component
      className={cn('font-sans', textSizeStyles[size], textToneStyles[tone], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
