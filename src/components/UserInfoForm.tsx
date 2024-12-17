import React from 'react';
import { UserInfo, Goal, Restaurant, MealPlanPreferences } from '../types';
import MealPlanPreferencesForm from './MealPlanPreferencesForm';

interface UserInfoFormProps {
  onSubmit: (data: {
    userInfo: UserInfo;
    goal: Goal;
    restaurants: Restaurant[];
    mealPlanPreferences: MealPlanPreferences;
  }) => void;
  initialData?: {
    userInfo: UserInfo;
    goal: Goal;
    restaurants: Restaurant[];
    mealPlanPreferences: MealPlanPreferences;
  };
}

export default function UserInfoForm({ onSubmit, initialData }: UserInfoFormProps) {
  const [userInfo, setUserInfo] = React.useState<UserInfo>(
    initialData?.userInfo || {
      height: 0,
      weight: 0,
      gender: 'other',
      activityLevel: 'moderate',
      age: 0,
    }
  );

  const [goal, setGoal] = React.useState<Goal>(
    initialData?.goal || {
      type: 'maintain',
    }
  );

  const [restaurants, setRestaurants] = React.useState<Restaurant[]>(
    initialData?.restaurants || []
  );
  const [newRestaurant, setNewRestaurant] = React.useState({ name: '', cuisineType: '' });

  const [mealPlanPreferences, setMealPlanPreferences] = React.useState<MealPlanPreferences>(
    initialData?.mealPlanPreferences || {
      numBreakfastRecipes: 1,
      numLunchRecipes: 1,
      numDinnerRecipes: 1,
      numSnackRecipes: 1,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ userInfo, goal, restaurants, mealPlanPreferences });
  };

  const addRestaurant = () => {
    if (newRestaurant.name && newRestaurant.cuisineType) {
      setRestaurants([...restaurants, newRestaurant]);
      setNewRestaurant({ name: '', cuisineType: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
      <div className="neu-card bg-pink-50">
        <h2 className="neu-heading">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-2">Height (cm)</label>
            <input
              type="number"
              className="neu-input w-full"
              value={userInfo.height}
              onChange={(e) => setUserInfo({ ...userInfo, height: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Weight (kg)</label>
            <input
              type="number"
              className="neu-input w-full"
              value={userInfo.weight}
              onChange={(e) => setUserInfo({ ...userInfo, weight: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Age</label>
            <input
              type="number"
              className="neu-input w-full"
              value={userInfo.age}
              onChange={(e) => setUserInfo({ ...userInfo, age: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Gender</label>
            <select
              className="neu-select w-full"
              value={userInfo.gender}
              onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value as UserInfo['gender'] })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block font-bold mb-2">Activity Level</label>
            <select
              className="neu-select w-full"
              value={userInfo.activityLevel}
              onChange={(e) => setUserInfo({ ...userInfo, activityLevel: e.target.value as UserInfo['activityLevel'] })}
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light Activity</option>
              <option value="moderate">Moderate Activity</option>
              <option value="very">Very Active</option>
              <option value="extra">Extra Active</option>
            </select>
          </div>
        </div>
      </div>

      <div className="neu-card bg-green-50">
        <h2 className="neu-heading">Goals</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-bold mb-2">Goal Type</label>
            <select
              className="neu-select w-full"
              value={goal.type}
              onChange={(e) => setGoal({ ...goal, type: e.target.value as Goal['type'] })}
            >
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>
          {goal.type !== 'maintain' && (
            <div>
              <label className="block font-bold mb-2">Amount (lbs/month)</label>
              <input
                type="number"
                className="neu-input w-full"
                value={goal.amount || ''}
                onChange={(e) => setGoal({ ...goal, amount: Number(e.target.value) })}
              />
            </div>
          )}
        </div>
      </div>

      <div className="neu-card bg-blue-50">
        <h2 className="neu-heading">Favorite Restaurants</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Restaurant name"
              className="neu-input"
              value={newRestaurant.name}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Cuisine type"
              className="neu-input"
              value={newRestaurant.cuisineType}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, cuisineType: e.target.value })}
            />
          </div>
          <button
            type="button"
            onClick={addRestaurant}
            className="neu-button bg-blue-300 w-full"
          >
            Add Restaurant
          </button>
          {restaurants.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {restaurants.map((restaurant, index) => (
                <span key={index} className="bg-white px-3 py-1 rounded-full border-2 border-black">
                  {restaurant.name} ({restaurant.cuisineType})
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <MealPlanPreferencesForm
        preferences={mealPlanPreferences}
        onChange={setMealPlanPreferences}
      />

      <button
        type="submit"
        className="neu-button bg-yellow-300 w-full text-xl"
      >
        Generate Meal Plan
      </button>
    </form>
  );
}