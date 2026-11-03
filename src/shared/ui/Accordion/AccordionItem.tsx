import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { Icon } from '@/shared/ui/Icon';

export interface AccordionItemProps {
  readonly id: string;
  readonly title: string;
  readonly content: ReactNode;
  readonly defaultOpen?: boolean;
  readonly isOpen?: boolean;
  readonly onToggle?: () => void;
  readonly className?: string;
}

export function AccordionItem({
  id,
  title,
  content,
  defaultOpen = false,
  isOpen: externalOpen,
  onToggle,
  className,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
    if (!isControlled) {
      setInternalOpen((prev) => !prev);
    }
  };

  const contentId = `${id}-content`;
  const triggerId = `${id}-trigger`;

  return (
    <div
      id={id}
      className={cn('border-b border-line-subtle py-4 transition-colors duration-fast', className)}
    >
      <h3 className="m-0 p-0 text-body font-medium">
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={handleToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left font-sans text-body font-medium text-fg select-none focus-ring rounded-sm transition-colors duration-fast hover:text-primary"
        >
          <span>{title}</span>
          <Icon
            icon={ChevronDown}
            size="sm"
            className={cn(
              'text-fg-muted transition-transform duration-base shrink-0',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          'grid transition-[grid-template-rows] duration-base ease-standard',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-3 font-sans text-small text-fg-muted leading-relaxed">{content}</div>
        </div>
      </div>
    </div>
  );
}
