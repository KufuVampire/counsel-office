import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { type CardPadding, cardPaddingStyles } from './card.variants';

export interface CardProps<T extends ElementType = 'div'> {
  readonly as?: T;
  readonly padding?: CardPadding;
  readonly interactive?: boolean;
  readonly className?: string;
  readonly children?: ReactNode;
}

export function Card<T extends ElementType = 'div'>({
  as,
  padding = 'md',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn(
        'rounded-lg bg-surface border border-line-subtle transition-colors duration-fast',
        cardPaddingStyles[padding],
        interactive && 'relative hover:border-line-strong cursor-pointer focus-within:border-focus',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
