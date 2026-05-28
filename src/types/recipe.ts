export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  instructions: string;
  extendedIngredients: Ingredient[];
  nutrition?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  usedIngredientCount: number;
  missedIngredientCount: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  checked: boolean;
  recipeTitle: string;
  recipeId: number;
}

export interface FavoriteRecipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  savedAt: string;
}

export interface UserPreferences {
  diet?: string;
  intolerances?: string[];
  maxReadyTime?: number;
  cuisine?: string;
}

export interface MealPlan {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeId: number;
  recipeTitle: string;
  recipeImage: string;
}

export interface CookingTimer {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  isActive: boolean;
  isCompleted: boolean;
}

export interface RecipeNote {
  id: string;
  recipeId: number;
  note: string;
  rating: number;
  createdAt: string;
}

export interface NutritionGoals {
  dailyCalories?: number;
  dailyProtein?: number;
  dailyCarbs?: number;
  dailyFat?: number;
}

export interface RecipeHistory {
  id: string;
  recipeId: number;
  recipeTitle: string;
  recipeImage: string;
  viewedAt: string;
  cookCount: number;
}