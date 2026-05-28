import React from 'react';
import { ShoppingCart, Heart, Calendar, Target, History } from 'lucide-react';

interface FloatingActionButtonsProps {
  favorites: number;
  mealPlans: number;
  shoppingItems: number;
  onFavoritesClick: () => void;
  onMealPlanClick: () => void;
  onShoppingClick: () => void;
  onNutritionClick: () => void;
  onHistoryClick: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  favorites,
  mealPlans,
  shoppingItems,
  onFavoritesClick,
  onMealPlanClick,
  onShoppingClick,
  onNutritionClick,
  onHistoryClick
}) => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-40 flex flex-col gap-2 sm:gap-3 lg:gap-4 safe-bottom safe-right">
      <button
        onClick={onHistoryClick}
        className="group relative p-3 sm:p-3.5 lg:p-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 active:scale-90 md:hover:scale-110 transform-gpu"
      >
        <History size={20} className="sm:w-6 sm:h-6" />
        <div className="hidden md:block absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Recipe History
        </div>
      </button>

      <button
        onClick={onNutritionClick}
        className="group relative p-3 sm:p-3.5 lg:p-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 active:scale-90 md:hover:scale-110 transform-gpu"
      >
        <Target size={20} className="sm:w-6 sm:h-6" />
        <div className="hidden md:block absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Nutrition Tracker
        </div>
      </button>

      {favorites > 0 && (
        <button
          onClick={onFavoritesClick}
          className="group relative p-3 sm:p-3.5 lg:p-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3 active:scale-90 md:hover:scale-110 transform-gpu"
        >
          <Heart size={20} className="sm:w-6 sm:h-6" />
          <span className="bg-white text-red-600 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
            {favorites}
          </span>
          <div className="hidden md:block absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Favorites
          </div>
        </button>
      )}
      
      {mealPlans > 0 && (
        <button
          onClick={onMealPlanClick}
          className="group relative p-3 sm:p-3.5 lg:p-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3 active:scale-90 md:hover:scale-110 transform-gpu"
        >
          <Calendar size={20} className="sm:w-6 sm:h-6" />
          <span className="bg-white text-blue-600 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
            {mealPlans}
          </span>
          <div className="hidden md:block absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Meal Plans
          </div>
        </button>
      )}
      
      {shoppingItems > 0 && (
        <button
          onClick={onShoppingClick}
          className="group relative p-3 sm:p-3.5 lg:p-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3 active:scale-90 md:hover:scale-110 transform-gpu"
        >
          <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
          <span className="bg-white text-orange-600 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
            {shoppingItems}
          </span>
          <div className="hidden md:block absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Shopping List
          </div>
        </button>
      )}
    </div>
  );
};