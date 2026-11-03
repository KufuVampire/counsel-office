import { Link } from 'react-router';
import { POSTS } from '@/features/blog/data/posts';
import { PostCard } from '@/features/blog/ui/PostCard';
import { paths } from '@/shared/config/paths';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';

export function BlogPreviewSection() {
  const latestPosts = POSTS.slice(0, 3);

  return (
    <Section id="blog-preview" tone="muted" spacing="default" aria-labelledby="blog-preview-title">
      <Container size="content">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col gap-3">
            <Heading id="blog-preview-title" level={2} size="h2">
              Статьи и материалы
            </Heading>
            <Text size="body-lg" tone="muted" className="max-w-reading">
              Аналитические разборы судебной практики и практические рекомендации по правовым
              вопросам.
            </Text>
          </div>

          <Link
            to={paths.blog}
            className="inline-flex h-control-md items-center justify-center font-sans font-medium rounded-md px-4 text-small transition-colors duration-fast bg-surface text-fg hover:bg-hover border border-line focus-ring self-start sm:self-auto shrink-0"
          >
            Все статьи
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
