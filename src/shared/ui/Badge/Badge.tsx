import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { type BadgeTone, badgeToneStyles } from './badge.variants';

export interface BadgeProps {
  readonly tone?: BadgeTone;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-sm font-sans text-caption font-medium select-none',
        badgeToneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
