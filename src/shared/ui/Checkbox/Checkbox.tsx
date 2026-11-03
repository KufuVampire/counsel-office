import { useId, type ComponentPropsWithoutRef, type ReactNode, type Ref } from 'react';
import { cn } from '@/shared/lib/cn';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  readonly label: ReactNode;
  readonly error?: string;
  readonly ref?: Ref<HTMLInputElement>;
}

export function Checkbox({
  id: propId,
  label,
  error,
  checked,
  disabled,
  className,
  ref,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const id = propId || generatedId;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('flex flex-col gap-1 w-full', className)}>
      <label
        htmlFor={id}
        className={cn(
          'relative inline-flex items-start gap-3 cursor-pointer select-none text-small font-sans',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={errorId}
          className="sr-only peer"
          {...rest}
        />
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm',
            'border border-line-strong bg-surface transition-colors duration-fast mt-0.5',
            'peer-focus-visible:outline-2 peer-focus-visible:outline-focus peer-focus-visible:outline-offset-2',
            'peer-checked:bg-primary peer-checked:border-primary text-primary-fg',
            error && 'border-danger',
          )}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 scale-0 transition-transform duration-fast peer-checked:scale-100"
          >
            <polyline points="3 8 6.5 11.5 13 4" />
          </svg>
        </span>
        <span className="text-small text-fg leading-snug">{label}</span>
      </label>
      {error && (
        <p id={errorId} role="alert" className="font-sans text-caption text-danger pl-8">
          {error}
        </p>
      )}
    </div>
  );
}
