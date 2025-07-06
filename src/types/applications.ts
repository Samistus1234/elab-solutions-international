/**
 * Application Management Types for ELAB Solutions International
 * 
 * This file contains all application-related type definitions for the
 * enhanced role-based dashboard system.
 */

import type { ID, ISOString } from './index';
import type { User } from './business';

// ============================================================================
// APPLICATION TYPES AND ENUMS
// ============================================================================

export enum ApplicationType {
  DATAFLOW = 'dataflow',
  MUMARIS_PLUS = 'mumaris_plus',
  SHERYAN = 'sheryan', 
  DATAFLOW_VERIFICATION = 'dataflow_verification',
  LICENSE_RENEWAL = 'license_renewal',
  EXAM_BOOKING = 'exam_booking'
}

export enum ApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  IN_PROGRESS = 'in_progress',
  UNDER_REVIEW = 'under_review',
  PENDING_DOCUMENTS = 'pending_documents',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ApplicationStage {
  CREATED = 'created',
  DOCUMENTS_COLLECTED = 'documents_collected',
  DOCUMENTS_REVIEWED = 'documents_reviewed',
  APPLICATION_PREPARED = 'application_prepared',
  SUBMITTED_TO_AUTHORITY = 'submitted_to_authority',
  AUTHORITY_PROCESSING = 'authority_processing',
  RESULTS_RECEIVED = 'results_received',
  COMPLETED = 'completed'
}

export enum DocumentType {
  INTERNATIONAL_PASSPORT = 'international_passport',
  EDUCATION_DOCUMENT = 'education_document',
  LICENSE_DOCUMENT = 'license_document',
  WORK_EXPERIENCE_DOCUMENT = 'work_experience_document'
}

export enum DocumentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REQUIRES_UPDATE = 'requires_update'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed'
}

export enum MessageType {
  SYSTEM = 'system',
  USER = 'user',
  DOCUMENT_REQUEST = 'document_request',
  STATUS_UPDATE = 'status_update'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

// ============================================================================
// CORE INTERFACES
// ============================================================================

export interface Application {
  readonly id: ID;
  readonly type: ApplicationType;
  readonly applicantId: ID;
  readonly consultantId?: ID;
  readonly status: ApplicationStatus;
  readonly stage: ApplicationStage;
  readonly priority: Priority;
  readonly title: string;
  readonly description?: string;
  readonly targetCountry: string;
  readonly estimatedCompletion?: ISOString;
  readonly documents: Document[];
  readonly payments: Payment[];
  readonly communications: Message[];
  readonly timeline: TimelineEvent[];
  readonly metadata: ApplicationMetadata;
  readonly createdAt: ISOString;
  readonly updatedAt: ISOString;
  readonly completedAt?: ISOString;
}

export interface Document {
  readonly id: ID;
  readonly applicationId: ID;
  readonly type: DocumentType;
  readonly status: DocumentStatus;
  readonly title: string;
  readonly description?: string;
  readonly fileName: string;
  readonly fileUrl: string;
  readonly fileSize: number;
  readonly mimeType: string;
  readonly uploadedBy: ID;
  readonly reviewedBy?: ID;
  readonly reviewComments?: string;
  readonly isRequired: boolean;
  readonly uploadedAt: ISOString;
  readonly reviewedAt?: ISOString;
}

export interface Payment {
  readonly id: ID;
  readonly applicationId: ID;
  readonly amount: number;
  readonly currency: string;
  readonly status: PaymentStatus;
  readonly description: string;
  readonly paymentMethod?: string;
  readonly transactionId?: string;
  readonly paidAt?: ISOString;
  readonly createdAt: ISOString;
}

export interface Message {
  readonly id: ID;
  readonly applicationId: ID;
  readonly senderId: ID;
  readonly receiverId?: ID; // null for broadcast messages
  readonly type: MessageType;
  readonly subject?: string;
  readonly content: string;
  readonly attachments: MessageAttachment[];
  readonly isRead: boolean;
  readonly isSystemGenerated: boolean;
  readonly priority: Priority;
  readonly createdAt: ISOString;
  readonly readAt?: ISOString;
}

export interface MessageAttachment {
  readonly id: ID;
  readonly fileName: string;
  readonly fileUrl: string;
  readonly fileSize: number;
  readonly mimeType: string;
}

export interface TimelineEvent {
  readonly id: ID;
  readonly applicationId: ID;
  readonly userId?: ID;
  readonly type: 'status_change' | 'stage_change' | 'document_upload' | 'payment' | 'message' | 'system';
  readonly title: string;
  readonly description?: string;
  readonly previousValue?: string;
  readonly newValue?: string;
  readonly metadata?: Record<string, any>;
  readonly createdAt: ISOString;
}

export interface ApplicationMetadata {
  readonly tags?: string[];
  readonly urgentFlags?: string[];
  readonly customFields?: Record<string, any>;
  readonly integrationData?: Record<string, any>;
}

// ============================================================================
// ROLE-BASED VIEW INTERFACES
// ============================================================================

export interface AdminApplicationView extends Application {
  readonly applicant: User;
  readonly consultant?: User;
  readonly analytics: ApplicationAnalytics;
}

export interface ConsultantApplicationView extends Application {
  readonly applicant: User;
  readonly assignedDate?: ISOString;
  readonly workload: number;
}

export interface ApplicantApplicationView extends Application {
  readonly consultant?: Pick<User, 'id' | 'profile'>;
  readonly progressPercentage: number;
  readonly nextStepDescription?: string;
  readonly estimatedTimeRemaining?: string;
}

export interface ApplicationAnalytics {
  readonly timeInCurrentStage: number; // days
  readonly totalProcessingTime: number; // days
  readonly documentsCompletionRate: number; // percentage
  readonly communicationCount: number;
  readonly delayReason?: string;
}

// ============================================================================
// DASHBOARD SUMMARY INTERFACES
// ============================================================================

export interface DashboardSummary {
  readonly totalApplications: number;
  readonly activeApplications: number;
  readonly completedApplications: number;
  readonly pendingDocuments: number;
  readonly pendingPayments: number;
  readonly recentActivity: TimelineEvent[];
}

export interface AdminDashboardSummary extends DashboardSummary {
  readonly consultantWorkload: ConsultantWorkload[];
  readonly applicationsByType: Record<ApplicationType, number>;
  readonly applicationsByStage: Record<ApplicationStage, number>;
  readonly averageProcessingTime: number;
  readonly revenue: RevenueSummary;
}

export interface ConsultantDashboardSummary extends DashboardSummary {
  readonly assignedApplications: number;
  readonly avgProcessingTime: number;
  readonly performanceScore: number;
  readonly urgentApplications: number;
}

export interface ApplicantDashboardSummary extends DashboardSummary {
  readonly nextActions: NextAction[];
  readonly upcomingDeadlines: Deadline[];
  readonly documentsNeeded: DocumentType[];
}

export interface ConsultantWorkload {
  readonly consultantId: ID;
  readonly consultantName: string;
  readonly activeApplications: number;
  readonly averageProcessingTime: number;
  readonly performanceScore: number;
}

export interface RevenueSummary {
  readonly totalRevenue: number;
  readonly pendingRevenue: number;
  readonly monthlyRevenue: number;
  readonly revenueByType: Record<ApplicationType, number>;
}

export interface NextAction {
  readonly id: ID;
  readonly applicationId: ID;
  readonly title: string;
  readonly description: string;
  readonly dueDate?: ISOString;
  readonly priority: Priority;
}

export interface Deadline {
  readonly id: ID;
  readonly applicationId: ID;
  readonly title: string;
  readonly dueDate: ISOString;
  readonly type: 'document_submission' | 'payment' | 'review' | 'external_deadline';
}

// ============================================================================
// API REQUEST/RESPONSE INTERFACES
// ============================================================================

export interface CreateApplicationRequest {
  readonly type: ApplicationType;
  readonly applicantId: ID;
  readonly consultantId?: ID;
  readonly title: string;
  readonly description?: string;
  readonly targetCountry: string;
  readonly priority?: Priority;
  readonly metadata?: ApplicationMetadata;
}

export interface UpdateApplicationRequest {
  readonly status?: ApplicationStatus;
  readonly stage?: ApplicationStage;
  readonly consultantId?: ID;
  readonly priority?: Priority;
  readonly description?: string;
  readonly estimatedCompletion?: ISOString;
}

export interface UploadDocumentRequest {
  readonly applicationId: ID;
  readonly type: DocumentType;
  readonly title: string;
  readonly description?: string;
  readonly file: File;
}

export interface ReviewDocumentRequest {
  readonly status: DocumentStatus;
  readonly comments?: string;
}

export interface SendMessageRequest {
  readonly applicationId: ID;
  readonly receiverId?: ID;
  readonly subject?: string;
  readonly content: string;
  readonly type?: MessageType;
  readonly priority?: Priority;
  readonly attachments?: File[];
}

export interface ProcessPaymentRequest {
  readonly applicationId: ID;
  readonly amount: number;
  readonly currency: string;
  readonly description: string;
  readonly paymentMethod: string;
}

// ============================================================================
// FILTER AND SEARCH INTERFACES
// ============================================================================

export interface ApplicationFilters {
  readonly status?: ApplicationStatus[];
  readonly stage?: ApplicationStage[];
  readonly type?: ApplicationType[];
  readonly consultantId?: ID[];
  readonly applicantId?: ID[];
  readonly priority?: Priority[];
  readonly dateRange?: {
    readonly from: ISOString;
    readonly to: ISOString;
  };
  readonly hasUnreadMessages?: boolean;
  readonly hasPendingDocuments?: boolean;
  readonly hasPendingPayments?: boolean;
}

export interface ApplicationSearchQuery {
  readonly query?: string; // search in title, description, applicant name
  readonly filters?: ApplicationFilters;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'stage' | 'status';
  readonly sortOrder?: 'asc' | 'desc';
  readonly page?: number;
  readonly limit?: number;
}