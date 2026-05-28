import React from 'react';
import { ArrowLeft, Heart, Clock, Users, Trash2 } from 'lucide-react';
import { FavoriteRecipe } from '../types/recipe';

interface FavoritesListProps {
  favorites: FavoriteRecipe[];
  onBack: () => void;
  onRecipeClick: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  darkMode: boolean;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onBack,
  onRecipeClick,
  onRemoveFavorite,
  darkMode
}) => {
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto p-4">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors duration-200 ${
            darkMode
              ? 'text-gray-300 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className={`rounded-2xl shadow-xl p-6 md:p-8 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-8">
            <Heart size={32} className="text-red-500" />
            <h1 className={`text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Favorite Recipes
            </h1>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart size={64} className={`mx-auto mb-4 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No favorite recipes yet
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Save recipes you love to see them here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((recipe) => (
                <div
                  key={recipe.id}
                  className={`group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    darkMode 
                      ? 'bg-gray-700 border border-gray-600' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                      onClick={() => onRecipeClick(recipe.id)}
                    />
                    <button
                      onClick={() => onRemoveFavorite(recipe.id)}
                      className="absolute top-2 right-2 p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600/90 transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 
                      className={`font-semibold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors duration-200 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                      onClick={() => onRecipeClick(recipe.id)}
                    >
                      {recipe.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 line-clamp-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stripHtml(recipe.summary)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className={`flex items-center gap-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Clock size={16} />
                          <span>{recipe.readyInMinutes}m</span>
                        </div>
                        <div className={`flex items-center gap-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Users size={16} />
                          <span>{recipe.servings}</span>
                        </div>
                      </div>
                      <p className={`text-xs ${
                        darkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Saved {new Date(recipe.savedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};