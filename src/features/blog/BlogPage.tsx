import { useMemo, useState } from 'react';
import { Container } from '@/shared/ui/Container';
import { Heading } from '@/shared/ui/Heading';
import { Section } from '@/shared/ui/Section';
import { Text } from '@/shared/ui/Text';
import { POSTS } from './data/posts';
import { BlogFilter } from './ui/BlogFilter';
import { PostCard } from './ui/PostCard';

const ALL_CATEGORY = 'Все';

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORY);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const post of POSTS) {
      set.add(post.category);
    }
    return [ALL_CATEGORY, ...Array.from(set)];
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY) {
      return POSTS;
    }
    return POSTS.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <Section tone="page" spacing="default">
      <Container size="content" className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-reading">
          <Heading level={1} size="h1" tone="default">
            Блог и материалы
          </Heading>
          <Text size="body-lg" tone="muted" className="leading-relaxed">
            Практические статьи, разъяснения правовых процедур и рекомендации адвоката по семейным,
            арбитражным и банкротным делам.
          </Text>
        </div>

        <BlogFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
