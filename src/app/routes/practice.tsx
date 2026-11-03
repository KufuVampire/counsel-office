import { useParams } from 'react-router';
import { PracticePage } from '@/features/practice';

export default function PracticeRoute() {
  const params = useParams();
  const slug = params.slug ?? '';

  return <PracticePage slug={slug} />;
}
