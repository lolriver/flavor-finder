import React from 'react';
import { ArrowLeft, Search, Heart, ShoppingCart, Calendar, Settings, ChefHat, Clock, Users, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  onBack: () => void;
  darkMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBack, darkMode }) => {
  const features = [
    {
      icon: Search,
      title: "Ingredient-Based Search",
      description: "Enter ingredients you have at home and discover recipes that use them. Our smart search finds the perfect matches from thousands of recipes.",
      color: "text-blue-500"
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Love a recipe? Save it to your favorites for quick access later. All favorites are stored locally and persist between sessions.",
      color: "text-red-500"
    },
    {
      icon: ShoppingCart,
      title: "Smart Shopping Lists",
      description: "Generate shopping lists from recipe ingredients. Check off items as you shop and organize by completion status.",
      color: "text-green-500"
    },
    {
      icon: Calendar,
      title: "Weekly Meal Planner",
      description: "Plan your meals for the week with our visual calendar. Add recipes to specific dates and meal types for better organization.",
      color: "text-purple-500"
    },
    {
      icon: Settings,
      title: "Personal Preferences",
      description: "Set dietary preferences like vegetarian, vegan, or gluten-free. Filter recipes by cooking time and cuisine type.",
      color: "text-orange-500"
    },
    {
      icon: ChefHat,
      title: "Recipe Categories",
      description: "Browse recipes by categories including main courses, desserts, appetizers, and breakfast options.",
      color: "text-indigo-500"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Enter Your Ingredients",
      description: "Type in the ingredients you have available in your kitchen"
    },
    {
      step: 2,
      title: "Discover Recipes",
      description: "Browse through curated recipes that match your ingredients"
    },
    {
      step: 3,
      title: "View Details",
      description: "Get complete cooking instructions, nutrition info, and ingredient lists"
    },
    {
      step: 4,
      title: "Plan & Shop",
      description: "Add to meal plans, create shopping lists, and save favorites"
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto p-4">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-colors duration-200 ${
            darkMode
              ? 'text-gray-300 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className={`rounded-3xl shadow-2xl overflow-hidden ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 p-12 text-center">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-75"></div>
                  <div className="relative bg-white p-4 rounded-full shadow-lg">
                    <ChefHat size={48} className="text-orange-600" />
                  </div>
                </div>
                <h1 className="text-5xl font-bold text-white">FlavorFinder</h1>
              </div>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Your intelligent culinary companion that transforms available ingredients into extraordinary meals. 
                Discover, plan, and cook with confidence using our comprehensive recipe platform.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* App Overview */}
            <section className="mb-16">
              <h2 className={`text-3xl font-bold mb-6 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                What is FlavorFinder?
              </h2>
              <div className={`text-lg leading-relaxed text-center max-w-4xl mx-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <p className="mb-4">
                  FlavorFinder is a modern recipe discovery platform that helps you make the most of your available ingredients. 
                  Whether you're looking to reduce food waste, try new cuisines, or plan your weekly meals, our app provides 
                  intelligent recipe suggestions powered by the Spoonacular API.
                </p>
                <p>
                  With features like meal planning, shopping list generation, and personalized preferences, FlavorFinder 
                  transforms the way you approach cooking and meal preparation.
                </p>
              </div>
            </section>

            {/* How It Works */}
            <section className="mb-16">
              <h2 className={`text-3xl font-bold mb-12 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {howItWorks.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg">
                        {item.step}
                      </div>
                      {index < howItWorks.length - 1 && (
                        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-300 to-red-300 transform -translate-y-1/2"></div>
                      )}
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Features */}
            <section className="mb-16">
              <h2 className={`text-3xl font-bold mb-12 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        darkMode 
                          ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' 
                          : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-xl ${feature.color} bg-opacity-10`}>
                          <Icon size={32} className={feature.color} />
                        </div>
                        <h3 className={`text-xl font-semibold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {feature.title}
                        </h3>
                      </div>
                      <p className={`leading-relaxed ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Technical Details */}
            <section className="mb-16">
              <h2 className={`text-3xl font-bold mb-8 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-6 rounded-2xl border ${
                  darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h3 className={`text-xl font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Frontend Technologies
                  </h3>
                  <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• React 18 with TypeScript</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Lucide React for icons</li>
                    <li>• Vite for build tooling</li>
                    <li>• Local Storage for persistence</li>
                  </ul>
                </div>
                <div className={`p-6 rounded-2xl border ${
                  darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h3 className={`text-xl font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Data & API
                  </h3>
                  <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Spoonacular Recipe API</li>
                    <li>• Real-time recipe data</li>
                    <li>• Nutritional information</li>
                    <li>• High-quality recipe images</li>
                    <li>• Comprehensive ingredient data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Usage Statistics */}
            <section className="mb-16">
              <h2 className={`text-3xl font-bold mb-8 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                App Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className={`p-6 rounded-2xl border ${
                  darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                  <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Recipe Database
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Access to thousands of recipes
                  </p>
                </div>
                <div className={`p-6 rounded-2xl border ${
                  darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                  <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Cuisine Types
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    International recipe variety
                  </p>
                </div>
                <div className={`p-6 rounded-2xl border ${
                  darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                  <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Availability
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Always ready to help you cook
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
              <div className={`p-8 rounded-2xl border bg-gradient-to-r from-orange-500/10 to-red-500/10 ${
                darkMode ? 'border-orange-500/20' : 'border-orange-200'
              }`}>
                <Sparkles size={48} className="mx-auto mb-4 text-orange-500" />
                <h2 className={`text-2xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Ready to Start Cooking?
                </h2>
                <p className={`text-lg mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Transform your ingredients into amazing meals with FlavorFinder
                </p>
                <button
                  onClick={onBack}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  Start Finding Recipes
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};