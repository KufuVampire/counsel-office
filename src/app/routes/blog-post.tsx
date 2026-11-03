import { useParams } from 'react-router';
import type { Route } from './+types/blog-post';
import { BlogPostPage, POSTS } from '@/features/blog';
import {
  buildBlogPostSchema,
  buildBreadcrumbsSchema,
  buildCanonicalLink,
  buildMeta,
  JsonLd,
} from '@/shared/seo';

export const meta: Route.MetaFunction = ({ params }) => {
  const slug = params.slug ?? '';
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return buildMeta({
      title: 'Статья не найдена | Counsel Office',
      description: 'Запрошенная статья юридического блога не найдена.',
      path: `/blog/${slug}`,
      noindex: true,
    });
  }

  return buildMeta({
    title: `${post.title} | Counsel Office`,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
  });
};

export default function BlogPostRoute() {
  const params = useParams();
  const slug = params.slug ?? '';
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <BlogPostPage slug={slug} />;
  }

  const structuredData = [
    buildBlogPostSchema(post),
    buildBreadcrumbsSchema([
      { name: 'Главная', path: '/' },
      { name: 'Блог', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <>
      <link rel="canonical" href={buildCanonicalLink(`/blog/${slug}`)[0]?.href} />
      <JsonLd data={structuredData} />
      <BlogPostPage slug={slug} />
    </>
  );
}
