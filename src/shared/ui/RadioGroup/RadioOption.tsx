import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { useRadioGroup } from './radio-group.context';

export interface RadioOptionProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  readonly value: string;
  readonly label: ReactNode;
  readonly className?: string;
}

export function RadioOption({
  value,
  label,
  id: propId,
  disabled: propDisabled,
  className,
  ...rest
}: RadioOptionProps) {
  const generatedId = useId();
  const id = propId || generatedId;
  const group = useRadioGroup();

  const isChecked = group ? group.value === value : rest.checked;
  const isDisabled = propDisabled || group?.disabled;

  return (
    <label
      htmlFor={id}
      className={cn(
        'relative inline-flex items-center gap-2.5 cursor-pointer select-none text-small font-sans',
        isDisabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <input
        id={id}
        type="radio"
        name={group?.name ?? rest.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => group?.onChange(value)}
        className="sr-only peer"
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
          'border border-line-strong bg-surface transition-colors duration-fast',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-focus peer-focus-visible:outline-offset-2',
          'peer-checked:border-primary',
        )}
      >
        <span
          className={cn(
            'h-2 w-2 rounded-full bg-primary scale-0 transition-transform duration-fast',
            'peer-checked:scale-100',
          )}
        />
      </span>
      <span className="text-small text-fg leading-none">{label}</span>
    </label>
  );
}
