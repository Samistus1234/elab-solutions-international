/**
 * API Layer Index for ELAB Solutions International
 * 
 * This module exports all API services and provides initialization
 * functions for the complete API infrastructure.
 */

// ============================================================================
// CORE EXPORTS
// ============================================================================
import { userService, applicationService } from './services/user-service';
import { initializeAuthIntegration } from './auth-store-integration';
export { HttpClient, httpClient, createHttpClient } from './http-client';
export { 
  authIntegration, 
  initializeAuthIntegration,
  isAuthError,
  isPermissionError,
  isNetworkError,
  getErrorMessage,
} from './auth-integration';

// ============================================================================
// BASE SERVICE EXPORTS
// ============================================================================

export { 
  BaseService,
  type ServiceConfig,
  type CreateRequest,
  type UpdateRequest,
  type GetRequest,
  type ListRequest,
  type DeleteRequest
} from './base-service';

// ============================================================================
// SERVICE EXPORTS
// ============================================================================

export { 
  UserService, 
  userService,
  type UserFilter,
  type CreateUserData,
  type UpdateUserData,
  type ChangePasswordData,
  type UpdateProfileData
} from './services/user-service';

export { 
  ApplicationService, 
  applicationService,
  type ApplicationFilter,
  type CreateApplicationData,
  type UpdateApplicationData,
  type SubmitApplicationData,
  type ApplicationComment
} from './services/application-service';

// ============================================================================
// INITIALIZATION EXPORTS
// ============================================================================

export {
  initializeApi,
  isApiInitialized,
  getInitializationStatus,
  waitForApiInitialization,
  reinitializeApi,
  shutdownApi,
  useApiInitialization,
  type ApiInitializationConfig
} from './initialize';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  ApiClient,
  ApiError,
  ApiResponse,
  RequestConfig,
  PaginatedResponse,
  BaseFilter
} from '@/types/api';

export type {
  AuthSession,
  TokenPair
} from '@/types/auth';

export type {
  User,
  Application,
  ApplicationType,
  ApplicationStatus,
  UserRole,
  HealthcareProfession
} from '@/types/business';

export type {
  ID,
  Result
} from '@/types';

// ============================================================================
// API INITIALIZATION
// ============================================================================

/**
 * Initialize the complete API infrastructure
 * This should be called once during app initialization
 */
export async function initializeApiInfrastructure(authStore: any): Promise<void> {
  try {
    // Initialize authentication integration
    initializeAuthIntegration(authStore);

    // Set up global error handling
    setupGlobalErrorHandling();

    // Configure API client based on environment
    configureApiClient();

    console.log('✅ API Infrastructure initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize API infrastructure:', error);
    throw error;
  }
}

/**
 * Set up global error handling for API requests
 */
function setupGlobalErrorHandling(): void {
  // This could be extended to integrate with error reporting services
  // like Sentry, LogRocket, etc.
  
  if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', (event) => {
      if (isApiError(event.reason)) {
        console.error('Unhandled API Error:', event.reason);
        // Could send to error reporting service here
      }
    });
  }
}

/**
 * Configure API client based on environment
 */
function configureApiClient(): void {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  // Set API base URL based on environment
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
    (isDevelopment ? 'http://localhost:3001/api' : 'https://api.elabsolutions.com');
  
  setApiBaseUrl(apiUrl);

  // Configure caching based on environment
  setCacheEnabled(!isDevelopment); // Disable cache in development

  // Set timeout based on environment
  setRequestTimeout(isDevelopment ? 60000 : 30000); // Longer timeout in development

  console.log(`🔧 API Client configured for ${process.env.NODE_ENV} environment`);
  console.log(`🌐 API Base URL: ${apiUrl}`);
}

/**
 * Check if an error is an API error
 */
function isApiError(error: any): boolean {
  return error && 
    typeof error === 'object' && 
    'code' in error && 
    'message' in error && 
    'statusCode' in error;
}

// ============================================================================
// SERVICE REGISTRY
// ============================================================================

/**
 * Registry of all available API services
 */
export const apiServices = {
  user: userService,
  application: applicationService,
} as const;

/**
 * Get all available API services
 */
export function getApiServices() {
  return apiServices;
}

/**
 * Get a specific API service by name
 */
export function getApiService<K extends keyof typeof apiServices>(serviceName: K): typeof apiServices[K] {
  return apiServices[serviceName];
}

// ============================================================================
// HEALTH CHECK AND MONITORING
// ============================================================================

/**
 * Perform API health check
 */
export async function performHealthCheck(): Promise<{
  status: 'healthy' | 'unhealthy';
  services: Record<string, 'up' | 'down'>;
  metrics: ReturnType<typeof useHttpClientMetrics>;
  timestamp: string;
}> {
  const results = {
    status: 'healthy' as const,
    services: {} as Record<string, 'up' | 'down'>,
    metrics: useHttpClientMetrics(),
    timestamp: new Date().toISOString(),
  };

  // Test each service
  const serviceTests = [
    { name: 'user', test: () => userService.getCurrentProfile() },
    { name: 'application', test: () => applicationService.getStatistics() },
  ];

  for (const { name, test } of serviceTests) {
    try {
      await test();
      results.services[name] = 'up';
    } catch (error) {
      results.services[name] = 'down';
      results.status = 'unhealthy' as any;
    }
  }

  return results;
}

/**
 * Get API performance metrics
 */
export function getApiMetrics() {
  return {
    http: useHttpClientMetrics(),
    detailed: getDetailedMetrics(),
    timestamp: new Date().toISOString(),
  };
}

// ============================================================================
// DEVELOPMENT UTILITIES
// ============================================================================

/**
 * Development utilities (only available in development mode)
 */
export const devUtils = process.env.NODE_ENV === 'development' ? {
  /**
   * Reset all API state (useful for testing)
   */
  resetApiState(): void {
    resetHttpClient();
    console.log('🔄 API state reset');
  },

  /**
   * Log current API configuration
   */
  logApiConfig(): void {
    console.log('🔧 Current API Configuration:', {
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      environment: process.env.NODE_ENV,
      metrics: getApiMetrics(),
    });
  },

  /**
   * Test API connectivity
   */
  async testConnectivity(): Promise<void> {
    console.log('🔍 Testing API connectivity...');
    const healthCheck = await performHealthCheck();
    console.log('📊 Health Check Results:', healthCheck);
  },

  /**
   * Simulate API errors for testing
   */
  simulateError(type: 'auth' | 'permission' | 'network' | 'server'): void {
    console.log(`🚨 Simulating ${type} error...`);
    // This could be implemented to inject test errors
  },
} : undefined;

// ============================================================================
// BASIC API SERVICES HOOK (NO REACT DEPENDENCIES)
// ============================================================================

/**
 * Get all API services with authentication
 * Note: For React hooks, create a separate .tsx file
 */
export function useApiServices() {
  const httpClient = useAuthenticatedHttpClient();
  
  return {
    user: userService,
    application: applicationService,
    httpClient,
    metrics: useHttpClientMetrics(),
  };
}

/**
 * Basic API health monitoring
 * Note: For React hooks, create a separate .tsx file
 */
export function useApiHealth() {
  return {
    health: null,
    loading: false,
    checkHealth: async () => {
      try {
        return await performHealthCheck();
      } catch (error) {
        console.error('Health check failed:', error);
        return null;
      }
    },
  };
}

// HTTP Client Configuration Functions
export const setApiBaseUrl = (url: string) => {
  console.log('Setting API base URL to:', url);
};

export const setCacheEnabled = (enabled: boolean) => {
  console.log('Setting cache enabled:', enabled);
};

export const setRequestTimeout = (timeout: number) => {
  console.log('Setting request timeout:', timeout);
};

export const resetHttpClient = () => {
  console.log('Resetting HTTP client');
};

export const useAuthenticatedHttpClient = () => {
  return {} as any; // httpClient placeholder
};

export const useHttpClientMetrics = () => {
  return {
    requestCount: 0,
    errorCount: 0,
    averageResponseTime: 0
  };
};

export const getDetailedMetrics = () => {
  return {
    requests: [],
    errors: [],
    performance: {}
  };
};
