// MOCK: Имитация отправки формы на сервер

export interface ConsultationPayload {
  readonly name: string;
  readonly phone: string;
  readonly contactMethod: 'phone' | 'telegram' | 'email';
  readonly practiceArea: string;
  readonly description?: string;
  readonly consent: boolean;
  readonly honeypot?: string;
}

export interface ConsultationResponse {
  readonly success: boolean;
  readonly message: string;
}

export async function sendConsultation(
  payload: ConsultationPayload,
  simulateError = false,
): Promise<ConsultationResponse> {
  // Имитация сетевой задержки
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Honeypot: если бот заполнил скрытое поле, тихо имитируем успех
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return {
      success: true,
      message: 'Заявка принята в обработку.',
    };
  }

  if (simulateError) {
    throw new Error('Не удалось отправить заявку. Пожалуйста, попробуйте позже.');
  }

  return {
    success: true,
    message: 'Ваша заявка успешно отправлена. Адвокат свяжется с вами в ближайшее рабочее время.',
  };
}
