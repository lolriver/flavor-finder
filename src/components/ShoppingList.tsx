import React from 'react';
import { ArrowLeft, Check, Trash2, ShoppingCart } from 'lucide-react';
import { ShoppingItem } from '../types/recipe';

interface ShoppingListProps {
  items: ShoppingItem[];
  onBack: () => void;
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClearCompleted: () => void;
  darkMode: boolean;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  onBack,
  onToggleItem,
  onRemoveItem,
  onClearCompleted,
  darkMode
}) => {
  const completedItems = items.filter(item => item.checked);
  const pendingItems = items.filter(item => !item.checked);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto p-4">
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ShoppingCart size={32} className="text-blue-600" />
              <h1 className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Shopping List
              </h1>
            </div>
            {completedItems.length > 0 && (
              <button
                onClick={onClearCompleted}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Trash2 size={16} />
                Clear Completed
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className={`mx-auto mb-4 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Your shopping list is empty
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Add ingredients from recipes to get started
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingItems.length > 0 && (
                <div>
                  <h2 className={`text-xl font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    To Buy ({pendingItems.length} items)
                  </h2>
                  <div className="space-y-2">
                    {pendingItems.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-colors duration-200 ${
                          darkMode
                            ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <button
                          onClick={() => onToggleItem(item.id)}
                          className="w-6 h-6 rounded-full border-2 border-gray-400 hover:border-green-500 transition-colors duration-200 flex items-center justify-center"
                        >
                          {item.checked && <Check size={16} className="text-green-500" />}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.amount} {item.unit} {item.name}
                          </p>
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            for {item.recipeTitle}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {completedItems.length > 0 && (
                <div>
                  <h2 className={`text-xl font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Completed ({completedItems.length} items)
                  </h2>
                  <div className="space-y-2">
                    {completedItems.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border opacity-60 ${
                          darkMode
                            ? 'bg-gray-700/30 border-gray-600'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <button
                          onClick={() => onToggleItem(item.id)}
                          className="w-6 h-6 rounded-full bg-green-500 border-2 border-green-500 flex items-center justify-center"
                        >
                          <Check size={16} className="text-white" />
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium line-through ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {item.amount} {item.unit} {item.name}
                          </p>
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            for {item.recipeTitle}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};