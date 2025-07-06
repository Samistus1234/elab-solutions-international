/**
 * Applicant Dashboard Component - ELAB Solutions International
 * 
 * Dashboard for Applicant users
 */

'use client';

import { User } from '@/types/business';
import { FileText, Upload, CheckCircle, Clock, Star, AlertCircle } from 'lucide-react';

interface ApplicantDashboardProps {
  user: User;
}

export function ApplicantDashboard({ user }: ApplicantDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
            <div className="flex items-center">
              <Star className="h-12 w-12 mr-4" />
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome, {user.profile?.firstName || 'Healthcare Professional'}
                </h1>
                <p className="text-purple-100 mt-2">
                  👩‍⚕️ Your Journey to Global Healthcare Opportunities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                📋 Application Status
              </h2>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-800">
                        DataFlow Verification
                      </p>
                      <p className="text-xs text-blue-600">
                        In Progress - 75% Complete
                      </p>
                      <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-800">
                        Document Upload
                      </p>
                      <p className="text-xs text-green-600">
                        Completed
                      </p>
                      <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-orange-800">
                        License Verification
                      </p>
                      <p className="text-xs text-orange-600">
                        Pending Review
                      </p>
                      <div className="mt-2 w-full bg-orange-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                🚀 Quick Actions
              </h2>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="h-6 w-6 text-blue-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Upload Documents</p>
                    <p className="text-sm text-gray-600">Add or update your credentials</p>
                  </div>
                </button>
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="h-6 w-6 text-green-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">View Applications</p>
                    <p className="text-sm text-gray-600">Check application status</p>
                  </div>
                </button>
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Star className="h-6 w-6 text-purple-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Exam Preparation</p>
                    <p className="text-sm text-gray-600">Access ELAB Academy</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                ✅ Next Steps
              </h2>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">1</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Complete missing DataFlow documents
                    </p>
                    <p className="text-xs text-gray-600">
                      Upload your experience certificate and license verification
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-orange-600">2</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Schedule consultation with assigned consultant
                    </p>
                    <p className="text-xs text-gray-600">
                      Book a meeting to discuss your application progress
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-purple-600">3</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Prepare for licensing exam
                    </p>
                    <p className="text-xs text-gray-600">
                      Use our ELAB Academy resources for exam preparation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notices */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Action Required
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Your DataFlow verification is pending additional documentation. 
                    Please upload your experience certificate to proceed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}