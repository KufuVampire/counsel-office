import { useState, type ReactNode } from 'react';
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
  readonly className?: string;
  readonly allowMultiple?: boolean;
}

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => {
    const initial = new Set<string>();
    items.forEach((item) => {
      if (item.defaultOpen) {
        initial.add(item.id);
      }
    });
    return initial;
  });

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn('w-full divide-y-0 border-t border-line-subtle', className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isOpen={openIds.has(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
