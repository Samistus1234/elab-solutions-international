/**
 * Application Stage Management Store
 * 
 * Zustand store for application stage progression and lifecycle management
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  ApplicationStage,
  StageCategory,
  StageDefinition,
  StageTransition,
  StageTimelineEntry,
  StageNotification,
  StageStatus,
  StageNote,
  StageIssue,
  StageAction,
  NotificationType,
  NotificationUrgency,
  StageActionType,
  StageIssueType,
  IssueSeverity,
  ProgressConditionType,
  type StageStore as IStageStore,
  STAGE_FLOW_CONFIGS
} from '@/types/application-stages';
import { UserRole } from '@/types/business';
import { generateId } from '@/lib/utils/id-generator';

// ============================================================================
// STAGE DEFINITIONS
// ============================================================================

const STAGE_DEFINITIONS: Record<ApplicationStage, StageDefinition> = {
  [ApplicationStage.DRAFT]: {
    stage: ApplicationStage.DRAFT,
    category: StageCategory.INITIAL,
    displayName: 'Draft',
    description: 'Application is being prepared by the applicant',
    estimatedDuration: '1-3 days',
    requiredRoles: [UserRole.APPLICANT],
    allowedTransitions: [ApplicationStage.SUBMITTED, ApplicationStage.CANCELLED],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: false,
      notifyAdmin: false,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.LOW
    }
  },
  
  [ApplicationStage.SUBMITTED]: {
    stage: ApplicationStage.SUBMITTED,
    category: StageCategory.INITIAL,
    displayName: 'Submitted',
    description: 'Application has been submitted and is awaiting initial review',
    estimatedDuration: '1-2 business days',
    requiredRoles: [UserRole.CONSULTANT, UserRole.ADMIN],
    autoProgressConditions: [
      {
        type: ProgressConditionType.TIME_ELAPSED,
        parameters: { hours: 24 },
        description: 'Automatically move to document review after 24 hours'
      }
    ],
    allowedTransitions: [ApplicationStage.DOCUMENT_REVIEW, ApplicationStage.REJECTED],
    isTerminal: false,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      emailTemplate: 'application_submitted',
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.DOCUMENT_REVIEW]: {
    stage: ApplicationStage.DOCUMENT_REVIEW,
    category: StageCategory.DOCUMENT_PROCESSING,
    displayName: 'Document Review',
    description: 'Documents are being reviewed for completeness and accuracy',
    estimatedDuration: '3-5 business days',
    requiredRoles: [UserRole.CONSULTANT, UserRole.ADMIN],
    autoProgressConditions: [
      {
        type: ProgressConditionType.ALL_DOCUMENTS_APPROVED,
        parameters: {},
        description: 'Move to verification when all documents are approved'
      }
    ],
    allowedTransitions: [
      ApplicationStage.DOCUMENT_VERIFICATION,
      ApplicationStage.ADDITIONAL_DOCUMENTS_REQUIRED,
      ApplicationStage.REJECTED
    ],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: false,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.DOCUMENT_VERIFICATION]: {
    stage: ApplicationStage.DOCUMENT_VERIFICATION,
    category: StageCategory.DOCUMENT_PROCESSING,
    displayName: 'Document Verification',
    description: 'Documents are being verified with issuing authorities',
    estimatedDuration: '5-10 business days',
    requiredRoles: [UserRole.CONSULTANT, UserRole.ADMIN],
    allowedTransitions: [
      ApplicationStage.INITIAL_ASSESSMENT,
      ApplicationStage.CREDENTIAL_EVALUATION,
      ApplicationStage.ELIGIBILITY_VERIFICATION,
      ApplicationStage.ADDITIONAL_DOCUMENTS_REQUIRED
    ],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: false,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.ADDITIONAL_DOCUMENTS_REQUIRED]: {
    stage: ApplicationStage.ADDITIONAL_DOCUMENTS_REQUIRED,
    category: StageCategory.DOCUMENT_PROCESSING,
    displayName: 'Additional Documents Required',
    description: 'Additional documents or clarifications are needed from the applicant',
    estimatedDuration: 'Pending applicant response',
    requiredRoles: [UserRole.APPLICANT],
    allowedTransitions: [ApplicationStage.DOCUMENT_REVIEW, ApplicationStage.CANCELLED],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: false,
      emailTemplate: 'additional_documents_required',
      smsTemplate: 'additional_docs_sms',
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.HIGH
    }
  },

  [ApplicationStage.INITIAL_ASSESSMENT]: {
    stage: ApplicationStage.INITIAL_ASSESSMENT,
    category: StageCategory.ASSESSMENT,
    displayName: 'Initial Assessment',
    description: 'Application is undergoing initial eligibility assessment',
    estimatedDuration: '3-5 business days',
    requiredRoles: [UserRole.CONSULTANT, UserRole.ADMIN],
    allowedTransitions: [
      ApplicationStage.CREDENTIAL_EVALUATION,
      ApplicationStage.DATAFLOW_PROCESSING,
      ApplicationStage.REJECTED
    ],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: false,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.CREDENTIAL_EVALUATION]: {
    stage: ApplicationStage.CREDENTIAL_EVALUATION,
    category: StageCategory.ASSESSMENT,
    displayName: 'Credential Evaluation',
    description: 'Educational and professional credentials are being evaluated',
    estimatedDuration: '7-10 business days',
    requiredRoles: [UserRole.CONSULTANT, UserRole.ADMIN],
    allowedTransitions: [
      ApplicationStage.DATAFLOW_PROCESSING,
      ApplicationStage.SHERYAN_PROCESSING,
      ApplicationStage.QUALITY_REVIEW,
      ApplicationStage.REJECTED
    ],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: false,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.ELIGIBILITY_VERIFICATION]: {
    stage: ApplicationStage.ELIGIBILITY_VERIFICATION,
    category: StageCategory.ASSESSMENT,
    displayName: 'Eligibility Verification',
    description: 'Verifying eligibility requirements for the target country',
    estimatedDuration: '5-7 business days',
    requiredRoles: [UserRole.CONSULTANT, UserRole.ADMIN],
    allowedTransitions: [
      ApplicationStage.MUMARIS_PROCESSING,
      ApplicationStage.EXAM_BOOKING_PROCESSING,
      ApplicationStage.REJECTED
    ],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: false,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  // External Processing Stages
  [ApplicationStage.DATAFLOW_PROCESSING]: {
    stage: ApplicationStage.DATAFLOW_PROCESSING,
    category: StageCategory.EXTERNAL_PROCESSING,
    displayName: 'DataFlow Processing',
    description: 'Application is being processed through DataFlow system',
    estimatedDuration: '15-20 business days',
    requiredRoles: [UserRole.ADMIN],
    allowedTransitions: [ApplicationStage.QUALITY_REVIEW, ApplicationStage.ON_HOLD],
    isTerminal: false,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.MUMARIS_PROCESSING]: {
    stage: ApplicationStage.MUMARIS_PROCESSING,
    category: StageCategory.EXTERNAL_PROCESSING,
    displayName: 'MUMARIS+ Processing',
    description: 'Application is being processed through MUMARIS+ system',
    estimatedDuration: '10-15 business days',
    requiredRoles: [UserRole.ADMIN],
    allowedTransitions: [ApplicationStage.QUALITY_REVIEW, ApplicationStage.ON_HOLD],
    isTerminal: false,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.SHERYAN_PROCESSING]: {
    stage: ApplicationStage.SHERYAN_PROCESSING,
    category: StageCategory.EXTERNAL_PROCESSING,
    displayName: 'Sheryan Processing',
    description: 'Application is being processed through Sheryan system',
    estimatedDuration: '7-10 business days',
    requiredRoles: [UserRole.ADMIN],
    allowedTransitions: [ApplicationStage.FINAL_VERIFICATION, ApplicationStage.ON_HOLD],
    isTerminal: false,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.LICENSE_RENEWAL_PROCESSING]: {
    stage: ApplicationStage.LICENSE_RENEWAL_PROCESSING,
    category: StageCategory.EXTERNAL_PROCESSING,
    displayName: 'License Renewal Processing',
    description: 'License renewal application is being processed',
    estimatedDuration: '5-7 business days',
    requiredRoles: [UserRole.ADMIN],
    allowedTransitions: [ApplicationStage.FINAL_VERIFICATION, ApplicationStage.ON_HOLD],
    isTerminal: false,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.EXAM_BOOKING_PROCESSING]: {
    stage: ApplicationStage.EXAM_BOOKING_PROCESSING,
    category: StageCategory.EXTERNAL_PROCESSING,
    displayName: 'Exam Booking Processing',
    description: 'Exam booking request is being processed',
    estimatedDuration: '3-5 business days',
    requiredRoles: [UserRole.ADMIN],
    allowedTransitions: [ApplicationStage.COMPLETED, ApplicationStage.ON_HOLD],
    isTerminal: false,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  // Quality Assurance Stages
  [ApplicationStage.QUALITY_REVIEW]: {
    stage: ApplicationStage.QUALITY_REVIEW,
    category: StageCategory.QUALITY_ASSURANCE,
    displayName: 'Quality Review',
    description: 'Application is undergoing final quality review',
    estimatedDuration: '2-3 business days',
    requiredRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    allowedTransitions: [
      ApplicationStage.FINAL_VERIFICATION,
      ApplicationStage.PENDING_EXTERNAL_SUBMISSION,
      ApplicationStage.ON_HOLD
    ],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: false,
      notifyConsultant: true,
      notifyAdmin: true,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.FINAL_VERIFICATION]: {
    stage: ApplicationStage.FINAL_VERIFICATION,
    category: StageCategory.QUALITY_ASSURANCE,
    displayName: 'Final Verification',
    description: 'Final verification before completion',
    estimatedDuration: '1-2 business days',
    requiredRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    allowedTransitions: [ApplicationStage.COMPLETED, ApplicationStage.ON_HOLD],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.HIGH
    }
  },

  // External Submission Stages
  [ApplicationStage.PENDING_EXTERNAL_SUBMISSION]: {
    stage: ApplicationStage.PENDING_EXTERNAL_SUBMISSION,
    category: StageCategory.EXTERNAL_SUBMISSION,
    displayName: 'Pending External Submission',
    description: 'Application is ready for submission to external authority',
    estimatedDuration: '1-3 business days',
    requiredRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    allowedTransitions: [ApplicationStage.SUBMITTED_TO_AUTHORITY, ApplicationStage.ON_HOLD],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.HIGH
    }
  },

  [ApplicationStage.SUBMITTED_TO_AUTHORITY]: {
    stage: ApplicationStage.SUBMITTED_TO_AUTHORITY,
    category: StageCategory.EXTERNAL_SUBMISSION,
    displayName: 'Submitted to Authority',
    description: 'Application has been submitted to the relevant authority',
    estimatedDuration: 'Pending authority response',
    requiredRoles: [],
    allowedTransitions: [ApplicationStage.AWAITING_AUTHORITY_RESPONSE],
    isTerminal: false,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      emailTemplate: 'submitted_to_authority',
      smsTemplate: 'authority_submission_sms',
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.AWAITING_AUTHORITY_RESPONSE]: {
    stage: ApplicationStage.AWAITING_AUTHORITY_RESPONSE,
    category: StageCategory.EXTERNAL_SUBMISSION,
    displayName: 'Awaiting Authority Response',
    description: 'Waiting for response from the relevant authority',
    estimatedDuration: '10-30 business days',
    requiredRoles: [],
    allowedTransitions: [ApplicationStage.APPROVED, ApplicationStage.REJECTED, ApplicationStage.ON_HOLD],
    isTerminal: false,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.LOW
    }
  },

  // Terminal Stages
  [ApplicationStage.APPROVED]: {
    stage: ApplicationStage.APPROVED,
    category: StageCategory.COMPLETION,
    displayName: 'Approved',
    description: 'Application has been approved by the authority',
    estimatedDuration: 'N/A',
    requiredRoles: [],
    allowedTransitions: [ApplicationStage.COMPLETED],
    isTerminal: false,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      emailTemplate: 'application_approved',
      smsTemplate: 'approval_sms',
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.HIGH
    }
  },

  [ApplicationStage.COMPLETED]: {
    stage: ApplicationStage.COMPLETED,
    category: StageCategory.COMPLETION,
    displayName: 'Completed',
    description: 'Application process has been completed successfully',
    estimatedDuration: 'N/A',
    requiredRoles: [],
    allowedTransitions: [],
    isTerminal: true,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      emailTemplate: 'application_completed',
      smsTemplate: 'completion_sms',
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.HIGH
    }
  },

  // Issue Stages
  [ApplicationStage.REJECTED]: {
    stage: ApplicationStage.REJECTED,
    category: StageCategory.ISSUES,
    displayName: 'Rejected',
    description: 'Application has been rejected',
    estimatedDuration: 'N/A',
    requiredRoles: [],
    allowedTransitions: [],
    isTerminal: true,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      emailTemplate: 'application_rejected',
      smsTemplate: 'rejection_sms',
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.HIGH
    }
  },

  [ApplicationStage.ON_HOLD]: {
    stage: ApplicationStage.ON_HOLD,
    category: StageCategory.ISSUES,
    displayName: 'On Hold',
    description: 'Application is temporarily on hold',
    estimatedDuration: 'Variable',
    requiredRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    allowedTransitions: [
      ApplicationStage.DOCUMENT_REVIEW,
      ApplicationStage.INITIAL_ASSESSMENT,
      ApplicationStage.QUALITY_REVIEW,
      ApplicationStage.CANCELLED
    ],
    isTerminal: false,
    requiresUserAction: true,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      emailTemplate: 'application_on_hold',
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.HIGH
    }
  },

  [ApplicationStage.CANCELLED]: {
    stage: ApplicationStage.CANCELLED,
    category: StageCategory.ISSUES,
    displayName: 'Cancelled',
    description: 'Application has been cancelled',
    estimatedDuration: 'N/A',
    requiredRoles: [],
    allowedTransitions: [],
    isTerminal: true,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      emailTemplate: 'application_cancelled',
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.MEDIUM
    }
  },

  [ApplicationStage.EXPIRED]: {
    stage: ApplicationStage.EXPIRED,
    category: StageCategory.ISSUES,
    displayName: 'Expired',
    description: 'Application has expired due to inactivity',
    estimatedDuration: 'N/A',
    requiredRoles: [],
    allowedTransitions: [],
    isTerminal: true,
    requiresUserAction: false,
    notificationSettings: {
      notifyApplicant: true,
      notifyConsultant: true,
      notifyAdmin: true,
      emailTemplate: 'application_expired',
      smsTemplate: 'expiry_sms',
      inAppNotification: true,
      urgencyLevel: NotificationUrgency.HIGH
    }
  }
};

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState = {
  stageDefinitions: STAGE_DEFINITIONS,
  transitions: [] as StageTransition[],
  notifications: [] as StageNotification[],
  timeline: {} as Record<string, StageTimelineEntry[]>,
  loading: false,
  error: null as string | null
};

// ============================================================================
// STAGE STORE IMPLEMENTATION
// ============================================================================

interface StageStore extends IStageStore {
  // Additional computed properties
  pendingTransitions: StageTransition[];
  recentNotifications: StageNotification[];
  
  // Utility methods
  getStageDefinition: (stage: ApplicationStage) => StageDefinition;
  validateTransition: (fromStage: ApplicationStage, toStage: ApplicationStage) => boolean;
  getNextPossibleStages: (currentStage: ApplicationStage) => ApplicationStage[];
  createMockTimeline: (applicationId: string, applicationType: string) => void;
}

export const useStageStore = create<StageStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // ========================================================================
        // COMPUTED PROPERTIES
        // ========================================================================

        get pendingTransitions() {
          return get().transitions.filter(t => t.requiresApproval && !t.approvedAt);
        },

        get recentNotifications() {
          const { notifications } = get();
          return notifications
            .filter(n => !n.readAt)
            .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
            .slice(0, 10);
        },

        // ========================================================================
        // UTILITY METHODS
        // ========================================================================

        getStageDefinition: (stage: ApplicationStage) => {
          return get().stageDefinitions[stage];
        },

        validateTransition: (fromStage: ApplicationStage, toStage: ApplicationStage) => {
          const definition = get().stageDefinitions[fromStage];
          return definition.allowedTransitions.includes(toStage);
        },

        getNextPossibleStages: (currentStage: ApplicationStage) => {
          const definition = get().stageDefinitions[currentStage];
          return definition.allowedTransitions;
        },

        // ========================================================================
        // STAGE ACTIONS
        // ========================================================================

        transitionStage: async (applicationId: string, toStage: ApplicationStage, reason?: string, notes?: string) => {
          set({ loading: true });
          
          try {
            const currentStageEntry = get().getCurrentStage(applicationId);
            if (!currentStageEntry) {
              throw new Error('No current stage found for application');
            }

            const fromStage = currentStageEntry;
            
            // Validate transition
            if (!get().validateTransition(fromStage, toStage)) {
              throw new Error(`Invalid transition from ${fromStage} to ${toStage}`);
            }

            const transition: StageTransition = {
              id: generateId(),
              applicationId,
              fromStage,
              toStage,
              transitionedAt: new Date().toISOString(),
              transitionedBy: 'current-user-id',
              transitionedByName: 'Current User',
              transitionedByRole: UserRole.ADMIN, // This would come from auth
              reason,
              notes,
              automaticTransition: false,
              requiresApproval: false
            };

            // Add transition
            set(state => ({
              transitions: [...state.transitions, transition]
            }));

            // TODO: Fix method interface issues
            // await get().updateStageTimeline(applicationId, toStage);
            // await get().createStageNotification(applicationId, toStage, NotificationType.STAGE_ENTERED);

            set({ loading: false });
          } catch (error) {
            set({
              loading: false,
              error: error instanceof Error ? error.message : 'Stage transition failed'
            });
            throw error;
          }
        },

        approveTransition: async (transitionId: string) => {
          set(state => ({
            transitions: state.transitions.map(t =>
              t.id === transitionId
                ? {
                    ...t,
                    approvedAt: new Date().toISOString(),
                    approvedBy: 'current-user-id'
                  }
                : t
            )
          }));
        },

        rejectTransition: async (transitionId: string, reason: string) => {
          set(state => ({
            transitions: state.transitions.filter(t => t.id !== transitionId)
          }));
        },

        addStageNote: async (applicationId: string, stage: ApplicationStage, note: Omit<StageNote, 'id' | 'createdAt'>) => {
          const newNote: StageNote = {
            id: generateId(),
            ...note,
            createdAt: new Date().toISOString()
          };

          set(state => ({
            timeline: {
              ...state.timeline,
              [applicationId]: state.timeline[applicationId]?.map(entry =>
                entry.stage === stage
                  ? { ...entry, notes: [...entry.notes, newNote] }
                  : entry
              ) || []
            }
          }));
        },

        reportStageIssue: async (applicationId: string, stage: ApplicationStage, issue: Omit<StageIssue, 'id' | 'reportedAt'>) => {
          const newIssue: StageIssue = {
            id: generateId(),
            ...issue,
            reportedAt: new Date().toISOString()
          };

          set(state => ({
            timeline: {
              ...state.timeline,
              [applicationId]: state.timeline[applicationId]?.map(entry =>
                entry.stage === stage
                  ? { ...entry, issues: [...entry.issues, newIssue] }
                  : entry
              ) || []
            }
          }));

          // TODO: Fix createStageNotification interface issue
          // await get().createStageNotification(applicationId, stage, NotificationType.ISSUE_DETECTED);
        },

        resolveStageIssue: async (issueId: string, resolution: string) => {
          set(state => ({
            timeline: Object.fromEntries(
              Object.entries(state.timeline).map(([appId, entries]) => [
                appId,
                entries.map(entry => ({
                  ...entry,
                  issues: entry.issues.map(issue =>
                    issue.id === issueId
                      ? {
                          ...issue,
                          resolvedAt: new Date().toISOString(),
                          resolvedBy: 'current-user-id',
                          resolution
                        }
                      : issue
                  )
                }))
              ])
            )
          }));
        },

        assignStageToUser: async (applicationId: string, stage: ApplicationStage, userId: string) => {
          set(state => ({
            timeline: {
              ...state.timeline,
              [applicationId]: state.timeline[applicationId]?.map(entry =>
                entry.stage === stage
                  ? {
                      ...entry,
                      assignedTo: [...(entry.assignedTo || []), userId],
                      assignedToNames: [...(entry.assignedToNames || []), 'User Name'] // Would fetch from user store
                    }
                  : entry
              ) || []
            }
          }));
        },

        updateStageProgress: async (applicationId: string, stage: ApplicationStage, progress: number) => {
          set(state => ({
            timeline: {
              ...state.timeline,
              [applicationId]: state.timeline[applicationId]?.map(entry =>
                entry.stage === stage
                  ? { ...entry, progress: Math.min(100, Math.max(0, progress)) }
                  : entry
              ) || []
            }
          }));
        },

        // ========================================================================
        // NOTIFICATION METHODS
        // ========================================================================

        markNotificationAsRead: async (notificationId: string) => {
          set(state => ({
            notifications: state.notifications.map(n =>
              n.id === notificationId
                ? { ...n, readAt: new Date().toISOString() }
                : n
            )
          }));
        },

        getUnreadNotifications: (userId: string) => {
          return get().notifications.filter(n => n.recipientId === userId && !n.readAt);
        },

        createStageNotification: async (applicationId: string, stage: ApplicationStage, type: NotificationType) => {
          const stageDefinition = get().stageDefinitions[stage];
          const notification: StageNotification = {
            id: generateId(),
            applicationId,
            stage,
            recipientId: 'current-user-id', // Would be determined based on stage and roles
            recipientRole: UserRole.APPLICANT, // Would be determined based on context
            type,
            title: `Stage Update: ${stageDefinition.displayName}`,
            message: `Application has entered ${stageDefinition.displayName} stage`,
            urgency: stageDefinition.notificationSettings.urgencyLevel,
            sentAt: new Date().toISOString(),
            actionRequired: stageDefinition.requiresUserAction,
            actionUrl: `/dashboard/applications/${applicationId}`
          };

          set(state => ({
            notifications: [...state.notifications, notification]
          }));
        },

        // ========================================================================
        // TIMELINE METHODS
        // ========================================================================

        getApplicationTimeline: (applicationId: string) => {
          return get().timeline[applicationId] || [];
        },

        getCurrentStage: (applicationId: string) => {
          const timeline = get().timeline[applicationId] || [];
          const currentEntry = timeline.find(entry => !entry.completedAt);
          return currentEntry?.stage || null;
        },

        getStageProgress: (applicationId: string, stage: ApplicationStage) => {
          const timeline = get().timeline[applicationId] || [];
          const entry = timeline.find(e => e.stage === stage);
          return entry?.progress || 0;
        },

        updateStageTimeline: async (applicationId: string, newStage: ApplicationStage) => {
          const timeline = get().timeline[applicationId] || [];
          const now = new Date().toISOString();

          // Complete current stage if exists
          const updatedTimeline = timeline.map(entry =>
            !entry.completedAt
              ? { ...entry, completedAt: now, status: StageStatus.COMPLETED, progress: 100 }
              : entry
          );

          // Add new stage entry
          const newEntry: StageTimelineEntry = {
            id: generateId(),
            applicationId,
            stage: newStage,
            enteredAt: now,
            status: StageStatus.IN_PROGRESS,
            progress: 0,
            issues: [],
            actions: [],
            notes: []
          };

          set(state => ({
            timeline: {
              ...state.timeline,
              [applicationId]: [...updatedTimeline, newEntry]
            }
          }));
        },

        // ========================================================================
        // AUTOMATION METHODS
        // ========================================================================

        checkAutoProgressConditions: async (applicationId: string) => {
          const currentStage = get().getCurrentStage(applicationId);
          if (!currentStage) return;

          const definition = get().stageDefinitions[currentStage];
          if (!definition.autoProgressConditions) return;

          // TODO: Fix evaluateProgressCondition interface issue
          // for (const condition of definition.autoProgressConditions) {
          //   const shouldProgress = await get().evaluateProgressCondition(applicationId, condition);
          //   if (shouldProgress && definition.allowedTransitions.length > 0) {
          //     const nextStage = definition.allowedTransitions[0]; // Take first allowed transition
          //     await get().transitionStage(applicationId, nextStage, 'Automatic progression');
          //     break;
          //   }
          // }
        },

        evaluateProgressCondition: async (applicationId: string, condition: any): Promise<boolean> => {
          switch (condition.type) {
            case ProgressConditionType.ALL_DOCUMENTS_APPROVED:
              // Would check document store for all approved documents
              return true; // Mock implementation
            case ProgressConditionType.TIME_ELAPSED:
              const timeline = get().timeline[applicationId] || [];
              const currentEntry = timeline.find(entry => !entry.completedAt);
              if (currentEntry) {
                const elapsed = Date.now() - new Date(currentEntry.enteredAt).getTime();
                const requiredTime = condition.parameters.hours * 60 * 60 * 1000;
                return elapsed >= requiredTime;
              }
              return false;
            default:
              return false;
          }
        },

        scheduleAutomaticTransitions: async () => {
          // In a real implementation, this would set up scheduled jobs
          console.log('Scheduling automatic transitions...');
        },

        // ========================================================================
        // ANALYTICS METHODS
        // ========================================================================

        getStageStatistics: () => {
          const { timeline } = get();
          const stats: Record<ApplicationStage, { count: number; averageDuration: number }> = {} as any;

          Object.values(timeline).flat().forEach(entry => {
            if (!stats[entry.stage]) {
              stats[entry.stage] = { count: 0, averageDuration: 0 };
            }
            stats[entry.stage].count++;
            
            if (entry.completedAt && entry.duration) {
              stats[entry.stage].averageDuration += entry.duration;
            }
          });

          // Calculate averages
          Object.keys(stats).forEach(stage => {
            const stageKey = stage as ApplicationStage;
            if (stats[stageKey].count > 0) {
              stats[stageKey].averageDuration = stats[stageKey].averageDuration / stats[stageKey].count;
            }
          });

          return stats;
        },

        getBottleneckAnalysis: () => {
          const stats = get().getStageStatistics();
          return Object.entries(stats)
            .map(([stage, data]) => ({
              stage: stage as ApplicationStage,
              averageTime: data.averageDuration,
              issueCount: 0 // Would calculate from timeline issues
            }))
            .sort((a, b) => b.averageTime - a.averageTime)
            .slice(0, 5);
        },

        // ========================================================================
        // MOCK DATA METHODS
        // ========================================================================

        createMockTimeline: (applicationId: string, applicationType: string) => {
          const stages = STAGE_FLOW_CONFIGS[applicationType] || STAGE_FLOW_CONFIGS.dataflow;
          const mockTimeline: StageTimelineEntry[] = [];
          
          let currentTime = Date.now() - (stages.length * 24 * 60 * 60 * 1000); // Start from stages.length days ago
          
          stages.forEach((stage, index) => {
            const isCompleted = index < stages.length - 2; // All but last 2 stages completed
            const isCurrent = index === stages.length - 2; // Second to last is current
            
            const entry: StageTimelineEntry = {
              id: generateId(),
              applicationId,
              stage,
              enteredAt: new Date(currentTime).toISOString(),
              completedAt: isCompleted ? new Date(currentTime + 2 * 24 * 60 * 60 * 1000).toISOString() : undefined,
              duration: isCompleted ? 2 * 24 * 60 * 60 * 1000 : undefined,
              status: isCompleted ? StageStatus.COMPLETED : isCurrent ? StageStatus.IN_PROGRESS : StageStatus.NOT_STARTED,
              progress: isCompleted ? 100 : isCurrent ? 65 : 0,
              issues: [],
              actions: [],
              notes: []
            };
            
            mockTimeline.push(entry);
            currentTime += 3 * 24 * 60 * 60 * 1000; // 3 days between stages
          });

          set(state => ({
            timeline: {
              ...state.timeline,
              [applicationId]: mockTimeline
            }
          }));
        }
      }),
      {
        name: 'stage-storage',
        partialize: (state) => ({
          timeline: state.timeline,
          transitions: state.transitions,
          notifications: state.notifications
        })
      }
    ),
    { name: 'StageStore' }
  )
);