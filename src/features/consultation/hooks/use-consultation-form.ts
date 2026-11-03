import { useRef, useState, type FormEvent } from 'react';
import { formatPhone } from '@/shared/lib/format-phone';
import { sendConsultation } from '@/shared/api/send-consultation';
import { validateConsultation } from '../lib/validate-consultation';
import type { ConsultationFormErrors, ConsultationFormValues, FormStatus } from '../types';

export interface UseConsultationFormOptions {
  readonly initialPracticeSlug?: string;
  readonly onSuccess?: () => void;
}

export function useConsultationForm({
  initialPracticeSlug,
  onSuccess,
}: UseConsultationFormOptions = {}) {
  const [values, setValues] = useState<ConsultationFormValues>({
    name: '',
    phone: '',
    contactMethod: 'phone',
    practiceArea: initialPracticeSlug ?? 'semejnoe-pravo',
    description: '',
    consent: true,
    honeypot: '',
  });

  const [errors, setErrors] = useState<ConsultationFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ConsultationFormValues, boolean>>>(
    {},
  );
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const setFieldValue = <K extends keyof ConsultationFormValues>(
    field: K,
    val: ConsultationFormValues[K],
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: field === 'phone' ? formatPhone(val as string) : val,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: keyof ConsultationFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validateConsultation(values);
    if (currentErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
    }
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    const validationErrors = validateConsultation(values);
    setErrors(validationErrors);
    setTouched({
      name: true,
      phone: true,
      contactMethod: true,
      practiceArea: true,
      consent: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.name) {
        nameInputRef.current?.focus();
      } else if (validationErrors.phone) {
        phoneInputRef.current?.focus();
      }
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await sendConsultation(values);
      setStatus('success');
      onSuccess?.();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Произошла ошибка при отправке заявки.');
    }
  };

  const reset = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return {
    values,
    errors,
    touched,
    status,
    errorMessage,
    nameInputRef,
    phoneInputRef,
    setFieldValue,
    handleBlur,
    handleSubmit,
    reset,
  };
}
