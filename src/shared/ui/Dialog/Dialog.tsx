import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { useScrollLock } from '@/shared/hooks/use-scroll-lock';
import { Heading } from '@/shared/ui/Heading';
import { IconButton } from '@/shared/ui/IconButton';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

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
  const titleId = useId();
  const descId = description ? `${titleId}-desc` : undefined;

  useScrollLock(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      triggerRef.current = (document.activeElement as HTMLElement) || null;
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }

    return () => {
      triggerRef.current?.focus();
    };
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
      aria-labelledby={titleId}
      aria-describedby={descId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className={cn(
        'fixed inset-0 m-auto z-modal bg-surface text-fg [&:not([open])]:hidden',
        'w-full h-dvh max-w-none rounded-none sm:h-auto sm:max-w-narrow sm:rounded-lg',
        'border border-line-subtle shadow-overlay flex flex-col',
        'backdrop:bg-overlay backdrop:backdrop-blur-xs',
        'open:animate-pop-in',
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-line-subtle px-6 py-4">
        <div>
          <Heading id={titleId} level={2} size="h3" className="leading-tight">
            {title}
          </Heading>
          {description && (
            <Text id={descId} size="small" tone="muted" className="mt-1">
              {description}
            </Text>
          )}
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
