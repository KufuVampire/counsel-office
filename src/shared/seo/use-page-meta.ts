import { useEffect } from 'react';
import { siteConfig } from '@/shared/config/site';

export interface PageMetaOptions {
  readonly title: string;
  readonly description?: string;
  readonly path?: string;
  readonly type?: 'website' | 'article';
  readonly image?: string;
  readonly noindex?: boolean;
  readonly jsonLd?: Record<string, unknown> | readonly Record<string, unknown>[];
}

export function usePageMeta({
  title,
  description,
  path = '',
  type = 'website',
  image,
  noindex = false,
  jsonLd,
}: PageMetaOptions) {
  useEffect(() => {
    const formattedTitle = title.includes(siteConfig.brandName)
      ? title
      : `${title} | ${siteConfig.brandName}`;
    document.title = formattedTitle;

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const isIndexable = siteConfig.isIndexable && !noindex;
    setMeta('name', 'robots', isIndexable ? 'index, follow' : 'noindex, nofollow');

    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }

    const canonicalUrl = `${siteConfig.siteUrl.replace(/\/$/, '')}${path}`;
    const imageUrl = image
      ? image.startsWith('http')
        ? image
        : `${siteConfig.siteUrl.replace(/\/$/, '')}${image}`
      : `${siteConfig.siteUrl.replace(/\/$/, '')}/og-default.png`;

    setMeta('property', 'og:title', formattedTitle);
    setMeta('property', 'og:site_name', siteConfig.brandName);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', formattedTitle);
    setMeta('name', 'twitter:image', imageUrl);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const scriptId = 'page-json-ld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
    } else if (script) {
      script.remove();
    }

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [title, description, path, type, image, noindex, jsonLd]);
}
