import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export interface ProseProps<T extends ElementType = 'div'> {
  readonly as?: T;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Prose<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: ProseProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ProseProps<T>>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn(
        'max-w-reading font-serif text-body-lg leading-relaxed text-fg-muted',
        '[&_h2]:font-serif [&_h2]:text-h2 [&_h2]:tracking-tight [&_h2]:text-fg [&_h2]:mt-10 [&_h2]:mb-4',
        '[&_h3]:font-serif [&_h3]:text-h3 [&_h3]:tracking-tight [&_h3]:text-fg [&_h3]:mt-8 [&_h3]:mb-3',
        '[&_p]:mb-6 [&_p]:leading-relaxed',
        '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2',
        '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2',
        '[&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-fg',
        '[&_a]:text-link [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-link-hover',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
