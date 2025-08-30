'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Filter, FileText, Download, Eye } from 'lucide-react';
import { useState } from 'react';

export default function CentralOpsDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // e.g., Verified, Pending, Rejected
  const [filterClient, setFilterClient] = useState('All');

  // Placeholder data for documents
  const allDocuments = [
    { id: 'DOC001', name: 'John Doe - Passport.pdf', client: 'John Doe', type: 'Passport', status: 'Verified', date: '2024-08-20' },
    { id: 'DOC002', name: 'Fatima A. - Degree.pdf', client: 'Fatima Al-Mansoori', type: 'Degree', status: 'Pending Review', date: '2024-08-18' },
    { id: 'DOC003', name: 'Maria G. - License.pdf', client: 'Maria Garcia', type: 'License', status: 'Rejected', date: '2024-08-22' },
    { id: 'DOC004', name: 'Dr. Chen - Experience.pdf', client: 'Dr. Chen', type: 'Experience', status: 'Verified', date: '2024-08-15' },
  ];

  const uniqueClients = ['All', ...Array.from(new Set(allDocuments.map(doc => doc.client)))];

  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || doc.status === filterStatus;
    const matchesClient = filterClient === 'All' || doc.client === filterClient;
    return matchesSearch && matchesStatus && matchesClient;
  });

  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Document Repository</h1>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by document name or client..."
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
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
            >
              {uniqueClients.map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Documents List */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg mb-4">No documents found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-3 px-4 border-b">Document Name</th>
                  <th className="py-3 px-4 border-b">Client</th>
                  <th className="py-3 px-4 border-b">Type</th>
                  <th className="py-3 px-4 border-b">Status</th>
                  <th className="py-3 px-4 border-b">Uploaded On</th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-3 px-4 text-gray-800 flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 mr-2" /> {doc.name}
                    </td>
                    <td className="py-3 px-4 text-gray-800">{doc.client}</td>
                    <td className="py-3 px-4 text-gray-800">{doc.type}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        doc.status === 'Verified' ? 'bg-green-100 text-green-800' :
                        doc.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-800">{doc.date}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button title="View Document" className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button title="Download Document" className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Download className="h-5 w-5" />
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
