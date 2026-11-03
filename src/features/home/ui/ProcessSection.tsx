import { Card } from '@/shared/ui/Card';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Заявка на консультацию',
    description:
      'Вы оставляете заявку на сайте или по телефону. Кратко описываете суть возникшего вопроса и удобный формат связи.',
  },
  {
    number: '02',
    title: 'Первичная консультация',
    description:
      'Встреча в офисе или защищенный видеозвонок. Обсуждаем фактические обстоятельства, изучаем имеющиеся документы и определяем цели.',
  },
  {
    number: '03',
    title: 'Оценка ситуации и стратегия',
    description:
      'Правовой анализ рисков, изучение актуальной судебной практики и подготовка пошагового плана защиты ваших интересов.',
  },
  {
    number: '04',
    title: 'Договор и ведение дела',
    description:
      'Заключение официального соглашения об оказании юридической помощи. Полное сопровождение на всех стадиях процесса.',
  },
] as const;

export function ProcessSection() {
  return (
    <Section id="process" tone="page" spacing="default" aria-labelledby="process-title">
      <Container size="content">
        <div className="flex flex-col gap-4 mb-12">
          <Heading id="process-title" level={2} size="h2">
            Как строится работа
          </Heading>
          <Text size="body-lg" tone="muted" className="max-w-reading">
            Понятный и прозрачный процесс взаимодействия — от первого обращения до итогового
            разрешения спора.
          </Text>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
          {PROCESS_STEPS.map((step) => (
            <li key={step.number}>
              <Card padding="md" className="flex flex-col justify-between h-full bg-surface">
                <div>
                  <span className="font-serif text-h2 font-normal text-line-strong block mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-h4 text-fg mb-2">{step.title}</h3>
                  <p className="font-sans text-small text-fg-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
