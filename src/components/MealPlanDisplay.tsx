import { MealPlan, Recipe, SavedRecipes } from '../types';
import RecipeCard from './RecipeCard';

interface MealPlanDisplayProps {
  mealPlan: MealPlan;
  savedRecipes: SavedRecipes;
  onBookmarkRecipe: (recipe: Recipe) => void;
  onRefreshRecipe: (recipeId: string, mealType: 'breakfast' | 'lunch' | 'dinner') => void;
}

export default function MealPlanDisplay({
  mealPlan,
  savedRecipes,
  onBookmarkRecipe,
  onRefreshRecipe,
}: MealPlanDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your 7-Day Meal Plan</h2>
        
        <div className="space-y-6">
          {mealPlan.days.map((day, index) => (
            <div key={index} className="border-b pb-6 last:border-b-0">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Day {index + 1} - {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['breakfast', 'lunch', 'dinner'] as const).map((mealType) => (
                  <RecipeCard
                    key={mealType}
                    recipe={day.meals[mealType]}
                    mealType={mealType}
                    isBookmarked={!!savedRecipes[day.meals[mealType].id]}
                    onBookmark={onBookmarkRecipe}
                    onRefresh={onRefreshRecipe}
                  />
                ))}
              </div>

              {day.meals.snacks.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Snacks</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {day.meals.snacks.map((snack, snackIndex) => (
                      <RecipeCard
                        key={snackIndex}
                        recipe={snack}
                        mealType="snack"
                        isBookmarked={!!savedRecipes[snack.id]}
                        onBookmark={onBookmarkRecipe}
                        onRefresh={onRefreshRecipe}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Grocery List</h3>
          <ul className="list-disc list-inside space-y-2">
            {mealPlan.groceryList.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Prep Schedule</h3>
          <ul className="space-y-2">
            {mealPlan.prepSchedule.map((step, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="font-medium text-blue-500">{index + 1}.</span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}