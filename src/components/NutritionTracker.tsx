import React, { useState } from 'react';
import { Target, TrendingUp, Award } from 'lucide-react';
import { NutritionGoals, Recipe, MealPlan } from '../types/recipe';

interface NutritionTrackerProps {
  goals: NutritionGoals;
  onGoalsChange: (goals: NutritionGoals) => void;
  mealPlans: MealPlan[];
  recipes: Recipe[];
  darkMode: boolean;
}

export const NutritionTracker: React.FC<NutritionTrackerProps> = ({
  goals,
  onGoalsChange,
  mealPlans,
  recipes,
  darkMode
}) => {
  const [showGoalsEditor, setShowGoalsEditor] = useState(false);
  const [tempGoals, setTempGoals] = useState(goals);

  const today = new Date().toISOString().split('T')[0];
  const todayMeals = mealPlans.filter(meal => meal.date === today);

  const getTodayNutrition = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    todayMeals.forEach(meal => {
      const recipe = recipes.find(r => r.id === meal.recipeId);
      if (recipe?.nutrition) {
        totalCalories += recipe.nutrition.calories;
        totalProtein += parseFloat(recipe.nutrition.protein.replace('g', '')) || 0;
        totalCarbs += parseFloat(recipe.nutrition.carbs.replace('g', '')) || 0;
        totalFat += parseFloat(recipe.nutrition.fat.replace('g', '')) || 0;
      }
    });

    return { totalCalories, totalProtein, totalCarbs, totalFat };
  };

  const { totalCalories, totalProtein, totalCarbs, totalFat } = getTodayNutrition();

  const getProgressPercentage = (current: number, goal: number) => {
    return goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const handleSaveGoals = () => {
    onGoalsChange(tempGoals);
    setShowGoalsEditor(false);
  };

  return (
    <div className={`p-6 rounded-2xl shadow-xl ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target size={24} className="text-green-500" />
          <h2 className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Today's Nutrition
          </h2>
        </div>
        <button
          onClick={() => setShowGoalsEditor(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Set Goals
        </button>
      </div>

      {todayMeals.length === 0 ? (
        <div className="text-center py-8">
          <TrendingUp size={48} className={`mx-auto mb-4 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No meals planned for today
          </p>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Add recipes to your meal plan to track nutrition
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Calories */}
          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Calories
              </span>
              {goals.dailyCalories && getProgressPercentage(totalCalories, goals.dailyCalories) >= 90 && (
                <Award size={16} className="text-green-500" />
              )}
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {Math.round(totalCalories)}
              {goals.dailyCalories && (
                <span className={`text-sm font-normal ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  /{goals.dailyCalories}
                </span>
              )}
            </div>
            {goals.dailyCalories && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getProgressColor(getProgressPercentage(totalCalories, goals.dailyCalories))
                  }`}
                  style={{ width: `${getProgressPercentage(totalCalories, goals.dailyCalories)}%` }}
                />
              </div>
            )}
          </div>

          {/* Protein */}
          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Protein
              </span>
              {goals.dailyProtein && getProgressPercentage(totalProtein, goals.dailyProtein) >= 90 && (
                <Award size={16} className="text-green-500" />
              )}
            </div>
            <div className="text-2xl font-bold text-red-600 mb-2">
              {Math.round(totalProtein)}g
              {goals.dailyProtein && (
                <span className={`text-sm font-normal ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  /{goals.dailyProtein}g
                </span>
              )}
            </div>
            {goals.dailyProtein && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getProgressColor(getProgressPercentage(totalProtein, goals.dailyProtein))
                  }`}
                  style={{ width: `${getProgressPercentage(totalProtein, goals.dailyProtein)}%` }}
                />
              </div>
            )}
          </div>

          {/* Carbs */}
          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Carbs
              </span>
              {goals.dailyCarbs && getProgressPercentage(totalCarbs, goals.dailyCarbs) >= 90 && (
                <Award size={16} className="text-green-500" />
              )}
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-2">
              {Math.round(totalCarbs)}g
              {goals.dailyCarbs && (
                <span className={`text-sm font-normal ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  /{goals.dailyCarbs}g
                </span>
              )}
            </div>
            {goals.dailyCarbs && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getProgressColor(getProgressPercentage(totalCarbs, goals.dailyCarbs))
                  }`}
                  style={{ width: `${getProgressPercentage(totalCarbs, goals.dailyCarbs)}%` }}
                />
              </div>
            )}
          </div>

          {/* Fat */}
          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Fat
              </span>
              {goals.dailyFat && getProgressPercentage(totalFat, goals.dailyFat) >= 90 && (
                <Award size={16} className="text-green-500" />
              )}
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {Math.round(totalFat)}g
              {goals.dailyFat && (
                <span className={`text-sm font-normal ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  /{goals.dailyFat}g
                </span>
              )}
            </div>
            {goals.dailyFat && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getProgressColor(getProgressPercentage(totalFat, goals.dailyFat))
                  }`}
                  style={{ width: `${getProgressPercentage(totalFat, goals.dailyFat)}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Goals Editor Modal */}
      {showGoalsEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-2xl shadow-xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Set Nutrition Goals
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Daily Calories
                  </label>
                  <input
                    type="number"
                    value={tempGoals.dailyCalories || ''}
                    onChange={(e) => setTempGoals({
                      ...tempGoals,
                      dailyCalories: e.target.value ? parseInt(e.target.value) : undefined
                    })}
                    placeholder="2000"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Daily Protein (g)
                  </label>
                  <input
                    type="number"
                    value={tempGoals.dailyProtein || ''}
                    onChange={(e) => setTempGoals({
                      ...tempGoals,
                      dailyProtein: e.target.value ? parseInt(e.target.value) : undefined
                    })}
                    placeholder="150"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Daily Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={tempGoals.dailyCarbs || ''}
                    onChange={(e) => setTempGoals({
                      ...tempGoals,
                      dailyCarbs: e.target.value ? parseInt(e.target.value) : undefined
                    })}
                    placeholder="250"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Daily Fat (g)
                  </label>
                  <input
                    type="number"
                    value={tempGoals.dailyFat || ''}
                    onChange={(e) => setTempGoals({
                      ...tempGoals,
                      dailyFat: e.target.value ? parseInt(e.target.value) : undefined
                    })}
                    placeholder="65"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowGoalsEditor(false)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveGoals}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Save Goals
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};