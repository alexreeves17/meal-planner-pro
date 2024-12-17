import { Edit2 } from 'lucide-react';
import { UserInfo, Goal, Restaurant, MealPlanPreferences } from '../../types';
import PersonalInfo from './PersonalInfo';
import GoalsAndPreferences from './GoalsAndPreferences';
import RestaurantList from './RestaurantList';

interface UserSummaryCardProps {
  userInfo: UserInfo;
  goal: Goal;
  restaurants: Restaurant[];
  mealPlanPreferences: MealPlanPreferences;
  onEdit: () => void;
}

export default function UserSummaryCard({
  userInfo,
  goal,
  restaurants,
  mealPlanPreferences,
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
        <PersonalInfo userInfo={userInfo} />
        <GoalsAndPreferences goal={goal} preferences={mealPlanPreferences} />
      </div>

      <RestaurantList restaurants={restaurants} />
    </div>
  );
}