import React from 'react';
import { ChefHat, Coffee, Cookie, Salad } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  darkMode: boolean;
}

const categories = [
  { id: null, name: 'All Recipes', icon: ChefHat },
  { id: 'main course', name: 'Main Course', icon: ChefHat },
  { id: 'dessert', name: 'Desserts', icon: Cookie },
  { id: 'appetizer', name: 'Appetizers', icon: Salad },
  { id: 'breakfast', name: 'Breakfast', icon: Coffee },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  darkMode
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <button
            key={category.id || 'all'}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm ${
              isSelected
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-orange-500/25'
                : darkMode
                ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600/80 hover:text-white border border-gray-600/50'
                : 'bg-white/80 text-gray-700 hover:bg-orange-50/80 border border-orange-200/50 hover:border-orange-300/50'
            }`}
          >
            <Icon size={20} />
            {category.name}
          </button>
        );
      })}
    </div>
  );
};