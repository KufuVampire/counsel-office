import { useRef, useState, type FormEvent } from 'react';
import { formatPhone } from '@/shared/lib/format-phone';
import { sendConsultation } from '@/shared/api/send-consultation';
import { PRACTICE_OPTIONS } from '../data/practice-options';
import { buildConsultationPayload } from '../lib/build-consultation-payload';
import { validateConsultation } from '../lib/validate-consultation';
import type { ConsultationFormErrors, ConsultationFormValues, FormStatus } from '../types';

export interface UseConsultationFormOptions {
  readonly initialPracticeSlug?: string;
  readonly onSuccess?: () => void;
}

function createInitialValues(initialPracticeSlug?: string): ConsultationFormValues {
  return {
    name: '',
    phone: '',
    contactMethod: 'telegram',
    practiceArea: initialPracticeSlug ?? 'semejnoe-pravo',
    description: '',
    // Согласие на обработку данных пользователь ставит сам (152-ФЗ)
    consent: false,
    honeypot: '',
  };
}

export function useConsultationForm({
  initialPracticeSlug,
  onSuccess,
}: UseConsultationFormOptions = {}) {
  const [values, setValues] = useState<ConsultationFormValues>(() =>
    createInitialValues(initialPracticeSlug),
  );

  const [errors, setErrors] = useState<ConsultationFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ConsultationFormValues, boolean>>>(
    {},
  );
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const errorAlertRef = useRef<HTMLDivElement | null>(null);

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

    // Скрытое поле заполнил бот: показываем успех, но ничего не отправляем
    if (values.honeypot.trim()) {
      setStatus('success');
      return;
    }

    try {
      await sendConsultation(
        buildConsultationPayload(values, PRACTICE_OPTIONS, window.location.pathname),
      );
      setStatus('success');
      onSuccess?.();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Произошла ошибка при отправке заявки.');
      // Поднимаем сообщение об ошибке в зону видимости
      requestAnimationFrame(() => errorAlertRef.current?.scrollIntoView({ block: 'center' }));
    }
  };

  const reset = () => {
    setValues(createInitialValues(initialPracticeSlug));
    setErrors({});
    setTouched({});
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
    errorAlertRef,
    setFieldValue,
    handleBlur,
    handleSubmit,
    reset,
  };
}
