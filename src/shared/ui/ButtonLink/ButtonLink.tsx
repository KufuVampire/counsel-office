import type { ReactNode, Ref } from 'react';
import { Link, type LinkProps } from 'react-router';
import { type ButtonSize, type ButtonVariant, buttonStyles } from '@/shared/ui/Button';

export interface ButtonLinkProps extends LinkProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly fullWidth?: boolean;
  readonly iconStart?: ReactNode;
  readonly iconEnd?: ReactNode;
  readonly ref?: Ref<HTMLAnchorElement>;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconStart,
  iconEnd,
  className,
  children,
  ref,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link ref={ref} className={buttonStyles({ variant, size, fullWidth, className })} {...rest}>
      {iconStart}
      <span>{children}</span>
      {iconEnd}
    </Link>
  );
}
