import { useConsultationModal } from '@/shared/lib/consultation-modal-context';
import { Button } from '@/shared/ui/Button';
import { Heading } from '@/shared/ui/Heading';
import { Text } from '@/shared/ui/Text';

export interface BlogCTAProps {
  readonly practiceSlug?: string;
}

export function BlogCTA({ practiceSlug }: BlogCTAProps) {
  const { openModal } = useConsultationModal();

  return (
    <div className="bg-inverse text-fg-inverse rounded-lg p-8 sm:p-10 text-center my-12 flex flex-col items-center gap-6">
      <Heading level={2} size="h3" tone="inverse">
        Остались вопросы по вашей правовой ситуации?
      </Heading>
      <Text size="body" tone="inverse" className="text-fg-inverse-muted leading-relaxed">
        Каждое дело имеет уникальные фактические нюансы. Запишитесь на первичную консультацию, чтобы
        получить профессиональную правовую оценку.
      </Text>
      <div className="pt-2">
        <Button variant="inverse" size="lg" onClick={() => openModal(practiceSlug)}>
          Записаться на консультацию
        </Button>
      </div>
    </div>
  );
}
