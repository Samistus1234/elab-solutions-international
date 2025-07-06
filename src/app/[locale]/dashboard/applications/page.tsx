/**
 * Applications Page - ELAB Solutions International
 * 
 * Application listing and management page
 */

'use client';

import { DashboardLayout } from '@/components/dashboard/enhanced/DashboardLayout';

export default function ApplicationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6" data-testid="applications-page">
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-bold leading-6 text-gray-900">My Applications</h1>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            Manage your healthcare credential applications and track their progress.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-lg font-semibold text-gray-900">Application Overview</h2>
                <p className="mt-1 text-sm text-gray-600">
                  View and manage all your applications in one place.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  data-testid="new-application-button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
                >
                  New Application
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md" data-testid="applications-list">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Applications</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your most recent application submissions and their current status.
            </p>
          </div>
          <ul className="divide-y divide-gray-200">
            {/* Placeholder for applications */}
            <li className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-medium text-sm">DF</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">DataFlow International</p>
                    <p className="text-sm text-gray-500">United States • Standard Processing</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    In Progress
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}