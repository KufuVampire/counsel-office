import { useEffect, useRef, type RefObject } from 'react';
import { Link, useLocation } from 'react-router';
import { cn } from '@/shared/lib/cn';
import { paths } from '@/shared/config/paths';
import { PRACTICE_CATALOG } from '@/shared/config/practice-catalog';
import { useClickOutside } from '@/shared/hooks/use-click-outside';
import { useEscapeKey } from '@/shared/hooks/use-escape-key';
import { usePresence } from '@/shared/hooks/use-presence';
import { Button } from '@/shared/ui/Button';

export interface MobileMenuProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onOpenConsultation: () => void;
  readonly triggerRef?: RefObject<HTMLElement | null>;
}

export function MobileMenu({ open, onClose, onOpenConsultation, triggerRef }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { isMounted, state, onAnimationEnd } = usePresence(open);

  useClickOutside(menuRef, onClose, open, triggerRef);
  useEscapeKey(onClose, open);

  // Закрытие при смене маршрута
  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!isMounted) return null;

  return (
    <div
      ref={menuRef}
      id="mobile-navigation"
      data-state={state}
      onAnimationEnd={onAnimationEnd}
      className={cn(
        'absolute top-full left-0 w-full z-dropdown bg-page border-b border-line-subtle shadow-overlay',
        'p-gutter flex flex-col gap-6 md:hidden max-h-[85dvh] overflow-y-auto scrollbar-custom',
        state === 'open' ? 'animate-sheet-in' : 'animate-sheet-out',
      )}
    >
      <nav aria-label="Мобильная навигация" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-caption font-medium text-fg-subtle">
            Направления работы
          </span>
          <div className="flex flex-col pl-2 border-l border-line-subtle gap-1">
            {PRACTICE_CATALOG.map((practice) => (
              <Link
                key={practice.slug}
                to={paths.practice(practice.slug)}
                onClick={onClose}
                className="py-2 text-small font-sans text-fg hover:text-primary transition-colors"
              >
                {practice.title}
              </Link>
            ))}
          </div>
        </div>

        <Link
          to={paths.blog}
          onClick={onClose}
          className="py-1 text-body font-sans text-fg hover:text-primary transition-colors"
        >
          Блог
        </Link>
        <Link
          to="/#about"
          onClick={onClose}
          className="py-1 text-body font-sans text-fg hover:text-primary transition-colors"
        >
          О специалисте
        </Link>
        <Link
          to="/#contacts"
          onClick={onClose}
          className="py-1 text-body font-sans text-fg hover:text-primary transition-colors"
        >
          Контакты
        </Link>
      </nav>

      <div className="pt-2 border-t border-line-subtle">
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={() => {
            onClose();
            onOpenConsultation();
          }}
        >
          Записаться на консультацию
        </Button>
      </div>
    </div>
  );
}
