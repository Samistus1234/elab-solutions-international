/**
 * ELAB Solutions International - Core Type Definitions
 * 
 * This file exports all type definitions used throughout the application.
 * It serves as the main entry point for type imports.
 */

// Re-export all types from domain-specific modules
export * from './api';
export * from './auth';
export * from './business';
export * from './components';
export * from './forms';
export * from './payments';
export * from './utils';


// Global utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// Common ID types
export type ID = string;
export type UUID = string;

// Timestamp types
export type Timestamp = Date;
export type ISOString = string;

// Generic response wrapper
export interface BaseResponse {
  readonly success: boolean;
  readonly message?: string;
  readonly timestamp: ISOString;
}

// Error response
export interface ErrorResponse extends BaseResponse {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
  };
}

// Success response
export interface SuccessResponse<T = unknown> extends BaseResponse {
  readonly success: true;
  readonly data: T;
}

// Union type for all responses
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

// Paginated response
export interface PaginatedResponse<T> extends SuccessResponse<readonly T[]> {
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
    readonly hasNext: boolean;
    readonly hasPrev: boolean;
  };
}

// Sort order
export type SortOrder = 'asc' | 'desc';

// Common filter interface
export interface BaseFilter {
  readonly page?: number;
  readonly limit?: number;
  readonly sortBy?: string;
  readonly sortOrder?: SortOrder;
  readonly search?: string;
}

// Environment types
export type Environment = 'development' | 'staging' | 'production' | 'test';

// Locale types
export type Locale = 'en' | 'ar' | 'fr';

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Device types
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// File types
export interface FileUpload {
  readonly file: File;
  readonly name: string;
  readonly size: number;
  readonly type: string;
  readonly lastModified: number;
}

export interface UploadedFile {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly size: number;
  readonly type: string;
  readonly uploadedAt: ISOString;
}

// Geolocation types
export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export interface Address {
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly country: string;
  readonly postalCode: string;
  readonly coordinates?: Coordinates;
}

// Contact information
export interface ContactInfo {
  readonly email: string;
  readonly phone?: string;
  readonly address?: Address;
  readonly website?: string;
  readonly socialMedia?: {
    readonly linkedin?: string;
    readonly twitter?: string;
    readonly facebook?: string;
    readonly instagram?: string;
  };
}

// Company information
export interface CompanyInfo {
  readonly name: string;
  readonly description: string;
  readonly logo: string;
  readonly contact: ContactInfo;
  readonly founded: number;
  readonly employees: string;
  readonly headquarters: Address;
}

// Feature flags
export interface FeatureFlags {
  readonly enablePayments: boolean;
  readonly enableNotifications: boolean;
  readonly enableAnalytics: boolean;
  readonly enableChatbot: boolean;
  readonly enableVideoConsultation: boolean;
  readonly enableBlockchainVerification: boolean;
}

// Application configuration
export interface AppConfig {
  readonly environment: Environment;
  readonly apiUrl: string;
  readonly cdnUrl: string;
  readonly features: FeatureFlags;
  readonly analytics: {
    readonly googleAnalyticsId?: string;
    readonly hotjarId?: string;
  };
  readonly payments: {
    readonly stripePublishableKey: string;
    readonly paystackPublicKey: string;
  };
}

// Result type for error handling
export type Result<T, E = Error> = 
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: E };

// Async result type
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

// Event types
export interface BaseEvent {
  readonly type: string;
  readonly timestamp: ISOString;
  readonly userId?: string;
  readonly sessionId?: string;
}

export interface UserEvent extends BaseEvent {
  readonly userId: string;
  readonly action: string;
  readonly metadata?: Record<string, unknown>;
}

export interface SystemEvent extends BaseEvent {
  readonly level: 'info' | 'warn' | 'error';
  readonly message: string;
  readonly context?: Record<string, unknown>;
}

// Notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  readonly id: string;
  readonly type: NotificationType;
  readonly title: string;
  readonly message: string;
  readonly timestamp: ISOString;
  readonly read: boolean;
  readonly actions?: readonly {
    readonly label: string;
    readonly action: string;
  }[];
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Generic state interface
export interface AsyncState<T> {
  readonly data: T | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly lastUpdated: ISOString | null;
}

// Form validation
export interface ValidationError {
  readonly field: string;
  readonly message: string;
  readonly code: string;
}

export interface FormState<T> {
  readonly values: T;
  readonly errors: readonly ValidationError[];
  readonly touched: Record<keyof T, boolean>;
  readonly isValid: boolean;
  readonly isSubmitting: boolean;
}

// Search and filtering
export interface SearchResult<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly query: string;
  readonly filters: Record<string, unknown>;
  readonly facets?: Record<string, readonly { value: string; count: number }[]>;
}

// Analytics events
export interface AnalyticsEvent {
  readonly name: string;
  readonly properties?: Record<string, unknown>;
  readonly userId?: string;
  readonly timestamp?: ISOString;
}

// Performance metrics
export interface PerformanceMetrics {
  readonly pageLoadTime: number;
  readonly timeToFirstByte: number;
  readonly firstContentfulPaint: number;
  readonly largestContentfulPaint: number;
  readonly cumulativeLayoutShift: number;
  readonly firstInputDelay: number;
}

// SEO metadata
export interface SEOMetadata {
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly ogImage?: string;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
  readonly twitterCard?: 'summary' | 'summary_large_image';
  readonly canonicalUrl?: string;
  readonly noIndex?: boolean;
  readonly noFollow?: boolean;
}
