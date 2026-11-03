import { BlogPage } from '@/features/blog';
import { buildBlogCollectionSchema, buildCanonicalLink, buildMeta, JsonLd } from '@/shared/seo';

export const meta = () =>
  buildMeta({
    title: 'Блог и публикации | Counsel Office',
    description:
      'Экспертные статьи адвоката по семейному праву, арбитражным спорам и банкротству. Разборы судебной практики и практические рекомендации.',
    path: '/blog',
  });

export const links = () => buildCanonicalLink('/blog');

export default function BlogRoute() {
  return (
    <>
      <JsonLd data={buildBlogCollectionSchema()} />
      <BlogPage />
    </>
  );
}
