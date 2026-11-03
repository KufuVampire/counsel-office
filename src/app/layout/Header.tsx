import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { cn } from '@/shared/lib/cn';
import { paths } from '@/shared/config/paths';
import { PRACTICE_CATALOG } from '@/shared/config/practice-catalog';
import { BurgerButton } from '@/shared/ui/BurgerButton';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { DropdownMenu } from '@/shared/ui/DropdownMenu';
import { Icon } from '@/shared/ui/Icon';
import { Logo } from '@/shared/ui/Logo';
import { MobileMenu } from './MobileMenu';

export interface HeaderProps {
  readonly onOpenConsultation: () => void;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  const practiceMenuItems = PRACTICE_CATALOG.map((item) => ({
    label: item.title,
    to: paths.practice(item.slug),
  }));

  return (
    <header className="sticky top-0 z-header w-full h-header bg-page border-b border-line-subtle">
      <Container size="content" className="h-full flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <nav aria-label="Основная навигация" className="hidden md:flex items-center gap-6">
          <DropdownMenu
            items={practiceMenuItems}
            trigger={({ 'aria-expanded': expanded, onClick, onKeyDown, isOpen }) => (
              <button
                type="button"
                aria-expanded={expanded}
                onClick={onClick}
                onKeyDown={onKeyDown}
                className={cn(
                  'inline-flex items-center gap-1.5 h-control-sm px-2 text-small font-sans rounded-md transition-colors duration-fast focus-ring',
                  isOpen
                    ? 'text-fg font-medium bg-hover'
                    : 'text-fg-muted hover:text-fg hover:bg-hover',
                )}
              >
                <span>Направления</span>
                <Icon
                  icon={ChevronDown}
                  size="sm"
                  className={cn('transition-transform duration-base', isOpen && 'rotate-180')}
                />
              </button>
            )}
          />

          <Link
            to={paths.blog}
            className="text-small font-sans text-fg-muted hover:text-fg transition-colors duration-fast focus-ring rounded-sm px-2 py-1"
          >
            Блог
          </Link>
          <Link
            to="/#about"
            className="text-small font-sans text-fg-muted hover:text-fg transition-colors duration-fast focus-ring rounded-sm px-2 py-1"
          >
            О специалисте
          </Link>
          <Link
            to="/#contacts"
            className="text-small font-sans text-fg-muted hover:text-fg transition-colors duration-fast focus-ring rounded-sm px-2 py-1"
          >
            Контакты
          </Link>
        </nav>

        {/* Action Button & Mobile Burger */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex"
          >
            Записаться
          </Button>

          <BurgerButton
            ref={burgerRef}
            open={mobileMenuOpen}
            controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden"
          />
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenConsultation={onOpenConsultation}
        triggerRef={burgerRef}
      />
    </header>
  );
}
