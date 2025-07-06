/**
 * Real API Authentication Client for ELAB Solutions International
 * 
 * This module provides authentication functionality that connects to real API endpoints
 * instead of using mock data.
 */

import type {
  AuthSession,
  LoginCredentials,
  RegisterData,
  TokenPair,
} from '@/types/auth';
import type { User } from '@/types/business';
import { UserRole, UserStatus } from '@/types/business';
import type { Result } from '@/types';
import { toResult } from '@/types/utils';

// ============================================================================
// REAL API AUTHENTICATION CLIENT CLASS
// ============================================================================

export class RealAuthClient {
  private readonly baseUrl: string;
  private readonly storageKey = 'elab_auth_session';
  private readonly refreshTokenKey = 'elab_refresh_token';

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  // ============================================================================
  // CORE AUTHENTICATION METHODS
  // ============================================================================

  /**
   * Authenticate user with email and password using real API
   */
  async login(credentials: LoginCredentials): Promise<Result<AuthSession, Error>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (!response.ok) {
        return toResult(null, new Error(result.error?.message || 'Login failed'));
      }

      if (!result.success) {
        return toResult(null, new Error(result.error?.message || 'Login failed'));
      }

      // Transform API response to AuthSession format
      const authSession: AuthSession = {
        user: {
          id: result.data.user.id,
          email: result.data.user.email,
          role: result.data.user.role as UserRole,
          status: result.data.user.status as UserStatus,
          profile: {
            firstName: result.data.user.firstName,
            lastName: result.data.user.lastName,
            phone: result.data.user.phone || '',
            country: result.data.user.country || '',
            profession: result.data.user.profession || ''
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
          createdAt: result.data.user.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          lastActivityAt: new Date().toISOString()
        },
        accessToken: result.data.tokens.accessToken,
        refreshToken: result.data.tokens.refreshToken,
        expiresAt: new Date(Date.now() + (result.data.tokens.expiresIn * 1000)).toISOString(),
        sessionId: result.data.session.id,
        issuedAt: new Date().toISOString(),
        lastRefreshAt: new Date().toISOString()
      };

      // Store tokens securely
      this.storeTokens({
        accessToken: authSession.accessToken,
        refreshToken: authSession.refreshToken
      });

      return toResult(authSession, null);

    } catch (error) {
      console.error('Login error:', error);
      return toResult(null, error instanceof Error ? error : new Error('Login failed'));
    }
  }

  /**
   * Register new user using real API
   */
  async register(data: RegisterData): Promise<Result<AuthSession, Error>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          consentGiven: true // Required by API
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return toResult(null, new Error(result.error?.message || 'Registration failed'));
      }

      if (!result.success) {
        return toResult(null, new Error(result.error?.message || 'Registration failed'));
      }

      // Transform API response to AuthSession format
      const authSession: AuthSession = {
        user: {
          id: result.data.user.id,
          email: result.data.user.email,
          role: result.data.user.role as UserRole,
          status: result.data.user.status as UserStatus,
          profile: {
            firstName: result.data.user.firstName,
            lastName: result.data.user.lastName,
            phone: data.phone || '',
            country: data.country || '',
            profession: data.profession || ''
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
          createdAt: result.data.user.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          lastActivityAt: new Date().toISOString()
        },
        accessToken: result.data.tokens.accessToken,
        refreshToken: result.data.tokens.refreshToken,
        expiresAt: new Date(Date.now() + (result.data.tokens.expiresIn * 1000)).toISOString(),
        sessionId: result.data.session.id,
        issuedAt: new Date().toISOString(),
        lastRefreshAt: new Date().toISOString()
      };

      // Store tokens securely
      this.storeTokens({
        accessToken: authSession.accessToken,
        refreshToken: authSession.refreshToken
      });

      return toResult(authSession, null);

    } catch (error) {
      console.error('Registration error:', error);
      return toResult(null, error instanceof Error ? error : new Error('Registration failed'));
    }
  }

  /**
   * Logout user using real API
   */
  async logout(): Promise<Result<void, Error>> {
    try {
      const tokens = this.getStoredTokens();
      
      if (tokens?.accessToken) {
        await fetch(`${this.baseUrl}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.accessToken}`
          },
        });
      }

      // Clear stored tokens
      this.clearTokens();
      
      return toResult(undefined, null);

    } catch (error) {
      console.error('Logout error:', error);
      // Still clear tokens even if API call fails
      this.clearTokens();
      return toResult(undefined, null);
    }
  }

  // ============================================================================
  // TOKEN MANAGEMENT
  // ============================================================================

  private storeTokens(tokens: TokenPair): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(tokens));
    }
  }

  private getStoredTokens(): TokenPair | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.refreshTokenKey);
    }
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    const tokens = this.getStoredTokens();
    return tokens?.accessToken || null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const tokens = this.getStoredTokens();
    return !!tokens?.accessToken;
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const realAuthClient = new RealAuthClient();
