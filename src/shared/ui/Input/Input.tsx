import type { ComponentPropsWithoutRef, Ref } from 'react';
import { cn } from '@/shared/lib/cn';
import { useFormField } from '@/shared/ui/FormField';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  readonly invalid?: boolean;
  readonly ref?: Ref<HTMLInputElement>;
}

export function Input({
  id,
  invalid: propInvalid,
  disabled,
  required,
  className,
  'aria-describedby': ariaDescribedby,
  ref,
  ...rest
}: InputProps) {
  const field = useFormField();
  const isInvalid = propInvalid ?? field?.invalid;

  return (
    <input
      ref={ref}
      id={id ?? field?.id}
      required={required ?? field?.required}
      disabled={disabled}
      aria-describedby={ariaDescribedby ?? field?.describedBy}
      aria-invalid={isInvalid || undefined}
      className={cn(
        'w-full h-control-md px-3 rounded-md bg-surface text-fg font-sans text-small',
        'border border-line-strong placeholder:text-fg-subtle focus-ring transition-colors duration-fast',
        'disabled:bg-disabled disabled:text-disabled-fg disabled:cursor-not-allowed',
        isInvalid && 'border-danger focus:outline-danger',
        className,
      )}
      {...rest}
    />
  );
}
