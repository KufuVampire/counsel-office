import { POSTS } from '@/features/blog/data/posts';
import { PostCard } from '@/features/blog/ui/PostCard';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';

export interface PracticeRelatedPostsProps {
  readonly practiceSlug: string;
}

export function PracticeRelatedPosts({ practiceSlug }: PracticeRelatedPostsProps) {
  const relatedPosts = POSTS.filter((post) => post.practiceSlug === practiceSlug);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <Section tone="muted" spacing="default" aria-labelledby="related-posts-title">
      <Container size="content">
        <Heading id="related-posts-title" level={2} size="h2" className="mb-8">
          Статьи и материалы по теме
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
