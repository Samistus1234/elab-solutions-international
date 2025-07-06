/**
 * User Service for ELAB Solutions International
 * 
 * This module provides user management functionality including
 * profile management, preferences, and user-related operations.
 */

import { BaseService } from '../base-service';
import type { 
  User, 
  UserProfile, 
  UserRole, 
  HealthcareProfession,
  UserPreferences,
  UserActivity 
} from '@/types/business';
import type { 
  ApiError, 
  RequestConfig,
  PaginatedResponse 
} from '@/types/api';
import type { ID, Result } from '@/types';

// ============================================================================
// USER SERVICE INTERFACES
// ============================================================================

export interface UserFilter {
  role?: UserRole;
  profession?: HealthcareProfession;
  isActive?: boolean;
  isVerified?: boolean;
  country?: string;
  registrationDateFrom?: string;
  registrationDateTo?: string;
  search?: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profession?: HealthcareProfession;
  country?: string;
  phone?: string;
  preferences?: Partial<UserPreferences>;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  profession?: HealthcareProfession;
  preferences?: Partial<UserPreferences>;
  isActive?: boolean;
  isVerified?: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  profession?: HealthcareProfession;
  bio?: string;
  website?: string;
  linkedIn?: string;
  experience?: string;
  education?: string;
  certifications?: string[];
  languages?: string[];
  timezone?: string;
}

// ============================================================================
// USER SERVICE IMPLEMENTATION
// ============================================================================

export class UserService extends BaseService<User, CreateUserData, UpdateUserData, UserFilter> {
  constructor() {
    super({
      baseEndpoint: '/users',
      defaultTimeout: 30000,
      enableCache: true,
      retries: 3,
    });
  }

  // ============================================================================
  // PROFILE MANAGEMENT
  // ============================================================================

  /**
   * Get current user profile
   */
  async getCurrentProfile(config?: RequestConfig): Promise<Result<User, ApiError>> {
    return this.customGet<User>('me', config);
  }

  /**
   * Update current user profile
   */
  async updateProfile(data: UpdateProfileData, config?: RequestConfig): Promise<Result<User, ApiError>> {
    return this.customPatch<User>('me/profile', data, config);
  }

  /**
   * Upload profile avatar
   */
  async uploadAvatar(file: File, config?: RequestConfig): Promise<Result<{ avatarUrl: string }, ApiError>> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.customPost<{ avatarUrl: string }>('me/avatar', formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Delete profile avatar
   */
  async deleteAvatar(config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customDelete<void>('me/avatar', config);
  }

  // ============================================================================
  // PASSWORD MANAGEMENT
  // ============================================================================

  /**
   * Change user password
   */
  async changePassword(data: ChangePasswordData, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>('me/change-password', data, config);
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>('password-reset/request', { email }, config);
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>('password-reset/confirm', { token, newPassword }, config);
  }

  // ============================================================================
  // EMAIL AND PHONE VERIFICATION
  // ============================================================================

  /**
   * Request email verification
   */
  async requestEmailVerification(config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>('me/verify-email/request', {}, config);
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>('me/verify-email/confirm', { token }, config);
  }

  /**
   * Request phone verification
   */
  async requestPhoneVerification(phone: string, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>('me/verify-phone/request', { phone }, config);
  }

  /**
   * Verify phone with code
   */
  async verifyPhone(code: string, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>('me/verify-phone/confirm', { code }, config);
  }

  // ============================================================================
  // PREFERENCES MANAGEMENT
  // ============================================================================

  /**
   * Get user preferences
   */
  async getPreferences(config?: RequestConfig): Promise<Result<UserPreferences, ApiError>> {
    return this.customGet<UserPreferences>('me/preferences', config);
  }

  /**
   * Update user preferences
   */
  async updatePreferences(preferences: Partial<UserPreferences>, config?: RequestConfig): Promise<Result<UserPreferences, ApiError>> {
    return this.customPatch<UserPreferences>('me/preferences', preferences, config);
  }

  /**
   * Reset preferences to default
   */
  async resetPreferences(config?: RequestConfig): Promise<Result<UserPreferences, ApiError>> {
    return this.customPost<UserPreferences>('me/preferences/reset', {}, config);
  }

  // ============================================================================
  // ACTIVITY AND ANALYTICS
  // ============================================================================

  /**
   * Get user activity log
   */
  async getActivity(page: number = 1, limit: number = 20, config?: RequestConfig): Promise<Result<PaginatedResponse<UserActivity>, ApiError>> {
    return this.customGet<PaginatedResponse<UserActivity>>(`me/activity?page=${page}&limit=${limit}`, config);
  }

  /**
   * Get user statistics
   */
  async getStatistics(config?: RequestConfig): Promise<Result<{
    totalApplications: number;
    completedApplications: number;
    pendingApplications: number;
    totalDocuments: number;
    verifiedDocuments: number;
    accountAge: number;
    lastLoginAt: string;
  }, ApiError>> {
    return this.customGet('me/statistics', config);
  }

  // ============================================================================
  // ACCOUNT MANAGEMENT
  // ============================================================================

  /**
   * Deactivate user account
   */
  async deactivateAccount(reason?: string, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>('me/deactivate', { reason }, config);
  }

  /**
   * Request account deletion
   */
  async requestAccountDeletion(reason?: string, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>('me/delete-request', { reason }, config);
  }

  /**
   * Cancel account deletion request
   */
  async cancelAccountDeletion(config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>('me/cancel-deletion', {}, config);
  }

  // ============================================================================
  // ADMIN OPERATIONS
  // ============================================================================

  /**
   * Get user by ID (admin only)
   */
  async getUserById(id: ID, config?: RequestConfig): Promise<Result<User, ApiError>> {
    return this.getById({ id, config });
  }

  /**
   * List users with filtering (admin only)
   */
  async listUsers(filter?: UserFilter, page: number = 1, limit: number = 20, config?: RequestConfig): Promise<Result<PaginatedResponse<User>, ApiError>> {
    return this.list({ filter, page, limit, config });
  }

  /**
   * Update user (admin only)
   */
  async updateUser(id: ID, data: UpdateUserData, config?: RequestConfig): Promise<Result<User, ApiError>> {
    return this.update({ id, data, config });
  }

  /**
   * Suspend user (admin only)
   */
  async suspendUser(id: ID, reason: string, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>(`${id}/suspend`, { reason }, config);
  }

  /**
   * Unsuspend user (admin only)
   */
  async unsuspendUser(id: ID, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>(`${id}/unsuspend`, {}, config);
  }

  /**
   * Verify user manually (admin only)
   */
  async verifyUser(id: ID, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>(`${id}/verify`, {}, config);
  }

  /**
   * Unverify user (admin only)
   */
  async unverifyUser(id: ID, config?: RequestConfig): Promise<Result<void, ApiError>> {
    return this.customPost<void>(`${id}/unverify`, {}, config);
  }

  // ============================================================================
  // SEARCH AND DISCOVERY
  // ============================================================================

  /**
   * Search users by criteria
   */
  async searchUsers(query: string, filters?: Partial<UserFilter>, config?: RequestConfig): Promise<Result<PaginatedResponse<User>, ApiError>> {
    const searchFilter = { ...filters, search: query };
    return this.list({ filter: searchFilter, config });
  }

  /**
   * Get users by profession
   */
  async getUsersByProfession(profession: HealthcareProfession, config?: RequestConfig): Promise<Result<PaginatedResponse<User>, ApiError>> {
    return this.list({ filter: { profession }, config });
  }

  /**
   * Get users by country
   */
  async getUsersByCountry(country: string, config?: RequestConfig): Promise<Result<PaginatedResponse<User>, ApiError>> {
    return this.list({ filter: { country }, config });
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const userService = new UserService();

// Simple application service placeholder
export const applicationService = {
  getStatistics: async () => ({ total: 0, pending: 0, approved: 0 })
};
