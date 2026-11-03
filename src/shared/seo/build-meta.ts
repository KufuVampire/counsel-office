import { siteConfig } from '@/shared/config/site';

export interface MetaOptions {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly type?: 'website' | 'article';
  readonly image?: string;
  readonly noindex?: boolean;
}

export function buildMeta({
  title,
  description,
  path,
  type = 'website',
  image,
  noindex = false,
}: MetaOptions) {
  const isIndexable = siteConfig.isIndexable && !noindex;
  const robots = isIndexable ? 'index, follow' : 'noindex, nofollow';

  const formattedTitle = title.includes(siteConfig.brandName)
    ? title
    : `${title} | ${siteConfig.brandName}`;

  const canonicalUrl = `${siteConfig.siteUrl.replace(/\/$/, '')}${path}`;
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${siteConfig.siteUrl.replace(/\/$/, '')}${image}`
    : `${siteConfig.siteUrl.replace(/\/$/, '')}/og-default.png`;

  return [
    { title: formattedTitle },
    { name: 'description', content: description },
    { name: 'robots', content: robots },
    { property: 'og:site_name', content: siteConfig.brandName },
    { property: 'og:title', content: formattedTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: imageUrl },
    { property: 'og:locale', content: 'ru_RU' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: formattedTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
  ];
}

export function buildCanonicalLink(path: string) {
  const canonicalUrl = `${siteConfig.siteUrl.replace(/\/$/, '')}${path}`;
  return [{ rel: 'canonical', href: canonicalUrl }];
}
