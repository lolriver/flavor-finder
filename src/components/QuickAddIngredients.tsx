import React from 'react';
import { Plus } from 'lucide-react';

interface QuickAddIngredientsProps {
  onAddIngredient: (ingredient: string) => void;
  darkMode: boolean;
}

const POPULAR_INGREDIENTS = [
  'Chicken', 'Beef', 'Pork', 'Fish', 'Shrimp',
  'Rice', 'Pasta', 'Potatoes', 'Bread',
  'Tomatoes', 'Onions', 'Garlic', 'Peppers',
  'Cheese', 'Eggs', 'Milk', 'Butter',
  'Carrots', 'Broccoli', 'Mushrooms', 'Spinach',
  'Lemon', 'Olive Oil', 'Soy Sauce', 'Salt'
];

export const QuickAddIngredients: React.FC<QuickAddIngredientsProps> = ({
  onAddIngredient,
  darkMode
}) => {
  return (
    <div className={`w-full max-w-4xl mx-auto p-4 sm:p-6 rounded-2xl shadow-xl backdrop-blur-xl border transition-all duration-300 ${
      darkMode
        ? 'bg-gray-800/60 border-gray-700/50'
        : 'bg-white/60 border-orange-200/50'
    }`}>
      <h3 className={`text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <Plus size={20} className="text-orange-500" />
        Quick Add Popular Ingredients
      </h3>
      <div className="flex flex-wrap gap-2">
        {POPULAR_INGREDIENTS.map((ingredient) => (
          <button
            key={ingredient}
            onClick={() => onAddIngredient(ingredient.toLowerCase())}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 ${
              darkMode
                ? 'bg-gray-700/80 text-gray-300 hover:bg-orange-600 hover:text-white border border-gray-600'
                : 'bg-white/80 text-gray-700 hover:bg-orange-500 hover:text-white border border-orange-200'
            }`}
          >
            {ingredient}
          </button>
        ))}
      </div>
    </div>
  );
};
