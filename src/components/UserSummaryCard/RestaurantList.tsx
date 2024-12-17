import { Restaurant } from '../../types';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants }: RestaurantListProps) {
  if (restaurants.length === 0) return null;

  return (
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
  );
}