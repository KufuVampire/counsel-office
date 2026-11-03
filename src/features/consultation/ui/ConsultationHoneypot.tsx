import { useId } from 'react';
import { VisuallyHidden } from '@/shared/ui/VisuallyHidden';

export interface ConsultationHoneypotProps {
  readonly value: string;
  readonly onChange: (val: string) => void;
}

export function ConsultationHoneypot({ value, onChange }: ConsultationHoneypotProps) {
  const honeypotId = useId();

  return (
    <VisuallyHidden aria-hidden="true">
      <label htmlFor={honeypotId}>Проверочное поле</label>
      <input
        id={honeypotId}
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </VisuallyHidden>
  );
}
