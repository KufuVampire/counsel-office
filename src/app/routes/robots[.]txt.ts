import { siteConfig } from '@/shared/config/site';

export function loader() {
  const isIndexable = siteConfig.isIndexable;
  const siteUrl = siteConfig.siteUrl.replace(/\/$/, '');

  const content = isIndexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
