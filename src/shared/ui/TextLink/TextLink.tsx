import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '@/shared/lib/cn';

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly href: string;
  readonly external?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

export function TextLink({ href, external, className, children, ...rest }: TextLinkProps) {
  const isExternal =
    external ?? (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'));
  const linkClasses = cn(
    'text-link underline underline-offset-4 decoration-line transition-colors duration-fast',
    'hover:text-link-hover hover:decoration-line-strong focus-ring rounded-sm',
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={linkClasses}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={linkClasses} {...rest}>
      {children}
    </Link>
  );
}
