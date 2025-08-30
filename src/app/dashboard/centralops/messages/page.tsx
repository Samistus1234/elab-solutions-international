'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Filter, MessageSquare, Mail, PhoneCall, PenTool, Eye } from 'lucide-react';
import { useState } from 'react';

export default function CentralOpsMessagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // e.g., Email, Call, Note
  const [filterClient, setFilterClient] = useState('All');

  // Placeholder data for communication logs
  const allCommunications = [
    { id: 'COMM001', client: 'John Doe', type: 'Email', subject: 'DataFlow Application Update', date: '2024-08-25', summary: 'Sent email regarding missing document.' },
    { id: 'COMM002', client: 'Fatima Al-Mansoori', type: 'Call', subject: 'Licensing Inquiry', date: '2024-08-24', summary: 'Discussed next steps for regulatory licensing.' },
    { id: 'COMM003', client: 'Maria Garcia', type: 'Note', subject: 'Client Follow-up', date: '2024-08-23', summary: 'Internal note: Client requested call back next week.' },
    { id: 'COMM004', client: 'Dr. Chen', type: 'Email', subject: 'Credential Evaluation Report', date: '2024-08-22', summary: 'Sent final evaluation report.' },
  ];

  const uniqueClients = ['All', ...Array.from(new Set(allCommunications.map(comm => comm.client)))];

  const filteredCommunications = allCommunications.filter(comm => {
    const matchesSearch = comm.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comm.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || comm.type === filterType;
    const matchesClient = filterClient === 'All' || comm.client === filterClient;
    return matchesSearch && matchesType && matchesClient;
  });

  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Communication History</h1>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by client, subject, or summary..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Email">Email</option>
              <option value="Call">Call</option>
              <option value="Note">Note</option>
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

        {/* Communication List */}
        {filteredCommunications.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg mb-4">No communication logs found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-3 px-4 border-b">Client</th>
                  <th className="py-3 px-4 border-b">Type</th>
                  <th className="py-3 px-4 border-b">Subject</th>
                  <th className="py-3 px-4 border-b">Date</th>
                  <th className="py-3 px-4 border-b">Summary</th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommunications.map((comm) => (
                  <tr key={comm.id} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-3 px-4 text-gray-800">{comm.client}</td>
                    <td className="py-3 px-4 text-gray-800">
                      {comm.type === 'Email' && <Mail className="h-5 w-5 text-blue-500 inline-block mr-2" />}
                      {comm.type === 'Call' && <PhoneCall className="h-5 w-5 text-green-500 inline-block mr-2" />}
                      {comm.type === 'Note' && <PenTool className="h-5 w-5 text-purple-500 inline-block mr-2" />}
                      {comm.type}
                    </td>
                    <td className="py-3 px-4 text-gray-800">{comm.subject}</td>
                    <td className="py-3 px-4 text-gray-800">{comm.date}</td>
                    <td className="py-3 px-4 text-gray-800">{comm.summary}</td>
                    <td className="py-3 px-4 text-center">
                      <button title="View Details" className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
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
