import { siteConfig } from '@/shared/config/site';
import { specialistConfig } from '@/shared/config/specialist';

export function buildAttorneySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    '@id': `${siteConfig.siteUrl}/#attorney`,
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneClean,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Примерная, д. 1, офис 00',
      addressLocality: 'Город',
      addressCountry: 'RU',
    },
    openingHours: 'Mo-Fr 10:00-19:00',
    areaServed: 'Российская Федерация',
    priceRange: '$$',
  };
}

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.siteUrl}/#specialist`,
    name: specialistConfig.fullName,
    jobTitle: specialistConfig.title,
    worksFor: {
      '@id': `${siteConfig.siteUrl}/#attorney`,
    },
    alumniOf: specialistConfig.education,
  };
}

export function buildPracticeServiceSchema(slug: string, title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    url: `${siteConfig.siteUrl}/practice/${slug}`,
    provider: {
      '@id': `${siteConfig.siteUrl}/#attorney`,
    },
  };
}

export function buildBreadcrumbsSchema(
  items: readonly { readonly name: string; readonly path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.path}`,
    })),
  };
}

export function buildBlogCollectionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Блог и статьи | ${siteConfig.brandName}`,
    url: `${siteConfig.siteUrl}/blog`,
    description: 'Статьи, аналитика судебной практики и правовые рекомендации.',
  };
}

export function buildBlogPostSchema(post: {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly publishedAt: string;
  readonly updatedAt: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.siteUrl}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@id': `${siteConfig.siteUrl}/#specialist`,
    },
    publisher: {
      '@id': `${siteConfig.siteUrl}/#attorney`,
    },
  };
}
