import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { AccordionItem } from './AccordionItem';

export interface AccordionEntry {
  readonly id: string;
  readonly title: string;
  readonly content: ReactNode;
  readonly defaultOpen?: boolean;
}

export interface AccordionProps {
  readonly items: readonly AccordionEntry[];
  readonly name?: string;
  readonly className?: string;
}

export function Accordion({ items, name = 'accordion', className }: AccordionProps) {
  return (
    <div className={cn('w-full divide-y-0 border-t border-line-subtle', className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          name={name}
          title={item.title}
          content={item.content}
          defaultOpen={item.defaultOpen}
        />
      ))}
    </div>
  );
}
