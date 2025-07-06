'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth/auth-store';

export default function TestMinimal() {
  const [email, setEmail] = useState('admin@elabsolutions.com');
  const [password, setPassword] = useState('admin123!');
  const [tokens, setTokens] = useState('');
  const router = useRouter();
  
  const {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    initialize
  } = useAuthStore();

  // Check tokens on mount and when auth state changes
  useEffect(() => {
    const checkTokens = () => {
      const storedTokens = localStorage.getItem('elab_auth_session');
      setTokens(storedTokens || 'No tokens');
    };
    
    checkTokens();
    const interval = setInterval(checkTokens, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      console.log('Starting login...');
      const result = await login({ email, password });
      console.log('Login result:', result);
      console.log('Auth state after login:', { isAuthenticated, user });
      
      // Wait for state to update, then navigate
      setTimeout(() => {
        console.log('Current auth state before navigation:', { isAuthenticated, user });
        console.log('Navigating to dashboard...');
        router.push('/en/dashboard');
      }, 1500);
      
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleInitialize = async () => {
    console.log('Initializing auth state...');
    await initialize();
    console.log('Auth state after initialize:', { isAuthenticated, user });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Test & Debug</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Login Form */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Login Test</h2>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login & Go to Dashboard'}
          </button>
          
          <button
            onClick={handleInitialize}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Initialize Auth State
          </button>
        </div>

        {/* Auth Status */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Auth Status</h2>
          
          <div className="space-y-2 text-sm">
            <div>
              <strong>Authenticated:</strong> 
              <span className={`ml-2 px-2 py-1 rounded ${isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isAuthenticated ? 'Yes' : 'No'}
              </span>
            </div>
            
            <div>
              <strong>Loading:</strong> 
              <span className={`ml-2 px-2 py-1 rounded ${loading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                {loading ? 'Yes' : 'No'}
              </span>
            </div>
            
            {user && (
              <div className="p-3 bg-green-50 rounded">
                <div><strong>User:</strong> {user.email}</div>
                <div><strong>Role:</strong> {user.role}</div>
                <div><strong>Name:</strong> {user.profile.firstName} {user.profile.lastName}</div>
              </div>
            )}
            
            {error && (
              <div className="p-3 bg-red-50 rounded text-red-700">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Token Info */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Token Information</h2>
        <div className="bg-gray-100 rounded p-3 text-xs break-all">
          {tokens}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 space-y-2">
        <button
          onClick={() => router.push('/en/dashboard')}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Go to Dashboard
        </button>
        
        <button
          onClick={() => router.push('/en/login')}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Go to Login Page
        </button>
      </div>
    </div>
  )
}
