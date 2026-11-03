import { TermsPage } from '@/features/legal-pages';
import { buildCanonicalLink, buildMeta } from '@/shared/seo';

export const meta = () =>
  buildMeta({
    title: 'Пользовательское соглашение | Counsel Office',
    description:
      'Условия использования материалов и сервисов сайта частной юридической практики Counsel Office. Ограничение ответственности.',
    path: '/terms',
  });

export const links = () => buildCanonicalLink('/terms');

export default function TermsRoute() {
  return <TermsPage />;
}
