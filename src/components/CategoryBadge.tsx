import { Category } from '@/types/slicingPie';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  pink: 'bg-pink-100 text-pink-700 border-pink-200',
};

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${colorClasses[category.color]} ${sizeClasses}`}
    >
      <span>{category.emoji}</span>
      <span>{category.name}</span>
    </span>
  );
}
