import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { cn } from '@/shared/lib/cn';
import { useClickOutside } from '@/shared/hooks/use-click-outside';
import { useEscapeKey } from '@/shared/hooks/use-escape-key';
import { usePresence } from '@/shared/hooks/use-presence';
import type { DropdownMenuProps } from './dropdown-menu.types';

export function DropdownMenu({ trigger, items, align = 'left', className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  const { isMounted, state, onAnimationEnd } = usePresence(isOpen);

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);
  useEscapeKey(() => {
    setIsOpen(false);
    triggerButtonRef.current?.focus();
  }, isOpen);

  const toggle = () => {
    setIsOpen((prev) => !prev);
    setActiveIndex(0);
  };

  const handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex(0);
      setTimeout(() => itemRefs.current[0]?.focus(), 0);
    }
  };

  const handleMenuKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = prev < items.length - 1 ? prev + 1 : 0;
          itemRefs.current[next]?.focus();
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = prev > 0 ? prev - 1 : items.length - 1;
          itemRefs.current[next]?.focus();
          return next;
        });
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        itemRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(items.length - 1);
        itemRefs.current[items.length - 1]?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      {trigger({
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
        onClick: toggle,
        onKeyDown: handleTriggerKeyDown,
        isOpen,
      })}

      {isMounted && (
        <div
          role="menu"
          tabIndex={-1}
          aria-orientation="vertical"
          data-state={state}
          onAnimationEnd={onAnimationEnd}
          onKeyDown={handleMenuKeyDown}
          className={cn(
            'absolute top-full mt-1.5 min-w-56 z-dropdown p-1.5',
            'rounded-md bg-surface border border-line-subtle shadow-sm',
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
            state === 'open' ? 'animate-pop-in' : 'animate-pop-out',
          )}
        >
          {items.map((item, idx) => {
            const itemClasses = cn(
              'flex w-full items-center px-3 py-2 rounded-sm text-small font-sans text-fg-muted',
              'transition-colors duration-fast text-left select-none focus-ring',
              'hover:bg-hover hover:text-fg focus:bg-hover focus:text-fg',
              idx === activeIndex && 'bg-hover text-fg',
            );

            if (item.to) {
              return (
                <Link
                  key={item.label}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  to={item.to}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={itemClasses}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                type="button"
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => {
                  setIsOpen(false);
                  item.onSelect?.();
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                className={itemClasses}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
