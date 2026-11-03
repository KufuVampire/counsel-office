import { useParams } from 'react-router';
import { BlogPostPage } from '@/features/blog';

export default function BlogPostRoute() {
  const params = useParams();
  const slug = params.slug ?? '';

  return <BlogPostPage slug={slug} />;
}
