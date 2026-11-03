import { Link } from 'react-router';
import { paths } from '@/shared/config/paths';
import { PRACTICE_CATALOG } from '@/shared/config/practice-catalog';
import { Card } from '@/shared/ui/Card';
import { Container } from '@/shared/ui/Container';
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
                <h3 className="font-serif text-h3 text-fg group-hover:text-primary transition-colors duration-fast">
                  <Link to={paths.practice(practice.slug)} className="focus-ring rounded-sm">
                    {practice.title}
                  </Link>
                </h3>
                <p className="font-sans text-small text-fg-muted leading-relaxed">
                  {practice.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-line-subtle">
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
