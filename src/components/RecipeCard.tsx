import React from 'react';
import { Clock, Users, ChefHat, Heart } from 'lucide-react';
import { RecipeSearchResult } from '../types/recipe';

interface RecipeCardProps {
  recipe: RecipeSearchResult;
  onClick: (id: number) => void;
  onToggleFavorite: (recipe: RecipeSearchResult) => void;
  isFavorite: boolean;
  darkMode: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onClick, 
  onToggleFavorite, 
  isFavorite, 
  darkMode 
}) => {
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(recipe);
  };

  return (
    <div
      onClick={() => onClick(recipe.id)}
      className={`cursor-pointer group overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-3xl md:hover:scale-110 transform-gpu active:scale-95 ${
        darkMode
          ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/50'
          : 'bg-white/80 backdrop-blur-sm border border-orange-200/50 hover:border-orange-400/50'
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-48 sm:h-56 object-cover md:group-hover:scale-125 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 sm:p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg active:scale-90 md:hover:scale-110 ${
              isFavorite
                ? 'bg-red-500/95 text-white hover:bg-red-600/95 shadow-red-500/25'
                : 'bg-white/95 text-gray-600 hover:bg-red-50/95 hover:text-red-500 shadow-white/25'
            }`}
          >
            <Heart size={16} className="sm:w-[18px] sm:h-[18px]" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="absolute top-2 left-2 flex gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded-full font-semibold backdrop-blur-sm shadow-lg">
            {recipe.usedIngredientCount || 0} matches
          </span>
          {(recipe.missedIngredientCount || 0) > 0 && (
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs rounded-full font-semibold backdrop-blur-sm shadow-lg">
              +{recipe.missedIngredientCount} more
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h3 className={`font-bold text-lg sm:text-xl mb-2 sm:mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {recipe.title}
        </h3>

        <p className={`text-xs sm:text-sm mb-4 sm:mb-5 line-clamp-2 leading-relaxed ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {stripHtml(recipe.summary)}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm">
            <div className={`flex items-center gap-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>{recipe.readyInMinutes}m</span>
            </div>
            <div className={`flex items-center gap-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Users size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>{recipe.servings}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
            <ChefHat size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="text-xs sm:text-sm font-semibold">View Recipe</span>
          </div>
        </div>
      </div>
    </div>
  );
};