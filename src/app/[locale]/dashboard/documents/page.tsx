/**
 * Documents Management Page
 * 
 * Central hub for document management across all applications
 */

'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/enhanced/DashboardLayout';
import { DocumentList } from '@/components/documents/DocumentList';
import { DocumentReview } from '@/components/documents/DocumentReview';
import { useDocumentStore } from '@/lib/documents/document-store';
import { useAuthStore } from '@/lib/auth/auth-store';
import { DocumentUpload as DocumentUploadType, DocumentUploadStatus } from '@/types/documents';
import { UserRole } from '@/types/business';
import { 
  FileText, 
  Search, 
  Filter,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

export default function DocumentsPage() {
  const { user } = useAuthStore();
  const { 
    documents, 
    filteredDocuments,
    loading, 
    error,
    filterDocuments,
    reviewDocument 
  } = useDocumentStore();
  
  const [selectedDocument, setSelectedDocument] = useState<DocumentUploadType | null>(null);
  const [showReviewMode, setShowReviewMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState<DocumentUploadStatus | 'all'>('all');

  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  const stats = {
    total: documents.length,
    pending: documents.filter(doc => doc.status === DocumentUploadStatus.PENDING_REVIEW).length,
    approved: documents.filter(doc => doc.status === DocumentUploadStatus.APPROVED).length,
    rejected: documents.filter(doc => doc.status === DocumentUploadStatus.REJECTED).length,
    underReview: documents.filter(doc => doc.status === DocumentUploadStatus.UNDER_REVIEW).length
  };

  const canReview = user && (
    user.role === UserRole.ADMIN || 
    user.role === UserRole.SUPER_ADMIN || 
    user.role === UserRole.CONSULTANT
  );

  // ========================================================================
  // EFFECTS
  // ========================================================================

  useEffect(() => {
    // Apply status filter
    if (statusFilter !== 'all') {
      filterDocuments({ status: statusFilter });
    } else {
      filterDocuments({});
    }
  }, [statusFilter, filterDocuments]);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  const handleDocumentSelect = (document: DocumentUploadType) => {
    setSelectedDocument(document);
    setShowReviewMode(!!canReview);
  };

  const handleReviewComplete = () => {
    setSelectedDocument(null);
    setShowReviewMode(false);
  };

  const handleStatusFilterChange = (status: DocumentUploadStatus | 'all') => {
    setStatusFilter(status);
  };

  // ========================================================================
  // RENDER METHODS
  // ========================================================================

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-gray-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Documents</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Clock className="h-8 w-8 text-yellow-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Pending Review</p>
            <p className="text-2xl font-semibold text-yellow-600">{stats.pending}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <AlertCircle className="h-8 w-8 text-orange-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Under Review</p>
            <p className="text-2xl font-semibold text-orange-600">{stats.underReview}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <CheckCircle className="h-8 w-8 text-green-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Approved</p>
            <p className="text-2xl font-semibold text-green-600">{stats.approved}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <XCircle className="h-8 w-8 text-red-400" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Rejected</p>
            <p className="text-2xl font-semibold text-red-600">{stats.rejected}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFilters = () => (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Document Filters</h3>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value as any)}
              className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="all">All Status</option>
              <option value={DocumentUploadStatus.PENDING_REVIEW}>Pending Review</option>
              <option value={DocumentUploadStatus.UNDER_REVIEW}>Under Review</option>
              <option value={DocumentUploadStatus.APPROVED}>Approved</option>
              <option value={DocumentUploadStatus.REJECTED}>Rejected</option>
              <option value={DocumentUploadStatus.REQUIRES_RESUBMISSION}>Requires Resubmission</option>
            </select>
          </div>
          
          {canReview && stats.pending > 0 && (
            <div className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              {stats.pending} documents need review
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please login to access documents</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-red-900 mb-2">Error Loading Documents</h2>
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
            <p className="mt-2 text-gray-600">
              {canReview 
                ? 'Review and manage documents across all applications'
                : 'View and manage your uploaded documents'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Statistics */}
        {renderStats()}

        {/* Filters */}
        {renderFilters()}

        {/* Document Review Modal */}
        {selectedDocument && showReviewMode && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedDocument(null)} />
              <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
                <div className="p-6">
                  <DocumentReview
                    document={selectedDocument}
                    userRole={user.role}
                    onReviewComplete={handleReviewComplete}
                    onCancel={() => setSelectedDocument(null)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow">
          {loading && documents.length === 0 ? (
            <div className="animate-pulse p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <DocumentList
              userRole={user.role}
              showActions={true}
              compactView={false}
            />
          )}
        </div>

        {/* Quick Actions for Reviewers */}
        {canReview && stats.pending > 0 && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-primary-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleStatusFilterChange(DocumentUploadStatus.PENDING_REVIEW)}
                className="text-left p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary-600 mr-3" />
                  <div>
                    <p className="font-medium text-primary-900">Review Pending</p>
                    <p className="text-sm text-primary-700">{stats.pending} documents</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleStatusFilterChange(DocumentUploadStatus.UNDER_REVIEW)}
                className="text-left p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-primary-600 mr-3" />
                  <div>
                    <p className="font-medium text-primary-900">Under Review</p>
                    <p className="text-sm text-primary-700">{stats.underReview} documents</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleStatusFilterChange('all')}
                className="text-left p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-primary-600 mr-3" />
                  <div>
                    <p className="font-medium text-primary-900">View All</p>
                    <p className="text-sm text-primary-700">{stats.total} total documents</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}