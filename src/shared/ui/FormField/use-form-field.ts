import { useContext } from 'react';
import { FormFieldContext, type FormFieldContextValue } from './form-field.context';

export function useFormField(): FormFieldContextValue | null {
  return useContext(FormFieldContext);
}
