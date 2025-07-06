/**
 * API Type Definitions for ELAB Solutions International
 * 
 * This file contains all API-related type definitions including
 * request/response interfaces, HTTP client types, and service interfaces.
 */

import type { 
  User, 
  Application, 
  Service, 
  JobOpportunity, 
  Course,
  ApplicationType,
  ApplicationStatus,
  UserRole 
} from './business';
import type { ID, BaseFilter, PaginatedResponse, ApiResponse } from './index';

// Re-export commonly used types
export type { ID, BaseFilter, PaginatedResponse, ApiResponse };
// ============================================================================
// HTTP CLIENT TYPES
// ============================================================================

export interface RequestConfig {
  readonly headers?: Record<string, string>;
  readonly timeout?: number;
  readonly retries?: number;
  readonly cache?: 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached';
  readonly credentials?: 'omit' | 'same-origin' | 'include';
}

export interface ApiClient {
  get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;
  delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;
}

export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly details?: Record<string, unknown>;
  readonly statusCode: number;
  readonly timestamp: string;
}

// ============================================================================
// AUTHENTICATION API TYPES
// ============================================================================

export interface LoginRequest {
  readonly email: string;
  readonly password: string;
  readonly rememberMe?: boolean;
}

export interface LoginResponse {
  readonly user: User;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
}

export interface RegisterRequest {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly country: string;
  readonly profession: string;
  readonly phone?: string;
  readonly agreeToTerms: boolean;
  readonly subscribeToNewsletter?: boolean;
}

export interface RegisterResponse {
  readonly user: User;
  readonly verificationRequired: boolean;
  readonly message: string;
}

export interface ForgotPasswordRequest {
  readonly email: string;
}

export interface ResetPasswordRequest {
  readonly token: string;
  readonly password: string;
  readonly confirmPassword: string;
}

export interface ChangePasswordRequest {
  readonly currentPassword: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
}

export interface VerifyEmailRequest {
  readonly token: string;
}

export interface RefreshTokenRequest {
  readonly refreshToken: string;
}

export interface RefreshTokenResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
}

// ============================================================================
// USER API TYPES
// ============================================================================

export interface UpdateProfileRequest {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phone?: string;
  readonly country?: string;
  readonly profession?: string;
  readonly avatar?: string;
  readonly dateOfBirth?: string;
  readonly gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
}

export interface UpdatePreferencesRequest {
  readonly language?: 'en' | 'ar' | 'fr';
  readonly timezone?: string;
  readonly notifications?: {
    readonly email?: boolean;
    readonly sms?: boolean;
    readonly push?: boolean;
    readonly marketing?: boolean;
  };
  readonly privacy?: {
    readonly profileVisibility?: 'public' | 'private' | 'contacts_only';
    readonly showEmail?: boolean;
    readonly showPhone?: boolean;
  };
}

export interface UserFilter extends BaseFilter {
  readonly role?: UserRole;
  readonly status?: 'active' | 'inactive' | 'suspended';
  readonly country?: string;
  readonly profession?: string;
  readonly createdAfter?: string;
  readonly createdBefore?: string;
}

// ============================================================================
// APPLICATION API TYPES
// ============================================================================

export interface CreateApplicationRequest {
  readonly type: ApplicationType;
  readonly targetCountry: string;
  readonly targetProfession: string;
  readonly personalInfo: {
    readonly fullName: string;
    readonly dateOfBirth: string;
    readonly nationality: string;
    readonly passportNumber: string;
    readonly passportExpiry: string;
    readonly maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  };
}

export interface UpdateApplicationRequest {
  readonly personalInfo?: Partial<CreateApplicationRequest['personalInfo']>;
  readonly education?: readonly {
    readonly institution: string;
    readonly degree: string;
    readonly field: string;
    readonly country: string;
    readonly startDate: string;
    readonly endDate: string;
    readonly gpa?: number;
  }[];
  readonly experience?: readonly {
    readonly employer: string;
    readonly position: string;
    readonly department: string;
    readonly country: string;
    readonly startDate: string;
    readonly endDate?: string;
    readonly isCurrent: boolean;
    readonly responsibilities: readonly string[];
  }[];
}

export interface ApplicationFilter extends BaseFilter {
  readonly type?: ApplicationType;
  readonly status?: ApplicationStatus;
  readonly userId?: ID;
  readonly assignedTo?: ID;
  readonly country?: string;
  readonly profession?: string;
  readonly createdAfter?: string;
  readonly createdBefore?: string;
  readonly priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface SubmitApplicationRequest {
  readonly applicationId: ID;
  readonly documents: readonly {
    readonly type: string;
    readonly fileId: string;
  }[];
}

// ============================================================================
// DOCUMENT API TYPES
// ============================================================================

export interface UploadDocumentRequest {
  readonly file: File;
  readonly type: string;
  readonly applicationId?: ID;
  readonly description?: string;
}

export interface UploadDocumentResponse {
  readonly id: ID;
  readonly name: string;
  readonly url: string;
  readonly size: number;
  readonly type: string;
  readonly uploadedAt: string;
}

export interface DocumentFilter extends BaseFilter {
  readonly type?: string;
  readonly applicationId?: ID;
  readonly userId?: ID;
  readonly verificationStatus?: 'pending' | 'verified' | 'rejected' | 'expired';
  readonly uploadedAfter?: string;
  readonly uploadedBefore?: string;
}

// ============================================================================
// SERVICE API TYPES
// ============================================================================

export interface ServiceFilter extends BaseFilter {
  readonly type?: ApplicationType;
  readonly category?: 'credentialing' | 'licensing' | 'education' | 'placement' | 'consultation';
  readonly country?: string;
  readonly profession?: string;
  readonly isActive?: boolean;
  readonly priceMin?: number;
  readonly priceMax?: number;
}

export interface ServiceQuoteRequest {
  readonly serviceId: ID;
  readonly country: string;
  readonly profession: string;
  readonly additionalServices?: readonly ID[];
  readonly urgentProcessing?: boolean;
}

export interface ServiceQuoteResponse {
  readonly serviceId: ID;
  readonly basePrice: number;
  readonly additionalFees: readonly {
    readonly name: string;
    readonly amount: number;
  }[];
  readonly totalPrice: number;
  readonly currency: string;
  readonly estimatedDuration: number;
  readonly validUntil: string;
}

// ============================================================================
// PAYMENT API TYPES
// ============================================================================

export interface CreatePaymentIntentRequest {
  readonly amount: number;
  readonly currency: string;
  readonly serviceId?: ID;
  readonly applicationId?: ID;
  readonly description?: string;
  readonly metadata?: Record<string, string>;
}

export interface CreatePaymentIntentResponse {
  readonly clientSecret: string;
  readonly paymentIntentId: string;
  readonly amount: number;
  readonly currency: string;
}

export interface PaymentMethodRequest {
  readonly type: 'card' | 'bank_transfer' | 'wallet';
  readonly details: Record<string, unknown>;
  readonly setAsDefault?: boolean;
}

export interface PaymentHistoryFilter extends BaseFilter {
  readonly userId?: ID;
  readonly status?: 'pending' | 'succeeded' | 'failed' | 'cancelled';
  readonly paymentMethod?: string;
  readonly amountMin?: number;
  readonly amountMax?: number;
  readonly createdAfter?: string;
  readonly createdBefore?: string;
}

// ============================================================================
// NOTIFICATION API TYPES
// ============================================================================

export interface SendNotificationRequest {
  readonly userId: ID;
  readonly type: 'email' | 'sms' | 'push' | 'in_app';
  readonly title: string;
  readonly message: string;
  readonly data?: Record<string, unknown>;
  readonly scheduledFor?: string;
}

export interface NotificationFilter extends BaseFilter {
  readonly userId?: ID;
  readonly type?: 'email' | 'sms' | 'push' | 'in_app';
  readonly read?: boolean;
  readonly createdAfter?: string;
  readonly createdBefore?: string;
}

export interface MarkNotificationReadRequest {
  readonly notificationIds: readonly ID[];
}

// ============================================================================
// ANALYTICS API TYPES
// ============================================================================

export interface AnalyticsEventRequest {
  readonly event: string;
  readonly properties?: Record<string, unknown>;
  readonly userId?: ID;
  readonly sessionId?: string;
  readonly timestamp?: string;
}

export interface AnalyticsQuery {
  readonly metric: string;
  readonly dimensions?: readonly string[];
  readonly filters?: Record<string, unknown>;
  readonly dateRange: {
    readonly start: string;
    readonly end: string;
  };
  readonly granularity?: 'hour' | 'day' | 'week' | 'month';
}

export interface AnalyticsResponse {
  readonly metric: string;
  readonly data: readonly {
    readonly timestamp: string;
    readonly value: number;
    readonly dimensions?: Record<string, string>;
  }[];
  readonly total: number;
  readonly period: {
    readonly start: string;
    readonly end: string;
  };
}

// ============================================================================
// SEARCH API TYPES
// ============================================================================

export interface SearchRequest {
  readonly query: string;
  readonly type?: 'users' | 'applications' | 'services' | 'jobs' | 'courses';
  readonly filters?: Record<string, unknown>;
  readonly page?: number;
  readonly limit?: number;
  readonly sortBy?: string;
  readonly sortOrder?: 'asc' | 'desc';
}

export interface SearchResponse<T> {
  readonly results: readonly T[];
  readonly total: number;
  readonly query: string;
  readonly suggestions?: readonly string[];
  readonly facets?: Record<string, readonly { value: string; count: number }[]>;
  readonly took: number; // search time in milliseconds
}

// ============================================================================
// WEBHOOK API TYPES
// ============================================================================

export interface WebhookEvent {
  readonly id: ID;
  readonly type: string;
  readonly data: Record<string, unknown>;
  readonly timestamp: string;
  readonly signature: string;
}

export interface WebhookSubscription {
  readonly id: ID;
  readonly url: string;
  readonly events: readonly string[];
  readonly secret: string;
  readonly isActive: boolean;
  readonly createdAt: string;
}

// ============================================================================
// SERVICE INTERFACES
// ============================================================================

export interface AuthService {
  login(request: LoginRequest): Promise<ApiResponse<LoginResponse>>;
  register(request: RegisterRequest): Promise<ApiResponse<RegisterResponse>>;
  logout(): Promise<ApiResponse<void>>;
  forgotPassword(request: ForgotPasswordRequest): Promise<ApiResponse<void>>;
  resetPassword(request: ResetPasswordRequest): Promise<ApiResponse<void>>;
  changePassword(request: ChangePasswordRequest): Promise<ApiResponse<void>>;
  verifyEmail(request: VerifyEmailRequest): Promise<ApiResponse<void>>;
  refreshToken(request: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>>;
  getCurrentUser(): Promise<ApiResponse<User>>;
}

export interface UserService {
  getProfile(): Promise<ApiResponse<User>>;
  updateProfile(request: UpdateProfileRequest): Promise<ApiResponse<User>>;
  updatePreferences(request: UpdatePreferencesRequest): Promise<ApiResponse<User>>;
  getUsers(filter: UserFilter): Promise<PaginatedResponse<User>>;
  getUserById(id: ID): Promise<ApiResponse<User>>;
  deleteAccount(): Promise<ApiResponse<void>>;
}

export interface ApplicationService {
  getApplications(filter: ApplicationFilter): Promise<PaginatedResponse<Application>>;
  getApplicationById(id: ID): Promise<ApiResponse<Application>>;
  createApplication(request: CreateApplicationRequest): Promise<ApiResponse<Application>>;
  updateApplication(id: ID, request: UpdateApplicationRequest): Promise<ApiResponse<Application>>;
  submitApplication(request: SubmitApplicationRequest): Promise<ApiResponse<Application>>;
  deleteApplication(id: ID): Promise<ApiResponse<void>>;
}

export interface ServiceService {
  getServices(filter: ServiceFilter): Promise<PaginatedResponse<Service>>;
  getServiceById(id: ID): Promise<ApiResponse<Service>>;
  getServiceQuote(request: ServiceQuoteRequest): Promise<ApiResponse<ServiceQuoteResponse>>;
}

export interface PaymentService {
  createPaymentIntent(request: CreatePaymentIntentRequest): Promise<ApiResponse<CreatePaymentIntentResponse>>;
  getPaymentHistory(filter: PaymentHistoryFilter): Promise<PaginatedResponse<unknown>>;
  addPaymentMethod(request: PaymentMethodRequest): Promise<ApiResponse<unknown>>;
  getPaymentMethods(): Promise<ApiResponse<readonly unknown[]>>;
  removePaymentMethod(id: ID): Promise<ApiResponse<void>>;
}
