import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
        darkMode
          ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
          : 'bg-white hover:bg-gray-100 text-gray-700'
      }`}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};