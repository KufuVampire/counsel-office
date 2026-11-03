import type { ConsultationFormErrors, ConsultationFormValues } from '../types';

export function validateConsultation(values: ConsultationFormValues): ConsultationFormErrors {
  const errors: ConsultationFormErrors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'Пожалуйста, укажите ваше имя';
  } else if (trimmedName.length < 2) {
    errors.name = 'Имя должно содержать не менее 2 символов';
  }

  const phoneDigits = values.phone.replace(/\D/g, '');
  if (!phoneDigits) {
    errors.phone = 'Пожалуйста, укажите контактный телефон';
  } else if (
    phoneDigits.length < 11 &&
    !(phoneDigits.length === 10 && phoneDigits.startsWith('9'))
  ) {
    errors.phone = 'Пожалуйста, укажите полный номер телефона';
  }

  if (!values.contactMethod) {
    errors.contactMethod = 'Выберите удобный способ связи';
  }

  if (!values.practiceArea) {
    errors.practiceArea = 'Пожалуйста, выберите направление';
  }

  if (!values.consent) {
    errors.consent = 'Необходимо подтвердить согласие на обработку данных';
  }

  return errors;
}
