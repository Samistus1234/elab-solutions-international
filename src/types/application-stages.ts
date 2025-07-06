/**
 * Application Stage Progression Types
 * 
 * Comprehensive stage management for application lifecycle
 */

import { UserRole } from './business';
import { DocumentUploadStatus } from './documents';

// ============================================================================
// APPLICATION STAGES
// ============================================================================

export enum ApplicationStage {
  // Initial stages
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  
  // Document processing
  DOCUMENT_REVIEW = 'document_review',
  DOCUMENT_VERIFICATION = 'document_verification',
  ADDITIONAL_DOCUMENTS_REQUIRED = 'additional_documents_required',
  
  // Processing stages
  INITIAL_ASSESSMENT = 'initial_assessment',
  CREDENTIAL_EVALUATION = 'credential_evaluation',
  ELIGIBILITY_VERIFICATION = 'eligibility_verification',
  
  // External processing (varies by application type)
  DATAFLOW_PROCESSING = 'dataflow_processing',
  MUMARIS_PROCESSING = 'mumaris_processing',
  SHERYAN_PROCESSING = 'sheryan_processing',
  LICENSE_RENEWAL_PROCESSING = 'license_renewal_processing',
  EXAM_BOOKING_PROCESSING = 'exam_booking_processing',
  
  // Quality assurance
  QUALITY_REVIEW = 'quality_review',
  FINAL_VERIFICATION = 'final_verification',
  
  // External submission
  PENDING_EXTERNAL_SUBMISSION = 'pending_external_submission',
  SUBMITTED_TO_AUTHORITY = 'submitted_to_authority',
  AWAITING_AUTHORITY_RESPONSE = 'awaiting_authority_response',
  
  // Completion states
  APPROVED = 'approved',
  COMPLETED = 'completed',
  
  // Issue states
  REJECTED = 'rejected',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired'
}

export enum StageCategory {
  INITIAL = 'initial',
  DOCUMENT_PROCESSING = 'document_processing',
  ASSESSMENT = 'assessment',
  EXTERNAL_PROCESSING = 'external_processing',
  QUALITY_ASSURANCE = 'quality_assurance',
  EXTERNAL_SUBMISSION = 'external_submission',
  COMPLETION = 'completion',
  ISSUES = 'issues'
}

export interface StageDefinition {
  stage: ApplicationStage;
  category: StageCategory;
  displayName: string;
  description: string;
  estimatedDuration: string;
  requiredRoles: UserRole[];
  autoProgressConditions?: StageProgressCondition[];
  allowedTransitions: ApplicationStage[];
  isTerminal: boolean;
  requiresUserAction: boolean;
  notificationSettings: StageNotificationSettings;
}

// ============================================================================
// STAGE PROGRESSION
// ============================================================================

export interface StageTransition {
  id: string;
  applicationId: string;
  fromStage: ApplicationStage;
  toStage: ApplicationStage;
  transitionedAt: string;
  transitionedBy: string;
  transitionedByName: string;
  transitionedByRole: UserRole;
  reason?: string;
  notes?: string;
  automaticTransition: boolean;
  requiresApproval?: boolean;
  approvedBy?: string;
  approvedAt?: string;
  metadata?: Record<string, any>;
}

export interface StageProgressCondition {
  type: ProgressConditionType;
  parameters: Record<string, any>;
  description: string;
}

export enum ProgressConditionType {
  ALL_DOCUMENTS_APPROVED = 'all_documents_approved',
  SPECIFIC_DOCUMENTS_APPROVED = 'specific_documents_approved',
  TIME_ELAPSED = 'time_elapsed',
  EXTERNAL_API_CONFIRMATION = 'external_api_confirmation',
  MANUAL_APPROVAL = 'manual_approval',
  PAYMENT_COMPLETED = 'payment_completed',
  QUALITY_SCORE_THRESHOLD = 'quality_score_threshold'
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface StageNotificationSettings {
  notifyApplicant: boolean;
  notifyConsultant: boolean;
  notifyAdmin: boolean;
  emailTemplate?: string;
  smsTemplate?: string;
  inAppNotification: boolean;
  urgencyLevel: NotificationUrgency;
}

export enum NotificationUrgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface StageNotification {
  id: string;
  applicationId: string;
  stage: ApplicationStage;
  recipientId: string;
  recipientRole: UserRole;
  type: NotificationType;
  title: string;
  message: string;
  urgency: NotificationUrgency;
  sentAt: string;
  readAt?: string;
  actionRequired: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export enum NotificationType {
  STAGE_ENTERED = 'stage_entered',
  STAGE_COMPLETED = 'stage_completed',
  ACTION_REQUIRED = 'action_required',
  DEADLINE_APPROACHING = 'deadline_approaching',
  DEADLINE_MISSED = 'deadline_missed',
  ISSUE_DETECTED = 'issue_detected',
  APPROVAL_REQUESTED = 'approval_requested'
}

// ============================================================================
// STAGE TIMELINE
// ============================================================================

export interface StageTimelineEntry {
  id: string;
  applicationId: string;
  stage: ApplicationStage;
  enteredAt: string;
  completedAt?: string;
  duration?: number; // in milliseconds
  assignedTo?: string[];
  assignedToNames?: string[];
  status: StageStatus;
  progress: number; // 0-100
  issues: StageIssue[];
  actions: StageAction[];
  notes: StageNote[];
  metadata?: Record<string, any>;
}

export enum StageStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  WAITING_FOR_INPUT = 'waiting_for_input',
  WAITING_FOR_APPROVAL = 'waiting_for_approval',
  BLOCKED = 'blocked',
  COMPLETED = 'completed',
  SKIPPED = 'skipped'
}

export interface StageIssue {
  id: string;
  type: StageIssueType;
  severity: IssueSeverity;
  title: string;
  description: string;
  reportedAt: string;
  reportedBy: string;
  resolvedAt?: string;
  resolvedBy?: string;
  resolution?: string;
}

export enum StageIssueType {
  MISSING_DOCUMENT = 'missing_document',
  INVALID_DOCUMENT = 'invalid_document',
  EXTERNAL_API_ERROR = 'external_api_error',
  PROCESSING_DELAY = 'processing_delay',
  QUALITY_CONCERN = 'quality_concern',
  COMPLIANCE_ISSUE = 'compliance_issue',
  TECHNICAL_ERROR = 'technical_error'
}

export enum IssueSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
  BLOCKING = 'blocking'
}

export interface StageAction {
  id: string;
  type: StageActionType;
  title: string;
  description: string;
  requiredRole: UserRole;
  dueDate?: string;
  completedAt?: string;
  completedBy?: string;
  result?: string;
  url?: string;
}

export enum StageActionType {
  REVIEW_DOCUMENTS = 'review_documents',
  APPROVE_APPLICATION = 'approve_application',
  REQUEST_ADDITIONAL_INFO = 'request_additional_info',
  SCHEDULE_INTERVIEW = 'schedule_interview',
  SUBMIT_TO_EXTERNAL = 'submit_to_external',
  VERIFY_CREDENTIALS = 'verify_credentials',
  PROCESS_PAYMENT = 'process_payment',
  GENERATE_CERTIFICATE = 'generate_certificate'
}

export interface StageNote {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  createdAt: string;
  isInternal: boolean;
  attachments?: string[];
}

// ============================================================================
// STAGE STORE INTERFACE
// ============================================================================

export interface StageStore {
  // State
  stageDefinitions: Record<ApplicationStage, StageDefinition>;
  transitions: StageTransition[];
  notifications: StageNotification[];
  timeline: Record<string, StageTimelineEntry[]>; // applicationId -> timeline
  loading: boolean;
  error: string | null;
  
  // Actions
  transitionStage: (applicationId: string, toStage: ApplicationStage, reason?: string, notes?: string) => Promise<void>;
  approveTransition: (transitionId: string) => Promise<void>;
  rejectTransition: (transitionId: string, reason: string) => Promise<void>;
  addStageNote: (applicationId: string, stage: ApplicationStage, note: Omit<StageNote, 'id' | 'createdAt'>) => Promise<void>;
  reportStageIssue: (applicationId: string, stage: ApplicationStage, issue: Omit<StageIssue, 'id' | 'reportedAt'>) => Promise<void>;
  resolveStageIssue: (issueId: string, resolution: string) => Promise<void>;
  assignStageToUser: (applicationId: string, stage: ApplicationStage, userId: string) => Promise<void>;
  updateStageProgress: (applicationId: string, stage: ApplicationStage, progress: number) => Promise<void>;
  
  // Notifications
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  getUnreadNotifications: (userId: string) => StageNotification[];
  
  // Timeline
  getApplicationTimeline: (applicationId: string) => StageTimelineEntry[];
  getCurrentStage: (applicationId: string) => ApplicationStage | null;
  getStageProgress: (applicationId: string, stage: ApplicationStage) => number;
  
  // Automation
  checkAutoProgressConditions: (applicationId: string) => Promise<void>;
  scheduleAutomaticTransitions: () => Promise<void>;
  
  // Analytics
  getStageStatistics: () => Record<ApplicationStage, { count: number; averageDuration: number }>;
  getBottleneckAnalysis: () => { stage: ApplicationStage; averageTime: number; issueCount: number }[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface StageFilter {
  stages?: ApplicationStage[];
  categories?: StageCategory[];
  assignedTo?: string;
  status?: StageStatus;
  dateRange?: {
    start: string;
    end: string;
  };
  hasIssues?: boolean;
}

export interface StageSummary {
  applicationId: string;
  currentStage: ApplicationStage;
  stageEnteredAt: string;
  progress: number;
  estimatedCompletion?: string;
  assignedTo?: string[];
  issueCount: number;
  actionItems: number;
}

// ============================================================================
// STAGE CONFIGURATIONS
// ============================================================================

export const STAGE_FLOW_CONFIGS: Record<string, ApplicationStage[]> = {
  dataflow: [
    ApplicationStage.DRAFT,
    ApplicationStage.SUBMITTED,
    ApplicationStage.DOCUMENT_REVIEW,
    ApplicationStage.DOCUMENT_VERIFICATION,
    ApplicationStage.INITIAL_ASSESSMENT,
    ApplicationStage.CREDENTIAL_EVALUATION,
    ApplicationStage.DATAFLOW_PROCESSING,
    ApplicationStage.QUALITY_REVIEW,
    ApplicationStage.PENDING_EXTERNAL_SUBMISSION,
    ApplicationStage.SUBMITTED_TO_AUTHORITY,
    ApplicationStage.AWAITING_AUTHORITY_RESPONSE,
    ApplicationStage.COMPLETED
  ],
  mumaris_plus: [
    ApplicationStage.DRAFT,
    ApplicationStage.SUBMITTED,
    ApplicationStage.DOCUMENT_REVIEW,
    ApplicationStage.DOCUMENT_VERIFICATION,
    ApplicationStage.ELIGIBILITY_VERIFICATION,
    ApplicationStage.MUMARIS_PROCESSING,
    ApplicationStage.QUALITY_REVIEW,
    ApplicationStage.PENDING_EXTERNAL_SUBMISSION,
    ApplicationStage.SUBMITTED_TO_AUTHORITY,
    ApplicationStage.AWAITING_AUTHORITY_RESPONSE,
    ApplicationStage.COMPLETED
  ],
  sheryan: [
    ApplicationStage.DRAFT,
    ApplicationStage.SUBMITTED,
    ApplicationStage.DOCUMENT_REVIEW,
    ApplicationStage.CREDENTIAL_EVALUATION,
    ApplicationStage.SHERYAN_PROCESSING,
    ApplicationStage.FINAL_VERIFICATION,
    ApplicationStage.COMPLETED
  ],
  license_renewal: [
    ApplicationStage.DRAFT,
    ApplicationStage.SUBMITTED,
    ApplicationStage.DOCUMENT_REVIEW,
    ApplicationStage.LICENSE_RENEWAL_PROCESSING,
    ApplicationStage.FINAL_VERIFICATION,
    ApplicationStage.COMPLETED
  ],
  exam_booking: [
    ApplicationStage.DRAFT,
    ApplicationStage.SUBMITTED,
    ApplicationStage.DOCUMENT_REVIEW,
    ApplicationStage.ELIGIBILITY_VERIFICATION,
    ApplicationStage.EXAM_BOOKING_PROCESSING,
    ApplicationStage.COMPLETED
  ]
};