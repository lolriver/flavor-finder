import React from 'react';
import { ArrowLeft, Clock, Users, ShoppingCart, Utensils, Heart, Calendar, Timer, StickyNote } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { RecipeNotes } from './RecipeNotes';
import { RecipeNote } from '../types/recipe';
import { ShareRecipe } from './ShareRecipe';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onAddToShoppingList: (recipe: Recipe) => void;
  onToggleFavorite: (recipe: Recipe) => void;
  onAddToMealPlan: (recipe: Recipe) => void;
  onShowTimer: () => void;
  isFavorite: boolean;
  darkMode: boolean;
  notes: RecipeNote[];
  onAddNote: (note: Omit<RecipeNote, 'id' | 'createdAt'>) => void;
  onUpdateNote: (id: string, note: string, rating: number) => void;
  onDeleteNote: (id: string) => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ 
  recipe, 
  onBack, 
  onAddToShoppingList, 
  onToggleFavorite,
  onAddToMealPlan,
  onShowTimer,
  isFavorite,
  darkMode,
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote
}) => {
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const formatInstructions = (instructions: string) => {
    const doc = new DOMParser().parseFromString(instructions, 'text/html');
    const listItems = doc.querySelectorAll('li');
    return Array.from(listItems).map(li => li.textContent || '');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 active:scale-95 ${
            darkMode
              ? 'text-gray-300 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Back to Results</span>
        </button>

        <div className={`rounded-2xl shadow-xl overflow-hidden ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              loading="eager"
              className="w-full h-48 sm:h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {recipe.title}
              </h1>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 text-white/90 text-sm sm:text-base">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock size={16} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{recipe.readyInMinutes} minutes</span>
                    <span className="sm:hidden">{recipe.readyInMinutes}m</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Users size={16} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{recipe.servings} servings</span>
                    <span className="sm:hidden">{recipe.servings}</span>
                  </div>
                  {recipe.nutrition && (
                    <div className="hidden sm:flex items-center gap-2">
                      <Utensils size={20} />
                      <span>{recipe.nutrition.calories} cal</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <button
                    onClick={() => onToggleFavorite(recipe)}
                    className={`p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-200 active:scale-90 ${
                      isFavorite
                        ? 'bg-red-500/90 text-white hover:bg-red-600/90'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart size={18} className="sm:w-5 sm:h-5" fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => onAddToMealPlan(recipe)}
                    className="p-2 sm:p-3 rounded-full bg-blue-500/90 text-white hover:bg-blue-600/90 backdrop-blur-sm transition-all duration-200 active:scale-90"
                  >
                    <Calendar size={18} className="sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={onShowTimer}
                    className="p-2 sm:p-3 rounded-full bg-green-500/90 text-white hover:bg-green-600/90 backdrop-blur-sm transition-all duration-200 active:scale-90"
                  >
                    <Timer size={18} className="sm:w-5 sm:h-5" />
                  </button>
                  <ShareRecipe
                    recipeTitle={recipe.title}
                    recipeId={recipe.id}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <p className={`text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {stripHtml(recipe.summary)}
            </p>

            {recipe.nutrition && (
              <div className={`p-6 rounded-xl mb-8 ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Nutrition Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{recipe.nutrition.calories}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{recipe.nutrition.protein}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{recipe.nutrition.carbs}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{recipe.nutrition.fat}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fat</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className={`text-2xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Ingredients
                </h3>
                <ul className="space-y-3">
                  {recipe.extendedIngredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                      }`}
                    >
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {ingredient.original}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onAddToShoppingList(recipe)}
                  className="w-full mt-4 px-4 py-3 sm:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 active:scale-95 text-sm sm:text-base"
                >
                  <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                  Add to Shopping List
                </button>
              </div>

              <div>
                <h3 className={`text-2xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Instructions
                </h3>
                <ol className="space-y-4">
                  {formatInstructions(recipe.instructions).map((step, index) => (
                    <li
                      key={index}
                      className={`flex gap-4 p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                      }`}
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className={`leading-relaxed ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <RecipeNotes
            recipeId={recipe.id}
            notes={notes}
            onAddNote={onAddNote}
            onUpdateNote={onUpdateNote}
            onDeleteNote={onDeleteNote}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};