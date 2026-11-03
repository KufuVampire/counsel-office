import { useConsultationModal } from '@/shared/lib/consultation-modal-context';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';

export interface BlogCTAProps {
  readonly practiceSlug?: string;
}

export function BlogCTA({ practiceSlug }: BlogCTAProps) {
  const { openModal } = useConsultationModal();

  return (
    <Section tone="inverse" spacing="default" className="text-center my-12 rounded-lg">
      <Container size="reading" className="flex flex-col items-center gap-6">
        <Heading level={2} size="h3" tone="inverse">
          Остались вопросы по вашей правовой ситуации?
        </Heading>
        <Text size="body" tone="inverse" className="text-fg-inverse-muted leading-relaxed">
          Каждое дело имеет уникальные фактические нюансы. Запишитесь на первичную консультацию,
          чтобы получить профессиональную правовую оценку.
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
