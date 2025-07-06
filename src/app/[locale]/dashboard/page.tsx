/**
 * Enhanced Dashboard Page - ELAB Solutions International
 * 
 * Role-based dashboard with application management system
 */

'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/enhanced/DashboardLayout';
import { EnhancedDashboardContent } from '@/components/dashboard/enhanced/EnhancedDashboardContent';
import { useApplicationStore } from '@/lib/applications/application-store';
import { useAuthStore } from '@/lib/auth/auth-store';

export default function DashboardPage() {
  const { fetchApplications, subscribeToUpdates, unsubscribeFromUpdates } = useApplicationStore();
  const { initialize, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    // Initialize auth state from localStorage/cookies
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Only fetch data when user is authenticated
    if (isAuthenticated && user) {
      fetchApplications();
      subscribeToUpdates();
    }
    
    return () => {
      unsubscribeFromUpdates();
    };
  }, [isAuthenticated, user, fetchApplications, subscribeToUpdates, unsubscribeFromUpdates]);

  return (
    <DashboardLayout>
      <EnhancedDashboardContent />
    </DashboardLayout>
  );
}
