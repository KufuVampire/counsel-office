import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import {
  type SectionSpacing,
  type SectionTone,
  sectionSpacingStyles,
  sectionToneStyles,
} from './section.variants';

export interface SectionProps<T extends ElementType = 'section'> {
  readonly as?: T;
  readonly tone?: SectionTone;
  readonly spacing?: SectionSpacing;
  readonly id?: string;
  readonly 'aria-labelledby'?: string;
  readonly className?: string;
  readonly children?: ReactNode;
}

export function Section<T extends ElementType = 'section'>({
  as,
  tone = 'page',
  spacing = 'default',
  id,
  'aria-labelledby': ariaLabelledby,
  className,
  children,
  ...rest
}: SectionProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof SectionProps<T>>) {
  const Component = as || 'section';

  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn('w-full', sectionToneStyles[tone], sectionSpacingStyles[spacing], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
