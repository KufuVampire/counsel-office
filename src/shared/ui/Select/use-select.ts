import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/shared/hooks/use-click-outside';
import { useEscapeKey } from '@/shared/hooks/use-escape-key';
import type { SelectOptionItem } from './select.types';

export interface UseSelectOptions {
  readonly options: readonly SelectOptionItem[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly disabled?: boolean;
}

export function useSelect({ options, value, onChange, disabled }: UseSelectOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = options.findIndex((opt) => opt.value === value);
  const [activeIndex, setActiveIndex] = useState<number>(selectedIndex >= 0 ? selectedIndex : 0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const searchTimeoutRef = useRef<number | null>(null);
  const searchBufferRef = useRef<string>('');

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);
  useEscapeKey(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, isOpen);

  useEffect(() => {
    if (selectedIndex >= 0) {
      setActiveIndex(selectedIndex);
    }
  }, [selectedIndex]);

  const selectOption = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (disabled) return;

    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (options[activeIndex]) {
          selectOption(options[activeIndex].value);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
          searchBufferRef.current += event.key.toLowerCase();
          if (searchTimeoutRef.current) window.clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = window.setTimeout(() => {
            searchBufferRef.current = '';
          }, 500);

          const matchIdx = options.findIndex((opt) =>
            opt.label.toLowerCase().startsWith(searchBufferRef.current),
          );
          if (matchIdx !== -1) setActiveIndex(matchIdx);
        }
        break;
    }
  };

  return {
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    containerRef,
    triggerRef,
    selectOption,
    handleKeyDown,
  };
}
