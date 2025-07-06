/**
 * Complete HTTP Client Infrastructure for ELAB Solutions International
 * 
 * This module provides the core HTTP client with authentication integration,
 * type safety, error handling, and performance optimizations.
 */

import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError,
  InternalAxiosRequestConfig 
} from 'axios';
import type {
  ApiClient,
  ApiError,
  RequestConfig,
  ApiResponse
} from '@/types/api';
import type { AuthSession, TokenPair } from '@/types/auth';
import { isSuccessResponse, toResult } from '@/types/utils';

// ============================================================================
// HTTP CLIENT CONFIGURATION
// ============================================================================

interface HttpClientConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  enableCache: boolean;
  enableMetrics: boolean;
}

const DEFAULT_CONFIG: HttpClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 30000, // 30 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
  enableCache: true,
  enableMetrics: true,
};

// ============================================================================
// REQUEST CACHE IMPLEMENTATION
// ============================================================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class RequestCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  getCacheKey(method: string, url: string, params?: any): string {
    const paramString = params ? JSON.stringify(params) : '';
    return `${method.toUpperCase()}:${url}:${paramString}`;
  }
}

// ============================================================================
// METRICS COLLECTION
// ============================================================================

interface RequestMetrics {
  method: string;
  url: string;
  duration: number;
  status: number;
  success: boolean;
  timestamp: number;
}

class MetricsCollector {
  private metrics: RequestMetrics[] = [];
  private readonly maxMetrics = 1000;

  record(metrics: RequestMetrics): void {
    this.metrics.push(metrics);
    
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  getMetrics(): RequestMetrics[] {
    return [...this.metrics];
  }

  getAverageResponseTime(): number {
    if (this.metrics.length === 0) return 0;
    const total = this.metrics.reduce((sum, metric) => sum + metric.duration, 0);
    return total / this.metrics.length;
  }

  getSuccessRate(): number {
    if (this.metrics.length === 0) return 0;
    const successful = this.metrics.filter(metric => metric.success).length;
    return (successful / this.metrics.length) * 100;
  }
}

// ============================================================================
// HTTP CLIENT IMPLEMENTATION
// ============================================================================

export class HttpClient implements ApiClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly cache: RequestCache;
  private readonly metrics: MetricsCollector;
  private readonly config: HttpClientConfig;
  private authSession: AuthSession | null = null;
  private refreshPromise: Promise<TokenPair> | null = null;
  private refreshTokenHandler?: () => Promise<TokenPair>;

  constructor(config: Partial<HttpClientConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.cache = new RequestCache();
    this.metrics = new MetricsCollector();
    
    this.axiosInstance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  // ============================================================================
  // AUTHENTICATION INTEGRATION
  // ============================================================================

  setAuthSession(session: AuthSession | null): void {
    this.authSession = session;
  }

  setRefreshTokenHandler(handler: () => Promise<TokenPair>): void {
    this.refreshTokenHandler = handler;
  }

  private async refreshToken(): Promise<TokenPair> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    if (!this.refreshTokenHandler) {
      throw new Error('No refresh token handler configured');
    }

    this.refreshPromise = this.refreshTokenHandler();
    
    try {
      const tokens = await this.refreshPromise;
      return tokens;
    } finally {
      this.refreshPromise = null;
    }
  }

  // ============================================================================
  // INTERCEPTOR SETUP
  // ============================================================================

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.authSession?.accessToken) {
          config.headers.Authorization = `Bearer ${this.authSession.accessToken}`;
        }
        (config as any).requestStartTime = Date.now();
        return config;
      },
      (error: AxiosError) => Promise.reject(this.transformError(error))
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.recordMetrics(response);
        return response;
      },
      async (error: AxiosError) => {
        this.recordMetrics(error.response, false);

        if (error.response?.status === 401 && this.authSession) {
          try {
            const tokens = await this.refreshToken();
            this.authSession = {
              ...this.authSession,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            };

            const originalRequest = error.config;
            if (originalRequest) {
              originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
              return this.axiosInstance.request(originalRequest);
            }
          } catch (refreshError) {
            this.authSession = null;
            throw this.transformError(error);
          }
        }

        throw this.transformError(error);
      }
    );
  }

  private recordMetrics(response?: AxiosResponse, success: boolean = true): void {
    if (!this.config.enableMetrics || !response?.config) return;

    const config = response.config as any;
    const duration = Date.now() - (config.requestStartTime || Date.now());

    this.metrics.record({
      method: config.method?.toUpperCase() || 'UNKNOWN',
      url: config.url || '',
      duration,
      status: response.status || 0,
      success,
      timestamp: Date.now(),
    });
  }

  private transformError(error: AxiosError): ApiError {
    return {
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message || 'An unknown error occurred',
      statusCode: error.response?.status || 0,
      timestamp: new Date().toISOString(),
      details: error.response?.data as Record<string, unknown> || {},
    };
  }

  // ============================================================================
  // CACHE AND RETRY METHODS
  // ============================================================================

  private getCachedResponse<T>(method: string, url: string, params?: any): T | null {
    if (!this.config.enableCache || method.toUpperCase() !== 'GET') return null;
    const cacheKey = this.cache.getCacheKey(method, url, params);
    return this.cache.get<T>(cacheKey);
  }

  private setCachedResponse<T>(method: string, url: string, data: T, params?: any): void {
    if (!this.config.enableCache || method.toUpperCase() !== 'GET') return;
    const cacheKey = this.cache.getCacheKey(method, url, params);
    this.cache.set(cacheKey, data);
  }

  private async executeWithRetry<T>(
    operation: () => Promise<AxiosResponse<T>>,
    retries: number = this.config.retries
  ): Promise<AxiosResponse<T>> {
    let lastError: AxiosError;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as AxiosError;

        if (lastError.response?.status && [400, 401, 403, 404, 422].includes(lastError.response.status)) {
          throw lastError;
        }

        if (attempt === retries) {
          throw lastError;
        }

        const delay = this.config.retryDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  // ============================================================================
  // API METHODS IMPLEMENTATION
  // ============================================================================

  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const cachedResponse = this.getCachedResponse<ApiResponse<T>>('GET', url, config);
      if (cachedResponse) {
        return cachedResponse;
      }

      const response = await this.executeWithRetry(() =>
        this.axiosInstance.get<T>(url, this.mergeConfig(config))
      );

      const apiResponse: ApiResponse<T> = {
        data: response.data,
        success: true,
        message: 'Request successful',
        timestamp: new Date().toISOString(),
      };

      this.setCachedResponse('GET', url, apiResponse, config);
      return apiResponse;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.executeWithRetry(() =>
        this.axiosInstance.post<T>(url, data, this.mergeConfig(config))
      );

      return {
        data: response.data,
        success: true,
        message: 'Request successful',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw error;
    }
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.executeWithRetry(() =>
        this.axiosInstance.put<T>(url, data, this.mergeConfig(config))
      );

      return {
        data: response.data,
        success: true,
        message: 'Request successful',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw error;
    }
  }

  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.executeWithRetry(() =>
        this.axiosInstance.patch<T>(url, data, this.mergeConfig(config))
      );

      return {
        data: response.data,
        success: true,
        message: 'Request successful',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.executeWithRetry(() =>
        this.axiosInstance.delete<T>(url, this.mergeConfig(config))
      );

      return {
        data: response.data,
        success: true,
        message: 'Request successful',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw error;
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  private mergeConfig(config?: RequestConfig): AxiosRequestConfig {
    return {
      headers: config?.headers || {},
      timeout: config?.timeout || this.config.timeout,
    };
  }

  clearCache(): void {
    this.cache.clear();
  }

  getMetrics(): {
    averageResponseTime: number;
    successRate: number;
    totalRequests: number;
  } {
    const allMetrics = this.metrics.getMetrics();
    return {
      averageResponseTime: this.metrics.getAverageResponseTime(),
      successRate: this.metrics.getSuccessRate(),
      totalRequests: allMetrics.length,
    };
  }

  updateConfig(newConfig: Partial<HttpClientConfig>): void {
    Object.assign(this.config, newConfig);
  }
}

// ============================================================================
// SINGLETON INSTANCE AND FACTORY
// ============================================================================

export const httpClient = new HttpClient();

export function createHttpClient(config?: Partial<HttpClientConfig>): HttpClient {
  return new HttpClient(config);
}
