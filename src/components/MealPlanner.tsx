import React, { useState } from 'react';
import { ArrowLeft, Calendar, Plus, Trash2, ChefHat } from 'lucide-react';
import { MealPlan, Recipe } from '../types/recipe';

interface MealPlannerProps {
  mealPlans: MealPlan[];
  onBack: () => void;
  onAddMeal: (date: string, mealType: string, recipe: Recipe) => void;
  onRemoveMeal: (id: string) => void;
  onRecipeClick: (id: number) => void;
  darkMode: boolean;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({
  mealPlans,
  onBack,
  onRemoveMeal,
  onRecipeClick,
  darkMode
}) => {
  const [selectedWeek, setSelectedWeek] = useState(0);

  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + weekOffset * 7);
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedWeek);
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  const getMealsForDateAndType = (date: Date, mealType: string) => {
    const dateString = date.toISOString().split('T')[0];
    return mealPlans.filter(meal => 
      meal.date === dateString && meal.mealType === mealType
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto p-4">
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
              <Calendar size={32} className="text-blue-600" />
              <h1 className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Meal Planner
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedWeek(selectedWeek - 1)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Previous Week
              </button>
              <button
                onClick={() => setSelectedWeek(selectedWeek + 1)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Next Week
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {weekDates.map((date, dayIndex) => (
              <div
                key={dayIndex}
                className={`p-4 rounded-lg border ${
                  darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <h3 className={`font-semibold text-center mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </h3>

                {mealTypes.map((mealType) => {
                  const meals = getMealsForDateAndType(date, mealType);
                  
                  return (
                    <div key={mealType} className="mb-4">
                      <h4 className={`text-sm font-medium mb-2 capitalize ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {mealType}
                      </h4>
                      
                      {meals.length === 0 ? (
                        <div className={`p-3 rounded-lg border-2 border-dashed text-center ${
                          darkMode 
                            ? 'border-gray-600 text-gray-500' 
                            : 'border-gray-300 text-gray-400'
                        }`}>
                          <Plus size={16} className="mx-auto mb-1" />
                          <p className="text-xs">Add meal</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {meals.map((meal) => (
                            <div
                              key={meal.id}
                              className={`p-2 rounded-lg border group relative ${
                                darkMode 
                                  ? 'bg-gray-600 border-gray-500' 
                                  : 'bg-white border-gray-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={meal.recipeImage}
                                  alt={meal.recipeTitle}
                                  className="w-8 h-8 rounded object-cover cursor-pointer"
                                  onClick={() => onRecipeClick(meal.recipeId)}
                                />
                                <p 
                                  className={`text-xs font-medium cursor-pointer hover:text-blue-600 transition-colors duration-200 ${
                                    darkMode ? 'text-gray-200' : 'text-gray-800'
                                  }`}
                                  onClick={() => onRecipeClick(meal.recipeId)}
                                >
                                  {meal.recipeTitle}
                                </p>
                              </div>
                              <button
                                onClick={() => onRemoveMeal(meal.id)}
                                className="absolute top-1 right-1 p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {mealPlans.length === 0 && (
            <div className="text-center py-12">
              <ChefHat size={64} className={`mx-auto mb-4 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No meals planned yet
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Add recipes to your meal plan from recipe details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};