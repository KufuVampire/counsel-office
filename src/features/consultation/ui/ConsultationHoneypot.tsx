export interface ConsultationHoneypotProps {
  readonly value: string;
  readonly onChange: (val: string) => void;
}

export function ConsultationHoneypot({ value, onChange }: ConsultationHoneypotProps) {
  return (
    <div aria-hidden="true" className="sr-only">
      <label htmlFor="form-verification">Проверочное поле</label>
      <input
        id="form-verification"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
