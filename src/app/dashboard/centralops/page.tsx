'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CentralOpsDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the cases page by default
    router.replace('/dashboard/centralops/cases');
  }, [router]);

  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">CentralOps Dashboard</h1>
        <p className="text-gray-600">Redirecting to Cases Management...</p>
      </div>
    </DashboardLayout>
  );
}
