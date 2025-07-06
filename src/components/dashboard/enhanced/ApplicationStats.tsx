/**
 * Application Stats Component
 * 
 * Displays visual statistics and metrics for applications
 */

'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Application, AdminDashboardSummary, ConsultantDashboardSummary, ApplicantDashboardSummary } from '@/types/applications';
import { UserRole } from '@/types/business';

interface ApplicationStatsProps {
  applications: Application[];
  dashboardSummary: AdminDashboardSummary | ConsultantDashboardSummary | ApplicantDashboardSummary | null;
  userRole: UserRole;
}

export function ApplicationStats({ applications, dashboardSummary, userRole }: ApplicationStatsProps) {
  if (!dashboardSummary) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const getApplicationsByStatus = () => {
    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percentage: Math.round((count / applications.length) * 100)
    }));
  };

  const getApplicationsByType = () => {
    const typeCounts = applications.reduce((acc, app) => {
      acc[app.type] = (acc[app.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / applications.length) * 100)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
      case 'under_review':
        return 'bg-yellow-500';
      case 'pending_documents':
        return 'bg-red-500';
      case 'draft':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'dataflow':
        return 'bg-blue-500';
      case 'mumaris_plus':
        return 'bg-purple-500';
      case 'sheryan':
        return 'bg-green-500';
      case 'license_renewal':
        return 'bg-yellow-500';
      case 'exam_booking':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTypeName = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatStatusName = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const statusData = getApplicationsByStatus();
  const typeData = getApplicationsByType();

  // Generate some mock trend data
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getTrendText = (change: number) => {
    if (change > 0) return `+${change}%`;
    if (change < 0) return `${change}%`;
    return '0%';
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // Mock trends for different metrics
  const trends = {
    applications: Math.floor(Math.random() * 20) - 10,
    completion: Math.floor(Math.random() * 15) - 5,
    satisfaction: Math.floor(Math.random() * 10) - 3
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {userRole === UserRole.APPLICANT ? 'My Application Statistics' : 'Application Analytics'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Visual overview of application data and trends
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Applications by Status */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Applications by Status</h3>
            <div className="flex items-center text-xs text-gray-500">
              {getTrendIcon(trends.completion)}
              <span className={`ml-1 ${getTrendColor(trends.completion)}`}>
                {getTrendText(trends.completion)} from last month
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {statusData.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No applications to display</p>
            ) : (
              statusData.map(({ status, count, percentage }) => (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{formatStatusName(status)}</span>
                    <span className="text-gray-900 font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(status)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{percentage}% of total</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Applications by Type */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Applications by Type</h3>
            <div className="flex items-center text-xs text-gray-500">
              {getTrendIcon(trends.applications)}
              <span className={`ml-1 ${getTrendColor(trends.applications)}`}>
                {getTrendText(trends.applications)} from last month
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {typeData.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No applications to display</p>
            ) : (
              typeData.map(({ type, count, percentage }) => (
                <div key={type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{formatTypeName(type)}</span>
                    <span className="text-gray-900 font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getTypeColor(type)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{percentage}% of total</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        {userRole !== UserRole.APPLICANT && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-600 font-medium">Avg Processing Time</p>
                    <p className="text-lg font-bold text-blue-900">8.5 days</p>
                  </div>
                  <div className="flex items-center">
                    {getTrendIcon(-15)}
                    <span className="text-xs text-green-600 ml-1">-15%</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-600 font-medium">Success Rate</p>
                    <p className="text-lg font-bold text-green-900">94.2%</p>
                  </div>
                  <div className="flex items-center">
                    {getTrendIcon(5)}
                    <span className="text-xs text-green-600 ml-1">+5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Client Satisfaction for consultants/admins */}
        {(userRole === UserRole.CONSULTANT || userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN) && (
          <div className="pt-4 border-t border-gray-200">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-600 font-medium">Client Satisfaction</p>
                  <p className="text-lg font-bold text-purple-900">4.8/5</p>
                  <p className="text-xs text-purple-700">Based on 127 reviews</p>
                </div>
                <div className="flex items-center">
                  {getTrendIcon(trends.satisfaction)}
                  <span className={`text-xs ml-1 ${getTrendColor(trends.satisfaction)}`}>
                    {getTrendText(trends.satisfaction)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick insights for applicants */}
        {userRole === UserRole.APPLICANT && applications.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Your Progress</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-yellow-600 font-medium">Overall Completion</p>
                  <p className="text-lg font-bold text-yellow-900">
                    {Math.round((statusData.find(s => s.status === 'completed')?.count || 0) / applications.length * 100)}%
                  </p>
                  <p className="text-xs text-yellow-700">
                    {statusData.find(s => s.status === 'completed')?.count || 0} of {applications.length} applications completed
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-yellow-600">Estimated completion</p>
                  <p className="text-sm font-medium text-yellow-900">2-3 weeks</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}