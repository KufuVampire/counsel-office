export type ContactMethod = 'phone' | 'telegram' | 'email';
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ConsultationFormValues {
  name: string;
  phone: string;
  contactMethod: ContactMethod;
  practiceArea: string;
  description: string;
  consent: boolean;
  honeypot: string;
}

export type ConsultationFormErrors = Partial<Record<keyof ConsultationFormValues, string>>;
