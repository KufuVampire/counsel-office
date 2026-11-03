import { useConsultationModal } from '@/shared/lib/consultation-modal-context';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';

export interface PracticeCTAProps {
  readonly practiceTitle: string;
  readonly practiceSlug: string;
}

export function PracticeCTA({ practiceTitle, practiceSlug }: PracticeCTAProps) {
  const { openModal } = useConsultationModal();

  return (
    <Section tone="inverse" spacing="default" className="text-center">
      <Container size="reading" className="flex flex-col items-center gap-6">
        <Heading level={2} size="h2" tone="inverse">
          Нужна консультация по направлению «{practiceTitle}»?
        </Heading>
        <Text size="body-lg" tone="inverse" className="text-fg-inverse-muted leading-relaxed">
          Запишитесь на первичный правовой разбор вашей ситуации. Мы подробно обсудим
          обстоятельства, изучим документы и наметим план действий.
        </Text>
        <div className="pt-2">
          <Button variant="inverse" size="lg" onClick={() => openModal(practiceSlug)}>
            Записаться на консультацию
          </Button>
        </div>
      </Container>
    </Section>
  );
}
