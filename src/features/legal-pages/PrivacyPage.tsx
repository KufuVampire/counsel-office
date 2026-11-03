import { paths } from '@/shared/config/paths';
import { siteConfig } from '@/shared/config/site';
import { Alert } from '@/shared/ui/Alert';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Prose } from '@/shared/ui/Prose';
import { Section } from '@/shared/ui/Section';

export function PrivacyPage() {
  const breadcrumbs = [
    { label: 'Главная', to: paths.home },
    { label: 'Политика конфиденциальности' },
  ];

  return (
    <Section tone="page" spacing="default">
      <Container size="reading" className="flex flex-col gap-8">
        <Breadcrumbs items={breadcrumbs} />

        <header className="flex flex-col gap-4">
          <Heading level={1} size="h1" tone="default">
            Политика конфиденциальности
          </Heading>
          <span className="font-sans text-caption text-fg-subtle">
            Редакция от 1 февраля 2026 года
          </span>
        </header>

        <Alert tone="warning" title="Внимание: демонстрационный шаблон" role="status">
          Данный текст является моковым шаблоном. Перед публикацией сайта в промышленную
          эксплуатацию обязательно проведите аудит политики у юриста.
        </Alert>

        <Prose>
          <p>
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных
            данных пользователей сайта адвокатской практики {siteConfig.brandName}.
          </p>

          <h2>1. Общие положения</h2>
          <p>
            Оставляя заявку на консультацию на сайте, пользователь подтверждает свое согласие на
            обработку предоставленных персональных данных в соответствии с настоящими правилами и
            применимым законодательством.
          </p>

          <h2>2. Состав собираемых данных</h2>
          <p>В рамках формы записи на консультацию обрабатываются следующие сведения:</p>
          <ul>
            <li>Имя доверителя;</li>
            <li>Контактный номер телефона;</li>
            <li>Выбранный способ связи (телефон, мессенджер, email);</li>
            <li>Краткое описание вопроса, предоставленное добровольно.</li>
          </ul>

          <h2>3. Цели обработки данных</h2>
          <p>
            Персональные данные собираются исключительно для обратной связи с доверителем,
            согласования времени и формата первичной консультации и не передаются третьим лицам.
          </p>

          <h2>4. Защита информации и адвокатская тайна</h2>
          <p>
            Все сведения, ставшие известными адвокату в связи с обращением гражданина или
            юридического лица, охраняются институтом адвокатской тайны.
          </p>

          <h2>5. Контакты по вопросам персональных данных</h2>
          <p>
            По всем вопросам, связанным с обработкой ваших данных, вы можете обратиться по адресу:{' '}
            {siteConfig.email}.
          </p>
        </Prose>
      </Container>
    </Section>
  );
}
