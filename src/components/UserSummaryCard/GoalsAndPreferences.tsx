import { Goal, MealPlanPreferences } from '../../types';

interface GoalsAndPreferencesProps {
  goal: Goal;
  preferences: MealPlanPreferences;
}

export default function GoalsAndPreferences({ goal, preferences }: GoalsAndPreferencesProps) {
  return (
    <div>
      <h3 className="font-bold text-xl mb-2">Goals</h3>
      <p>{goal.type} {goal.amount && `${goal.amount} lbs/month`}</p>
      
      <h3 className="font-bold text-xl mt-4 mb-2">Meal Variety</h3>
      <ul className="space-y-1">
        <li>Breakfast Recipes: {preferences.numBreakfastRecipes}</li>
        <li>Lunch Recipes: {preferences.numLunchRecipes}</li>
        <li>Dinner Recipes: {preferences.numDinnerRecipes}</li>
        <li>Snack Recipes: {preferences.numSnackRecipes}</li>
      </ul>
    </div>
  );
}