import { cn } from '@/shared/lib/cn';
import { type AvatarSize, avatarPixelSizes, avatarTextStyles } from './avatar.variants';

export interface AvatarProps {
  readonly src?: string;
  readonly name: string;
  readonly size?: AvatarSize;
  readonly className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return (parts[0]?.[0] ?? '').toUpperCase();
  const first = parts[0]?.[0] ?? '';
  const second = parts[1]?.[0] ?? '';
  return `${first}${second}`.toUpperCase();
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const pixel = avatarPixelSizes[size];
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={pixel}
        height={pixel}
        loading="lazy"
        className={cn('rounded-full object-cover shrink-0 border border-line-subtle', className)}
      />
    );
  }

  return (
    <div
      style={{ width: `${pixel}px`, height: `${pixel}px` }}
      aria-label={name}
      role="img"
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-surface-muted border border-line text-fg font-sans select-none shrink-0',
        avatarTextStyles[size],
        className,
      )}
    >
      <span>{initials}</span>
    </div>
  );
}
