import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { Lock } from 'lucide-react';
import { ProfilePreview } from './ProfilePreview';

export function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const profile = useProfileStore((state) => state.profile);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Preview Section */}
          <div className="order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Profile Preview</h2>
              <ProfilePreview profile={profile} />
              <p className="text-sm text-gray-500 text-center mt-4">
                This is how your profile will appear to visitors
              </p>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="order-1 md:order-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6">
                <p className="text-sm text-gray-500 text-center">
                  After logging in, you'll be able to customize your profile and manage your products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}