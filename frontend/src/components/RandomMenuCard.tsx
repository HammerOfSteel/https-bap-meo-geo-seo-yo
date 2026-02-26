import { useState, useEffect } from 'react';
import { menuService, MenuItem, Menu } from '../services/menuService';

interface RandomMenuCardProps {
  menus: Menu[];
  onCreateMenuClick?: () => void;
  onItemSelect?: (item: MenuItem) => void;
}

export const RandomMenuCard = ({ menus, onCreateMenuClick, onItemSelect }: RandomMenuCardProps) => {
  const [selectedMenuId, setSelectedMenuId] = useState<string>('');
  const [food, setFood] = useState<MenuItem | null>(null);
  const [drink, setDrink] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (menus.length > 0 && !selectedMenuId) {
      setSelectedMenuId(menus[0].id);
    }
  }, [menus, selectedMenuId]);

  useEffect(() => {
    if (selectedMenuId) {
      loadRandomMenu();
    }
  }, [selectedMenuId]);

  const loadRandomMenu = async () => {
    if (!selectedMenuId) return;
    
    try {
      setLoading(true);
      setError('');
      const result = await menuService.getRandomMenu(selectedMenuId);
      setFood(result.food);
      setDrink(result.drink);
      if (result.food || result.drink) {
        // Auto-play effect
        setTimeout(() => {
          // Music/sound effect could go here
        }, 100);
      }
    } catch (err: any) {
      setError(err.error || 'Failed to load random menu');
    } finally {
      setLoading(false);
    }
  };

  const getRandomItem = () => {
    const items = [food, drink].filter(Boolean);
    return items.length > 0 ? items[Math.floor(Math.random() * items.length)] : null;
  };

  const currentItem = getRandomItem();

  // No menus - show creation prompt
  if (menus.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
          <div className="text-6xl mb-6">🍽️</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">RandomMenu</h1>
          <p className="text-xl text-gray-600 mb-8">Can't decide what to eat? Let chance decide!</p>
          
          <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
            <p className="text-gray-600 mb-8">Create your first menu to start getting random food suggestions!</p>
            <button
              onClick={onCreateMenuClick}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 text-lg w-full"
            >
              + Create Your First Menu
            </button>
          </div>

          <p className="text-gray-500">
            Menus help you organize your favorite foods and drinks. Once you create a menu, you can get random selections!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">🍽️ RandomMenu</h1>
          <p className="text-xl text-gray-600">Can't decide what to eat? Let chance decide!</p>
        </div>

        {/* Menu Selector */}
        <div className="mb-8 flex justify-center">
          <select
            value={selectedMenuId}
            onChange={(e) => setSelectedMenuId(e.target.value)}
            className="px-6 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 font-semibold"
          >
            {menus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.title}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-4 border-t-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Finding something delicious...</p>
          </div>
        ) : currentItem ? (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Image Section */}
            <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 p-8 flex justify-center">
              {currentItem.imageUrl ? (
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.name}
                  className="w-64 h-64 rounded-full object-cover shadow-lg border-8 border-white"
                />
              ) : (
                <div className="w-64 h-64 rounded-full bg-gray-200 flex items-center justify-center text-5xl">
                  {currentItem.itemType === 'FOOD' ? '🍜' : '🥤'}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{currentItem.name}</h2>
                <p className="text-gray-600 text-lg">{currentItem.description}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-t border-b border-gray-200">
                <div className="text-center">
                  <div className="text-gray-600 text-sm">Type</div>
                  <div className="font-semibold text-gray-900">
                    {currentItem.itemType === 'FOOD' ? '🍽️ Food' : '🥤 Drink'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 text-sm">Cuisine</div>
                  <div className="font-semibold text-gray-900">{currentItem.cuisineType}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 text-sm">Rating</div>
                  <div className="font-semibold text-yellow-500">
                    ⭐ {currentItem.rating?.toFixed(1) || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={loadRandomMenu}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 text-lg"
                >
                  🎲 Get Another One
                </button>
                <a
                  href={currentItem.restaurantUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 text-lg text-center"
                >
                  🗺️ Find Restaurant
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <p className="text-gray-600 text-lg">No items available in this menu. Add items to get started!</p>
          </div>
        )}

        {/* Show both food and drink if available */}
        {!loading && food && drink && (
          <div className="mt-8 text-center text-gray-600">
            <p className="text-sm">
              🍽️ Food: {food.name} • 🥤 Drink: {drink.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
