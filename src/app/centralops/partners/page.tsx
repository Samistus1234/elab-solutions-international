'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, DollarSign, TrendingUp, Award, Target, Star,
  ArrowRight, CheckCircle, BarChart3, PieChart, Zap,
  Settings, Bell, Crown, Trophy, Briefcase, Heart,
  Search, Filter, Plus, Eye, Edit, Download, Upload,
  Calendar, Clock, Mail, Phone, MapPin, FileText
} from 'lucide-react';

export default function PartnerDashboardHub() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  // Extended partner data for management
  const allPartners = [
    {
      id: 'P-001',
      name: 'Ahmed Khan',
      email: 'ahmed.khan@example.com',
      phone: '+971-50-123-4567',
      tier: 'Specialist Partner',
      monthlyEarnings: 18750,
      totalEarnings: 224500,
      clients: 89,
      successRate: 94.2,
      rank: 1,
      joinDate: '2023-03-15',
      lastActivity: '2024-08-30',
      territory: 'UAE, Saudi Arabia',
      specialties: ['DataFlow PSV', 'Medical Licensing'],
      status: 'active',
      commissionRate: 15
    },
    {
      id: 'P-002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-987-6543',
      tier: 'Consultant Level',
      monthlyEarnings: 15420,
      totalEarnings: 185040,
      clients: 67,
      successRate: 91.8,
      rank: 2,
      joinDate: '2023-05-20',
      lastActivity: '2024-08-29',
      territory: 'USA, Canada',
      specialties: ['NCLEX-RN', 'Nursing Registration'],
      status: 'active',
      commissionRate: 12
    },
    {
      id: 'P-003',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+44-20-7946-0958',
      tier: 'Specialist Partner',
      monthlyEarnings: 14890,
      totalEarnings: 178680,
      clients: 72,
      successRate: 89.5,
      rank: 3,
      joinDate: '2023-01-10',
      lastActivity: '2024-08-28',
      territory: 'UK, Ireland',
      specialties: ['UK NMC', 'European Registration'],
      status: 'active',
      commissionRate: 15
    },
    {
      id: 'P-004',
      name: 'Lisa Johnson',
      email: 'lisa.johnson@example.com',
      phone: '+61-2-9876-5432',
      tier: 'Consultant Level',
      monthlyEarnings: 12340,
      totalEarnings: 148080,
      clients: 54,
      successRate: 87.9,
      rank: 4,
      joinDate: '2023-07-08',
      lastActivity: '2024-08-27',
      territory: 'Australia, New Zealand',
      specialties: ['AHPRA Registration', 'Allied Health'],
      status: 'active',
      commissionRate: 12
    },
    {
      id: 'P-005',
      name: 'Sarah Thompson',
      email: 'sarah.thompson@example.com',
      phone: '+1-416-555-0199',
      tier: 'Individual Recruiter',
      monthlyEarnings: 8750,
      totalEarnings: 52500,
      clients: 34,
      successRate: 85.3,
      rank: 5,
      joinDate: '2024-02-14',
      lastActivity: '2024-08-26',
      territory: 'North America',
      specialties: ['General Recruitment', 'Consultations'],
      status: 'active',
      commissionRate: 10
    }
  ];

  const partnerModules = [
    {
      id: 'recruiters',
      title: 'Recruiter Dashboard',
      description: 'Advanced dashboard for healthcare recruiters and agents with AI-powered intelligence',
      icon: Users,
      href: '/centralops/recruiters',
      color: 'from-purple-600 to-indigo-600',
      metrics: {
        activeRecruiters: 247,
        totalClients: 1856,
        monthlyPlacements: 89
      },
      features: [
        'Client portfolio management',
        'AI-powered recommendations', 
        'Advanced analytics',
        'White-label branding'
      ]
    },
    {
      id: 'earnings',
      title: 'Earnings & Commission Tracking',
      description: 'Transparent commission tracking with automated payouts and detailed earnings reports',
      icon: DollarSign,
      href: '/centralops/earnings',
      color: 'from-green-600 to-emerald-600',
      metrics: {
        totalCommissions: 892350,
        monthlyEarnings: 147650,
        averageRate: '13.2%'
      },
      features: [
        'Real-time earnings tracking',
        'Automated commission calculation',
        'Payment history', 
        'Tax documentation'
      ]
    }
  ];

  const partnerTierStats = [
    {
      tier: 'Individual Recruiter',
      count: 156,
      avgEarnings: 3450,
      commissionRate: '10%',
      color: 'bg-green-100 text-green-800'
    },
    {
      tier: 'Consultant Level',
      count: 78,
      avgEarnings: 8920,
      commissionRate: '12%',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      tier: 'Specialist Partner',
      count: 23,
      avgEarnings: 24680,
      commissionRate: '15%',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const partnerMetrics = {
    totalPartners: 257,
    activePartners: 234,
    monthlyCommissions: 147650,
    averageEarnings: 7824,
    topTierPartners: 23,
    partnerGrowth: 18.3
  };

  // Filter partners based on search and tier
  const filteredPartners = allPartners.filter(partner => {
    const matchesSearch = 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTier = filterTier === 'all' || partner.tier === filterTier;
    
    return matchesSearch && matchesTier;
  });

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Specialist Partner': return 'bg-purple-100 text-purple-800';
      case 'Consultant Level': return 'bg-blue-100 text-blue-800';
      case 'Individual Recruiter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard Hub</h1>
              <p className="text-gray-600 mt-1">Comprehensive partner management and earnings overview</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Partner
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'partners', name: 'Partner Management', icon: Users },
                { id: 'earnings', name: 'Earnings & Commissions', icon: DollarSign },
                { id: 'performance', name: 'Performance Analytics', icon: TrendingUp }
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
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Partner Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Partners</p>
                    <p className="text-2xl font-bold text-gray-900">{partnerMetrics.activePartners}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+{partnerMetrics.partnerGrowth}%</span>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
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
                    <p className="text-sm font-medium text-gray-600">Monthly Commissions</p>
                    <p className="text-2xl font-bold text-gray-900">${(partnerMetrics.monthlyCommissions / 1000).toFixed(0)}K</p>
                    <div className="flex items-center mt-1">
                      <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-600">Avg: ${partnerMetrics.averageEarnings}</span>
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
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Top Tier Partners</p>
                    <p className="text-2xl font-bold text-gray-900">{partnerMetrics.topTierPartners}</p>
                    <div className="flex items-center mt-1">
                      <Crown className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-sm text-gray-600">Specialist level</span>
                    </div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Partner Dashboard Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {partnerModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Module Header */}
                  <div className={`bg-gradient-to-r ${module.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <module.icon className="h-8 w-8" />
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="h-5 w-5 opacity-50" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p className="text-white/90 text-sm">{module.description}</p>
                  </div>

                  {/* Module Content */}
                  <div className="p-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(module.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</div>
                          <div className="text-xs text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features</h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {module.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <Link href={module.href}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${module.color} text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center hover:shadow-lg transition-all duration-200`}
                      >
                        Access {module.title}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Partner Management Tab */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            {/* Partner Filters */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search partners..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <select
                    value={filterTier}
                    onChange={(e) => setFilterTier(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Tiers</option>
                    <option value="Specialist Partner">Specialist Partner</option>
                    <option value="Consultant Level">Consultant Level</option>
                    <option value="Individual Recruiter">Individual Recruiter</option>
                  </select>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Partners List */}
            <div className="grid gap-6">
              {filteredPartners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedPartner(partner);
                    setShowPartnerModal(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                          #{partner.rank}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{partner.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(partner.tier)}`}>
                            {partner.tier}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {partner.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {partner.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {partner.territory}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Joined {new Date(partner.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Monthly Earnings</p>
                      <p className="font-semibold text-green-600">${partner.monthlyEarnings.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Clients</p>
                      <p className="font-medium">{partner.clients}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Success Rate</p>
                      <p className="font-medium">{partner.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Commission Rate</p>
                      <p className="font-medium">{partner.commissionRate}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {partner.specialties.map((specialty, specIndex) => (
                        <span key={specIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Earnings & Commissions Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            {/* Commission Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Breakdown</h3>
                <div className="space-y-4">
                  {partnerTierStats.map((tier, index) => (
                    <div key={tier.tier} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tier.color}`}>
                          {tier.tier}
                        </span>
                        <span className="text-sm text-gray-700">{tier.count} partners</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{tier.commissionRate}</div>
                        <div className="text-xs text-gray-600">Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Earnings Distribution</h3>
                <div className="space-y-3">
                  {allPartners.slice(0, 4).map((partner) => (
                    <div key={partner.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{partner.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">${partner.monthlyEarnings.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Paid This Month:</span>
                    <span className="font-semibold text-green-600">${(partnerMetrics.monthlyCommissions * 0.85).toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-semibold text-yellow-600">${(partnerMetrics.monthlyCommissions * 0.15).toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold text-gray-900">${partnerMetrics.monthlyCommissions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Earners */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Top Earning Partners</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Process Payments</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Rank</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Partner</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Tier</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Monthly Earnings</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Success Rate</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allPartners.map((partner) => (
                      <tr key={partner.id} className="hover:bg-gray-50">
                        <td className="py-3 text-sm">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-xs">
                            #{partner.rank}
                          </div>
                        </td>
                        <td className="py-3">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                            <div className="text-xs text-gray-600">{partner.email}</div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(partner.tier)}`}>
                            {partner.tier}
                          </span>
                        </td>
                        <td className="py-3 text-sm font-semibold text-green-600">
                          ${partner.monthlyEarnings.toLocaleString()}
                        </td>
                        <td className="py-3 text-sm">{partner.successRate}%</td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-700">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Performance Analytics Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analytics</h3>
              <p className="text-gray-600">Advanced performance analytics dashboard coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Partner Detail Modal */}
      {showPartnerModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Partner Details</h3>
              <button 
                onClick={() => setShowPartnerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">Partner Information</h4>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {selectedPartner.name}</p>
                  <p><strong>Email:</strong> {selectedPartner.email}</p>
                  <p><strong>Phone:</strong> {selectedPartner.phone}</p>
                  <p><strong>Territory:</strong> {selectedPartner.territory}</p>
                  <p><strong>Join Date:</strong> {new Date(selectedPartner.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Performance Metrics</h4>
                <div className="space-y-2">
                  <p><strong>Tier:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getTierColor(selectedPartner.tier)}`}>
                      {selectedPartner.tier}
                    </span>
                  </p>
                  <p><strong>Monthly Earnings:</strong> <span className="text-green-600 font-medium">${selectedPartner.monthlyEarnings.toLocaleString()}</span></p>
                  <p><strong>Total Earnings:</strong> <span className="text-blue-600 font-medium">${selectedPartner.totalEarnings.toLocaleString()}</span></p>
                  <p><strong>Success Rate:</strong> {selectedPartner.successRate}%</p>
                  <p><strong>Commission Rate:</strong> {selectedPartner.commissionRate}%</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPartner.specialties.map((specialty, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Send Message
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Process Payment
              </button>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                Update Tier
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                View Reports
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const partnerModules = [
  {
    id: 'recruiters',
    title: 'Recruiter Dashboard',
    description: 'Advanced dashboard for healthcare recruiters and agents with AI-powered intelligence',
    icon: Users,
    href: '/centralops/recruiters',
    color: 'from-purple-600 to-indigo-600',
    metrics: {
      activeRecruiters: 247,
      totalClients: 1856,
      monthlyPlacements: 89
    },
    features: [
      'Client portfolio management',
      'AI-powered recommendations', 
      'Advanced analytics',
      'White-label branding'
    ]
  },
  {
    id: 'earnings',
    title: 'Earnings & Commission Tracking',
    description: 'Transparent commission tracking with automated payouts and detailed earnings reports',
    icon: DollarSign,
    href: '/centralops/earnings',
    color: 'from-green-600 to-emerald-600',
    metrics: {
      totalCommissions: 892350,
      monthlyEarnings: 147650,
      averageRate: '13.2%'
    },
    features: [
      'Real-time earnings tracking',
      'Automated commission calculation',
      'Payment history', 
      'Tax documentation'
    ]
  }
];

const partnerTierStats = [
  {
    tier: 'Individual Recruiter',
    count: 156,
    avgEarnings: 3450,
    commissionRate: '10%',
    color: 'bg-green-100 text-green-800'
  },
  {
    tier: 'Consultant Level',
    count: 78,
    avgEarnings: 8920,
    commissionRate: '12%',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    tier: 'Specialist Partner',
    count: 23,
    avgEarnings: 24680,
    commissionRate: '15%',
    color: 'bg-purple-100 text-purple-800'
  }
];

const partnerMetrics = {
  totalPartners: 257,
  activePartners: 234,
  monthlyCommissions: 147650,
  averageEarnings: 7824,
  topTierPartners: 23,
  partnerGrowth: 18.3
};