/**
 * Stage Timeline Component
 * 
 * Visual timeline showing application progression through stages
 */

'use client';

import { useState } from 'react';
import { useStageStore } from '@/lib/stages/stage-store';
import { 
  ApplicationStage, 
  StageTimelineEntry, 
  StageStatus,
  StageIssue,
  StageNote,
  StageAction,
  IssueSeverity
} from '@/types/application-stages';
import { UserRole } from '@/types/business';
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  SkipForward,
  MessageSquare,
  User,
  Calendar,
  ChevronDown,
  ChevronRight,
  Flag,
  Target,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface StageTimelineProps {
  applicationId: string;
  userRole: UserRole;
  showDetails?: boolean;
  compactView?: boolean;
  className?: string;
}

export function StageTimeline({
  applicationId,
  userRole,
  showDetails = true,
  compactView = false,
  className = ''
}: StageTimelineProps) {
  const { 
    getApplicationTimeline, 
    getStageDefinition, 
    transitionStage,
    addStageNote,
    reportStageIssue,
    updateStageProgress,
    loading 
  } = useStageStore();
  
  const [expandedStages, setExpandedStages] = useState<Set<ApplicationStage>>(new Set());
  const [newNote, setNewNote] = useState('');
  const [selectedStage, setSelectedStage] = useState<ApplicationStage | null>(null);

  const timeline = getApplicationTimeline(applicationId);
  const currentStage = timeline.find(entry => entry.status === StageStatus.IN_PROGRESS);

  // ========================================================================
  // UTILITY FUNCTIONS
  // ========================================================================

  const getStatusIcon = (status: StageStatus, progress: number) => {
    switch (status) {
      case StageStatus.COMPLETED:
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case StageStatus.IN_PROGRESS:
        return progress > 50 ? 
          <TrendingUp className="h-6 w-6 text-blue-500" /> :
          <Play className="h-6 w-6 text-blue-500" />;
      case StageStatus.WAITING_FOR_INPUT:
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case StageStatus.WAITING_FOR_APPROVAL:
        return <Pause className="h-6 w-6 text-orange-500" />;
      case StageStatus.BLOCKED:
        return <XCircle className="h-6 w-6 text-red-500" />;
      case StageStatus.SKIPPED:
        return <SkipForward className="h-6 w-6 text-gray-400" />;
      default:
        return <div className="h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-100" />;
    }
  };

  const getStatusColor = (status: StageStatus) => {
    switch (status) {
      case StageStatus.COMPLETED:
        return 'bg-green-50 border-green-200 text-green-800';
      case StageStatus.IN_PROGRESS:
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case StageStatus.WAITING_FOR_INPUT:
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case StageStatus.WAITING_FOR_APPROVAL:
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case StageStatus.BLOCKED:
        return 'bg-red-50 border-red-200 text-red-800';
      case StageStatus.SKIPPED:
        return 'bg-gray-50 border-gray-200 text-gray-600';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  const getSeverityColor = (severity: IssueSeverity) => {
    switch (severity) {
      case IssueSeverity.CRITICAL:
      case IssueSeverity.BLOCKING:
        return 'bg-red-100 text-red-800 border-red-200';
      case IssueSeverity.HIGH:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case IssueSeverity.MEDIUM:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case IssueSeverity.LOW:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDuration = (ms: number) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    return `${hours}h`;
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const canManageStage = () => {
    return userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN || userRole === UserRole.CONSULTANT;
  };

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  const toggleStageExpansion = (stage: ApplicationStage) => {
    const newExpanded = new Set(expandedStages);
    if (newExpanded.has(stage)) {
      newExpanded.delete(stage);
    } else {
      newExpanded.add(stage);
    }
    setExpandedStages(newExpanded);
  };

  const handleAddNote = async (stage: ApplicationStage) => {
    if (!newNote.trim()) return;
    
    try {
      await addStageNote(applicationId, stage, {
        content: newNote,
        authorId: 'current-user-id',
        authorName: 'Current User',
        authorRole: userRole,
        isInternal: userRole !== UserRole.APPLICANT
      });
      setNewNote('');
      setSelectedStage(null);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const handleProgressUpdate = async (stage: ApplicationStage, progress: number) => {
    if (!canManageStage()) return;
    
    try {
      await updateStageProgress(applicationId, stage, progress);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  // ========================================================================
  // RENDER METHODS
  // ========================================================================

  const renderStageHeader = (entry: StageTimelineEntry) => {
    const definition = getStageDefinition(entry.stage);
    const isExpanded = expandedStages.has(entry.stage);
    const hasDetails = entry.issues.length > 0 || entry.notes.length > 0 || entry.actions.length > 0;

    return (
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          {/* Status Icon */}
          <div className="flex-shrink-0">
            {getStatusIcon(entry.status, entry.progress)}
          </div>

          {/* Stage Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-medium text-gray-900">
                {definition.displayName}
              </h3>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(entry.status)}`}>
                {entry.status.replace(/_/g, ' ')}
              </span>
              {entry.issues.length > 0 && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 border border-red-200">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {entry.issues.length} issue{entry.issues.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mt-1">
              {definition.description}
            </p>
            
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Started {formatTimeAgo(entry.enteredAt)}
              </div>
              {entry.completedAt && (
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed {formatTimeAgo(entry.completedAt)}
                </div>
              )}
              {entry.duration && (
                <div>
                  Duration: {formatDuration(entry.duration)}
                </div>
              )}
              {entry.assignedToNames && entry.assignedToNames.length > 0 && (
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {entry.assignedToNames.join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress and Actions */}
        <div className="flex items-center space-x-4">
          {/* Progress */}
          {entry.status === StageStatus.IN_PROGRESS && (
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${entry.progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 min-w-[3rem]">
                {entry.progress}%
              </span>
            </div>
          )}

          {/* Expand Button */}
          {showDetails && hasDetails && (
            <button
              onClick={() => toggleStageExpansion(entry.stage)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderStageDetails = (entry: StageTimelineEntry) => {
    if (!expandedStages.has(entry.stage)) return null;

    return (
      <div className="px-4 pb-4 border-t border-gray-100">
        {/* Issues */}
        {entry.issues.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Issues</h4>
            <div className="space-y-2">
              {entry.issues.map((issue) => (
                <div key={issue.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {issue.type.replace(/_/g, ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getSeverityColor(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{issue.description}</p>
                  {issue.resolvedAt && (
                    <div className="mt-2 text-xs text-green-600">
                      ✓ Resolved {formatTimeAgo(issue.resolvedAt)}
                      {issue.resolution && `: ${issue.resolution}`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {entry.actions.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Action Items</h4>
            <div className="space-y-2">
              {entry.actions.map((action) => (
                <div key={action.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{action.title}</p>
                    <p className="text-xs text-gray-600">{action.description}</p>
                    {action.dueDate && (
                      <p className="text-xs text-orange-600 mt-1">
                        Due: {new Date(action.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {action.completedAt ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {entry.notes.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
            <div className="space-y-2">
              {entry.notes.map((note) => (
                <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-gray-400" />
                      <span className="text-xs font-medium text-gray-700">
                        {note.authorName}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({note.authorRole})
                      </span>
                      {note.isInternal && (
                        <span className="px-1 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">
                          Internal
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(note.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Note */}
        {canManageStage() && (
          <div className="border-t border-gray-100 pt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={selectedStage === entry.stage ? newNote : ''}
                onChange={(e) => {
                  setNewNote(e.target.value);
                  setSelectedStage(entry.stage);
                }}
                placeholder="Add a note..."
                className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                onClick={() => handleAddNote(entry.stage)}
                disabled={!newNote.trim() || selectedStage !== entry.stage}
                className="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderProgressSlider = (entry: StageTimelineEntry) => {
    if (entry.status !== StageStatus.IN_PROGRESS || !canManageStage()) return null;

    return (
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">Progress:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={entry.progress}
            onChange={(e) => handleProgressUpdate(entry.stage, parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-600 min-w-[3rem]">
            {entry.progress}%
          </span>
        </div>
      </div>
    );
  };

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  if (timeline.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Clock className="mx-auto h-8 w-8 text-gray-400 mb-2" />
        <p className="text-gray-600">No stage information available</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Stage Summary */}
      {currentStage && !compactView && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-blue-900">
                Current Stage: {getStageDefinition(currentStage.stage).displayName}
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                {getStageDefinition(currentStage.stage).description}
              </p>
              <p className="text-xs text-blue-600 mt-2">
                Estimated duration: {getStageDefinition(currentStage.stage).estimatedDuration}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">
                {currentStage.progress}%
              </div>
              <div className="text-sm text-blue-700">Complete</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${currentStage.progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-2">
        {timeline.map((entry, index) => {
          const isLast = index === timeline.length - 1;
          const isConnected = !isLast && timeline[index + 1];

          return (
            <div key={entry.id} className="relative">
              {/* Stage Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {renderStageHeader(entry)}
                {renderProgressSlider(entry)}
                {showDetails && renderStageDetails(entry)}
              </div>

              {/* Connector Line */}
              {isConnected && (
                <div className="flex justify-center py-2">
                  <div className="w-0.5 h-6 bg-gray-300"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500 mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Updating stages...</p>
        </div>
      )}
    </div>
  );
}