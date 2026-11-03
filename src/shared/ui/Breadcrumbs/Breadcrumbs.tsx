import { Link } from 'react-router';
import { cn } from '@/shared/lib/cn';

export interface BreadcrumbItem {
  readonly label: string;
  readonly to?: string;
}

export interface BreadcrumbsProps {
  readonly items: readonly BreadcrumbItem[];
  readonly className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Навигационная цепочка" className={cn('w-full', className)}>
      <ol className="flex flex-wrap items-center gap-2 text-small font-sans text-fg-muted">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={item.label} className="inline-flex items-center gap-2">
              {idx > 0 && (
                <span aria-hidden="true" className="text-line-strong select-none">
                  /
                </span>
              )}
              {isLast || !item.to ? (
                <span aria-current="page" className="text-fg font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-link transition-colors duration-fast hover:text-link-hover focus-ring rounded-sm"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
