import type { Config } from '@react-router/dev/config';
import { PRACTICE_CATALOG } from './src/shared/config/practice-catalog.ts';

const BLOG_SLUGS = [
  'podgotovka-k-pervoj-konsultacii',
  'razdel-imushchestva-suprugov',
  'vzyskanie-debitorskoj-zadolzhennosti',
  'procedura-bankrotstva-fizicheskih-lic',
];

export default {
  appDirectory: 'src/app',
  ssr: false,
  async prerender() {
    return [
      '/',
      '/blog',
      '/privacy',
      '/terms',
      '/robots.txt',
      '/sitemap.xml',
      ...PRACTICE_CATALOG.map((item) => `/practice/${item.slug}`),
      ...BLOG_SLUGS.map((slug) => `/blog/${slug}`),
    ];
  },
} satisfies Config;
