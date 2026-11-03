/**
 * Форматирует строку телефонного номера по маске +7 (XXX) XXX-XX-XX
 */
export function formatPhone(raw: string): string {
  // Извлекаем только цифры
  const digits = raw.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  // Если номер начинается с 8 или 7, пропускаем первую цифру для единообразия
  const normalizedDigits =
    digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits;

  let result = '+7';

  if (normalizedDigits.length > 0) {
    result += ` (${normalizedDigits.slice(0, 3)}`;
  }
  if (normalizedDigits.length >= 3) {
    result += `) ${normalizedDigits.slice(3, 6)}`;
  }
  if (normalizedDigits.length >= 6) {
    result += `-${normalizedDigits.slice(6, 8)}`;
  }
  if (normalizedDigits.length >= 8) {
    result += `-${normalizedDigits.slice(8, 10)}`;
  }

  return result;
}

export function cleanPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    return `+7${digits.slice(1)}`;
  }
  if (digits.length === 10) {
    return `+7${digits}`;
  }
  return digits ? `+${digits}` : '';
}
