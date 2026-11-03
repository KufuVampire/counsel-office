const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const clientBuildDir = path.join(rootDir, 'build', 'client');

const siteUrl = (process.env.VITE_SITE_URL || 'https://counsel-office.example').replace(/\/$/, '');
const isIndexable = process.env.VITE_INDEXABLE === 'true';

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

function generateRobots() {
  if (isIndexable) {
    return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  }
  return `User-agent: *\nDisallow: /\n`;
}

function generateSitemap() {
  if (!isIndexable) {
    return '<?xml version="1.0" encoding="UTF-8"?>\n<!-- Sitemap disabled while mock data is active (VITE_INDEXABLE=false) -->\n';
  }

  const urls = pages
    .map(
      (p) =>
        `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const robotsContent = generateRobots();
const sitemapContent = generateSitemap();

function writeTo(dir) {
  if (fs.existsSync(dir)) {
    fs.writeFileSync(path.join(dir, 'robots.txt'), robotsContent, 'utf8');
    fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemapContent, 'utf8');
    console.log(`[SEO] Generated robots.txt and sitemap.xml in ${dir}`);
  }
}

writeTo(publicDir);
writeTo(clientBuildDir);
