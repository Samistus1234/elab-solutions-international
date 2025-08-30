/**
 * Enhanced Dashboard Page - ELAB Solutions International
 * 
 * Role-based dashboard with application management system
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function DashboardPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    console.log('DashboardPage useEffect fired');
    console.log('isLoaded:', isLoaded);
    console.log('isSignedIn:', isSignedIn);
    if (user) {
      console.log('User ID:', user.id);
      console.log('User publicMetadata:', user.publicMetadata);
      console.log('User role:', user.publicMetadata?.role);
    } else {
      console.log('User object is null or undefined');
    }

    if (!isLoaded) {
      console.log('Clerk not loaded yet, returning.');
      return;
    }
    if (!isSignedIn) {
      console.log('User not signed in, redirecting to /login');
      router.replace('/login');
      return;
    }
    // Get role from Clerk publicMetadata
    const role = user?.publicMetadata?.role;
    if (!role) {
      console.log('No role set, redirecting to /dashboard/applicant');
      router.replace('/dashboard/applicant');
      return;
    }
    // Redirect based on role
    if (role === 'admin' || role === 'super_admin') {
      console.log('Role is admin/super_admin, redirecting to /dashboard/admin');
      router.replace('/dashboard/admin');
    } else if (role === 'consultant') {
      console.log('Role is consultant, redirecting to /dashboard/consultant');
      router.replace('/dashboard/consultant');
    } else if (role === 'applicant') {
      console.log('Role is applicant, redirecting to /dashboard/applicant');
      router.replace('/dashboard/applicant');
    } else {
      console.log('Unknown role, redirecting to /dashboard/applicant');
      router.replace('/dashboard/applicant');
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading dashboard...</div>;
  }

  // This part will now be reached if the useEffect hasn't redirected yet.
  // It provides a fallback UI instead of a blank page.
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Redirecting...</h1>
      <p>Please wait while we direct you to your dashboard.</p>
    </div>
  );
}
