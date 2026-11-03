import type { ButtonSize, ButtonVariant } from '@/shared/ui/Button';

export interface DropdownMenuItem {
  readonly label: string;
  readonly to?: string;
  readonly onSelect?: () => void;
}

export interface DropdownMenuProps {
  readonly label: string;
  readonly items: readonly DropdownMenuItem[];
  readonly buttonVariant?: ButtonVariant;
  readonly buttonSize?: ButtonSize;
  readonly buttonClassName?: string;
  readonly align?: 'left' | 'right';
  readonly className?: string;
}
