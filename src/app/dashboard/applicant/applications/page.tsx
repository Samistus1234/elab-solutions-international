import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Link from 'next/link';

export default function ApplicationsPage() {
  // In a real application, you would fetch applications data here
  const applications = [
    { id: 'APP001', service: 'DataFlow Verification - DHA', status: 'Pending Review', submitted: '2024-07-10' },
    { id: 'APP002', service: 'Regulatory Licensing - SCFHS', status: 'Approved', submitted: '2024-06-20' },
    { id: 'APP003', service: 'Credential Evaluation - WES', status: 'Rejected', submitted: '2024-05-01' },
    { id: 'APP004', service: 'DataFlow Verification - MOPH', status: 'In Progress', submitted: '2024-07-25' },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Applications</h1>
        
        <div className="mb-8">
          <Link href="/dashboard/applicant/applications/new" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Start New Application
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg mb-4">You haven't started any applications yet.</p>
            <p>Click "Start New Application" to begin your journey!</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Current Applications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    <th className="py-3 px-4 border-b">Application ID</th>
                    <th className="py-3 px-4 border-b">Service</th>
                    <th className="py-3 px-4 border-b">Status</th>
                    <th className="py-3 px-4 border-b">Submitted On</th>
                    <th className="py-3 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-200 last:border-b-0">
                      <td className="py-3 px-4 text-gray-800">{app.id}</td>
                      <td className="py-3 px-4 text-gray-800">{app.service}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          app.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-800">{app.submitted}</td>
                      <td className="py-3 px-4">
                        <Link href={`/dashboard/applicant/applications/${app.id}`} className="text-primary-600 hover:underline">View Details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}