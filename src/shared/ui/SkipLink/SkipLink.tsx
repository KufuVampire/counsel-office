import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared/lib/cn';

export interface SkipLinkProps extends ComponentPropsWithoutRef<'a'> {
  readonly targetId?: string;
  readonly className?: string;
}

export function SkipLink({
  targetId = 'main',
  className,
  children = 'К основному содержимому',
  ...rest
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-toast',
        'focus:inline-flex focus:h-control-md focus:items-center focus:rounded-md focus:bg-primary focus:px-4',
        'focus:text-small focus:text-primary-fg focus-ring',
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
