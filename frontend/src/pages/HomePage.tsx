import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">🍽️ RandomMenu</h1>
          <p className="text-xl text-gray-600 mb-8">
            Can't decide what to eat? Let RandomMenu help you create the perfect meal!
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🎲</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Randomized Menus</h3>
            <p className="text-gray-600">
              Let our algorithm create unique menu combinations for you or your team.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Rate & Review</h3>
            <p className="text-gray-600">
              Rate foods and drinks with 1-5 stars and share your favorite combinations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Find Restaurants</h3>
            <p className="text-gray-600">
              Link your menu items to restaurants that serve them and discover new places.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
