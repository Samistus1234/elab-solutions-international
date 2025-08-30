'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  DollarSign, TrendingUp, TrendingDown, Calendar, Download, 
  Filter, Eye, CreditCard, Clock, CheckCircle, AlertCircle,
  Users, Target, Award, Zap, RefreshCw, Plus
} from 'lucide-react';

// Mock earnings data based on healthcare recruitment platform research
const earningsData = {
  summary: {
    totalEarnings: 127850,
    thisMonthEarnings: 12450,
    pendingCommissions: 3275,
    paidOut: 124575,
    averageCommission: 425,
    clientsThisMonth: 29,
    conversionRate: 68.2,
    growthRate: 23.4
  },
  monthlyEarnings: [
    { month: 'Jan', earnings: 8920, commissions: 2230, clients: 21, conversions: 14 },
    { month: 'Feb', earnings: 9640, commissions: 2410, clients: 23, conversions: 16 },
    { month: 'Mar', earnings: 11250, commissions: 2812, clients: 27, conversions: 19 },
    { month: 'Apr', earnings: 10875, commissions: 2719, clients: 26, conversions: 17 },
    { month: 'May', earnings: 11920, commissions: 2980, clients: 28, conversions: 19 },
    { month: 'Jun', earnings: 12450, commissions: 3113, clients: 29, conversions: 20 }
  ],
  serviceBreakdown: [
    { service: 'NCLEX-RN', clients: 45, earnings: 38250, commission: 15, color: '#3B82F6' },
    { service: 'DataFlow-Gulf', clients: 89, earnings: 31150, commission: 12, color: '#10B981' },
    { service: 'UK NMC', clients: 34, earnings: 22100, commission: 18, color: '#F59E0B' },
    { service: 'English Training', clients: 67, earnings: 18900, commission: 8, color: '#EF4444' },
    { service: 'Specialty Exams', clients: 23, earnings: 17450, commission: 22, color: '#8B5CF6' }
  ],
  recentTransactions: [
    {
      id: 'TXN-001',
      client: 'Dr. Sarah Ahmed',
      service: 'NCLEX-RN',
      amount: 2850,
      commission: 427.50,
      status: 'completed',
      date: '2024-08-25',
      payoutDate: '2024-08-30',
      type: 'placement_bonus'
    },
    {
      id: 'TXN-002',
      client: 'Nurse Maria Santos',
      service: 'DHA Dubai',
      amount: 1950,
      commission: 292.50,
      status: 'completed',
      date: '2024-08-23',
      payoutDate: '2024-08-28',
      type: 'service_commission'
    },
    {
      id: 'TXN-003',
      client: 'Dr. Ahmed Hassan',
      service: 'UK NMC',
      amount: 2200,
      commission: 330,
      status: 'pending',
      date: '2024-08-20',
      payoutDate: 'Pending completion',
      type: 'milestone_payment'
    },
    {
      id: 'TXN-004',
      client: 'Priya Sharma',
      service: 'English Training',
      amount: 799,
      commission: 119.85,
      status: 'paid',
      date: '2024-08-18',
      payoutDate: '2024-08-25',
      type: 'service_commission'
    },
    {
      id: 'TXN-005',
      client: 'Dr. Michael Chen',
      service: 'AHPRA Australia',
      amount: 1650,
      commission: 247.50,
      status: 'processing',
      date: '2024-08-15',
      payoutDate: 'Processing',
      type: 'service_commission'
    }
  ],
  payoutSchedule: [
    { date: '2024-09-01', amount: 3275, status: 'scheduled', clients: 8 },
    { date: '2024-09-15', amount: 2890, status: 'estimated', clients: 7 },
    { date: '2024-10-01', amount: 3150, status: 'projected', clients: 9 },
    { date: '2024-10-15', amount: 2750, status: 'projected', clients: 6 }
  ]
};

const statusColors = {
  'completed': 'bg-green-100 text-green-800',
  'pending': 'bg-yellow-100 text-yellow-800',
  'paid': 'bg-blue-100 text-blue-800',
  'processing': 'bg-purple-100 text-purple-800',
  'cancelled': 'bg-red-100 text-red-800'
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function EarningsPage() {
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Earnings & Commissions</h1>
              <p className="text-gray-600">Track your earnings, commissions, and payout schedules</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1m">Last month</option>
                <option value="3m">Last 3 months</option>
                <option value="6m">Last 6 months</option>
                <option value="1y">Last year</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Earnings</p>
                <p className="text-3xl font-bold">${earningsData.summary.totalEarnings.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-green-100 text-sm">{earningsData.summary.growthRate}% growth</span>
                </div>
              </div>
              <div className="bg-green-400 rounded-full p-3">
                <DollarSign className="h-8 w-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">This Month</p>
                <p className="text-3xl font-bold text-gray-900">${earningsData.summary.thisMonthEarnings.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Users className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-blue-600 text-sm">{earningsData.summary.clientsThisMonth} clients</span>
                </div>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Commissions</p>
                <p className="text-3xl font-bold text-gray-900">${earningsData.summary.pendingCommissions.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-yellow-600 text-sm">Processing</span>
                </div>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <RefreshCw className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">{earningsData.summary.conversionRate}%</p>
                <div className="flex items-center mt-2">
                  <Target className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-purple-600 text-sm">Conversion</span>
                </div>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Earnings Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Earnings Trend</h3>
              <div className="flex space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-gray-600">Earnings</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-gray-600">Commissions</span>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={earningsData.monthlyEarnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, '']} />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="commissions" 
                  stackId="1"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Service Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings by Service</h3>
            
            <div className="space-y-4">
              {earningsData.serviceBreakdown.map((service, index) => (
                <div key={service.service} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: service.color }}
                    />
                    <span className="font-medium text-gray-900">{service.service}</span>
                    <span className="text-sm text-gray-500">({service.clients} clients)</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${service.earnings.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{service.commission}% commission</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <Link href="/centralops/earnings/history">
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  View All
                </button>
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {earningsData.recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.client}</div>
                      <div className="text-sm text-gray-500">{transaction.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.service}</div>
                      <div className="text-sm text-gray-500">{transaction.type.replace('_', ' ')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${transaction.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">${transaction.commission}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[transaction.status]}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.payoutDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Payout Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Payouts</h3>
            <Link href="/centralops/earnings/schedule">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Full Schedule
              </button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {earningsData.payoutSchedule.map((payout, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`rounded-full p-2 ${
                    payout.status === 'scheduled' ? 'bg-green-100' :
                    payout.status === 'estimated' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {payout.status === 'scheduled' && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {payout.status === 'estimated' && <Clock className="h-5 w-5 text-blue-600" />}
                    {payout.status === 'projected' && <Calendar className="h-5 w-5 text-gray-600" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {new Date(payout.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="text-sm text-gray-500">{payout.clients} clients • {payout.status}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${payout.amount.toLocaleString()}</div>
                  <div className={`text-sm font-medium ${
                    payout.status === 'scheduled' ? 'text-green-600' :
                    payout.status === 'estimated' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}