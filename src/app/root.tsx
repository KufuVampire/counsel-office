import type { ReactNode } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import type { Route } from './+types/root';
import onestCyrillicWoff2 from '@fontsource-variable/onest/files/onest-cyrillic-wght-normal.woff2?url';
import '@fontsource-variable/onest';
import '@fontsource-variable/literata';
import '@/styles/index.css';

import { SiteLayout } from './layout';

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/favicon.svg',
  },
  {
    rel: 'preload',
    href: onestCyrillicWoff2,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400..500;1,7..72,400&family=Onest:wght@400..500&display=swap',
  },
];

export function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f6f7f6" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Произошла непредвиденная ошибка';
  let details = 'Пожалуйста, обновите страницу или вернитесь на главную.';

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404 ? '404 — Страница не найдена' : `${error.status} ${error.statusText}`;
    details =
      error.status === 404
        ? 'Запрошенная страница не существует или была перемещена.'
        : error.data || details;
  } else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center p-gutter text-center">
      <h1 className="font-serif text-h1 text-fg">{message}</h1>
      <p className="mt-4 text-body text-fg-muted">{details}</p>
      <a
        href="/"
        className="mt-6 inline-flex h-control-md items-center justify-center rounded-md bg-primary px-6 text-small text-primary-fg transition-colors hover:bg-primary-hover focus-ring"
      >
        На главную
      </a>
    </main>
  );
}
