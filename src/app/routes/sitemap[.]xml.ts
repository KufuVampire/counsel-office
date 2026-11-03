import { siteConfig } from '@/shared/config/site';

const pages = [
  { path: '/', lastmod: '2026-03-01' },
  { path: '/blog', lastmod: '2026-02-15' },
  { path: '/privacy', lastmod: '2026-02-01' },
  { path: '/terms', lastmod: '2026-02-01' },
  { path: '/practice/semejnoe-pravo', lastmod: '2026-03-01' },
  { path: '/practice/arbitrazh', lastmod: '2026-03-01' },
  { path: '/practice/bankrotstvo', lastmod: '2026-03-01' },
  { path: '/blog/podgotovka-k-pervoj-konsultacii', lastmod: '2026-02-15' },
  { path: '/blog/razdel-imushchestva-suprugov', lastmod: '2026-01-28' },
  { path: '/blog/vzyskanie-debitorskoj-zadolzhennosti', lastmod: '2026-01-14' },
  { path: '/blog/procedura-bankrotstva-fizicheskih-lic', lastmod: '2025-12-10' },
];

export function loader() {
  const isIndexable = siteConfig.isIndexable;
  const siteUrl = siteConfig.siteUrl.replace(/\/$/, '');

  if (!isIndexable) {
    const disabledXml =
      '<?xml version="1.0" encoding="UTF-8"?>\n<!-- Sitemap disabled while mock data is active (VITE_INDEXABLE=false) -->\n';
    return new Response(disabledXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  const urls = pages
    .map(
      (p) =>
        `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
