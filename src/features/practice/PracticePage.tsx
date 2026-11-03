import { NotFoundPage } from '@/features/not-found';
import { paths } from '@/shared/config/paths';
import { buildBreadcrumbsSchema, buildPracticeServiceSchema, usePageMeta } from '@/shared/seo';
import { Accordion } from '@/shared/ui/Accordion';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Card } from '@/shared/ui/Card';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';
import { getPracticeBySlug } from './data/practices';
import { PracticeCTA } from './ui/PracticeCTA';
import { PracticeRelatedPosts } from './ui/PracticeRelatedPosts';

export interface PracticePageProps {
  readonly slug: string;
}

export function PracticePage({ slug }: PracticePageProps) {
  const practice = getPracticeBySlug(slug);

  usePageMeta({
    title: practice?.title ?? 'Страница не найдена',
    description: practice?.lead ?? '',
    path: practice ? paths.practice(practice.slug) : '/404',
    noindex: !practice,
    jsonLd: practice
      ? [
          buildPracticeServiceSchema(practice.slug, practice.title, practice.lead),
          buildBreadcrumbsSchema([
            { name: 'Главная', path: paths.home },
            { name: 'Направления', path: '/#practices' },
            { name: practice.title, path: paths.practice(practice.slug) },
          ]),
        ]
      : undefined,
  });

  if (!practice) {
    return <NotFoundPage />;
  }

  const breadcrumbItems = [
    { label: 'Главная', to: paths.home },
    { label: 'Направления', to: '/#practices' },
    { label: practice.title },
  ];

  return (
    <>
      <Section tone="page" spacing="default" className="pb-8">
        <Container size="content" className="flex flex-col gap-8">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex flex-col gap-4 max-w-reading">
            <Heading level={1} size="h1" tone="default">
              {practice.title}
            </Heading>
            <Text size="body-lg" tone="muted" className="leading-relaxed">
              {practice.lead}
            </Text>
          </div>
        </Container>
      </Section>

      {/* Services block */}
      <Section tone="muted" spacing="default" aria-labelledby="services-title">
        <Container size="content">
          <Heading id="services-title" level={2} size="h2" className="mb-8">
            С чем я помогаю доверителям
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practice.services.map((service, idx) => (
              <Card key={idx} padding="md" className="bg-surface border-line-subtle">
                <Text size="body">{service}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Workflow */}
      <Section tone="page" spacing="default" aria-labelledby="workflow-title">
        <Container size="content">
          <div className="max-w-reading flex flex-col gap-6">
            <Heading id="workflow-title" level={2} size="h2">
              Как строится защита ваших интересов
            </Heading>
            <div className="flex flex-col gap-4">
              {practice.workflow.map((para, idx) => (
                <Text key={idx} size="body" tone="muted" className="leading-relaxed">
                  {para}
                </Text>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="muted" spacing="default" aria-labelledby="practice-faq-title">
        <Container size="content">
          <div className="flex flex-col gap-4 mb-8">
            <Heading id="practice-faq-title" level={2} size="h2">
              Частые вопросы по направлению
            </Heading>
          </div>
          <div className="max-w-narrow">
            <Accordion items={practice.faq} />
          </div>
        </Container>
      </Section>

      <PracticeCTA practiceTitle={practice.title} practiceSlug={practice.slug} />

      <PracticeRelatedPosts practiceSlug={practice.slug} />
    </>
  );
}
