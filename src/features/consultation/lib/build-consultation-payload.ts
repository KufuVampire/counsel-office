import type { ConsultationPayload } from '@/shared/api/send-consultation';
import type { ConsultationFormValues } from '../types';

export interface PracticeOptionLike {
  readonly value: string;
  readonly label: string;
}

/**
 * Готовит данные формы к отправке: обрезает пробелы и подставляет
 * человекочитаемое название направления вместо slug.
 */
export function buildConsultationPayload(
  values: ConsultationFormValues,
  practiceOptions: readonly PracticeOptionLike[],
  page: string,
): ConsultationPayload {
  const practiceLabel =
    practiceOptions.find((option) => option.value === values.practiceArea)?.label ??
    values.practiceArea;

  return {
    name: values.name.trim(),
    phone: values.phone.trim(),
    contactMethod: values.contactMethod,
    practiceArea: practiceLabel,
    description: values.description.trim(),
    page,
  };
}
