export const paths = {
  home: '/',
  practice: (slug: string) => `/practice/${slug}`,
  blog: '/blog',
  post: (slug: string) => `/blog/${slug}`,
  privacy: '/privacy',
  terms: '/terms',
} as const;
