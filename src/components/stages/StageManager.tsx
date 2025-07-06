/**
 * Stage Manager Component
 * 
 * Admin interface for managing application stages and transitions
 */

'use client';

import { useState, useEffect } from 'react';
import { useStageStore } from '@/lib/stages/stage-store';
import { 
  ApplicationStage, 
  StageTransition,
  StageNotification,
  NotificationUrgency,
  StageIssueType,
  IssueSeverity
} from '@/types/application-stages';
import { UserRole } from '@/types/business';
import { 
  Settings,
  Play,
  Pause,
  SkipForward,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MessageSquare,
  Flag,
  TrendingUp,
  BarChart3,
  Filter,
  Search,
  RefreshCw,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface StageManagerProps {
  applicationId?: string;
  userRole: UserRole;
  className?: string;
}

export function StageManager({
  applicationId,
  userRole,
  className = ''
}: StageManagerProps) {
  const {
    transitions,
    pendingTransitions,
    recentNotifications,
    getStageStatistics,
    getBottleneckAnalysis,
    transitionStage,
    approveTransition,
    rejectTransition,
    reportStageIssue,
    loading,
    error
  } = useStageStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'transitions' | 'notifications' | 'analytics'>('overview');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransition, setSelectedTransition] = useState<StageTransition | null>(null);
  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [newTransition, setNewTransition] = useState({
    toStage: ApplicationStage.SUBMITTED,
    reason: '',
    notes: ''
  });

  const canManage = userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN;

  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  const statistics = getStageStatistics();
  const bottlenecks = getBottleneckAnalysis();
  
  const filteredTransitions = transitions.filter(transition => {
    if (applicationId && transition.applicationId !== applicationId) return false;
    if (filterStatus === 'pending' && (!transition.requiresApproval || transition.approvedAt)) return false;
    if (filterStatus === 'approved' && !transition.approvedAt) return false;
    if (filterStatus === 'rejected' && transition.approvedAt) return false;
    if (searchQuery && !transition.applicationId.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredNotifications = recentNotifications.filter(notification => {
    if (applicationId && notification.applicationId !== applicationId) return false;
    if (searchQuery && !notification.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  const handleTransitionApproval = async (transitionId: string, approved: boolean) => {
    try {
      if (approved) {
        await approveTransition(transitionId);
      } else {
        await rejectTransition(transitionId, 'Rejected by admin');
      }
    } catch (error) {
      console.error('Failed to process transition:', error);
    }
  };

  const handleCreateTransition = async () => {
    if (!applicationId || !canManage) return;

    try {
      await transitionStage(
        applicationId,
        newTransition.toStage,
        newTransition.reason,
        newTransition.notes
      );
      setShowTransitionModal(false);
      setNewTransition({
        toStage: ApplicationStage.SUBMITTED,
        reason: '',
        notes: ''
      });
    } catch (error) {
      console.error('Failed to create transition:', error);
    }
  };

  const handleReportIssue = async (stage: ApplicationStage) => {
    if (!applicationId || !canManage) return;

    try {
      await reportStageIssue(applicationId, stage, {
        type: StageIssueType.PROCESSING_DELAY,
        severity: IssueSeverity.MEDIUM,
        title: 'Processing Delay',
        description: 'Stage is taking longer than expected',
        reportedBy: 'current-user-id'
      });
    } catch (error) {
      console.error('Failed to report issue:', error);
    }
  };

  // ========================================================================
  // RENDER METHODS
  // ========================================================================

  const renderTabNavigation = () => (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'transitions', label: 'Transitions', icon: TrendingUp },
          { id: 'notifications', label: 'Notifications', icon: MessageSquare },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Transitions</p>
              <p className="text-2xl font-semibold text-gray-900">{pendingTransitions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Stages</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.keys(statistics).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-green-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Unread Notifications</p>
              <p className="text-2xl font-semibold text-gray-900">{recentNotifications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Bottlenecks</p>
              <p className="text-2xl font-semibold text-gray-900">{bottlenecks.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          {transitions.slice(-5).map((transition) => (
            <div key={transition.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {transition.applicationId} → {transition.toStage.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-gray-500">
                    by {transition.transitionedByName} • {new Date(transition.transitionedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {transition.automaticTransition ? (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Auto</span>
                ) : (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Manual</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTransitions = () => (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {canManage && applicationId && (
          <button
            onClick={() => setShowTransitionModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Transition
          </button>
        )}
      </div>

      {/* Transitions List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Application
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Initiated By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {canManage && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransitions.map((transition) => (
              <tr key={transition.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transition.applicationId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {transition.fromStage.replace(/_/g, ' ')} → {transition.toStage.replace(/_/g, ' ')}
                  </div>
                  {transition.reason && (
                    <div className="text-xs text-gray-500">{transition.reason}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm text-gray-900">{transition.transitionedByName}</div>
                      <div className="text-xs text-gray-500">{transition.transitionedByRole}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transition.transitionedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transition.requiresApproval && !transition.approvedAt ? (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Pending Approval
                    </span>
                  ) : transition.approvedAt ? (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Completed
                    </span>
                  )}
                </td>
                {canManage && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {transition.requiresApproval && !transition.approvedAt && (
                        <>
                          <button
                            onClick={() => handleTransitionApproval(transition.id, true)}
                            className="text-green-600 hover:text-green-900"
                            title="Approve"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleTransitionApproval(transition.id, false)}
                            className="text-red-600 hover:text-red-900"
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setSelectedTransition(transition)}
                        className="text-gray-400 hover:text-gray-600"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-xs text-gray-500">
                    {notification.applicationId} • {new Date(notification.sentAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  notification.urgency === NotificationUrgency.HIGH
                    ? 'bg-red-100 text-red-800'
                    : notification.urgency === NotificationUrgency.MEDIUM
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {notification.urgency}
                </span>
                {!notification.readAt && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2">{notification.message}</p>
            {notification.actionRequired && (
              <div className="mt-3">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Take Action →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Stage Statistics */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Stage Statistics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(statistics).map(([stage, data]) => (
              <div key={stage} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {stage.replace(/_/g, ' ')}
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Applications: {data.count}</div>
                  <div>Avg Duration: {Math.round(data.averageDuration / (24 * 60 * 60 * 1000))} days</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottleneck Analysis */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Bottleneck Analysis</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {bottlenecks.map((bottleneck) => (
              <div key={bottleneck.stage} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-red-900">
                    {bottleneck.stage.replace(/_/g, ' ')}
                  </h4>
                  <p className="text-sm text-red-700">
                    Average time: {Math.round(bottleneck.averageTime / (24 * 60 * 60 * 1000))} days
                  </p>
                </div>
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  if (!canManage) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
        <p className="text-gray-600">You don't have permission to access stage management tools.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stage Management</h2>
          <p className="text-gray-600 mt-1">
            Monitor and manage application progression through stages
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      {renderTabNavigation()}

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'transitions' && renderTransitions()}
      {activeTab === 'notifications' && renderNotifications()}
      {activeTab === 'analytics' && renderAnalytics()}

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing stage operation...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}