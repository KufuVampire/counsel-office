import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import {
  type HeadingLevel,
  type HeadingSize,
  type HeadingTone,
  headingSizeStyles,
  headingToneStyles,
} from './heading.variants';

export interface HeadingProps extends ComponentPropsWithoutRef<'h1'> {
  readonly level?: HeadingLevel;
  readonly size?: HeadingSize;
  readonly tone?: HeadingTone;
  readonly className?: string;
  readonly children?: ReactNode;
}

export function Heading({
  level = 2,
  size,
  tone = 'default',
  className,
  children,
  ...rest
}: HeadingProps) {
  const Component = `h${level}` as const;
  const defaultSize: HeadingSize =
    level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4';
  const resolvedSize = size ?? defaultSize;

  return (
    <Component
      className={cn(
        'font-serif tracking-tight',
        headingSizeStyles[resolvedSize],
        headingToneStyles[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
