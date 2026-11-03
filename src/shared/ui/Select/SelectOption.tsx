import { cn } from '@/shared/lib/cn';
import type { SelectOptionItem } from './select.types';

export interface SelectOptionProps {
  readonly option: SelectOptionItem;
  readonly isSelected: boolean;
  readonly isActive: boolean;
  readonly onSelect: (value: string) => void;
  readonly onMouseEnter: () => void;
  readonly id: string;
}

export function SelectOption({
  option,
  isSelected,
  isActive,
  onSelect,
  onMouseEnter,
  id,
}: SelectOptionProps) {
  return (
    <div
      id={id}
      role="option"
      tabIndex={-1}
      aria-selected={isSelected}
      onClick={() => onSelect(option.value)}
      onMouseEnter={onMouseEnter}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(option.value);
        }
      }}
      className={cn(
        'relative flex items-center justify-between px-3 py-2 text-small font-sans cursor-pointer select-none rounded-sm transition-colors duration-fast',
        isActive && 'bg-hover text-fg',
        isSelected && 'font-medium text-fg bg-selected',
        !isActive && !isSelected && 'text-fg-muted',
      )}
    >
      <span>{option.label}</span>
      {isSelected && (
        <span aria-hidden="true" className="text-primary text-caption font-semibold">
          ✓
        </span>
      )}
    </div>
  );
}
