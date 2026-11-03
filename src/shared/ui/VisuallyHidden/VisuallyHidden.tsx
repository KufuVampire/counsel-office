import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export interface VisuallyHiddenProps<T extends ElementType = 'span'> {
  readonly as?: T;
  readonly className?: string;
  readonly children?: ReactNode;
}

export function VisuallyHidden<T extends ElementType = 'span'>({
  as,
  className,
  children,
  ...rest
}: VisuallyHiddenProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof VisuallyHiddenProps<T>>) {
  const Component = as || 'span';

  return (
    <Component className={cn('sr-only', className)} {...rest}>
      {children}
    </Component>
  );
}
