import React, { useState } from 'react';
import { Search, X, Settings, Sparkles } from 'lucide-react';
import { UserPreferences } from '../types/recipe';

interface SearchBarProps {
  onSearch: (ingredients: string[], preferences?: UserPreferences) => void;
  loading: boolean;
  darkMode: boolean;
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  loading, 
  darkMode, 
  preferences, 
  onPreferencesChange 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [showPreferences, setShowPreferences] = useState(false);

  const handleAddIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed.toLowerCase())) {
      const newIngredients = [...ingredients, trimmed.toLowerCase()];
      setIngredients(newIngredients);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    const newIngredients = ingredients.filter(i => i !== ingredient);
    setIngredients(newIngredients);
  };

  const handleSearch = () => {
    if (ingredients.length > 0) {
      onSearch(ingredients, preferences);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        handleAddIngredient();
      } else if (ingredients.length > 0) {
        handleSearch();
      }
    }
  };

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    onPreferencesChange(newPreferences);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl relative backdrop-blur-xl border transition-all duration-300 ${
      darkMode
        ? 'bg-gray-800/80 border-gray-700/50 hover:bg-gray-800/90'
        : 'bg-white/80 border-orange-200/50 hover:bg-white/90'
    }`}>
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Sparkles size={24} className="text-orange-500 sm:w-8 sm:h-8" />
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent`}>
            Find Your Perfect Recipe
          </h1>
          <Sparkles size={24} className="text-red-500 sm:w-8 sm:h-8" />
        </div>
        <p className={`text-sm sm:text-base lg:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Enter your ingredients and discover amazing recipes
        </p>
      </div>

      <button
        onClick={() => setShowPreferences(!showPreferences)}
        className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg transition-colors duration-200 active:scale-90 ${
          darkMode
            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <Settings size={18} className="sm:w-5 sm:h-5" />
      </button>

      {showPreferences && (
        <div className={`mb-8 p-6 rounded-2xl border backdrop-blur-sm ${
          darkMode ? 'bg-gray-700/40 border-gray-600/50' : 'bg-orange-50/40 border-orange-200/50'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Diet
              </label>
              <select
                value={preferences.diet || ''}
                onChange={(e) => handlePreferenceChange('diet', e.target.value || undefined)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 ${
                  darkMode
                    ? 'bg-gray-600/50 border-gray-500 text-white backdrop-blur-sm'
                    : 'bg-white/50 border-orange-300 text-gray-900 backdrop-blur-sm'
                }`}
              >
                <option value="">Any</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten free">Gluten Free</option>
                <option value="ketogenic">Keto</option>
                <option value="paleo">Paleo</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Max Cooking Time (minutes)
              </label>
              <input
                type="number"
                value={preferences.maxReadyTime || ''}
                onChange={(e) => handlePreferenceChange('maxReadyTime', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="No limit"
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 ${
                  darkMode
                    ? 'bg-gray-600/50 border-gray-500 text-white placeholder-gray-400 backdrop-blur-sm'
                    : 'bg-white/50 border-orange-300 text-gray-900 placeholder-gray-500 backdrop-blur-sm'
                }`}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter an ingredient (e.g., chicken)"
              className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 text-base sm:text-lg backdrop-blur-sm ${
                darkMode
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400/20'
                  : 'bg-white/50 border-orange-300 text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500/20'
              }`}
              disabled={loading}
            />
          </div>
          <button
            onClick={handleAddIngredient}
            disabled={!inputValue.trim() || loading}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 min-w-[100px] sm:min-w-[120px] shadow-lg hover:shadow-xl active:scale-95"
          >
            Add
          </button>
        </div>

        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode
                    ? 'bg-orange-900/50 text-orange-200 border border-orange-700'
                    : 'bg-orange-100 text-orange-800 border border-orange-200'
                }`}
              >
                {ingredient}
                <button
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="hover:bg-red-500 hover:text-white rounded-full p-0.5 transition-colors duration-200"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        <button
          onClick={handleSearch}
          disabled={ingredients.length === 0 || loading}
          className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 min-h-[50px] sm:min-h-[60px] shadow-2xl hover:shadow-3xl transform active:scale-95 md:hover:scale-105"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
              Searching Recipes...
            </>
          ) : (
            <>
              <Search size={24} />
              Find Recipes ({ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''})
            </>
          )}
        </button>
      </div>
    </div>
  );
};