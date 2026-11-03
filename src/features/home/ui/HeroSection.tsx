import { specialistConfig } from '@/shared/config/specialist';
import { useConsultationModal } from '@/shared/lib/consultation-modal-context';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { ButtonLink } from '@/shared/ui/ButtonLink';
import { Card } from '@/shared/ui/Card';
import { Container } from '@/shared/ui/Container';
import { Divider } from '@/shared/ui/Divider';
import { Heading } from '@/shared/ui/Heading';
import { SealMark } from '@/shared/ui/SealMark';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';

export function HeroSection() {
  const { openModal } = useConsultationModal();

  return (
    <Section tone="page" spacing="default" className="animate-fade-in">
      <Container size="content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7/12) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <Heading level={1} size="display" tone="default">
              Юридическая защита по семейным, арбитражным и банкротным делам
            </Heading>

            <Text size="body-lg" tone="muted" className="max-w-reading">
              Индивидуальный правовой аудит ситуации, выработка практической стратегии и
              конфиденциальное ведение дел в судах и на переговорах.
            </Text>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="sm:w-auto"
                onClick={() => openModal()}
              >
                Записаться на консультацию
              </Button>
              <ButtonLink
                to="#practices"
                variant="secondary"
                size="lg"
                fullWidth
                className="sm:w-auto"
              >
                Направления работы
              </ButtonLink>
            </div>
          </div>

          {/* Right Column (5/12) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Card
              padding="lg"
              className="w-full max-w-sm flex flex-col gap-6 relative overflow-hidden bg-surface border-line-subtle"
            >
              <div className="flex items-center justify-between">
                <Avatar name={specialistConfig.fullName} size="xl" />
                <SealMark size="lg" tone="oxblood" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-sans text-small font-medium text-primary">
                  {specialistConfig.title}
                </span>
                <Heading level={2} size="h3">
                  {specialistConfig.fullName}
                </Heading>
                <span className="font-sans text-caption text-fg-subtle">
                  {specialistConfig.registryNumber}
                </span>
              </div>

              <div>
                <Divider tone="subtle" className="mb-4" />
                <div className="flex flex-col gap-2 font-sans text-small text-fg-muted">
                  <div className="flex justify-between items-center">
                    <span>Стаж практики:</span>
                    <span className="font-medium text-fg">
                      {specialistConfig.experienceYears} лет
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Формат работы:</span>
                    <span className="font-medium text-fg">{specialistConfig.format}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Город:</span>
                    <span className="font-medium text-fg">{specialistConfig.city}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
