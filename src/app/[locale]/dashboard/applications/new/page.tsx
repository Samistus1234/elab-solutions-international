/**
 * New Application Page
 * 
 * Form wizard for creating new applications
 */

'use client';

import { useRouter } from 'next/navigation';
import { FormWizard } from '@/components/form-wizard/FormWizard';
import { useAuthStore } from '@/lib/auth/auth-store';
import { useEffect } from 'react';

export default function NewApplicationPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleComplete = (applicationId: string) => {
    // Redirect to the application details page or dashboard
    router.push(`/dashboard/applications/${applicationId}`);
  };

  const handleCancel = () => {
    // Go back to dashboard
    router.push('/dashboard');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <FormWizard 
      onComplete={handleComplete}
      onCancel={handleCancel}
    />
  );
}