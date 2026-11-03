import type { ReactNode } from 'react';
import { NavLink, type NavLinkProps } from 'react-router';
import { cn } from '@/shared/lib/cn';

export interface NavLinkItemProps extends Omit<NavLinkProps, 'children'> {
  readonly to: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export function NavLinkItem({ to, className, children, ...rest }: NavLinkItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'inline-flex h-control-sm items-center rounded-md px-3 text-small font-sans transition-colors duration-fast focus-ring',
          isActive
            ? 'text-fg font-medium bg-selected'
            : 'text-fg-muted hover:text-fg hover:bg-hover',
          className,
        )
      }
      {...rest}
    >
      {children}
    </NavLink>
  );
}
