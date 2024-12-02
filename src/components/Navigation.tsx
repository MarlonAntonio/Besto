import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ImagePlus, Images, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/products');
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {isAuthenticated && (
              <Link
                to="/admin"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                  location.pathname === '/admin' ? 'bg-gray-900' : 'hover:bg-gray-700'
                }`}
              >
                <ImagePlus className="w-5 h-5" />
                <span>Add Products</span>
              </Link>
            )}
            <Link
              to="/products"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                location.pathname === '/products' ? 'bg-gray-900' : 'hover:bg-gray-700'
              }`}
            >
              <Images className="w-5 h-5" />
              <span>View Products</span>
            </Link>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}