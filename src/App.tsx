import { useState } from 'react';
import { UserInfo, Goal, Restaurant, MealPlan, MealPlanPreferences, Recipe, SavedRecipes } from './types';
import UserInfoForm from './components/UserInfoForm';
import MealPlanDisplay from './components/MealPlanDisplay';
import UserSummaryCard from './components/UserSummaryCard';
import './styles/neubrutalism.css';

function App() {
  const sampleRecipe = (id: string): Recipe => ({
    id,
    name: 'Oatmeal with Berries',
    ingredients: ['oats', 'berries', 'honey'],
    instructions: ['Cook oats', 'Add berries', 'Drizzle honey'],
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    calories: 300,
    protein: 10,
    carbs: 45,
    fat: 8,
  });

  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipes>({});
  const [userData, setUserData] = useState<{
    userInfo: UserInfo;
    goal: Goal;
    restaurants: Restaurant[];
    mealPlanPreferences: MealPlanPreferences;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (data: {
    userInfo: UserInfo;
    goal: Goal;
    restaurants: Restaurant[];
    mealPlanPreferences: MealPlanPreferences;
  }) => {
    setUserData(data);
    setIsEditing(false);
    
    // Generate meal plan logic remains the same...
    const sampleMealPlan: MealPlan = {
      days: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
        meals: {
          breakfast: sampleRecipe(`breakfast-${i}`),
          lunch: sampleRecipe(`lunch-${i}`),
          dinner: sampleRecipe(`dinner-${i}`),
          snacks: [sampleRecipe(`snack-${i}`)],
        },
      })),
      groceryList: ['Oats', 'Mixed berries', 'Honey'],
      prepSchedule: [
        'Sunday: Grocery shopping and meal prep',
        'Portion out ingredients',
        'Package individual meal components',
      ],
    };

    setMealPlan(sampleMealPlan);
  };

  const handleBookmarkRecipe = (recipe: Recipe) => {
    setSavedRecipes(prev => {
      const newSaved = { ...prev };
      if (newSaved[recipe.id]) {
        delete newSaved[recipe.id];
      } else {
        newSaved[recipe.id] = recipe;
      }
      return newSaved;
    });
  };

  const handleRefreshRecipe = (recipeId: string, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    if (!mealPlan) return;
    
    // Create a new recipe with the same ID but different content
    const newRecipe = {
      ...sampleRecipe(recipeId),
      name: `New ${mealType} Recipe`,
    };

    // Update all instances of this recipe in the meal plan
    const updatedDays = mealPlan.days.map(day => ({
      ...day,
      meals: {
        ...day.meals,
        [mealType]: day.meals[mealType].id === recipeId ? newRecipe : day.meals[mealType],
        snacks: day.meals.snacks.map(snack => 
          snack.id === recipeId ? newRecipe : snack
        ),
      },
    }));

    setMealPlan({
      ...mealPlan,
      days: updatedDays,
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F0EA]">
      <header className="bg-yellow-300 border-b-4 border-black">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-4xl font-black text-black">Meal Planner Pro</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {(!mealPlan || isEditing) ? (
          <UserInfoForm 
            onSubmit={handleSubmit}
            initialData={userData || undefined}
          />
        ) : (
          <>
            {userData && (
              <UserSummaryCard
                {...userData}
                preferences={userData.mealPlanPreferences}
                onEdit={() => setIsEditing(true)}
              />
            )}
            <MealPlanDisplay
              mealPlan={mealPlan}
              savedRecipes={savedRecipes}
              onBookmarkRecipe={handleBookmarkRecipe}
              onRefreshRecipe={handleRefreshRecipe}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;