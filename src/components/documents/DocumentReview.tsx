/**
 * Document Review Component
 * 
 * Interface for admins and consultants to review and approve documents
 */

'use client';

import { useState } from 'react';
import { useDocumentStore } from '@/lib/documents/document-store';
import { 
  DocumentUpload, 
  DocumentReview as DocumentReviewType, 
  DocumentIssue, 
  DocumentIssueType, DocumentReviewStatus,
  DocumentUploadStatus 
} from '@/types/documents';
import { UserRole } from '@/types/business';
import { DocumentPreview } from './DocumentPreview';
import { 
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Plus,
  Trash2,
  Clock,
  User,
  Calendar,
  FileText,
  Save,
  Send
} from 'lucide-react';

interface DocumentReviewProps {
  document: DocumentUpload;
  userRole: UserRole;
  onReviewComplete?: (review: DocumentReviewType) => void;
  onCancel?: () => void;
  className?: string;
}

export function DocumentReview({
  document,
  userRole,
  onReviewComplete,
  onCancel,
  className = ''
}: DocumentReviewProps) {
  const { reviewDocument, loading } = useDocumentStore();
  
  const [reviewStatus, setReviewStatus] = useState<DocumentReviewStatus>(DocumentReviewStatus.APPROVED);
  const [comments, setComments] = useState('');
  const [issues, setIssues] = useState<DocumentIssue[]>([]);
  const [estimatedResolutionTime, setEstimatedResolutionTime] = useState('');
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [newIssue, setNewIssue] = useState<Partial<DocumentIssue>>({
    type: DocumentIssueType.POOR_QUALITY,
    severity: 'medium',
    description: '',
    suggestion: ''
  });

  // ========================================================================
  // UTILITY FUNCTIONS
  // ========================================================================

  const canReview = () => {
    return userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN || userRole === UserRole.CONSULTANT;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'requires_clarification':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'requires_clarification':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  const handleAddIssue = () => {
    if (!newIssue.description) return;

    const issue: DocumentIssue = {
      type: newIssue.type as DocumentIssueType,
      severity: newIssue.severity as 'low' | 'medium' | 'high' | 'critical',
      description: newIssue.description,
      suggestion: newIssue.suggestion
    };

    setIssues([...issues, issue]);
    setNewIssue({
      type: DocumentIssueType.POOR_QUALITY,
      severity: 'medium',
      description: '',
      suggestion: ''
    });
    setShowIssueForm(false);
  };

  const handleRemoveIssue = (index: number) => {
    setIssues(issues.filter((_, i) => i !== index));
  };

  const handleSubmitReview = async () => {
    if (!canReview()) return;

    try {
      const review: Omit<DocumentReviewType, 'id' | 'reviewedAt'> = {
        documentId: document.id,
        reviewerId: 'current-user-id', // This would come from auth context
        reviewerName: 'Current User', // This would come from auth context
        reviewerRole: userRole,
        status: reviewStatus,
        comments: comments || undefined,
        issues: issues.length > 0 ? issues : undefined,
        estimatedResolutionTime: estimatedResolutionTime || undefined
      };

      await reviewDocument(document.id, review);
      
      const fullReview: DocumentReviewType = {
        id: `review-${Date.now()}`,
        ...review,
        reviewedAt: new Date().toISOString()
      };

      onReviewComplete?.(fullReview);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  // ========================================================================
  // RENDER METHODS
  // ========================================================================

  const renderDocumentInfo = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Information</h3>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">File Name:</span>
          <p className="text-gray-900">{document.originalName}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">File Size:</span>
          <p className="text-gray-900">{(document.fileSize / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Upload Date:</span>
          <p className="text-gray-900">{new Date(document.uploadedAt).toLocaleDateString()}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Current Status:</span>
          <div className="flex items-center mt-1">
            {getStatusIcon(document.status)}
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(document.status)}`}>
              {document.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
        {document.metadata.pages && (
          <div>
            <span className="font-medium text-gray-700">Pages:</span>
            <p className="text-gray-900">{document.metadata.pages}</p>
          </div>
        )}
        <div>
          <span className="font-medium text-gray-700">Document Type:</span>
          <p className="text-gray-900">{document.documentType.replace(/_/g, ' ')}</p>
        </div>
      </div>
    </div>
  );

  const renderReviewHistory = () => {
    if (document.reviewHistory.length === 0) return null;

    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Review History</h3>
        
        <div className="space-y-4">
          {document.reviewHistory.map((review, index) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{review.reviewerName}</span>
                  <span className="text-sm text-gray-500">({review.reviewerRole})</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(review.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(review.status)}`}>
                    {review.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(review.reviewedAt).toLocaleString()}
              </div>
              
              {review.comments && (
                <p className="text-gray-700 mb-2">{review.comments}</p>
              )}
              
              {review.issues && review.issues.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Issues Identified:</h5>
                  <div className="space-y-2">
                    {review.issues.map((issue, issueIndex) => (
                      <div key={issueIndex} className="bg-gray-50 rounded p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {issue.type.replace(/_/g, ' ')}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded border ${getSeverityColor(issue.severity)}`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{issue.description}</p>
                        {issue.suggestion && (
                          <p className="text-sm text-blue-700 mt-1">
                            <strong>Suggestion:</strong> {issue.suggestion}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderReviewForm = () => {
    if (!canReview()) {
      return (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-600">You don't have permission to review this document.</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Review</h3>
        
        {/* Review Decision */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Review Decision</label>
          <div className="space-y-2">
            {[
              { value: 'approved', label: 'Approve', icon: CheckCircle, color: 'text-green-600' },
              { value: 'rejected', label: 'Reject', icon: XCircle, color: 'text-red-600' },
              { value: 'requires_clarification', label: 'Request Clarification', icon: AlertTriangle, color: 'text-yellow-600' }
            ].map(({ value, label, icon: Icon, color }) => (
              <label key={value} className="flex items-center">
                <input
                  type="radio"
                  name="reviewStatus"
                  value={value}
                  checked={reviewStatus === value}
                  onChange={(e) => setReviewStatus(e.target.value as any)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <Icon className={`ml-2 h-5 w-5 ${color}`} />
                <span className="ml-2 text-sm text-gray-900">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="mb-6">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
            Comments
          </label>
          <textarea
            id="comments"
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Add any comments about the document review..."
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        {/* Issues Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">Issues</label>
            <button
              type="button"
              onClick={() => setShowIssueForm(true)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Issue
            </button>
          </div>
          
          {issues.length > 0 && (
            <div className="space-y-3 mb-4">
              {issues.map((issue, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {issue.type.replace(/_/g, ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveIssue(index)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">{issue.description}</p>
                  {issue.suggestion && (
                    <p className="text-sm text-blue-700 mt-1">
                      <strong>Suggestion:</strong> {issue.suggestion}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Issue Form */}
          {showIssueForm && (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                  <select
                    value={newIssue.type}
                    onChange={(e) => setNewIssue({ ...newIssue, type: e.target.value as DocumentIssueType })}
                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    {Object.values(DocumentIssueType).map((type) => (
                      <option key={type} value={type}>
                        {type.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select
                    value={newIssue.severity}
                    onChange={(e) => setNewIssue({ ...newIssue, severity: e.target.value as any })}
                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                  placeholder="Describe the issue..."
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Suggestion (Optional)</label>
                <textarea
                  rows={2}
                  value={newIssue.suggestion}
                  onChange={(e) => setNewIssue({ ...newIssue, suggestion: e.target.value })}
                  placeholder="Suggest how to resolve this issue..."
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowIssueForm(false)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddIssue}
                  disabled={!newIssue.description}
                  className="px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Issue
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Estimated Resolution Time */}
        {(reviewStatus === DocumentReviewStatus.REJECTED || reviewStatus === DocumentReviewStatus.REQUIRES_CLARIFICATION) && (
          <div className="mb-6">
            <label htmlFor="estimatedResolutionTime" className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Resolution Time
            </label>
            <input
              type="text"
              id="estimatedResolutionTime"
              value={estimatedResolutionTime}
              onChange={(e) => setEstimatedResolutionTime(e.target.value)}
              placeholder="e.g., 2-3 business days"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmitReview}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Document Preview */}
      <div className="bg-white rounded-lg shadow">
        <DocumentPreview
          document={document}
          readonly={!canReview()}
          showAnnotations={true}
        />
      </div>

      {/* Document Information */}
      {renderDocumentInfo()}

      {/* Review History */}
      {renderReviewHistory()}

      {/* Review Form */}
      {renderReviewForm()}
    </div>
  );
}