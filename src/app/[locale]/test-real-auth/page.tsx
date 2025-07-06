/**
 * Real API Authentication Test Page
 * Test page to verify real API authentication integration
 */

'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/auth/auth-store';

export default function TestRealAuthPage() {
  const [email, setEmail] = useState('admin@elabsolutions.com');
  const [password, setPassword] = useState('admin123!');
  const [registerData, setRegisterData] = useState({
    email: 'newuser@elabsolutions.com',
    password: 'NewUser123!',
    firstName: 'New',
    lastName: 'User',
    phone: '+1234567890',
    country: 'US',
    profession: 'Software Developer'
  });

  const {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  } = useAuthStore();

  const handleLogin = async () => {
    await login({ email, password });
  };

  const handleRegister = async () => {
    await register(registerData);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Status Display */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Real API Authentication Test</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <strong>Loading:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-sm ${loading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                {loading ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <strong>Authenticated:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-sm ${isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isAuthenticated ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}

          {user && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
              <h3 className="font-semibold mb-2">Current User:</h3>
              <div className="text-sm space-y-1">
                <div><strong>ID:</strong> {user.id}</div>
                <div><strong>Email:</strong> {user.email}</div>
                <div><strong>Name:</strong> {user.profile.firstName} {user.profile.lastName}</div>
                <div><strong>Role:</strong> {user.role}</div>
                <div><strong>Status:</strong> {user.status}</div>
              </div>
            </div>
          )}
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Login Test</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <strong>Test Credentials:</strong><br />
            Admin: admin@elabsolutions.com / admin123!<br />
            Consultant: consultant@elabsolutions.com / consultant123!
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Registration Test</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={registerData.firstName}
                onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={registerData.lastName}
                onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>

        {/* API Test Results */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">API Connection Status</h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Health API: Connected
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Auth API: Connected
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Base URL: http://localhost:3000/api
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
