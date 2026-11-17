import { siteConfig } from '@/shared/config/site';

export interface ConsultationPayload {
  readonly name: string;
  readonly phone: string;
  readonly contactMethod: 'phone' | 'telegram' | 'email';
  readonly practiceArea: string;
  readonly description: string;
  readonly page: string;
}

const REQUEST_TIMEOUT_MS = 15_000;
const SEND_ERROR_MESSAGE =
  'Не удалось отправить заявку. Проверьте подключение к интернету и попробуйте ещё раз.';

/**
 * Отправляет заявку в Google Apps Script, который пишет её строкой в Google Таблицу.
 * Тело уходит как text/plain: так браузер не делает preflight-запрос, который Apps Script не обрабатывает.
 */
export async function sendConsultation(payload: ConsultationPayload): Promise<void> {
  const endpoint = siteConfig.consultationEndpoint;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(SEND_ERROR_MESSAGE);
    }

    const result: unknown = await response.json();
    if (!isSuccessResponse(result)) {
      throw new Error(SEND_ERROR_MESSAGE);
    }
  } catch {
    throw new Error(SEND_ERROR_MESSAGE);
  } finally {
    clearTimeout(timeoutId);
  }
}

function isSuccessResponse(value: unknown): boolean {
  return typeof value === 'object' && value !== null && 'ok' in value && value.ok === true;
}
