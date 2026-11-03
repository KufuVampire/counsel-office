import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { paths } from '@/shared/config/paths';
import { PRACTICE_CATALOG } from '@/shared/config/practice-catalog';
import { BurgerButton } from '@/shared/ui/BurgerButton';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { DropdownMenu } from '@/shared/ui/DropdownMenu';
import { Logo } from '@/shared/ui/Logo';
import { NavLinkItem } from '@/shared/ui/NavLinkItem';
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
          <DropdownMenu label="Направления" items={practiceMenuItems} />

          <NavLinkItem to={paths.blog} className="h-control-sm px-2 py-0 text-small">
            Блог
          </NavLinkItem>
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
