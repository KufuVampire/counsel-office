import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { Icon } from '@/shared/ui/Icon';

export interface AccordionItemProps {
  readonly id: string;
  readonly title: string;
  readonly content: ReactNode;
  readonly name?: string;
  readonly defaultOpen?: boolean;
  readonly className?: string;
}

export function AccordionItem({
  id,
  title,
  content,
  name,
  defaultOpen,
  className,
}: AccordionItemProps) {
  return (
    <details
      id={id}
      name={name}
      open={defaultOpen}
      className={cn(
        'group border-b border-line-subtle py-4 transition-colors duration-fast',
        className,
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-body font-medium text-fg select-none focus-ring rounded-sm [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <Icon
          icon={ChevronDown}
          size="sm"
          className="text-fg-muted transition-transform duration-base group-open:rotate-180 shrink-0"
        />
      </summary>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-base ease-standard group-open:grid-rows-[1fr]">
        <div className="overflow-hidden font-sans text-small text-fg-muted leading-relaxed">
          <div className="pt-3">{content}</div>
        </div>
      </div>
    </details>
  );
}
