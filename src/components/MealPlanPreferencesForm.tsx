import { MealPlanPreferences } from '../types';

interface MealPlanPreferencesFormProps {
  preferences: MealPlanPreferences;
  onChange: (preferences: MealPlanPreferences) => void;
}

export default function MealPlanPreferencesForm({
  preferences,
  onChange,
}: MealPlanPreferencesFormProps) {
  const handleChange = (field: keyof MealPlanPreferences, value: number) => {
    onChange({
      ...preferences,
      [field]: value,
    });
  };

  return (
    <div className="neu-card bg-purple-50">
      <h2 className="neu-heading">Meal Variety Preferences</h2>
      <p className="text-lg mb-6">
        Choose how many different recipes you want for each meal type throughout the week.
        Enter 1 to have the same meal every day, or a higher number for more variety.
      </p>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block font-bold mb-2">
            Number of Breakfast Recipes
          </label>
          <input
            type="number"
            min="1"
            max="7"
            className="neu-input w-full"
            value={preferences.numBreakfastRecipes}
            onChange={(e) => handleChange('numBreakfastRecipes', Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>

        <div>
          <label className="block font-bold mb-2">
            Number of Lunch Recipes
          </label>
          <input
            type="number"
            min="1"
            max="7"
            className="neu-input w-full"
            value={preferences.numLunchRecipes}
            onChange={(e) => handleChange('numLunchRecipes', Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>

        <div>
          <label className="block font-bold mb-2">
            Number of Dinner Recipes
          </label>
          <input
            type="number"
            min="1"
            max="7"
            className="neu-input w-full"
            value={preferences.numDinnerRecipes}
            onChange={(e) => handleChange('numDinnerRecipes', Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>

        <div>
          <label className="block font-bold mb-2">
            Number of Snack Recipes
          </label>
          <input
            type="number"
            min="1"
            max="7"
            className="neu-input w-full"
            value={preferences.numSnackRecipes}
            onChange={(e) => handleChange('numSnackRecipes', Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>
      </div>
    </div>
  );
}