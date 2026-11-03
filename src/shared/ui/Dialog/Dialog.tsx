import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { useScrollLock } from '@/shared/hooks/use-scroll-lock';
import { IconButton } from '@/shared/ui/IconButton';
import { Icon } from '@/shared/ui/Icon';

export interface DialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly description?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Dialog({ open, onClose, title, description, className, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useScrollLock(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      triggerRef.current = (document.activeElement as HTMLElement) || null;
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      triggerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onDialogClick = (event: globalThis.MouseEvent) => {
      if (event.target === dialog) {
        onClose();
      }
    };

    dialog.addEventListener('click', onDialogClick);

    return () => {
      dialog.removeEventListener('click', onDialogClick);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className={cn(
        'fixed inset-0 m-auto z-modal bg-surface text-fg',
        'w-full h-dvh max-w-none rounded-none sm:h-auto sm:max-w-narrow sm:rounded-lg',
        'border border-line-subtle shadow-overlay flex flex-col',
        'backdrop:bg-overlay backdrop:backdrop-blur-xs',
        'open:animate-pop-in',
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-line-subtle px-6 py-4">
        <div>
          <h2 className="font-serif text-h3 text-fg leading-tight">{title}</h2>
          {description && <p className="mt-1 font-sans text-small text-fg-muted">{description}</p>}
        </div>
        <IconButton
          label="Закрыть окно"
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="shrink-0 ml-4"
        >
          <Icon icon={X} size="md" />
        </IconButton>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom p-6">{children}</div>
    </dialog>
  );
}
