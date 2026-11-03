import { Link } from 'react-router';
import { cn } from '@/shared/lib/cn';
import { paths } from '@/shared/config/paths';
import { formatDate } from '@/shared/lib/format-date';
import { Badge } from '@/shared/ui/Badge';
import { Card } from '@/shared/ui/Card';
import type { Post } from '../types';

export interface PostCardProps {
  readonly post: Post;
  readonly className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Card
      as="article"
      interactive
      padding="md"
      className={cn('flex flex-col justify-between h-full group', className)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge tone="neutral">{post.category}</Badge>
          <span className="text-caption font-sans text-fg-subtle">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{' '}
            {post.readingMinutes} мин
          </span>
        </div>

        <h3 className="font-serif text-h3 text-fg group-hover:text-primary transition-colors duration-fast">
          <Link
            to={paths.post(post.slug)}
            className="focus-ring rounded-sm focus:outline-none focus-visible:ring-2"
          >
            {post.title}
          </Link>
        </h3>

        <p className="font-sans text-small text-fg-muted line-clamp-3 leading-relaxed">
          {post.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-line-subtle">
        <span className="font-sans text-small font-medium text-link group-hover:text-link-hover transition-colors duration-fast">
          Читать статью
        </span>
      </div>
    </Card>
  );
}
