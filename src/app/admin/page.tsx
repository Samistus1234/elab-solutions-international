'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, FileText, Clock, CheckCircle, AlertCircle, 
  TrendingUp, DollarSign, Calendar, Search, Filter,
  Eye, Edit, Trash2, Mail, Phone, Download
} from 'lucide-react';

// Mock data - in real app this would come from your backend
const mockApplications = [
  {
    id: 'DAT-123456-ABC',
    name: 'Sarah Ahmed',
    email: 'sarah.ahmed@email.com',
    phone: '+971501234567',
    service: 'DataFlow Primary Source Verification',
    serviceId: 'dataflow',
    status: 'under_review',
    priority: 'high',
    submittedAt: '2025-08-28T10:30:00Z',
    updatedAt: '2025-08-28T14:20:00Z',
    amount: 1299,
    paymentStatus: 'paid',
    progress: 35,
    assignedTo: 'Dr. Maria Rodriguez',
    notes: 'All documents received. Awaiting university verification.',
    country: 'UAE',
    profession: 'Registered Nurse'
  },
  {
    id: 'NCL-789012-DEF',
    name: 'Raj Patel',
    email: 'raj.patel@email.com',
    phone: '+919876543210',
    service: 'NCLEX-RN Preparation & Registration',
    serviceId: 'nclex',
    status: 'in_progress',
    priority: 'medium',
    submittedAt: '2025-08-27T09:15:00Z',
    updatedAt: '2025-08-28T11:45:00Z',
    amount: 899,
    paymentStatus: 'partial',
    progress: 65,
    assignedTo: 'James Wilson',
    notes: 'Student making good progress. Next exam scheduled.',
    country: 'USA',
    profession: 'Registered Nurse'
  },
  {
    id: 'UKN-345678-GHI',
    name: 'Fatima Al-Zahra',
    email: 'fatima.alzahra@email.com',
    phone: '+966501234567',
    service: 'UK NMC Registration Package',
    serviceId: 'uk-nmc',
    status: 'completed',
    priority: 'low',
    submittedAt: '2025-08-20T14:22:00Z',
    updatedAt: '2025-08-28T16:30:00Z',
    amount: 1199,
    paymentStatus: 'paid',
    progress: 100,
    assignedTo: 'Dr. Sarah Ahmed',
    notes: 'Registration completed successfully. Certificate issued.',
    country: 'UK',
    profession: 'Registered Nurse'
  },
  {
    id: 'AUS-901234-JKL',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+916543210987',
    service: 'Australia AHPRA Registration',
    serviceId: 'australia',
    status: 'pending_documents',
    priority: 'high',
    submittedAt: '2025-08-28T16:00:00Z',
    updatedAt: '2025-08-28T16:00:00Z',
    amount: 1099,
    paymentStatus: 'pending',
    progress: 15,
    assignedTo: 'Unassigned',
    notes: 'Missing police clearance certificate.',
    country: 'Australia',
    profession: 'Registered Nurse'
  },
  {
    id: 'CON-567890-MNO',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+201234567890',
    service: 'Professional Consultation Services',
    serviceId: 'consultation',
    status: 'scheduled',
    priority: 'medium',
    submittedAt: '2025-08-28T12:30:00Z',
    updatedAt: '2025-08-28T12:30:00Z',
    amount: 149,
    paymentStatus: 'paid',
    progress: 0,
    assignedTo: 'Dr. Maria Rodriguez',
    notes: 'Consultation scheduled for tomorrow 2PM GMT.',
    country: 'Multiple',
    profession: 'General Physician'
  }
];

const statusConfig = {
  pending_documents: { label: 'Pending Documents', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  under_review: { label: 'Under Review', color: 'bg-blue-100 text-blue-800', icon: Eye },
  in_progress: { label: 'In Progress', color: 'bg-purple-100 text-purple-800', icon: Clock },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  scheduled: { label: 'Scheduled', color: 'bg-indigo-100 text-indigo-800', icon: Calendar }
};

const priorityConfig = {
  low: { label: 'Low', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Medium', color: 'bg-blue-100 text-blue-800' },
  high: { label: 'High', color: 'bg-red-100 text-red-800' }
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState(mockApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesService = serviceFilter === 'all' || app.serviceId === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending_documents').length,
    inProgress: applications.filter(app => ['under_review', 'in_progress'].includes(app.status)).length,
    completed: applications.filter(app => app.status === 'completed').length,
    totalRevenue: applications.reduce((sum, app) => sum + (app.paymentStatus === 'paid' ? app.amount : 0), 0),
    pendingPayments: applications.filter(app => app.paymentStatus === 'pending').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage applications and track business metrics</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← Back to Website
              </Link>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending Review</div>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.inProgress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.pendingPayments}</div>
                <div className="text-sm text-gray-600">Pending Payments</div>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or reference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending_documents">Pending Documents</option>
                <option value="under_review">Under Review</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
              </select>
              
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Services</option>
                <option value="dataflow">DataFlow PSV</option>
                <option value="nclex">NCLEX Preparation</option>
                <option value="uk-nmc">UK NMC Registration</option>
                <option value="australia">Australia AHPRA</option>
                <option value="consultation">Consultation</option>
              </select>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 font-medium text-gray-900">Application</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-900">Service</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-900">Status</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-900">Progress</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-900">Assigned To</th>
                  <th className="text-left px-6 py-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((application) => {
                  const StatusIcon = statusConfig[application.status as keyof typeof statusConfig]?.icon || AlertCircle;
                  
                  return (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{application.name}</div>
                          <div className="text-sm text-gray-600">{application.email}</div>
                          <div className="text-xs text-gray-500">{application.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{application.service}</div>
                          <div className="text-sm text-gray-600">{application.country} • {application.profession}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusConfig[application.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800'
                          }`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[application.status as keyof typeof statusConfig]?.label || application.status}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            priorityConfig[application.priority as keyof typeof priorityConfig]?.color || 'bg-gray-100 text-gray-800'
                          }`}>
                            {priorityConfig[application.priority as keyof typeof priorityConfig]?.label || application.priority}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${application.progress}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{application.progress}% complete</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">${application.amount}</div>
                          <div className={`text-sm ${
                            application.paymentStatus === 'paid' ? 'text-green-600' :
                            application.paymentStatus === 'partial' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {application.paymentStatus === 'paid' ? 'Paid' :
                             application.paymentStatus === 'partial' ? 'Partial' :
                             'Pending'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{application.assignedTo}</div>
                        <div className="text-xs text-gray-500">
                          Updated: {new Date(application.updatedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            title="View Details"
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            title="Edit Application"
                            className="text-green-600 hover:text-green-800 p-1"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            title="Send Email"
                            className="text-purple-600 hover:text-purple-800 p-1"
                          >
                            <Mail className="h-4 w-4" />
                          </button>
                          <button
                            title="Call Client"
                            className="text-orange-600 hover:text-orange-800 p-1"
                          >
                            <Phone className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Send Bulk Update Emails
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                Generate Monthly Report
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                Backup Application Data
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                Export Payment Records
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">New application submitted</span>
                <span className="text-gray-500">2h ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment received - $1,299</span>
                <span className="text-gray-500">4h ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Document review completed</span>
                <span className="text-gray-500">6h ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Client consultation scheduled</span>
                <span className="text-gray-500">1d ago</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
            <h3 className="text-lg font-bold mb-4">System Status</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>API Status</span>
                <span className="bg-green-400 text-green-900 px-2 py-1 rounded text-xs">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Gateway</span>
                <span className="bg-green-400 text-green-900 px-2 py-1 rounded text-xs">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Email Service</span>
                <span className="bg-green-400 text-green-900 px-2 py-1 rounded text-xs">Running</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <span className="bg-green-400 text-green-900 px-2 py-1 rounded text-xs">Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}