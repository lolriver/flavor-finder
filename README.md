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

## 📝 Commit Strategy

This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Please use the following prefixes for your commit messages:

- `feat:` A new feature (e.g., `feat: add shopping list component`)
- `fix:` A bug fix (e.g., `fix: resolve crash on missing ingredients`)
- `docs:` Documentation only changes (e.g., `docs: update README setup instructions`)
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools and libraries (e.g., `chore: update dependencies`)

