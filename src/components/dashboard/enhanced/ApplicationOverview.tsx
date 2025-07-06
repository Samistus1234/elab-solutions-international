/**
 * Application Overview Component
 * 
 * Displays applications in a role-appropriate format
 */

'use client';

import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Application } from '@/types/applications';
import { UserRole } from '@/types/business';

interface ApplicationOverviewProps {
  applications: Application[];
  userRole: UserRole;
  loading: boolean;
}

export function ApplicationOverview({ applications, userRole, loading }: ApplicationOverviewProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
      case 'under_review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pending_documents':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending_documents':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {userRole === UserRole.APPLICANT ? 'My Applications' : 'Applications Overview'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {applications.length} {applications.length === 1 ? 'application' : 'applications'} total
        </p>
      </div>

      <div className="p-6">
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications</h3>
            <p className="text-gray-600 mb-4">
              {userRole === UserRole.APPLICANT 
                ? 'You haven\'t started any applications yet.'
                : 'No applications to display.'
              }
            </p>
            {userRole !== UserRole.APPLICANT && (
              <button
                onClick={() => window.location.href = '/dashboard/applications/new'}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create New Application
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {applications.slice(0, 5).map((application) => (
              <div
                key={application.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(application.status)}
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {application.title || `Application ${application.id}`}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {application.type.replace('_', ' ').toUpperCase()} • {application.targetCountry}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                      {application.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Updated {new Date(application.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(Math.random() * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round(Math.random() * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

            {applications.length > 5 && (
              <div className="text-center pt-4">
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View All Applications ({applications.length})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}