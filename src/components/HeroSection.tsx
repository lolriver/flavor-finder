import React from 'react';
import { Logo } from './Logo';
import { Sparkles, TrendingUp, Users } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ darkMode }) => {
  return (
    <div className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Logo size="lg" darkMode={darkMode} />
        </div>
        
        <h2 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Discover Your Next
          <span className="block bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Culinary Adventure
          </span>
        </h2>
        
        <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Transform your ingredients into extraordinary meals with our intelligent recipe finder. 
          From quick weeknight dinners to gourmet weekend feasts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60' 
              : 'bg-white/40 border-orange-200/50 hover:bg-white/60'
          }`}>
            <Sparkles size={48} className="mx-auto mb-4 text-orange-500" />
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Smart Search
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Find perfect recipes based on ingredients you already have at home
            </p>
          </div>
          
          <div className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60' 
              : 'bg-white/40 border-orange-200/50 hover:bg-white/60'
          }`}>
            <TrendingUp size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Meal Planning
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Plan your weekly meals and generate smart shopping lists automatically
            </p>
          </div>
          
          <div className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60' 
              : 'bg-white/40 border-orange-200/50 hover:bg-white/60'
          }`}>
            <Users size={48} className="mx-auto mb-4 text-yellow-500" />
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Save Favorites
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Build your personal recipe collection and access them anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};