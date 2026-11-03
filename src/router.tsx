import { createBrowserRouter, Outlet, useParams } from 'react-router';
import { SiteLayout } from '@/app/layout';
import { BlogPage, BlogPostPage } from '@/features/blog';
import { HomePage } from '@/features/home';
import { PrivacyPage, TermsPage } from '@/features/legal-pages';
import { NotFoundPage } from '@/features/not-found';
import { PracticePage } from '@/features/practice';
import { ButtonLink } from '@/shared/ui/ButtonLink';
import { Heading } from '@/shared/ui/Heading';
import { Text } from '@/shared/ui/Text';

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
      <Heading level={1} size="h1">
        Произошла ошибка
      </Heading>
      <Text size="body" tone="muted" className="mt-4">
        Пожалуйста, обновите страницу или вернитесь на главную.
      </Text>
      <ButtonLink to="/" variant="primary" size="md" className="mt-6">
        На главную
      </ButtonLink>
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
