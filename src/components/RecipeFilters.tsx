import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface RecipeFiltersProps {
  onSortChange: (sort: string) => void;
  currentSort: string;
  darkMode: boolean;
}

export const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  onSortChange,
  currentSort,
  darkMode
}) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 mb-6 ${
      darkMode ? 'text-white' : 'text-gray-900'
    }`}>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-orange-500" />
          <span className="text-sm font-medium">Sort by:</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'relevance', label: 'Relevance' },
            { value: 'time', label: 'Cooking Time' },
            { value: 'popular', label: 'Popularity' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 ${
                currentSort === option.value
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : darkMode
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600'
                  : 'bg-white/50 text-gray-700 hover:bg-white border border-orange-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
