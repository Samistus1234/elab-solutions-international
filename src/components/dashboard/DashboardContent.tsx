/**
 * Dashboard Content Component - ELAB Solutions International
 * 
 * Role-based dashboard content rendering for different user types
 */

'use client';

import { useAuthStore } from '@/lib/auth/auth-store';
import { UserRole } from '@/types/business';
import { AdminDashboard } from './AdminDashboard';
import { ConsultantDashboard } from './ConsultantDashboard';
import { ApplicantDashboard } from './ApplicantDashboard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function DashboardContent() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">
            Please login to access your dashboard
          </p>
          <a
            href="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  // Render role-based dashboard content
  const renderDashboard = () => {
    switch (user.role) {
      case UserRole.SUPER_ADMIN:
      case UserRole.ADMIN:
        return <AdminDashboard user={user} />;
      
      case UserRole.CONSULTANT:
        return <ConsultantDashboard user={user} />;
      
      case UserRole.APPLICANT:
        return <ApplicantDashboard user={user} />;
      
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Invalid Role
              </h1>
              <p className="text-gray-600">
                Your account role is not recognized. Please contact support.
              </p>
            </div>
          </div>
        );
    }
  };

  return renderDashboard();
}