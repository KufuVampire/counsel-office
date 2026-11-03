import { Chip } from '@/shared/ui/Chip';

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
      <span className="sr-only">Фильтрация по категориям</span>
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
