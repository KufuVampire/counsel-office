import { createContext } from 'react';

export interface FormFieldContextValue {
  readonly id: string;
  readonly describedBy?: string;
  readonly invalid?: boolean;
  readonly required?: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);
