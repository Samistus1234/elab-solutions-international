'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Plus, Eye, Edit, Download, Upload, DollarSign,
  TrendingUp, TrendingDown, CreditCard, Wallet, PieChart, BarChart3,
  Calendar, Clock, CheckCircle, AlertCircle, XCircle, RefreshCw,
  Users, Building, Globe, Target, Award, Zap, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';

// Financial data and transactions
const financialMetrics = {
  totalRevenue: 2450000,
  monthlyRevenue: 347500,
  pendingPayments: 89750,
  totalCommissions: 892350,
  paidCommissions: 784200,
  pendingCommissions: 108150,
  averageTransactionValue: 1284,
  monthlyGrowth: 15.3,
  profitMargin: 34.8,
  operatingExpenses: 156700
};

const recentTransactions = [
  {
    id: 'TXN-001',
    type: 'payment_received',
    clientName: 'Dr. Sarah Ahmed',
    serviceName: 'DataFlow PSV',
    amount: 1299,
    commission: 195,
    consultant: 'Ahmed Khan',
    commissionRate: 15,
    date: '2024-08-30',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    reference: 'BT-789456123'
  },
  {
    id: 'TXN-002',
    type: 'commission_paid',
    consultantName: 'Jane Smith',
    amount: 2847,
    servicesCount: 12,
    period: 'August 2024',
    date: '2024-08-29',
    status: 'completed',
    paymentMethod: 'Wire Transfer',
    reference: 'WT-456789123'
  },
  {
    id: 'TXN-003',
    type: 'payment_received',
    clientName: 'Maria Santos',
    serviceName: 'NCLEX-RN',
    amount: 899,
    commission: 108,
    consultant: 'Jane Smith',
    commissionRate: 12,
    date: '2024-08-28',
    status: 'completed',
    paymentMethod: 'Credit Card',
    reference: 'CC-123456789'
  },
  {
    id: 'TXN-004',
    type: 'payment_pending',
    clientName: 'Dr. Priya Sharma',
    serviceName: 'UK NMC',
    amount: 1199,
    commission: 180,
    consultant: 'Michael Brown',
    commissionRate: 15,
    date: '2024-08-25',
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    reference: 'BT-987654321'
  },
  {
    id: 'TXN-005',
    type: 'refund_issued',
    clientName: 'Ahmed Hassan',
    serviceName: 'Australia AHPRA',
    amount: -549,
    commission: -82,
    consultant: 'Lisa Johnson',
    commissionRate: 15,
    date: '2024-08-24',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    reference: 'RF-456123789'
  }
];

const commissionStructure = [
  {
    tier: 'Individual Recruiter',
    baseRate: 10,
    bonusThreshold: 10000,
    bonusRate: 2,
    monthlyTarget: 15000,
    description: 'Entry-level commission structure'
  },
  {
    tier: 'Consultant Level',
    baseRate: 12,
    bonusThreshold: 25000,
    bonusRate: 3,
    monthlyTarget: 35000,
    description: 'Mid-tier with team bonuses'
  },
  {
    tier: 'Specialist Partner',
    baseRate: 15,
    bonusThreshold: 50000,
    bonusRate: 5,
    monthlyTarget: 75000,
    description: 'Premium tier with territory bonuses'
  }
];

const monthlyRevenueData = [
  { month: 'Jan', revenue: 287400, commissions: 34488, expenses: 142800 },
  { month: 'Feb', revenue: 312600, commissions: 37512, expenses: 148200 },
  { month: 'Mar', revenue: 298900, commissions: 35868, expenses: 151300 },
  { month: 'Apr', revenue: 334200, commissions: 40104, expenses: 153700 },
  { month: 'May', revenue: 356800, commissions: 42816, expenses: 155100 },
  { month: 'Jun', revenue: 347500, commissions: 41700, expenses: 156700 }
];

const serviceRevenueBreakdown = [
  { service: 'DataFlow PSV', revenue: 687300, transactions: 529, avgValue: 1299 },
  { service: 'NCLEX-RN', revenue: 456789, transactions: 508, avgValue: 899 },
  { service: 'UK NMC', revenue: 398456, transactions: 332, avgValue: 1199 },
  { service: 'Australia AHPRA', revenue: 287654, transactions: 262, avgValue: 1099 },
  { service: 'Consultations', revenue: 123567, transactions: 829, avgValue: 149 },
  { service: 'English Training', revenue: 98234, transactions: 328, avgValue: 299 }
];

export default function FinancialOperationsCenter() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const filteredTransactions = recentTransactions.filter(txn => {
    const matchesSearch = 
      txn.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.consultantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.serviceName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || txn.type === filterType;
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'payment_received': return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'commission_paid': return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      case 'payment_pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'refund_issued': return <RefreshCw className="h-4 w-4 text-red-600" />;
      default: return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Operations Center</h1>
            <p className="text-gray-600">Complete financial management and commission tracking</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Record Payment
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Import Transactions
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Financial Dashboard', icon: BarChart3 },
              { id: 'transactions', name: 'Transactions', icon: CreditCard },
              { id: 'commissions', name: 'Commissions', icon: Users },
              { id: 'reports', name: 'Financial Reports', icon: PieChart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-6">
        {/* Financial Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Key Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialMetrics.totalRevenue)}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+{financialMetrics.monthlyGrowth}%</span>
                    </div>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialMetrics.monthlyRevenue)}</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-600">This month</span>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Commissions</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialMetrics.totalCommissions)}</p>
                    <div className="flex items-center mt-1">
                      <Users className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-sm text-gray-600">All partners</span>
                    </div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialMetrics.pendingPayments)}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">Awaiting processing</span>
                    </div>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Revenue Breakdown Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
                <div className="space-y-4">
                  {monthlyRevenueData.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{month.month}</span>
                          <span className="text-sm text-gray-600">{formatCurrency(month.revenue)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(month.revenue / 400000) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Revenue Breakdown</h3>
                <div className="space-y-4">
                  {serviceRevenueBreakdown.map((service, index) => (
                    <div key={service.service} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{service.service}</span>
                          <span className="text-sm text-gray-600">{formatCurrency(service.revenue)}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{service.transactions} transactions</span>
                          <span>Avg: {formatCurrency(service.avgValue)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Financial Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <Plus className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-700 font-medium">Record Payment</span>
                </button>
                <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-700 font-medium">Process Commissions</span>
                </button>
                <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <Download className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-purple-700 font-medium">Generate Invoice</span>
                </button>
                <button className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                  <BarChart3 className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-orange-700 font-medium">Financial Report</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Transaction Filters */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="payment_received">Payments Received</option>
                  <option value="commission_paid">Commissions Paid</option>
                  <option value="payment_pending">Pending Payments</option>
                  <option value="refund_issued">Refunds Issued</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedTransaction(transaction);
                      setShowTransactionModal(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {transaction.clientName || transaction.consultantName}
                            </p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {transaction.serviceName || `${transaction.servicesCount} services - ${transaction.period}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.reference} • {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                        </p>
                        {transaction.commission && (
                          <p className="text-xs text-gray-500">
                            Commission: {formatCurrency(transaction.commission)}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">{transaction.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Commissions Tab */}
        {activeTab === 'commissions' && (
          <div className="space-y-6">
            {/* Commission Structure */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {commissionStructure.map((tier, index) => (
                  <div key={tier.tier} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{tier.tier}</h4>
                    <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Rate:</span>
                        <span className="font-medium">{tier.baseRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bonus Rate:</span>
                        <span className="font-medium">+{tier.bonusRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bonus Threshold:</span>
                        <span className="font-medium">{formatCurrency(tier.bonusThreshold)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Target:</span>
                        <span className="font-medium">{formatCurrency(tier.monthlyTarget)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commission Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(financialMetrics.paidCommissions)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-semibold text-yellow-600">{formatCurrency(financialMetrics.pendingCommissions)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Due:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(financialMetrics.totalCommissions)}</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Payment Rate:</span>
                      <span className="font-semibold text-blue-600">
                        {((financialMetrics.paidCommissions / financialMetrics.totalCommissions) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Earners This Month</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Ahmed Khan', earnings: 4250, rank: 1 },
                    { name: 'Jane Smith', earnings: 3890, rank: 2 },
                    { name: 'Michael Brown', earnings: 3456, rank: 3 },
                    { name: 'Lisa Johnson', earnings: 2987, rank: 4 }
                  ].map((consultant) => (
                    <div key={consultant.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">#{consultant.rank}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{consultant.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">{formatCurrency(consultant.earnings)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Reports</h3>
              <p className="text-gray-600">Advanced financial reporting and analytics coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Transaction Details</h3>
              <button 
                onClick={() => setShowTransactionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">Transaction Information</h4>
                <div className="space-y-2">
                  <p><strong>ID:</strong> {selectedTransaction.id}</p>
                  <p><strong>Type:</strong> {selectedTransaction.type.replace('_', ' ').toUpperCase()}</p>
                  <p><strong>Amount:</strong> 
                    <span className={`ml-2 ${selectedTransaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(selectedTransaction.amount)}
                    </span>
                  </p>
                  <p><strong>Date:</strong> {new Date(selectedTransaction.date).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedTransaction.status)}`}>
                      {selectedTransaction.status}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Payment Details</h4>
                <div className="space-y-2">
                  <p><strong>Method:</strong> {selectedTransaction.paymentMethod}</p>
                  <p><strong>Reference:</strong> {selectedTransaction.reference}</p>
                  {selectedTransaction.commission && (
                    <p><strong>Commission:</strong> 
                      <span className="ml-2 text-blue-600">{formatCurrency(selectedTransaction.commission)}</span>
                    </p>
                  )}
                  {selectedTransaction.commissionRate && (
                    <p><strong>Rate:</strong> {selectedTransaction.commissionRate}%</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Invoice
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Send Receipt
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                Export PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}