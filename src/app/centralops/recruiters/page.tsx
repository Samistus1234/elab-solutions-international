'use client';

import { useState } from 'react';

export default function RecruiterDashboard() {
  // Main navigation state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal states
  const [showClientModal, setShowClientModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBrandingModal, setShowBrandingModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);

  // Communication Hub modal states
  const [showWhatsAppBlastModal, setShowWhatsAppBlastModal] = useState(false);
  const [showEmailCampaignModal, setShowEmailCampaignModal] = useState(false);
  const [showWhatsAppUpdateModal, setShowWhatsAppUpdateModal] = useState(false);
  const [showEmailAllModal, setShowEmailAllModal] = useState(false);
  const [showSMSReminderModal, setShowSMSReminderModal] = useState(false);
  const [showPushNotificationModal, setShowPushNotificationModal] = useState(false);
  const [showAIMessageModal, setShowAIMessageModal] = useState(false);
  
  // Conversation management states
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  
  // Business Intelligence Suite modal states
  const [showMonthlyReportModal, setShowMonthlyReportModal] = useState(false);
  const [showExportDataModal, setShowExportDataModal] = useState(false);
  const [showEmailReportModal, setShowEmailReportModal] = useState(false);
  const [showPredictiveAnalysisModal, setShowPredictiveAnalysisModal] = useState(false);
  const [showCreateWorkflowModal, setShowCreateWorkflowModal] = useState(false);
  
  // AI Intelligence Center modal states
  const [showAllRecommendationsModal, setShowAllRecommendationsModal] = useState(false);
  const [showAISettingsModal, setShowAISettingsModal] = useState(false);
  
  // Update Status modal states
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [selectedClientForUpdate, setSelectedClientForUpdate] = useState(null);
  
  // Conversations data with state management
  const [conversations, setConversations] = useState([
    {
      id: 'conv-001',
      client: 'Dr. Ahmed Al-Rashid',
      message: 'Thank you for the update on my DHA license. When should I expect the next step?',
      time: '2 hours ago',
      channel: 'WhatsApp',
      unread: true,
      avatar: '🧑‍⚕️'
    },
    {
      id: 'conv-002',
      client: 'Dr. Fatima Al-Zahra',
      message: 'I have uploaded the additional documents you requested.',
      time: '4 hours ago', 
      channel: 'Email',
      unread: true,
      avatar: '👩‍⚕️'
    },
    {
      id: 'conv-003',
      client: 'Dr. Aisha Mahmoud',
      message: 'Exam completed successfully! What are the next steps?',
      time: '1 day ago',
      channel: 'SMS',
      unread: false,
      avatar: '👩‍⚕️'
    },
    {
      id: 'conv-004',
      client: 'Dr. Omar Khalil',
      message: 'Great news about the OMSB approval. Looking forward to job placement.',
      time: '2 days ago',
      channel: 'WhatsApp',
      unread: false,
      avatar: '🧑‍⚕️'
    }
  ]);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('lastActivity');

  // Form states
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    nationality: '',
    services: []
  });

  const [messageForm, setMessageForm] = useState({
    type: 'update',
    subject: '',
    message: '',
    channels: ['email', 'whatsapp']
  });

  // Communication Hub form states
  const [whatsappBlastForm, setWhatsappBlastForm] = useState({
    recipients: 'all', // all, selected, active
    message: '',
    schedule: 'now', // now, scheduled
    scheduledDate: '',
    scheduledTime: '',
    attachMedia: false,
    mediaFile: null
  });

  const [emailCampaignForm, setEmailCampaignForm] = useState({
    recipients: 'all',
    subject: '',
    message: '',
    template: 'custom', // custom, welcome, follow-up, reminder
    schedule: 'now',
    scheduledDate: '',
    scheduledTime: '',
    attachments: []
  });

  const [smsReminderForm, setSmsReminderForm] = useState({
    reminderType: 'document_submission', // document_submission, payment_due, appointment
    recipients: 'pending',
    customMessage: '',
    schedule: 'now',
    scheduledDate: '',
    scheduledTime: ''
  });

  const [pushNotificationForm, setPushNotificationForm] = useState({
    title: '',
    message: '',
    recipients: 'all',
    priority: 'normal', // low, normal, high
    actionUrl: '',
    schedule: 'now'
  });

  const [aiMessageForm, setAiMessageForm] = useState({
    messageType: 'update', // update, reminder, follow-up, upsell
    clientContext: '',
    tone: 'professional', // professional, friendly, urgent
    language: 'en',
    includePersonalization: true
  });

  // Reply form state
  const [replyForm, setReplyForm] = useState({
    message: '',
    channel: 'whatsapp', // whatsapp, email, sms
    attachFile: false
  });

  // Business Intelligence form states
  const [monthlyReportForm, setMonthlyReportForm] = useState({
    reportType: 'comprehensive', // comprehensive, revenue, client, performance
    dateRange: 'current_month',
    includeCharts: true,
    includeRecommendations: true,
    format: 'pdf'
  });

  const [exportDataForm, setExportDataForm] = useState({
    dataType: 'all', // all, clients, services, revenue, communications
    format: 'excel', // excel, csv, json
    dateRange: 'all_time',
    includeArchived: false
  });

  const [emailReportForm, setEmailReportForm] = useState({
    recipients: 'team', // team, management, custom
    reportType: 'monthly_summary',
    schedule: 'now', // now, weekly, monthly
    customEmails: '',
    includeAttachments: true
  });

  const [predictiveAnalysisForm, setPredictiveAnalysisForm] = useState({
    analysisType: 'revenue', // revenue, client_behavior, service_demand, workflow_efficiency
    timeframe: '6_months',
    includeRecommendations: true,
    confidenceLevel: 'standard' // low, standard, high
  });

  const [createWorkflowForm, setCreateWorkflowForm] = useState({
    name: '',
    trigger: 'document_pending', // document_pending, payment_overdue, service_completion, client_inactivity
    condition: '',
    action: 'send_reminder', // send_reminder, send_email, create_task, update_status
    channels: ['email'],
    schedule: 'immediate' // immediate, daily, weekly
  });

  // AI Settings form state
  const [aiSettingsForm, setAiSettingsForm] = useState({
    recommendationFrequency: 'daily', // real_time, daily, weekly
    riskAlertSensitivity: 'medium', // low, medium, high
    predictionConfidence: 'standard', // conservative, standard, aggressive
    enableAutoRecommendations: true,
    enableRiskAlerts: true,
    enablePredictiveInsights: true,
    customPrompts: {
      clientFollowUp: '',
      serviceRecommendations: '',
      riskAssessment: ''
    },
    integrations: {
      whatsapp: true,
      email: true,
      sms: false,
      calendar: true
    }
  });

  // Update Status form state
  const [updateStatusForm, setUpdateStatusForm] = useState({
    currentStage: '',
    newStage: '',
    priority: 'medium',
    notes: '',
    notifyClient: true,
    nextStepDate: '',
    assignedTo: 'current_user',
    tags: []
  });

  // Handler functions for conversation actions
  const handleReply = (conversation) => {
    setSelectedConversation(conversation);
    setReplyForm({
      message: '',
      channel: conversation.channel.toLowerCase(),
      attachFile: false
    });
    setShowReplyModal(true);
  };

  const handleUpdateStatus = (client) => {
    setSelectedClientForUpdate(client);
    setUpdateStatusForm({
      currentStage: client.status || 'consultation',
      newStage: '',
      priority: client.priority || 'medium',
      notes: '',
      notifyClient: true,
      nextStepDate: '',
      assignedTo: 'current_user',
      tags: []
    });
    setShowUpdateStatusModal(true);
  };

  const handleMarkAsRead = (conversationId) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unread: false }
        : conv
    ));
  };

  const handleSendReply = () => {
    // In a real app, this would send the reply through the appropriate channel
    console.log('Sending reply:', {
      to: selectedConversation?.client,
      message: replyForm.message,
      channel: replyForm.channel
    });
    
    // Mark the conversation as read and close the modal
    if (selectedConversation) {
      handleMarkAsRead(selectedConversation.id);
    }
    
    // Reset form and close modal
    setReplyForm({ message: '', channel: 'whatsapp', attachFile: false });
    setShowReplyModal(false);
    setSelectedConversation(null);
  };

  // Sample recruiter data
  const [recruiterData] = useState({
    recruiterName: 'Sarah Mitchell',
    company: 'MedStaff Global',
    recruiterCode: 'REC-001',
    joinDate: '2023-01-15',
    tier: 'Premium Partner'
  });

  // White-label branding state
  const [brandingConfig, setBrandingConfig] = useState({
    companyLogo: '/api/placeholder/120/40',
    primaryColor: '#2563eb',
    secondaryColor: '#10b981',
    accentColor: '#8b5cf6',
    companyName: 'MedStaff Global',
    tagline: 'Your Healthcare Recruitment Partner',
    customDomain: 'medstaff.elab.com',
    favicon: '/api/placeholder/32/32',
    brandTheme: 'professional' // professional, modern, healthcare
  });

  // Workflow automation states
  const [workflows, setWorkflows] = useState([
    {
      id: 'wf-001',
      name: 'Document Follow-up',
      trigger: 'When documents are pending for 3+ days',
      action: 'Send WhatsApp reminder + Email',
      status: 'active',
      clients: 3,
      enabled: true
    },
    {
      id: 'wf-002',
      name: 'Service Completion Alert',
      trigger: 'When service reaches 90% completion',
      action: 'Notify client + Prepare next service',
      status: 'active',
      clients: 2,
      enabled: true
    },
    {
      id: 'wf-003',
      name: 'Payment Reminder',
      trigger: 'When payment is overdue by 7 days',
      action: 'SMS + Email + Call notification',
      status: 'active',
      clients: 1,
      enabled: true
    },
    {
      id: 'wf-004',
      name: 'Upsell Opportunity',
      trigger: 'When primary service is 70% complete',
      action: 'Suggest complementary services',
      status: 'paused',
      clients: 0,
      enabled: false
    }
  ]);

  // Mock client data for the recruiter
  const [clients] = useState([
    {
      id: 'CLI-001',
      name: 'Dr. Ahmed Al-Rashid',
      email: 'ahmed.rashid@email.com',
      phone: '+971-50-123-4567',
      nationality: 'Egyptian',
      specialty: 'Cardiology',
      services: [
        { type: 'DataFlow', status: 'authority_processing', progress: 75, value: 850 },
        { type: 'DHA License', status: 'documents_submitted', progress: 35, value: 1200 },
        { type: 'Job Placement', status: 'inquiry', progress: 10, value: 2500 }
      ],
      totalValue: 4550,
      priority: 'high',
      lastActivity: '2024-09-01',
      recruiterEarnings: 910, // 20% commission
      riskLevel: 'low'
    },
    {
      id: 'CLI-002', 
      name: 'Dr. Fatima Al-Zahra',
      email: 'fatima.zahra@email.com',
      phone: '+966-55-987-6543',
      nationality: 'Pakistani',
      specialty: 'Pediatrics',
      services: [
        { type: 'CGFNS', status: 'completed', progress: 100, value: 950 },
        { type: 'VisaScreen', status: 'qc_passed', progress: 60, value: 750 }
      ],
      totalValue: 1700,
      priority: 'medium',
      lastActivity: '2024-08-28',
      recruiterEarnings: 340,
      riskLevel: 'low'
    },
    {
      id: 'CLI-003',
      name: 'Dr. Mohammad Hassan',
      email: 'mohammad.hassan@email.com', 
      phone: '+974-33-555-9999',
      nationality: 'Jordanian',
      specialty: 'Emergency Medicine',
      services: [
        { type: 'QCHP Qatar', status: 'on_hold', progress: 45, value: 1100 },
        { type: 'Mumaris Plus', status: 'documents_submitted', progress: 25, value: 800 }
      ],
      totalValue: 1900,
      priority: 'urgent',
      lastActivity: '2024-08-25',
      recruiterEarnings: 380,
      riskLevel: 'high'
    },
    {
      id: 'CLI-004',
      name: 'Dr. Aisha Mahmoud',
      email: 'aisha.mahmoud@email.com',
      phone: '+971-56-444-7777',
      nationality: 'Sudanese',
      specialty: 'Radiology',
      services: [
        { type: 'DHA License', status: 'exam_scheduled', progress: 80, value: 1200 },
        { type: 'Credentialing', status: 'authority_processing', progress: 55, value: 900 }
      ],
      totalValue: 2100,
      priority: 'medium',
      lastActivity: '2024-09-02',
      recruiterEarnings: 420,
      riskLevel: 'medium'
    },
    {
      id: 'CLI-005',
      name: 'Dr. Omar Khalil',
      email: 'omar.khalil@email.com',
      phone: '+968-99-222-1111',
      nationality: 'Lebanese',
      specialty: 'Orthopedics',
      services: [
        { type: 'OMSB Oman', status: 'completed', progress: 100, value: 1300 },
        { type: 'License Renewal', status: 'completed', progress: 100, value: 400 },
        { type: 'Job Placement', status: 'authority_processing', progress: 70, value: 3000 }
      ],
      totalValue: 4700,
      priority: 'high',
      lastActivity: '2024-09-03',
      recruiterEarnings: 940,
      riskLevel: 'low'
    }
  ]);

  // Filter and search clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === 'all' || client.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || 
      client.services.some(service => service.status === filterStatus);
    
    return matchesSearch && matchesPriority && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'totalValue':
        return b.totalValue - a.totalValue;
      case 'lastActivity':
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      case 'priority':
        const priorityOrder = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      default:
        return 0;
    }
  });

  // Calculate summary statistics
  const totalClients = filteredClients.length;
  const activeServices = filteredClients.reduce((sum, client) => sum + client.services.length, 0);
  const totalRevenue = filteredClients.reduce((sum, client) => sum + client.totalValue, 0);
  const totalEarnings = filteredClients.reduce((sum, client) => sum + client.recruiterEarnings, 0);
  const completedServices = filteredClients.reduce((sum, client) => 
    sum + client.services.filter(s => s.status === 'completed').length, 0
  );
  const urgentClients = filteredClients.filter(c => c.priority === 'urgent' || c.riskLevel === 'high').length;

  // Handler functions
  const handleAddClient = () => {
    if (!clientForm.name || !clientForm.email || !clientForm.phone) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Adding new client:', clientForm);
    alert('New client added successfully! They will appear in your portfolio shortly.');
    setShowClientModal(false);
    setClientForm({ name: '', email: '', phone: '', specialty: '', nationality: '', services: [] });
  };

  const handleViewDetails = (client: any) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  };

  const handleMessageClient = (client: any) => {
    setSelectedClient(client);
    setMessageForm({ type: 'update', subject: '', message: '', channels: ['email', 'whatsapp'] });
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    if (!messageForm.subject || !messageForm.message) {
      alert('Please fill in both subject and message');
      return;
    }
    const channelsText = messageForm.channels.join(', ');
    alert(`Message sent successfully via ${channelsText}!`);
    setShowMessageModal(false);
    setMessageForm({ type: 'update', subject: '', message: '', channels: ['email', 'whatsapp'] });
  };

  const handleUpdateWorkflow = (workflowId: string, enabled: boolean) => {
    setWorkflows(workflows.map(wf => 
      wf.id === workflowId ? { ...wf, enabled, status: enabled ? 'active' : 'paused' } : wf
    ));
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(workflows.filter(wf => wf.id !== workflowId));
    }
  };

  const handleExportData = () => {
    const exportData = {
      recruiter: recruiterData,
      clients: filteredClients,
      workflows: workflows,
      branding: brandingConfig,
      summary: { totalClients, totalRevenue, totalEarnings },
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recruiter-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateReport = (templateType: string) => {
    alert(`Generating ${templateType} report... This will be ready for download in a few moments.`);
  };

  const handleToggleChannel = (channel: string) => {
    setMessageForm(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* White-Label Header */}
      <div 
        className="border-b border-gray-200 px-6 py-4"
        style={{ 
          background: `linear-gradient(135deg, ${brandingConfig.primaryColor}, ${brandingConfig.secondaryColor})`,
          color: 'white'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-bold">
                {brandingConfig.companyName.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{brandingConfig.companyName} Dashboard</h1>
              <p className="text-white/90">{brandingConfig.tagline}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-white/90">Welcome back, <strong>{recruiterData.recruiterName}</strong></div>
              <div className="font-semibold bg-white/20 px-2 py-1 rounded text-sm">{recruiterData.tier}</div>
            </div>
            <button 
              onClick={() => setShowBrandingModal(true)}
              className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium"
            >
              🎨 Customize Branding
            </button>
          </div>
        </div>

        {/* Custom Domain & Live Status */}
        <div className="mt-3 flex items-center justify-between text-sm text-white/80">
          <div className="flex items-center space-x-4">
            <span>🌐 {brandingConfig.customDomain}</span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Live & Active
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="hover:text-white">📱 Mobile App</button>
            <button className="hover:text-white">🔗 Share Portal</button>
            <button className="hover:text-white">⚙️ Settings</button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 sm:space-y-8">
        {/* Multi-Client Command Center */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Command Center Overview
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{totalClients}</div>
              <div className="text-sm opacity-90">Active Clients</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <div className="text-sm opacity-90">Pipeline Revenue</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
              <div className="text-sm opacity-90">Your Earnings</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{urgentClients}</div>
              <div className="text-sm opacity-90">Urgent Actions</div>
            </div>
          </div>
        </div>

        {/* AI-Powered Intelligence Hub */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-white mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Intelligence Center</h3>
              <p className="text-purple-100">Smart recommendations powered by machine learning</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Smart Recommendations */}
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Smart Recommendations
              </h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white/10 p-2 rounded">
                  <strong>Dr. Ahmed Al-Rashid</strong> - Add CGFNS service (+$950 revenue)
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <strong>Dr. Aisha Mahmoud</strong> - Upsell Job Placement (+$2500 revenue)
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <strong>New Opportunity:</strong> 3 similar profiles available
                </div>
              </div>
            </div>

            {/* Risk Alerts */}
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center">
                <span className="mr-2">⚠️</span>
                Risk Alerts
              </h4>
              <div className="space-y-2 text-sm">
                <div className="bg-red-500/20 p-2 rounded border border-red-400/30">
                  <strong>Dr. Mohammad Hassan</strong> - Service on hold for 5 days
                </div>
                <div className="bg-yellow-500/20 p-2 rounded border border-yellow-400/30">
                  <strong>Document Expiry:</strong> 2 clients need renewals
                </div>
                <div className="bg-green-500/20 p-2 rounded border border-green-400/30">
                  <strong>Dr. Omar Khalil</strong> - Ready for next service
                </div>
              </div>
            </div>

            {/* Predictive Insights */}
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center">
                <span className="mr-2">🔮</span>
                Predictive Insights
              </h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white/10 p-2 rounded">
                  <strong>Completion Forecast:</strong> 3 services completing this week
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <strong>Revenue Projection:</strong> $4,200 next month
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <strong>Best Time to Contact:</strong> Weekdays 2-5 PM
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex space-x-3">
            <button 
              onClick={() => setShowAllRecommendationsModal(true)}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 font-medium transition-colors"
            >
              View All Recommendations
            </button>
            <button 
              onClick={() => setShowAISettingsModal(true)}
              className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
            >
              Configure AI Settings
            </button>
          </div>
        </div>

        {/* Smart Analytics Hub */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="mr-2">📊</span>
              Smart Analytics Hub
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Revenue Trend */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-green-800">Monthly Revenue</h4>
                  <span className="text-green-600">📈</span>
                </div>
                <div className="text-2xl font-bold text-green-900">${totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-green-600">+12% from last month</div>
              </div>

              {/* Success Rate */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-800">Success Rate</h4>
                  <span className="text-blue-600">🎯</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">94%</div>
                <div className="text-sm text-blue-600">Above average</div>
              </div>

              {/* Average Processing Time */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-purple-800">Avg Process Time</h4>
                  <span className="text-purple-600">⚡</span>
                </div>
                <div className="text-2xl font-bold text-purple-900">28 days</div>
                <div className="text-sm text-purple-600">Industry leading</div>
              </div>

              {/* Client Satisfaction */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-orange-800">Client Rating</h4>
                  <span className="text-orange-600">⭐</span>
                </div>
                <div className="text-2xl font-bold text-orange-900">4.8/5</div>
                <div className="text-sm text-orange-600">98% positive feedback</div>
              </div>
            </div>

            {/* Service Performance Chart */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-4">Top Performing Services</h4>
                <div className="space-y-3">
                  {[
                    { name: 'DHA License', completed: 8, revenue: 9600, color: 'bg-blue-500' },
                    { name: 'DataFlow', completed: 6, revenue: 5100, color: 'bg-green-500' },
                    { name: 'Job Placement', completed: 4, revenue: 10000, color: 'bg-purple-500' },
                    { name: 'CGFNS', completed: 3, revenue: 2850, color: 'bg-orange-500' }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${service.color}`}></div>
                        <span className="font-medium">{service.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${service.revenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{service.completed} completed</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-4">Recent Activity Timeline</h4>
                <div className="space-y-4">
                  {[
                    { time: '2 hours ago', event: 'Dr. Ahmed\'s DHA License approved', type: 'success' },
                    { time: '4 hours ago', event: 'New client inquiry from Dr. Fatima', type: 'info' },
                    { time: '1 day ago', event: 'Dr. Omar\'s OMSB completed', type: 'success' },
                    { time: '2 days ago', event: 'Document submission for Dr. Aisha', type: 'warning' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.event}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Communication Hub */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <span className="mr-2">💬</span>
                Communication Hub
              </h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowWhatsAppBlastModal(true)}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  <span className="mr-1">📱</span>
                  WhatsApp Blast
                </button>
                <button 
                  onClick={() => setShowEmailCampaignModal(true)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  <span className="mr-1">📧</span>
                  Email Campaign
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Conversations */}
              <div className="lg:col-span-2">
                <h4 className="font-semibold mb-4">📨 Recent Conversations</h4>
                <div className="space-y-3">
                  {conversations.map((conv, index) => (
                    <div key={conv.id} className={`p-4 rounded-lg border ${
                      conv.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{conv.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{conv.client}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                conv.channel === 'WhatsApp' ? 'bg-green-100 text-green-800' :
                                conv.channel === 'Email' ? 'bg-blue-100 text-blue-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {conv.channel}
                              </span>
                              <span className="text-xs text-gray-500">{conv.time}</span>
                              {conv.unread && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{conv.message}</p>
                          <div className="mt-2 flex space-x-2">
                            <button 
                              onClick={() => handleReply(conv)}
                              className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                            >
                              Reply
                            </button>
                            <button 
                              onClick={() => handleMarkAsRead(conv.id)}
                              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                            >
                              Mark Read
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
                  View All Conversations (12)
                </button>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="font-semibold mb-4">⚡ Quick Actions</h4>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowWhatsAppUpdateModal(true)}
                    className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 flex items-center transition-colors"
                  >
                    <span className="mr-2">📱</span>
                    Send WhatsApp Update
                  </button>
                  <button 
                    onClick={() => setShowEmailAllModal(true)}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 flex items-center transition-colors"
                  >
                    <span className="mr-2">📧</span>
                    Email All Clients
                  </button>
                  <button 
                    onClick={() => setShowSMSReminderModal(true)}
                    className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 flex items-center transition-colors"
                  >
                    <span className="mr-2">📲</span>
                    SMS Reminders
                  </button>
                  <button 
                    onClick={() => setShowPushNotificationModal(true)}
                    className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 flex items-center transition-colors"
                  >
                    <span className="mr-2">🔔</span>
                    Push Notifications
                  </button>
                </div>

                {/* Communication Stats */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">📊 Communication Stats</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Messages Sent Today:</span>
                      <span className="font-semibold">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response Rate:</span>
                      <span className="font-semibold text-green-600">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Response Time:</span>
                      <span className="font-semibold">2.4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unread Messages:</span>
                      <span className="font-semibold text-red-600">5</span>
                    </div>
                  </div>
                </div>

                {/* AI Assistant */}
                <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-medium mb-2 flex items-center">
                    <span className="mr-2">🤖</span>
                    AI Writing Assistant
                  </h5>
                  <p className="text-sm text-purple-700 mb-3">
                    Get help writing professional messages to your clients
                  </p>
                  <button 
                    onClick={() => setShowAIMessageModal(true)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 text-sm transition-colors"
                  >
                    Generate Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{completedServices}</div>
                <div className="text-gray-600">Completed Services</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">⚡</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{activeServices}</div>
                <div className="text-gray-600">Services In Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">📈</span>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((completedServices / activeServices) * 100)}%
                </div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Intelligence Suite */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <span className="mr-2">📈</span>
                Business Intelligence Suite
              </h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowReportsModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  📊 Custom Reports
                </button>
                <button 
                  onClick={() => setShowAllRecommendationsModal(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  🤖 AI Insights
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Analytics */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-4 flex items-center">
                  <span className="mr-2">💰</span>
                  Revenue Intelligence
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-700">This Month</span>
                    <span className="font-bold text-green-900">${totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-700">Projected Next Month</span>
                    <span className="font-bold text-green-900">$18,650</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-700">YTD Growth</span>
                    <span className="font-bold text-green-600">+34%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-xs text-green-600">78% to annual target ($180k)</p>
                </div>
              </div>

              {/* Client Intelligence */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                  <span className="mr-2">👥</span>
                  Client Intelligence
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">Active Clients</span>
                    <span className="font-bold text-blue-900">{totalClients}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">Avg. Client Value</span>
                    <span className="font-bold text-blue-900">${Math.round(totalRevenue / totalClients).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">Retention Rate</span>
                    <span className="font-bold text-blue-600">96%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-1"></div>
                      <div className="text-xs text-blue-700">High Risk</div>
                      <div className="font-bold text-sm">1</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                      <div className="text-xs text-blue-700">Medium</div>
                      <div className="font-bold text-sm">1</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-1"></div>
                      <div className="text-xs text-blue-700">Low Risk</div>
                      <div className="font-bold text-sm">3</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Intelligence */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-4 flex items-center">
                  <span className="mr-2">🌍</span>
                  Market Intelligence
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-700">Market Rank</span>
                    <span className="font-bold text-purple-900">#3 in Region</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-700">Competitor Analysis</span>
                    <span className="font-bold text-purple-600">+12% ahead</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-700">Market Share</span>
                    <span className="font-bold text-purple-900">8.4%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-purple-700">Top Services Demand:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>DHA License</span>
                        <span className="font-semibold">High ↑</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>DataFlow</span>
                        <span className="font-semibold">Medium →</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Job Placement</span>
                        <span className="font-semibold">High ↑</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Analytics Charts */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h5 className="font-semibold mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Revenue Trend (Last 6 Months)
                </h5>
                <div className="space-y-3">
                  {[
                    { month: 'Mar', revenue: 8500, growth: '+5%' },
                    { month: 'Apr', revenue: 12300, growth: '+8%' },
                    { month: 'May', revenue: 15600, growth: '+12%' },
                    { month: 'Jun', revenue: 13200, growth: '-2%' },
                    { month: 'Jul', revenue: 17800, growth: '+18%' },
                    { month: 'Aug', revenue: 14850, growth: '+7%' }
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-8">{data.month}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(data.revenue / 20000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${data.revenue.toLocaleString()}</div>
                        <div className={`text-xs ${
                          data.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {data.growth}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Performance */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h5 className="font-semibold mb-4 flex items-center">
                  <span className="mr-2">🎯</span>
                  Service Performance Matrix
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { service: 'DHA License', revenue: 9600, clients: 8, avgTime: '32 days', satisfaction: 4.9 },
                    { service: 'DataFlow', revenue: 5100, clients: 6, avgTime: '28 days', satisfaction: 4.8 },
                    { service: 'Job Placement', revenue: 10000, clients: 4, avgTime: '45 days', satisfaction: 4.7 },
                    { service: 'CGFNS', revenue: 2850, clients: 3, avgTime: '38 days', satisfaction: 4.6 }
                  ].map((service, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border">
                      <div className="font-semibold text-sm mb-2">{service.service}</div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div>💰 ${service.revenue.toLocaleString()}</div>
                        <div>👥 {service.clients} clients</div>
                        <div>⏱️ {service.avgTime}</div>
                        <div>⭐ {service.satisfaction}/5.0</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button 
                onClick={() => setShowMonthlyReportModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm transition-colors"
              >
                📋 Generate Monthly Report
              </button>
              <button 
                onClick={() => setShowExportDataModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm transition-colors"
              >
                💾 Export All Data
              </button>
              <button 
                onClick={() => setShowEmailReportModal(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm transition-colors"
              >
                📧 Email Report to Team
              </button>
              <button 
                onClick={() => setShowPredictiveAnalysisModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition-colors"
              >
                🔮 Predictive Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Automated Workflows & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Workflow Automation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <span className="mr-2">🔄</span>
                Automated Workflows
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Active Workflows */}
                {[
                  {
                    name: 'Document Follow-up',
                    trigger: 'When documents are pending for 3+ days',
                    action: 'Send WhatsApp reminder + Email',
                    status: 'active',
                    clients: 3
                  },
                  {
                    name: 'Service Completion Alert',
                    trigger: 'When service reaches 90% completion',
                    action: 'Notify client + Prepare next service',
                    status: 'active',
                    clients: 2
                  },
                  {
                    name: 'Payment Reminder',
                    trigger: 'When payment is overdue by 7 days',
                    action: 'SMS + Email + Call notification',
                    status: 'active',
                    clients: 1
                  },
                  {
                    name: 'Upsell Opportunity',
                    trigger: 'When primary service is 70% complete',
                    action: 'Suggest complementary services',
                    status: 'paused',
                    clients: 0
                  }
                ].map((workflow, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    workflow.status === 'active' ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          workflow.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                        {workflow.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {workflow.clients} clients
                        </span>
                        <button className={`text-xs px-2 py-1 rounded-full ${
                          workflow.status === 'active' 
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-600 text-white hover:bg-gray-700'
                        }`}>
                          {workflow.status === 'active' ? 'Active' : 'Paused'}
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Trigger:</strong> {workflow.trigger}</div>
                      <div><strong>Action:</strong> {workflow.action}</div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => setShowCreateWorkflowModal(true)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Create New Workflow
                </button>
              </div>
            </div>
          </div>

          {/* Smart Notifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <span className="mr-2">🔔</span>
                Smart Notifications
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Recent Notifications */}
                <div className="space-y-3">
                  {[
                    {
                      type: 'success',
                      title: 'Service Completed',
                      message: 'Dr. Omar Khalil\'s OMSB application was approved',
                      time: '5 min ago',
                      action: 'Suggest Job Placement'
                    },
                    {
                      type: 'warning', 
                      title: 'Document Pending',
                      message: 'Dr. Ahmed needs to upload experience letter',
                      time: '2 hours ago',
                      action: 'Send Reminder'
                    },
                    {
                      type: 'info',
                      title: 'New Opportunity',
                      message: 'Similar profile to Dr. Fatima is available',
                      time: '4 hours ago',
                      action: 'View Profile'
                    },
                    {
                      type: 'error',
                      title: 'Service On Hold',
                      message: 'Dr. Mohammad\'s QCHP application is delayed',
                      time: '6 hours ago',
                      action: 'Contact Client'
                    }
                  ].map((notif, index) => (
                    <div key={index} className={`border-l-4 p-3 rounded-r-lg ${
                      notif.type === 'success' ? 'border-green-500 bg-green-50' :
                      notif.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                      notif.type === 'error' ? 'border-red-500 bg-red-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{notif.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{notif.message}</div>
                          <div className="text-xs text-gray-500 mt-2">{notif.time}</div>
                        </div>
                        <button className={`ml-3 text-xs px-2 py-1 rounded ${
                          notif.type === 'success' ? 'bg-green-600 text-white hover:bg-green-700' :
                          notif.type === 'warning' ? 'bg-yellow-600 text-white hover:bg-yellow-700' :
                          notif.type === 'error' ? 'bg-red-600 text-white hover:bg-red-700' :
                          'bg-blue-600 text-white hover:bg-blue-700'
                        }`}>
                          {notif.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notification Settings */}
                <div className="pt-4 border-t border-gray-200">
                  <h5 className="font-medium mb-3">Notification Preferences</h5>
                  <div className="space-y-2">
                    {[
                      { name: 'Desktop Notifications', enabled: true },
                      { name: 'Email Alerts', enabled: true },
                      { name: 'SMS Updates', enabled: false },
                      { name: 'WhatsApp Bot', enabled: true }
                    ].map((pref, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{pref.name}</span>
                        <button className={`w-12 h-6 rounded-full transition-colors ${
                          pref.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            pref.enabled ? 'translate-x-7' : 'translate-x-1'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Portfolio */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                👥 Your Client Portfolio
              </h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowClientModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add New Client
                </button>
                <button 
                  onClick={handleExportData}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Export Data
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-6">
              {clients.map((client) => (
                <div key={client.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{client.name}</h4>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                          client.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          client.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {client.priority.toUpperCase()}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          client.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                          client.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          Risk: {client.riskLevel}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>📧 {client.email} | 📱 {client.phone}</div>
                        <div>🏥 {client.specialty} | 🌍 {client.nationality}</div>
                        <div>📅 Last Activity: {new Date(client.lastActivity).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">${client.totalValue.toLocaleString()}</div>
                      <div className="text-sm text-green-600">Your earnings: ${client.recruiterEarnings.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-800">Services ({client.services.length})</h5>
                    {client.services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            service.status === 'completed' ? 'bg-green-500' :
                            service.status === 'on_hold' ? 'bg-red-500' :
                            service.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}></div>
                          <span className="font-medium">{service.type}</span>
                          <span className="text-sm text-gray-600">
                            {service.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${service.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{service.progress}%</span>
                          <span className="text-sm text-gray-600">${service.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => handleViewDetails(client)}
                      className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleMessageClient(client)}
                      className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                    >
                      Message Client
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(client)}
                      className="bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 lg:max-w-md">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search clients by name, email, or specialty..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      🔍
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
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
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="authority_processing">Processing</option>
                    <option value="documents_submitted">Submitted</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="lastActivity">Last Activity</option>
                    <option value="name">Name</option>
                    <option value="totalValue">Value</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </div>
              
              {/* Results Summary */}
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredClients.length} of {clients.length} clients
                {searchQuery && ` matching "${searchQuery}"`}
              </div>
            </div>

            {/* Client Grid */}
            <div className="grid gap-6">
              {filteredClients.map((client) => (
                <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{client.name}</h4>
                        <div className="flex space-x-2 mt-2 sm:mt-0 sm:ml-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            client.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                            client.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {client.priority.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            client.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                            client.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            Risk: {client.riskLevel}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                          <div>📧 {client.email}</div>
                          <div>📱 {client.phone}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                          <div>🏥 {client.specialty}</div>
                          <div>🌍 {client.nationality}</div>
                        </div>
                        <div>📅 Last Activity: {new Date(client.lastActivity).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:text-right">
                      <div className="text-lg font-bold text-gray-900">${client.totalValue.toLocaleString()}</div>
                      <div className="text-sm text-green-600">Your earnings: ${client.recruiterEarnings.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mt-4 space-y-3">
                    <h5 className="font-medium text-gray-800">Services ({client.services.length})</h5>
                    <div className="grid gap-2">
                      {client.services.map((service, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                            <div className={`w-3 h-3 rounded-full ${
                              service.status === 'completed' ? 'bg-green-500' :
                              service.status === 'on_hold' ? 'bg-red-500' :
                              service.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                            }`}></div>
                            <span className="font-medium">{service.type}</span>
                            <span className="text-sm text-gray-600">
                              {service.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end space-x-4">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${service.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{service.progress}%</span>
                            <span className="text-sm text-gray-600">${service.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => handleViewDetails(client)}
                      className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleMessageClient(client)}
                      className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                    >
                      Message Client
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(client)}
                      className="bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredClients.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try adjusting your search terms or filters.' : 'Add your first client to get started.'}
                </p>
                <button 
                  onClick={() => setShowClientModal(true)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add New Client
                </button>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{completedServices}</div>
                    <div className="text-gray-600">Completed Services</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">⚡</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{activeServices}</div>
                    <div className="text-gray-600">Services In Progress</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">📈</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round((completedServices / activeServices) * 100)}%
                    </div>
                    <div className="text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">💰</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">${totalEarnings.toLocaleString()}</div>
                    <div className="text-gray-600">Total Earnings</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Charts - Reuse from dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h4 className="font-medium text-gray-800 mb-4">📊 Revenue Trend (Last 6 Months)</h4>
                <div className="space-y-3">
                  {[
                    { month: 'Mar', revenue: 8500, growth: '+5%' },
                    { month: 'Apr', revenue: 12300, growth: '+8%' },
                    { month: 'May', revenue: 15600, growth: '+12%' },
                    { month: 'Jun', revenue: 13200, growth: '-2%' },
                    { month: 'Jul', revenue: 17800, growth: '+18%' },
                    { month: 'Aug', revenue: 14850, growth: '+7%' }
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-8">{data.month}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(data.revenue / 20000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${data.revenue.toLocaleString()}</div>
                        <div className={`text-xs ${
                          data.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {data.growth}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h4 className="font-medium text-gray-800 mb-4">🎯 Service Performance</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { service: 'DHA License', revenue: 9600, clients: 8, satisfaction: 4.9 },
                    { service: 'DataFlow', revenue: 5100, clients: 6, satisfaction: 4.8 },
                    { service: 'Job Placement', revenue: 10000, clients: 4, satisfaction: 4.7 },
                    { service: 'CGFNS', revenue: 2850, clients: 3, satisfaction: 4.6 }
                  ].map((service, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="font-semibold text-sm mb-2">{service.service}</div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div>💰 ${service.revenue.toLocaleString()}</div>
                        <div>👥 {service.clients} clients</div>
                        <div>⭐ {service.satisfaction}/5.0</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Communication Tab */}
        {activeTab === 'communication' && (
          <div className="space-y-6">
            {/* Communication Hub */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4 sm:mb-0">
                    <span className="mr-2">💬</span>
                    Communication Center
                  </h3>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700">
                      <span className="mr-1">📱</span>
                      WhatsApp Blast
                    </button>
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700">
                      <span className="mr-1">📧</span>
                      Email Campaign
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Conversations */}
                  <div>
                    <h4 className="font-semibold mb-4">📨 Recent Conversations</h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {[
                        {
                          client: 'Dr. Ahmed Al-Rashid',
                          message: 'Thank you for the update on my DHA license. When should I expect the next step?',
                          time: '2 hours ago',
                          channel: 'WhatsApp',
                          unread: true,
                          avatar: '🧑‍⚕️'
                        },
                        {
                          client: 'Dr. Fatima Al-Zahra',
                          message: 'I have uploaded the additional documents you requested.',
                          time: '4 hours ago', 
                          channel: 'Email',
                          unread: true,
                          avatar: '👩‍⚕️'
                        },
                        {
                          client: 'Dr. Aisha Mahmoud',
                          message: 'Exam completed successfully! What are the next steps?',
                          time: '1 day ago',
                          channel: 'SMS',
                          unread: false,
                          avatar: '👩‍⚕️'
                        }
                      ].map((conv, index) => (
                        <div key={index} className={`p-4 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                          conv.unread ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                        }`}>
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">{conv.avatar}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900 truncate">{conv.client}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  conv.channel === 'WhatsApp' ? 'bg-green-100 text-green-800' :
                                  conv.channel === 'Email' ? 'bg-blue-100 text-blue-800' :
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {conv.channel}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{conv.message}</p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-500">{conv.time}</p>
                                {conv.unread && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h4 className="font-semibold mb-4">⚡ Quick Actions</h4>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                        <h5 className="font-semibold text-green-900 mb-2">
                          📱 WhatsApp Templates
                        </h5>
                        <p className="text-sm text-green-700 mb-3">
                          Send pre-designed messages to clients instantly
                        </p>
                        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm">
                          Choose Template
                        </button>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-900 mb-2">
                          📧 Email Campaigns
                        </h5>
                        <p className="text-sm text-blue-700 mb-3">
                          Send bulk emails to multiple clients at once
                        </p>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm">
                          Create Campaign
                        </button>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                        <h5 className="font-semibold text-purple-900 mb-2">
                          🤖 AI Writing Assistant
                        </h5>
                        <p className="text-sm text-purple-700 mb-3">
                          Get help writing professional messages to your clients
                        </p>
                        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 text-sm">
                          Generate Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workflows Tab */}
        {activeTab === 'workflows' && (
          <div className="space-y-6">
            {/* Workflow Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">🔄</span>
                    Automated Workflows
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">Automate repetitive tasks and improve efficiency</p>
                </div>
                <button 
                  onClick={() => setShowWorkflowModal(true)}
                  className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  + Create New Workflow
                </button>
              </div>
            </div>

            {/* Active Workflows */}
            <div className="grid gap-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className={`border rounded-lg p-6 transition-all ${
                  workflow.enabled ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4 lg:mb-2">
                        <div className="flex items-center space-x-3">
                          <span className={`w-3 h-3 rounded-full ${
                            workflow.enabled ? 'bg-green-500' : 'bg-gray-400'
                          }`}></span>
                          <h4 className="font-semibold text-gray-900">{workflow.name}</h4>
                        </div>
                        <div className="lg:hidden flex items-center space-x-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {workflow.clients} clients
                          </span>
                          <button 
                            onClick={() => handleUpdateWorkflow(workflow.id, !workflow.enabled)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              workflow.enabled ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                              workflow.enabled ? 'translate-x-7' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Trigger:</strong> {workflow.trigger}</div>
                        <div><strong>Action:</strong> {workflow.action}</div>
                      </div>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4 mt-4 lg:mt-0">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {workflow.clients} clients
                      </span>
                      <button 
                        onClick={() => handleUpdateWorkflow(workflow.id, !workflow.enabled)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          workflow.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          workflow.enabled ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                      <button 
                        onClick={() => handleDeleteWorkflow(workflow.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Reports Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">📊</span>
                    Business Reports
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">Generate comprehensive reports and insights</p>
                </div>
                <button 
                  onClick={() => setShowReportsModal(true)}
                  className="mt-4 sm:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  📊 Custom Reports
                </button>
              </div>
            </div>

            {/* Quick Reports */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Monthly Performance',
                  desc: 'Revenue, client stats, and completion rates',
                  icon: '📈',
                  type: 'monthly',
                  color: 'blue'
                },
                {
                  name: 'Client Analysis',
                  desc: 'Detailed breakdown of all your clients',
                  icon: '👥',
                  type: 'clients',
                  color: 'green'
                },
                {
                  name: 'Financial Report',
                  desc: 'Earnings, commissions, and projections',
                  icon: '💰',
                  type: 'financial',
                  color: 'purple'
                },
                {
                  name: 'Service Metrics',
                  desc: 'Processing times and satisfaction scores',
                  icon: '🎯',
                  type: 'services',
                  color: 'orange'
                },
                {
                  name: 'Risk Assessment',
                  desc: 'Client risk levels and action items',
                  icon: '⚠️',
                  type: 'risk',
                  color: 'red'
                },
                {
                  name: 'Business Review',
                  desc: 'Comprehensive quarterly analysis',
                  icon: '📊',
                  type: 'quarterly',
                  color: 'indigo'
                }
              ].map((report, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <span className="text-3xl">{report.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{report.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">{report.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs bg-${report.color}-100 text-${report.color}-800 px-2 py-1 rounded-full`}>
                          {report.type}
                        </span>
                        <button 
                          onClick={() => handleGenerateReport(report.name)}
                          className={`bg-${report.color}-600 text-white px-3 py-1 rounded text-sm hover:bg-${report.color}-700`}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Client Modal */}
        {showClientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">👥 Add New Client</h3>
                <button 
                  onClick={() => setShowClientModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Dr. Ahmed Al-Rashid"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="ahmed.rashid@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="+971-50-123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Specialty
                  </label>
                  <select 
                    value={clientForm.specialty}
                    onChange={(e) => setClientForm({...clientForm, specialty: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select specialty...</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Emergency Medicine">Emergency Medicine</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="General Practice">General Practice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality
                  </label>
                  <select 
                    value={clientForm.nationality}
                    onChange={(e) => setClientForm({...clientForm, nationality: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select nationality...</option>
                    <option value="Egyptian">Egyptian</option>
                    <option value="Pakistani">Pakistani</option>
                    <option value="Jordanian">Jordanian</option>
                    <option value="Lebanese">Lebanese</option>
                    <option value="Sudanese">Sudanese</option>
                    <option value="Indian">Indian</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowClientModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddClient}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Add Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Client Details Modal */}
        {showDetailsModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">👤 {selectedClient.name} - Detailed Overview</h3>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Client Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-4">📋 Client Information</h4>
                  <div className="space-y-3 text-sm">
                    <div><strong>Email:</strong> {selectedClient.email}</div>
                    <div><strong>Phone:</strong> {selectedClient.phone}</div>
                    <div><strong>Specialty:</strong> {selectedClient.specialty}</div>
                    <div><strong>Nationality:</strong> {selectedClient.nationality}</div>
                    <div><strong>Client ID:</strong> {selectedClient.id}</div>
                    <div><strong>Last Activity:</strong> {new Date(selectedClient.lastActivity).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Financial Overview */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-4">💰 Financial Overview</h4>
                  <div className="space-y-3 text-sm">
                    <div><strong>Total Value:</strong> ${selectedClient.totalValue.toLocaleString()}</div>
                    <div><strong>Your Earnings:</strong> ${selectedClient.recruiterEarnings.toLocaleString()}</div>
                    <div><strong>Commission Rate:</strong> 20%</div>
                    <div><strong>Payment Status:</strong> <span className="text-green-600">Up to date</span></div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-4">📊 Risk Assessment</h4>
                  <div className="space-y-3 text-sm">
                    <div><strong>Priority Level:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        selectedClient.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        selectedClient.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedClient.priority.toUpperCase()}
                      </span>
                    </div>
                    <div><strong>Risk Level:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        selectedClient.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                        selectedClient.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedClient.riskLevel.toUpperCase()}
                      </span>
                    </div>
                    <div><strong>Services Count:</strong> {selectedClient.services.length}</div>
                  </div>
                </div>
              </div>

              {/* Services Detail */}
              <div className="mt-6">
                <h4 className="font-semibold mb-4">🎯 Services Progress</h4>
                <div className="space-y-4">
                  {selectedClient.services.map((service: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${
                            service.status === 'completed' ? 'bg-green-500' :
                            service.status === 'on_hold' ? 'bg-red-500' :
                            service.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}></div>
                          <h5 className="font-semibold">{service.type}</h5>
                          <span className="text-sm text-gray-600">
                            {service.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${service.value.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{service.progress}% complete</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${service.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  View Full Timeline
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Send Message
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message Client Modal */}
        {showMessageModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">💬 Message {selectedClient.name}</h3>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Type
                  </label>
                  <select 
                    value={messageForm.type}
                    onChange={(e) => setMessageForm({...messageForm, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="update">Service Update</option>
                    <option value="document">Document Request</option>
                    <option value="appointment">Appointment Reminder</option>
                    <option value="general">General Communication</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input 
                    type="text"
                    value={messageForm.subject}
                    onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter message subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea 
                    value={messageForm.message}
                    onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Type your message here..."
                  />
                </div>

                {/* Communication Channels */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Send via
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'email', name: 'Email', icon: '📧', color: 'blue' },
                      { id: 'whatsapp', name: 'WhatsApp', icon: '📱', color: 'green' },
                      { id: 'sms', name: 'SMS', icon: '💬', color: 'purple' }
                    ].map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => handleToggleChannel(channel.id)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          messageForm.channels.includes(channel.id)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-600'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-xl mb-1">{channel.icon}</div>
                          <div>{channel.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Select one or more communication channels
                  </p>
                </div>

                {/* AI Assistant */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-purple-900">🤖 AI Writing Assistant</h4>
                    <button className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700">
                      Enhance
                    </button>
                  </div>
                  <p className="text-sm text-purple-700">
                    Get AI suggestions to improve your message tone and clarity
                  </p>
                </div>

                {/* Preview */}
                {(messageForm.subject || messageForm.message) && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">📄 Message Preview</h4>
                    <div className="text-sm text-gray-700 space-y-2">
                      <div><strong>To:</strong> {selectedClient.name} ({selectedClient.email})</div>
                      <div><strong>Subject:</strong> {messageForm.subject || 'No subject'}</div>
                      <div className="bg-white p-3 rounded border">
                        {messageForm.message || 'No message content'}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    disabled={!messageForm.subject || !messageForm.message || messageForm.channels.length === 0}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Branding Customization Modal */}
        {showBrandingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">🎨 White-Label Branding Customization</h3>
                <button 
                  onClick={() => setShowBrandingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Preview Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">🖥️ Live Preview</h4>
                  <div 
                    className="rounded-lg p-4 text-white"
                    style={{ 
                      background: `linear-gradient(135deg, ${brandingConfig.primaryColor}, ${brandingConfig.secondaryColor})`
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded">
                        <div className="w-8 h-6 bg-gray-300 rounded flex items-center justify-center text-xs font-bold">
                          {brandingConfig.companyName.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{brandingConfig.companyName}</div>
                        <div className="text-sm opacity-90">{brandingConfig.tagline}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input 
                      type="text"
                      value={brandingConfig.companyName}
                      onChange={(e) => setBrandingConfig({...brandingConfig, companyName: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                    </label>
                    <input 
                      type="text"
                      value={brandingConfig.tagline}
                      onChange={(e) => setBrandingConfig({...brandingConfig, tagline: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Your Company Tagline"
                    />
                  </div>
                </div>

                {/* Color Customization */}
                <div>
                  <h4 className="font-medium mb-3">🎨 Color Scheme</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color"
                          value={brandingConfig.primaryColor}
                          onChange={(e) => setBrandingConfig({...brandingConfig, primaryColor: e.target.value})}
                          className="w-12 h-10 border border-gray-300 rounded"
                        />
                        <input 
                          type="text"
                          value={brandingConfig.primaryColor}
                          onChange={(e) => setBrandingConfig({...brandingConfig, primaryColor: e.target.value})}
                          className="flex-1 p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color"
                          value={brandingConfig.secondaryColor}
                          onChange={(e) => setBrandingConfig({...brandingConfig, secondaryColor: e.target.value})}
                          className="w-12 h-10 border border-gray-300 rounded"
                        />
                        <input 
                          type="text"
                          value={brandingConfig.secondaryColor}
                          onChange={(e) => setBrandingConfig({...brandingConfig, secondaryColor: e.target.value})}
                          className="flex-1 p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accent Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color"
                          value={brandingConfig.accentColor}
                          onChange={(e) => setBrandingConfig({...brandingConfig, accentColor: e.target.value})}
                          className="w-12 h-10 border border-gray-300 rounded"
                        />
                        <input 
                          type="text"
                          value={brandingConfig.accentColor}
                          onChange={(e) => setBrandingConfig({...brandingConfig, accentColor: e.target.value})}
                          className="flex-1 p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domain & URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Domain
                  </label>
                  <input 
                    type="text"
                    value={brandingConfig.customDomain}
                    onChange={(e) => setBrandingConfig({...brandingConfig, customDomain: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="yourcompany.elab.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">Your custom subdomain for the recruiter portal</p>
                </div>

                {/* Brand Theme */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Theme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'professional', name: 'Professional', desc: 'Clean & corporate' },
                      { value: 'modern', name: 'Modern', desc: 'Bold & contemporary' },
                      { value: 'healthcare', name: 'Healthcare', desc: 'Medical & trustworthy' }
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => setBrandingConfig({...brandingConfig, brandTheme: theme.value})}
                        className={`p-3 border-2 rounded-lg text-left ${
                          brandingConfig.brandTheme === theme.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-medium">{theme.name}</div>
                        <div className="text-xs text-gray-600">{theme.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <h4 className="font-medium mb-3">⚡ Quick Presets</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: 'Healthcare Blue', primary: '#2563eb', secondary: '#06b6d4' },
                      { name: 'Medical Green', primary: '#059669', secondary: '#10b981' },
                      { name: 'Professional Purple', primary: '#7c3aed', secondary: '#a855f7' },
                      { name: 'Corporate Gray', primary: '#374151', secondary: '#6b7280' }
                    ].map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => setBrandingConfig({
                          ...brandingConfig, 
                          primaryColor: preset.primary,
                          secondaryColor: preset.secondary
                        })}
                        className="p-2 border border-gray-300 rounded-lg hover:border-gray-400"
                      >
                        <div className="flex space-x-1 mb-1">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.primary }}></div>
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.secondary }}></div>
                        </div>
                        <div className="text-xs font-medium">{preset.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowBrandingModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Branding updated successfully! Changes will apply immediately.');
                    setShowBrandingModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Reports Modal */}
        {showReportsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">📊 Custom Reports Builder</h3>
                <button 
                  onClick={() => setShowReportsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Report Templates */}
                <div>
                  <h4 className="font-medium mb-4">📋 Pre-built Report Templates</h4>
                  <div className="space-y-3">
                    {[
                      {
                        name: 'Monthly Performance Summary',
                        desc: 'Revenue, client stats, and service completion rates',
                        icon: '📈',
                        type: 'monthly'
                      },
                      {
                        name: 'Client Portfolio Analysis',
                        desc: 'Detailed breakdown of all your clients and their progress',
                        icon: '👥',
                        type: 'clients'
                      },
                      {
                        name: 'Financial Performance Report',
                        desc: 'Earnings, commission tracking, and revenue projections',
                        icon: '💰',
                        type: 'financial'
                      },
                      {
                        name: 'Service Success Metrics',
                        desc: 'Completion rates, processing times, and client satisfaction',
                        icon: '🎯',
                        type: 'services'
                      },
                      {
                        name: 'Risk Assessment Report',
                        desc: 'Client risk levels, delayed services, and action items',
                        icon: '⚠️',
                        type: 'risk'
                      },
                      {
                        name: 'Quarterly Business Review',
                        desc: 'Comprehensive analysis for stakeholder presentations',
                        icon: '📊',
                        type: 'quarterly'
                      }
                    ].map((template, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{template.icon}</span>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{template.name}</h5>
                            <p className="text-sm text-gray-600 mt-1">{template.desc}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                {template.type}
                              </span>
                              <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                                Generate
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Report Builder */}
                <div>
                  <h4 className="font-medium mb-4">🛠️ Custom Report Builder</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Report Name
                      </label>
                      <input 
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Enter custom report name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Range
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input 
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Include Metrics
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {[
                          'Revenue & Earnings',
                          'Client Count & Demographics', 
                          'Service Completion Rates',
                          'Processing Times',
                          'Client Satisfaction Scores',
                          'Risk Assessment Data',
                          'Communication Statistics',
                          'Workflow Performance',
                          'Market Comparisons',
                          'Predictive Analytics',
                          'Commission Breakdown',
                          'Geographic Distribution'
                        ].map((metric, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked={index < 6} className="w-4 h-4" />
                            <label className="text-sm text-gray-700">{metric}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Export Format
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['PDF', 'Excel', 'PowerPoint'].map((format) => (
                          <button 
                            key={format}
                            className="p-2 border border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-sm font-medium"
                          >
                            {format}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 font-medium">
                      🚀 Generate Custom Report
                    </button>
                  </div>

                  {/* Scheduled Reports */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h5 className="font-medium mb-3">⏰ Scheduled Reports</h5>
                    <div className="space-y-2">
                      {[
                        { name: 'Weekly Summary', schedule: 'Every Monday 9:00 AM', enabled: true },
                        { name: 'Monthly Performance', schedule: '1st of every month', enabled: true },
                        { name: 'Client Updates', schedule: 'Every Friday 5:00 PM', enabled: false }
                      ].map((scheduled, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium text-sm">{scheduled.name}</div>
                            <div className="text-xs text-gray-600">{scheduled.schedule}</div>
                          </div>
                          <button className={`w-10 h-6 rounded-full transition-colors ${
                            scheduled.enabled ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                              scheduled.enabled ? 'translate-x-5' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowReportsModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  📧 Email Report
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  💾 Save Template
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Blast Modal */}
        {showWhatsAppBlastModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">📱</span>
                  WhatsApp Blast Campaign
                </h3>
                <button 
                  onClick={() => setShowWhatsAppBlastModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <select
                    value={whatsappBlastForm.recipients}
                    onChange={(e) => setWhatsappBlastForm({...whatsappBlastForm, recipients: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Clients (247)</option>
                    <option value="active">Active Clients (189)</option>
                    <option value="pending">Pending Actions (34)</option>
                    <option value="selected">Selected Clients (0)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={whatsappBlastForm.message}
                    onChange={(e) => setWhatsappBlastForm({...whatsappBlastForm, message: e.target.value})}
                    placeholder="Type your WhatsApp message here..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Character count: {whatsappBlastForm.message.length}/1000</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule
                    </label>
                    <select
                      value={whatsappBlastForm.schedule}
                      onChange={(e) => setWhatsappBlastForm({...whatsappBlastForm, schedule: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="now">Send Now</option>
                      <option value="scheduled">Schedule for Later</option>
                    </select>
                  </div>

                  {whatsappBlastForm.schedule === 'scheduled' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={whatsappBlastForm.scheduledDate}
                          onChange={(e) => setWhatsappBlastForm({...whatsappBlastForm, scheduledDate: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time
                        </label>
                        <input
                          type="time"
                          value={whatsappBlastForm.scheduledTime}
                          onChange={(e) => setWhatsappBlastForm({...whatsappBlastForm, scheduledTime: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="attachMedia"
                    checked={whatsappBlastForm.attachMedia}
                    onChange={(e) => setWhatsappBlastForm({...whatsappBlastForm, attachMedia: e.target.checked})}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="attachMedia" className="text-sm text-gray-700">
                    Attach media file (image/document)
                  </label>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">📊 Campaign Preview</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p><strong>Recipients:</strong> {whatsappBlastForm.recipients === 'all' ? '247 clients' : whatsappBlastForm.recipients === 'active' ? '189 active clients' : whatsappBlastForm.recipients === 'pending' ? '34 pending clients' : '0 selected clients'}</p>
                    <p><strong>Estimated delivery:</strong> {whatsappBlastForm.schedule === 'now' ? 'Immediately' : `${whatsappBlastForm.scheduledDate} at ${whatsappBlastForm.scheduledTime}`}</p>
                    <p><strong>Message length:</strong> {whatsappBlastForm.message.length} characters</p>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowWhatsAppBlastModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                  📋 Preview Messages
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
                  <span className="mr-2">🚀</span>
                  {whatsappBlastForm.schedule === 'now' ? 'Send Now' : 'Schedule Campaign'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Campaign Modal */}
        {showEmailCampaignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">📧</span>
                  Email Campaign Builder
                </h3>
                <button 
                  onClick={() => setShowEmailCampaignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipients
                    </label>
                    <select
                      value={emailCampaignForm.recipients}
                      onChange={(e) => setEmailCampaignForm({...emailCampaignForm, recipients: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Clients (247)</option>
                      <option value="active">Active Clients (189)</option>
                      <option value="completed">Completed Services (156)</option>
                      <option value="pending">Pending Actions (34)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Template
                    </label>
                    <select
                      value={emailCampaignForm.template}
                      onChange={(e) => setEmailCampaignForm({...emailCampaignForm, template: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="custom">Custom Message</option>
                      <option value="welcome">Welcome Template</option>
                      <option value="follow-up">Follow-up Template</option>
                      <option value="reminder">Reminder Template</option>
                      <option value="completion">Service Completion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={emailCampaignForm.subject}
                    onChange={(e) => setEmailCampaignForm({...emailCampaignForm, subject: e.target.value})}
                    placeholder="Enter email subject line..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Content
                  </label>
                  <textarea
                    value={emailCampaignForm.message}
                    onChange={(e) => setEmailCampaignForm({...emailCampaignForm, message: e.target.value})}
                    placeholder="Type your email content here..."
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule
                    </label>
                    <select
                      value={emailCampaignForm.schedule}
                      onChange={(e) => setEmailCampaignForm({...emailCampaignForm, schedule: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="now">Send Immediately</option>
                      <option value="scheduled">Schedule for Later</option>
                    </select>
                  </div>

                  {emailCampaignForm.schedule === 'scheduled' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={emailCampaignForm.scheduledDate}
                          onChange={(e) => setEmailCampaignForm({...emailCampaignForm, scheduledDate: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time
                        </label>
                        <input
                          type="time"
                          value={emailCampaignForm.scheduledTime}
                          onChange={(e) => setEmailCampaignForm({...emailCampaignForm, scheduledTime: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">📊 Campaign Overview</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Recipients:</strong> {emailCampaignForm.recipients === 'all' ? '247 clients' : emailCampaignForm.recipients === 'active' ? '189 active clients' : emailCampaignForm.recipients === 'completed' ? '156 clients' : '34 pending clients'}</p>
                    <p><strong>Subject:</strong> {emailCampaignForm.subject || 'No subject set'}</p>
                    <p><strong>Template:</strong> {emailCampaignForm.template.replace('_', ' ').charAt(0).toUpperCase() + emailCampaignForm.template.slice(1)}</p>
                    <p><strong>Send time:</strong> {emailCampaignForm.schedule === 'now' ? 'Immediately' : `${emailCampaignForm.scheduledDate} at ${emailCampaignForm.scheduledTime}`}</p>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowEmailCampaignModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                  👁️ Preview Email
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  📝 Save as Draft
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center">
                  <span className="mr-2">🚀</span>
                  {emailCampaignForm.schedule === 'now' ? 'Send Campaign' : 'Schedule Campaign'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Update Modal */}
        {showWhatsAppUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">📱</span>
                  Send WhatsApp Update
                </h3>
                <button 
                  onClick={() => setShowWhatsAppUpdateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Message Templates
                  </label>
                  <div className="space-y-2">
                    {[
                      'Your service is progressing well. Next update in 2-3 business days.',
                      'Documents received and under review. We will contact you if additional information is needed.',
                      'Great news! Your application has been approved. Next steps will be shared shortly.',
                      'Friendly reminder: Please submit the requested documents at your earliest convenience.'
                    ].map((template, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setWhatsappBlastForm({...whatsappBlastForm, message: template})}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border text-sm"
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message
                  </label>
                  <textarea
                    value={whatsappBlastForm.message}
                    onChange={(e) => setWhatsappBlastForm({...whatsappBlastForm, message: e.target.value})}
                    placeholder="Type your custom WhatsApp message..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send to
                  </label>
                  <select
                    value={whatsappBlastForm.recipients}
                    onChange={(e) => setWhatsappBlastForm({...whatsappBlastForm, recipients: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="active">Active Clients (189)</option>
                    <option value="pending">Pending Actions (34)</option>
                    <option value="all">All Clients (247)</option>
                  </select>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowWhatsAppUpdateModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
                  <span className="mr-2">📱</span>
                  Send Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email All Clients Modal */}
        {showEmailAllModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">📧</span>
                  Email All Clients
                </h3>
                <button 
                  onClick={() => setShowEmailAllModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Type
                  </label>
                  <select
                    value={emailCampaignForm.template}
                    onChange={(e) => setEmailCampaignForm({...emailCampaignForm, template: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="update">Service Update</option>
                    <option value="newsletter">Monthly Newsletter</option>
                    <option value="announcement">Important Announcement</option>
                    <option value="reminder">General Reminder</option>
                    <option value="custom">Custom Message</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={emailCampaignForm.subject}
                    onChange={(e) => setEmailCampaignForm({...emailCampaignForm, subject: e.target.value})}
                    placeholder="Enter email subject..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Content
                  </label>
                  <textarea
                    value={emailCampaignForm.message}
                    onChange={(e) => setEmailCampaignForm({...emailCampaignForm, message: e.target.value})}
                    placeholder="Type your email content here..."
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {[
                        { value: 'all', label: 'All Clients (247)', count: 247 },
                        { value: 'active', label: 'Active Services (189)', count: 189 },
                        { value: 'completed', label: 'Completed Services (156)', count: 156 }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="recipients"
                            value={option.value}
                            checked={emailCampaignForm.recipients === option.value}
                            onChange={(e) => setEmailCampaignForm({...emailCampaignForm, recipients: e.target.value})}
                            className="mr-3"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[
                        { value: 'pending', label: 'Pending Actions (34)', count: 34 },
                        { value: 'new', label: 'New Clients (12)', count: 12 },
                        { value: 'vip', label: 'VIP Clients (23)', count: 23 }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="recipients"
                            value={option.value}
                            checked={emailCampaignForm.recipients === option.value}
                            onChange={(e) => setEmailCampaignForm({...emailCampaignForm, recipients: e.target.value})}
                            className="mr-3"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">📊 Email Summary</h4>
                  <div className="text-sm text-blue-700">
                    <p><strong>Recipients:</strong> {
                      emailCampaignForm.recipients === 'all' ? '247 clients' :
                      emailCampaignForm.recipients === 'active' ? '189 active clients' :
                      emailCampaignForm.recipients === 'completed' ? '156 completed clients' :
                      emailCampaignForm.recipients === 'pending' ? '34 pending clients' :
                      emailCampaignForm.recipients === 'new' ? '12 new clients' :
                      emailCampaignForm.recipients === 'vip' ? '23 VIP clients' : '0 clients'
                    }</p>
                    <p><strong>Subject:</strong> {emailCampaignForm.subject || 'No subject set'}</p>
                    <p><strong>Type:</strong> {emailCampaignForm.template.replace('_', ' ').charAt(0).toUpperCase() + emailCampaignForm.template.slice(1)}</p>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowEmailAllModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                  👁️ Preview Email
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center">
                  <span className="mr-2">📧</span>
                  Send Email
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SMS Reminders Modal */}
        {showSMSReminderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">📲</span>
                  SMS Reminders
                </h3>
                <button 
                  onClick={() => setShowSMSReminderModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Type
                  </label>
                  <select
                    value={smsReminderForm.reminderType}
                    onChange={(e) => setSmsReminderForm({...smsReminderForm, reminderType: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="document_submission">Document Submission Required</option>
                    <option value="payment_due">Payment Due Reminder</option>
                    <option value="appointment">Appointment Reminder</option>
                    <option value="service_update">Service Status Update</option>
                    <option value="custom">Custom Reminder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <select
                    value={smsReminderForm.recipients}
                    onChange={(e) => setSmsReminderForm({...smsReminderForm, recipients: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="pending">Clients with Pending Actions (34)</option>
                    <option value="overdue">Overdue Clients (12)</option>
                    <option value="payment_due">Payment Due (8)</option>
                    <option value="document_pending">Document Pending (26)</option>
                    <option value="all_active">All Active Clients (189)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Templates
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {[
                      'Reminder: Please submit your pending documents for faster processing.',
                      'Your payment is due. Please complete it to continue your service.',
                      'Appointment confirmation: Your consultation is scheduled for tomorrow.',
                      'Service update: Your application is now under review.',
                      'Action required: Please check your email for important updates.'
                    ].map((template, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSmsReminderForm({...smsReminderForm, customMessage: template})}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border text-sm"
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message
                  </label>
                  <textarea
                    value={smsReminderForm.customMessage}
                    onChange={(e) => setSmsReminderForm({...smsReminderForm, customMessage: e.target.value})}
                    placeholder="Type your custom SMS message..."
                    rows={3}
                    maxLength={160}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {smsReminderForm.customMessage.length}/160 characters
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-2">📊 SMS Summary</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p><strong>Type:</strong> {smsReminderForm.reminderType.replace('_', ' ').charAt(0).toUpperCase() + smsReminderForm.reminderType.slice(1)}</p>
                    <p><strong>Recipients:</strong> {
                      smsReminderForm.recipients === 'pending' ? '34 clients with pending actions' :
                      smsReminderForm.recipients === 'overdue' ? '12 overdue clients' :
                      smsReminderForm.recipients === 'payment_due' ? '8 clients with payment due' :
                      smsReminderForm.recipients === 'document_pending' ? '26 clients with document pending' :
                      '189 active clients'
                    }</p>
                    <p><strong>Message length:</strong> {smsReminderForm.customMessage.length} characters</p>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowSMSReminderModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center">
                  <span className="mr-2">📲</span>
                  Send SMS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Push Notifications Modal */}
        {showPushNotificationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">🔔</span>
                  Push Notifications
                </h3>
                <button 
                  onClick={() => setShowPushNotificationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Title
                  </label>
                  <input
                    type="text"
                    value={pushNotificationForm.title}
                    onChange={(e) => setPushNotificationForm({...pushNotificationForm, title: e.target.value})}
                    placeholder="Enter notification title..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={pushNotificationForm.message}
                    onChange={(e) => setPushNotificationForm({...pushNotificationForm, message: e.target.value})}
                    placeholder="Enter notification message..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={pushNotificationForm.priority}
                      onChange={(e) => setPushNotificationForm({...pushNotificationForm, priority: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipients
                    </label>
                    <select
                      value={pushNotificationForm.recipients}
                      onChange={(e) => setPushNotificationForm({...pushNotificationForm, recipients: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="all">All Clients (247)</option>
                      <option value="active">Active Clients (189)</option>
                      <option value="pending">Pending Actions (34)</option>
                      <option value="mobile_users">Mobile App Users (156)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={pushNotificationForm.actionUrl}
                    onChange={(e) => setPushNotificationForm({...pushNotificationForm, actionUrl: e.target.value})}
                    placeholder="https://example.com/action"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL to open when notification is tapped
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Templates
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {[
                      { title: 'Service Update', message: 'Your service status has been updated. Check the latest progress!' },
                      { title: 'Document Required', message: 'Please submit required documents to continue processing.' },
                      { title: 'Payment Reminder', message: 'Payment due soon. Complete it to avoid delays.' },
                      { title: 'Congratulations!', message: 'Your application has been approved!' }
                    ].map((template, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setPushNotificationForm({
                          ...pushNotificationForm, 
                          title: template.title,
                          message: template.message
                        })}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border"
                      >
                        <div className="font-medium text-sm">{template.title}</div>
                        <div className="text-xs text-gray-600">{template.message}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-medium text-orange-800 mb-2">🔔 Preview</h4>
                  <div className="bg-white border rounded-lg p-3 shadow-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                        E
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{pushNotificationForm.title || 'Notification Title'}</div>
                        <div className="text-xs text-gray-600">{pushNotificationForm.message || 'Notification message will appear here'}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        pushNotificationForm.priority === 'high' || pushNotificationForm.priority === 'urgent' ? 'bg-red-500' :
                        pushNotificationForm.priority === 'normal' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowPushNotificationModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 flex items-center">
                  <span className="mr-2">🔔</span>
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Message Generator Modal */}
        {showAIMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">🤖</span>
                  AI Message Generator
                </h3>
                <button 
                  onClick={() => setShowAIMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message Type
                    </label>
                    <select
                      value={aiMessageForm.messageType}
                      onChange={(e) => setAiMessageForm({...aiMessageForm, messageType: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="update">Service Update</option>
                      <option value="reminder">Gentle Reminder</option>
                      <option value="follow-up">Follow-up Message</option>
                      <option value="upsell">Service Recommendation</option>
                      <option value="congratulation">Congratulations</option>
                      <option value="apology">Apology/Issue Resolution</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tone
                    </label>
                    <select
                      value={aiMessageForm.tone}
                      onChange={(e) => setAiMessageForm({...aiMessageForm, tone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="formal">Formal</option>
                      <option value="urgent">Urgent</option>
                      <option value="supportive">Supportive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Context (Optional)
                  </label>
                  <textarea
                    value={aiMessageForm.clientContext}
                    onChange={(e) => setAiMessageForm({...aiMessageForm, clientContext: e.target.value})}
                    placeholder="Provide context about the client or situation (e.g., 'Client submitted documents yesterday, waiting for review')"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      value={aiMessageForm.language}
                      onChange={(e) => setAiMessageForm({...aiMessageForm, language: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={aiMessageForm.includePersonalization}
                        onChange={(e) => setAiMessageForm({...aiMessageForm, includePersonalization: e.target.checked})}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">Include personalization</span>
                    </label>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-3">🧠 Generated Message Preview</h4>
                  <div className="bg-white border rounded-lg p-4 text-sm">
                    {aiMessageForm.messageType === 'update' && aiMessageForm.tone === 'professional' ? (
                      <p>Dear [Client Name],<br/><br/>
                      I hope this message finds you well. I wanted to provide you with an update regarding your {aiMessageForm.clientContext || 'service application'}.<br/><br/>
                      {aiMessageForm.clientContext ? 'Based on the information provided, we are currently processing your request and expect to have an update within 2-3 business days.' : 'We are making good progress on your application and will keep you informed of any developments.'}<br/><br/>
                      Please don't hesitate to reach out if you have any questions.<br/><br/>
                      Best regards,<br/>
                      eLab Solutions Team</p>
                    ) : aiMessageForm.messageType === 'reminder' && aiMessageForm.tone === 'friendly' ? (
                      <p>Hi [Client Name]! 👋<br/><br/>
                      Hope you're doing well! Just a friendly reminder about {aiMessageForm.clientContext || 'your pending documents'}.<br/><br/>
                      No rush, but when you get a chance, it would be great to get this sorted so we can keep things moving smoothly.<br/><br/>
                      Let me know if you need any help!<br/><br/>
                      Cheers,<br/>
                      Your eLab Team</p>
                    ) : (
                      <p className="text-gray-500 italic">
                        AI will generate a {aiMessageForm.tone} {aiMessageForm.messageType} message based on your inputs. Click "Generate Message" to see the result.
                      </p>
                    )}
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowAIMessageModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  🔄 Regenerate
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  📋 Copy Message
                </button>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center">
                  <span className="mr-2">🤖</span>
                  Generate Message
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedConversation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">{selectedConversation.avatar}</span>
                  Reply to {selectedConversation.client}
                </h3>
                <button 
                  onClick={() => setShowReplyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Original Message */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{selectedConversation.client}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedConversation.channel === 'WhatsApp' ? 'bg-green-100 text-green-800' :
                      selectedConversation.channel === 'Email' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {selectedConversation.channel}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{selectedConversation.time}</span>
                </div>
                <p className="text-sm text-gray-700">{selectedConversation.message}</p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reply via
                  </label>
                  <select
                    value={replyForm.channel}
                    onChange={(e) => setReplyForm({...replyForm, channel: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Reply
                  </label>
                  <textarea
                    value={replyForm.message}
                    onChange={(e) => setReplyForm({...replyForm, message: e.target.value})}
                    placeholder={`Type your ${replyForm.channel} reply to ${selectedConversation.client}...`}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {replyForm.channel === 'sms' ? `${replyForm.message.length}/160 characters` : `${replyForm.message.length} characters`}
                  </p>
                </div>

                {/* Quick Reply Templates */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Templates
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      'Thank you for your message. I will get back to you shortly.',
                      'Your documents have been received and are being reviewed.',
                      'Great news! Your application has been processed successfully.',
                      'Please provide the additional documents as discussed.',
                      'Your service is progressing well. Next update in 2-3 days.',
                      'I understand your concern. Let me check and get back to you.'
                    ].map((template, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setReplyForm({...replyForm, message: template})}
                        className="text-left p-2 bg-gray-50 hover:bg-gray-100 rounded border text-xs"
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="attachFile"
                    checked={replyForm.attachFile}
                    onChange={(e) => setReplyForm({...replyForm, attachFile: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="attachFile" className="text-sm text-gray-700">
                    Attach file or document
                  </label>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">📋 Reply Preview</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>To:</strong> {selectedConversation.client}</p>
                    <p><strong>Via:</strong> {replyForm.channel.charAt(0).toUpperCase() + replyForm.channel.slice(1)}</p>
                    <p><strong>Message length:</strong> {replyForm.message.length} characters</p>
                    {replyForm.attachFile && <p><strong>Attachment:</strong> File will be attached</p>}
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowReplyModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    handleMarkAsRead(selectedConversation.id);
                    setShowReplyModal(false);
                  }}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Mark as Read
                </button>
                <button 
                  onClick={handleSendReply}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <span className="mr-2">📤</span>
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Generate Monthly Report Modal */}
        {showMonthlyReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">📋</span>
                  Generate Monthly Report
                </h3>
                <button 
                  onClick={() => setShowMonthlyReportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Type
                    </label>
                    <select
                      value={monthlyReportForm.reportType}
                      onChange={(e) => setMonthlyReportForm({...monthlyReportForm, reportType: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="comprehensive">Comprehensive Report</option>
                      <option value="revenue">Revenue Focus</option>
                      <option value="client">Client Analytics</option>
                      <option value="performance">Performance Metrics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Range
                    </label>
                    <select
                      value={monthlyReportForm.dateRange}
                      onChange={(e) => setMonthlyReportForm({...monthlyReportForm, dateRange: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="current_month">Current Month</option>
                      <option value="last_month">Last Month</option>
                      <option value="last_3_months">Last 3 Months</option>
                      <option value="ytd">Year to Date</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Output Format
                  </label>
                  <select
                    value={monthlyReportForm.format}
                    onChange={(e) => setMonthlyReportForm({...monthlyReportForm, format: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="excel">Excel Spreadsheet</option>
                    <option value="powerpoint">PowerPoint Presentation</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Include Options
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={monthlyReportForm.includeCharts}
                        onChange={(e) => setMonthlyReportForm({...monthlyReportForm, includeCharts: e.target.checked})}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">Include Charts & Graphs</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={monthlyReportForm.includeRecommendations}
                        onChange={(e) => setMonthlyReportForm({...monthlyReportForm, includeRecommendations: e.target.checked})}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">Include AI Recommendations</span>
                    </label>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h4 className="font-medium text-indigo-800 mb-2">📊 Report Preview</h4>
                  <div className="text-sm text-indigo-700 space-y-1">
                    <p><strong>Type:</strong> {monthlyReportForm.reportType.replace('_', ' ').charAt(0).toUpperCase() + monthlyReportForm.reportType.slice(1)}</p>
                    <p><strong>Period:</strong> {monthlyReportForm.dateRange.replace('_', ' ').charAt(0).toUpperCase() + monthlyReportForm.dateRange.slice(1)}</p>
                    <p><strong>Format:</strong> {monthlyReportForm.format.toUpperCase()}</p>
                    <p><strong>Features:</strong> {[
                      monthlyReportForm.includeCharts && 'Charts', 
                      monthlyReportForm.includeRecommendations && 'AI Insights'
                    ].filter(Boolean).join(', ') || 'Basic report'}</p>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowMonthlyReportModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                  👁️ Preview
                </button>
                <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center">
                  <span className="mr-2">📋</span>
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Export All Data Modal */}
        {showExportDataModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">💾</span>
                  Export All Data
                </h3>
                <button 
                  onClick={() => setShowExportDataModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Type
                    </label>
                    <select
                      value={exportDataForm.dataType}
                      onChange={(e) => setExportDataForm({...exportDataForm, dataType: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">All Data</option>
                      <option value="clients">Client Information</option>
                      <option value="services">Service Records</option>
                      <option value="revenue">Revenue & Payments</option>
                      <option value="communications">Communication History</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Export Format
                    </label>
                    <select
                      value={exportDataForm.format}
                      onChange={(e) => setExportDataForm({...exportDataForm, format: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="excel">Excel (.xlsx)</option>
                      <option value="csv">CSV (.csv)</option>
                      <option value="json">JSON (.json)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select
                    value={exportDataForm.dateRange}
                    onChange={(e) => setExportDataForm({...exportDataForm, dateRange: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all_time">All Time</option>
                    <option value="this_year">This Year</option>
                    <option value="last_6_months">Last 6 Months</option>
                    <option value="last_3_months">Last 3 Months</option>
                    <option value="this_month">This Month</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="includeArchived"
                    checked={exportDataForm.includeArchived}
                    onChange={(e) => setExportDataForm({...exportDataForm, includeArchived: e.target.checked})}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="includeArchived" className="text-sm text-gray-700">
                    Include archived records
                  </label>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">📊 Export Summary</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p><strong>Data:</strong> {exportDataForm.dataType === 'all' ? 'All system data' : exportDataForm.dataType.charAt(0).toUpperCase() + exportDataForm.dataType.slice(1)}</p>
                    <p><strong>Format:</strong> {exportDataForm.format.toUpperCase()}</p>
                    <p><strong>Period:</strong> {exportDataForm.dateRange.replace('_', ' ').charAt(0).toUpperCase() + exportDataForm.dateRange.slice(1)}</p>
                    <p><strong>Estimated size:</strong> {exportDataForm.dataType === 'all' ? '15-25 MB' : '2-8 MB'}</p>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowExportDataModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
                  <span className="mr-2">💾</span>
                  Export Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Report to Team Modal */}
        {showEmailReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">📧</span>
                  Email Report to Team
                </h3>
                <button 
                  onClick={() => setShowEmailReportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipients
                    </label>
                    <select
                      value={emailReportForm.recipients}
                      onChange={(e) => setEmailReportForm({...emailReportForm, recipients: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="team">All Team Members</option>
                      <option value="management">Management Only</option>
                      <option value="custom">Custom Recipients</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Type
                    </label>
                    <select
                      value={emailReportForm.reportType}
                      onChange={(e) => setEmailReportForm({...emailReportForm, reportType: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="monthly_summary">Monthly Summary</option>
                      <option value="performance_metrics">Performance Metrics</option>
                      <option value="revenue_report">Revenue Report</option>
                      <option value="client_insights">Client Insights</option>
                    </select>
                  </div>
                </div>

                {emailReportForm.recipients === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Email Addresses
                    </label>
                    <textarea
                      value={emailReportForm.customEmails}
                      onChange={(e) => setEmailReportForm({...emailReportForm, customEmails: e.target.value})}
                      placeholder="Enter email addresses separated by commas..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Schedule
                  </label>
                  <select
                    value={emailReportForm.schedule}
                    onChange={(e) => setEmailReportForm({...emailReportForm, schedule: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="now">Send Now</option>
                    <option value="weekly">Weekly Schedule</option>
                    <option value="monthly">Monthly Schedule</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="includeAttachments"
                    checked={emailReportForm.includeAttachments}
                    onChange={(e) => setEmailReportForm({...emailReportForm, includeAttachments: e.target.checked})}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="includeAttachments" className="text-sm text-gray-700">
                    Include detailed attachments (Excel/PDF)
                  </label>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-2">📧 Email Preview</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p><strong>To:</strong> {
                      emailReportForm.recipients === 'team' ? 'All team members (8)' :
                      emailReportForm.recipients === 'management' ? 'Management team (3)' :
                      emailReportForm.customEmails ? emailReportForm.customEmails.split(',').length + ' custom recipients' : '0 recipients'
                    }</p>
                    <p><strong>Subject:</strong> Monthly Team Report - {new Date().toLocaleDateString()}</p>
                    <p><strong>Report:</strong> {emailReportForm.reportType.replace('_', ' ').charAt(0).toUpperCase() + emailReportForm.reportType.slice(1)}</p>
                    <p><strong>Schedule:</strong> {emailReportForm.schedule === 'now' ? 'Send immediately' : emailReportForm.schedule.charAt(0).toUpperCase() + emailReportForm.schedule.slice(1) + ' delivery'}</p>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowEmailReportModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                  👁️ Preview Email
                </button>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center">
                  <span className="mr-2">📧</span>
                  Send Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Predictive Analysis Modal */}
        {showPredictiveAnalysisModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">🔮</span>
                  Predictive Analysis
                </h3>
                <button 
                  onClick={() => setShowPredictiveAnalysisModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Analysis Type
                    </label>
                    <select
                      value={predictiveAnalysisForm.analysisType}
                      onChange={(e) => setPredictiveAnalysisForm({...predictiveAnalysisForm, analysisType: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="revenue">Revenue Forecasting</option>
                      <option value="client_behavior">Client Behavior Analysis</option>
                      <option value="service_demand">Service Demand Prediction</option>
                      <option value="workflow_efficiency">Workflow Efficiency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Forecast Timeframe
                    </label>
                    <select
                      value={predictiveAnalysisForm.timeframe}
                      onChange={(e) => setPredictiveAnalysisForm({...predictiveAnalysisForm, timeframe: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1_month">Next Month</option>
                      <option value="3_months">Next 3 Months</option>
                      <option value="6_months">Next 6 Months</option>
                      <option value="1_year">Next Year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confidence Level
                  </label>
                  <select
                    value={predictiveAnalysisForm.confidenceLevel}
                    onChange={(e) => setPredictiveAnalysisForm({...predictiveAnalysisForm, confidenceLevel: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Conservative (80% confidence)</option>
                    <option value="standard">Standard (90% confidence)</option>
                    <option value="high">Aggressive (95% confidence)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="includeRecommendations"
                    checked={predictiveAnalysisForm.includeRecommendations}
                    onChange={(e) => setPredictiveAnalysisForm({...predictiveAnalysisForm, includeRecommendations: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="includeRecommendations" className="text-sm text-gray-700">
                    Include AI-powered recommendations
                  </label>
                </div>

                {/* Analysis Preview */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-3">🔮 Analysis Preview</h4>
                  <div className="space-y-3">
                    {predictiveAnalysisForm.analysisType === 'revenue' && (
                      <div className="bg-white border rounded-lg p-3">
                        <h5 className="font-medium text-sm mb-2">Revenue Forecast</h5>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="font-semibold">Current: $14.8K</div>
                            <div className="text-gray-600">This month</div>
                          </div>
                          <div>
                            <div className="font-semibold text-green-600">Predicted: $18.2K</div>
                            <div className="text-gray-600">Next month</div>
                          </div>
                          <div>
                            <div className="font-semibold text-blue-600">Growth: +23%</div>
                            <div className="text-gray-600">Projected increase</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {predictiveAnalysisForm.analysisType === 'client_behavior' && (
                      <div className="bg-white border rounded-lg p-3">
                        <h5 className="font-medium text-sm mb-2">Client Behavior Insights</h5>
                        <div className="text-xs space-y-1">
                          <div>• 78% likely to upgrade services within 3 months</div>
                          <div>• Peak inquiry time: Tuesday 2-4 PM</div>
                          <div>• 34% prefer WhatsApp communication</div>
                        </div>
                      </div>
                    )}

                    <div className="text-sm text-blue-700">
                      <p><strong>Analysis:</strong> {predictiveAnalysisForm.analysisType.replace('_', ' ').charAt(0).toUpperCase() + predictiveAnalysisForm.analysisType.slice(1)}</p>
                      <p><strong>Period:</strong> {predictiveAnalysisForm.timeframe.replace('_', ' ').charAt(0).toUpperCase() + predictiveAnalysisForm.timeframe.slice(1)}</p>
                      <p><strong>Accuracy:</strong> {predictiveAnalysisForm.confidenceLevel.charAt(0).toUpperCase() + predictiveAnalysisForm.confidenceLevel.slice(1)} confidence level</p>
                    </div>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowPredictiveAnalysisModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                  📊 View Sample
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  📋 Save Report
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center">
                  <span className="mr-2">🔮</span>
                  Run Analysis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create New Workflow Modal */}
        {showCreateWorkflowModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">⚙️</span>
                  Create New Workflow
                </h3>
                <button 
                  onClick={() => setShowCreateWorkflowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workflow Name
                  </label>
                  <input
                    type="text"
                    value={createWorkflowForm.name}
                    onChange={(e) => setCreateWorkflowForm({...createWorkflowForm, name: e.target.value})}
                    placeholder="Enter workflow name..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trigger Event
                    </label>
                    <select
                      value={createWorkflowForm.trigger}
                      onChange={(e) => setCreateWorkflowForm({...createWorkflowForm, trigger: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="document_pending">Documents Pending</option>
                      <option value="payment_overdue">Payment Overdue</option>
                      <option value="service_completion">Service Completion</option>
                      <option value="client_inactivity">Client Inactivity</option>
                      <option value="deadline_approaching">Deadline Approaching</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Action to Take
                    </label>
                    <select
                      value={createWorkflowForm.action}
                      onChange={(e) => setCreateWorkflowForm({...createWorkflowForm, action: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="send_reminder">Send Reminder</option>
                      <option value="send_email">Send Email</option>
                      <option value="create_task">Create Task</option>
                      <option value="update_status">Update Status</option>
                      <option value="notify_team">Notify Team</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition (Optional)
                  </label>
                  <textarea
                    value={createWorkflowForm.condition}
                    onChange={(e) => setCreateWorkflowForm({...createWorkflowForm, condition: e.target.value})}
                    placeholder="Specify additional conditions (e.g., 'After 3 days', 'If client tier = Premium')"
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Communication Channels
                    </label>
                    <div className="space-y-2">
                      {['email', 'whatsapp', 'sms', 'push'].map((channel) => (
                        <label key={channel} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={createWorkflowForm.channels.includes(channel)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCreateWorkflowForm({
                                  ...createWorkflowForm, 
                                  channels: [...createWorkflowForm.channels, channel]
                                });
                              } else {
                                setCreateWorkflowForm({
                                  ...createWorkflowForm, 
                                  channels: createWorkflowForm.channels.filter(c => c !== channel)
                                });
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                          />
                          <span className="text-sm text-gray-700 capitalize">{channel}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule
                    </label>
                    <select
                      value={createWorkflowForm.schedule}
                      onChange={(e) => setCreateWorkflowForm({...createWorkflowForm, schedule: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="immediate">Execute Immediately</option>
                      <option value="daily">Daily Check</option>
                      <option value="weekly">Weekly Check</option>
                    </select>
                  </div>
                </div>

                {/* Workflow Preview */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-3">⚙️ Workflow Summary</h4>
                  <div className="bg-white border rounded-lg p-3 text-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">When:</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                        {createWorkflowForm.trigger.replace('_', ' ').charAt(0).toUpperCase() + createWorkflowForm.trigger.slice(1)}
                      </span>
                    </div>
                    {createWorkflowForm.condition && (
                      <div className="flex items-start space-x-2 mb-2">
                        <span className="font-semibold">If:</span>
                        <span className="text-gray-700">{createWorkflowForm.condition}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">Then:</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {createWorkflowForm.action.replace('_', ' ').charAt(0).toUpperCase() + createWorkflowForm.action.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Via:</span>
                      <div className="space-x-1">
                        {createWorkflowForm.channels.map(channel => (
                          <span key={channel} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {channel.charAt(0).toUpperCase() + channel.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowCreateWorkflowModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                  🧪 Test Workflow
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  📋 Save Draft
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center">
                  <span className="mr-2">⚙️</span>
                  Create Workflow
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View All Recommendations Modal */}
        {showAllRecommendationsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">💡</span>
                  AI Recommendations Center
                </h3>
                <button 
                  onClick={() => setShowAllRecommendationsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Smart Recommendations */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="font-semibold text-purple-900 mb-4 flex items-center">
                    <span className="mr-2">🎯</span>
                    Revenue Opportunities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        client: 'Dr. Ahmed Al-Rashid',
                        recommendation: 'Add CGFNS service (+$950 revenue)',
                        confidence: 92,
                        reason: 'Client profile matches 94% of successful CGFNS applicants',
                        action: 'Send Proposal',
                        priority: 'high'
                      },
                      {
                        client: 'Dr. Aisha Mahmoud',
                        recommendation: 'Upsell Job Placement (+$2500 revenue)',
                        confidence: 87,
                        reason: 'Service completion rate suggests high success probability',
                        action: 'Schedule Call',
                        priority: 'high'
                      },
                      {
                        client: 'Maria Santos',
                        recommendation: 'Suggest English Training (+$299 revenue)',
                        confidence: 76,
                        reason: 'Language assessment indicates improvement needed',
                        action: 'Send Information',
                        priority: 'medium'
                      },
                      {
                        client: 'Dr. Priya Sharma',
                        recommendation: 'Add State License Support (+$799 revenue)',
                        confidence: 89,
                        reason: 'Recently completed federal requirements',
                        action: 'Contact Now',
                        priority: 'high'
                      }
                    ].map((rec, index) => (
                      <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{rec.client}</h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                            rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-green-600 mb-1">{rec.recommendation}</p>
                        <p className="text-xs text-gray-600 mb-2">{rec.reason}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-gray-500">Confidence:</div>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${rec.confidence}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{rec.confidence}%</span>
                          </div>
                          <button className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700">
                            {rec.action}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Alerts */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-semibold text-red-900 mb-4 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Risk Alerts & Issues
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        client: 'Dr. Mohammad Hassan',
                        issue: 'Service on hold for 5+ days',
                        risk: 'Client dissatisfaction risk',
                        severity: 'high',
                        action: 'Immediate Contact Required',
                        daysOverdue: 5
                      },
                      {
                        client: 'Ahmed Khalil',
                        issue: 'Payment overdue by 7 days',
                        risk: 'Revenue loss potential',
                        severity: 'medium',
                        action: 'Send Payment Reminder',
                        daysOverdue: 7
                      },
                      {
                        client: 'Dr. Fatima Al-Zahra',
                        issue: 'Document expiry in 3 days',
                        risk: 'Service delay potential',
                        severity: 'medium',
                        action: 'Request Renewal',
                        daysOverdue: 0
                      }
                    ].map((alert, index) => (
                      <div key={index} className="bg-white border-l-4 border-red-400 p-4 rounded-r-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{alert.client}</h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                            alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Risk
                          </span>
                        </div>
                        <p className="text-sm font-medium text-red-600 mb-1">{alert.issue}</p>
                        <p className="text-xs text-gray-600 mb-2">{alert.risk}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {alert.daysOverdue > 0 ? `${alert.daysOverdue} days overdue` : 'Expires soon'}
                          </span>
                          <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                            {alert.action}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Predictive Insights */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                    <span className="mr-2">🔮</span>
                    Predictive Insights
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-2">Revenue Forecast</h5>
                      <div className="text-2xl font-bold text-blue-600 mb-1">$18,200</div>
                      <div className="text-sm text-green-600 mb-2">+23% next month</div>
                      <p className="text-xs text-gray-600">Based on current pipeline and historical patterns</p>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-2">Service Completions</h5>
                      <div className="text-2xl font-bold text-blue-600 mb-1">8 services</div>
                      <div className="text-sm text-green-600 mb-2">Expected this week</div>
                      <p className="text-xs text-gray-600">3 services likely to complete by Friday</p>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-2">Best Contact Time</h5>
                      <div className="text-lg font-bold text-blue-600 mb-1">Tue-Thu 2-5PM</div>
                      <div className="text-sm text-green-600 mb-2">89% response rate</div>
                      <p className="text-xs text-gray-600">Optimal time for client communications</p>
                    </div>
                  </div>
                </div>

                {/* Action Summary */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">📋 Recommended Actions Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Immediate Actions (Next 24h)</h5>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• Contact Dr. Mohammad Hassan (service hold issue)</li>
                        <li>• Send payment reminder to Ahmed Khalil</li>
                        <li>• Propose CGFNS to Dr. Ahmed Al-Rashid</li>
                        <li>• Schedule upsell call with Dr. Aisha Mahmoud</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">This Week</h5>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li>• Request document renewal from Dr. Fatima</li>
                        <li>• Send English training info to Maria Santos</li>
                        <li>• Follow up on 3 completing services</li>
                        <li>• Prepare for 8 expected completions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowAllRecommendationsModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  🎯 Execute All High Priority
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  📧 Email Summary to Team
                </button>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                  ⚙️ Configure AI Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Configure AI Settings Modal */}
        {showAISettingsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">🤖</span>
                  AI Configuration Center
                </h3>
                <button 
                  onClick={() => setShowAISettingsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-6">
                {/* AI Features Toggle */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-4">🎛️ AI Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'enableAutoRecommendations', label: 'Auto Recommendations', desc: 'AI-powered client suggestions' },
                      { key: 'enableRiskAlerts', label: 'Risk Alerts', desc: 'Proactive issue detection' },
                      { key: 'enablePredictiveInsights', label: 'Predictive Insights', desc: 'Forecasting & analytics' }
                    ].map((feature) => (
                      <div key={feature.key} className="bg-white border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{feature.label}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={aiSettingsForm[feature.key]}
                              onChange={(e) => setAiSettingsForm({
                                ...aiSettingsForm,
                                [feature.key]: e.target.checked
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <p className="text-xs text-gray-600">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recommendation Frequency
                    </label>
                    <select
                      value={aiSettingsForm.recommendationFrequency}
                      onChange={(e) => setAiSettingsForm({...aiSettingsForm, recommendationFrequency: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="real_time">Real-time</option>
                      <option value="daily">Daily Summary</option>
                      <option value="weekly">Weekly Report</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Alert Sensitivity
                    </label>
                    <select
                      value={aiSettingsForm.riskAlertSensitivity}
                      onChange={(e) => setAiSettingsForm({...aiSettingsForm, riskAlertSensitivity: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="low">Low (Major issues only)</option>
                      <option value="medium">Medium (Balanced)</option>
                      <option value="high">High (All potential issues)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prediction Confidence
                    </label>
                    <select
                      value={aiSettingsForm.predictionConfidence}
                      onChange={(e) => setAiSettingsForm({...aiSettingsForm, predictionConfidence: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="conservative">Conservative (80%+)</option>
                      <option value="standard">Standard (70%+)</option>
                      <option value="aggressive">Aggressive (60%+)</option>
                    </select>
                  </div>
                </div>

                {/* Custom AI Prompts */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-4">✍️ Custom AI Prompts</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client Follow-up Prompts
                      </label>
                      <textarea
                        value={aiSettingsForm.customPrompts.clientFollowUp}
                        onChange={(e) => setAiSettingsForm({
                          ...aiSettingsForm,
                          customPrompts: {
                            ...aiSettingsForm.customPrompts,
                            clientFollowUp: e.target.value
                          }
                        })}
                        placeholder="Custom instructions for AI when generating follow-up recommendations..."
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Recommendation Logic
                      </label>
                      <textarea
                        value={aiSettingsForm.customPrompts.serviceRecommendations}
                        onChange={(e) => setAiSettingsForm({
                          ...aiSettingsForm,
                          customPrompts: {
                            ...aiSettingsForm.customPrompts,
                            serviceRecommendations: e.target.value
                          }
                        })}
                        placeholder="Custom criteria for AI service recommendations..."
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Integration Settings */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-4">🔗 AI Integrations</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(aiSettingsForm.integrations).map(([key, value]) => (
                      <div key={key} className="bg-white border rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{key}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setAiSettingsForm({
                                ...aiSettingsForm,
                                integrations: {
                                  ...aiSettingsForm.integrations,
                                  [key]: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Performance Stats */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">📊 AI Performance Stats</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">94%</div>
                      <div className="text-xs text-gray-600">Recommendation Accuracy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">847</div>
                      <div className="text-xs text-gray-600">Insights Generated</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">$12.4K</div>
                      <div className="text-xs text-gray-600">Revenue from AI Suggestions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">23</div>
                      <div className="text-xs text-gray-600">Issues Prevented</div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowAISettingsModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">
                  🧪 Test AI Settings
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  💾 Save & Apply
                </button>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center">
                  <span className="mr-2">🤖</span>
                  Update AI Configuration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Status Modal */}
        {showUpdateStatusModal && selectedClientForUpdate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-2">📋</span>
                  Update Client Status - {selectedClientForUpdate.name}
                </h3>
                <button 
                  onClick={() => setShowUpdateStatusModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-6">
                {/* Current vs New Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Stage
                    </label>
                    <input
                      type="text"
                      value={updateStatusForm.currentStage}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Stage *
                    </label>
                    <select
                      value={updateStatusForm.newStage}
                      onChange={(e) => setUpdateStatusForm({...updateStatusForm, newStage: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select new stage...</option>
                      <option value="initial_consultation">Initial Consultation</option>
                      <option value="document_collection">Document Collection</option>
                      <option value="application_submitted">Application Submitted</option>
                      <option value="under_review">Under Review</option>
                      <option value="additional_docs_required">Additional Documents Required</option>
                      <option value="interview_scheduled">Interview Scheduled</option>
                      <option value="pending_approval">Pending Approval</option>
                      <option value="approved">Approved</option>
                      <option value="placement_ready">Placement Ready</option>
                      <option value="completed">Completed</option>
                      <option value="on_hold">On Hold</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Priority and Assignment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select
                      value={updateStatusForm.priority}
                      onChange={(e) => setUpdateStatusForm({...updateStatusForm, priority: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="low">🟢 Low Priority</option>
                      <option value="medium">🟡 Medium Priority</option>
                      <option value="high">🟠 High Priority</option>
                      <option value="urgent">🔴 Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assigned To
                    </label>
                    <select
                      value={updateStatusForm.assignedTo}
                      onChange={(e) => setUpdateStatusForm({...updateStatusForm, assignedTo: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="current_user">Me (Current User)</option>
                      <option value="team_lead">Team Lead</option>
                      <option value="senior_consultant">Senior Consultant</option>
                      <option value="document_specialist">Document Specialist</option>
                      <option value="compliance_team">Compliance Team</option>
                    </select>
                  </div>
                </div>

                {/* Next Step Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next Step Due Date
                  </label>
                  <input
                    type="date"
                    value={updateStatusForm.nextStepDate}
                    onChange={(e) => setUpdateStatusForm({...updateStatusForm, nextStepDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Status Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status Update Notes
                  </label>
                  <textarea
                    value={updateStatusForm.notes}
                    onChange={(e) => setUpdateStatusForm({...updateStatusForm, notes: e.target.value})}
                    placeholder="Add notes about this status update, next steps, or any important information..."
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Notification Options */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="notifyClient"
                    checked={updateStatusForm.notifyClient}
                    onChange={(e) => setUpdateStatusForm({...updateStatusForm, notifyClient: e.target.checked})}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="notifyClient" className="text-sm text-gray-700">
                    Send notification to client about this status update
                  </label>
                </div>

                {/* Status Update Preview */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-2">📋 Status Update Summary</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p><strong>Client:</strong> {selectedClientForUpdate.name}</p>
                    <p><strong>Status Change:</strong> {updateStatusForm.currentStage} → {updateStatusForm.newStage || 'Not selected'}</p>
                    <p><strong>Priority:</strong> {updateStatusForm.priority.toUpperCase()}</p>
                    <p><strong>Next Due Date:</strong> {updateStatusForm.nextStepDate || 'Not set'}</p>
                    <p><strong>Notify Client:</strong> {updateStatusForm.notifyClient ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </form>

              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowUpdateStatusModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  📋 Save as Draft
                </button>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center">
                  <span className="mr-2">✅</span>
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}