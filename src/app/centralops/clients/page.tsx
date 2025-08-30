'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, Filter, Plus, Download, Eye, Edit, MoreVertical,
  Users, CheckCircle, Clock, AlertCircle, Star, MapPin,
  Phone, Mail, Calendar, FileText, TrendingUp, DollarSign
} from 'lucide-react';

// Mock client data based on healthcare recruitment platform research
const clientsData = [
  {
    id: 'CLT-001',
    name: 'Dr. Sarah Ahmed',
    profession: 'General Practitioner',
    email: 'sarah.ahmed@email.com',
    phone: '+971-50-123-4567',
    country: 'UAE',
    targetCountry: 'USA',
    service: 'NCLEX-RN',
    status: 'Placement Complete',
    stage: 'Job Matching',
    progress: 100,
    earnings: 2850,
    commission: 712.50,
    joinedDate: '2024-03-15',
    lastActivity: '2024-08-25',
    priority: 'high',
    notes: 'Excellent candidate, placed in Massachusetts General Hospital'
  },
  {
    id: 'CLT-002',
    name: 'Nurse Maria Santos',
    profession: 'Registered Nurse',
    email: 'maria.santos@email.com',
    phone: '+63-917-234-5678',
    country: 'Philippines',
    targetCountry: 'UAE',
    service: 'DHA Dubai',
    status: 'License Approved',
    stage: 'Exam Complete',
    progress: 95,
    earnings: 2400,
    commission: 600,
    joinedDate: '2024-04-20',
    lastActivity: '2024-08-28',
    priority: 'high',
    notes: 'DHA license approved, finalizing job offer with Emirates Hospital'
  },
  {
    id: 'CLT-003',
    name: 'Dr. Ahmed Hassan',
    profession: 'Cardiologist',
    email: 'ahmed.hassan@email.com',
    phone: '+20-100-345-6789',
    country: 'Egypt',
    targetCountry: 'UK',
    service: 'UK NMC + PLAB',
    status: 'Exam Scheduled',
    stage: 'Exam Preparation',
    progress: 75,
    earnings: 1800,
    commission: 450,
    joinedDate: '2024-05-10',
    lastActivity: '2024-08-29',
    priority: 'medium',
    notes: 'PLAB 2 scheduled for September, strong candidate'
  },
  {
    id: 'CLT-004',
    name: 'Priya Sharma',
    profession: 'Staff Nurse',
    email: 'priya.sharma@email.com',
    phone: '+91-98765-43210',
    country: 'India',
    targetCountry: 'Australia',
    service: 'AHPRA + OET',
    status: 'Document Review',
    stage: 'Verification Process',
    progress: 60,
    earnings: 1200,
    commission: 300,
    joinedDate: '2024-06-01',
    lastActivity: '2024-08-30',
    priority: 'medium',
    notes: 'OET results pending, credentials under AHPRA review'
  },
  {
    id: 'CLT-005',
    name: 'Dr. Michael Chen',
    profession: 'Emergency Medicine',
    email: 'michael.chen@email.com',
    phone: '+1-555-123-4567',
    country: 'Malaysia',
    targetCountry: 'Canada',
    service: 'MCCQE + English',
    status: 'Initial Review',
    stage: 'Document Collection',
    progress: 30,
    earnings: 800,
    commission: 200,
    joinedDate: '2024-07-15',
    lastActivity: '2024-08-30',
    priority: 'low',
    notes: 'Recently started process, collecting medical school transcripts'
  },
  {
    id: 'CLT-006',
    name: 'Fatima Al-Zahra',
    profession: 'Pediatric Nurse',
    email: 'fatima.alzahra@email.com',
    phone: '+966-50-987-6543',
    country: 'Jordan',
    targetCountry: 'Saudi Arabia',
    service: 'SCFHS Exam',
    status: 'Exam Passed',
    stage: 'License Application',
    progress: 85,
    earnings: 1950,
    commission: 487.50,
    joinedDate: '2024-04-05',
    lastActivity: '2024-08-29',
    priority: 'high',
    notes: 'SCFHS exam passed with 78%, license application submitted'
  }
];

const stageColors = {
  'Document Collection': 'bg-gray-100 text-gray-800',
  'Verification Process': 'bg-blue-100 text-blue-800',
  'Exam Preparation': 'bg-yellow-100 text-yellow-800',
  'Exam Complete': 'bg-green-100 text-green-800',
  'License Application': 'bg-purple-100 text-purple-800',
  'Job Matching': 'bg-indigo-100 text-indigo-800',
  'Placement Complete': 'bg-emerald-100 text-emerald-800'
};

const priorityColors = {
  'high': 'bg-red-100 text-red-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'low': 'bg-gray-100 text-gray-800'
};

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastActivity');
  const [viewMode, setViewMode] = useState('grid'); // grid or table

  const filteredClients = clientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && client.progress < 100) ||
                         (selectedFilter === 'completed' && client.progress === 100) ||
                         (selectedFilter === 'high-priority' && client.priority === 'high');
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Placement Complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'License Approved':
      case 'Exam Passed':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'Exam Scheduled':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
              <p className="text-gray-600">Manage your clients through their entire licensing journey</p>
            </div>
            <div className="flex space-x-3">
              <Link href="/centralops/clients/new">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
                />
              </div>
              
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Clients</option>
                <option value="active">Active Cases</option>
                <option value="completed">Completed</option>
                <option value="high-priority">High Priority</option>
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="lastActivity">Last Activity</option>
                <option value="joinedDate">Joined Date</option>
                <option value="progress">Progress</option>
                <option value="earnings">Earnings</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <div className="flex border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
                <button 
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                    viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clientsData.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {clientsData.filter(c => c.progress === 100).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3 mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {clientsData.filter(c => c.progress < 100).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${clientsData.reduce((sum, c) => sum + c.earnings, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Grid/Table */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mr-3">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.profession}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[client.priority]}`}>
                      {client.priority}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {client.country} → {client.targetCountry}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-2" />
                    {client.service}
                  </div>
                  <div className="flex items-center text-sm">
                    {getStatusIcon(client.status)}
                    <span className="ml-2 text-gray-900">{client.status}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{client.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Earnings</p>
                    <p className="font-semibold text-gray-900">${client.earnings}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Commission</p>
                    <p className="font-semibold text-green-600">${client.commission}</p>
                  </div>
                </div>

                <div className={`px-3 py-2 rounded-full text-xs font-medium text-center mb-4 ${stageColors[client.stage]}`}>
                  {client.stage}
                </div>

                <div className="flex space-x-2">
                  <Link href={`/centralops/clients/${client.id}`} className="flex-1">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                      <Eye className="h-4 w-4 inline mr-1" />
                      View
                    </button>
                  </Link>
                  <Link href={`/centralops/clients/${client.id}/edit`} className="flex-1">
                    <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                      <Edit className="h-4 w-4 inline mr-1" />
                      Edit
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-3">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                            <div className="text-sm text-gray-500">{client.profession}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{client.service}</div>
                        <div className="text-sm text-gray-500">{client.country} → {client.targetCountry}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(client.status)}
                          <span className="ml-2 text-sm text-gray-900">{client.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${client.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-900">{client.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${client.earnings}</div>
                        <div className="text-sm text-green-600">${client.commission} commission</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(client.lastActivity).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/centralops/clients/${client.id}`}>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                          </Link>
                          <Link href={`/centralops/clients/${client.id}/edit`}>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
            <div className="mt-6">
              <Link href="/centralops/clients/new">
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add your first client
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}