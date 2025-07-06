/**
 * Messages Page - ELAB Solutions International
 * 
 * Real-time messaging interface for communication between users
 */

'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/enhanced/DashboardLayout';
import { useAuthStore } from '@/lib/auth/auth-store';

export default function MessagesPage() {
  const { user, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Please login to access messages</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6" data-testid="message-interface">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">
            Communicate with consultants and support team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversation List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow border">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
            </div>
            <div className="divide-y divide-gray-200" data-testid="conversation-list">
              {/* Support Conversation */}
              <div 
                className="p-4 hover:bg-gray-50 cursor-pointer"
                data-testid="conversation-support"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">S</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Support Chat
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      Available 24/7 for assistance
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Application Updates */}
              <div 
                className="p-4 hover:bg-gray-50 cursor-pointer"
                data-testid="conversation-app-001"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">A</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Application Updates
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      Automated notifications about your application
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      2 New
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow border flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Support Chat</h3>
              <div className="flex items-center mt-1" data-testid="application-context">
                <span className="text-sm text-gray-500">DataFlow Application</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-green-600">Current Stage: Document Review</span>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto" data-testid="message-area">
              <div className="space-y-4">
                {/* Automated Message */}
                <div className="flex items-start space-x-3" data-testid="automated-message">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">S</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-gray-900">
                        Welcome to ELAB Solutions! Your application has been received and is being reviewed.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">System • 2 hours ago</p>
                    </div>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex items-start space-x-3 justify-end">
                  <div className="flex-1 max-w-xs">
                    <div className="bg-primary-500 rounded-lg p-3">
                      <p className="text-sm text-white" data-testid="message-content">
                        Hello, I have a question about my application status.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-primary-100">You • 1 hour ago</p>
                        <span className="text-xs text-primary-100" data-testid="message-status-sent">✓</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.profile.firstName[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    data-testid="message-input"
                  />
                </div>
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  data-testid="send-message-button"
                >
                  Send
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-3 flex items-center space-x-4">
                <button
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                  data-testid="view-application-button"
                >
                  View Application
                </button>
                <button
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                  data-testid="upload-documents-button"
                >
                  Upload Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}