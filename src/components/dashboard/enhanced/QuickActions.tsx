/**
 * Quick Actions Component
 * 
 * Role-specific quick action buttons for common tasks
 */

'use client';

import { 
  Plus, 
  Upload, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings,
  Download,
  Search,
  Calendar,
  Bell
} from 'lucide-react';
import { UserRole } from '@/types/business';

interface QuickActionsProps {
  userRole: UserRole;
}

export function QuickActions({ userRole }: QuickActionsProps) {
  const getQuickActions = () => {
    switch (userRole) {
      case UserRole.SUPER_ADMIN:
      case UserRole.ADMIN:
        return [
          {
            title: 'New Application',
            description: 'Create application for client',
            icon: Plus,
            color: 'bg-blue-600 hover:bg-blue-700',
            href: '/dashboard/applications/new'
          },
          {
            title: 'User Management',
            description: 'Manage users and roles',
            icon: Users,
            color: 'bg-purple-600 hover:bg-purple-700',
            href: '/dashboard/users'
          },
          {
            title: 'Generate Report',
            description: 'Export analytics data',
            icon: Download,
            color: 'bg-green-600 hover:bg-green-700',
            href: '/dashboard/reports'
          },
          {
            title: 'System Settings',
            description: 'Configure system',
            icon: Settings,
            color: 'bg-gray-600 hover:bg-gray-700',
            href: '/dashboard/settings'
          }
        ];

      case UserRole.CONSULTANT:
        return [
          {
            title: 'New Application',
            description: 'Start client application',
            icon: Plus,
            color: 'bg-blue-600 hover:bg-blue-700',
            href: '/dashboard/applications/new'
          },
          {
            title: 'Document Review',
            description: 'Review pending documents',
            icon: FileText,
            color: 'bg-yellow-600 hover:bg-yellow-700',
            href: '/dashboard/documents'
          },
          {
            title: 'Client Messages',
            description: 'Check client communications',
            icon: MessageSquare,
            color: 'bg-green-600 hover:bg-green-700',
            href: '/dashboard/messages'
          },
          {
            title: 'Schedule Meeting',
            description: 'Book client consultation',
            icon: Calendar,
            color: 'bg-purple-600 hover:bg-purple-700',
            href: '/dashboard/calendar'
          }
        ];

      case UserRole.APPLICANT:
        return [
          {
            title: 'New Application',
            description: 'Start a new application',
            icon: Plus,
            color: 'bg-blue-600 hover:bg-blue-700',
            href: '/dashboard/applications/new'
          },
          {
            title: 'Upload Documents',
            description: 'Upload required documents',
            icon: Upload,
            color: 'bg-green-600 hover:bg-green-700',
            href: '/dashboard/documents/upload'
          },
          {
            title: 'Track Application',
            description: 'Check application status',
            icon: Search,
            color: 'bg-yellow-600 hover:bg-yellow-700',
            href: '/dashboard/applications'
          },
          {
            title: 'Messages',
            description: 'View consultant messages',
            icon: MessageSquare,
            color: 'bg-purple-600 hover:bg-purple-700',
            href: '/dashboard/messages'
          }
        ];

      default:
        return [];
    }
  };

  const actions = getQuickActions();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-sm text-gray-600 mt-1">Common tasks and shortcuts</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`${action.color} text-white rounded-lg p-4 text-left transition-colors group`}
              onClick={() => {
                // Navigate to the action href
                window.location.href = action.href;
              }}
            >
              <div className="flex items-start space-x-3">
                <action.icon className="h-6 w-6 mt-0.5 opacity-90 group-hover:opacity-100" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{action.title}</h3>
                  <p className="text-xs opacity-90 mt-1">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Additional help section for applicants */}
        {userRole === UserRole.APPLICANT && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-sm font-medium text-blue-900">Need Help?</h3>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                Contact our support team if you need assistance with your application process.
              </p>
              <button className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700">
                Contact Support →
              </button>
            </div>
          </div>
        )}

        {/* Admin quick stats */}
        {(userRole === UserRole.SUPER_ADMIN || userRole === UserRole.ADMIN) && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">System Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Applications Today</span>
                  <span className="font-medium text-gray-900">12</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Pending Reviews</span>
                  <span className="font-medium text-gray-900">8</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">System Health</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consultant productivity */}
        {userRole === UserRole.CONSULTANT && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-900 mb-2">Today's Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-green-700">Applications Processed</span>
                  <span className="font-medium text-green-900">5</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-green-700">Documents Reviewed</span>
                  <span className="font-medium text-green-900">12</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2 mt-3">
                  <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-xs text-green-700">75% of daily target completed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}