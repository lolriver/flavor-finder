import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { RecipeAPI, SearchFilters } from './services/recipeApi';
import { SearchBar } from './components/SearchBar';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetail } from './components/RecipeDetail';
import { ShoppingList } from './components/ShoppingList';
import { FavoritesList } from './components/FavoritesList';
import { MealPlanner } from './components/MealPlanner';
import { MealPlanModal } from './components/MealPlanModal';
import { CategoryFilter } from './components/CategoryFilter';
import { Pagination } from './components/Pagination';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BackgroundOverlay } from './components/BackgroundOverlay';
import { FloatingActionButtons } from './components/FloatingActionButtons';
import { AboutSection } from './components/AboutSection';
import { CookingTimer } from './components/CookingTimer';
import { NutritionTracker } from './components/NutritionTracker';
import { RecipeHistory } from './components/RecipeHistory';
import { QuickAddIngredients } from './components/QuickAddIngredients';
import { RecipeFilters } from './components/RecipeFilters';
import { RecipeStats } from './components/RecipeStats';
import { Recipe, RecipeSearchResult, ShoppingItem, FavoriteRecipe, MealPlan, UserPreferences, RecipeNote, NutritionGoals, RecipeHistory as RecipeHistoryType } from './types/recipe';
import { useLocalStorage } from './hooks/useLocalStorage';

type AppState = 'search' | 'detail' | 'shopping' | 'favorites' | 'mealplan' | 'about' | 'nutrition' | 'history';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('search');
  const [recipes, setRecipes] = useState<RecipeSearchResult[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [showCookingTimer, setShowCookingTimer] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
  
  // Persistent state using localStorage
  const [shoppingItems, setShoppingItems] = useLocalStorage<ShoppingItem[]>('shoppingItems', []);
  const [favorites, setFavorites] = useLocalStorage<FavoriteRecipe[]>('favorites', []);
  const [mealPlans, setMealPlans] = useLocalStorage<MealPlan[]>('mealPlans', []);
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('preferences', {});
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);
  const [recipeNotes, setRecipeNotes] = useLocalStorage<RecipeNote[]>('recipeNotes', []);
  const [nutritionGoals, setNutritionGoals] = useLocalStorage<NutritionGoals>('nutritionGoals', {});
  const [recipeHistory, setRecipeHistory] = useLocalStorage<RecipeHistoryType[]>('recipeHistory', []);

  const recipeAPI = RecipeAPI.getInstance();

  const handleSearch = async (ingredients: string[], userPreferences?: UserPreferences) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setSearchIngredients(ingredients);
    
    try {
      const filters: SearchFilters = {
        diet: userPreferences?.diet,
        intolerances: userPreferences?.intolerances?.join(','),
        maxReadyTime: userPreferences?.maxReadyTime,
        cuisine: userPreferences?.cuisine,
        number: 12,
        offset: 0
      };
      
      let results = await recipeAPI.searchRecipesByIngredients(ingredients, filters);
      results = sortRecipes(results, sortBy);
      setRecipes(results);
      setTotalPages(Math.ceil(results.length / 12));
    } catch (error) {
      console.error('Search failed:', error);
      setError('Failed to search recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySearch = async (category: string | null) => {
    if (!category) {
      setRecipes([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    
    try {
      const filters: SearchFilters = {
        diet: preferences?.diet,
        intolerances: preferences?.intolerances?.join(','),
        maxReadyTime: preferences?.maxReadyTime,
        cuisine: preferences?.cuisine,
        number: 12,
        offset: 0
      };
      
      let results = await recipeAPI.searchRecipesByCategory(category, filters);
      results = sortRecipes(results, sortBy);
      setRecipes(results);
      setTotalPages(Math.ceil(results.length / 12));
    } catch (error) {
      console.error('Search failed:', error);
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecipeClick = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const recipeDetails = await recipeAPI.getRecipeDetails(id);
      setSelectedRecipe(recipeDetails);

      // Add to history
      setRecipeHistory(prev => {
        const existing = prev.find(item => item.recipeId === id);
        if (existing) {
          return prev.map(item =>
            item.recipeId === id
              ? { ...item, viewedAt: new Date().toISOString(), cookCount: item.cookCount + 1 }
              : item
          );
        } else {
          const newHistoryItem: RecipeHistoryType = {
            id: Date.now().toString(),
            recipeId: id,
            recipeTitle: recipeDetails.title,
            recipeImage: recipeDetails.image,
            viewedAt: new Date().toISOString(),
            cookCount: 1
          };
          return [...prev, newHistoryItem];
        }
      });

      setCurrentState('detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Failed to load recipe details:', error);
      setError('Failed to load recipe details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (recipe: Recipe | RecipeSearchResult) => {
    const favoriteRecipe: FavoriteRecipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      savedAt: new Date().toISOString()
    };

    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === recipe.id);
      if (exists) {
        return prev.filter(fav => fav.id !== recipe.id);
      } else {
        return [...prev, favoriteRecipe];
      }
    });
  };

  const handleRemoveFavorite = (id: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const handleAddToShoppingList = (recipe: Recipe) => {
    const newItems: ShoppingItem[] = recipe.extendedIngredients.map(ingredient => ({
      id: `${recipe.id}-${ingredient.id}`,
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      checked: false,
      recipeTitle: recipe.title,
      recipeId: recipe.id
    }));

    setShoppingItems(prev => {
      const existingIds = new Set(prev.map(item => item.id));
      const uniqueItems = newItems.filter(item => !existingIds.has(item.id));
      return [...prev, ...uniqueItems];
    });
  };

  const handleAddToMealPlan = (date: string, mealType: string, recipe: Recipe) => {
    const mealPlan: MealPlan = {
      id: `${date}-${mealType}-${recipe.id}-${Date.now()}`,
      date,
      mealType: mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      recipeImage: recipe.image
    };

    setMealPlans(prev => [...prev, mealPlan]);
  };

  const handleRemoveMealPlan = (id: string) => {
    setMealPlans(prev => prev.filter(plan => plan.id !== id));
  };

  const handleToggleShoppingItem = (id: string) => {
    setShoppingItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveShoppingItem = (id: string) => {
    setShoppingItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCompleted = () => {
    setShoppingItems(prev => prev.filter(item => !item.checked));
  };

  const handleAddNote = (note: Omit<RecipeNote, 'id' | 'createdAt'>) => {
    const newNote: RecipeNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setRecipeNotes(prev => [...prev, newNote]);
  };

  const handleUpdateNote = (id: string, note: string, rating: number) => {
    setRecipeNotes(prev => prev.map(n => 
      n.id === id ? { ...n, note, rating } : n
    ));
  };

  const handleDeleteNote = (id: string) => {
    setRecipeNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleClearHistory = () => {
    setRecipeHistory([]);
  };

  const isFavorite = (recipeId: number) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  const sortRecipes = (recipes: RecipeSearchResult[], sort: string) => {
    const sorted = [...recipes];
    switch (sort) {
      case 'time':
        return sorted.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      case 'popular':
        return sorted.sort((a, b) => (b.usedIngredientCount || 0) - (a.usedIngredientCount || 0));
      default:
        return sorted;
    }
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    const sorted = sortRecipes(recipes, sort);
    setRecipes(sorted);
  };

  const handleQuickAddIngredient = (ingredient: string) => {
    const currentIngredients = searchIngredients.includes(ingredient)
      ? searchIngredients
      : [...searchIngredients, ingredient];
    setSearchIngredients(currentIngredients);
    handleSearch(currentIngredients, preferences);
  };

  const calculateStats = () => {
    const avgTime = recipeHistory.length > 0
      ? Math.round(recipeHistory.reduce((sum, item) => {
          const recipe = recipes.find(r => r.id === item.recipeId);
          return sum + (recipe?.readyInMinutes || 30);
        }, 0) / recipeHistory.length)
      : 0;

    return {
      totalRecipesViewed: recipeHistory.length,
      totalFavorites: favorites.length,
      totalMealPlans: mealPlans.length,
      averageCookingTime: avgTime
    };
  };

  const handleRetry = () => {
    setError(null);
    if (selectedCategory) {
      handleCategorySearch(selectedCategory);
    }
  };

  const renderContent = () => {
    if (error && currentState === 'search') {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <ErrorMessage 
            message={error} 
            onRetry={handleRetry}
            darkMode={darkMode} 
          />
        </div>
      );
    }

    switch (currentState) {
      case 'search':
        return (
          <div className="space-y-8 sm:space-y-12">
            <HeroSection darkMode={darkMode} />

            {recipeHistory.length > 0 && (
              <RecipeStats
                {...calculateStats()}
                darkMode={darkMode}
              />
            )}

            <SearchBar
              onSearch={handleSearch}
              loading={loading}
              darkMode={darkMode}
              preferences={preferences}
              onPreferencesChange={setPreferences}
            />

            <QuickAddIngredients
              onAddIngredient={handleQuickAddIngredient}
              darkMode={darkMode}
            />

            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                handleCategorySearch(category);
              }}
              darkMode={darkMode}
            />
            
            {recipes.length > 0 && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <RecipeFilters
                  onSortChange={handleSortChange}
                  currentSort={sortBy}
                  darkMode={darkMode}
                />
                <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Recipes` : `Found ${recipes.length} Recipe${recipes.length !== 1 ? 's' : ''}`}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                  {recipes.slice((currentPage - 1) * 12, currentPage * 12).map(recipe => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={handleRecipeClick}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={isFavorite(recipe.id)}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  darkMode={darkMode}
                />
              </div>
            )}
          </div>
        );
      
      case 'detail':
        return selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => setCurrentState('search')}
            onAddToShoppingList={handleAddToShoppingList}
            onToggleFavorite={handleToggleFavorite}
            onAddToMealPlan={() => setShowMealPlanModal(true)}
            onShowTimer={() => setShowCookingTimer(true)}
            isFavorite={isFavorite(selectedRecipe.id)}
            darkMode={darkMode}
            notes={recipeNotes}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        );
      
      case 'favorites':
        return (
          <FavoritesList
            favorites={favorites}
            onBack={() => setCurrentState('search')}
            onRecipeClick={handleRecipeClick}
            onRemoveFavorite={handleRemoveFavorite}
            darkMode={darkMode}
          />
        );
      
      case 'mealplan':
        return (
          <MealPlanner
            mealPlans={mealPlans}
            onBack={() => setCurrentState('search')}
            onAddMeal={handleAddToMealPlan}
            onRemoveMeal={handleRemoveMealPlan}
            onRecipeClick={handleRecipeClick}
            darkMode={darkMode}
          />
        );
      
      case 'shopping':
        return (
          <ShoppingList
            items={shoppingItems}
            onBack={() => setCurrentState('search')}
            onToggleItem={handleToggleShoppingItem}
            onRemoveItem={handleRemoveShoppingItem}
            onClearCompleted={handleClearCompleted}
            darkMode={darkMode}
          />
        );
      
      case 'about':
        return (
          <AboutSection
            onBack={() => setCurrentState('search')}
            darkMode={darkMode}
          />
        );
      
      case 'nutrition':
        return (
          <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6">
            <button
              onClick={() => setCurrentState('search')}
              className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <NutritionTracker
              goals={nutritionGoals}
              onGoalsChange={setNutritionGoals}
              mealPlans={mealPlans}
              recipes={recipes.map(r => ({ ...r, nutrition: { calories: 400, protein: '25g', carbs: '30g', fat: '15g' } }))}
              darkMode={darkMode}
            />
          </div>
        );
      
      case 'history':
        return (
          <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6">
            <button
              onClick={() => setCurrentState('search')}
              className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <RecipeHistory
              history={recipeHistory}
              onRecipeClick={handleRecipeClick}
              onClearHistory={handleClearHistory}
              darkMode={darkMode}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 relative">
      <BackgroundOverlay darkMode={darkMode} />
      
      <Header 
        darkMode={darkMode} 
        onToggleTheme={() => setDarkMode(!darkMode)}
        onAboutClick={() => setCurrentState('about')}
      />
      
      {currentState === 'search' && (
        <FloatingActionButtons
          favorites={favorites.length}
          mealPlans={mealPlans.length}
          shoppingItems={shoppingItems.length}
          onFavoritesClick={() => setCurrentState('favorites')}
          onMealPlanClick={() => setCurrentState('mealplan')}
          onShoppingClick={() => setCurrentState('shopping')}
          onNutritionClick={() => setCurrentState('nutrition')}
          onHistoryClick={() => setCurrentState('history')}
        />
      )}

      <div className="relative z-10">
        {renderContent()}
      </div>

      {showMealPlanModal && selectedRecipe && (
        <div className="fixed inset-0 z-50">
          <MealPlanModal
            recipe={selectedRecipe}
            onClose={() => setShowMealPlanModal(false)}
            onAddToMealPlan={handleAddToMealPlan}
            darkMode={darkMode}
          />
        </div>
      )}

      {showCookingTimer && (
        <div className="fixed inset-0 z-50">
          <CookingTimer
            darkMode={darkMode}
            onClose={() => setShowCookingTimer(false)}
          />
        </div>
      )}

      {loading && currentState !== 'search' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`p-8 rounded-3xl shadow-2xl backdrop-blur-xl border ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-orange-200/50'
          }`}>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent mx-auto mb-6"></div>
            <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;