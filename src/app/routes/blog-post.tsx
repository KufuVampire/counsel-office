import { useParams } from 'react-router';
import { BlogPostPage, POSTS } from '@/features/blog';
import { buildBlogPostSchema, buildBreadcrumbsSchema, buildMeta, JsonLd } from '@/shared/seo';

export const meta = ({ params }: { readonly params: { readonly slug?: string } }) => {
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
      <JsonLd data={structuredData} />
      <BlogPostPage slug={slug} />
    </>
  );
}
