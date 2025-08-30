'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function ApplicantDashboard() {
  const { user } = useUser(); // Get user data from Clerk

  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard, {user?.firstName || 'Applicant'}!</h1>
        
        {/* Profile Overview Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Profile Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div>
              <p className="font-medium">Full Name:</p>
              <p>{user?.fullName || 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p>{user?.primaryEmailAddress?.emailAddress || 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium">Role:</p>
              <p>{(user?.publicMetadata?.role as string) || 'Applicant'}</p>
            </div>
            <div>
              <p className="font-medium">Member Since:</p>
              <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
          <Link href="/dashboard/applicant/profile" className="mt-6 inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Edit Profile
          </Link>
        </section>

        {/* Quick Actions Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/dashboard/applicant/applications" className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-md text-center font-semibold">
              Start New Application
            </Link>
            <Link href="/dashboard/applicant/applications" className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-md text-center font-semibold">
              Track My Applications
            </Link>
            <Link href="/dashboard/applicant/documents" className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-md text-center font-semibold">
              Upload Documents
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}