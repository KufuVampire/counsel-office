import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatPhone, cleanPhone } from '../src/shared/lib/format-phone.ts';
import { validateConsultation } from '../src/features/consultation/lib/validate-consultation.ts';

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
