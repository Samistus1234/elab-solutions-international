/**
 * Document Management Store
 * 
 * Zustand store for document upload, review, and management
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  DocumentUpload, 
  DocumentReviewStatus,
  DocumentUploadStatus,
  DocumentReview,
  DocumentFilter,
  DocumentSort,
  UploadProgress,
  UploadStatus,
  BulkDocumentOperation,
  BulkOperationResult,
  type DocumentStore as IDocumentStore,
  validateDocumentFile,
  DEFAULT_UPLOAD_CONFIG
} from '@/types/documents';
import { UserRole } from '@/types/business';
import { DocumentType } from '@/types/applications';
import { generateId } from '@/lib/utils/id-generator';

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState = {
  documents: [] as DocumentUpload[],
  uploadQueue: [] as UploadProgress[],
  selectedDocuments: [] as string[],
  filterCriteria: {} as DocumentFilter,
  sortCriteria: { field: 'uploadedAt' as const, direction: 'desc' as const } as DocumentSort,
  loading: false,
  error: null as string | null
};

// ============================================================================
// DOCUMENT STORE IMPLEMENTATION
// ============================================================================

interface DocumentStore extends IDocumentStore {
  // Computed properties
  filteredDocuments: DocumentUpload[];
  isUploading: boolean;
  uploadProgress: number;
  hasSelectedDocuments: boolean;
  
  // Additional actions
  clearError: () => void;
  resetStore: () => void;
  getDocumentById: (id: string) => DocumentUpload | undefined;
  getDocumentsByApplication: (applicationId: string) => DocumentUpload[];
  getDocumentsByType: (documentType: DocumentType) => DocumentUpload[];
}

export const useDocumentStore = create<DocumentStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // ========================================================================
        // COMPUTED PROPERTIES
        // ========================================================================

        get filteredDocuments() {
          const { documents, filterCriteria, sortCriteria } = get();
          let filtered = [...documents];

          // Apply filters
          if (filterCriteria.applicationId) {
            filtered = filtered.filter(doc => doc.applicationId === filterCriteria.applicationId);
          }
          if (filterCriteria.documentType) {
            filtered = filtered.filter(doc => doc.documentType === filterCriteria.documentType);
          }
          if (filterCriteria.status) {
            filtered = filtered.filter(doc => doc.status === filterCriteria.status);
          }
          if (filterCriteria.uploadedBy) {
            filtered = filtered.filter(doc => doc.uploadedBy === filterCriteria.uploadedBy);
          }
          if (filterCriteria.dateRange) {
            const start = new Date(filterCriteria.dateRange.start);
            const end = new Date(filterCriteria.dateRange.end);
            filtered = filtered.filter(doc => {
              const uploadDate = new Date(doc.uploadedAt);
              return uploadDate >= start && uploadDate <= end;
            });
          }
          if (filterCriteria.hasIssues !== undefined) {
            filtered = filtered.filter(doc => {
              const hasIssues = doc.reviewHistory.some(review => 
                review.issues && review.issues.length > 0
              );
              return hasIssues === filterCriteria.hasIssues;
            });
          }

          // Apply sorting
          filtered.sort((a, b) => {
            const { field, direction } = sortCriteria;
            let aVal: any, bVal: any;

            switch (field) {
              case 'uploadedAt':
                aVal = new Date(a.uploadedAt);
                bVal = new Date(b.uploadedAt);
                break;
              case 'fileName':
                aVal = a.fileName.toLowerCase();
                bVal = b.fileName.toLowerCase();
                break;
              case 'fileSize':
                aVal = a.fileSize;
                bVal = b.fileSize;
                break;
              case 'status':
                aVal = a.status;
                bVal = b.status;
                break;
              case 'reviewedAt':
                aVal = a.reviewHistory.length > 0 ? new Date(a.reviewHistory[a.reviewHistory.length - 1].reviewedAt) : new Date(0);
                bVal = b.reviewHistory.length > 0 ? new Date(b.reviewHistory[b.reviewHistory.length - 1].reviewedAt) : new Date(0);
                break;
              default:
                return 0;
            }

            if (direction === 'asc') {
              return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
              return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
          });

          return filtered;
        },

        get isUploading() {
          const { uploadQueue } = get();
          return uploadQueue.some(upload => upload.status === UploadStatus.UPLOADING);
        },

        get uploadProgress() {
          const { uploadQueue } = get();
          const activeUploads = uploadQueue.filter(upload => upload.status === UploadStatus.UPLOADING);
          if (activeUploads.length === 0) return 0;
          
          const totalProgress = activeUploads.reduce((sum, upload) => sum + upload.progress, 0);
          return Math.round(totalProgress / activeUploads.length);
        },

        get hasSelectedDocuments() {
          const { selectedDocuments } = get();
          return selectedDocuments.length > 0;
        },

        // ========================================================================
        // UPLOAD ACTIONS
        // ========================================================================

        uploadDocument: async (file: File, applicationId: string, documentType: DocumentType): Promise<string> => {
          const documentId = generateId();
          
          // Validate file
          const validation = validateDocumentFile(file, documentType);
          if (!validation.valid) {
            set({ error: validation.errors.join(', ') });
            throw new Error(validation.errors.join(', '));
          }

          // Add to upload queue
          const uploadProgress: UploadProgress = {
            documentId,
            progress: 0,
            status: UploadStatus.PENDING
          };

          set(state => ({
            uploadQueue: [...state.uploadQueue, uploadProgress],
            error: null
          }));

          try {
            // Simulate upload progress
            await simulateUpload(documentId, set);

            // Create document record
            const document: DocumentUpload = {
              id: documentId,
              applicationId,
              documentType,
              originalName: file.name,
              fileName: `${documentId}_${file.name}`,
              fileSize: file.size,
              mimeType: file.type,
              uploadUrl: `/api/documents/${documentId}`,
              thumbnailUrl: file.type.startsWith('image/') ? `/api/documents/${documentId}/thumbnail` : undefined,
              uploadedAt: new Date().toISOString(),
              uploadedBy: 'current-user-id', // This would come from auth context
              status: DocumentUploadStatus.PENDING_REVIEW,
              reviewHistory: [],
              metadata: {
                pages: file.type === 'application/pdf' ? Math.ceil(Math.random() * 5) + 1 : 1,
                quality: 'high',
                hasText: true,
                isScanned: file.type.startsWith('image/')
              }
            };

            set(state => ({
              documents: [...state.documents, document],
              uploadQueue: state.uploadQueue.filter(upload => upload.documentId !== documentId)
            }));

            return documentId;
          } catch (error) {
            set(state => ({
              uploadQueue: state.uploadQueue.map(upload =>
                upload.documentId === documentId
                  ? { ...upload, status: UploadStatus.FAILED, error: error instanceof Error ? error.message : 'Upload failed' }
                  : upload
              ),
              error: error instanceof Error ? error.message : 'Upload failed'
            }));
            throw error;
          }
        },

        uploadMultipleDocuments: async (files: FileList, applicationId: string, documentType: DocumentType): Promise<string[]> => {
          const fileArray = Array.from(files);
          const documentIds: string[] = [];

          for (const file of fileArray) {
            try {
              const documentId = await get().uploadDocument(file, applicationId, documentType);
              documentIds.push(documentId);
            } catch (error) {
              console.error(`Failed to upload ${file.name}:`, error);
            }
          }

          return documentIds;
        },

        cancelUpload: (documentId: string) => {
          set(state => ({
            uploadQueue: state.uploadQueue.filter(upload => upload.documentId !== documentId)
          }));
        },

        deleteDocument: async (documentId: string): Promise<void> => {
          set({ loading: true });

          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            set(state => ({
              documents: state.documents.filter(doc => doc.id !== documentId),
              selectedDocuments: state.selectedDocuments.filter(id => id !== documentId),
              loading: false
            }));
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Failed to delete document'
            });
            throw error;
          }
        },

        // ========================================================================
        // REVIEW ACTIONS
        // ========================================================================

        reviewDocument: async (documentId: string, reviewData: Omit<DocumentReview, 'id' | 'reviewedAt'>): Promise<void> => {
          set({ loading: true });

          try {
            const review: DocumentReview = {
              id: generateId(),
              ...reviewData,
              reviewedAt: new Date().toISOString()
            };

            // Determine new document status based on review
            let newStatus: DocumentUploadStatus;
            switch (reviewData.status) {
              case 'approved':
                newStatus = DocumentUploadStatus.APPROVED;
                break;
              case 'rejected':
                newStatus = DocumentUploadStatus.REJECTED;
                break;
              case 'requires_clarification':
                newStatus = DocumentUploadStatus.REQUIRES_RESUBMISSION;
                break;
              default:
                newStatus = DocumentUploadStatus.UNDER_REVIEW;
            }

            set(state => ({
              documents: state.documents.map(doc =>
                doc.id === documentId
                  ? {
                      ...doc,
                      status: newStatus,
                      reviewHistory: [...doc.reviewHistory, review]
                    }
                  : doc
              ),
              loading: false
            }));
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Failed to review document'
            });
            throw error;
          }
        },

        // ========================================================================
        // DOWNLOAD ACTIONS
        // ========================================================================

        downloadDocument: async (documentId: string): Promise<void> => {
          const document = get().documents.find(doc => doc.id === documentId);
          if (!document) {
            throw new Error('Document not found');
          }

          // Simulate download
          const link = window.document.createElement('a');
          link.href = document.uploadUrl || '#';
          link.download = document.originalName;
          window.document.body.appendChild(link);
          link.click();
          window.document.body.removeChild(link);
        },

        downloadMultipleDocuments: async (documentIds: string[]): Promise<void> => {
          // Simulate creating a ZIP file and downloading
          console.log('Downloading documents:', documentIds);
          
          // In a real implementation, this would call an API to create a ZIP file
          await new Promise(resolve => setTimeout(resolve, 1000));
        },

        // ========================================================================
        // FILTER AND SEARCH ACTIONS
        // ========================================================================

        filterDocuments: (filter: DocumentFilter) => {
          set({ filterCriteria: filter });
        },

        sortDocuments: (sort: DocumentSort) => {
          set({ sortCriteria: sort });
        },

        searchDocuments: (query: string) => {
          // For now, just filter by filename
          set(state => ({
            filterCriteria: {
              ...state.filterCriteria,
              // Add search functionality here
            }
          }));
        },

        // ========================================================================
        // SELECTION ACTIONS
        // ========================================================================

        selectDocument: (documentId: string) => {
          set(state => ({
            selectedDocuments: state.selectedDocuments.includes(documentId)
              ? state.selectedDocuments.filter(id => id !== documentId)
              : [...state.selectedDocuments, documentId]
          }));
        },

        selectMultipleDocuments: (documentIds: string[]) => {
          set({ selectedDocuments: documentIds });
        },

        clearSelection: () => {
          set({ selectedDocuments: [] });
        },

        // ========================================================================
        // BULK OPERATIONS
        // ========================================================================

        performBulkOperation: async (operation: BulkDocumentOperation): Promise<BulkOperationResult[]> => {
          set({ loading: true });

          try {
            const results: BulkOperationResult[] = [];
            const { documents } = get();

            for (const documentId of operation.documentIds) {
              try {
                const document = documents.find(doc => doc.id === documentId);
                if (!document) {
                  results.push({
                    documentId,
                    success: false,
                    error: 'Document not found'
                  });
                  continue;
                }

                // Perform operation based on type
                switch (operation.operationType) {
                  case 'approve_all':
                    await get().reviewDocument(documentId, {
                      documentId,
                      reviewerId: operation.performedBy,
                      reviewerName: 'Admin User',
                      reviewerRole: UserRole.ADMIN,
                      status: DocumentReviewStatus.APPROVED,
                      comments: 'Bulk approved'
                    });
                    break;
                  case 'reject_all':
                    await get().reviewDocument(documentId, {
                      documentId,
                      reviewerId: operation.performedBy,
                      reviewerName: 'Admin User',
                      reviewerRole: UserRole.ADMIN,
                      status: DocumentReviewStatus.REJECTED,
                      comments: 'Bulk rejected'
                    });
                    break;
                  case 'delete_all':
                    await get().deleteDocument(documentId);
                    break;
                }

                results.push({
                  documentId,
                  success: true
                });
              } catch (error) {
                results.push({
                  documentId,
                  success: false,
                  error: error instanceof Error ? error.message : 'Operation failed'
                });
              }
            }

            set({ loading: false });
            return results;
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Bulk operation failed'
            });
            throw error;
          }
        },

        // ========================================================================
        // UTILITY ACTIONS
        // ========================================================================

        getDocumentById: (id: string) => {
          return get().documents.find(doc => doc.id === id);
        },

        getDocumentsByApplication: (applicationId: string) => {
          return get().documents.filter(doc => doc.applicationId === applicationId);
        },

        getDocumentsByType: (documentType: DocumentType) => {
          return get().documents.filter(doc => doc.documentType === documentType);
        },

        clearError: () => {
          set({ error: null });
        },

        resetStore: () => {
          set(initialState);
        }
      }),
      {
        name: 'document-storage',
        partialize: (state) => ({
          documents: state.documents,
          filterCriteria: state.filterCriteria,
          sortCriteria: state.sortCriteria
        })
      }
    ),
    { name: 'DocumentStore' }
  )
);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

async function simulateUpload(documentId: string, set: any): Promise<void> {
  const updateProgress = (progress: number, status: UploadStatus) => {
    set((state: any) => ({
      uploadQueue: state.uploadQueue.map((upload: UploadProgress) =>
        upload.documentId === documentId
          ? { ...upload, progress, status }
          : upload
      )
    }));
  };

  // Simulate upload progress
  updateProgress(0, UploadStatus.UPLOADING);
  
  for (let i = 0; i <= 100; i += 10) {
    await new Promise(resolve => setTimeout(resolve, 100));
    updateProgress(i, UploadStatus.UPLOADING);
  }

  // Simulate processing
  updateProgress(100, UploadStatus.PROCESSING);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  updateProgress(100, UploadStatus.COMPLETED);
}

export default useDocumentStore;