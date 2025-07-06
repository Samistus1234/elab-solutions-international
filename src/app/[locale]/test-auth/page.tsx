/**
 * Test Authentication Page
 * Simple page to test auth store functionality
 */

'use client';

import { useAuthStore } from '@/lib/auth/auth-store';

export default function TestAuthPage() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Auth Store Test</h1>
        
        <div className="space-y-3">
          <div>
            <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'None'}
          </div>
          <div>
            <strong>Error:</strong> {error || 'None'}
          </div>
        </div>
      </div>
    </div>
  );
}