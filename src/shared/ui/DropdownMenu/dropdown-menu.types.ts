import type { KeyboardEvent, ReactNode, Ref } from 'react';

export interface DropdownMenuItem {
  readonly label: string;
  readonly to?: string;
  readonly onSelect?: () => void;
}

export interface DropdownMenuProps {
  readonly trigger: (props: {
    readonly ref?: Ref<HTMLButtonElement>;
    readonly 'aria-haspopup': 'menu';
    readonly 'aria-expanded': boolean;
    readonly onClick: () => void;
    readonly onKeyDown: (e: KeyboardEvent) => void;
    readonly isOpen: boolean;
  }) => ReactNode;
  readonly items: readonly DropdownMenuItem[];
  readonly align?: 'left' | 'right';
  readonly className?: string;
}
