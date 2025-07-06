/**
 * Workflow Type Definitions for ELAB Solutions International
 * 
 * This file contains all workflow-related type definitions including
 * process flows, state machines, and automation rules.
 */

// Workflow status
export type WorkflowStatus = 
  | 'draft'
  | 'active'
  | 'paused'
  | 'completed'
  | 'cancelled'
  | 'failed';

// Workflow step status
export type StepStatus = 
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'skipped'
  | 'failed'
  | 'cancelled';

// Workflow trigger types
export type TriggerType = 
  | 'manual'
  | 'scheduled'
  | 'event'
  | 'webhook'
  | 'api';

// Action types
export type ActionType = 
  | 'email'
  | 'sms'
  | 'notification'
  | 'api_call'
  | 'data_update'
  | 'approval_request'
  | 'document_generation'
  | 'payment_processing';

// Condition operators
export type ConditionOperator = 
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'less_than'
  | 'contains'
  | 'starts_with'
  | 'ends_with'
  | 'is_empty'
  | 'is_not_empty';

// Workflow condition
export interface WorkflowCondition {
  readonly field: string;
  readonly operator: ConditionOperator;
  readonly value: unknown;
  readonly logicalOperator?: 'AND' | 'OR';
}

// Workflow action
export interface WorkflowAction {
  readonly id: string;
  readonly type: ActionType;
  readonly name: string;
  readonly config: Record<string, unknown>;
  readonly conditions?: readonly WorkflowCondition[];
}

// Workflow step
export interface WorkflowStep {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly actions: readonly WorkflowAction[];
  readonly conditions?: readonly WorkflowCondition[];
  readonly nextSteps: readonly string[];
  readonly timeout?: number;
  readonly retryCount?: number;
}

// Workflow definition
export interface WorkflowDefinition {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly version: string;
  readonly trigger: {
    readonly type: TriggerType;
    readonly config: Record<string, unknown>;
  };
  readonly steps: readonly WorkflowStep[];
  readonly variables?: Record<string, unknown>;
  readonly settings: {
    readonly timeout?: number;
    readonly retryPolicy?: {
      readonly maxRetries: number;
      readonly backoffStrategy: 'linear' | 'exponential';
    };
  };
}

// Workflow instance
export interface WorkflowInstance {
  readonly id: string;
  readonly definitionId: string;
  readonly status: WorkflowStatus;
  readonly currentStep?: string;
  readonly variables: Record<string, unknown>;
  readonly startedAt: string;
  readonly completedAt?: string;
  readonly error?: string;
  readonly executionHistory: readonly WorkflowExecution[];
}

// Workflow execution
export interface WorkflowExecution {
  readonly id: string;
  readonly stepId: string;
  readonly status: StepStatus;
  readonly input: Record<string, unknown>;
  readonly output?: Record<string, unknown>;
  readonly startedAt: string;
  readonly completedAt?: string;
  readonly duration?: number;
  readonly error?: string;
}

// Application workflow states
export type ApplicationWorkflowState = 
  | 'submitted'
  | 'under_review'
  | 'documents_requested'
  | 'documents_received'
  | 'interview_scheduled'
  | 'interview_completed'
  | 'decision_pending'
  | 'approved'
  | 'rejected'
  | 'waitlisted';

// Document workflow states
export type DocumentWorkflowState = 
  | 'uploaded'
  | 'pending_verification'
  | 'verified'
  | 'rejected'
  | 'expired';

// Payment workflow states
export type PaymentWorkflowState = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

// Approval workflow
export interface ApprovalWorkflow {
  readonly id: string;
  readonly entityId: string;
  readonly entityType: string;
  readonly approvers: readonly {
    readonly userId: string;
    readonly role: string;
    readonly order: number;
    readonly required: boolean;
  }[];
  readonly currentApprover?: string;
  readonly status: 'pending' | 'approved' | 'rejected';
  readonly approvals: readonly {
    readonly userId: string;
    readonly decision: 'approved' | 'rejected';
    readonly comment?: string;
    readonly timestamp: string;
  }[];
  readonly createdAt: string;
  readonly completedAt?: string;
}
