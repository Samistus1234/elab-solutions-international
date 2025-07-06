import { SecurityEventType } from '@/types/auth';/**
 * Authentication Client for ELAB Solutions International
 * 
 * This module provides the core authentication functionality including
 * JWT token management, session handling, and security features.
 */

import type {
  AuthSession,
  LoginCredentials,
  RegisterData,
  PasswordResetRequest,
  PasswordResetData,
  ChangePasswordData,
  EmailVerificationData,
  PhoneVerificationData,
  TwoFactorSetupData,
  TwoFactorVerificationData,
  TokenPair,
  JWTPayload,
  RefreshTokenPayload,
  SecurityEvent,
  LoginAttempt
} from '@/types/auth';
import type { User } from '@/types/business';
import { UserRole, UserStatus } from '@/types/business';
import type { ApiResponse, Result } from '@/types';
import { isSuccessResponse, toResult, generateUuid } from '@/types/utils';

// ============================================================================
// AUTHENTICATION CLIENT CLASS
// ============================================================================

export class AuthClient {
  private readonly baseUrl: string;
  private readonly storageKey = 'elab_auth_session';
  private readonly refreshTokenKey = 'elab_refresh_token';
  private refreshPromise: Promise<TokenPair> | null = null;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseUrl = baseUrl;
  }

  // ============================================================================
  // CORE AUTHENTICATION METHODS
  // ============================================================================

  /**
   * Authenticate user with email and password
   */
  async login(credentials: LoginCredentials): Promise<Result<AuthSession, Error>> {
    try {
      // Mock authentication for development/testing
      const mockUsers = {
        'admin@elabsolutions.com': {
          id: 'admin-001',
          email: 'admin@elabsolutions.com',
          role: UserRole.SUPER_ADMIN,
          status: UserStatus.ACTIVE,
          profile: {
            firstName: 'Admin',
            lastName: 'User',
            phone: '+1234567890',
            country: 'US',
            profession: 'Administrator'
          },
          preferences: {
            language: 'en' as const,
            timezone: 'UTC',
            notifications: {
              email: true,
              sms: false,
              push: true,
              marketing: false
            },
            privacy: {
              profileVisibility: 'private' as const,
              showEmail: false,
              showPhone: false
            }
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        },
        'consultant@elabsolutions.com': {
          id: 'consultant-001',
          email: 'consultant@elabsolutions.com',
          role: UserRole.CONSULTANT,
          status: UserStatus.ACTIVE,
          profile: {
            firstName: 'John',
            lastName: 'Consultant',
            phone: '+1234567890',
            country: 'US',
            profession: 'Healthcare Consultant'
          },
          preferences: {
            language: 'en' as const,
            timezone: 'UTC',
            notifications: {
              email: true,
              sms: false,
              push: true,
              marketing: false
            },
            privacy: {
              profileVisibility: 'private' as const,
              showEmail: false,
              showPhone: false
            }
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        },
        'nurse.jane@example.com': {
          id: 'applicant-001',
          email: 'nurse.jane@example.com',
          role: UserRole.APPLICANT,
          status: UserStatus.ACTIVE,
          profile: {
            firstName: 'Jane',
            lastName: 'Smith',
            phone: '+1234567890',
            country: 'US',
            profession: 'Registered Nurse'
          },
          preferences: {
            language: 'en' as const,
            timezone: 'UTC',
            notifications: {
              email: true,
              sms: false,
              push: true,
              marketing: false
            },
            privacy: {
              profileVisibility: 'private' as const,
              showEmail: false,
              showPhone: false
            }
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        },
        // Test users for E2E testing (matching test-data.ts)
        'test.applicant@example.com': {
          id: 'test-applicant-001',
          email: 'test.applicant@example.com',
          role: UserRole.APPLICANT,
          status: UserStatus.ACTIVE,
          profile: {
            firstName: 'John',
            lastName: 'Test Applicant',
            phone: '+1234567890',
            country: 'United States',
            profession: 'Registered Nurse'
          },
          preferences: {
            language: 'en' as const,
            timezone: 'UTC',
            notifications: {
              email: true,
              sms: false,
              push: true,
              marketing: false
            },
            privacy: {
              profileVisibility: 'private' as const,
              showEmail: false,
              showPhone: false
            }
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        },
        'test.consultant@example.com': {
          id: 'test-consultant-001',
          email: 'test.consultant@example.com',
          role: UserRole.CONSULTANT,
          status: UserStatus.ACTIVE,
          profile: {
            firstName: 'Sarah',
            lastName: 'Test Consultant',
            phone: '+1234567891',
            country: 'United States',
            profession: 'Healthcare Consultant'
          },
          preferences: {
            language: 'en' as const,
            timezone: 'UTC',
            notifications: {
              email: true,
              sms: false,
              push: true,
              marketing: false
            },
            privacy: {
              profileVisibility: 'private' as const,
              showEmail: false,
              showPhone: false
            }
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        },
        'test.admin@example.com': {
          id: 'test-admin-001',
          email: 'test.admin@example.com',
          role: UserRole.ADMIN,
          status: UserStatus.ACTIVE,
          profile: {
            firstName: 'Mike',
            lastName: 'Test Admin',
            phone: '+1234567892',
            country: 'United States',
            profession: 'System Administrator'
          },
          preferences: {
            language: 'en' as const,
            timezone: 'UTC',
            notifications: {
              email: true,
              sms: false,
              push: true,
              marketing: false
            },
            privacy: {
              profileVisibility: 'private' as const,
              showEmail: false,
              showPhone: false
            }
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        },
        'test.superadmin@example.com': {
          id: 'test-super-admin-001',
          email: 'test.superadmin@example.com',
          role: UserRole.SUPER_ADMIN,
          status: UserStatus.ACTIVE,
          profile: {
            firstName: 'Lisa',
            lastName: 'Test Super Admin',
            phone: '+1234567893',
            country: 'United States',
            profession: 'Super Administrator'
          },
          preferences: {
            language: 'en' as const,
            timezone: 'UTC',
            notifications: {
              email: true,
              sms: false,
              push: true,
              marketing: false
            },
            privacy: {
              profileVisibility: 'private' as const,
              showEmail: false,
              showPhone: false
            }
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        }
      };

      const mockPasswords = {
        'admin@elabsolutions.com': 'admin123!',
        'consultant@elabsolutions.com': 'consultant123!',
        'nurse.jane@example.com': 'applicant123!',
        // Test user passwords (matching test-data.ts)
        'test.applicant@example.com': 'TestPassword123!',
        'test.consultant@example.com': 'TestPassword123!',
        'test.admin@example.com': 'TestPassword123!',
        'test.superadmin@example.com': 'TestPassword123!'
      };

      const user = mockUsers[credentials.email as keyof typeof mockUsers];
      const expectedPassword = mockPasswords[credentials.email as keyof typeof mockPasswords];

      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!user || credentials.password !== expectedPassword) {
        return {
          success: false,
          error: new Error('Invalid email or password')
        };
      }

      // Generate mock tokens
      const accessToken = this.generateMockJWT(user);
      const refreshToken = generateUuid();
      
      const tokens: TokenPair = {
        accessToken,
        refreshToken,
        expiresIn: 3600, // 1 hour in seconds
        tokenType: 'Bearer'
      };

      const session: AuthSession = {
        user,
        accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + tokens.expiresIn * 1000).toISOString(),
        issuedAt: new Date().toISOString(),
        sessionId: generateUuid(),
        deviceInfo: await this.getDeviceInfo()
      };

      // Store tokens securely
      await this.storeTokens(tokens);
      await this.storeSession(session);

      return {
        success: true,
        data: session
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  /**
   * Register new user account
   */
  async register(data: RegisterData): Promise<Result<{ user: User; requiresVerification: boolean }, Error>> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<{
        user: User;
        requiresVerification: boolean;
        message: string;
      }> = await response.json();

      if (!isSuccessResponse(result)) {
        return {
          success: false,
          error: new Error(result.error.message)
        };
      }

      return {
        success: true,
        data: {
          user: result.data.user,
          requiresVerification: result.data.requiresVerification
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  /**
   * Logout user and invalidate session
   */
  async logout(): Promise<Result<void, Error>> {
    try {
      const session = await this.getStoredSession();
      
      if (session) {
        // Call logout endpoint to invalidate server-side session
        await fetch(`${this.baseUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: session.sessionId
          }),
        });

        // Log logout event
        await this.logSecurityEvent({
          type: SecurityEventType.LOGOUT,
          userId: session.user.id,
          sessionId: session.sessionId,
          severity: 'low',
          description: 'User logged out',
          metadata: {}
        });
      }

      // Clear local storage
      await this.clearStoredTokens();
      await this.clearStoredSession();

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<Result<TokenPair, Error>> {
    // Prevent multiple concurrent refresh requests
    if (this.refreshPromise) {
      return toResult(this.refreshPromise);
    }

    this.refreshPromise = this.performTokenRefresh();
    const result = await toResult(this.refreshPromise);
    this.refreshPromise = null;

    return result;
  }

  private async performTokenRefresh(): Promise<TokenPair> {
    const refreshToken = await this.getStoredRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result: ApiResponse<TokenPair> = await response.json();

    if (!isSuccessResponse(result)) {
      // Clear invalid tokens
      await this.clearStoredTokens();
      await this.clearStoredSession();
      throw new Error(result.error.message);
    }

    // Store new tokens
    await this.storeTokens(result.data);

    return result.data;
  }

  // ============================================================================
  // PASSWORD MANAGEMENT
  // ============================================================================

  /**
   * Request password reset
   */
  async forgotPassword(request: PasswordResetRequest): Promise<Result<void, Error>> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const result: ApiResponse<void> = await response.json();

      if (!isSuccessResponse(result)) {
        return {
          success: false,
          error: new Error(result.error.message)
        };
      }

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: PasswordResetData): Promise<Result<void, Error>> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<void> = await response.json();

      if (!isSuccessResponse(result)) {
        return {
          success: false,
          error: new Error(result.error.message)
        };
      }

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  /**
   * Change user password
   */
  async changePassword(data: ChangePasswordData): Promise<Result<void, Error>> {
    try {
      const accessToken = await this.getAccessToken();
      
      if (!accessToken) {
        return {
          success: false,
          error: new Error('Not authenticated')
        };
      }

      const response = await fetch(`${this.baseUrl}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<void> = await response.json();

      if (!isSuccessResponse(result)) {
        return {
          success: false,
          error: new Error(result.error.message)
        };
      }

      // Log password change event
      const session = await this.getStoredSession();
      if (session) {
        await this.logSecurityEvent({
          type: SecurityEventType.PASSWORD_CHANGE,
          userId: session.user.id,
          sessionId: session.sessionId,
          severity: 'medium',
          description: 'User changed password',
          metadata: {}
        });
      }

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  // ============================================================================
  // EMAIL AND PHONE VERIFICATION
  // ============================================================================

  /**
   * Verify email address
   */
  async verifyEmail(data: EmailVerificationData): Promise<Result<void, Error>> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<void> = await response.json();

      if (!isSuccessResponse(result)) {
        return {
          success: false,
          error: new Error(result.error.message)
        };
      }

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  /**
   * Verify phone number
   */
  async verifyPhone(data: PhoneVerificationData): Promise<Result<void, Error>> {
    try {
      const accessToken = await this.getAccessToken();
      
      if (!accessToken) {
        return {
          success: false,
          error: new Error('Not authenticated')
        };
      }

      const response = await fetch(`${this.baseUrl}/auth/verify-phone`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<void> = await response.json();

      if (!isSuccessResponse(result)) {
        return {
          success: false,
          error: new Error(result.error.message)
        };
      }

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  // ============================================================================
  // TWO-FACTOR AUTHENTICATION
  // ============================================================================

  /**
   * Enable two-factor authentication
   */
  async enableTwoFactor(): Promise<Result<TwoFactorSetupData, Error>> {
    try {
      const accessToken = await this.getAccessToken();
      
      if (!accessToken) {
        return {
          success: false,
          error: new Error('Not authenticated')
        };
      }

      const response = await fetch(`${this.baseUrl}/auth/2fa/enable`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result: ApiResponse<TwoFactorSetupData> = await response.json();

      if (!isSuccessResponse(result)) {
        return {
          success: false,
          error: new Error(result.error.message)
        };
      }

      return { success: true, data: result.data };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  /**
   * Verify two-factor authentication code
   */
  async verifyTwoFactor(data: TwoFactorVerificationData): Promise<Result<void, Error>> {
    try {
      const accessToken = await this.getAccessToken();
      
      if (!accessToken) {
        return {
          success: false,
          error: new Error('Not authenticated')
        };
      }

      const response = await fetch(`${this.baseUrl}/auth/2fa/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<void> = await response.json();

      if (!isSuccessResponse(result)) {
        return {
          success: false,
          error: new Error(result.error.message)
        };
      }

      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  // ============================================================================
  // SESSION MANAGEMENT
  // ============================================================================

  /**
   * Get current user session
   */
  async getCurrentSession(): Promise<AuthSession | null> {
    return this.getStoredSession();
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getStoredSession();
    
    if (!session) {
      return false;
    }

    // Check if token is expired
    const payload = this.decodeJWT(session.accessToken);
    if (!payload || payload.exp * 1000 < Date.now()) {
      // Try to refresh token
      const refreshResult = await this.refreshToken();
      return refreshResult.success;
    }

    return true;
  }

  /**
   * Get current access token
   */
  async getAccessToken(): Promise<string | null> {
    const session = await this.getStoredSession();
    
    if (!session) {
      return null;
    }

    // Check if token is expired
    const payload = this.decodeJWT(session.accessToken);
    if (!payload || payload.exp * 1000 < Date.now()) {
      // Try to refresh token
      const refreshResult = await this.refreshToken();
      if (refreshResult.success) {
        const updatedSession = await this.getStoredSession();
        return updatedSession?.accessToken || null;
      }
      return null;
    }

    return session.accessToken;
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Decode JWT token
   */
  private decodeJWT(token: string): JWTPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const payload = JSON.parse(atob(parts[1]));
      return payload as JWTPayload;
    } catch {
      return null;
    }
  }

  /**
   * Generate mock JWT token for development
   */
  private generateMockJWT(user: any): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    };

    // Mock JWT - just base64 encode for development
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const mockSignature = 'mock-signature-for-development';

    return `${encodedHeader}.${encodedPayload}.${mockSignature}`;
  }

  /**
   * Get device information for security logging
   */
  private async getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      ipAddress: '', // Will be filled by server
      deviceType: this.getDeviceType(),
      browser: this.getBrowserName(),
      os: this.getOperatingSystem(),
      location: undefined // Will be filled by server if needed
    };
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private getBrowserName(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private getOperatingSystem(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  /**
   * Log security events
   */
  private async logSecurityEvent(event: Omit<SecurityEvent, 'id' | 'timestamp' | 'resolved' | 'resolvedAt' | 'resolvedBy'>) {
    try {
      await fetch(`${this.baseUrl}/auth/security-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      // Silent fail for security logging
      console.warn('Failed to log security event:', error);
    }
  }

  // ============================================================================
  // STORAGE METHODS
  // ============================================================================

  private async storeTokens(tokens: TokenPair): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
      
      // Also store access token in a cookie for middleware access
      document.cookie = `auth-token=${tokens.accessToken}; path=/; max-age=3600; SameSite=lax`;
    }
  }

  private async storeSession(session: AuthSession): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(session));
    }
  }

  private async getStoredSession(): Promise<AuthSession | null> {
    if (typeof window === 'undefined') {
      return null;
    }

    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as AuthSession;
    } catch {
      return null;
    }
  }

  private async getStoredRefreshToken(): Promise<string | null> {
    if (typeof window === 'undefined') {
      return null;
    }

    return localStorage.getItem(this.refreshTokenKey);
  }

  private async clearStoredTokens(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.refreshTokenKey);
      
      // Also clear the auth token cookie
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  private async clearStoredSession(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const authClient = new AuthClient();
