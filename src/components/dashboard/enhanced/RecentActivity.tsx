/**
 * Recent Activity Component
 * 
 * Shows recent timeline events and activities
 */

'use client';

import { Clock, FileText, MessageSquare, CheckCircle, Upload, DollarSign } from 'lucide-react';
import type { Application } from '@/types/applications';
import { UserRole } from '@/types/business';

interface RecentActivityProps {
  applications: Application[];
  userRole: UserRole;
}

export function RecentActivity({ applications, userRole }: RecentActivityProps) {
  // Generate mock recent activities
  const recentActivities = applications.flatMap(app => 
    (app.timeline || []).map(event => ({
      ...event,
      applicationTitle: app.title || `Application ${app.id}`,
      applicationId: app.id
    }))
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document_upload':
        return <Upload className="h-4 w-4 text-blue-500" />;
      case 'status_change':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <p className="text-sm text-gray-600 mt-1">Latest updates and changes</p>
      </div>

      <div className="p-6">
        {recentActivities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Activity</h3>
            <p className="text-gray-600">Activity will appear here as applications are processed.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  {activity.description && (
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                  )}
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <span>{activity.applicationTitle}</span>
                    <span className="mx-1">•</span>
                    <span>{getTimeAgo(activity.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}

            {recentActivities.length >= 10 && (
              <div className="text-center pt-4">
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View All Activity
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}