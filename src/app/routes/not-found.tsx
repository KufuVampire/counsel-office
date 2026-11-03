import { NotFoundPage } from '@/features/not-found';
import { buildMeta } from '@/shared/seo';

export const meta = () =>
  buildMeta({
    title: 'Страница не найдена | Counsel Office',
    description:
      'Запрошенная страница не найдена на сайте частной юридической практики Counsel Office.',
    path: '/404',
    noindex: true,
  });

export default function NotFoundRoute() {
  return <NotFoundPage />;
}
