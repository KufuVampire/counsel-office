import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { type ContainerSize, containerSizeStyles } from './container.variants';

export interface ContainerProps<T extends ElementType = 'div'> {
  readonly as?: T;
  readonly size?: ContainerSize;
  readonly className?: string;
  readonly children?: ReactNode;
}

export function Container<T extends ElementType = 'div'>({
  as,
  size = 'content',
  className,
  children,
  ...rest
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn('mx-auto w-full px-gutter', containerSizeStyles[size], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
