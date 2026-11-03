import { Link } from 'react-router';
import { cn } from '@/shared/lib/cn';
import { paths } from '@/shared/config/paths';
import { siteConfig } from '@/shared/config/site';
import { SealMark } from '@/shared/ui/SealMark';

export interface LogoProps {
  readonly className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to={paths.home}
      aria-label={`${siteConfig.brandName} — на главную страницу`}
      className={cn('group inline-flex items-center gap-3 rounded-md focus-ring py-1', className)}
    >
      <SealMark
        size="sm"
        tone="oxblood"
        className="transition-transform duration-base group-hover:scale-105"
      />
      <div className="flex flex-col">
        <span className="font-serif text-h4 leading-tight font-medium text-fg">
          {siteConfig.brandName}
        </span>
        <span className="font-sans text-caption text-fg-muted">{siteConfig.tagline}</span>
      </div>
    </Link>
  );
}
