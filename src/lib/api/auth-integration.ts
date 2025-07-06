/**
 * Authentication Integration for HTTP Client
 * 
 * This module provides the integration layer between the HTTP client
 * and the existing authentication system, ensuring seamless token
 * management and session handling.
 */

import { httpClient } from './http-client';
import type { AuthSession, TokenPair } from '@/types/auth';
import type { User } from '@/types/business';

// ============================================================================
// AUTHENTICATION INTEGRATION CLASS
// ============================================================================

export class AuthIntegration {
  private static instance: AuthIntegration;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): AuthIntegration {
    if (!AuthIntegration.instance) {
      AuthIntegration.instance = new AuthIntegration();
    }
    return AuthIntegration.instance;
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  /**
   * Initialize the authentication integration with the HTTP client
   */
  initialize(authStore: any): void {
    if (this.isInitialized) {
      return;
    }

    // Set up the refresh token handler
    httpClient.setRefreshTokenHandler(async () => {
      const session = authStore.getState().session;
      if (!session?.refreshToken) {
        throw new Error('No refresh token available');
      }

      // Call the auth client's refresh method
      const { authClient } = await import('@/lib/auth/auth-client');
      const result = await authClient.refreshToken();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error.message);
      }
    });

    // Subscribe to auth state changes
    authStore.subscribe((state: any) => {
      httpClient.setAuthSession(state.session);
    });

    // Set initial session if available
    const currentSession = authStore.getState().session;
    if (currentSession) {
      httpClient.setAuthSession(currentSession);
    }

    this.isInitialized = true;
  }

  // ============================================================================
  // SESSION MANAGEMENT
  // ============================================================================

  /**
   * Update the HTTP client with a new authentication session
   */
  updateSession(session: AuthSession | null): void {
    httpClient.setAuthSession(session);
  }

  /**
   * Clear the authentication session from the HTTP client
   */
  clearSession(): void {
    httpClient.setAuthSession(null);
    httpClient.clearCache(); // Clear cache on logout
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Check if the integration is initialized
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Get HTTP client metrics
   */
  getMetrics() {
    return httpClient.getMetrics();
  }

  /**
   * Clear HTTP client cache
   */
  clearCache(): void {
    httpClient.clearCache();
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const authIntegration = AuthIntegration.getInstance();

// ============================================================================
// INITIALIZATION HOOK
// ============================================================================

/**
 * Initialize the authentication integration
 * This should be called once during app initialization
 */
export function initializeAuthIntegration(authStore: any): void {
  authIntegration.initialize(authStore);
}

// ============================================================================
// AUTHENTICATION HOOKS FOR REACT COMPONENTS
// ============================================================================

/**
 * Hook to get authenticated HTTP client instance
 * This ensures the client is properly configured with auth
 */
export function useAuthenticatedHttpClient() {
  if (!authIntegration.isReady()) {
    throw new Error('Auth integration not initialized. Call initializeAuthIntegration first.');
  }
  
  return httpClient;
}

/**
 * Hook to get HTTP client metrics
 */
export function useHttpClientMetrics() {
  return authIntegration.getMetrics();
}

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

/**
 * Check if an error is an authentication error
 */
export function isAuthError(error: any): boolean {
  return error?.statusCode === 401 || error?.code === 'UNAUTHORIZED';
}

/**
 * Check if an error is a permission error
 */
export function isPermissionError(error: any): boolean {
  return error?.statusCode === 403 || error?.code === 'FORBIDDEN';
}

/**
 * Check if an error is a network error
 */
export function isNetworkError(error: any): boolean {
  return error?.code === 'NETWORK_ERROR' || error?.code === 'ECONNREFUSED';
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: any): string {
  if (isAuthError(error)) {
    return 'Your session has expired. Please log in again.';
  }
  
  if (isPermissionError(error)) {
    return 'You do not have permission to perform this action.';
  }
  
  if (isNetworkError(error)) {
    return 'Network error. Please check your connection and try again.';
  }
  
  return error?.message || 'An unexpected error occurred. Please try again.';
}

// ============================================================================
// REQUEST INTERCEPTOR UTILITIES
// ============================================================================

/**
 * Add custom headers to requests
 */
export function addCustomHeaders(headers: Record<string, string>): void {
  // This could be extended to add custom headers globally
  // For now, headers are managed per request
}

/**
 * Set API base URL
 */
export function setApiBaseUrl(baseUrl: string): void {
  httpClient.updateConfig({ baseURL: baseUrl });
}

/**
 * Enable or disable request caching
 */
export function setCacheEnabled(enabled: boolean): void {
  httpClient.updateConfig({ enableCache: enabled });
}

/**
 * Set request timeout
 */
export function setRequestTimeout(timeout: number): void {
  httpClient.updateConfig({ timeout });
}

// ============================================================================
// DEVELOPMENT UTILITIES
// ============================================================================

/**
 * Get detailed HTTP client metrics for debugging
 */
export function getDetailedMetrics() {
  const metrics = httpClient.getMetrics();
  return {
    ...metrics,
    isInitialized: authIntegration.isReady(),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Reset HTTP client state (useful for testing)
 */
export function resetHttpClient(): void {
  httpClient.clearCache();
  httpClient.setAuthSession(null);
}

// ============================================================================
// TYPE EXPORTS FOR CONVENIENCE
// ============================================================================

export type { AuthSession, TokenPair } from '@/types/auth';
export type { ApiResponse, ApiError, RequestConfig } from '@/types/api';
