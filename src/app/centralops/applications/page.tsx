'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Plus, Eye, Edit, Download, Upload, Send,
  Users, TrendingUp, AlertCircle, CheckCircle, Clock, Star,
  Phone, Mail, MapPin, Calendar, FileText, User, Target,
  ArrowRight, Briefcase, GraduationCap, Globe, Heart
} from 'lucide-react';

// Application stages for healthcare services
const applicationStages = [
  'Lead Generation',
  'Initial Consultation', 
  'Document Collection',
  'Eligibility Assessment',
  'Service Selection',
  'Application Submission',
  'Processing & Review',
  'Interview/Exam Preparation',
  'Final Approval',
  'Job Placement'
];

// Mock data for applications and leads
const applications = [
  {
    id: 'APP-001',
    leadId: 'LEAD-234',
    clientName: 'Dr. Sarah Ahmed',
    email: 'sarah.ahmed@email.com',
    phone: '+971-50-123-4567',
    nationality: 'Egyptian',
    profession: 'General Practitioner',
    targetCountry: 'UAE',
    targetService: 'DataFlow PSV',
    currentStage: 'Document Collection',
    stageNumber: 3,
    progress: 30,
    priority: 'high',
    leadSource: 'Website',
    assignedConsultant: 'Ahmed Khan',
    estimatedValue: 1299,
    submissionDate: '2024-08-15',
    lastActivity: '2024-08-30',
    notes: 'Client very motivated, has all required documents ready',
    status: 'active',
    tags: ['urgent', 'high-value', 'experienced']
  },
  {
    id: 'APP-002', 
    leadId: 'LEAD-156',
    clientName: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+1-555-987-6543',
    nationality: 'Filipino',
    profession: 'Registered Nurse',
    targetCountry: 'USA',
    targetService: 'NCLEX-RN',
    currentStage: 'Interview/Exam Preparation',
    stageNumber: 8,
    progress: 80,
    priority: 'medium',
    leadSource: 'Referral',
    assignedConsultant: 'Jane Smith',
    estimatedValue: 899,
    submissionDate: '2024-06-20',
    lastActivity: '2024-08-29',
    notes: 'Scheduled for NCLEX exam next month',
    status: 'active',
    tags: ['exam-ready', 'referral']
  },
  {
    id: 'APP-003',
    leadId: 'LEAD-789',
    clientName: 'Dr. Priya Sharma',
    email: 'priya.sharma@email.com', 
    phone: '+44-20-7946-0958',
    nationality: 'Indian',
    profession: 'Registered Nurse',
    targetCountry: 'United Kingdom',
    targetService: 'UK NMC',
    currentStage: 'Processing & Review',
    stageNumber: 7,
    progress: 70,
    priority: 'high',
    leadSource: 'Social Media',
    assignedConsultant: 'Michael Brown',
    estimatedValue: 1199,
    submissionDate: '2024-07-10',
    lastActivity: '2024-08-28',
    notes: 'CBT completed successfully, preparing for OSCE',
    status: 'active',
    tags: ['cbt-passed', 'osce-prep']
  },
  {
    id: 'APP-004',
    leadId: 'LEAD-445',
    clientName: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+61-2-9876-5432',
    nationality: 'Sudanese',
    profession: 'Physiotherapist',
    targetCountry: 'Australia',
    targetService: 'Australia AHPRA',
    currentStage: 'Final Approval',
    stageNumber: 9,
    progress: 90,
    priority: 'urgent',
    leadSource: 'Partner Referral',
    assignedConsultant: 'Lisa Johnson',
    estimatedValue: 1099,
    submissionDate: '2024-05-15',
    lastActivity: '2024-08-30',
    notes: 'Registration approved! Coordinating job placement',
    status: 'approved',
    tags: ['approved', 'placement-ready']
  },
  {
    id: 'APP-005',
    leadId: 'LEAD-323',
    clientName: 'Dr. James Wilson',
    email: 'j.wilson@email.com',
    phone: '+1-416-555-0199',
    nationality: 'Canadian',
    profession: 'Cardiologist',
    targetCountry: 'UAE',
    targetService: 'Consultation',
    currentStage: 'Service Selection',
    stageNumber: 5,
    progress: 50,
    priority: 'low',
    leadSource: 'LinkedIn',
    assignedConsultant: 'Ahmed Khan',
    estimatedValue: 149,
    submissionDate: '2024-08-10',
    lastActivity: '2024-08-25',
    notes: 'Exploring options for relocation timeline',
    status: 'active',
    tags: ['specialist', 'consulting']
  }
];

const analyticsData = {
  totalApplications: 1247,
  activeApplications: 834,
  convertedLeads: 456,
  averageConversionRate: 36.5,
  averageProcessingTime: 67,
  monthlyGrowth: 18.4,
  totalValue: 1850000,
  averageValue: 1284
};

const leadSources = [
  { source: 'Website', count: 456, percentage: 36.5 },
  { source: 'Referral', count: 287, percentage: 23.0 },
  { source: 'Social Media', count: 198, percentage: 15.9 },
  { source: 'Partner Referral', count: 167, percentage: 13.4 },
  { source: 'LinkedIn', count: 139, percentage: 11.1 }
];

export default function ApplicationLeadManagement() {
  const [activeTab, setActiveTab] = useState('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  
  // New modal states for all buttons
  const [showNewApplicationModal, setShowNewApplicationModal] = useState(false);
  const [showImportLeadsModal, setShowImportLeadsModal] = useState(false);
  const [showUpdateStageModal, setShowUpdateStageModal] = useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [showScheduleCallModal, setShowScheduleCallModal] = useState(false);
  const [showViewDocumentsModal, setShowViewDocumentsModal] = useState(false);

  // Form states for modals
  const [newApplicationForm, setNewApplicationForm] = useState({
    clientName: '',
    email: '',
    phone: '',
    nationality: '',
    profession: '',
    targetCountry: '',
    targetService: '',
    leadSource: '',
    notes: '',
    priority: 'medium'
  });

  const [updateStageForm, setUpdateStageForm] = useState({
    currentStage: '',
    newStage: '',
    notes: '',
    notifyClient: true,
    nextStepDate: ''
  });

  const [sendMessageForm, setSendMessageForm] = useState({
    recipient: '',
    subject: '',
    message: '',
    channel: 'email', // email, whatsapp, sms
    urgency: 'normal'
  });

  const [scheduleCallForm, setScheduleCallForm] = useState({
    callType: 'consultation', // consultation, follow-up, interview
    date: '',
    time: '',
    duration: '30',
    notes: '',
    meetingLink: ''
  });

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.profession.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = filterStage === 'all' || app.currentStage === filterStage;
    const matchesPriority = filterPriority === 'all' || app.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesStage && matchesPriority && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
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

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Application & Lead Management</h1>
            <p className="text-gray-600">Complete pipeline management from lead to placement</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowNewApplicationModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Application
            </button>
            <button 
              onClick={() => setShowImportLeadsModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Leads
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'applications', name: 'Applications', icon: FileText },
              { id: 'pipeline', name: 'Pipeline View', icon: Target },
              { id: 'leads', name: 'Lead Analytics', icon: TrendingUp },
              { id: 'reports', name: 'Reports', icon: Briefcase }
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
        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.totalApplications}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
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
                    <p className="text-sm font-medium text-gray-600">Active Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.activeApplications}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
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
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.averageConversionRate}%</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
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
                    <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                    <p className="text-2xl font-bold text-gray-900">${(analyticsData.totalValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Stages</option>
                  {applicationStages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="approved">Approved</option>
                  <option value="on-hold">On Hold</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced
                </button>
              </div>
            </div>

            {/* Applications Grid */}
            <div className="grid gap-6">
              {filteredApplications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleApplicationClick(application)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{application.clientName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(application.priority)}`} title={`${application.priority} priority`} />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {application.email}
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          {application.profession}
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          {application.targetCountry}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-2" />
                          {application.targetService}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Current Stage: {application.currentStage}
                      </span>
                      <span className="text-sm text-gray-600">
                        {application.stageNumber}/{applicationStages.length} ({application.progress}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${application.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">ID</p>
                      <p className="font-medium">{application.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Lead Source</p>
                      <p className="font-medium">{application.leadSource}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Consultant</p>
                      <p className="font-medium">{application.assignedConsultant}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Estimated Value</p>
                      <p className="font-medium text-green-600">${application.estimatedValue}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Activity</p>
                      <p className="font-medium">{new Date(application.lastActivity).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {application.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {application.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{application.notes}</p>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredApplications.length === 0 && (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
                <div className="text-gray-400 mb-4">
                  <FileText className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try adjusting your search terms or filters.' : 'Create a new application to get started.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pipeline View Tab */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Pipeline Overview</h3>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {applicationStages.slice(0, 5).map((stage, index) => {
                  const stageApplications = applications.filter(app => app.currentStage === stage);
                  return (
                    <div key={stage} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900 text-sm">{stage}</h4>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {stageApplications.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {stageApplications.slice(0, 3).map(app => (
                          <div key={app.id} className="bg-white p-3 rounded border border-gray-200 text-sm">
                            <div className="font-medium text-gray-900">{app.clientName}</div>
                            <div className="text-gray-600">{app.targetService}</div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-green-600 font-medium">${app.estimatedValue}</span>
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(app.priority)}`} />
                            </div>
                          </div>
                        ))}
                        {stageApplications.length > 3 && (
                          <div className="text-center text-gray-500 text-xs">
                            +{stageApplications.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Lead Analytics Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h3>
                <div className="space-y-4">
                  {leadSources.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{source.source}</span>
                          <span className="text-sm text-gray-600">{source.count} ({source.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analyticsData.averageConversionRate}%</div>
                    <div className="text-sm text-gray-600">Avg. Conversion Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analyticsData.averageProcessingTime} days</div>
                    <div className="text-sm text-gray-600">Avg. Processing Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">${analyticsData.averageValue}</div>
                    <div className="text-sm text-gray-600">Avg. Application Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">+{analyticsData.monthlyGrowth}%</div>
                    <div className="text-sm text-gray-600">Monthly Growth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Reports</h3>
              <p className="text-gray-600">Advanced reporting and analytics coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Application Details</h3>
              <button 
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">Client Information</h4>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {selectedApplication.clientName}</p>
                  <p><strong>Email:</strong> {selectedApplication.email}</p>
                  <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                  <p><strong>Nationality:</strong> {selectedApplication.nationality}</p>
                  <p><strong>Profession:</strong> {selectedApplication.profession}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Application Status</h4>
                <div className="space-y-2">
                  <p><strong>Current Stage:</strong> {selectedApplication.currentStage}</p>
                  <p><strong>Progress:</strong> {selectedApplication.progress}%</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </span>
                  </p>
                  <p><strong>Consultant:</strong> {selectedApplication.assignedConsultant}</p>
                  <p><strong>Estimated Value:</strong> <span className="text-green-600 font-medium">${selectedApplication.estimatedValue}</span></p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Progress Timeline</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${selectedApplication.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Stage {selectedApplication.stageNumber} of {applicationStages.length}: {selectedApplication.currentStage}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Notes</h4>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApplication.notes}</p>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => {
                  setUpdateStageForm({
                    currentStage: selectedApplication?.currentStage || '',
                    newStage: '',
                    notes: '',
                    notifyClient: true,
                    nextStepDate: ''
                  });
                  setShowUpdateStageModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Update Stage
              </button>
              <button 
                onClick={() => {
                  setSendMessageForm({
                    recipient: selectedApplication?.clientName || '',
                    subject: '',
                    message: '',
                    channel: 'email',
                    urgency: 'normal'
                  });
                  setShowSendMessageModal(true);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Send Message
              </button>
              <button 
                onClick={() => {
                  setScheduleCallForm({
                    callType: 'consultation',
                    date: '',
                    time: '',
                    duration: '30',
                    notes: '',
                    meetingLink: ''
                  });
                  setShowScheduleCallModal(true);
                }}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
              >
                Schedule Call
              </button>
              <button 
                onClick={() => setShowViewDocumentsModal(true)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                View Documents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Application Modal */}
      {showNewApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">➕</span>
                New Application
              </h3>
              <button 
                onClick={() => setShowNewApplicationModal(false)}
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
                    value={newApplicationForm.clientName}
                    onChange={(e) => setNewApplicationForm({...newApplicationForm, clientName: e.target.value})}
                    placeholder="Dr. Sarah Ahmed"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={newApplicationForm.email}
                    onChange={(e) => setNewApplicationForm({...newApplicationForm, email: e.target.value})}
                    placeholder="sarah.ahmed@email.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newApplicationForm.phone}
                    onChange={(e) => setNewApplicationForm({...newApplicationForm, phone: e.target.value})}
                    placeholder="+971-50-123-4567"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality
                  </label>
                  <input
                    type="text"
                    value={newApplicationForm.nationality}
                    onChange={(e) => setNewApplicationForm({...newApplicationForm, nationality: e.target.value})}
                    placeholder="Egyptian"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profession
                  </label>
                  <select
                    value={newApplicationForm.profession}
                    onChange={(e) => setNewApplicationForm({...newApplicationForm, profession: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select profession...</option>
                    <option value="General Practitioner">General Practitioner</option>
                    <option value="Registered Nurse">Registered Nurse</option>
                    <option value="Specialist Doctor">Specialist Doctor</option>
                    <option value="Healthcare Assistant">Healthcare Assistant</option>
                    <option value="Pharmacist">Pharmacist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Country
                  </label>
                  <select
                    value={newApplicationForm.targetCountry}
                    onChange={(e) => setNewApplicationForm({...newApplicationForm, targetCountry: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select target country...</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="USA">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Service
                  </label>
                  <select
                    value={newApplicationForm.targetService}
                    onChange={(e) => setNewApplicationForm({...newApplicationForm, targetService: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select service...</option>
                    <option value="DataFlow PSV">DataFlow PSV</option>
                    <option value="NCLEX-RN">NCLEX-RN</option>
                    <option value="UK NMC">UK NMC</option>
                    <option value="Australia AHPRA">Australia AHPRA</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Source
                  </label>
                  <select
                    value={newApplicationForm.leadSource}
                    onChange={(e) => setNewApplicationForm({...newApplicationForm, leadSource: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select lead source...</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Partner Referral">Partner Referral</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  value={newApplicationForm.priority}
                  onChange={(e) => setNewApplicationForm({...newApplicationForm, priority: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="low">🟢 Low Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="high">🟠 High Priority</option>
                  <option value="urgent">🔴 Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={newApplicationForm.notes}
                  onChange={(e) => setNewApplicationForm({...newApplicationForm, notes: e.target.value})}
                  placeholder="Add any initial notes about this client or application..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">📋 Application Preview</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p><strong>Client:</strong> {newApplicationForm.clientName || 'Not specified'}</p>
                  <p><strong>Service:</strong> {newApplicationForm.targetService || 'Not selected'}</p>
                  <p><strong>Country:</strong> {newApplicationForm.targetCountry || 'Not selected'}</p>
                  <p><strong>Priority:</strong> {newApplicationForm.priority.toUpperCase()}</p>
                </div>
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowNewApplicationModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                📋 Save as Draft
              </button>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
                <span className="mr-2">✅</span>
                Create Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Leads Modal */}
      {showImportLeadsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">📁</span>
                Import Leads
              </h3>
              <button 
                onClick={() => setShowImportLeadsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                <div className="text-6xl text-blue-500 mb-4">📂</div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Lead File</h4>
                <p className="text-gray-600 mb-4">Drag and drop your CSV or Excel file here, or click to browse</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Choose File
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">📋 File Format Requirements</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Required columns:</strong> Name, Email, Phone</p>
                  <p><strong>Optional columns:</strong> Nationality, Profession, Target Country, Lead Source</p>
                  <p><strong>Supported formats:</strong> CSV, Excel (.xlsx, .xls)</p>
                  <p><strong>Max file size:</strong> 10MB</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="skipDuplicates" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="skipDuplicates" className="text-sm text-gray-700">Skip duplicate entries based on email</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="validateEmails" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="validateEmails" className="text-sm text-gray-700">Validate email addresses</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="assignToMe" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="assignToMe" className="text-sm text-gray-700">Assign all leads to me</label>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowImportLeadsModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                📋 Preview Data
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center">
                <span className="mr-2">📁</span>
                Import Leads
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Stage Modal */}
      {showUpdateStageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">🔄</span>
                Update Application Stage
              </h3>
              <button 
                onClick={() => setShowUpdateStageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stage
                  </label>
                  <input
                    type="text"
                    value={updateStageForm.currentStage}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Stage *
                  </label>
                  <select
                    value={updateStageForm.newStage}
                    onChange={(e) => setUpdateStageForm({...updateStageForm, newStage: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select new stage...</option>
                    {applicationStages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Step Date
                </label>
                <input
                  type="date"
                  value={updateStageForm.nextStepDate}
                  onChange={(e) => setUpdateStageForm({...updateStageForm, nextStepDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stage Update Notes
                </label>
                <textarea
                  value={updateStageForm.notes}
                  onChange={(e) => setUpdateStageForm({...updateStageForm, notes: e.target.value})}
                  placeholder="Add notes about this stage update..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="notifyClientStage"
                  checked={updateStageForm.notifyClient}
                  onChange={(e) => setUpdateStageForm({...updateStageForm, notifyClient: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="notifyClientStage" className="text-sm text-gray-700">
                  Notify client about this stage update
                </label>
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowUpdateStageModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center">
                <span className="mr-2">🔄</span>
                Update Stage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {showSendMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">✉️</span>
                Send Message
              </h3>
              <button 
                onClick={() => setShowSendMessageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient
                  </label>
                  <input
                    type="text"
                    value={sendMessageForm.recipient}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Channel
                  </label>
                  <select
                    value={sendMessageForm.channel}
                    onChange={(e) => setSendMessageForm({...sendMessageForm, channel: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="email">📧 Email</option>
                    <option value="whatsapp">💬 WhatsApp</option>
                    <option value="sms">📱 SMS</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={sendMessageForm.subject}
                    onChange={(e) => setSendMessageForm({...sendMessageForm, subject: e.target.value})}
                    placeholder="Update on your application"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency
                  </label>
                  <select
                    value={sendMessageForm.urgency}
                    onChange={(e) => setSendMessageForm({...sendMessageForm, urgency: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="low">🟢 Low</option>
                    <option value="normal">🟡 Normal</option>
                    <option value="high">🟠 High</option>
                    <option value="urgent">🔴 Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={sendMessageForm.message}
                  onChange={(e) => setSendMessageForm({...sendMessageForm, message: e.target.value})}
                  placeholder="Write your message here..."
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowSendMessageModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                📋 Save as Draft
              </button>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
                <span className="mr-2">✉️</span>
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Call Modal */}
      {showScheduleCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">📞</span>
                Schedule Call
              </h3>
              <button 
                onClick={() => setShowScheduleCallModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Call Type
                </label>
                <select
                  value={scheduleCallForm.callType}
                  onChange={(e) => setScheduleCallForm({...scheduleCallForm, callType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="consultation">💬 Initial Consultation</option>
                  <option value="follow-up">📞 Follow-up Call</option>
                  <option value="interview">🎤 Interview</option>
                  <option value="document-review">📄 Document Review</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={scheduleCallForm.date}
                    onChange={(e) => setScheduleCallForm({...scheduleCallForm, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={scheduleCallForm.time}
                    onChange={(e) => setScheduleCallForm({...scheduleCallForm, time: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <select
                    value={scheduleCallForm.duration}
                    onChange={(e) => setScheduleCallForm({...scheduleCallForm, duration: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Link (Optional)
                </label>
                <input
                  type="url"
                  value={scheduleCallForm.meetingLink}
                  onChange={(e) => setScheduleCallForm({...scheduleCallForm, meetingLink: e.target.value})}
                  placeholder="https://zoom.us/j/123456789"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Call Notes
                </label>
                <textarea
                  value={scheduleCallForm.notes}
                  onChange={(e) => setScheduleCallForm({...scheduleCallForm, notes: e.target.value})}
                  placeholder="Add agenda or notes for this call..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">📅 Call Summary</h4>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p><strong>Type:</strong> {scheduleCallForm.callType}</p>
                  <p><strong>Date & Time:</strong> {scheduleCallForm.date} at {scheduleCallForm.time}</p>
                  <p><strong>Duration:</strong> {scheduleCallForm.duration} minutes</p>
                </div>
              </div>
            </form>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowScheduleCallModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                📧 Send Invite
              </button>
              <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 flex items-center">
                <span className="mr-2">📞</span>
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Documents Modal */}
      {showViewDocumentsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">📄</span>
                Documents - {selectedApplication.clientName}
              </h3>
              <button 
                onClick={() => setShowViewDocumentsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Document Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="text-4xl text-gray-400 mb-2">📎</div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Upload New Document</h4>
                <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Choose Files
                </button>
              </div>

              {/* Documents List */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Uploaded Documents</h4>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">📄</div>
                      <div>
                        <p className="font-medium text-gray-900">Medical Degree Certificate</p>
                        <p className="text-sm text-gray-600">Uploaded 2 days ago • 2.3 MB</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm">Download</button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">📄</div>
                      <div>
                        <p className="font-medium text-gray-900">Transcripts</p>
                        <p className="text-sm text-gray-600">Uploaded 3 days ago • 1.8 MB</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm">Download</button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🆔</div>
                      <div>
                        <p className="font-medium text-gray-900">Passport Copy</p>
                        <p className="text-sm text-gray-600">Uploaded 5 days ago • 0.9 MB</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Pending</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm">Download</button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">📜</div>
                      <div>
                        <p className="font-medium text-gray-900">Work Experience Letter</p>
                        <p className="text-sm text-gray-600">Uploaded 1 week ago • 1.2 MB</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm">Download</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">📋 Document Requirements</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>✅ Medical Degree Certificate - Complete</p>
                  <p>✅ Academic Transcripts - Complete</p>
                  <p>🟡 Passport Copy - Pending Review</p>
                  <p>✅ Work Experience Letter - Complete</p>
                  <p>❌ English Proficiency Certificate - Missing</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowViewDocumentsModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
              <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                📧 Request Missing Docs
              </button>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                📦 Download All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}