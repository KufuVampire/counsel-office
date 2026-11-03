import { PrivacyPage } from '@/features/legal-pages';
import { buildCanonicalLink, buildMeta } from '@/shared/seo';

export const meta = () =>
  buildMeta({
    title: 'Политика конфиденциальности | Counsel Office',
    description:
      'Политика обработки и защиты персональных данных пользователей сайта частной юридической практики Counsel Office.',
    path: '/privacy',
  });

export const links = () => buildCanonicalLink('/privacy');

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
