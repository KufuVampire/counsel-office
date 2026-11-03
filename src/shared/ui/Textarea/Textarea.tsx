import type { ComponentPropsWithoutRef, Ref } from 'react';
import { cn } from '@/shared/lib/cn';
import { useFormField } from '@/shared/ui/FormField';

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  readonly invalid?: boolean;
  readonly ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({
  id,
  invalid: propInvalid,
  disabled,
  required,
  rows = 3,
  className,
  'aria-describedby': ariaDescribedby,
  ref,
  ...rest
}: TextareaProps) {
  const field = useFormField();
  const isInvalid = propInvalid ?? field?.invalid;

  return (
    <textarea
      ref={ref}
      id={id ?? field?.id}
      required={required ?? field?.required}
      disabled={disabled}
      rows={rows}
      aria-describedby={ariaDescribedby ?? field?.describedBy}
      aria-invalid={isInvalid || undefined}
      className={cn(
        'w-full p-3 rounded-md bg-surface text-fg font-sans text-small',
        'border border-line-strong placeholder:text-fg-subtle focus-ring transition-colors duration-fast resize-y',
        'disabled:bg-disabled disabled:text-disabled-fg disabled:cursor-not-allowed',
        isInvalid && 'border-danger focus:outline-danger',
        className,
      )}
      {...rest}
    />
  );
}
