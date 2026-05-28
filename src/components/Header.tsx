import React from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onAboutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme, onAboutClick }) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 safe-top ${
      darkMode
        ? 'bg-gray-900/80 border-gray-700/50'
        : 'bg-white/80 border-orange-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <Logo size="md" darkMode={darkMode} />

          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            <a href="#" className={`font-medium transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Recipes
            </a>
            <a href="#" className={`font-medium transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Categories
            </a>
            <button
              onClick={onAboutClick}
              className={`font-medium transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
            >
              About
            </button>
          </nav>

          <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};