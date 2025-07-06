/**
 * Document List Component
 * 
 * Lists documents with filtering, sorting, and bulk operations
 */

'use client';

import { useState } from 'react';
import { useDocumentStore } from '@/lib/documents/document-store';
import { DocumentUpload, DocumentUploadStatus, DocumentType, DocumentReviewStatus } from '@/types/documents';
import { UserRole } from '@/types/business';
import { DocumentPreview } from './DocumentPreview';
import { 
  Search, X,
  Filter,
  Download,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Image,
  File,
  ChevronDown,
  MoreHorizontal,
  Calendar
} from 'lucide-react';

interface DocumentListProps {
  applicationId?: string;
  documentType?: DocumentType;
  userRole: UserRole;
  showActions?: boolean;
  compactView?: boolean;
  className?: string;
}

export function DocumentList({
  applicationId,
  documentType,
  userRole,
  showActions = true,
  compactView = false,
  className = ''
}: DocumentListProps) {
  const {
    filteredDocuments,
    selectedDocuments,
    filterCriteria,
    sortCriteria,
    loading,
    error,
    filterDocuments,
    sortDocuments,
    selectDocument,
    selectMultipleDocuments,
    clearSelection,
    deleteDocument,
    downloadDocument,
    downloadMultipleDocuments,
    reviewDocument
  } = useDocumentStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<DocumentUpload | null>(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  // Filter documents based on props
  const documents = filteredDocuments.filter(doc => {
    if (applicationId && doc.applicationId !== applicationId) return false;
    if (documentType && doc.documentType !== documentType) return false;
    if (searchQuery && !doc.originalName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // ========================================================================
  // UTILITY FUNCTIONS
  // ========================================================================

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <Image className="h-5 w-5" />;
    } else if (mimeType === 'application/pdf') {
      return <FileText className="h-5 w-5" />;
    } else {
      return <File className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: DocumentUploadStatus) => {
    switch (status) {
      case DocumentUploadStatus.APPROVED:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case DocumentUploadStatus.REJECTED:
        return <XCircle className="h-4 w-4 text-red-500" />;
      case DocumentUploadStatus.UNDER_REVIEW:
        return <Clock className="h-4 w-4 text-orange-500" />;
      case DocumentUploadStatus.REQUIRES_RESUBMISSION:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: DocumentUploadStatus) => {
    switch (status) {
      case DocumentUploadStatus.APPROVED:
        return 'bg-green-50 text-green-700 border-green-200';
      case DocumentUploadStatus.REJECTED:
        return 'bg-red-50 text-red-700 border-red-200';
      case DocumentUploadStatus.UNDER_REVIEW:
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case DocumentUploadStatus.REQUIRES_RESUBMISSION:
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const canReview = () => {
    return userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN || userRole === UserRole.CONSULTANT;
  };

  const canDelete = () => {
    return userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN;
  };

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  const handleSelectAll = () => {
    const allIds = documents.map(doc => doc.id);
    if (selectedDocuments.length === allIds.length) {
      clearSelection();
    } else {
      selectMultipleDocuments(allIds);
    }
  };

  const handleSort = (field: string) => {
    const direction = sortCriteria.field === field && sortCriteria.direction === 'asc' ? 'desc' : 'asc';
    sortDocuments({ field: field as any, direction });
    setSortMenuOpen(false);
  };

  const handleQuickReview = async (documentId: string, status: DocumentReviewStatus.APPROVED | DocumentReviewStatus.REJECTED) => {
    try {
      await reviewDocument(documentId, {
        documentId,
        reviewerId: 'current-user-id',
        reviewerName: 'Current User',
        reviewerRole: userRole,
        status,
        comments: `Quick ${status} via document list`
      });
    } catch (error) {
      console.error('Failed to review document:', error);
    }
  };

  const handleBulkDownload = async () => {
    if (selectedDocuments.length === 0) return;
    try {
      await downloadMultipleDocuments(selectedDocuments);
    } catch (error) {
      console.error('Failed to download documents:', error);
    }
  };

  // ========================================================================
  // RENDER METHODS
  // ========================================================================

  const renderToolbar = () => (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>

          <div className="relative">
            <button
              onClick={() => setSortMenuOpen(!sortMenuOpen)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Sort
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            
            {sortMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button onClick={() => handleSort('uploadedAt')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Upload Date
                  </button>
                  <button onClick={() => handleSort('fileName')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    File Name
                  </button>
                  <button onClick={() => handleSort('fileSize')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    File Size
                  </button>
                  <button onClick={() => handleSort('status')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Status
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {selectedDocuments.length > 0 && (
            <>
              <span className="text-sm text-gray-600">
                {selectedDocuments.length} selected
              </span>
              <button
                onClick={handleBulkDownload}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              <button
                onClick={clearSelection}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderDocumentRow = (document: DocumentUpload) => (
    <tr key={document.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={selectedDocuments.includes(document.id)}
          onChange={() => selectDocument(document.id)}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {getFileIcon(document.mimeType)}
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
              {document.originalName}
            </div>
            <div className="text-sm text-gray-500">
              {formatFileSize(document.fileSize)}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {getStatusIcon(document.status)}
          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(document.status)}`}>
            {document.status.replace(/_/g, ' ')}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(document.uploadedAt).toLocaleDateString()}
        </div>
      </td>

      {showActions && (
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => setPreviewDocument(document)}
              className="text-primary-600 hover:text-primary-900"
              title="Preview"
            >
              <Eye className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => downloadDocument(document.id)}
              className="text-gray-400 hover:text-gray-600"
              title="Download"
            >
              <Download className="h-4 w-4" />
            </button>

            {canReview() && document.status === DocumentUploadStatus.PENDING_REVIEW && (
              <>
                <button
                  onClick={() => handleQuickReview(document.id, DocumentReviewStatus.APPROVED)}
                  className="text-green-600 hover:text-green-700"
                  title="Quick approve"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => handleQuickReview(document.id, DocumentReviewStatus.REJECTED)}
                  className="text-red-600 hover:text-red-700"
                  title="Quick reject"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </>
            )}

            {canDelete() && (
              <button
                onClick={() => deleteDocument(document.id)}
                className="text-red-400 hover:text-red-600"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  );

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Documents</h3>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {renderToolbar()}

      {loading && documents.length === 0 ? (
        <div className="animate-pulse p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
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
      ) : documents.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? 'No documents match your search.' : 'Get started by uploading a document.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={documents.length > 0 && selectedDocuments.length === documents.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded
                </th>
                {showActions && (
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map(renderDocumentRow)}
            </tbody>
          </table>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setPreviewDocument(null)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <DocumentPreview
                document={previewDocument}
                readonly={!canReview()}
                onDownload={() => downloadDocument(previewDocument.id)}
                className="max-h-[90vh]"
              />
              <button
                onClick={() => setPreviewDocument(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}