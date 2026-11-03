import { Link } from 'react-router';
import { cn } from '@/shared/lib/cn';
import { paths } from '@/shared/config/paths';
import { siteConfig } from '@/shared/config/site';
import { Alert } from '@/shared/ui/Alert';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { RadioGroup, RadioOption } from '@/shared/ui/RadioGroup';
import { Select } from '@/shared/ui/Select';
import { Textarea } from '@/shared/ui/Textarea';
import { PRACTICE_OPTIONS } from '../data/practice-options';
import { useConsultationForm } from '../hooks/use-consultation-form';
import { ConsultationHoneypot } from './ConsultationHoneypot';
import { ConsultationSuccess } from './ConsultationSuccess';

export interface ConsultationFormProps {
  readonly initialPracticeSlug?: string;
  readonly onSuccess?: () => void;
  readonly className?: string;
}

export function ConsultationForm({
  initialPracticeSlug,
  onSuccess,
  className,
}: ConsultationFormProps) {
  const {
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
  } = useConsultationForm({ initialPracticeSlug, onSuccess });

  if (status === 'success') {
    return <ConsultationSuccess onReset={reset} className={className} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('flex flex-col gap-4', className)}>
      {status === 'error' && (
        <Alert tone="danger" title="Ошибка отправки" role="alert">
          {errorMessage || 'Не удалось отправить заявку. Попробуйте еще раз.'}
        </Alert>
      )}

      <ConsultationHoneypot
        value={values.honeypot}
        onChange={(val) => setFieldValue('honeypot', val)}
      />

      <FormField label="Ваше имя" required error={touched.name ? errors.name : undefined}>
        <Input
          ref={nameInputRef}
          value={values.name}
          placeholder="Например, Иван"
          onChange={(e) => setFieldValue('name', e.target.value)}
          onBlur={() => handleBlur('name')}
        />
      </FormField>

      <FormField label="Телефон" required error={touched.phone ? errors.phone : undefined}>
        <Input
          ref={phoneInputRef}
          type="tel"
          value={values.phone}
          placeholder="+7 (___) ___-__-__"
          onChange={(e) => setFieldValue('phone', e.target.value)}
          onBlur={() => handleBlur('phone')}
        />
      </FormField>

      <RadioGroup
        legend="Предпочтительный способ связи"
        value={values.contactMethod}
        onChange={(val) => setFieldValue('contactMethod', val as 'phone' | 'telegram' | 'email')}
      >
        <RadioOption value="phone" label="Телефон" />
        <RadioOption value="telegram" label="Telegram" />
        <RadioOption value="email" label="Email" />
      </RadioGroup>

      <FormField
        label="Направление"
        required
        error={touched.practiceArea ? errors.practiceArea : undefined}
      >
        <Select
          value={values.practiceArea}
          onChange={(val) => setFieldValue('practiceArea', val)}
          options={PRACTICE_OPTIONS}
          placeholder="Выберите направление"
        />
      </FormField>

      <FormField label="Краткое описание вопроса (опционально)">
        <Textarea
          value={values.description}
          placeholder="Опишите в 2–3 предложениях суть вопроса..."
          rows={3}
          onChange={(e) => setFieldValue('description', e.target.value)}
        />
      </FormField>

      <Checkbox
        checked={values.consent}
        onChange={(e) => setFieldValue('consent', e.target.checked)}
        error={touched.consent ? errors.consent : undefined}
        label={
          <span>
            Согласен на{' '}
            <Link
              to={paths.privacy}
              onClick={(e) => e.stopPropagation()}
              className="text-link underline underline-offset-2 hover:text-link-hover"
            >
              обработку персональных данных
            </Link>
          </span>
        }
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={status === 'submitting'}
        className="mt-2"
      >
        Отправить заявку
      </Button>

      <p className="text-caption font-sans text-fg-subtle leading-relaxed">
        {siteConfig.disclaimer} Вся переданная информация защищена адвокатской тайной.
      </p>
    </form>
  );
}
