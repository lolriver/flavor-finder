import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface MealPlanModalProps {
  recipe: Recipe;
  onClose: () => void;
  onAddToMealPlan: (date: string, mealType: string, recipe: Recipe) => void;
  darkMode: boolean;
}

export const MealPlanModal: React.FC<MealPlanModalProps> = ({
  recipe,
  onClose,
  onAddToMealPlan,
  darkMode
}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedMealType, setSelectedMealType] = useState('dinner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToMealPlan(selectedDate, selectedMealType, recipe);
    onClose();
  };

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-fallback flex items-center justify-center z-50 p-4 safe-top safe-bottom touch-scrolling overflow-y-auto">
      <div className={`w-full max-w-md rounded-xl sm:rounded-2xl shadow-xl my-auto ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3">
            <Calendar size={20} className="text-blue-600 sm:w-6 sm:h-6" />
            <h2 className={`text-lg sm:text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Add to Meal Plan
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors duration-200 active:scale-90 ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className={`font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {recipe.title}
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {recipe.readyInMinutes} min • {recipe.servings} servings
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`w-full px-3 py-3 sm:py-2 rounded-lg border text-base ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Meal Type
              </label>
              <select
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
                className={`w-full px-3 py-3 sm:py-2 rounded-lg border text-base ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              >
                {mealTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3 sm:py-2 rounded-lg font-medium transition-colors duration-200 active:scale-95 text-sm sm:text-base ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 active:scale-95 text-sm sm:text-base"
            >
              Add to Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};