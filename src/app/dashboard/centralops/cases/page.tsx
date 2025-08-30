'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Filter, Edit, Eye } from 'lucide-react';
import { useState } from 'react';

export default function CentralOpsCasesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Placeholder data for cases
  const allCases = [
    { id: 'CASE001', client: 'John Doe', service: 'DataFlow Verification', status: 'Pending Review', consultant: 'Jane Smith', lastUpdate: '2024-08-20' },
    { id: 'CASE002', client: 'Fatima Al-Mansoori', service: 'Regulatory Licensing', status: 'Approved', consultant: 'Ahmed Khan', lastUpdate: '2024-08-18' },
    { id: 'CASE003', client: 'Maria Garcia', service: 'Credential Evaluation', status: 'In Progress', consultant: 'Jane Smith', lastUpdate: '2024-08-22' },
    { id: 'CASE004', client: 'Dr. Chen', service: 'DataFlow Verification', status: 'Rejected', consultant: 'Ahmed Khan', lastUpdate: '2024-08-15' },
    { id: 'CASE005', client: 'Aisha Hassan', service: 'Regulatory Licensing', status: 'Completed', consultant: 'Jane Smith', lastUpdate: '2024-08-10' },
  ];

  const filteredCases = allCases.filter(caseItem => {
    const matchesSearch = caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          caseItem.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          caseItem.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || caseItem.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Case Management</h1>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by client, service, or ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Cases List */}
        {filteredCases.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg mb-4">No cases found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-3 px-4 border-b">Case ID</th>
                  <th className="py-3 px-4 border-b">Client</th>
                  <th className="py-3 px-4 border-b">Service</th>
                  <th className="py-3 px-4 border-b">Status</th>
                  <th className="py-3 px-4 border-b">Consultant</th>
                  <th className="py-3 px-4 border-b">Last Update</th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem) => (
                  <tr key={caseItem.id} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-3 px-4 text-gray-800">{caseItem.id}</td>
                    <td className="py-3 px-4 text-gray-800">{caseItem.client}</td>
                    <td className="py-3 px-4 text-gray-800">{caseItem.service}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        caseItem.status === 'Approved' || caseItem.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        caseItem.status === 'Pending Review' || caseItem.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-800">{caseItem.consultant}</td>
                    <td className="py-3 px-4 text-gray-800">{caseItem.lastUpdate}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button title="View Details" className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button title="Edit Case" className="text-primary-500 hover:text-primary-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Edit className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
