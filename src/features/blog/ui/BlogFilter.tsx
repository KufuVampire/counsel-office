import { Chip } from '@/shared/ui/Chip';
import { VisuallyHidden } from '@/shared/ui/VisuallyHidden';

export interface BlogFilterProps {
  readonly categories: readonly string[];
  readonly selectedCategory: string;
  readonly onSelectCategory: (category: string) => void;
  readonly className?: string;
}

export function BlogFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: BlogFilterProps) {
  return (
    <div className={className}>
      <VisuallyHidden>Фильтрация по категориям</VisuallyHidden>
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Chip>
        ))}
      </div>
    </div>
  );
}
