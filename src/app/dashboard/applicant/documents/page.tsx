'use client'; // Added use client directive

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { UploadCloud, FileText, Trash2, Download, Eye } from 'lucide-react';

export default function DocumentsPage() {
  // In a real application, you would fetch documents data here
  const documents = [
    { id: 1, name: 'Passport Copy.pdf', type: 'PDF', size: '1.2 MB', status: 'Verified', date: '2024-07-15' },
    { id: 2, name: 'Educational Certificate.pdf', type: 'PDF', size: '3.5 MB', status: 'Pending Review', date: '2024-07-16' },
    { id: 3, name: 'Experience Letter.pdf', type: 'PDF', size: '0.8 MB', status: 'Rejected', date: '2024-07-17' },
    { id: 4, name: 'Medical License.jpg', type: 'JPG', size: '0.5 MB', status: 'Verified', date: '2024-07-18' },
  ]; // Enhanced placeholder for documents data

  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Documents</h1>
        
        {/* Document Upload Area */}
        <section className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <UploadCloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 text-lg mb-2">Drag and drop your files here</p>
          <p className="text-gray-600 mb-4">or</p>
          <input type="file" id="document-upload" className="hidden" />
          <label htmlFor="document-upload" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer">
            <UploadCloud className="h-5 w-5 mr-2" /> Upload Documents
          </label>
          <p className="text-sm text-gray-500 mt-4">Max file size: 10MB. Allowed formats: PDF, JPG, PNG.</p>
        </section>

        {/* Documents List */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Uploaded Documents</h2>
          {documents.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg mb-4">You haven't uploaded any documents yet.</p>
              <p>Use the area above to upload your files.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    <th className="py-3 px-4 border-b">File Name</th>
                    <th className="py-3 px-4 border-b">Type</th>
                    <th className="py-3 px-4 border-b">Size</th>
                    <th className="py-3 px-4 border-b">Status</th>
                    <th className="py-3 px-4 border-b">Uploaded On</th>
                    <th className="py-3 px-4 border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-b border-gray-200 last:border-b-0">
                      <td className="py-3 px-4 text-gray-800 flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-2" /> {doc.name}
                      </td>
                      <td className="py-3 px-4 text-gray-800">{doc.type}</td>
                      <td className="py-3 px-4 text-gray-800">{doc.size}</td>
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
                          <button title="Delete Document" className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
