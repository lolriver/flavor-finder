import React from 'react';
import { History, Clock, Eye } from 'lucide-react';
import { RecipeHistory as RecipeHistoryType } from '../types/recipe';

interface RecipeHistoryProps {
  history: RecipeHistoryType[];
  onRecipeClick: (id: number) => void;
  onClearHistory: () => void;
  darkMode: boolean;
}

export const RecipeHistory: React.FC<RecipeHistoryProps> = ({
  history,
  onRecipeClick,
  onClearHistory,
  darkMode
}) => {
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
  );

  return (
    <div className={`p-6 rounded-2xl shadow-xl ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <History size={24} className="text-purple-500" />
          <h2 className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Recipe History
          </h2>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8">
          <History size={48} className={`mx-auto mb-4 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No recipe history yet
          </p>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Recipes you view will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedHistory.slice(0, 10).map(item => (
            <div
              key={item.id}
              onClick={() => onRecipeClick(item.recipeId)}
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <img
                src={item.recipeImage}
                alt={item.recipeTitle}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <h3 className={`font-semibold mb-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.recipeTitle}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className={`flex items-center gap-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Clock size={14} />
                    <span>{new Date(item.viewedAt).toLocaleDateString()}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Eye size={14} />
                    <span>Viewed {item.cookCount} time{item.cookCount !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {history.length > 10 && (
            <p className={`text-center text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Showing 10 most recent recipes
            </p>
          )}
        </div>
      )}
    </div>
  );
};