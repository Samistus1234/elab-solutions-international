/**
 * Application Service for ELAB Solutions International
 * 
 * This module provides application management functionality including
 * application creation, workflow management, and status tracking.
 */

import { BaseService } from '../base-service';
import type { 
  Application, 
  ApplicationType, 
  ApplicationStatus,
  ApplicationWorkflow,
  ApplicationDocument,
  ApplicationPayment,
  ApplicationTimeline 
} from '@/types/business';
import type { 
  ApiError, 
  RequestConfig,
  PaginatedResponse 
} from '@/types/api';
import type { ID, Result } from '@/types';

// ============================================================================
// APPLICATION SERVICE INTERFACES
// ============================================================================

export interface ApplicationFilter {
  type?: ApplicationType;
  status?: ApplicationStatus;
  userId?: ID;
  country?: string;
  profession?: string;
  submittedDateFrom?: string;
  submittedDateTo?: string;
  search?: string;
}

export interface CreateApplicationData {
  type: ApplicationType;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
  };
  professionalInfo: {
    profession: string;
    yearsOfExperience: number;
    currentEmployer?: string;
    licenseNumber?: string;
    graduationYear: number;
    university: string;
    degree: string;
  };
  targetCountry: string;
  targetState?: string;
  targetCity?: string;
  preferredStartDate?: string;
  additionalInfo?: Record<string, any>;
}

export interface UpdateApplicationData {
  personalInfo?: Partial<CreateApplicationData['personalInfo']>;
  professionalInfo?: Partial<CreateApplicationData['professionalInfo']>;
  targetCountry?: string;
  targetState?: string;
  targetCity?: string;
  preferredStartDate?: string;
  additionalInfo?: Record<string, any>;
}

export interface SubmitApplicationData {
  confirmTerms: boolean;
  confirmAccuracy: boolean;
  signature?: string;
  submissionNotes?: string;
}

export interface ApplicationComment {
  id: ID;
  applicationId: ID;
  userId: ID;
  userRole: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// APPLICATION SERVICE IMPLEMENTATION
// ============================================================================

export class ApplicationService extends BaseService<Application, CreateApplicationData, UpdateApplicationData, ApplicationFilter> {
  constructor() {
    super({
      baseEndpoint: '/applications',
      defaultTimeout: 30000,
      enableCache: true,
      retries: 3,
    });
  }

  // ============================================================================
  // APPLICATION LIFECYCLE MANAGEMENT
  // ============================================================================

  /**
   * Create a new application
   */
  async createApplication(data: CreateApplicationData, config?: RequestConfig): Promise<Result<Application, ApiError>> {
    return this.create({ data, config });
  }

  /**
   * Get application by ID
   */
  async getApplication(id: ID, config?: RequestConfig): Promise<Result<Application, ApiError>> {
    return this.getById({ id, config });
  }

  /**
   * Update application
   */
  async updateApplication(id: ID, data: UpdateApplicationData, config?: RequestConfig): Promise<Result<Application, ApiError>> {
    return this.update({ id, data, config });
  }

  /**
   * Submit application for processing
   */
  async submitApplication(id: ID, data: SubmitApplicationData, config?: RequestConfig): Promise<Result<Application, ApiError>> {
    return this.customPost<Application>(`${id}/submit`, data, config);
  }

  /**
   * Withdraw application
   */
  async withdrawApplication(id: ID, reason?: string, config?: RequestConfig): Promise<Result<Application, ApiError>> {
    return this.customPost<Application>(`${id}/withdraw`, { reason }, config);
  }

  /**
   * Resubmit application after withdrawal
   */
  async resubmitApplication(id: ID, config?: RequestConfig): Promise<Result<Application, ApiError>> {
    return this.customPost<Application>(`${id}/resubmit`, {}, config);
  }

  // ============================================================================
  // APPLICATION WORKFLOW MANAGEMENT
  // ============================================================================

  /**
   * Get application workflow status
   */
  async getWorkflow(applicationId: ID, config?: RequestConfig): Promise<Result<ApplicationWorkflow, ApiError>> {
    return this.customGet<ApplicationWorkflow>(`${applicationId}/workflow`, config);
  }

  /**
   * Advance application to next workflow step
   */
  async advanceWorkflow(applicationId: ID, stepId: string, data?: Record<string, any>, config?: RequestConfig): Promise<Result<ApplicationWorkflow, ApiError>> {
    return this.customPost<ApplicationWorkflow>(`${applicationId}/workflow/advance`, { stepId, data }, config);
  }

  /**
   * Reject application at current step
   */
  async rejectApplication(applicationId: ID, reason: string, config?: RequestConfig): Promise<Result<ApplicationWorkflow, ApiError>> {
    return this.customPost<ApplicationWorkflow>(`${applicationId}/workflow/reject`, { reason }, config);
  }

  /**
   * Request additional information
   */
  async requestAdditionalInfo(applicationId: ID, requirements: string[], message: string, config?: RequestConfig): Promise<Result<ApplicationWorkflow, ApiError>> {
    return this.customPost<ApplicationWorkflow>(`${applicationId}/workflow/request-info`, { requirements, message }, config);
  }

  // ============================================================================
  // DOCUMENT MANAGEMENT
  // ============================================================================

  /**
   * Get application documents
   */
  async getDocuments(applicationId: ID, config?: RequestConfig): Promise<Result<ApplicationDocument[], ApiError>> {
    return this.customGet<ApplicationDocument[]>(`${applicationId}/documents`, config);
  }

  /**
   * Upload document
   */
  async uploadDocument(applicationId: ID, file: File, documentType: string, config?: RequestConfig): Promise<Result<ApplicationDocument, ApiError>> {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', documentType);

    return this.customPost<ApplicationDocument>(`${applicationId}/documents`, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Delete document
   */
  async deleteDocument(applicationId: ID, documentId: ID, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customDelete<void>(`${applicationId}/documents/${documentId}`, config);
  }

  /**
   * Verify document
   */
  async verifyDocument(applicationId: ID, documentId: ID, verificationData: Record<string, any>, config?: RequestConfig): Promise<Result<ApplicationDocument, ApiError>> {
    return this.customPost<ApplicationDocument>(`${applicationId}/documents/${documentId}/verify`, verificationData, config);
  }

  // ============================================================================
  // PAYMENT MANAGEMENT
  // ============================================================================

  /**
   * Get application payments
   */
  async getPayments(applicationId: ID, config?: RequestConfig): Promise<Result<ApplicationPayment[], ApiError>> {
    return this.customGet<ApplicationPayment[]>(`${applicationId}/payments`, config);
  }

  /**
   * Create payment intent
   */
  async createPaymentIntent(applicationId: ID, amount: number, currency: string, config?: RequestConfig): Promise<Result<{ clientSecret: string; paymentIntentId: string }, ApiError>> {
    return this.customPost(`${applicationId}/payments/intent`, { amount, currency }, config);
  }

  /**
   * Confirm payment
   */
  async confirmPayment(applicationId: ID, paymentIntentId: string, config?: RequestConfig): Promise<Result<ApplicationPayment, ApiError>> {
    return this.customPost<ApplicationPayment>(`${applicationId}/payments/confirm`, { paymentIntentId }, config);
  }

  /**
   * Request refund
   */
  async requestRefund(applicationId: ID, paymentId: ID, reason: string, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>(`${applicationId}/payments/${paymentId}/refund`, { reason }, config);
  }

  // ============================================================================
  // COMMUNICATION AND COMMENTS
  // ============================================================================

  /**
   * Get application comments
   */
  async getComments(applicationId: ID, config?: RequestConfig): Promise<Result<ApplicationComment[], ApiError>> {
    return this.customGet<ApplicationComment[]>(`${applicationId}/comments`, config);
  }

  /**
   * Add comment to application
   */
  async addComment(applicationId: ID, content: string, isInternal: boolean = false, config?: RequestConfig): Promise<Result<ApplicationComment, ApiError>> {
    return this.customPost<ApplicationComment>(`${applicationId}/comments`, { content, isInternal }, config);
  }

  /**
   * Update comment
   */
  async updateComment(applicationId: ID, commentId: ID, content: string, config?: RequestConfig): Promise<Result<ApplicationComment, ApiError>> {
    return this.customPatch<ApplicationComment>(`${applicationId}/comments/${commentId}`, { content }, config);
  }

  /**
   * Delete comment
   */
  async deleteComment(applicationId: ID, commentId: ID, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customDelete<void>(`${applicationId}/comments/${commentId}`, config);
  }

  // ============================================================================
  // TIMELINE AND HISTORY
  // ============================================================================

  /**
   * Get application timeline
   */
  async getTimeline(applicationId: ID, config?: RequestConfig): Promise<Result<ApplicationTimeline[], ApiError>> {
    return this.customGet<ApplicationTimeline[]>(`${applicationId}/timeline`, config);
  }

  /**
   * Get application history
   */
  async getHistory(applicationId: ID, config?: RequestConfig): Promise<Result<any[], ApiError>> {
    return this.customGet<any[]>(`${applicationId}/history`, config);
  }

  // ============================================================================
  // SEARCH AND FILTERING
  // ============================================================================

  /**
   * List user applications
   */
  async getUserApplications(userId?: ID, filter?: ApplicationFilter, page: number = 1, limit: number = 20, config?: RequestConfig): Promise<Result<PaginatedResponse<Application>, ApiError>> {
    const searchFilter = userId ? { ...filter, userId } : filter;
    return this.list({ filter: searchFilter, page, limit, config });
  }

  /**
   * Search applications
   */
  async searchApplications(query: string, filter?: ApplicationFilter, config?: RequestConfig): Promise<Result<PaginatedResponse<Application>, ApiError>> {
    const searchFilter = { ...filter, search: query };
    return this.list({ filter: searchFilter, config });
  }

  /**
   * Get applications by status
   */
  async getApplicationsByStatus(status: ApplicationStatus, config?: RequestConfig): Promise<Result<PaginatedResponse<Application>, ApiError>> {
    return this.list({ filter: { status }, config });
  }

  /**
   * Get applications by type
   */
  async getApplicationsByType(type: ApplicationType, config?: RequestConfig): Promise<Result<PaginatedResponse<Application>, ApiError>> {
    return this.list({ filter: { type }, config });
  }

  // ============================================================================
  // ANALYTICS AND REPORTING
  // ============================================================================

  /**
   * Get application statistics
   */
  async getStatistics(config?: RequestConfig): Promise<Result<{
    total: number;
    byStatus: Record<ApplicationStatus, number>;
    byType: Record<ApplicationType, number>;
    byCountry: Record<string, number>;
    averageProcessingTime: number;
    successRate: number;
  }, ApiError>> {
    return this.customGet('statistics', config);
  }

  /**
   * Get user application statistics
   */
  async getUserStatistics(userId: ID, config?: RequestConfig): Promise<Result<{
    total: number;
    completed: number;
    pending: number;
    rejected: number;
    averageProcessingTime: number;
  }, ApiError>> {
    return this.customGet(`users/${userId}/statistics`, config);
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const applicationService = new ApplicationService();
