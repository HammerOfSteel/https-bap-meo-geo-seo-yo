import { useState, useEffect } from 'react';
import { menuService, Menu } from '../services/menuService';
import { useCreateModal } from '../context/CreateModalContext';
import { GlobalRandomMenu } from '../components/GlobalRandomMenu';

export const DashboardPage = () => {
  const { showCreateMenuModal, setShowCreateMenuModal } = useCreateModal();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMenuTitle, setNewMenuTitle] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      setLoading(true);
      const data = await menuService.getMenus();
      setMenus(data);
      setError('');
    } catch (err: any) {
      console.error('Failed to load menus:', err);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuTitle.trim()) return;

    try {
      setCreating(true);
      await menuService.createMenu({ title: newMenuTitle });
      setNewMenuTitle('');
      setShowCreateMenuModal(false);
      loadMenus();
    } catch (err: any) {
      setError(err.error || 'Failed to create menu');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteMenu = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu?')) return;

    try {
      await menuService.deleteMenu(id);
      loadMenus();
    } catch (err: any) {
      setError(err.error || 'Failed to delete menu');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Random Menu - the STAR of the dashboard */}
      <GlobalRandomMenu />

      {/* Optional: Menu Management section at bottom (collapsible) */}
      {!loading && menus.length > 0 && (
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Menus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menus.map((menu) => (
                <div
                  key={menu.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{menu.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {menu._count?.items || 0} item{(menu._count?.items || 0) !== 1 ? 's' : ''}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.location.href = `/menus/${menu.id}`}
                      className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
                    >
                      Edit Items
                    </button>
                    <button
                      onClick={() => handleDeleteMenu(menu.id)}
                      className="px-3 bg-red-600 text-white py-2 rounded hover:bg-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Menu Modal - triggered from navbar */}
      {showCreateMenuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Menu</h2>
            <form onSubmit={handleCreateMenu}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Menu Title
                </label>
                <input
                  type="text"
                  value={newMenuTitle}
                  onChange={(e) => setNewMenuTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Korean Favorites, Lunch Ideas"
                  required
                  autoFocus
                />
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                  {error}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateMenuModal(false);
                    setNewMenuTitle('');
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {creating ? 'Creating...' : 'Create Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
