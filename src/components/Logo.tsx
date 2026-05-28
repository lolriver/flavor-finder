import React from 'react';
import { ChefHat } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  darkMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', darkMode = false }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 48
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-sm opacity-75"></div>
        <div className="relative bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-full shadow-lg">
          <ChefHat size={iconSizes[size]} className="text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className={`font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent ${sizeClasses[size]}`}>
          FlavorFinder
        </h1>
        {size === 'lg' && (
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover Amazing Recipes
          </p>
        )}
      </div>
    </div>
  );
};