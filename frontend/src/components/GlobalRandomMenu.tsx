import { useState, useEffect } from 'react';
import { menuService, MenuItem } from '../services/menuService';

export const GlobalRandomMenu = () => {
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  const loadRandomItem = async () => {
    try {
      setLoading(true);
      setError('');
      setImageError(false);
      const item = await menuService.getRandomGlobalItem();
      setCurrentItem(item);
    } catch (err: any) {
      setError(err.message || 'Failed to load random item');
      setCurrentItem(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomItem();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">🍽️</h1>
          <h2 className="text-4xl font-bold text-gray-900">What's for Dinner?</h2>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-2xl p-16 text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-4 border-t-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Finding something delicious...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <p className="text-red-600 text-lg mb-6">{error}</p>
            <button
              onClick={loadRandomItem}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : currentItem ? (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Image Section */}
            <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 p-8 flex justify-center">
              {currentItem.imageUrl && !imageError ? (
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.name}
                  onError={() => setImageError(true)}
                  className="w-64 h-64 rounded-full object-cover shadow-lg border-8 border-white"
                />
              ) : (
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-6xl shadow-lg border-8 border-white">
                  {currentItem.itemType === 'FOOD' ? '🍜' : '🥤'}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-gray-900 mb-3">{currentItem.name}</h2>
                <p className="text-gray-600 text-xl leading-relaxed">{currentItem.description}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-3 gap-4 py-8 border-t border-b border-gray-200 mb-8">
                <div className="text-center">
                  <div className="text-gray-600 text-sm">Type</div>
                  <div className="font-semibold text-gray-900 text-lg">
                    {currentItem.itemType === 'FOOD' ? '🍽️ Food' : '🥤 Drink'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 text-sm">Cuisine</div>
                  <div className="font-semibold text-gray-900 text-lg">{currentItem.cuisineType}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 text-sm">Rating</div>
                  <div className="font-semibold text-yellow-500 text-lg">
                    ⭐ {currentItem.rating?.toFixed(1) || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={loadRandomItem}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 text-xl"
                >
                  No... Again 🎲
                </button>
                <a
                  href={currentItem.restaurantUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 text-xl text-center"
                >
                  Find It 🗺️
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <p className="text-gray-600 text-lg">No items available yet. Come back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};
