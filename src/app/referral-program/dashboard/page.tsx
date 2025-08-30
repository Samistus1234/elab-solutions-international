'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, DollarSign, TrendingUp, Award, Link as LinkIcon, Copy,
  Calendar, Filter, Download, Share2, Mail, MessageCircle,
  Star, Target, ArrowUpRight, ArrowDownRight, Clock,
  CheckCircle, Eye, ExternalLink, Bell, Settings,
  BarChart3, PieChart, LineChart, Zap
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// Mock data for the dashboard
const currentUser = {
  id: 'user-123',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  avatar: '/api/placeholder/64/64',
  tier: 'Champion Referrer',
  joinedDate: '2023-08-15',
  referralCode: 'SARAH2024',
  referralLink: 'https://elabsolutions.com/ref/SARAH2024'
};

const dashboardStats = {
  totalReferrals: 23,
  successfulReferrals: 18,
  pendingReferrals: 5,
  totalEarnings: 1485,
  thisMonthEarnings: 275,
  conversionRate: 78.3,
  clickThroughRate: 12.5,
  avgEarningsPerReferral: 82.5
};

const earningsData = [
  { month: 'Jan', earnings: 125, referrals: 2 },
  { month: 'Feb', earnings: 280, referrals: 4 },
  { month: 'Mar', earnings: 195, referrals: 3 },
  { month: 'Apr', earnings: 340, referrals: 5 },
  { month: 'May', earnings: 270, referrals: 3 },
  { month: 'Jun', earnings: 275, referrals: 4 }
];

const serviceBreakdown = [
  { name: 'DataFlow', value: 8, earnings: 600, color: '#3b82f6' },
  { name: 'NCLEX', value: 5, earnings: 500, color: '#10b981' },
  { name: 'Licensing', value: 3, earnings: 300, color: '#f59e0b' },
  { name: 'Consultation', value: 2, earnings: 85, color: '#8b5cf6' }
];

const recentReferrals = [
  {
    id: '1',
    name: 'Maria Santos',
    email: 'm.santos@email.com',
    service: 'DataFlow',
    status: 'completed',
    earnings: 75,
    date: '2024-01-15',
    progress: 100
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    email: 'a.hassan@email.com',
    service: 'NCLEX',
    status: 'in_progress',
    earnings: 0,
    date: '2024-01-12',
    progress: 65
  },
  {
    id: '3',
    name: 'Jennifer Liu',
    email: 'j.liu@email.com',
    service: 'UK NMC',
    status: 'completed',
    earnings: 150,
    date: '2024-01-10',
    progress: 100
  },
  {
    id: '4',
    name: 'Carlos Rodriguez',
    email: 'c.rodriguez@email.com',
    service: 'Consultation',
    status: 'pending',
    earnings: 0,
    date: '2024-01-08',
    progress: 25
  },
  {
    id: '5',
    name: 'Fatima Al-Zahra',
    email: 'f.alzahra@email.com',
    service: 'DataFlow',
    status: 'completed',
    earnings: 75,
    date: '2024-01-05',
    progress: 100
  }
];

const notifications = [
  {
    id: '1',
    type: 'earnings',
    title: 'Payment Received',
    message: 'You earned $75 from Maria Santos referral',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'referral',
    title: 'New Referral',
    message: 'Ahmed Hassan signed up for NCLEX preparation',
    time: '1 day ago',
    read: false
  },
  {
    id: '3',
    type: 'tier',
    title: 'Tier Upgrade',
    message: 'Congratulations! You\'ve been upgraded to Champion Referrer',
    time: '3 days ago',
    read: true
  }
];

export default function ReferralDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedService, setSelectedService] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUser.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Completed</span>;
      case 'in_progress':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">In Progress</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pending</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Unknown</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
                <p className="text-gray-600">{currentUser.tier} • Member since {new Date(currentUser.joinedDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                            <p className="text-gray-600 text-sm">{notification.message}</p>
                            <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/referral-program">
                <button className="text-gray-600 hover:text-gray-800">
                  <ExternalLink className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${dashboardStats.totalEarnings}</p>
                <p className="text-sm text-green-600">+${dashboardStats.thisMonthEarnings} this month</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalReferrals}</p>
                <p className="text-sm text-blue-600">{dashboardStats.successfulReferrals} successful</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.conversionRate}%</p>
                <p className="text-sm text-purple-600">Above average</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Per Referral</p>
                <p className="text-2xl font-bold text-gray-900">${dashboardStats.avgEarningsPerReferral}</p>
                <p className="text-sm text-orange-600">+12% vs last month</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Referral Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Link</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 truncate">{currentUser.referralLink}</span>
                  <button
                    onClick={handleCopyLink}
                    className="ml-2 p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-blue-600" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </button>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Link Clicks</span>
                    <span className="font-medium">247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Click Rate</span>
                    <span className="font-medium">{dashboardStats.clickThroughRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Referral Code</span>
                    <span className="font-medium">{currentUser.referralCode}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Earnings Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Earnings Overview</h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                </select>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={3} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Service Breakdown</h3>
              
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={serviceBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {serviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {serviceBreakdown.map((service, index) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3`} style={{ backgroundColor: service.color }}></div>
                      <span className="text-sm text-gray-700">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{service.value} referrals</div>
                      <div className="text-xs text-gray-600">${service.earnings}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Referrals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Referrals</h3>
                <div className="flex space-x-2">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Services</option>
                    <option value="dataflow">DataFlow</option>
                    <option value="nclex">NCLEX</option>
                    <option value="licensing">Licensing</option>
                    <option value="consultation">Consultation</option>
                  </select>
                  <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-600 uppercase tracking-wider border-b">
                      <th className="pb-3">Referral</th>
                      <th className="pb-3">Service</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Earnings</th>
                      <th className="pb-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentReferrals.map((referral) => (
                      <tr key={referral.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div>
                            <div className="font-medium text-gray-900">{referral.name}</div>
                            <div className="text-sm text-gray-600">{referral.email}</div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-900">{referral.service}</span>
                        </td>
                        <td className="py-4">
                          {getStatusBadge(referral.status)}
                        </td>
                        <td className="py-4">
                          <span className="font-medium text-gray-900">
                            {referral.earnings > 0 ? `$${referral.earnings}` : '-'}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-600">
                            {new Date(referral.date).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <span className="text-sm text-gray-600">Showing 5 of {dashboardStats.totalReferrals} referrals</span>
                <Link href="/referral-program/referrals">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View all referrals →
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Keep Growing Your Network!</h3>
            <p className="text-blue-100 mb-6">
              Share your referral link with more colleagues to increase your earnings and help them succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/referral-program">
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition-colors">
                  Learn More About Program
                </button>
              </Link>
              <button
                onClick={handleCopyLink}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {copied ? 'Link Copied!' : 'Copy Referral Link'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}