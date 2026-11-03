import { paths } from '@/shared/config/paths';
import { usePageMeta } from '@/shared/seo';
import { ButtonLink } from '@/shared/ui/ButtonLink';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';

export function NotFoundPage() {
  usePageMeta({
    title: 'Страница не найдена',
    description: 'Запрошенная страница не существует',
    path: '/404',
    noindex: true,
  });

  return (
    <Section tone="page" spacing="default" className="min-h-[70vh] flex items-center">
      <Container size="reading" className="text-center flex flex-col items-center gap-6">
        <span className="font-serif text-display font-light text-fg-subtle select-none">404</span>
        <Heading level={1} size="h1" tone="default">
          Страница не найдена
        </Heading>
        <Text size="body-lg" tone="muted" className="max-w-reading">
          Запрошенный адрес не существует, был удален или перенесен. Перейдите на главную страницу
          или в каталог направлений.
        </Text>
        <div className="pt-2">
          <ButtonLink to={paths.home} variant="primary" size="lg">
            Вернуться на главную
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
