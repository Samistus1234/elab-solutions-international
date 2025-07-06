/**
 * Auth Store Integration for HTTP Client
 * 
 * This module provides the integration between the existing auth store
 * and the HTTP client infrastructure, ensuring seamless authentication
 * flow and token management.
 */

import { initializeAuthIntegration } from './auth-integration';
import type { AuthStore } from '@/types/auth';

// ============================================================================
// INTEGRATION SETUP
// ============================================================================

/**
 * Set up the integration between auth store and HTTP client
 * This should be called during app initialization
 */
export async function setupAuthStoreIntegration(): Promise<void> {
  try {
    // Dynamically import the auth store to avoid circular dependencies
    const { useAuthStore } = await import('@/lib/auth/auth-store');
    
    // Initialize the auth integration with the store
    initializeAuthIntegration(useAuthStore);

    console.log('✅ Auth store integration initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize auth store integration:', error);
    throw error;
  }
}

/**
 * Enhanced auth store with HTTP client integration
 * This extends the existing auth store with API-related functionality
 */
export function createEnhancedAuthStore() {
  return {
    // ============================================================================
    // API INTEGRATION METHODS
    // ============================================================================

    /**
     * Initialize API services after authentication
     */
    async initializeApiServices(): Promise<void> {
      try {
        await setupAuthStoreIntegration();
      } catch (error) {
        console.error('Failed to initialize API services:', error);
        throw error;
      }
    },

    /**
     * Clear API state on logout
     */
    clearApiState(): void {
      const { resetHttpClient } = require('./auth-integration');
      resetHttpClient();
    },

    /**
     * Refresh API authentication
     */
    async refreshApiAuth(): Promise<void> {
      const { authIntegration } = await import('./auth-integration');
      const { useAuthStore } = await import('@/lib/auth/auth-store');
      
      const currentSession = useAuthStore.getState().session;
      authIntegration.updateSession(currentSession);
    },

    /**
     * Get API client metrics
     */
    getApiMetrics() {
      const { getDetailedMetrics } = require('./auth-integration');
      return getDetailedMetrics();
    },
  };
}

// ============================================================================
// AUTH STORE HOOKS ENHANCEMENT
// ============================================================================

/**
 * Enhanced auth hook with API integration
 */
export function useAuthWithApi() {
  const { useAuthStore } = require('@/lib/auth/auth-store');
  const { useApiServices } = require('./index');
  
  const authState = useAuthStore();
  const apiServices = useApiServices();

  return {
    ...authState,
    api: apiServices,
    
    /**
     * Login with API initialization
     */
    async loginWithApi(credentials: any) {
      const result = await authState.login(credentials);
      
      if (result.success) {
        // Initialize API services after successful login
        await setupAuthStoreIntegration();
      }
      
      return result;
    },

    /**
     * Logout with API cleanup
     */
    async logoutWithApi() {
      // Clear API state before logout
      const { resetHttpClient } = await import('./auth-integration');
      resetHttpClient();
      
      return authState.logout();
    },

    /**
     * Refresh session with API update
     */
    async refreshSessionWithApi() {
      const result = await authState.refreshSession();
      
      if (result.success) {
        // Update API authentication
        const { authIntegration } = await import('./auth-integration');
        authIntegration.updateSession(result.data);
      }
      
      return result;
    },
  };
}

// ============================================================================
// MIDDLEWARE FOR AUTH STORE
// ============================================================================

/**
 * Middleware to integrate HTTP client with auth store state changes
 */
export const authStoreMiddleware = (config: any) => (set: any, get: any, api: any) => {
  const store = config(
    (...args: any[]) => {
      set(...args);
      
      // Update HTTP client when auth state changes
      const state = get();
      if (state.session) {
        import('./auth-integration').then(({ authIntegration }) => {
          authIntegration.updateSession(state.session);
        });
      }
    },
    get,
    api
  );

  return store;
};

// ============================================================================
// INITIALIZATION UTILITIES
// ============================================================================

/**
 * Initialize the complete authentication and API system
 */
export async function initializeAuthAndApi(): Promise<void> {
  try {
    // Set up auth store integration
    await setupAuthStoreIntegration();

    // Initialize API infrastructure
    const { initializeApiInfrastructure } = await import('./index');
    const { useAuthStore } = await import('@/lib/auth/auth-store');
    
    await initializeApiInfrastructure(useAuthStore);

    console.log('✅ Complete auth and API system initialized');
  } catch (error) {
    console.error('❌ Failed to initialize auth and API system:', error);
    throw error;
  }
}

/**
 * Check if auth and API system is ready
 */
export async function isAuthAndApiReady(): Promise<boolean> {
  try {
    const { authIntegration } = await import('./auth-integration');
    return authIntegration.isReady();
  } catch (error) {
    return false;
  }
}

/**
 * Wait for auth and API system to be ready
 */
export async function waitForAuthAndApi(timeout: number = 10000): Promise<void> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (await isAuthAndApiReady()) {
      return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  throw new Error('Timeout waiting for auth and API system to be ready');
}

// ============================================================================
// ERROR HANDLING INTEGRATION
// ============================================================================

/**
 * Enhanced error handler that integrates with auth store
 */
export function createAuthAwareErrorHandler() {
  return async (error: any) => {
    const { isAuthError } = await import('./auth-integration');
    
    if (isAuthError(error)) {
      // Handle authentication errors by triggering logout
      const { useAuthStore } = await import('@/lib/auth/auth-store');
      const authStore = useAuthStore.getState();
      
      if (authStore.isAuthenticated) {
        console.warn('Authentication error detected, logging out user');
        await authStore.logout();
      }
    }
    
    // Re-throw the error for further handling
    throw error;
  };
}

// ============================================================================
// DEVELOPMENT UTILITIES
// ============================================================================

/**
 * Development utilities for auth and API integration
 */
export const devAuthApiUtils = process.env.NODE_ENV === 'development' ? {
  /**
   * Test auth and API integration
   */
  async testIntegration(): Promise<void> {
    console.log('🧪 Testing auth and API integration...');
    
    try {
      const isReady = await isAuthAndApiReady();
      console.log('✅ Integration ready:', isReady);
      
      if (isReady) {
        const { getApiMetrics } = await import('./index');
        const metrics = getApiMetrics();
        console.log('📊 API Metrics:', metrics);
      }
    } catch (error) {
      console.error('❌ Integration test failed:', error);
    }
  },

  /**
   * Reset auth and API state
   */
  async resetState(): Promise<void> {
    console.log('🔄 Resetting auth and API state...');
    
    try {
      const { resetHttpClient } = await import('./auth-integration');
      const { useAuthStore } = await import('@/lib/auth/auth-store');
      
      resetHttpClient();
      useAuthStore.getState().logout();
      
      console.log('✅ State reset complete');
    } catch (error) {
      console.error('❌ State reset failed:', error);
    }
  },

  /**
   * Simulate auth scenarios
   */
  async simulateAuthScenario(scenario: 'login' | 'logout' | 'refresh' | 'expire'): Promise<void> {
    console.log(`🎭 Simulating auth scenario: ${scenario}`);
    
    // Implementation would depend on specific testing needs
    switch (scenario) {
      case 'login':
        console.log('Simulating successful login...');
        break;
      case 'logout':
        console.log('Simulating logout...');
        break;
      case 'refresh':
        console.log('Simulating token refresh...');
        break;
      case 'expire':
        console.log('Simulating token expiration...');
        break;
    }
  },
} : undefined;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  AuthStore
} from '@/types/auth';
export { initializeAuthIntegration };
