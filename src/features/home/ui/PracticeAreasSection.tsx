import { Link } from 'react-router';
import { paths } from '@/shared/config/paths';
import { PRACTICE_CATALOG } from '@/shared/config/practice-catalog';
import { Card } from '@/shared/ui/Card';
import { Container } from '@/shared/ui/Container';
import { Divider } from '@/shared/ui/Divider';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';

export function PracticeAreasSection() {
  return (
    <Section id="practices" tone="muted" spacing="default" aria-labelledby="practices-title">
      <Container size="content">
        <div className="flex flex-col gap-4 mb-10">
          <Heading id="practices-title" level={2} size="h2">
            Направления практики
          </Heading>
          <Text size="body-lg" tone="muted" className="max-w-reading">
            Сфокусированная юридическая помощь в ключевых областях частного и коммерческого права.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRACTICE_CATALOG.map((practice) => (
            <Card
              key={practice.slug}
              as="article"
              interactive
              padding="lg"
              className="flex flex-col justify-between h-full group"
            >
              <div className="flex flex-col gap-3">
                <Heading
                  level={3}
                  size="h3"
                  className="group-hover:text-primary transition-colors duration-fast"
                >
                  <Link
                    to={paths.practice(practice.slug)}
                    className="focus-ring rounded-sm before:absolute before:inset-0"
                  >
                    {practice.title}
                  </Link>
                </Heading>
                <Text size="small" tone="muted" className="leading-relaxed">
                  {practice.summary}
                </Text>
              </div>

              <div className="mt-8">
                <Divider tone="subtle" className="mb-4" />
                <span className="font-sans text-small font-medium text-link group-hover:text-link-hover transition-colors duration-fast">
                  Подробнее о направлении
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
