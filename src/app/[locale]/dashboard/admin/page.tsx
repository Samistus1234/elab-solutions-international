/**
 * Admin Page - ELAB Solutions International
 * 
 * Administrative dashboard and controls
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/enhanced/DashboardLayout';
import { useAuth } from '@/lib/auth/auth-store';
import { UserRole } from '@/types/business';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user has admin access
    if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN)) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN)) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6" data-testid="admin-page">
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-bold leading-6 text-gray-900">Admin Panel</h1>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            System administration and management tools.
          </p>
        </div>

        {/* System Overview */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">System Overview</h2>
            <p className="mt-1 text-sm text-gray-600">
              Monitor system performance and application statistics.
            </p>
            
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-primary-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">A</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                        <dd className="text-lg font-medium text-gray-900">1,234</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">U</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                        <dd className="text-lg font-medium text-gray-900">567</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-yellow-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">P</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Reviews</dt>
                        <dd className="text-lg font-medium text-gray-900">89</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Administrative Actions</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Quick access to common administrative tasks.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button className="bg-primary-50 p-4 rounded-lg text-left hover:bg-primary-100 transition-colors">
                <h4 className="font-medium text-gray-900">User Management</h4>
                <p className="text-sm text-gray-600 mt-1">Manage user accounts and permissions</p>
              </button>
              
              <button className="bg-green-50 p-4 rounded-lg text-left hover:bg-green-100 transition-colors">
                <h4 className="font-medium text-gray-900">Application Review</h4>
                <p className="text-sm text-gray-600 mt-1">Review and approve applications</p>
              </button>
              
              <button className="bg-yellow-50 p-4 rounded-lg text-left hover:bg-yellow-100 transition-colors">
                <h4 className="font-medium text-gray-900">System Settings</h4>
                <p className="text-sm text-gray-600 mt-1">Configure system parameters</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}