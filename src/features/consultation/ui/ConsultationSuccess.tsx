import { cn } from '@/shared/lib/cn';
import { Alert } from '@/shared/ui/Alert';
import { Button } from '@/shared/ui/Button';

export interface ConsultationSuccessProps {
  readonly onReset: () => void;
  readonly className?: string;
}

export function ConsultationSuccess({ onReset, className }: ConsultationSuccessProps) {
  return (
    <div className={cn('flex flex-col gap-4 py-4', className)}>
      <Alert tone="success" title="Заявка принята" role="status">
        Благодарим за обращение. Адвокат свяжется с вами в течение рабочего дня для уточнения
        деталей.
      </Alert>
      <Button variant="secondary" size="md" onClick={onReset}>
        Отправить ещё одну заявку
      </Button>
    </div>
  );
}
