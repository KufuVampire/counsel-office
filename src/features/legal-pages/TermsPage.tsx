import { paths } from '@/shared/config/paths';
import { siteConfig } from '@/shared/config/site';
import { Alert } from '@/shared/ui/Alert';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Prose } from '@/shared/ui/Prose';
import { Section } from '@/shared/ui/Section';

export function TermsPage() {
  const breadcrumbs = [
    { label: 'Главная', to: paths.home },
    { label: 'Пользовательское соглашение' },
  ];

  return (
    <Section tone="page" spacing="default">
      <Container size="reading" className="flex flex-col gap-8">
        <Breadcrumbs items={breadcrumbs} />

        <header className="flex flex-col gap-4">
          <Heading level={1} size="h1" tone="default">
            Пользовательское соглашение
          </Heading>
          <span className="font-sans text-caption text-fg-subtle">
            Редакция от 1 февраля 2026 года
          </span>
        </header>

        <Alert tone="warning" title="Внимание: демонстрационный шаблон" role="status">
          Данный текст является моковым шаблоном. Перед публикацией сайта в промышленную
          эксплуатацию обязательно проведите аудит соглашения у юриста.
        </Alert>

        <Prose>
          <p>
            Настоящее Соглашение регулирует условия использования информационных материалов сайта{' '}
            {siteConfig.brandName}.
          </p>

          <h2>1. Статус материалов сайта</h2>
          <p>
            Все материалы, статьи, обзоры и ответы на частые вопросы, размещенные на сайте, носят
            исключительно информационно-ознакомительный характер и не являются публичной офертой
            либо индивидуальной юридической консультацией.
          </p>

          <h2>2. Порядок оказания юридической помощи</h2>
          <p>
            Профессиональная юридическая помощь оказывается адвокатом исключительно на основании
            письменного соглашения, заключаемого в индивидуальном порядке после детального изучения
            обстоятельств дела.
          </p>

          <h2>3. Интеллектуальная собственность</h2>
          <p>
            Текстовые материалы сайта, структура изложения и визуальные элементы являются объектами
            интеллектуальной собственности. Полное или частичное копирование допускается только с
            указанием активной ссылки на первоисточник.
          </p>

          <h2>4. Ограничение ответственности</h2>
          <p>
            Адвокат не несет ответственности за решения и действия, предпринятые пользователем
            самостоятельно на основе общих материалов сайта без прохождения персональной
            консультации.
          </p>
        </Prose>
      </Container>
    </Section>
  );
}
