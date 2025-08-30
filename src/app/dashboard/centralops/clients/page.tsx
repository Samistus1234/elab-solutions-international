'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Filter, User, Mail, Phone, Edit } from 'lucide-react';
import { useState } from 'react';

export default function CentralOpsClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // e.g., Active, Inactive

  // Placeholder data for clients
  const allClients = [
    { id: 'CL001', name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890', status: 'Active' },
    { id: 'CL002', name: 'Fatima Al-Mansoori', email: 'fatima.a@example.com', phone: '+971501234567', status: 'Active' },
    { id: 'CL003', name: 'Maria Garcia', email: 'maria.g@example.com', phone: '+34600123456', status: 'Inactive' },
    { id: 'CL004', name: 'Dr. Chen', email: 'dr.chen@example.com', phone: '+8613812345678', status: 'Active' },
  ];

  const filteredClients = allClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Client Management</h1>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Clients List */}
        {filteredClients.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg mb-4">No clients found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-3 px-4 border-b">Client ID</th>
                  <th className="py-3 px-4 border-b">Name</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b">Phone</th>
                  <th className="py-3 px-4 border-b">Status</th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-3 px-4 text-gray-800">{client.id}</td>
                    <td className="py-3 px-4 text-gray-800">{client.name}</td>
                    <td className="py-3 px-4 text-gray-800 flex items-center"><Mail className="h-4 w-4 mr-1" /> {client.email}</td>
                    <td className="py-3 px-4 text-gray-800 flex items-center"><Phone className="h-4 w-4 mr-1" /> {client.phone}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        client.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button title="View Details" className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <User className="h-5 w-5" />
                        </button>
                        <button title="Edit Client" className="text-primary-500 hover:text-primary-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
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
