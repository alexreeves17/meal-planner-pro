import { BookmarkPlus, BookmarkCheck, RefreshCw } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  isBookmarked: boolean;
  onBookmark: (recipe: Recipe) => void;
  onRefresh: (recipeId: string, mealType: 'breakfast' | 'lunch' | 'dinner') => void;
}

export default function RecipeCard({
  recipe,
  mealType,
  isBookmarked,
  onBookmark,
  onRefresh,
}: RecipeCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg relative">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-medium text-gray-700 capitalize">{mealType}</h4>
        <div className="flex gap-2">
          <button
            onClick={() => onBookmark(recipe)}
            className="text-gray-600 hover:text-blue-600 transition-colors"
            title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <BookmarkPlus className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => mealType !== 'snack' && onRefresh(recipe.id, mealType)}
            className="text-gray-600 hover:text-green-600 transition-colors"
            title="Get new recipe"
            hidden={mealType === 'snack'}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-medium">{recipe.name}</p>
        <p className="text-sm text-gray-600">
          Calories: {recipe.calories} | 
          Protein: {recipe.protein}g | 
          Carbs: {recipe.carbs}g | 
          Fat: {recipe.fat}g
        </p>
      </div>
    </div>
  );
}