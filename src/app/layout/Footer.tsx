import { Link } from 'react-router';
import { paths } from '@/shared/config/paths';
import { PRACTICE_CATALOG } from '@/shared/config/practice-catalog';
import { siteConfig } from '@/shared/config/site';
import { Container } from '@/shared/ui/Container';
import { Logo } from '@/shared/ui/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface border-t border-line-subtle py-section-sm">
      <Container size="content" className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <Logo />
            <p className="font-sans text-small text-fg-muted leading-relaxed">
              Квалифицированная правовая поддержка доверителей в сложных жизненных и деловых
              ситуациях.
            </p>
          </div>

          {/* Practice areas */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-small font-semibold text-fg">Направления</h3>
            <ul className="flex flex-col gap-2 font-sans text-small text-fg-muted">
              {PRACTICE_CATALOG.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={paths.practice(item.slug)}
                    className="hover:text-fg transition-colors duration-fast"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-small font-semibold text-fg">Навигация</h3>
            <ul className="flex flex-col gap-2 font-sans text-small text-fg-muted">
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

          {/* Contacts */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-small font-semibold text-fg">Контакты</h3>
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
                Telegram: {siteConfig.telegram}
              </a>
              <p className="mt-1 text-caption text-fg-subtle">
                {siteConfig.address}
                <br />
                {siteConfig.workingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer & legal links */}
        <div className="pt-8 border-t border-line-subtle flex flex-col gap-4">
          <p className="font-sans text-caption text-fg-subtle leading-relaxed">
            {siteConfig.disclaimer}
          </p>

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
      </Container>
    </footer>
  );
}
