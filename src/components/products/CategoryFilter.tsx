import { ProductCategory } from '../../types';
import Button from '../ui/Button';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | null;
  onSelectCategory: (category: ProductCategory | null) => void;
}

const categories = [
  { value: null, label: 'All' },
  { value: ProductCategory.ELECTRONICS, label: 'Electronics' },
  { value: ProductCategory.VEHICLES, label: 'Vehicles' },
  { value: ProductCategory.PROPERTIES, label: 'Properties' },
  { value: ProductCategory.JOBS, label: 'Jobs' },
  { value: ProductCategory.PROPERTY, label: 'Property' },
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="py-4 overflow-x-auto">
      <div className="flex space-x-2">
        {categories.map((category) => (
          <Button
            key={category.label}
            variant={selectedCategory === category.value ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onSelectCategory(category.value)}
            className="whitespace-nowrap"
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;