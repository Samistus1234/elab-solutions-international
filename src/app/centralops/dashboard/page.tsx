'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  Users, DollarSign, TrendingUp, Award, Clock, CheckCircle, 
  AlertCircle, Star, Target, Zap, FileText, Calendar,
  Filter, Download, Bell, Settings, Search, Plus,
  ArrowUp, ArrowDown, MoreVertical, Eye, Edit, MapPin
} from 'lucide-react';

// Mock data based on research from healthcare recruitment platforms
const dashboardData = {
  overview: {
    totalClients: 847,
    activeApplications: 234,
    completedPlacements: 156,
    monthlyEarnings: 47650,
    conversionRate: 68.5,
    averageProcessingTime: 89, // days
    clientGrowth: 12.3,
    earningsGrowth: 23.7
  },
  clientJourneyData: [
    { stage: 'Initial Inquiry', count: 324, percentage: 100 },
    { stage: 'Document Collection', count: 298, percentage: 92 },
    { stage: 'Verification Process', count: 267, percentage: 82 },
    { stage: 'Exam Preparation', count: 234, percentage: 72 },
    { stage: 'License Application', count: 198, percentage: 61 },
    { stage: 'Job Matching', count: 167, percentage: 52 },
    { stage: 'Placement Complete', count: 156, percentage: 48 }
  ],
  monthlyEarnings: [
    { month: 'Jan', earnings: 32400, commissions: 8100 },
    { month: 'Feb', earnings: 35200, commissions: 8800 },
    { month: 'Mar', earnings: 38900, commissions: 9725 },
    { month: 'Apr', earnings: 41200, commissions: 10300 },
    { month: 'May', earnings: 44800, commissions: 11200 },
    { month: 'Jun', earnings: 47650, commissions: 11913 }
  ],
  serviceBreakdown: [
    { name: 'NCLEX-RN', value: 156, earnings: 18720 },
    { name: 'DataFlow-Gulf', value: 289, earnings: 15678 },
    { name: 'UK NMC', value: 134, earnings: 8940 },
    { name: 'English Training', value: 198, earnings: 3960 },
    { name: 'Specialty Exams', value: 70, earnings: 2352 }
  ],
  recentActivities: [
    { id: 1, type: 'placement', client: 'Sarah Ahmed', action: 'Placement completed - DHA Dubai', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'application', client: 'Michael Chen', action: 'NCLEX application submitted', time: '4 hours ago', status: 'pending' },
    { id: 3, type: 'document', client: 'Priya Sharma', action: 'Documents verified - UK NMC', time: '6 hours ago', status: 'success' },
    { id: 4, type: 'payment', client: 'Ahmed Hassan', action: 'Commission payment processed', time: '1 day ago', status: 'success' },
    { id: 5, type: 'inquiry', client: 'Maria Santos', action: 'New client inquiry received', time: '2 days ago', status: 'new' }
  ],
  topPerformers: [
    { name: 'Dr. Sarah Ahmed', service: 'NCLEX-RN', status: 'Placement Complete', earnings: 2850, progress: 100 },
    { name: 'Nurse Maria Santos', service: 'DHA Dubai', status: 'License Approved', earnings: 2400, progress: 95 },
    { name: 'Dr. Ahmed Hassan', service: 'UK NMC', status: 'Exam Scheduled', earnings: 1800, progress: 75 },
    { name: 'Priya Sharma', service: 'DataFlow PSV', status: 'Verification Complete', earnings: 1200, progress: 60 }
  ]
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// User tier determination (this would come from user auth in real app)
const getCurrentUserTier = () => 'specialist'; // specialist, consultant, individual

export default function CentralOpsDashboard() {
  const [userTier, setUserTier] = useState(getCurrentUserTier());
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'specialist':
        return {
          title: 'Specialist Dashboard',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          features: ['full-analytics', 'team-management', 'advanced-reporting', 'territory-management']
        };
      case 'consultant':
        return {
          title: 'Consultant Dashboard',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          features: ['client-analytics', 'team-view', 'standard-reporting']
        };
      default:
        return {
          title: 'Recruiter Dashboard',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          features: ['basic-analytics', 'client-management']
        };
    }
  };

  const tierConfig = getTierConfig(userTier);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/centralops" className="text-2xl font-bold text-gray-900 mr-8">
                CentralOps
              </Link>
              <div className={`${tierConfig.bgColor} ${tierConfig.borderColor} border rounded-full px-4 py-1`}>
                <span className={`text-sm font-medium ${tierConfig.color}`}>
                  {tierConfig.title}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Time Range:</span>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.overview.totalClients}</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{dashboardData.overview.clientGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                <p className="text-3xl font-bold text-gray-900">${dashboardData.overview.monthlyEarnings.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{dashboardData.overview.earningsGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <DollarSign className="h-8 w-8 text-green-600" />
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
                <p className="text-sm font-medium text-gray-600">Active Applications</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.overview.activeApplications}</p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">{dashboardData.overview.averageProcessingTime} days avg</span>
                </div>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <FileText className="h-8 w-8 text-yellow-600" />
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
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.overview.conversionRate}%</p>
                <div className="flex items-center mt-2">
                  <Target className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">{dashboardData.overview.completedPlacements} placements</span>
                </div>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Client Journey Funnel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Client Journey Progress</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
            </div>
            
            <div className="space-y-4">
              {dashboardData.clientJourneyData.map((stage, index) => (
                <div key={stage.stage} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{stage.count}</span>
                      <span className="text-sm text-gray-400">({stage.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Monthly Earnings Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
              <div className="flex space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Earnings</span>
                </div>
                <div className="flex items-center ml-4">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Commission</span>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dashboardData.monthlyEarnings}>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Service Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Service Distribution</h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dashboardData.serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dashboardData.serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-2 mt-4">
              {dashboardData.serviceBreakdown.map((service, index) => (
                <div key={service.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-gray-700">{service.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">${service.earnings}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Clients</h3>
              <Link href="/centralops/clients" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Clients
              </Link>
            </div>
            
            <div className="space-y-4">
              {dashboardData.topPerformers.map((client, index) => (
                <div key={client.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{client.name}</h4>
                      <p className="text-sm text-gray-600">{client.service} • {client.status}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${client.earnings}</p>
                      <div className="flex items-center mt-1">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${client.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{client.progress}%</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {dashboardData.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`rounded-full p-2 ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'pending' ? 'bg-yellow-100' :
                    activity.status === 'new' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {activity.type === 'placement' && <Award className="h-4 w-4 text-green-600" />}
                    {activity.type === 'application' && <FileText className="h-4 w-4 text-yellow-600" />}
                    {activity.type === 'document' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-green-600" />}
                    {activity.type === 'inquiry' && <Users className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.client}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{activity.time}</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'success' ? 'bg-green-100 text-green-800' :
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="fixed bottom-8 right-8 flex space-x-4">
          <Link href="/centralops/clients/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors">
              <Plus className="h-6 w-6" />
            </button>
          </Link>
          <button className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-4 shadow-lg transition-colors">
            <Search className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}