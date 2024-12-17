import { UserInfo, Goal, Restaurant, MealPlanPreferences } from '../types';
import { Edit2 } from 'lucide-react';

interface UserSummaryCardProps {
  userInfo: UserInfo;
  goal: Goal;
  restaurants: Restaurant[];
  preferences: MealPlanPreferences;
  onEdit: () => void;
}

export default function UserSummaryCard({
  userInfo,
  goal,
  restaurants,
  preferences,
  onEdit,
}: UserSummaryCardProps) {
  return (
    <div className="neu-card mb-8 bg-yellow-50">
      <div className="flex justify-between items-start mb-4">
        <h2 className="neu-heading">Your Profile</h2>
        <button
          onClick={onEdit}
          className="neu-button bg-blue-300"
          title="Edit preferences"
        >
          <Edit2 className="w-5 h-5" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-xl mb-2">Personal Info</h3>
          <ul className="space-y-2">
            <li>Height: {userInfo.height} cm</li>
            <li>Weight: {userInfo.weight} kg</li>
            <li>Age: {userInfo.age} years</li>
            <li>Gender: {userInfo.gender}</li>
            <li>Activity Level: {userInfo.activityLevel}</li>
          </ul>
        </div>

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
      </div>

      {restaurants.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-xl mb-2">Favorite Restaurants</h3>
          <div className="flex flex-wrap gap-2">
            {restaurants.map((restaurant, index) => (
              <span key={index} className="bg-white px-3 py-1 rounded-full border-2 border-black">
                {restaurant.name} ({restaurant.cuisineType})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}