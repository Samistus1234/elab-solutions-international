/**
 * Enhanced Dashboard Content Component
 * 
 * Role-specific dashboard content with application management
 */

'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { UserRole } from '@/types/business';
import { useAuthStore } from '@/lib/auth/auth-store';
import { useApplicationStore } from '@/lib/applications/application-store';
import { ApplicationOverview } from './ApplicationOverview';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { ApplicationStats } from './ApplicationStats';

export function EnhancedDashboardContent() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { applications, loading, error, dashboardSummary } = useApplicationStore();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">Please login to access the dashboard</p>
      </div>
    );
  }

  if (loading && applications.length === 0) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-red-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Role-specific layout
  return (
    <div className="space-y-6">
      {/* Top row - Quick stats and actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ApplicationStats 
            applications={applications}
            dashboardSummary={dashboardSummary}
            userRole={user.role}
          />
        </div>
        <div>
          <QuickActions userRole={user.role} />
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications overview */}
        <div className="lg:col-span-2">
          <ApplicationOverview 
            applications={applications}
            userRole={user.role}
            loading={loading}
          />
        </div>

        {/* Recent activity sidebar */}
        <div>
          <RecentActivity 
            applications={applications}
            userRole={user.role}
          />
        </div>
      </div>

      {/* Additional role-specific sections */}
      {(user.role === UserRole.SUPER_ADMIN || user.role === UserRole.ADMIN) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Admin Panel */}
          <div className="bg-white rounded-lg shadow p-6" data-testid="admin-panel">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Panel</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Total Users</span>
                <span className="text-sm font-bold text-gray-900">1,247</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Active Applications</span>
                <span className="text-sm font-bold text-gray-900">89</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Pending Reviews</span>
                <span className="text-sm font-bold text-gray-900">12</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
            <p className="text-gray-600">Financial dashboard coming soon...</p>
          </div>
        </div>
      )}

      {user.role === UserRole.CONSULTANT && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6" data-testid="review-queue">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Queue</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span className="text-sm font-medium text-gray-700">DataFlow Applications</span>
                <span className="text-sm font-bold text-primary-600">5 pending</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span className="text-sm font-medium text-gray-700">MUMARIS+ Applications</span>
                <span className="text-sm font-bold text-primary-600">3 pending</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span className="text-sm font-medium text-gray-700">License Renewals</span>
                <span className="text-sm font-bold text-primary-600">2 pending</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultant Tools</h3>
            <p className="text-gray-600">Advanced consultant features coming soon...</p>
          </div>
        </div>
      )}

      {user.role === UserRole.APPLICANT && dashboardSummary && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Guide</h3>
          <p className="text-gray-600 mb-4">
            Track your application progress and manage your documents easily.
          </p>
          {(dashboardSummary as any).nextActions && (dashboardSummary as any).nextActions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
              <ul className="space-y-1">
                {(dashboardSummary as any).nextActions.map((action: any) => (
                  <li key={action.id} className="text-sm text-blue-700">
                    • {action.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}