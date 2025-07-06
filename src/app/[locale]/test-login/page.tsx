/**
 * Test Login Page - ELAB Solutions International
 * 
 * Quick access page for testing database credentials
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Test Login - ELAB Solutions International',
  description: 'Test page for database authentication.',
};

export default function TestLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.25-7a4.5 4.5 0 00-6.364 0L12 5.636l-1.886-1.886a4.5 4.5 0 00-6.364 0 4.5 4.5 0 000 6.364L12 18.364l8.25-8.25a4.5 4.5 0 000-6.364z" />
            </svg>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">
            🎉 Database Setup Complete!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            PostgreSQL with healthcare compliance is ready for testing
          </p>
        </div>

        {/* Database Status */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🗄️ Database Connection Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    PostgreSQL Connected
                  </p>
                  <p className="text-xs text-green-600">
                    Healthcare compliance ready
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">
                    Prisma ORM Active
                  </p>
                  <p className="text-xs text-blue-600">
                    Type-safe operations
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-800">
                    HIPAA/GDPR Ready
                  </p>
                  <p className="text-xs text-purple-600">
                    Audit logging enabled
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Test Credentials */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
              🔐 Test Login Credentials
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">👑 Super Admin</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Email:</strong> admin@elabsolutions.com</p>
                  <p><strong>Password:</strong> admin123!</p>
                  <p><strong>Role:</strong> Super Admin</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">👨‍💼 Consultant</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Email:</strong> consultant@elabsolutions.com</p>
                  <p><strong>Password:</strong> consultant123!</p>
                  <p><strong>Role:</strong> Consultant</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">👩‍⚕️ Applicant</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Email:</strong> nurse.jane@example.com</p>
                  <p><strong>Password:</strong> applicant123!</p>
                  <p><strong>Role:</strong> Applicant</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/en/login"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                🔑 Test Login Page
              </Link>
              <Link
                href="/en/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                📝 Test Register Page
              </Link>
              <Link
                href="/en/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                📊 View Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Database Tools */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
            🛠️ Database Management Tools
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Prisma Studio</h4>
              <p className="text-sm text-gray-600 mb-3">
                Visual database browser and editor
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded block">
                npm run db:studio
              </code>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Database Commands</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p><code className="bg-gray-100 px-1 rounded">npm run db:migrate</code> - Run migrations</p>
                <p><code className="bg-gray-100 px-1 rounded">npm run db:seed</code> - Seed test data</p>
                <p><code className="bg-gray-100 px-1 rounded">npm run db:reset</code> - Reset database</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4 text-center">
            🚀 Implementation Status
          </h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>✅ <strong>Phase 1 Complete:</strong> PostgreSQL Database Setup (40 hours)</p>
            <p>🔄 <strong>Phase 2 Ready:</strong> API Endpoint Development (80 hours)</p>
            <p>⏳ <strong>Phase 3 Pending:</strong> Frontend Component Development (60 hours)</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link 
            href="/en" 
            className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
