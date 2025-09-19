'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, Filter, Bell, Clock, CheckCircle, AlertCircle, 
  RefreshCw, Eye, MessageSquare, Calendar, BarChart3, TrendingUp,
  FileText, ChevronRight, ChevronDown, Download, Settings,
  Zap, Activity, Target, Award, Globe, Building
} from 'lucide-react';
import { usePipelineStore, ServicePipeline, PipelineStage, PIPELINE_CONFIGS } from '@/lib/stores/pipeline-store';

const PipelinesPage = () => {
  const {
    applicantPipelines,
    filteredPipelines,
    notifications,
    unreadNotifications,
    stats,
    selectedPipelineType,
    loading,
    error,
    lastSync,
    isConnected,
    setSelectedPipelineType,
    syncFromOdoo,
    generateMockData,
    simulatePipelineUpdate,
    markNotificationRead
  } = usePipelineStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedPipeline, setExpandedPipeline] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'pipeline' | 'kanban'>('pipeline');

  useEffect(() => {
    // Initialize with mock data for demonstration
    console.log('Initializing pipeline data...');
    const loadData = async () => {
      try {
        await generateMockData();
        console.log('Mock data generation completed');
      } catch (error) {
        console.error('Error generating mock data:', error);
      }
    };
    loadData();
  }, [generateMockData]);

  // Filter pipelines based on search and stage
  const displayPipelines = filteredPipelines.filter(pipeline => {
    const matchesSearch = !searchQuery || 
      pipeline.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pipeline.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pipeline.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = !selectedStage || pipeline.currentStage === selectedStage;
    
    return matchesSearch && matchesStage;
  });

  console.log('Pipeline Debug:', {
    totalPipelines: Object.keys(applicantPipelines).length,
    filteredPipelines: filteredPipelines.length,
    displayPipelines: displayPipelines.length,
    searchQuery,
    selectedStage,
    viewMode
  });

  const getStageColor = (stage: PipelineStage) => {
    switch (stage) {
      case PipelineStage.INQUIRY:
        return 'bg-gray-100 text-gray-800';
      case PipelineStage.DOCUMENTS_SUBMITTED:
        return 'bg-yellow-100 text-yellow-800';
      case PipelineStage.QC_PASSED:
        return 'bg-green-100 text-green-800';
      case PipelineStage.APPLICATION_SUBMITTED:
        return 'bg-blue-100 text-blue-800';
      case PipelineStage.AUTHORITY_PROCESSING:
        return 'bg-orange-100 text-orange-800';
      case PipelineStage.INSUFFICIENCY:
        return 'bg-red-100 text-red-800';
      case PipelineStage.COMPLETED:
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Add component render check
  console.log('PipelinesPage component rendering');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                className="p-3 bg-blue-500 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Activity className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Applicant Pipelines</h1>
                <p className="text-gray-600">Real-time visibility into all ELAB service pipelines</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span>{isConnected ? 'Connected to Odoo' : 'Disconnected'}</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications.length}
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Pipeline Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            No notifications
                          </div>
                        ) : (
                          notifications.slice(0, 10).map((notification) => (
                            <motion.div
                              key={notification.id}
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                                !notification.isRead ? 'bg-blue-50' : ''
                              }`}
                              onClick={() => markNotificationRead(notification.id)}
                              whileHover={{ backgroundColor: 'rgba(243, 244, 246, 1)' }}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                                  notification.priority === 'high' ? 'bg-red-500' :
                                  notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                                }`} />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {notification.applicantName} - {notification.serviceName}
                                  </p>
                                  <p className="text-sm text-gray-600">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(notification.timestamp).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sync Button */}
              <motion.button
                onClick={syncFromOdoo}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={loading ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                >
                  <RefreshCw className="h-4 w-4" />
                </motion.div>
                <span>Sync</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.keys(applicantPipelines).length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Pipelines</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.values(applicantPipelines).filter(p => 
                    p.currentStage !== PipelineStage.COMPLETED && 
                    p.currentStage !== PipelineStage.CANCELLED
                  ).length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.values(applicantPipelines).filter(p => 
                    p.currentStage === PipelineStage.COMPLETED
                  ).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Processing Time</p>
                <p className="text-2xl font-bold text-gray-900">21 days</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* View Mode and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {/* View Mode Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">View Mode:</span>
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <motion.button
                  onClick={() => setViewMode('pipeline')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'pipeline' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📊 Pipeline View
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('kanban')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'kanban' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📋 Kanban Board
                </motion.button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Pipeline Type Filter */}
            <select
              value={selectedPipelineType || ''}
              onChange={(e) => setSelectedPipelineType(e.target.value as ServicePipeline || null)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Services</option>
              {Object.entries(PIPELINE_CONFIGS).map(([key, config]) => (
                <option key={key} value={key}>{config.name}</option>
              ))}
            </select>

            {/* Stage Filter */}
            <select
              value={selectedStage || ''}
              onChange={(e) => setSelectedStage(e.target.value as PipelineStage || null)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Stages</option>
              {Object.values(PipelineStage).map((stage) => (
                <option key={stage} value={stage}>
                  {stage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            {/* Actions */}
            <div className="flex space-x-2">
              <motion.button
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Pipeline Content */}
        {viewMode === 'pipeline' && (
          <div className="space-y-6">
            {loading && (
            <div className="text-center py-12">
              <motion.div
                className="inline-block"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="h-8 w-8 text-blue-500" />
              </motion.div>
              <p className="mt-2 text-gray-600">Loading pipeline data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && displayPipelines.map((pipeline, index) => (
            <motion.div
              key={pipeline.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Pipeline Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Priority Indicator */}
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(pipeline.priority)} animate-pulse`} />
                    
                    {/* Applicant Info */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-bold text-gray-900">{pipeline.applicantName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pipeline.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          pipeline.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          pipeline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {pipeline.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{pipeline.referenceNumber}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-blue-600 font-medium">{pipeline.serviceName}</p>
                        {pipeline.assignedConsultant && (
                          <p className="text-xs text-gray-500">Consultant: {pipeline.assignedConsultant}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    {/* Current Stage Status */}
                    <div className={`px-4 py-2 rounded-lg text-sm font-bold ${getStageColor(pipeline.currentStage)}`}>
                      {pipeline.currentStage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>

                    {/* Overall Progress */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{pipeline.progressPercentage}%</p>
                      <p className="text-xs text-gray-500">Complete</p>
                      <div className="w-32 bg-gray-300 rounded-full h-3 mt-1">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full flex items-center justify-end pr-2"
                          initial={{ width: 0 }}
                          animate={{ width: `${pipeline.progressPercentage}%` }}
                          transition={{ duration: 2, delay: index * 0.2 }}
                        >
                          {pipeline.progressPercentage > 20 && (
                            <span className="text-xs text-white font-bold">{pipeline.progressPercentage}%</span>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Pipeline Visualization - Always Visible */}
              <div className="p-8">
                <PipelineVisualization pipeline={pipeline} />
              </div>

              {/* Action Panel */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Created: {new Date(pipeline.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Updated: {new Date(pipeline.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    {pipeline.estimatedCompletion && (
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4" />
                        <span>Est. Completion: {pipeline.estimatedCompletion}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={() => simulatePipelineUpdate(pipeline.applicantId)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Zap className="h-4 w-4" />
                      <span>Simulate Progress</span>
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact Client</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {!loading && displayPipelines.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pipelines found</h3>
              <p className="text-gray-600">
                {searchQuery || selectedStage || selectedPipelineType
                  ? 'Try adjusting your filters to see more results.'
                  : 'No applicant pipelines are available yet.'
                }
              </p>
            </div>
          )}
          </div>
        )}

        {/* Kanban Board View */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {[
              { 
                stage: 'New Applications', 
                stages: [PipelineStage.INQUIRY, PipelineStage.ON_HOLD],
                color: 'border-gray-200 bg-gray-50',
                textColor: 'text-gray-700'
              },
              { 
                stage: 'Document Review', 
                stages: [PipelineStage.DOCUMENTS_SUBMITTED, PipelineStage.QC_PASSED],
                color: 'border-blue-200 bg-blue-50',
                textColor: 'text-blue-700'
              },
              { 
                stage: 'Processing', 
                stages: [PipelineStage.APPLICATION_SUBMITTED, PipelineStage.AUTHORITY_PROCESSING, PipelineStage.EXAM_SCHEDULED, PipelineStage.INTERVIEW_SCHEDULED],
                color: 'border-orange-200 bg-orange-50',
                textColor: 'text-orange-700'
              },
              { 
                stage: 'Action Required', 
                stages: [PipelineStage.INSUFFICIENCY, PipelineStage.ADDITIONAL_DOCS_REQUIRED],
                color: 'border-red-200 bg-red-50',
                textColor: 'text-red-700'
              },
              { 
                stage: 'Completed', 
                stages: [PipelineStage.COMPLETED, PipelineStage.RESULTS_RECEIVED],
                color: 'border-green-200 bg-green-50',
                textColor: 'text-green-700'
              }
            ].map((column, columnIndex) => {
              const columnPipelines = displayPipelines.filter(pipeline => 
                column.stages.includes(pipeline.currentStage)
              );
              
              return (
                <div key={column.stage} className={`rounded-lg border-2 ${column.color} p-4 min-h-96`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-bold ${column.textColor}`}>
                      {column.stage}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${column.color} border ${column.textColor}`}>
                      {columnPipelines.length}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {columnPipelines.map((pipeline, index) => (
                      <motion.div
                        key={pipeline.id}
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: columnIndex * 0.1 + index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        drag="x"
                        dragConstraints={{ left: -20, right: 20 }}
                        dragElastic={0.2}
                      >
                        {/* Priority Indicator */}
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(pipeline.priority)} animate-pulse`} />
                          <span className="text-xs text-gray-500 font-medium">
                            {pipeline.progressPercentage}%
                          </span>
                        </div>
                        
                        {/* Applicant Info */}
                        <div className="mb-3">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">
                            {pipeline.applicantName}
                          </h4>
                          <p className="text-xs text-gray-600 mb-1">{pipeline.referenceNumber}</p>
                          <p className="text-xs text-blue-600 font-medium">{pipeline.serviceName}</p>
                        </div>

                        {/* Current Stage */}
                        <div className={`px-2 py-1 rounded text-xs font-medium mb-3 ${getStageColor(pipeline.currentStage)}`}>
                          {pipeline.currentStage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-green-500 h-1 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${pipeline.progressPercentage}%` }}
                              transition={{ duration: 1, delay: columnIndex * 0.1 + index * 0.1 }}
                            />
                          </div>
                        </div>

                        {/* Meta Information */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(pipeline.lastUpdated).toLocaleDateString()}</span>
                          </div>
                          {pipeline.assignedConsultant && (
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span className="truncate max-w-20">
                                {pipeline.assignedConsultant.split(' ')[0]}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              simulatePipelineUpdate(pipeline.applicantId);
                            }}
                            className="flex-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-xs font-medium transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Zap className="h-3 w-3 inline mr-1" />
                            Next
                          </motion.button>
                          <motion.button
                            className="flex-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Eye className="h-3 w-3 inline mr-1" />
                            View
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Empty State for Column */}
                    {columnPipelines.length === 0 && (
                      <div className="text-center py-8">
                        <div className={`w-12 h-12 rounded-full ${column.color} border-2 border-dashed mx-auto mb-2 flex items-center justify-center`}>
                          <FileText className={`h-5 w-5 ${column.textColor} opacity-50`} />
                        </div>
                        <p className={`text-xs ${column.textColor} opacity-60`}>
                          No applications in this stage
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Global Empty State */}
        {!loading && displayPipelines.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pipelines found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedStage || selectedPipelineType
                ? 'Try adjusting your filters to see more results.'
                : 'No applicant pipelines are available yet.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Pipeline Visualization Component
const PipelineVisualization = ({ pipeline }: { pipeline: any }) => {
  const config = PIPELINE_CONFIGS[pipeline.pipelineType];
  if (!config) return null;

  return (
    <div className="relative">
      <div className="flex items-center space-x-4 overflow-x-auto pb-4">
        {config.stages.map((stageInfo, index) => {
          const isCompleted = index < pipeline.currentStageNumber - 1;
          const isCurrent = index === pipeline.currentStageNumber - 1;
          const isUpcoming = index > pipeline.currentStageNumber - 1;

          return (
            <div key={stageInfo.stage} className="flex items-center space-x-4 flex-shrink-0">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isCurrent ? 'bg-blue-500 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>
                <p className="mt-2 text-xs text-center text-gray-600 max-w-20">
                  {stageInfo.name}
                </p>
                {stageInfo.estimatedDuration && (
                  <p className="text-xs text-gray-400">{stageInfo.estimatedDuration}</p>
                )}
              </div>
              
              {index < config.stages.length - 1 && (
                <div className={`h-0.5 w-12 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelinesPage;