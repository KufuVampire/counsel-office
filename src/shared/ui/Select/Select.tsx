import { ChevronDown } from 'lucide-react';
import { useId } from 'react';
import { cn } from '@/shared/lib/cn';
import { useFormField } from '@/shared/ui/FormField';
import { Icon } from '@/shared/ui/Icon';
import { SelectOption } from './SelectOption';
import type { SelectProps } from './select.types';
import { useSelect } from './use-select';

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Выберите вариант...',
  id: propId,
  disabled = false,
  invalid: propInvalid,
  className,
}: SelectProps) {
  const field = useFormField();
  const generatedId = useId();
  const selectId = propId || field?.id || generatedId;
  const listboxId = `${selectId}-listbox`;

  const isInvalid = propInvalid ?? field?.invalid;

  const {
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    containerRef,
    triggerRef,
    selectOption,
    handleKeyDown,
  } = useSelect({ options, value, onChange, disabled });

  const selectedOption = options.find((opt) => opt.value === value);
  const activeDescendantId =
    isOpen && options[activeIndex] ? `${selectId}-opt-${activeIndex}` : undefined;

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={activeDescendantId}
        aria-invalid={isInvalid || undefined}
        aria-describedby={field?.describedBy}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full h-control-md px-3 rounded-md bg-surface text-fg font-sans text-small text-left',
          'border border-line-strong flex items-center justify-between gap-2',
          'focus-ring transition-colors duration-fast select-none',
          'disabled:bg-disabled disabled:text-disabled-fg disabled:cursor-not-allowed',
          isInvalid && 'border-danger focus:outline-danger',
        )}
      >
        <span className={cn('truncate', !selectedOption && 'text-fg-subtle')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Icon
          icon={ChevronDown}
          size="sm"
          className={cn('text-fg-muted transition-transform duration-base', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          className={cn(
            'absolute left-0 top-full mt-1 w-full z-dropdown p-1',
            'rounded-md bg-surface border border-line-subtle shadow-sm',
            'max-h-60 overflow-y-auto scrollbar-custom origin-top animate-pop-in',
          )}
        >
          {options.map((option, idx) => (
            <SelectOption
              key={option.value}
              id={`${selectId}-opt-${idx}`}
              option={option}
              isSelected={option.value === value}
              isActive={idx === activeIndex}
              onSelect={selectOption}
              onMouseEnter={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
