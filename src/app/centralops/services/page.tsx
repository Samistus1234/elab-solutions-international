'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Plus, Eye, Edit, CheckCircle, Clock, AlertTriangle,
  Users, DollarSign, TrendingUp, FileText, Calendar, MapPin,
  ChevronDown, Download, RefreshCw, Settings, Target, Zap
} from 'lucide-react';

// Service definitions matching eLab's actual offerings
const services = [
  {
    id: 'dataflow-psv',
    name: 'DataFlow Primary Source Verification',
    category: 'Verification',
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Kuwait', 'Oman'],
    price: 1299,
    duration: '45-60 days',
    stages: [
      'Document Collection',
      'Initial Review',
      'Authority Submission',
      'Processing',
      'Verification Complete'
    ],
    requirements: ['Medical Degree', 'Transcripts', 'Work Experience', 'ID Documents'],
    description: 'Primary source verification for Gulf countries'
  },
  {
    id: 'nclex-rn',
    name: 'NCLEX-RN Preparation & Registration',
    category: 'Licensing',
    countries: ['USA'],
    price: 899,
    duration: '90-120 days',
    stages: [
      'Eligibility Assessment',
      'Application Preparation',
      'CGFNS Evaluation',
      'Board Application',
      'Exam Scheduling',
      'Exam Completion'
    ],
    requirements: ['Nursing Degree', 'Transcripts', 'English Proficiency', 'Clinical Hours'],
    description: 'Complete NCLEX-RN preparation and registration package'
  },
  {
    id: 'uk-nmc',
    name: 'UK NMC Registration Package',
    category: 'Licensing',
    countries: ['United Kingdom'],
    price: 1199,
    duration: '60-90 days',
    stages: [
      'Eligibility Check',
      'CBT Preparation',
      'CBT Exam',
      'OSCE Preparation',
      'OSCE Exam',
      'Registration'
    ],
    requirements: ['Nursing Qualification', 'English Proficiency', 'Health Declaration'],
    description: 'Complete UK Nursing and Midwifery Council registration'
  },
  {
    id: 'australia-ahpra',
    name: 'Australia AHPRA Registration',
    category: 'Licensing',
    countries: ['Australia'],
    price: 1099,
    duration: '50-80 days',
    stages: [
      'Skills Assessment',
      'English Test',
      'Application Submission',
      'Authority Review',
      'Registration Approval'
    ],
    requirements: ['Healthcare Qualification', 'English Proficiency', 'Identity Verification'],
    description: 'Australian Health Practitioner Regulation Agency registration'
  },
  {
    id: 'consultation',
    name: 'Professional Consultation Services',
    category: 'Consultation',
    countries: ['Global'],
    price: 149,
    duration: '1-2 hours',
    stages: [
      'Consultation Booking',
      'Document Review',
      'Expert Meeting',
      'Report Generation',
      'Follow-up'
    ],
    requirements: ['Career Goals', 'Current Qualifications', 'Target Country'],
    description: 'Expert career guidance and pathway planning'
  },
  {
    id: 'english-training',
    name: 'English Proficiency Training',
    category: 'Education',
    countries: ['Global'],
    price: 299,
    duration: '30-60 days',
    stages: [
      'Assessment Test',
      'Learning Plan',
      'Training Modules',
      'Practice Tests',
      'Final Exam'
    ],
    requirements: ['Basic English Level', 'Study Commitment'],
    description: 'IELTS/OET/TOEFL preparation and training'
  }
];

// Mock data for service analytics
const serviceMetrics = {
  totalClients: 1247,
  activeServices: 834,
  completedServices: 2891,
  averageSuccessRate: 89.2,
  totalRevenue: 2450000,
  monthlyGrowth: 15.3
};

// Mock active service instances
const activeInstances = [
  {
    id: 'SI-001',
    clientName: 'Dr. Sarah Ahmed',
    clientEmail: 'sarah.ahmed@email.com',
    serviceId: 'dataflow-psv',
    serviceName: 'DataFlow PSV',
    currentStage: 'Authority Processing',
    stageNumber: 3,
    totalStages: 5,
    progress: 60,
    startDate: '2024-07-15',
    estimatedCompletion: '2024-09-15',
    assignedConsultant: 'Ahmed Khan',
    country: 'UAE',
    status: 'active',
    priority: 'high',
    lastUpdate: '2024-08-25'
  },
  {
    id: 'SI-002',
    clientName: 'Maria Santos',
    clientEmail: 'maria.santos@email.com',
    serviceId: 'nclex-rn',
    serviceName: 'NCLEX-RN',
    currentStage: 'Exam Scheduling',
    stageNumber: 5,
    totalStages: 6,
    progress: 83,
    startDate: '2024-06-01',
    estimatedCompletion: '2024-10-01',
    assignedConsultant: 'Jane Smith',
    country: 'USA',
    status: 'active',
    priority: 'medium',
    lastUpdate: '2024-08-28'
  },
  {
    id: 'SI-003',
    clientName: 'Dr. Priya Sharma',
    clientEmail: 'priya.sharma@email.com',
    serviceId: 'uk-nmc',
    serviceName: 'UK NMC',
    currentStage: 'OSCE Preparation',
    stageNumber: 4,
    totalStages: 6,
    progress: 67,
    startDate: '2024-07-01',
    estimatedCompletion: '2024-10-15',
    assignedConsultant: 'Michael Brown',
    country: 'UK',
    status: 'active',
    priority: 'high',
    lastUpdate: '2024-08-30'
  },
  {
    id: 'SI-004',
    clientName: 'Ahmed Hassan',
    clientEmail: 'ahmed.hassan@email.com',
    serviceId: 'australia-ahpra',
    serviceName: 'Australia AHPRA',
    currentStage: 'Authority Review',
    stageNumber: 4,
    totalStages: 5,
    progress: 80,
    startDate: '2024-06-20',
    estimatedCompletion: '2024-09-10',
    assignedConsultant: 'Lisa Johnson',
    country: 'Australia',
    status: 'on-hold',
    priority: 'urgent',
    lastUpdate: '2024-08-22'
  }
];

export default function ServiceManagementHub() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showInstanceModal, setShowInstanceModal] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState(null);
  
  // New modal states for service management buttons
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [showCreateInstanceModal, setShowCreateInstanceModal] = useState(false);
  
  // Additional modal states for Overview buttons
  const [showNewServiceInstanceModal, setShowNewServiceInstanceModal] = useState(false);
  const [showNewClientServiceModal, setShowNewClientServiceModal] = useState(false);
  const [showBulkStatusUpdateModal, setShowBulkStatusUpdateModal] = useState(false);
  const [showExportReportsModal, setShowExportReportsModal] = useState(false);
  const [showScheduleReviewModal, setShowScheduleReviewModal] = useState(false);
  
  // Form states
  const [newServiceForm, setNewServiceForm] = useState({
    name: '',
    category: 'Verification',
    countries: [],
    price: 0,
    duration: '',
    description: '',
    stages: [''],
    requirements: ['']
  });

  const [createInstanceForm, setCreateInstanceForm] = useState({
    clientName: '',
    clientEmail: '',
    serviceId: '',
    assignedConsultant: '',
    country: '',
    priority: 'medium',
    startDate: '',
    estimatedCompletion: '',
    notes: ''
  });

  // Additional form states for Overview buttons
  const [bulkStatusForm, setBulkStatusForm] = useState({
    selectedInstances: [],
    newStatus: '',
    notes: '',
    notifyClients: true
  });

  const [exportReportsForm, setExportReportsForm] = useState({
    reportType: 'comprehensive', // comprehensive, performance, financial
    dateRange: 'current_month',
    format: 'pdf', // pdf, excel, csv
    includeCharts: true,
    includeDetails: true
  });

  const [scheduleReviewForm, setScheduleReviewForm] = useState({
    reviewType: 'performance', // performance, quality, compliance
    date: '',
    time: '',
    attendees: [],
    agenda: '',
    location: 'virtual'
  });

  // Filter active instances
  const filteredInstances = activeInstances.filter(instance => {
    const matchesSearch = 
      instance.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instance.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instance.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || instance.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleInstanceClick = (instance) => {
    setSelectedInstance(instance);
    setShowInstanceModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Service Management Hub</h1>
            <p className="text-gray-600">Complete oversight of all eLab services and client journeys</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowNewServiceInstanceModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Service Instance
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
              { id: 'overview', name: 'Overview', icon: Target },
              { id: 'services', name: 'Service Catalog', icon: FileText },
              { id: 'active', name: 'Active Instances', icon: Zap },
              { id: 'analytics', name: 'Analytics', icon: TrendingUp }
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
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Clients</p>
                    <p className="text-2xl font-bold text-gray-900">{serviceMetrics.totalClients}</p>
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
                    <p className="text-sm font-medium text-gray-600">Active Services</p>
                    <p className="text-2xl font-bold text-gray-900">{serviceMetrics.activeServices}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-green-600" />
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
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{serviceMetrics.completedServices}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
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
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{serviceMetrics.averageSuccessRate}%</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${(serviceMetrics.totalRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-gray-900">+{serviceMetrics.monthlyGrowth}%</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => setShowNewClientServiceModal(true)}
                  className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-700 font-medium">New Client Service</span>
                </button>
                <button 
                  onClick={() => setShowBulkStatusUpdateModal(true)}
                  className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-700 font-medium">Bulk Status Update</span>
                </button>
                <button 
                  onClick={() => setShowExportReportsModal(true)}
                  className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Download className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-purple-700 font-medium">Export Reports</span>
                </button>
                <button 
                  onClick={() => setShowScheduleReviewModal(true)}
                  className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-orange-700 font-medium">Schedule Review</span>
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Service Activities</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { action: 'Stage Updated', client: 'Dr. Sarah Ahmed', service: 'DataFlow PSV', details: 'Moved to Authority Processing', time: '2 hours ago', type: 'update' },
                  { action: 'Service Completed', client: 'Maria Santos', service: 'NCLEX-RN', details: 'Exam passed successfully', time: '4 hours ago', type: 'success' },
                  { action: 'Issue Identified', client: 'Dr. Priya Sharma', service: 'UK NMC', details: 'Document verification failed', time: '6 hours ago', type: 'warning' },
                  { action: 'New Instance', client: 'Ahmed Hassan', service: 'Australia AHPRA', details: 'Service instance created', time: '1 day ago', type: 'info' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`rounded-full p-2 ${
                      activity.type === 'success' ? 'bg-green-100' :
                      activity.type === 'warning' ? 'bg-yellow-100' :
                      activity.type === 'update' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      {activity.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                      {activity.type === 'update' && <RefreshCw className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'info' && <Plus className="h-4 w-4 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{activity.action}</h4>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.client} • {activity.service}</p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Service Catalog Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">eLab Service Catalog</h3>
                <button 
                  onClick={() => setShowAddServiceModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Service
                </button>
              </div>

              <div className="grid gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{service.name}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Price</p>
                            <p className="text-lg font-bold text-green-600">${service.price}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Duration</p>
                            <p className="text-sm text-gray-900">{service.duration}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Countries</p>
                            <p className="text-sm text-gray-900">{service.countries.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Stages</p>
                            <p className="text-sm text-gray-900">{service.stages.length} steps</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-500 mb-2">Service Stages</p>
                          <div className="flex flex-wrap gap-2">
                            {service.stages.map((stage, stageIndex) => (
                              <span key={stageIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {stageIndex + 1}. {stage}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-2">Requirements</p>
                          <div className="flex flex-wrap gap-2">
                            {service.requirements.map((req, reqIndex) => (
                              <span key={reqIndex} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex flex-col space-y-2">
                        <button 
                          onClick={() => {
                            setSelectedService(service);
                            setShowServiceModal(true);
                          }}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedService(service);
                            setNewServiceForm({
                              name: service.name,
                              category: service.category,
                              countries: service.countries,
                              price: service.price,
                              duration: service.duration,
                              description: service.description,
                              stages: service.stages,
                              requirements: service.requirements
                            });
                            setShowEditServiceModal(true);
                          }}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                        >
                          Edit Service
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedService(service);
                            setCreateInstanceForm({
                              clientName: '',
                              clientEmail: '',
                              serviceId: service.id,
                              assignedConsultant: '',
                              country: service.countries[0] || '',
                              priority: 'medium',
                              startDate: '',
                              estimatedCompletion: '',
                              notes: ''
                            });
                            setShowCreateInstanceModal(true);
                          }}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Create Instance
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Instances Tab */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search by client, service, or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Active Instances Grid */}
            <div className="grid gap-6">
              {filteredInstances.map((instance, index) => (
                <motion.div
                  key={instance.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleInstanceClick(instance)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{instance.clientName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(instance.status)}`}>
                          {instance.status}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(instance.priority)}`} title={`${instance.priority} priority`} />
                      </div>
                      <p className="text-gray-600 mb-2">{instance.clientEmail}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>ID: {instance.id}</span>
                        <span>•</span>
                        <span>{instance.serviceName}</span>
                        <span>•</span>
                        <span>{instance.country}</span>
                        <span>•</span>
                        <span>Consultant: {instance.assignedConsultant}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Current Stage: {instance.currentStage}
                      </span>
                      <span className="text-sm text-gray-600">
                        {instance.stageNumber}/{instance.totalStages} ({instance.progress}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${instance.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Start Date</p>
                      <p className="font-medium">{new Date(instance.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Est. Completion</p>
                      <p className="font-medium">{new Date(instance.estimatedCompletion).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Update</p>
                      <p className="font-medium">{new Date(instance.lastUpdate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Actions</p>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredInstances.length === 0 && (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
                <div className="text-gray-400 mb-4">
                  <FileText className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No service instances found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try adjusting your search terms or filters.' : 'Create a new service instance to get started.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Performance Analytics</h3>
              <p className="text-gray-600">Comprehensive analytics dashboard coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Service Instance Detail Modal */}
      {showInstanceModal && selectedInstance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Service Instance Details</h3>
              <button 
                onClick={() => setShowInstanceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">Client Information</h4>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {selectedInstance.clientName}</p>
                  <p><strong>Email:</strong> {selectedInstance.clientEmail}</p>
                  <p><strong>Service:</strong> {selectedInstance.serviceName}</p>
                  <p><strong>Country:</strong> {selectedInstance.country}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Service Status</h4>
                <div className="space-y-2">
                  <p><strong>Current Stage:</strong> {selectedInstance.currentStage}</p>
                  <p><strong>Progress:</strong> {selectedInstance.progress}%</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedInstance.status)}`}>
                      {selectedInstance.status}
                    </span>
                  </p>
                  <p><strong>Consultant:</strong> {selectedInstance.assignedConsultant}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Progress Timeline</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Stage {selectedInstance.stageNumber} of {selectedInstance.totalStages}</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div 
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${selectedInstance.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Update Stage
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Send Message
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                View Documents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Service Instance Modal (Header) */}
      {showNewServiceInstanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">🚀</span>
                New Service Instance
              </h3>
              <button 
                onClick={() => setShowNewServiceInstanceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service *
                </label>
                <select
                  value={createInstanceForm.serviceId}
                  onChange={(e) => setCreateInstanceForm({...createInstanceForm, serviceId: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a service...</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ${service.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={createInstanceForm.clientName}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, clientName: e.target.value})}
                    placeholder="Dr. Sarah Ahmed"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Email *
                  </label>
                  <input
                    type="email"
                    value={createInstanceForm.clientEmail}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, clientEmail: e.target.value})}
                    placeholder="sarah.ahmed@email.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Consultant *
                  </label>
                  <select
                    value={createInstanceForm.assignedConsultant}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, assignedConsultant: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select consultant...</option>
                    <option value="Ahmed Khan">Ahmed Khan</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Michael Brown">Michael Brown</option>
                    <option value="Lisa Johnson">Lisa Johnson</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={createInstanceForm.priority}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, priority: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🟠 High</option>
                    <option value="urgent">🔴 Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Notes
                </label>
                <textarea
                  value={createInstanceForm.notes}
                  onChange={(e) => setCreateInstanceForm({...createInstanceForm, notes: e.target.value})}
                  placeholder="Add any initial notes for this service instance..."
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowNewServiceInstanceModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                📧 Send Welcome Email
              </button>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
                <span className="mr-2">🚀</span>
                Create Instance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Client Service Modal */}
      {showNewClientServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">👤</span>
                New Client Service
              </h3>
              <button 
                onClick={() => setShowNewClientServiceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">ℹ️ Quick Service Creation</h4>
                <p className="text-sm text-blue-700">
                  This is a streamlined way to create a new service instance for an existing or new client.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Type
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="existing">Existing Client</option>
                    <option value="new">New Client</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Category *
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select category...</option>
                    <option value="Verification">Verification Services</option>
                    <option value="Licensing">Licensing & Registration</option>
                    <option value="Consultation">Professional Consultation</option>
                    <option value="Training">Training & Preparation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Service *
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose service...</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <textarea
                  placeholder="Any specific requirements or rush requests..."
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowNewClientServiceModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                💾 Save & Continue
              </button>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
                <span className="mr-2">🚀</span>
                Create Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Status Update Modal */}
      {showBulkStatusUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">🔄</span>
                Bulk Status Update
              </h3>
              <button 
                onClick={() => setShowBulkStatusUpdateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">🔄 Bulk Operations</h4>
                <p className="text-sm text-green-700">
                  Update multiple service instances at once. Select instances and apply changes in bulk.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service Instances
                </label>
                <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                  {activeInstances.map(instance => (
                    <label key={instance.id} className="flex items-center space-x-3 py-2">
                      <input
                        type="checkbox"
                        checked={bulkStatusForm.selectedInstances.includes(instance.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBulkStatusForm({
                              ...bulkStatusForm,
                              selectedInstances: [...bulkStatusForm.selectedInstances, instance.id]
                            });
                          } else {
                            setBulkStatusForm({
                              ...bulkStatusForm,
                              selectedInstances: bulkStatusForm.selectedInstances.filter(id => id !== instance.id)
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{instance.clientName}</p>
                        <p className="text-xs text-gray-600">{instance.serviceName} - {instance.currentStage}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        instance.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        instance.status === 'completed' ? 'bg-green-100 text-green-800' :
                        instance.status === 'on-hold' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {instance.status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Status *
                  </label>
                  <select
                    value={bulkStatusForm.newStatus}
                    onChange={(e) => setBulkStatusForm({...bulkStatusForm, newStatus: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select new status...</option>
                    <option value="active">🟢 Active</option>
                    <option value="on-hold">🟡 On Hold</option>
                    <option value="completed">✅ Completed</option>
                    <option value="cancelled">❌ Cancelled</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="notifyClientsBulk"
                    checked={bulkStatusForm.notifyClients}
                    onChange={(e) => setBulkStatusForm({...bulkStatusForm, notifyClients: e.target.checked})}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="notifyClientsBulk" className="text-sm text-gray-700">
                    Notify all affected clients
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Notes
                </label>
                <textarea
                  value={bulkStatusForm.notes}
                  onChange={(e) => setBulkStatusForm({...bulkStatusForm, notes: e.target.value})}
                  placeholder="Add notes about this bulk update..."
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">⚠️ Bulk Update Summary</h4>
                <div className="text-sm text-yellow-700">
                  <p><strong>Selected Instances:</strong> {bulkStatusForm.selectedInstances.length}</p>
                  <p><strong>New Status:</strong> {bulkStatusForm.newStatus || 'Not selected'}</p>
                  <p><strong>Client Notifications:</strong> {bulkStatusForm.notifyClients ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowBulkStatusUpdateModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                👀 Preview Changes
              </button>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
                <span className="mr-2">🔄</span>
                Apply Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Reports Modal */}
      {showExportReportsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">📊</span>
                Export Reports
              </h3>
              <button 
                onClick={() => setShowExportReportsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">📊 Report Generation</h4>
                <p className="text-sm text-purple-700">
                  Generate comprehensive reports for service management, performance analysis, and client insights.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type *
                </label>
                <select
                  value={exportReportsForm.reportType}
                  onChange={(e) => setExportReportsForm({...exportReportsForm, reportType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="comprehensive">📈 Comprehensive Overview</option>
                  <option value="performance">⚡ Performance Analytics</option>
                  <option value="financial">💰 Financial Summary</option>
                  <option value="client">👥 Client Analysis</option>
                  <option value="consultant">🧑‍💼 Consultant Performance</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range *
                  </label>
                  <select
                    value={exportReportsForm.dateRange}
                    onChange={(e) => setExportReportsForm({...exportReportsForm, dateRange: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="current_month">This Month</option>
                    <option value="last_month">Last Month</option>
                    <option value="current_quarter">Current Quarter</option>
                    <option value="last_quarter">Last Quarter</option>
                    <option value="current_year">This Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Export Format *
                  </label>
                  <select
                    value={exportReportsForm.format}
                    onChange={(e) => setExportReportsForm({...exportReportsForm, format: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="pdf">📄 PDF Document</option>
                    <option value="excel">📊 Excel Spreadsheet</option>
                    <option value="csv">📋 CSV File</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Report Options</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportReportsForm.includeCharts}
                      onChange={(e) => setExportReportsForm({...exportReportsForm, includeCharts: e.target.checked})}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Include charts and visualizations</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportReportsForm.includeDetails}
                      onChange={(e) => setExportReportsForm({...exportReportsForm, includeDetails: e.target.checked})}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Include detailed breakdowns</span>
                  </label>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">📋 Report Preview</h4>
                <div className="text-sm text-purple-700 space-y-1">
                  <p><strong>Type:</strong> {exportReportsForm.reportType.replace('_', ' ').toUpperCase()}</p>
                  <p><strong>Period:</strong> {exportReportsForm.dateRange.replace('_', ' ').toUpperCase()}</p>
                  <p><strong>Format:</strong> {exportReportsForm.format.toUpperCase()}</p>
                  <p><strong>Charts:</strong> {exportReportsForm.includeCharts ? 'Included' : 'Excluded'}</p>
                </div>
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowExportReportsModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                👀 Preview Report
              </button>
              <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center">
                <span className="mr-2">📊</span>
                Generate & Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Review Modal */}
      {showScheduleReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">📅</span>
                Schedule Review Meeting
              </h3>
              <button 
                onClick={() => setShowScheduleReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">📅 Review Planning</h4>
                <p className="text-sm text-orange-700">
                  Schedule regular review meetings for service quality, performance analysis, and process improvements.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Type *
                </label>
                <select
                  value={scheduleReviewForm.reviewType}
                  onChange={(e) => setScheduleReviewForm({...scheduleReviewForm, reviewType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="performance">📊 Performance Review</option>
                  <option value="quality">✅ Quality Assessment</option>
                  <option value="compliance">📋 Compliance Audit</option>
                  <option value="strategic">🎯 Strategic Planning</option>
                  <option value="monthly">📅 Monthly Review</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={scheduleReviewForm.date}
                    onChange={(e) => setScheduleReviewForm({...scheduleReviewForm, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={scheduleReviewForm.time}
                    onChange={(e) => setScheduleReviewForm({...scheduleReviewForm, time: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Location
                </label>
                <select
                  value={scheduleReviewForm.location}
                  onChange={(e) => setScheduleReviewForm({...scheduleReviewForm, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="virtual">💻 Virtual Meeting</option>
                  <option value="office">🏢 Office Conference Room</option>
                  <option value="client_site">📍 Client Site</option>
                  <option value="external">🌐 External Venue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attendees
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Ahmed Khan', 'Jane Smith', 'Michael Brown', 'Lisa Johnson', 'Management Team', 'Quality Team'].map(person => (
                    <label key={person} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={scheduleReviewForm.attendees.includes(person)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setScheduleReviewForm({
                              ...scheduleReviewForm,
                              attendees: [...scheduleReviewForm.attendees, person]
                            });
                          } else {
                            setScheduleReviewForm({
                              ...scheduleReviewForm,
                              attendees: scheduleReviewForm.attendees.filter(a => a !== person)
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">{person}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Agenda
                </label>
                <textarea
                  value={scheduleReviewForm.agenda}
                  onChange={(e) => setScheduleReviewForm({...scheduleReviewForm, agenda: e.target.value})}
                  placeholder="Meeting agenda and key discussion points..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">📅 Meeting Summary</h4>
                <div className="text-sm text-orange-700 space-y-1">
                  <p><strong>Type:</strong> {scheduleReviewForm.reviewType.replace('_', ' ').toUpperCase()}</p>
                  <p><strong>Date & Time:</strong> {scheduleReviewForm.date} at {scheduleReviewForm.time}</p>
                  <p><strong>Location:</strong> {scheduleReviewForm.location.replace('_', ' ').toUpperCase()}</p>
                  <p><strong>Attendees:</strong> {scheduleReviewForm.attendees.length} selected</p>
                </div>
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowScheduleReviewModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                📧 Send Invites
              </button>
              <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 flex items-center">
                <span className="mr-2">📅</span>
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">➕</span>
                Add New Service
              </h3>
              <button 
                onClick={() => setShowAddServiceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={newServiceForm.name}
                    onChange={(e) => setNewServiceForm({...newServiceForm, name: e.target.value})}
                    placeholder="DataFlow Primary Source Verification"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={newServiceForm.category}
                    onChange={(e) => setNewServiceForm({...newServiceForm, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Verification">Verification</option>
                    <option value="Licensing">Licensing</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Training">Training</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    value={newServiceForm.price}
                    onChange={(e) => setNewServiceForm({...newServiceForm, price: parseInt(e.target.value)})}
                    placeholder="1299"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newServiceForm.duration}
                    onChange={(e) => setNewServiceForm({...newServiceForm, duration: e.target.value})}
                    placeholder="45-60 days"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newServiceForm.description}
                  onChange={(e) => setNewServiceForm({...newServiceForm, description: e.target.value})}
                  placeholder="Primary source verification for Gulf countries"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Countries
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Kuwait', 'Oman', 'USA', 'UK', 'Australia', 'Canada'].map(country => (
                    <label key={country} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newServiceForm.countries.includes(country)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewServiceForm({
                              ...newServiceForm,
                              countries: [...newServiceForm.countries, country]
                            });
                          } else {
                            setNewServiceForm({
                              ...newServiceForm,
                              countries: newServiceForm.countries.filter(c => c !== country)
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{country}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Stages
                </label>
                <div className="space-y-2">
                  {newServiceForm.stages.map((stage, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={stage}
                        onChange={(e) => {
                          const newStages = [...newServiceForm.stages];
                          newStages[index] = e.target.value;
                          setNewServiceForm({...newServiceForm, stages: newStages});
                        }}
                        placeholder={`Stage ${index + 1}`}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {newServiceForm.stages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newStages = newServiceForm.stages.filter((_, i) => i !== index);
                            setNewServiceForm({...newServiceForm, stages: newStages});
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setNewServiceForm({...newServiceForm, stages: [...newServiceForm.stages, '']})}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Add Stage
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements
                </label>
                <div className="space-y-2">
                  {newServiceForm.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => {
                          const newReqs = [...newServiceForm.requirements];
                          newReqs[index] = e.target.value;
                          setNewServiceForm({...newServiceForm, requirements: newReqs});
                        }}
                        placeholder={`Requirement ${index + 1}`}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {newServiceForm.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newReqs = newServiceForm.requirements.filter((_, i) => i !== index);
                            setNewServiceForm({...newServiceForm, requirements: newReqs});
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setNewServiceForm({...newServiceForm, requirements: [...newServiceForm.requirements, '']})}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Add Requirement
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">📋 Service Preview</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Name:</strong> {newServiceForm.name || 'Not specified'}</p>
                  <p><strong>Category:</strong> {newServiceForm.category}</p>
                  <p><strong>Price:</strong> ${newServiceForm.price}</p>
                  <p><strong>Countries:</strong> {newServiceForm.countries.join(', ') || 'None selected'}</p>
                </div>
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowAddServiceModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                📋 Save as Draft
              </button>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
                <span className="mr-2">✅</span>
                Create Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditServiceModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">✏️</span>
                Edit Service - {selectedService.name}
              </h3>
              <button 
                onClick={() => setShowEditServiceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={newServiceForm.name}
                    onChange={(e) => setNewServiceForm({...newServiceForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={newServiceForm.category}
                    onChange={(e) => setNewServiceForm({...newServiceForm, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Verification">Verification</option>
                    <option value="Licensing">Licensing</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Training">Training</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    value={newServiceForm.price}
                    onChange={(e) => setNewServiceForm({...newServiceForm, price: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newServiceForm.duration}
                    onChange={(e) => setNewServiceForm({...newServiceForm, duration: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newServiceForm.description}
                  onChange={(e) => setNewServiceForm({...newServiceForm, description: e.target.value})}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">⚠️ Edit Warning</h4>
                <p className="text-sm text-yellow-700">
                  Changes to this service will affect all future instances. Active instances will not be modified.
                </p>
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowEditServiceModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                📋 Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Instance Modal */}
      {showCreateInstanceModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">🚀</span>
                Create Service Instance - {selectedService.name}
              </h3>
              <button 
                onClick={() => setShowCreateInstanceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={createInstanceForm.clientName}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, clientName: e.target.value})}
                    placeholder="Dr. Sarah Ahmed"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Email *
                  </label>
                  <input
                    type="email"
                    value={createInstanceForm.clientEmail}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, clientEmail: e.target.value})}
                    placeholder="sarah.ahmed@email.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Country *
                  </label>
                  <select
                    value={createInstanceForm.country}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, country: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select country...</option>
                    {selectedService.countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Consultant *
                  </label>
                  <select
                    value={createInstanceForm.assignedConsultant}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, assignedConsultant: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select consultant...</option>
                    <option value="Ahmed Khan">Ahmed Khan</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Michael Brown">Michael Brown</option>
                    <option value="Lisa Johnson">Lisa Johnson</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={createInstanceForm.priority}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, priority: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🟠 High</option>
                    <option value="urgent">🔴 Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={createInstanceForm.startDate}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, startDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Est. Completion
                  </label>
                  <input
                    type="date"
                    value={createInstanceForm.estimatedCompletion}
                    onChange={(e) => setCreateInstanceForm({...createInstanceForm, estimatedCompletion: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Notes
                </label>
                <textarea
                  value={createInstanceForm.notes}
                  onChange={(e) => setCreateInstanceForm({...createInstanceForm, notes: e.target.value})}
                  placeholder="Add any initial notes or specific requirements for this client..."
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">🚀 Instance Preview</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p><strong>Service:</strong> {selectedService.name}</p>
                  <p><strong>Client:</strong> {createInstanceForm.clientName || 'Not specified'}</p>
                  <p><strong>Country:</strong> {createInstanceForm.country || 'Not selected'}</p>
                  <p><strong>Price:</strong> ${selectedService.price}</p>
                  <p><strong>Duration:</strong> {selectedService.duration}</p>
                  <p><strong>Stages:</strong> {selectedService.stages.length} stages</p>
                </div>
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowCreateInstanceModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                📧 Send Welcome Email
              </button>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
                <span className="mr-2">🚀</span>
                Create Instance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}