# Flavor Finder 🍳

Flavor Finder is a modern web application designed to help you discover, save, and plan your meals. 

## 🌟 Features
- **Recipe Search**: Find recipes based on ingredients, categories, or dietary preferences.
- **Detailed Instructions**: View step-by-step cooking instructions and nutritional information.
- **Meal Planning**: Plan your meals for the week easily.
- **Favorites**: Save your favorite recipes for quick access.
- **Shopping List**: Generate and manage shopping lists based on your selected recipes.

## 🚀 Tech Stack
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Spoonacular API](https://spoonacular.com/food-api)

## 🛠️ Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lolriver/flavor-finder.git
   cd flavor-finder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy the `.env.example` file to a new file named `.env` and fill in your Supabase and Spoonacular API keys:
   ```bash
   cp .env.example .env
   ```
   *(Note: Never commit your `.env` file!)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.
