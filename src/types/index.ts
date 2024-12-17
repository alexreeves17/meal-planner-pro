export interface UserInfo {
  height: number;
  weight: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  age: number;
}

export interface Goal {
  type: 'lose' | 'gain' | 'maintain';
  amount?: number; // pounds per month
}

export interface Restaurant {
  name: string;
  cuisineType: string;
}

export interface Recipe {
  id: string; // Added to track unique recipes
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealPlanPreferences {
  numBreakfastRecipes: number;
  numLunchRecipes: number;
  numDinnerRecipes: number;
  numSnackRecipes: number;
}

export interface MealPlan {
  days: {
    date: string;
    meals: {
      breakfast: Recipe;
      lunch: Recipe;
      dinner: Recipe;
      snacks: Recipe[];
    };
  }[];
  groceryList: string[];
  prepSchedule: string[];
}

export interface SavedRecipes {
  [recipeId: string]: Recipe;
}