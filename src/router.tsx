import { createBrowserRouter, Outlet, useParams } from 'react-router';
import { SiteLayout } from '@/app/layout';
import { BlogPage, BlogPostPage } from '@/features/blog';
import { HomePage } from '@/features/home';
import { PrivacyPage, TermsPage } from '@/features/legal-pages';
import { NotFoundPage } from '@/features/not-found';
import { PracticePage } from '@/features/practice';

function PracticeRoute() {
  const { slug } = useParams<{ slug: string }>();
  return <PracticePage slug={slug ?? ''} />;
}

function BlogPostRoute() {
  const { slug } = useParams<{ slug: string }>();
  return <BlogPostPage slug={slug ?? ''} />;
}

function RootErrorBoundary() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center p-gutter text-center">
      <h1 className="font-serif text-h1 text-fg">Произошла ошибка</h1>
      <p className="mt-4 text-body text-fg-muted">
        Пожалуйста, обновите страницу или вернитесь на главную.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex h-control-md items-center justify-center rounded-md bg-primary px-6 text-small text-primary-fg transition-colors hover:bg-primary-hover focus-ring cursor-pointer"
      >
        На главную
      </a>
    </main>
  );
}

export const router = createBrowserRouter([
  {
    element: (
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    ),
    errorElement: <RootErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'practice/:slug', element: <PracticeRoute /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogPostRoute /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
