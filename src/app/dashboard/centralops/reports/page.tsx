'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BarChart, LineChart, PieChart } from 'lucide-react';

export default function CentralOpsReportsPage() {
  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports & Analytics</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overview Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <BarChart className="h-12 w-12 text-primary-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Application Status Breakdown</h3>
              <p className="text-gray-600">View the distribution of applications by status.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <LineChart className="h-12 w-12 text-primary-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Monthly Application Trends</h3>
              <p className="text-gray-600">Track application submissions over time.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <PieChart className="h-12 w-12 text-primary-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Service Popularity</h3>
              <p className="text-gray-600">Analyze which services are most requested.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Custom Reports</h2>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              Generate custom reports based on various criteria.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
              Generate Report
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
