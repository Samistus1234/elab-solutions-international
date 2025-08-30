'use client';

import Link from 'next/link';
import { 
  FileCheck, Clock, AlertCircle, CheckCircle, Users, 
  Calendar, MessageSquare, Download, ArrowRight, Plus,
  TrendingUp, Globe, Award, BookOpen
} from 'lucide-react';

export default function DashboardOverviewPage() {
  // Mock data - in real app this would come from API
  const userData = {
    name: 'Welcome to eLab Solutions',
    email: 'user@example.com',
    memberSince: 'January 2025',
    applications: [
      {
        id: '1',
        service: 'DataFlow PSV',
        status: 'In Progress',
        stage: 'Document Review',
        progress: 65,
        nextStep: 'Awaiting certificate verification',
        estimatedCompletion: '2 weeks'
      },
      {
        id: '2', 
        service: 'NCLEX Preparation',
        status: 'Active',
        stage: 'Study Phase',
        progress: 35,
        nextStep: 'Complete Module 3',
        estimatedCompletion: '4 months'
      }
    ],
    quickStats: {
      totalApplications: 2,
      completedServices: 0,
      documentsUploaded: 12,
      consultationHours: 3
    }
  };

  const quickActions = [
    {
      title: 'Upload Documents',
      description: 'Upload required documents for your applications',
      icon: Upload,
      href: '/dashboard/documents',
      color: 'blue'
    },
    {
      title: 'Schedule Consultation',
      description: 'Book a session with our experts',
      icon: Calendar,
      href: '/consultation',
      color: 'green'
    },
    {
      title: 'Track Applications',
      description: 'Monitor your application progress',
      icon: TrendingUp,
      href: '/dashboard/applications',
      color: 'purple'
    },
    {
      title: 'Access Academy',
      description: 'Continue your exam preparation',
      icon: BookOpen,
      href: '/academy',
      color: 'orange'
    }
  ];

  const recentNotifications = [
    {
      id: '1',
      title: 'Document verification completed',
      message: 'Your nursing degree certificate has been verified successfully',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: '2',
      title: 'Consultation reminder',
      message: 'You have a consultation scheduled for tomorrow at 2 PM',
      time: '1 day ago',
      type: 'info'
    },
    {
      id: '3',
      title: 'Action required',
      message: 'Please upload your experience certificate to continue',
      time: '3 days ago',
      type: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your application overview.</p>
            </div>
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <FileCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{userData.quickStats.totalApplications}</div>
                    <div className="text-sm text-gray-600">Applications</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-lg p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{userData.quickStats.completedServices}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-lg p-3">
                    <Download className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{userData.quickStats.documentsUploaded}</div>
                    <div className="text-sm text-gray-600">Documents</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="bg-orange-100 rounded-lg p-3">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{userData.quickStats.consultationHours}</div>
                    <div className="text-sm text-gray-600">Consult Hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Applications</h2>
                <Link href="/dashboard/applications" className="text-blue-600 hover:text-blue-800 font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {userData.applications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{app.service}</h3>
                        <p className="text-sm text-gray-600">{app.stage}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{app.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{app.nextStep}</span>
                      <span className="text-green-600 font-medium">Est. {app.estimatedCompletion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className={`bg-${action.color}-100 rounded-lg p-3 mr-4`}>
                      <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Profile Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profile</h3>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Healthcare Professional</h4>
                <p className="text-sm text-gray-600 mb-4">Member since {userData.memberSince}</p>
                <Link href="/dashboard/profile" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Edit Profile →
                </Link>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Updates</h3>
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start">
                    <div className={`rounded-full w-2 h-2 mt-2 mr-3 ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                      <p className="text-xs text-gray-400">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/dashboard/notifications" className="block text-center text-blue-600 hover:text-blue-800 font-medium text-sm mt-4">
                View All Notifications
              </Link>
            </div>

            {/* Help & Support */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Our experts are here to guide you through every step of your journey.
              </p>
              <Link 
                href="/consultation" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg text-sm transition-colors inline-block"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Upload({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}