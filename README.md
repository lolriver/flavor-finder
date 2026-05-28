# 🍳 Flavor Finder

![React](https://img.shields.io/badge/React-18.3.1-blue.svg?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E.svg?style=for-the-badge&logo=supabase)

Flavor Finder is a modern, responsive web application designed to help you discover new recipes, save your favorites, plan your meals for the week, and automatically manage your grocery shopping list.

## 🌟 Key Features

- **Smart Recipe Search:** Find the perfect meal based on ingredients, categories, or specific dietary preferences using the Spoonacular API.
- **Detailed Recipe Insights:** View step-by-step cooking instructions, ingredient lists, and full nutritional information.
- **Weekly Meal Planning:** Organize your week by adding recipes directly to a weekly meal planner calendar.
- **Automated Shopping Lists:** Seamlessly generate and manage shopping lists directly from your saved or planned recipes.
- **Favorites & History:** Manage your favorite recipes and keep track of recently viewed items.
- **Personalized Notes:** Add specific cooking notes to recipes you've tried.
- **Theme Toggle:** Built-in Light and Dark mode.

## 🚀 Tech Stack

- **Frontend Framework:** [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend / Auth / DB:** [Supabase](https://supabase.com/)
- **Recipe Data API:** [Spoonacular API](https://spoonacular.com/food-api)

## 🛠️ Local Development Setup

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
   Copy the example environment file and add your actual API keys:
   ```bash
   cp .env.example .env
   ```
   *Required Keys in `.env`:*
   - `VITE_SPOONACULAR_API_KEY`: Get this from your Spoonacular developer dashboard.
   - `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`: Get these from your Supabase project settings.

4. **Available Scripts:**
   - `npm run dev`: Starts the local development server on [http://localhost:5173](http://localhost:5173).
   - `npm run build`: Builds the app for production.
   - `npm run preview`: Bootstraps a local web server to preview your production build.
   - `npm run lint`: Runs ESLint to check for code quality and style issues.
   - `npm run typecheck`: Runs the TypeScript compiler to check for type errors.

## 📝 Commit Strategy

This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Please use the following prefixes for your commit messages:

- `feat:` A new feature (e.g., `feat: add shopping list component`)
- `fix:` A bug fix (e.g., `fix: resolve crash on missing ingredients`)
- `docs:` Documentation only changes (e.g., `docs: update README setup instructions`)
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools and libraries (e.g., `chore: update dependencies`)

