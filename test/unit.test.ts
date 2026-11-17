import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatPhone, cleanPhone } from '../src/shared/lib/format-phone.ts';
import { validateConsultation } from '../src/features/consultation/lib/validate-consultation.ts';
import { buildConsultationPayload } from '../src/features/consultation/lib/build-consultation-payload.ts';

const practiceOptions = [
  { value: 'semejnoe-pravo', label: 'Семейное право' },
  { value: 'arbitrazh', label: 'Арбитражные споры' },
];

describe('formatPhone', () => {
  it('форматирует 10 цифр с префиксом +7', () => {
    assert.equal(formatPhone('9991234567'), '+7 (999) 123-45-67');
  });

  it('нормализует номер, начинающийся с 8', () => {
    assert.equal(formatPhone('89991234567'), '+7 (999) 123-45-67');
  });

  it('возвращает пустую строку для пустых входных данных', () => {
    assert.equal(formatPhone(''), '');
  });
});

describe('cleanPhone', () => {
  it('очищает форматированный телефон до E.164 формата', () => {
    assert.equal(cleanPhone('+7 (999) 123-45-67'), '+79991234567');
  });

  it('нормализует 11-значный номер, начинающийся с 8', () => {
    assert.equal(cleanPhone('8 (999) 123-45-67'), '+79991234567');
  });

  it('обрабатывает 10-значный номер без префикса страны', () => {
    assert.equal(cleanPhone('9991234567'), '+79991234567');
  });

  it('очищает номер с произвольными пробелами и спецсимволами', () => {
    assert.equal(cleanPhone(' +7  999 - 123 / 45 . 67 '), '+79991234567');
  });

  it('возвращает пустую строку для пустых входных данных', () => {
    assert.equal(cleanPhone(''), '');
  });
});

describe('validateConsultation', () => {
  it('возвращает ошибки при пустых обязательных полях', () => {
    const errors = validateConsultation({
      name: '',
      phone: '',
      contactMethod: 'phone',
      practiceArea: '',
      description: '',
      consent: false,
      honeypot: '',
    });

    assert.ok(errors.name);
    assert.ok(errors.phone);
    assert.ok(errors.practiceArea);
    assert.ok(errors.consent);
  });

  it('валидирует корректную форму без ошибок', () => {
    const errors = validateConsultation({
      name: 'Алексей',
      phone: '+7 (999) 123-45-67',
      contactMethod: 'telegram',
      practiceArea: 'semejnoe-pravo',
      description: 'Вопрос по разделу имущества',
      consent: true,
      honeypot: '',
    });

    assert.equal(Object.keys(errors).length, 0);
  });

  it('отклоняет слишком короткое имя', () => {
    const errors = validateConsultation({
      name: 'А',
      phone: '+7 (999) 123-45-67',
      contactMethod: 'phone',
      practiceArea: 'arbitrazh',
      description: '',
      consent: true,
      honeypot: '',
    });

    assert.equal(errors.name, 'Имя должно содержать не менее 2 символов');
  });
});

describe('buildConsultationPayload', () => {
  const values = {
    name: '  Алексей ',
    phone: '+7 (999) 123-45-67',
    contactMethod: 'telegram' as const,
    practiceArea: 'arbitrazh',
    description: '  Вопрос по договору поставки  ',
    consent: true,
    honeypot: '',
  };

  it('подставляет название направления вместо slug', () => {
    const payload = buildConsultationPayload(values, practiceOptions, '/');
    assert.equal(payload.practiceArea, 'Арбитражные споры');
  });

  it('обрезает пробелы в имени и описании', () => {
    const payload = buildConsultationPayload(values, practiceOptions, '/');
    assert.equal(payload.name, 'Алексей');
    assert.equal(payload.description, 'Вопрос по договору поставки');
  });

  it('оставляет slug, если направления нет в списке', () => {
    const payload = buildConsultationPayload(
      { ...values, practiceArea: 'other' },
      practiceOptions,
      '/',
    );
    assert.equal(payload.practiceArea, 'other');
  });

  it('не передаёт служебные поля формы', () => {
    const payload = buildConsultationPayload(values, practiceOptions, '/practice/arbitrazh');
    assert.equal(payload.page, '/practice/arbitrazh');
    assert.ok(!('honeypot' in payload));
    assert.ok(!('consent' in payload));
  });
});
