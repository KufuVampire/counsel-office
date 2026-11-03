import { useId, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { RadioGroupContext, type RadioGroupContextValue } from './radio-group.context';

export interface RadioGroupProps {
  readonly name?: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly legend?: ReactNode;
  readonly disabled?: boolean;
  readonly orientation?: 'horizontal' | 'vertical';
  readonly className?: string;
  readonly children: ReactNode;
}

export function RadioGroup({
  name: propName,
  value,
  onChange,
  legend,
  disabled,
  orientation = 'horizontal',
  className,
  children,
}: RadioGroupProps) {
  const generatedName = useId();
  const name = propName || generatedName;

  const contextValue: RadioGroupContextValue = {
    name,
    value,
    onChange,
    disabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <fieldset className={cn('flex flex-col gap-2', className)}>
        {legend && (
          <legend className="font-sans text-small font-medium text-fg mb-1">{legend}</legend>
        )}
        <div
          className={cn(
            'flex gap-4 flex-wrap',
            orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
          )}
        >
          {children}
        </div>
      </fieldset>
    </RadioGroupContext.Provider>
  );
}
