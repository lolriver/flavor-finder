const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || 'demo';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export interface SearchFilters {
  diet?: string;
  intolerances?: string;
  cuisine?: string;
  maxReadyTime?: number;
  type?: string;
  offset?: number;
  number?: number;
}

export class RecipeAPI {
  private static instance: RecipeAPI;
  private apiKey: string;

  private constructor() {
    this.apiKey = API_KEY;
    console.log('RecipeAPI initialized with key:', this.apiKey ? 'API key found' : 'No API key');
  }

  public static getInstance(): RecipeAPI {
    if (!RecipeAPI.instance) {
      RecipeAPI.instance = new RecipeAPI();
    }
    return RecipeAPI.instance;
  }

  public setApiKey(key: string) {
    this.apiKey = key;
  }

  async searchRecipesByIngredients(
    ingredients: string[],
    filters: SearchFilters = {}
  ): Promise<any[]> {
    if (!this.apiKey || this.apiKey === 'demo') {
      console.log('Using mock data for ingredient search - no API key');
      return this.getMockRecipes(filters.offset || 0);
    }

    try {
      const ingredientString = ingredients.join(',');
      const params = new URLSearchParams({
        ingredients: ingredientString,
        number: (filters.number || 12).toString(),
        offset: (filters.offset || 0).toString(),
        apiKey: this.apiKey
      });

      if (filters.diet) params.append('diet', filters.diet);
      if (filters.intolerances) params.append('intolerances', filters.intolerances);
      if (filters.maxReadyTime) params.append('maxReadyTime', filters.maxReadyTime.toString());

      console.log('Fetching recipes from API by ingredients...');
      const response = await fetch(`${BASE_URL}/findByIngredients?${params}`);

      if (!response.ok) {
        console.error(`API request failed: ${response.status}`);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('API returned', data.length, 'recipes');
      return data;
    } catch (error) {
      console.error('Error searching recipes:', error);
      return this.getMockRecipes(filters.offset || 0);
    }
  }

  async getRecipeDetails(id: number): Promise<any> {
    if (!this.apiKey || this.apiKey === 'demo') {
      console.log('Using mock data for recipe details - no API key');
      return this.getMockRecipeDetails(id);
    }

    try {
      console.log('Fetching recipe details from API for recipe:', id);
      const response = await fetch(
        `${BASE_URL}/${id}/information?includeNutrition=true&apiKey=${this.apiKey}`
      );

      if (!response.ok) {
        console.error(`API request failed: ${response.status}`);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('API returned details for recipe:', data.title);
      return data;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return this.getMockRecipeDetails(id);
    }
  }

  async searchRecipesByCategory(
    category: string,
    filters: SearchFilters = {}
  ): Promise<any[]> {
    if (!this.apiKey || this.apiKey === 'demo') {
      console.log('Using mock data for category search - no API key');
      return this.getMockRecipesByCategory(category, filters.offset || 0);
    }

    try {
      const params = new URLSearchParams({
        type: category,
        number: (filters.number || 12).toString(),
        offset: (filters.offset || 0).toString(),
        apiKey: this.apiKey
      });

      if (filters.diet) params.append('diet', filters.diet);
      if (filters.intolerances) params.append('intolerances', filters.intolerances);
      if (filters.maxReadyTime) params.append('maxReadyTime', filters.maxReadyTime.toString());
      if (filters.cuisine) params.append('cuisine', filters.cuisine);

      console.log('Fetching recipes from API for category:', category);
      const response = await fetch(`${BASE_URL}/complexSearch?${params}`);

      if (!response.ok) {
        console.error(`API request failed: ${response.status}`);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('API returned', data.results?.length || 0, 'recipes for', category);
      return data.results || [];
    } catch (error) {
      console.error('Error searching recipes by category:', error);
      return this.getMockRecipesByCategory(category, filters.offset || 0);
    }
  }

  private getMockRecipes(offset: number = 0) {
    const allRecipes = [
      {
        id: 1,
        title: "Chicken Tomato Garlic Pasta",
        image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
        summary: "A delicious pasta dish with tender chicken, fresh tomatoes, and aromatic garlic.",
        readyInMinutes: 30,
        servings: 4,
        usedIngredientCount: 3,
        missedIngredientCount: 2
      },
      {
        id: 2,
        title: "Garlic Herb Chicken Breast",
        image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400",
        summary: "Juicy chicken breast seasoned with garlic and fresh herbs.",
        readyInMinutes: 25,
        servings: 2,
        usedIngredientCount: 2,
        missedIngredientCount: 3
      },
      {
        id: 3,
        title: "Fresh Tomato Basil Salad",
        image: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=400",
        summary: "A refreshing salad with ripe tomatoes, fresh basil, and olive oil dressing.",
        readyInMinutes: 10,
        servings: 4,
        usedIngredientCount: 2,
        missedIngredientCount: 1
      },
      {
        id: 4,
        title: "Garlic Roasted Vegetables",
        image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400",
        summary: "Colorful vegetables roasted to perfection with garlic and herbs.",
        readyInMinutes: 45,
        servings: 6,
        usedIngredientCount: 1,
        missedIngredientCount: 4
      },
      {
        id: 5,
        title: "Mediterranean Quinoa Bowl",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        summary: "Healthy quinoa bowl with Mediterranean vegetables and feta cheese.",
        readyInMinutes: 20,
        servings: 2,
        usedIngredientCount: 2,
        missedIngredientCount: 3
      },
      {
        id: 6,
        title: "Spicy Thai Curry",
        image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
        summary: "Aromatic Thai curry with coconut milk and fresh vegetables.",
        readyInMinutes: 35,
        servings: 4,
        usedIngredientCount: 1,
        missedIngredientCount: 5
      }
    ];

    return allRecipes.slice(offset, offset + 12);
  }

  private getMockRecipesByCategory(category: string, offset: number = 0) {
    const categoryRecipes = {
      'main course': [
        {
          id: 201,
          title: "Grilled Salmon with Lemon Butter",
          image: "https://images.pexels.com/photos/3296368/pexels-photo-3296368.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Perfectly grilled salmon fillet with a rich lemon butter sauce.",
          readyInMinutes: 20,
          servings: 2,
          usedIngredientCount: 3,
          missedIngredientCount: 2
        },
        {
          id: 202,
          title: "Beef Stir Fry with Vegetables",
          image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Tender beef strips with crisp vegetables in a savory sauce.",
          readyInMinutes: 25,
          servings: 4,
          usedIngredientCount: 2,
          missedIngredientCount: 3
        },
        {
          id: 203,
          title: "Margherita Pizza",
          image: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
          readyInMinutes: 30,
          servings: 4,
          usedIngredientCount: 2,
          missedIngredientCount: 2
        },
        {
          id: 204,
          title: "Chicken Teriyaki Bowl",
          image: "https://images.pexels.com/photos/3872373/pexels-photo-3872373.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Glazed chicken teriyaki served over steamed rice with vegetables.",
          readyInMinutes: 35,
          servings: 3,
          usedIngredientCount: 3,
          missedIngredientCount: 1
        },
        {
          id: 205,
          title: "Spaghetti Carbonara",
          image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Creamy Italian pasta with bacon, eggs, and parmesan cheese.",
          readyInMinutes: 20,
          servings: 4,
          usedIngredientCount: 2,
          missedIngredientCount: 3
        },
        {
          id: 206,
          title: "Lamb Curry",
          image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Tender lamb in a rich, aromatic curry sauce.",
          readyInMinutes: 60,
          servings: 6,
          usedIngredientCount: 1,
          missedIngredientCount: 4
        },
        {
          id: 207,
          title: "Shrimp Scampi",
          image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Succulent shrimp in garlic butter and white wine sauce.",
          readyInMinutes: 15,
          servings: 3,
          usedIngredientCount: 3,
          missedIngredientCount: 2
        },
        {
          id: 208,
          title: "Vegetable Lasagna",
          image: "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Layered pasta with mixed vegetables, ricotta, and marinara sauce.",
          readyInMinutes: 55,
          servings: 8,
          usedIngredientCount: 2,
          missedIngredientCount: 3
        }
      ],
      'dessert': [
        {
          id: 101,
          title: "Chocolate Chip Cookies",
          image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Classic homemade chocolate chip cookies with a crispy edge and chewy center.",
          readyInMinutes: 25,
          servings: 24,
          usedIngredientCount: 2,
          missedIngredientCount: 2
        },
        {
          id: 102,
          title: "Tiramisu",
          image: "https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Italian coffee-flavored dessert with layers of mascarpone cream.",
          readyInMinutes: 30,
          servings: 8,
          usedIngredientCount: 1,
          missedIngredientCount: 4
        },
        {
          id: 103,
          title: "New York Cheesecake",
          image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Rich and creamy classic cheesecake with graham cracker crust.",
          readyInMinutes: 90,
          servings: 12,
          usedIngredientCount: 2,
          missedIngredientCount: 3
        },
        {
          id: 104,
          title: "Chocolate Lava Cake",
          image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Individual chocolate cakes with a molten chocolate center.",
          readyInMinutes: 20,
          servings: 4,
          usedIngredientCount: 3,
          missedIngredientCount: 1
        },
        {
          id: 105,
          title: "Apple Pie",
          image: "https://images.pexels.com/photos/1166398/pexels-photo-1166398.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Traditional apple pie with cinnamon and a flaky crust.",
          readyInMinutes: 75,
          servings: 8,
          usedIngredientCount: 2,
          missedIngredientCount: 3
        },
        {
          id: 106,
          title: "Crème Brûlée",
          image: "https://images.pexels.com/photos/3992204/pexels-photo-3992204.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "French custard dessert with a caramelized sugar crust.",
          readyInMinutes: 50,
          servings: 6,
          usedIngredientCount: 1,
          missedIngredientCount: 3
        },
        {
          id: 107,
          title: "Strawberry Shortcake",
          image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Light biscuit with fresh strawberries and whipped cream.",
          readyInMinutes: 30,
          servings: 6,
          usedIngredientCount: 2,
          missedIngredientCount: 2
        },
        {
          id: 108,
          title: "Brownies",
          image: "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Fudgy chocolate brownies with a crispy top.",
          readyInMinutes: 35,
          servings: 16,
          usedIngredientCount: 3,
          missedIngredientCount: 2
        },
        {
          id: 109,
          title: "Panna Cotta",
          image: "https://images.pexels.com/photos/1120468/pexels-photo-1120468.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Italian cream dessert with berry compote.",
          readyInMinutes: 20,
          servings: 4,
          usedIngredientCount: 1,
          missedIngredientCount: 3
        },
        {
          id: 110,
          title: "Lemon Tart",
          image: "https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Tangy lemon curd in a buttery pastry shell.",
          readyInMinutes: 60,
          servings: 8,
          usedIngredientCount: 2,
          missedIngredientCount: 3
        }
      ],
      'appetizer': [
        {
          id: 301,
          title: "Bruschetta",
          image: "https://images.pexels.com/photos/1162361/pexels-photo-1162361.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Toasted bread topped with fresh tomatoes, garlic, and basil.",
          readyInMinutes: 15,
          servings: 6,
          usedIngredientCount: 3,
          missedIngredientCount: 1
        },
        {
          id: 302,
          title: "Chicken Wings",
          image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Crispy baked wings with buffalo sauce.",
          readyInMinutes: 40,
          servings: 4,
          usedIngredientCount: 2,
          missedIngredientCount: 2
        },
        {
          id: 303,
          title: "Spring Rolls",
          image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Fresh Vietnamese spring rolls with shrimp and vegetables.",
          readyInMinutes: 20,
          servings: 8,
          usedIngredientCount: 2,
          missedIngredientCount: 3
        },
        {
          id: 304,
          title: "Stuffed Mushrooms",
          image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Button mushrooms filled with cheese and herbs.",
          readyInMinutes: 25,
          servings: 12,
          usedIngredientCount: 2,
          missedIngredientCount: 2
        },
        {
          id: 305,
          title: "Caprese Skewers",
          image: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Cherry tomatoes, mozzarella, and basil on skewers.",
          readyInMinutes: 10,
          servings: 10,
          usedIngredientCount: 3,
          missedIngredientCount: 1
        },
        {
          id: 306,
          title: "Spinach Artichoke Dip",
          image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Creamy dip with spinach, artichokes, and cheese.",
          readyInMinutes: 30,
          servings: 8,
          usedIngredientCount: 1,
          missedIngredientCount: 4
        }
      ],
      'breakfast': [
        {
          id: 401,
          title: "Pancakes with Maple Syrup",
          image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Fluffy buttermilk pancakes served with butter and maple syrup.",
          readyInMinutes: 20,
          servings: 4,
          usedIngredientCount: 2,
          missedIngredientCount: 3
        },
        {
          id: 402,
          title: "French Toast",
          image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Classic French toast with cinnamon and powdered sugar.",
          readyInMinutes: 15,
          servings: 3,
          usedIngredientCount: 3,
          missedIngredientCount: 2
        },
        {
          id: 403,
          title: "Avocado Toast",
          image: "https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Whole grain toast topped with smashed avocado and poached egg.",
          readyInMinutes: 10,
          servings: 2,
          usedIngredientCount: 3,
          missedIngredientCount: 1
        },
        {
          id: 404,
          title: "Belgian Waffles",
          image: "https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Crispy waffles with fresh berries and whipped cream.",
          readyInMinutes: 25,
          servings: 4,
          usedIngredientCount: 2,
          missedIngredientCount: 3
        },
        {
          id: 405,
          title: "Breakfast Burrito",
          image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Scrambled eggs, cheese, and sausage wrapped in a warm tortilla.",
          readyInMinutes: 15,
          servings: 2,
          usedIngredientCount: 3,
          missedIngredientCount: 2
        },
        {
          id: 406,
          title: "Eggs Benedict",
          image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Poached eggs on English muffins with hollandaise sauce.",
          readyInMinutes: 30,
          servings: 2,
          usedIngredientCount: 2,
          missedIngredientCount: 3
        },
        {
          id: 407,
          title: "Overnight Oats",
          image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Oats soaked overnight with fruits, nuts, and honey.",
          readyInMinutes: 5,
          servings: 1,
          usedIngredientCount: 3,
          missedIngredientCount: 1
        },
        {
          id: 408,
          title: "Bacon and Eggs",
          image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400",
          summary: "Classic breakfast with crispy bacon and fried eggs.",
          readyInMinutes: 15,
          servings: 2,
          usedIngredientCount: 2,
          missedIngredientCount: 1
        }
      ]
    };

    return categoryRecipes[category as keyof typeof categoryRecipes] || [];
  }

  private getMockRecipeDetails(id: number) {
    const recipes = {
      1: {
        id: 1,
        title: "Chicken Tomato Garlic Pasta",
        image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=600",
        summary: "A delicious pasta dish with tender chicken, fresh tomatoes, and aromatic garlic that brings together Mediterranean flavors in perfect harmony.",
        readyInMinutes: 30,
        servings: 4,
        instructions: `<ol><li>Cook pasta according to package directions until al dente.</li><li>Season chicken with salt and pepper, then cook in olive oil until golden brown.</li><li>Add minced garlic and cook for 30 seconds until fragrant.</li><li>Add diced tomatoes and cook until they start to break down.</li><li>Toss cooked pasta with chicken and tomato mixture.</li><li>Garnish with fresh basil and parmesan cheese.</li></ol>`,
        extendedIngredients: [
          { id: 1, name: "chicken breast", amount: 1, unit: "lb", original: "1 lb chicken breast, diced" },
          { id: 2, name: "pasta", amount: 12, unit: "oz", original: "12 oz pasta" },
          { id: 3, name: "tomatoes", amount: 2, unit: "cups", original: "2 cups diced tomatoes" },
          { id: 4, name: "garlic", amount: 4, unit: "cloves", original: "4 cloves garlic, minced" },
          { id: 5, name: "olive oil", amount: 2, unit: "tbsp", original: "2 tbsp olive oil" },
          { id: 6, name: "fresh basil", amount: 0.25, unit: "cup", original: "1/4 cup fresh basil" }
        ],
        nutrition: {
          calories: 520,
          protein: "32g",
          carbs: "48g",
          fat: "18g"
        }
      },
      2: {
        id: 2,
        title: "Garlic Herb Chicken Breast",
        image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=600",
        summary: "Juicy chicken breast seasoned with garlic and fresh herbs, perfect for a healthy dinner.",
        readyInMinutes: 25,
        servings: 2,
        instructions: `<ol><li>Preheat oven to 375°F.</li><li>Mix minced garlic with herbs and olive oil.</li><li>Season chicken breasts with salt and pepper.</li><li>Rub herb mixture all over chicken.</li><li>Bake for 20-25 minutes until internal temperature reaches 165°F.</li><li>Let rest for 5 minutes before serving.</li></ol>`,
        extendedIngredients: [
          { id: 1, name: "chicken breast", amount: 2, unit: "pieces", original: "2 chicken breasts" },
          { id: 2, name: "garlic", amount: 3, unit: "cloves", original: "3 cloves garlic, minced" },
          { id: 3, name: "rosemary", amount: 1, unit: "tbsp", original: "1 tbsp fresh rosemary" },
          { id: 4, name: "thyme", amount: 1, unit: "tbsp", original: "1 tbsp fresh thyme" },
          { id: 5, name: "olive oil", amount: 2, unit: "tbsp", original: "2 tbsp olive oil" }
        ],
        nutrition: {
          calories: 320,
          protein: "42g",
          carbs: "2g",
          fat: "14g"
        }
      }
    };

    return recipes[id as keyof typeof recipes] || recipes[1];
  }
}