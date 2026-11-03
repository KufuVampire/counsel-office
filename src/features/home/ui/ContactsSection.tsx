import { ConsultationForm } from '@/features/consultation';
import { siteConfig } from '@/shared/config/site';
import { Card } from '@/shared/ui/Card';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';

export function ContactsSection() {
  return (
    <Section id="contacts" tone="page" spacing="default" aria-labelledby="contacts-title">
      <Container size="content">
        <div className="flex flex-col gap-4 mb-12">
          <Heading id="contacts-title" level={2} size="h2">
            Контакты и приём
          </Heading>
          <Text size="body-lg" tone="muted" className="max-w-reading">
            Свяжитесь удобным способом или оставьте заявку на первичную встречу в офисе либо онлайн.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card padding="md" className="bg-surface border-line-subtle flex flex-col gap-4">
              <div>
                <span className="font-sans text-caption text-fg-subtle uppercase tracking-wide">
                  Телефон
                </span>
                <p className="mt-1">
                  <a
                    href={`tel:${siteConfig.phoneClean}`}
                    className="font-serif text-h3 text-fg hover:text-primary transition-colors duration-fast"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
              </div>

              <div className="pt-3 border-t border-line-subtle">
                <span className="font-sans text-caption text-fg-subtle uppercase tracking-wide">
                  Электронная почта
                </span>
                <p className="mt-1 font-sans text-body">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-link hover:text-link-hover transition-colors duration-fast"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>

              <div className="pt-3 border-t border-line-subtle">
                <span className="font-sans text-caption text-fg-subtle uppercase tracking-wide">
                  Мессенджер Telegram
                </span>
                <p className="mt-1 font-sans text-body">
                  <a
                    href={siteConfig.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:text-link-hover transition-colors duration-fast"
                  >
                    {siteConfig.telegram}
                  </a>
                </p>
              </div>

              <div className="pt-3 border-t border-line-subtle">
                <span className="font-sans text-caption text-fg-subtle uppercase tracking-wide">
                  Адрес офиса
                </span>
                <p className="mt-1 font-sans text-body text-fg">{siteConfig.address}</p>
              </div>

              <div className="pt-3 border-t border-line-subtle">
                <span className="font-sans text-caption text-fg-subtle uppercase tracking-wide">
                  График работы
                </span>
                <p className="mt-1 font-sans text-body text-fg">
                  {siteConfig.workingHours} ({siteConfig.workingFormat})
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column: Inline Consultation Form */}
          <div className="lg:col-span-7">
            <Card padding="lg" className="bg-surface border-line-subtle">
              <h3 className="font-serif text-h3 text-fg mb-2">Запись на консультацию</h3>
              <p className="font-sans text-small text-fg-muted mb-6 leading-relaxed">
                Заполните форму, и мы свяжемся с вами в течение рабочего дня для согласования
                времени встречи.
              </p>
              <ConsultationForm />
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
