import { useAuth } from '../context/AuthContext';
import { useCreateModal } from '../context/CreateModalContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  const { setShowCreateMenuModal, setShowCreateItemModal } = useCreateModal();
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          🍽️ RandomMenu
        </Link>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-100 font-medium">
                Dashboard
              </Link>

              {/* Create Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 font-medium flex items-center gap-2"
                >
                  ➕ Create
                  <span className={`transform ${showCreateDropdown ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {showCreateDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={() => {
                        setShowCreateMenuModal(true);
                        setShowCreateDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium"
                    >
                      📋 Create Menu
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateItemModal(true);
                        setShowCreateDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium"
                    >
                      🍽️ Add Menu Item
                    </button>
                  </div>
                )}
              </div>

              {isAdmin && (
                <Link to="/admin" className="hover:text-blue-100 font-semibold">
                  Admin Panel
                </Link>
              )}
              <span className="text-blue-100">Hi, {user?.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-100">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
