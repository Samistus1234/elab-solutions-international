/**
 * Dashboard Header Component
 * 
 * Displays role-specific dashboard summary and key metrics
 */

'use client';

import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Target
} from 'lucide-react';
import { UserRole, type User } from '@/types/business';
import type { 
  AdminDashboardSummary, 
  ConsultantDashboardSummary, 
  ApplicantDashboardSummary 
} from '@/types/applications';

interface DashboardHeaderProps {
  user: User;
  dashboardSummary: AdminDashboardSummary | ConsultantDashboardSummary | ApplicantDashboardSummary | null;
}

export function DashboardHeader({ user, dashboardSummary }: DashboardHeaderProps) {
  if (!dashboardSummary) {
    return (
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN: return 'Super Administrator';
      case UserRole.ADMIN: return 'Administrator';
      case UserRole.CONSULTANT: return 'Consultant';
      case UserRole.APPLICANT: return 'Applicant';
      default: return role;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Role-specific stat cards
  const getStatCards = () => {
    if (user.role === UserRole.SUPER_ADMIN || user.role === UserRole.ADMIN) {
      const summary = dashboardSummary as AdminDashboardSummary;
      return [
        {
          title: 'Total Applications',
          value: summary.totalApplications,
          icon: FileText,
          color: 'blue',
          change: '+12% from last month'
        },
        {
          title: 'Active Applications',
          value: summary.activeApplications,
          icon: Clock,
          color: 'yellow',
          change: `${summary.activeApplications} in progress`
        },
        {
          title: 'Completed',
          value: summary.completedApplications,
          icon: CheckCircle,
          color: 'green',
          change: `${Math.round((summary.completedApplications / summary.totalApplications) * 100)}% completion rate`
        },
        {
          title: 'Revenue',
          value: `$${(summary.revenue.totalRevenue / 1000).toFixed(0)}K`,
          icon: DollarSign,
          color: 'purple',
          change: `$${(summary.revenue.monthlyRevenue / 1000).toFixed(0)}K this month`
        }
      ];
    } else if (user.role === UserRole.CONSULTANT) {
      const summary = dashboardSummary as ConsultantDashboardSummary;
      return [
        {
          title: 'Assigned Applications',
          value: summary.assignedApplications,
          icon: Target,
          color: 'blue',
          change: `${summary.urgentApplications} urgent`
        },
        {
          title: 'Active Cases',
          value: summary.activeApplications,
          icon: Clock,
          color: 'yellow',
          change: 'Currently processing'
        },
        {
          title: 'Completed',
          value: summary.completedApplications,
          icon: CheckCircle,
          color: 'green',
          change: `${summary.avgProcessingTime} days avg`
        },
        {
          title: 'Performance',
          value: `${summary.performanceScore}%`,
          icon: TrendingUp,
          color: 'purple',
          change: 'Excellent rating'
        }
      ];
    } else {
      const summary = dashboardSummary as ApplicantDashboardSummary;
      return [
        {
          title: 'My Applications',
          value: summary.totalApplications,
          icon: FileText,
          color: 'blue',
          change: `${summary.activeApplications} in progress`
        },
        {
          title: 'Pending Documents',
          value: summary.pendingDocuments,
          icon: AlertTriangle,
          color: 'yellow',
          change: summary.pendingDocuments > 0 ? 'Action required' : 'All uploaded'
        },
        {
          title: 'Completed',
          value: summary.completedApplications,
          icon: CheckCircle,
          color: 'green',
          change: 'Successfully processed'
        },
        {
          title: 'Next Actions',
          value: summary.nextActions.length,
          icon: Target,
          color: 'purple',
          change: summary.nextActions.length > 0 ? 'Items pending' : 'All caught up'
        }
      ];
    }
  };

  const statCards = getStatCards();

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          text: 'text-blue-900'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          icon: 'text-yellow-600',
          text: 'text-yellow-900'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          icon: 'text-green-600',
          text: 'text-green-900'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          icon: 'text-purple-600',
          text: 'text-purple-900'
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'text-gray-600',
          text: 'text-gray-900'
        };
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome message */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}, {user.profile.firstName}!
        </h1>
        <p className="text-gray-600 mt-1">
          Welcome to your {getRoleDisplayName(user.role)} dashboard
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          return (
            <div
              key={index}
              className={`${colors.bg} rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${colors.text}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${colors.bg}`}>
                  <stat.icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions for applicants */}
      {user.role === UserRole.APPLICANT && (dashboardSummary as ApplicantDashboardSummary).nextActions.length > 0 && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <h3 className="text-sm font-medium text-yellow-800">Action Required</h3>
          </div>
          <div className="mt-2">
            {(dashboardSummary as ApplicantDashboardSummary).nextActions.slice(0, 2).map((action) => (
              <p key={action.id} className="text-sm text-yellow-700 mb-1">
                • {action.title}: {action.description}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}