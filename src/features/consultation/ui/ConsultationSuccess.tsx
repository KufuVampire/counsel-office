import { useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/cn';
import { Alert } from '@/shared/ui/Alert';
import { Button } from '@/shared/ui/Button';

export interface ConsultationSuccessProps {
  readonly onReset: () => void;
  readonly className?: string;
}

export function ConsultationSuccess({ onReset, className }: ConsultationSuccessProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Форма схлопывается в короткое сообщение: возвращаем его в зону видимости и переводим фокус
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollIntoView({ block: 'center' });
    container.focus({ preventScroll: true });
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className={cn('flex scroll-mt-24 flex-col gap-4 py-4 outline-none', className)}
    >
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
