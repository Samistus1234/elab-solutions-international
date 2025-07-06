/**
 * Base Service Class for ELAB Solutions International
 * 
 * This module provides the base service class that all API services
 * extend from, providing common functionality and type safety.
 */

import { httpClient } from './http-client';
import type { 
  ApiResponse, 
  ApiError, 
  RequestConfig,
  PaginatedResponse,
  BaseFilter 
} from '@/types/api';
import type { ID, Result } from '@/types';
import { toResult } from '@/types/utils';

// ============================================================================
// BASE SERVICE CONFIGURATION
// ============================================================================

export interface ServiceConfig {
  baseEndpoint: string;
  defaultTimeout?: number;
  enableCache?: boolean;
  retries?: number;
}

// ============================================================================
// COMMON SERVICE INTERFACES
// ============================================================================

export interface CreateRequest<T> {
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
  config?: RequestConfig;
}

export interface UpdateRequest<T> {
  id: ID;
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;
  config?: RequestConfig;
}

export interface GetRequest {
  id: ID;
  config?: RequestConfig;
}

export interface ListRequest<TFilter = BaseFilter> {
  filter?: TFilter;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  config?: RequestConfig;
}

export interface DeleteRequest {
  id: ID;
  config?: RequestConfig;
}

// ============================================================================
// BASE SERVICE CLASS
// ============================================================================

export abstract class BaseService<TEntity, TCreateData = Partial<TEntity>, TUpdateData = Partial<TEntity>, TFilter = BaseFilter> {
  protected readonly config: ServiceConfig;
  protected readonly httpClient = httpClient;

  constructor(config: ServiceConfig) {
    this.config = {
      defaultTimeout: 30000,
      enableCache: true,
      retries: 3,
      ...config,
    };
  }

  // ============================================================================
  // CRUD OPERATIONS
  // ============================================================================

  /**
   * Create a new entity
   */
  async create(request: CreateRequest<TCreateData>): Promise<Result<TEntity, ApiError>> {
    try {
      const response = await this.httpClient.post<TEntity>(
        this.config.baseEndpoint,
        request.data,
        this.mergeConfig(request.config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  /**
   * Get entity by ID
   */
  async getById(request: GetRequest): Promise<Result<TEntity, ApiError>> {
    try {
      const response = await this.httpClient.get<TEntity>(
        `${this.config.baseEndpoint}/${request.id}`,
        this.mergeConfig(request.config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  /**
   * List entities with filtering and pagination
   */
  async list(request: ListRequest<TFilter> = {}): Promise<Result<PaginatedResponse<TEntity>, ApiError>> {
    try {
      const queryParams = this.buildQueryParams(request);
      const url = `${this.config.baseEndpoint}${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await this.httpClient.get<PaginatedResponse<TEntity>>(
        url,
        this.mergeConfig(request.config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  /**
   * Update entity by ID
   */
  async update(request: UpdateRequest<TUpdateData>): Promise<Result<TEntity, ApiError>> {
    try {
      const response = await this.httpClient.patch<TEntity>(
        `${this.config.baseEndpoint}/${request.id}`,
        request.data,
        this.mergeConfig(request.config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  /**
   * Replace entity by ID (full update)
   */
  async replace(request: UpdateRequest<TCreateData>): Promise<Result<TEntity, ApiError>> {
    try {
      const response = await this.httpClient.put<TEntity>(
        `${this.config.baseEndpoint}/${request.id}`,
        request.data,
        this.mergeConfig(request.config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  /**
   * Delete entity by ID
   */
  async delete(request: DeleteRequest): Promise<Result<void, ApiError>> {
    try {
      await this.httpClient.delete<void>(
        `${this.config.baseEndpoint}/${request.id}`,
        this.mergeConfig(request.config)
      );

      return { success: true, data: undefined };
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  // ============================================================================
  // BATCH OPERATIONS
  // ============================================================================

  /**
   * Create multiple entities
   */
  async createBatch(data: TCreateData[], config?: RequestConfig): Promise<Result<TEntity[], ApiError>> {
    try {
      const response = await this.httpClient.post<TEntity[]>(
        `${this.config.baseEndpoint}/batch`,
        { items: data },
        this.mergeConfig(config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  /**
   * Update multiple entities
   */
  async updateBatch(updates: Array<{ id: ID; data: TUpdateData }>, config?: RequestConfig): Promise<Result<TEntity[], ApiError>> {
    try {
      const response = await this.httpClient.patch<TEntity[]>(
        `${this.config.baseEndpoint}/batch`,
        { updates },
        this.mergeConfig(config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  /**
   * Delete multiple entities
   */
  async deleteBatch(ids: ID[], config?: RequestConfig): Promise<Result<void, ApiError>> {
    try {
      await this.httpClient.delete<void>(
        `${this.config.baseEndpoint}/batch`,
        this.mergeConfig(config, { 
          headers: { 
            'Content-Type': 'application/json' 
          } 
        })
      );

      return { success: true, data: undefined };
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Build query parameters from list request
   */
  protected buildQueryParams(request: ListRequest<TFilter>): string {
    const params = new URLSearchParams();

    if (request.filter) {
      Object.entries(request.filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    if (request.page !== undefined) {
      params.append('page', String(request.page));
    }

    if (request.limit !== undefined) {
      params.append('limit', String(request.limit));
    }

    if (request.sort) {
      params.append('sort', request.sort);
    }

    if (request.order) {
      params.append('order', request.order);
    }

    return params.toString();
  }

  /**
   * Merge request config with service defaults
   */
  protected mergeConfig(requestConfig?: RequestConfig, additionalConfig?: RequestConfig): RequestConfig {
    return {
      timeout: this.config.defaultTimeout,
      cache: this.config.enableCache ? 'force-cache' : 'no-cache',
      retries: this.config.retries,
      ...requestConfig,
      ...additionalConfig,
      headers: {
        ...requestConfig?.headers,
        ...additionalConfig?.headers,
      },
    };
  }

  /**
   * Get service configuration
   */
  getConfig(): ServiceConfig {
    return { ...this.config };
  }

  /**
   * Update service configuration
   */
  updateConfig(newConfig: Partial<ServiceConfig>): void {
    Object.assign(this.config, newConfig);
  }

  // ============================================================================
  // CUSTOM ENDPOINT METHODS
  // ============================================================================

  /**
   * Make a custom GET request to a service endpoint
   */
  protected async customGet<T>(endpoint: string, config?: RequestConfig): Promise<Result<T, ApiError>> {
    try {
      const response = await this.httpClient.get<T>(
        `${this.config.baseEndpoint}/${endpoint}`,
        this.mergeConfig(config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  /**
   * Make a custom POST request to a service endpoint
   */
  protected async customPost<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<Result<T, ApiError>> {
    try {
      const response = await this.httpClient.post<T>(
        `${this.config.baseEndpoint}/${endpoint}`,
        data,
        this.mergeConfig(config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  /**
   * Make a custom PATCH request to a service endpoint
   */
  protected async customPatch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<Result<T, ApiError>> {
    try {
      const response = await this.httpClient.patch<T>(
        `${this.config.baseEndpoint}/${endpoint}`,
        data,
        this.mergeConfig(config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }

  /**
   * Make a custom DELETE request to a service endpoint
   */
  protected async customDelete<T>(endpoint: string, config?: RequestConfig): Promise<Result<T, ApiError>> {
    try {
      const response = await this.httpClient.delete<T>(
        `${this.config.baseEndpoint}/${endpoint}`,
        this.mergeConfig(config)
      );

      if (response.success) { return { success: true, data: response.data }; } else { return { success: false, error: response.error as ApiError }; }
    } catch (error) {
      return { success: false, error: error as ApiError };
    }
  }
}
