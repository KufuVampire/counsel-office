import { useId, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { FormFieldContext, type FormFieldContextValue } from './form-field.context';

export interface FormFieldProps {
  readonly id?: string;
  readonly label?: ReactNode;
  readonly hint?: ReactNode;
  readonly error?: string;
  readonly required?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

export function FormField({
  id: propId,
  label,
  hint,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const id = propId || generatedId;

  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const invalid = Boolean(error);

  const contextValue: FormFieldContextValue = {
    id,
    describedBy,
    invalid,
    required,
  };

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div className={cn('flex flex-col gap-1.5 w-full', className)}>
        {label && (
          <label
            htmlFor={id}
            className="flex items-center gap-1 font-sans text-small font-medium text-fg"
          >
            <span>{label}</span>
            {required && (
              <span className="text-accent" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        {children}
        {hint && !error && (
          <p id={hintId} className="font-sans text-caption text-fg-subtle">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="font-sans text-caption text-danger">
            {error}
          </p>
        )}
      </div>
    </FormFieldContext.Provider>
  );
}
