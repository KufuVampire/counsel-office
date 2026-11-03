import { useParams } from 'react-router';
import { getPracticeBySlug, PracticePage } from '@/features/practice';
import {
  buildBreadcrumbsSchema,
  buildMeta,
  buildPracticeServiceSchema,
  JsonLd,
} from '@/shared/seo';

export const meta = ({ params }: { readonly params: { readonly slug?: string } }) => {
  const slug = params.slug ?? '';
  const practice = getPracticeBySlug(slug);

  if (!practice) {
    return buildMeta({
      title: 'Направление не найдено | Counsel Office',
      description: 'Запрошенное направление юридической практики не найдено.',
      path: `/practice/${slug}`,
      noindex: true,
    });
  }

  return buildMeta({
    title: `${practice.title} | Counsel Office`,
    description: practice.lead,
    path: `/practice/${practice.slug}`,
  });
};

export default function PracticeRoute() {
  const params = useParams();
  const slug = params.slug ?? '';
  const practice = getPracticeBySlug(slug);

  if (!practice) {
    return <PracticePage slug={slug} />;
  }

  const structuredData = [
    buildPracticeServiceSchema(practice.slug, practice.title, practice.lead),
    buildBreadcrumbsSchema([
      { name: 'Главная', path: '/' },
      { name: 'Направления', path: '/#practices' },
      { name: practice.title, path: `/practice/${practice.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <PracticePage slug={slug} />
    </>
  );
}
