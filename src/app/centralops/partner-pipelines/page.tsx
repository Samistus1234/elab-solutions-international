'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, Filter, BarChart3, TrendingUp, Clock,
  Eye, MessageSquare, Download, Plus, Settings, RefreshCw,
  CheckCircle, AlertCircle, XCircle, Calendar, Target,
  Building, Globe, Award, Zap, Activity
} from 'lucide-react';
import { usePipelineStore, ServicePipeline, PipelineStage, PIPELINE_CONFIGS } from '@/lib/stores/pipeline-store';
import PipelineFlowChart from '@/components/pipelines/PipelineFlowChart';
import PipelineNotifications from '@/components/pipelines/PipelineNotifications';

const PartnerPipelinesPage = () => {
  const {
    applicantPipelines,
    notifications,
    stats,
    loading,
    error,
    isConnected,
    selectedPipelineType,
    setSelectedPipelineType,
    syncFromOdoo,
    generateMockData
  } = usePipelineStore();

  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'kanban'>('list');
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<PipelineStage | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'urgent' | 'high' | 'medium' | 'low'>('all');
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    // Initialize with mock data
    generateMockData();
  }, [generateMockData]);

  // Filter and search logic
  const filteredPipelines = Object.values(applicantPipelines).filter(pipeline => {
    const matchesSearch = !searchQuery || 
      pipeline.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pipeline.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pipeline.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = !stageFilter || pipeline.currentStage === stageFilter;
    const matchesPriority = priorityFilter === 'all' || pipeline.priority === priorityFilter;
    const matchesPipelineType = !selectedPipelineType || pipeline.pipelineType === selectedPipelineType;
    
    return matchesSearch && matchesStage && matchesPriority && matchesPipelineType;
  });

  // Pipeline statistics
  const pipelineStats = {
    total: Object.keys(applicantPipelines).length,
    active: Object.values(applicantPipelines).filter(p => 
      p.currentStage !== PipelineStage.COMPLETED && 
      p.currentStage !== PipelineStage.CANCELLED
    ).length,
    completed: Object.values(applicantPipelines).filter(p => 
      p.currentStage === PipelineStage.COMPLETED
    ).length,
    urgent: Object.values(applicantPipelines).filter(p => p.priority === 'urgent').length,
    high: Object.values(applicantPipelines).filter(p => p.priority === 'high').length
  };

  // Service type breakdown
  const serviceBreakdown = Object.values(ServicePipeline).map(service => ({
    service,
    config: PIPELINE_CONFIGS[service],
    count: Object.values(applicantPipelines).filter(p => p.pipelineType === service).length,
    completed: Object.values(applicantPipelines).filter(p => 
      p.pipelineType === service && p.currentStage === PipelineStage.COMPLETED
    ).length
  })).filter(item => item.count > 0);

  const getStageColor = (stage: PipelineStage) => {
    switch (stage) {
      case PipelineStage.COMPLETED: return 'text-green-600 bg-green-100';
      case PipelineStage.AUTHORITY_PROCESSING: return 'text-orange-600 bg-orange-100';
      case PipelineStage.INSUFFICIENCY: return 'text-red-600 bg-red-100';
      case PipelineStage.QC_PASSED: return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Building className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Partner Pipeline Management</h1>
                <p className="text-gray-600">Comprehensive oversight of all client pipeline operations</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              {/* Connection Status */}
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span>{isConnected ? 'Odoo Connected' : 'Disconnected'}</span>
              </div>

              <PipelineNotifications compact />

              <motion.button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showAnalytics ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="h-4 w-4" />
              </motion.button>

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
        {/* Analytics Panel */}
        <AnimatePresence>
          {showAnalytics && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Pipeline Analytics Dashboard</h3>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <div className="text-3xl font-bold text-blue-600">{pipelineStats.total}</div>
                    <div className="text-sm text-gray-600">Total Applicants</div>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <div className="text-3xl font-bold text-orange-600">{pipelineStats.active}</div>
                    <div className="text-sm text-gray-600">Active Pipelines</div>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <div className="text-3xl font-bold text-green-600">{pipelineStats.completed}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <div className="text-3xl font-bold text-red-600">{pipelineStats.urgent}</div>
                    <div className="text-sm text-gray-600">Urgent Priority</div>
                  </motion.div>
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <div className="text-3xl font-bold text-purple-600">
                      {pipelineStats.total > 0 ? Math.round((pipelineStats.completed / pipelineStats.total) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </motion.div>
                </div>

                {/* Service Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceBreakdown.map((service, index) => (
                    <motion.div
                      key={service.service}
                      className="p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{service.config.icon}</span>
                          <span className="font-medium text-gray-900 text-sm">
                            {service.config.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{service.count} total</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ 
                            width: service.count > 0 ? `${(service.completed / service.count) * 100}%` : '0%' 
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {service.completed} completed ({service.count > 0 ? Math.round((service.completed / service.count) * 100) : 0}%)
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

            <select
              value={stageFilter || ''}
              onChange={(e) => setStageFilter(e.target.value as PipelineStage || null)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Stages</option>
              {Object.values(PipelineStage).map((stage) => (
                <option key={stage} value={stage}>
                  {stage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <div className="flex space-x-2">
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="list">List View</option>
                <option value="grid">Grid View</option>
                <option value="kanban">Kanban</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pipeline View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredPipelines.map((pipeline, index) => (
              <motion.div
                key={pipeline.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-1 h-16 rounded-full ${getPriorityColor(pipeline.priority)}`} />
                      <div>
                        <h3 className="font-semibold text-gray-900">{pipeline.applicantName}</h3>
                        <p className="text-sm text-gray-600">{pipeline.referenceNumber}</p>
                        <p className="text-sm text-gray-500">{pipeline.serviceName}</p>
                        {pipeline.assignedConsultant && (
                          <p className="text-xs text-gray-400">Consultant: {pipeline.assignedConsultant}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStageColor(pipeline.currentStage)}`}>
                        {pipeline.currentStage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{pipeline.progressPercentage}%</p>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${pipeline.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedApplicant === pipeline.applicantId ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 pt-6"
                    >
                      <PipelineFlowChart 
                        pipeline={pipeline} 
                        showDetails={true}
                        interactive={false}
                      />
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Created: {new Date(pipeline.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Updated: {new Date(pipeline.lastUpdated).toLocaleDateString()}</span>
                        </div>
                        {pipeline.estimatedCompletion && (
                          <div className="flex items-center space-x-1">
                            <Target className="h-4 w-4" />
                            <span>Est. Completion: {pipeline.estimatedCompletion}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedApplicant(
                          selectedApplicant === pipeline.applicantId ? null : pipeline.applicantId
                        )}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>{selectedApplicant === pipeline.applicantId ? 'Hide' : 'View'} Pipeline</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPipelines.map((pipeline, index) => (
              <motion.div
                key={pipeline.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(pipeline.priority)}`} />
                  <span className="text-xs text-gray-500">{pipeline.progressPercentage}%</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{pipeline.applicantName}</h3>
                <p className="text-sm text-gray-600 mb-2">{pipeline.serviceName}</p>
                <p className="text-xs text-gray-500 mb-4">{pipeline.referenceNumber}</p>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(pipeline.currentStage)} mb-4`}>
                  {pipeline.currentStage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${pipeline.progressPercentage}%` }}
                  />
                </div>
                
                <div className="text-xs text-gray-500">
                  Last updated: {new Date(pipeline.lastUpdated).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Kanban View */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[
              { stage: 'In Progress', stages: [PipelineStage.DOCUMENTS_SUBMITTED, PipelineStage.QC_PASSED] },
              { stage: 'Processing', stages: [PipelineStage.APPLICATION_SUBMITTED, PipelineStage.AUTHORITY_PROCESSING] },
              { stage: 'Action Required', stages: [PipelineStage.INSUFFICIENCY, PipelineStage.ADDITIONAL_DOCS_REQUIRED] },
              { stage: 'Completed', stages: [PipelineStage.COMPLETED] }
            ].map((column, columnIndex) => (
              <div key={column.stage} className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {column.stage} ({filteredPipelines.filter(p => column.stages.includes(p.currentStage)).length})
                </h3>
                <div className="space-y-3">
                  {filteredPipelines
                    .filter(pipeline => column.stages.includes(pipeline.currentStage))
                    .map((pipeline, index) => (
                      <motion.div
                        key={pipeline.id}
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: columnIndex * 0.1 + index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(pipeline.priority)}`} />
                          <span className="text-xs text-gray-500">{pipeline.progressPercentage}%</span>
                        </div>
                        <h4 className="font-medium text-sm text-gray-900 mb-1">{pipeline.applicantName}</h4>
                        <p className="text-xs text-gray-600 mb-2">{pipeline.serviceName}</p>
                        <div className={`px-2 py-1 rounded text-xs ${getStageColor(pipeline.currentStage)}`}>
                          {pipeline.currentStage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredPipelines.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pipelines found</h3>
            <p className="text-gray-600">
              {searchQuery || stageFilter || priorityFilter !== 'all' || selectedPipelineType
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

export default PartnerPipelinesPage;