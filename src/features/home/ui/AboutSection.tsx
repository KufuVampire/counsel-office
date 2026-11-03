import { specialistConfig } from '@/shared/config/specialist';
import { Avatar } from '@/shared/ui/Avatar';
import { Card } from '@/shared/ui/Card';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';

export function AboutSection() {
  return (
    <Section id="about" tone="muted" spacing="default" aria-labelledby="about-title">
      <Container size="content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start gap-4">
            <Avatar name={specialistConfig.fullName} size="xl" />
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-sans text-small font-medium text-primary">
                {specialistConfig.title}
              </span>
              <Heading id="about-title" level={2} size="h2" className="mt-1">
                {specialistConfig.fullName}
              </Heading>
              <span className="font-sans text-caption text-fg-subtle mt-1">
                {specialistConfig.status}
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {specialistConfig.bio.map((paragraph) => (
                <Text key={paragraph} size="body-lg" tone="muted" className="leading-relaxed">
                  {paragraph}
                </Text>
              ))}
            </div>

            <Card padding="md" className="bg-surface border-line-subtle">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-sans text-caption font-semibold uppercase tracking-wide text-fg-subtle mb-1">
                    Образование
                  </h3>
                  <p className="font-sans text-small text-fg">{specialistConfig.education}</p>
                </div>
                <div>
                  <h3 className="font-sans text-caption font-semibold uppercase tracking-wide text-fg-subtle mb-1">
                    Опыт работы
                  </h3>
                  <p className="font-sans text-small text-fg">{specialistConfig.experienceText}</p>
                </div>
                <div>
                  <h3 className="font-sans text-caption font-semibold uppercase tracking-wide text-fg-subtle mb-1">
                    Статус
                  </h3>
                  <p className="font-sans text-small text-fg">{specialistConfig.registryNumber}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
