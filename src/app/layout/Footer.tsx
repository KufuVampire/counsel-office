import { Link } from 'react-router';
import { paths } from '@/shared/config/paths';
import { PRACTICE_CATALOG } from '@/shared/config/practice-catalog';
import { siteConfig } from '@/shared/config/site';
import { Container } from '@/shared/ui/Container';
import { Divider } from '@/shared/ui/Divider';
import { Logo } from '@/shared/ui/Logo';
import { Text } from '@/shared/ui/Text';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface border-t border-line-subtle py-section-sm">
      <Container size="content" className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <Logo />
            <p className="font-sans text-small text-fg-muted leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Practice areas links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-small font-medium text-fg">Направления</h4>
            <ul className="flex flex-col gap-2 font-sans text-small text-fg-muted list-none p-0 m-0">
              {PRACTICE_CATALOG.map((practice) => (
                <li key={practice.slug}>
                  <Link
                    to={paths.practice(practice.slug)}
                    className="hover:text-fg transition-colors duration-fast"
                  >
                    {practice.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-small font-medium text-fg">Навигация</h4>
            <ul className="flex flex-col gap-2 font-sans text-small text-fg-muted list-none p-0 m-0">
              <li>
                <Link to={paths.blog} className="hover:text-fg transition-colors duration-fast">
                  Блог и статьи
                </Link>
              </li>
              <li>
                <Link to="/#about" className="hover:text-fg transition-colors duration-fast">
                  О специалисте
                </Link>
              </li>
              <li>
                <Link to="/#process" className="hover:text-fg transition-colors duration-fast">
                  Как мы работаем
                </Link>
              </li>
              <li>
                <Link to="/#contacts" className="hover:text-fg transition-colors duration-fast">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts info */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-small font-medium text-fg">Контакты</h4>
            <div className="flex flex-col gap-2 font-sans text-small text-fg-muted">
              <a
                href={`tel:${siteConfig.phoneClean}`}
                className="hover:text-fg transition-colors duration-fast"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-fg transition-colors duration-fast"
              >
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg transition-colors duration-fast"
              >
                {siteConfig.telegram}
              </a>
              <p className="text-caption text-fg-subtle mt-1">
                {siteConfig.address}
                <br />
                {siteConfig.workingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer & legal links */}
        <div>
          <Divider tone="subtle" className="mb-8" />
          <div className="flex flex-col gap-4">
            <Text size="caption" tone="subtle" className="leading-relaxed">
              {siteConfig.disclaimer}
            </Text>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans text-caption text-fg-subtle">
              <p>© {currentYear} Counsel Office. Все права защищены.</p>
              <div className="flex items-center gap-4">
                <Link to={paths.privacy} className="hover:text-fg transition-colors duration-fast">
                  Политика конфиденциальности
                </Link>
                <Link to={paths.terms} className="hover:text-fg transition-colors duration-fast">
                  Пользовательское соглашение
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
