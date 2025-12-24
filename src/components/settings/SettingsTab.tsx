import { Founder, Category, CategoryId } from '@/types/slicingPie';
import { FounderSettings } from './FounderSettings';
import { CategorySettings } from './CategorySettings';

interface SettingsTabProps {
  founders: Founder[];
  categories: Category[];
  onAddFounder: () => void;
  onUpdateFounder: (id: string, updates: Partial<Founder>) => void;
  onRemoveFounder: (id: string) => void;
  onUpdateCategory: (id: CategoryId, updates: Partial<Category>) => void;
}

export function SettingsTab({
  founders,
  categories,
  onAddFounder,
  onUpdateFounder,
  onRemoveFounder,
  onUpdateCategory,
}: SettingsTabProps) {
  return (
    <div className="space-y-8">
      <FounderSettings
        founders={founders}
        onAddFounder={onAddFounder}
        onUpdateFounder={onUpdateFounder}
        onRemoveFounder={onRemoveFounder}
      />
      
      <CategorySettings
        categories={categories}
        onUpdateCategory={onUpdateCategory}
      />
    </div>
  );
}
