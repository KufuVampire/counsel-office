import { POSTS } from '@/features/blog/data/posts';
import { PostCard } from '@/features/blog/ui/PostCard';
import { paths } from '@/shared/config/paths';
import { ButtonLink } from '@/shared/ui/ButtonLink';
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

          <ButtonLink
            to={paths.blog}
            variant="secondary"
            size="md"
            className="self-start sm:self-auto shrink-0"
          >
            Все статьи
          </ButtonLink>
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
