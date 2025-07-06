/**
 * API Infrastructure Initialization for ELAB Solutions International
 * 
 * This module provides the complete initialization setup for the HTTP client
 * infrastructure, authentication integration, and service layer.
 */

import { initializeAuthAndApi, waitForAuthAndApi } from './auth-store-integration';
import { initializeApiInfrastructure } from './index';

// ============================================================================
// INITIALIZATION CONFIGURATION
// ============================================================================

export interface ApiInitializationConfig {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
  enableCache?: boolean;
  enableMetrics?: boolean;
  enableDevTools?: boolean;
  waitForAuth?: boolean;
  authTimeout?: number;
}

const DEFAULT_CONFIG: Required<ApiInitializationConfig> = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
  retries: 3,
  enableCache: true,
  enableMetrics: true,
  enableDevTools: process.env.NODE_ENV === 'development',
  waitForAuth: true,
  authTimeout: 10000,
};

// ============================================================================
// INITIALIZATION STATE
// ============================================================================

let isInitialized = false;
let initializationPromise: Promise<void> | null = null;
let initializationError: Error | null = null;

// ============================================================================
// MAIN INITIALIZATION FUNCTION
// ============================================================================

/**
 * Initialize the complete API infrastructure
 * This is the main entry point for setting up all API-related functionality
 */
export async function initializeApi(config: ApiInitializationConfig = {}): Promise<void> {
  // Return existing promise if initialization is in progress
  if (initializationPromise) {
    return initializationPromise;
  }

  // Return immediately if already initialized
  if (isInitialized) {
    return;
  }

  // Throw previous error if initialization failed
  if (initializationError) {
    throw initializationError;
  }

  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  initializationPromise = performInitialization(finalConfig);

  try {
    await initializationPromise;
    isInitialized = true;
    console.log('✅ API infrastructure initialization complete');
  } catch (error) {
    initializationError = error as Error;
    initializationPromise = null;
    console.error('❌ API infrastructure initialization failed:', error);
    throw error;
  }
}

/**
 * Perform the actual initialization steps
 */
async function performInitialization(config: Required<ApiInitializationConfig>): Promise<void> {
  console.log('🚀 Initializing API infrastructure...');

  try {
    // Step 1: Configure HTTP client
    await configureHttpClient(config);

    // Step 2: Initialize authentication integration
    await initializeAuthAndApi();

    // Step 3: Wait for authentication system if required
    if (config.waitForAuth) {
      await waitForAuthAndApi(config.authTimeout);
    }

    // Step 4: Set up development tools if enabled
    if (config.enableDevTools) {
      await setupDevelopmentTools();
    }

    // Step 5: Perform health check
    await performInitialHealthCheck();

    console.log('🎉 API infrastructure ready for use');
  } catch (error) {
    console.error('💥 API infrastructure initialization failed:', error);
    throw error;
  }
}

// ============================================================================
// CONFIGURATION STEPS
// ============================================================================

/**
 * Configure the HTTP client with the provided settings
 */
async function configureHttpClient(config: Required<ApiInitializationConfig>): Promise<void> {
  console.log('⚙️ Configuring HTTP client...');

  const { setApiBaseUrl, setCacheEnabled, setRequestTimeout } = await import('./auth-integration');

  // Set API base URL
  setApiBaseUrl(config.apiUrl);

  // Configure caching
  setCacheEnabled(config.enableCache);

  // Set request timeout
  setRequestTimeout(config.timeout);

  console.log(`📡 HTTP client configured with base URL: ${config.apiUrl}`);
}

/**
 * Set up development tools and utilities
 */
async function setupDevelopmentTools(): Promise<void> {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.log('🛠️ Setting up development tools...');

  // Make dev utilities available globally for debugging
  const { devUtils } = await import('./index');
  const { devAuthApiUtils } = await import('./auth-store-integration');

  if (typeof window !== 'undefined') {
    (window as any).__ELAB_API_DEV__ = {
      ...devUtils,
      ...devAuthApiUtils,
      getConfig: () => DEFAULT_CONFIG,
      isInitialized: () => isInitialized,
      reinitialize: () => reinitializeApi(),
    };

    console.log('🔧 Development tools available at window.__ELAB_API_DEV__');
  }
}

/**
 * Perform initial health check to verify everything is working
 */
async function performInitialHealthCheck(): Promise<void> {
  console.log('🏥 Performing initial health check...');

  try {
    const { performHealthCheck } = await import('./index');
    const health = await performHealthCheck();

    if (health.status === 'healthy') {
      console.log('✅ Health check passed - all services operational');
    } else {
      console.warn('⚠️ Health check detected issues:', health.services);
    }
  } catch (error) {
    console.warn('⚠️ Health check failed (this may be normal during initial setup):', error);
    // Don't throw here as the API might not be available yet
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if the API infrastructure is initialized
 */
export function isApiInitialized(): boolean {
  return isInitialized;
}

/**
 * Get the initialization status
 */
export function getInitializationStatus(): {
  isInitialized: boolean;
  isInitializing: boolean;
  hasError: boolean;
  error: Error | null;
} {
  return {
    isInitialized,
    isInitializing: initializationPromise !== null && !isInitialized,
    hasError: initializationError !== null,
    error: initializationError,
  };
}

/**
 * Wait for API initialization to complete
 */
export async function waitForApiInitialization(timeout: number = 30000): Promise<void> {
  if (isInitialized) {
    return;
  }

  if (initializationError) {
    throw initializationError;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  // If no initialization is in progress, start it
  return initializeApi();
}

/**
 * Reinitialize the API infrastructure
 */
export async function reinitializeApi(config?: ApiInitializationConfig): Promise<void> {
  console.log('🔄 Reinitializing API infrastructure...');

  // Reset state
  isInitialized = false;
  initializationPromise = null;
  initializationError = null;

  // Clear existing state
  const { resetHttpClient } = await import('./auth-integration');
  resetHttpClient();

  // Reinitialize
  return initializeApi(config);
}

/**
 * Gracefully shutdown the API infrastructure
 */
export async function shutdownApi(): Promise<void> {
  console.log('🛑 Shutting down API infrastructure...');

  try {
    // Clear HTTP client state
    const { resetHttpClient } = await import('./auth-integration');
    resetHttpClient();

    // Reset initialization state
    isInitialized = false;
    initializationPromise = null;
    initializationError = null;

    console.log('✅ API infrastructure shutdown complete');
  } catch (error) {
    console.error('❌ Error during API shutdown:', error);
    throw error;
  }
}

// ============================================================================
// BASIC HOOK FOR API INITIALIZATION (NO JSX)
// ============================================================================

/**
 * Basic hook for API initialization status
 * Note: For React components, create a separate .tsx file
 */
export function useApiInitialization(config?: ApiInitializationConfig) {
  return {
    isInitialized: isApiInitialized(),
    isInitializing: initializationPromise !== null && !isInitialized,
    hasError: initializationError !== null,
    error: initializationError,
    reinitialize: () => reinitializeApi(config),
    shutdown: shutdownApi,
  };
}
