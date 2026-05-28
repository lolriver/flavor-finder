import React from 'react';
import { TrendingUp, Clock, Heart, Calendar } from 'lucide-react';

interface RecipeStatsProps {
  totalRecipesViewed: number;
  totalFavorites: number;
  totalMealPlans: number;
  averageCookingTime: number;
  darkMode: boolean;
}

export const RecipeStats: React.FC<RecipeStatsProps> = ({
  totalRecipesViewed,
  totalFavorites,
  totalMealPlans,
  averageCookingTime,
  darkMode
}) => {
  const stats = [
    {
      icon: TrendingUp,
      label: 'Recipes Viewed',
      value: totalRecipesViewed,
      color: 'text-blue-500',
      bgColor: darkMode ? 'bg-blue-500/10' : 'bg-blue-50'
    },
    {
      icon: Heart,
      label: 'Favorites',
      value: totalFavorites,
      color: 'text-red-500',
      bgColor: darkMode ? 'bg-red-500/10' : 'bg-red-50'
    },
    {
      icon: Calendar,
      label: 'Meal Plans',
      value: totalMealPlans,
      color: 'text-green-500',
      bgColor: darkMode ? 'bg-green-500/10' : 'bg-green-50'
    },
    {
      icon: Clock,
      label: 'Avg Cook Time',
      value: `${averageCookingTime}m`,
      color: 'text-orange-500',
      bgColor: darkMode ? 'bg-orange-500/10' : 'bg-orange-50'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 ${
              darkMode ? 'border border-gray-700/50' : 'border border-gray-200/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`${stat.color} w-5 h-5 sm:w-6 sm:h-6`} />
            </div>
            <p className={`text-2xl sm:text-3xl font-bold mb-1 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {stat.value}
            </p>
            <p className={`text-xs sm:text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
