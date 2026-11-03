import { specialistConfig } from '@/shared/config/specialist';
import { useConsultationModal } from '@/shared/lib/consultation-modal-context';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Container } from '@/shared/ui/Container';
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

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button variant="primary" size="lg" onClick={() => openModal()}>
                Записаться на консультацию
              </Button>
              <a
                href="#practices"
                className="inline-flex h-control-lg items-center justify-center font-sans font-medium rounded-md px-6 text-body transition-colors duration-fast bg-surface text-fg hover:bg-hover active:bg-surface-muted border border-line focus-ring"
              >
                Направления работы
              </a>
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
                <h2 className="font-serif text-h3 text-fg">{specialistConfig.fullName}</h2>
                <span className="font-sans text-caption text-fg-subtle">
                  {specialistConfig.registryNumber}
                </span>
              </div>

              <div className="pt-4 border-t border-line-subtle flex flex-col gap-2 font-sans text-small text-fg-muted">
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
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
