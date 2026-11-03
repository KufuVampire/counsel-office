import { NotFoundPage } from '@/features/not-found';
import { paths } from '@/shared/config/paths';
import { formatDate } from '@/shared/lib/format-date';
import { buildBlogPostSchema, buildBreadcrumbsSchema, usePageMeta } from '@/shared/seo';
import { Badge } from '@/shared/ui/Badge';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Card } from '@/shared/ui/Card';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { TextLink } from '@/shared/ui/TextLink';
import { POSTS } from './data/posts';
import { BlogCTA } from './ui/BlogCTA';
import { PostCard } from './ui/PostCard';
import { PostContent } from './ui/PostContent';

export interface BlogPostPageProps {
  readonly slug: string;
}

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const post = POSTS.find((p) => p.slug === slug);

  usePageMeta({
    title: post?.title ?? 'Статья не найдена',
    description: post?.description ?? '',
    path: post ? paths.post(post.slug) : '/404',
    type: 'article',
    noindex: !post,
    jsonLd: post
      ? [
          buildBlogPostSchema(post),
          buildBreadcrumbsSchema([
            { name: 'Главная', path: paths.home },
            { name: 'Блог', path: paths.blog },
            { name: post.title, path: paths.post(post.slug) },
          ]),
        ]
      : undefined,
  });

  if (!post) {
    return <NotFoundPage />;
  }

  const breadcrumbs = [
    { label: 'Главная', to: paths.home },
    { label: 'Блог', to: paths.blog },
    { label: post.title },
  ];

  const relatedPosts = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Section tone="page" spacing="default" className="pb-4">
        <Container size="reading" className="flex flex-col gap-8">
          <Breadcrumbs items={breadcrumbs} />

          <header className="flex flex-col gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge tone="neutral">{post.category}</Badge>
              <span className="font-sans text-small text-fg-subtle">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{' '}
                {post.readingMinutes} мин чтения
              </span>
            </div>

            <Heading level={1} size="h1" tone="default">
              {post.title}
            </Heading>
          </header>

          <PostContent content={post.content} />

          <BlogCTA practiceSlug={post.practiceSlug} />

          <Card
            padding="md"
            className="bg-surface-muted border-line-subtle text-caption text-fg-subtle leading-relaxed"
          >
            Информация в статье носит информационный характер, актуальна на момент публикации и не
            заменяет индивидуальную консультацию адвоката с учетом фактических обстоятельств вашего
            дела.
          </Card>
        </Container>
      </Section>

      {/* Read also section */}
      <Section tone="muted" spacing="default" aria-labelledby="read-also-title">
        <Container size="content">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <Heading id="read-also-title" level={2} size="h2">
              Читайте также
            </Heading>
            {post.practiceSlug && (
              <TextLink href={paths.practice(post.practiceSlug)}>
                Все о практике направления
              </TextLink>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <PostCard key={related.slug} post={related} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
