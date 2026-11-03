import { HomePage } from '@/features/home';
import {
  buildAttorneySchema,
  buildCanonicalLink,
  buildMeta,
  buildPersonSchema,
  JsonLd,
} from '@/shared/seo';

export const meta = () =>
  buildMeta({
    title: 'Частная юридическая практика | Counsel Office',
    description:
      'Квалифицированная юридическая помощь адвоката по семейным, арбитражным и банкротным спорам. Индивидуальный аудит ситуации и защита в суде.',
    path: '/',
  });

export const links = () => buildCanonicalLink('/');

export default function HomeRoute() {
  const structuredData = [buildAttorneySchema(), buildPersonSchema()];

  return (
    <>
      <JsonLd data={structuredData} />
      <HomePage />
    </>
  );
}
