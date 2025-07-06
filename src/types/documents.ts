/**
 * Document Management Types
 * 
 * Comprehensive types for document upload, review, and management system
 */

import { DocumentType } from './applications';
import type { UserRole } from './business';
export { DocumentType } from './applications';

// ============================================================================
// DOCUMENT UPLOAD TYPES
// ============================================================================

export interface DocumentUpload {
  id: string;
  applicationId: string;
  documentType: DocumentType;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadUrl?: string;
  thumbnailUrl?: string;
  uploadedAt: string;
  uploadedBy: string;
  status: DocumentUploadStatus;
  reviewHistory: DocumentReview[];
  metadata: DocumentMetadata;
}

export enum DocumentUploadStatus {
  UPLOADING = 'uploading',
  UPLOADED = 'uploaded',
  PROCESSING = 'processing',
  PENDING_REVIEW = 'pending_review',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REQUIRES_RESUBMISSION = 'requires_resubmission',
  EXPIRED = 'expired'
}

export interface DocumentMetadata {
  pages?: number;
  resolution?: string;
  colorSpace?: string;
  hasText?: boolean;
  isScanned?: boolean;
  quality?: 'low' | 'medium' | 'high';
  extractedText?: string;
  ocrConfidence?: number;
  expiryDate?: string;
  issueDate?: string;
  documentNumber?: string;
  issuingAuthority?: string;
}

// ============================================================================
// DOCUMENT REVIEW TYPES
// ============================================================================

export interface DocumentReview {
  id: string;
  documentId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: UserRole;
  status: DocumentReviewStatus;
  comments?: string;
  issues?: DocumentIssue[];
  reviewedAt: string;
  estimatedResolutionTime?: string;
}

export enum DocumentReviewStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REQUIRES_CLARIFICATION = 'requires_clarification'
}

export interface DocumentIssue {
  type: DocumentIssueType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggestion?: string;
  location?: {
    page?: number;
    coordinates?: { x: number; y: number; width: number; height: number };
  };
}

export enum DocumentIssueType {
  POOR_QUALITY = 'poor_quality',
  ILLEGIBLE_TEXT = 'illegible_text',
  MISSING_INFORMATION = 'missing_information',
  INCORRECT_DOCUMENT_TYPE = 'incorrect_document_type',
  EXPIRED_DOCUMENT = 'expired_document',
  INCOMPLETE_DOCUMENT = 'incomplete_document',
  WRONG_FORMAT = 'wrong_format',
  SECURITY_WATERMARK_MISSING = 'security_watermark_missing',
  AUTHENTICITY_CONCERN = 'authenticity_concern'
}

// ============================================================================
// DOCUMENT REQUIREMENTS
// ============================================================================

export interface DocumentRequirement {
  documentType: DocumentType;
  isRequired: boolean;
  acceptedFormats: string[];
  maxFileSize: number; // in bytes
  maxPages?: number;
  minimumResolution?: string;
  description: string;
  examples?: string[];
  validationRules: DocumentValidationRule[];
}

export interface DocumentValidationRule {
  type: DocumentValidationType;
  value: any;
  errorMessage: string;
}

export enum DocumentValidationType {
  FILE_SIZE = 'file_size',
  FILE_FORMAT = 'file_format',
  IMAGE_RESOLUTION = 'image_resolution',
  PAGE_COUNT = 'page_count',
  TEXT_PRESENCE = 'text_presence',
  EXPIRY_DATE = 'expiry_date',
  ISSUE_DATE = 'issue_date'
}

// ============================================================================
// UPLOAD MANAGEMENT
// ============================================================================

export interface UploadProgress {
  documentId: string;
  progress: number; // 0-100
  status: UploadStatus;
  speed?: number; // bytes per second
  timeRemaining?: number; // seconds
  error?: string;
}

export enum UploadStatus {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface UploadConfig {
  maxFileSize: number;
  allowedTypes: string[];
  maxConcurrentUploads: number;
  chunkSize: number;
  retryAttempts: number;
  enableThumbnails: boolean;
  enableOCR: boolean;
}

// ============================================================================
// DOCUMENT VIEWER TYPES
// ============================================================================

export interface DocumentViewerProps {
  document: DocumentUpload;
  readonly?: boolean;
  showAnnotations?: boolean;
  onAnnotationAdd?: (annotation: DocumentAnnotation) => void;
  onAnnotationUpdate?: (annotation: DocumentAnnotation) => void;
  onAnnotationDelete?: (annotationId: string) => void;
}

export interface DocumentAnnotation {
  id: string;
  documentId: string;
  type: AnnotationType;
  page: number;
  coordinates: { x: number; y: number; width: number; height: number };
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
  isResolved?: boolean;
}

export enum AnnotationType {
  NOTE = 'note',
  HIGHLIGHT = 'highlight',
  ISSUE = 'issue',
  APPROVAL = 'approval',
  QUESTION = 'question'
}

// ============================================================================
// BULK OPERATIONS
// ============================================================================

export interface BulkDocumentOperation {
  operationType: BulkOperationType;
  documentIds: string[];
  parameters?: Record<string, any>;
  performedBy: string;
  performedAt: string;
  results?: BulkOperationResult[];
}

export enum BulkOperationType {
  APPROVE_ALL = 'approve_all',
  REJECT_ALL = 'reject_all',
  REQUEST_RESUBMISSION = 'request_resubmission',
  DELETE_ALL = 'delete_all',
  DOWNLOAD_ALL = 'download_all',
  ASSIGN_REVIEWER = 'assign_reviewer'
}

export interface BulkOperationResult {
  documentId: string;
  success: boolean;
  error?: string;
}

// ============================================================================
// DOCUMENT STORE INTERFACES
// ============================================================================

export interface DocumentStore {
  // State
  documents: DocumentUpload[];
  uploadQueue: UploadProgress[];
  selectedDocuments: string[];
  filterCriteria: DocumentFilter;
  sortCriteria: DocumentSort;
  loading: boolean;
  error: string | null;

  // Actions
  uploadDocument: (file: File, applicationId: string, documentType: DocumentType) => Promise<string>;
  uploadMultipleDocuments: (files: FileList, applicationId: string, documentType: DocumentType) => Promise<string[]>;
  cancelUpload: (documentId: string) => void;
  deleteDocument: (documentId: string) => Promise<void>;
  reviewDocument: (documentId: string, review: Omit<DocumentReview, 'id' | 'reviewedAt'>) => Promise<void>;
  downloadDocument: (documentId: string) => Promise<void>;
  downloadMultipleDocuments: (documentIds: string[]) => Promise<void>;
  
  // Filters and Search
  filterDocuments: (filter: DocumentFilter) => void;
  sortDocuments: (sort: DocumentSort) => void;
  searchDocuments: (query: string) => void;
  
  // Selection
  selectDocument: (documentId: string) => void;
  selectMultipleDocuments: (documentIds: string[]) => void;
  clearSelection: () => void;
  
  // Bulk Operations
  performBulkOperation: (operation: BulkDocumentOperation) => Promise<BulkOperationResult[]>;
}

export interface DocumentFilter {
  applicationId?: string;
  documentType?: DocumentType;
  status?: DocumentUploadStatus;
  uploadedBy?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  reviewStatus?: DocumentReviewStatus;
  hasIssues?: boolean;
}

export interface DocumentSort {
  field: 'uploadedAt' | 'fileName' | 'fileSize' | 'status' | 'reviewedAt';
  direction: 'asc' | 'desc';
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export const DOCUMENT_TYPE_CONFIGS: Record<DocumentType, DocumentRequirement> = {
  [DocumentType.INTERNATIONAL_PASSPORT]: {
    documentType: DocumentType.INTERNATIONAL_PASSPORT,
    isRequired: true,
    acceptedFormats: ['image/jpeg', 'image/png', 'application/pdf'],
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxPages: 10,
    minimumResolution: '300dpi',
    description: 'Upload clear, high-quality images of all pages of your international passport',
    examples: ['Passport bio page', 'Passport pages with stamps', 'Passport back cover'],
    validationRules: [
      {
        type: DocumentValidationType.FILE_SIZE,
        value: 10 * 1024 * 1024,
        errorMessage: 'File size must be less than 10MB'
      },
      {
        type: DocumentValidationType.FILE_FORMAT,
        value: ['image/jpeg', 'image/png', 'application/pdf'],
        errorMessage: 'Only JPEG, PNG, and PDF files are allowed'
      }
    ]
  },
  [DocumentType.EDUCATION_DOCUMENT]: {
    documentType: DocumentType.EDUCATION_DOCUMENT,
    isRequired: true,
    acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFileSize: 15 * 1024 * 1024, // 15MB
    maxPages: 20,
    description: 'Upload your education certificates, transcripts, and degrees',
    examples: ['Nursing degree certificate', 'University transcripts', 'Diploma certificates'],
    validationRules: [
      {
        type: DocumentValidationType.FILE_SIZE,
        value: 15 * 1024 * 1024,
        errorMessage: 'File size must be less than 15MB'
      },
      {
        type: DocumentValidationType.TEXT_PRESENCE,
        value: true,
        errorMessage: 'Document must contain readable text'
      }
    ]
  },
  [DocumentType.LICENSE_DOCUMENT]: {
    documentType: DocumentType.LICENSE_DOCUMENT,
    isRequired: true,
    acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxPages: 5,
    description: 'Upload your professional license and registration documents',
    examples: ['Nursing license', 'Medical license', 'Registration certificate'],
    validationRules: [
      {
        type: DocumentValidationType.EXPIRY_DATE,
        value: true,
        errorMessage: 'License must not be expired'
      }
    ]
  },
  [DocumentType.WORK_EXPERIENCE_DOCUMENT]: {
    documentType: DocumentType.WORK_EXPERIENCE_DOCUMENT,
    isRequired: false,
    acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFileSize: 15 * 1024 * 1024, // 15MB
    maxPages: 15,
    description: 'Upload work experience letters, certificates, and employment records',
    examples: ['Employment verification letter', 'Work experience certificate', 'Reference letters'],
    validationRules: [
      {
        type: DocumentValidationType.FILE_SIZE,
        value: 15 * 1024 * 1024,
        errorMessage: 'File size must be less than 15MB'
      }
    ]
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const DEFAULT_UPLOAD_CONFIG: UploadConfig = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedTypes: [
    'application/pdf',
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/tiff',
    'image/bmp'
  ],
  maxConcurrentUploads: 3,
  chunkSize: 1024 * 1024, // 1MB chunks
  retryAttempts: 3,
  enableThumbnails: true,
  enableOCR: true
};

export function validateDocumentFile(file: File, documentType: DocumentType): { valid: boolean; errors: string[] } {
  const config = DOCUMENT_TYPE_CONFIGS[documentType];
  const errors: string[] = [];

  // Check file size
  if (file.size > config.maxFileSize) {
    errors.push(`File size (${formatFileSize(file.size)}) exceeds maximum allowed size (${formatFileSize(config.maxFileSize)})`);
  }

  // Check file format
  if (!config.acceptedFormats.includes(file.type)) {
    errors.push(`File format (${file.type}) is not allowed. Accepted formats: ${config.acceptedFormats.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
}

export function getDocumentTypeDisplayName(type: DocumentType): string {
  const names: Record<DocumentType, string> = {
    [DocumentType.INTERNATIONAL_PASSPORT]: 'International Passport',
    [DocumentType.EDUCATION_DOCUMENT]: 'Education Certificate',
    [DocumentType.LICENSE_DOCUMENT]: 'Professional License',
    [DocumentType.WORK_EXPERIENCE_DOCUMENT]: 'Work Experience Letter'
  };
  return names[type] || type;
}

export function getStatusColor(status: DocumentUploadStatus): { bg: string; text: string; border: string } {
  const colors: Record<DocumentUploadStatus, { bg: string; text: string; border: string }> = {
    [DocumentUploadStatus.UPLOADING]: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    [DocumentUploadStatus.UPLOADED]: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
    [DocumentUploadStatus.PROCESSING]: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    [DocumentUploadStatus.PENDING_REVIEW]: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    [DocumentUploadStatus.UNDER_REVIEW]: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    [DocumentUploadStatus.APPROVED]: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    [DocumentUploadStatus.REJECTED]: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    [DocumentUploadStatus.REQUIRES_RESUBMISSION]: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    [DocumentUploadStatus.EXPIRED]: { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' }
  };
  return colors[status] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
}