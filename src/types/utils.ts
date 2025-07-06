/**
 * Utility Types and Type Guards for ELAB Solutions International
 * 
 * This file contains utility types, type guards, and helper functions
 * for runtime type checking and type manipulation.
 */

import { 
  User, 
  Application, 
  ApplicationType, 
  ApplicationStatus, 
  UserRole,
  DocumentType,
  VerificationStatus 
} from './business';
import { ApiResponse, Result } from './index';

// ============================================================================
// UTILITY TYPES
// ============================================================================

// Make all properties optional
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties required
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Make all properties readonly
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Pick specific properties from a type
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit specific properties from a type
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Extract non-nullable types
export type NonNullable<T> = T extends null | undefined ? never : T;

// Extract the type of array elements
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

// Extract the return type of a function
export type ReturnType<T extends (...args: readonly unknown[]) => unknown> = T extends (
  ...args: readonly unknown[]
) => infer R
  ? R
  : unknown;

// Extract the parameters of a function
export type Parameters<T extends (...args: readonly unknown[]) => unknown> = T extends (
  ...args: infer P
) => unknown
  ? P
  : never;

// Create a union of all property names of type T
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Create a type with only properties of a specific type
export type PropertiesOfType<T, U> = Pick<T, KeysOfType<T, U>>;

// Deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep readonly type
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Conditional type for optional properties
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Conditional type for required properties
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// Create a type with only optional properties
export type OptionalProperties<T> = Pick<T, OptionalKeys<T>>;

// Create a type with only required properties
export type RequiredProperties<T> = Pick<T, RequiredKeys<T>>;

// Branded types for better type safety
export type Brand<T, B> = T & { readonly __brand: B };

export type UserId = Brand<string, 'UserId'>;
export type ApplicationId = Brand<string, 'ApplicationId'>;
export type ServiceId = Brand<string, 'ServiceId'>;
export type DocumentId = Brand<string, 'DocumentId'>;

// Enum to union type
export type EnumValues<T> = T[keyof T];

// Function type helpers
export type AsyncFunction<T extends readonly unknown[], R> = (...args: T) => Promise<R>;
export type SyncFunction<T extends readonly unknown[], R> = (...args: T) => R;
export type AnyFunction = (...args: readonly unknown[]) => unknown;

// Event handler types
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// Form field types
export type FormFieldValue = string | number | boolean | Date | null | undefined;
export type FormValues = Record<string, FormFieldValue>;

// API response helpers
export type SuccessResponse<T> = Extract<ApiResponse<T>, { success: true }>;
export type ErrorResponse = Extract<ApiResponse<unknown>, { success: false }>;

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if a value is not null or undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard to check if a value is null or undefined
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Type guard to check if a value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Type guard to check if a value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * Type guard to check if a value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Type guard to check if a value is an object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Type guard to check if a value is an array
 */
export function isArray<T>(value: unknown): value is readonly T[] {
  return Array.isArray(value);
}

/**
 * Type guard to check if a value is a Date
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/**
 * Type guard to check if a value is a valid email
 */
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Type guard to check if a value is a valid URL
 */
export function isUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Type guard to check if a value is a User
 */
export function isUser(value: unknown): value is User {
  return (
    isObject(value) &&
    isString(value.id) &&
    isString(value.email) &&
    isString(value.role) &&
    isObject(value.profile) &&
    isString(value.createdAt) &&
    isString(value.updatedAt)
  );
}

/**
 * Type guard to check if a value is an Application
 */
export function isApplication(value: unknown): value is Application {
  return (
    isObject(value) &&
    isString(value.id) &&
    isString(value.userId) &&
    isString(value.type) &&
    isString(value.status) &&
    isObject(value.data) &&
    isObject(value.workflow) &&
    isString(value.createdAt) &&
    isString(value.updatedAt)
  );
}

/**
 * Type guard to check if a value is a valid ApplicationType
 */
export function isApplicationType(value: string): value is ApplicationType {
  return Object.values(ApplicationType).includes(value as ApplicationType);
}

/**
 * Type guard to check if a value is a valid ApplicationStatus
 */
export function isApplicationStatus(value: string): value is ApplicationStatus {
  return Object.values(ApplicationStatus).includes(value as ApplicationStatus);
}

/**
 * Type guard to check if a value is a valid UserRole
 */
export function isUserRole(value: string): value is UserRole {
  return Object.values(UserRole).includes(value as UserRole);
}

/**
 * Type guard to check if a value is a valid DocumentType
 */
export function isDocumentType(value: string): value is DocumentType {
  return Object.values(DocumentType).includes(value as DocumentType);
}

/**
 * Type guard to check if a value is a valid VerificationStatus
 */
export function isVerificationStatus(value: string): value is VerificationStatus {
  return Object.values(VerificationStatus).includes(value as VerificationStatus);
}

/**
 * Type guard to check if an API response is successful
 */
export function isSuccessResponse<T>(response: ApiResponse<T>): response is SuccessResponse<T> {
  return response.success === true;
}

/**
 * Type guard to check if an API response is an error
 */
export function isErrorResponse(response: ApiResponse<unknown>): response is ErrorResponse {
  return response.success === false;
}

/**
 * Type guard to check if a Result is successful
 */
export function isSuccess<T, E>(result: Result<T, E>): result is { success: true; data: T } {
  return result.success === true;
}

/**
 * Type guard to check if a Result is an error
 */
export function isError<T, E>(result: Result<T, E>): result is { success: false; error: E } {
  return result.success === false;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely parse JSON with type checking
 */
export function safeJsonParse<T>(
  json: string,
  typeGuard: (value: unknown) => value is T
): Result<T, Error> {
  try {
    const parsed: unknown = JSON.parse(json);
    if (typeGuard(parsed)) {
      return { success: true, data: parsed };
    }
    return { success: false, error: new Error('Invalid JSON structure') };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

/**
 * Create a branded type value
 */
export function createBrand<T, B>(value: T): Brand<T, B> {
  return value as Brand<T, B>;
}

/**
 * Extract the underlying value from a branded type
 */
export function extractBrand<T, B>(branded: Brand<T, B>): T {
  return branded as T;
}

/**
 * Unwrap a Result type, throwing an error if it's not successful
 */
export function unwrap<T, E extends Error>(result: Result<T, E>, defaultValue?: T): T {
  if (isError(result)) {
    throw result.error;
  }
  return result.success ? result.data : (defaultValue as T);
}

/**
 * Unwrap a Result type with a default value
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  if (isError(result)) {
    return defaultValue;
  }
  return result.success ? result.data : (defaultValue as T);
}

/**
 * Map over a Result type
 */
export function mapResult<T, U, E>(
  result: Result<T, E>,
  mapper: (value: T) => U
): Result<U, E> {
  if (isError(result)) {
    return result;
  }
  return { success: true, data: result.success ? mapper(result.data) : ({} as U) };
}

/**
 * Chain Result types together
 */
export function chainResult<T, U, E>(
  result: Result<T, E>,
  mapper: (value: T) => Result<U, E>
): Result<U, E> {
  if (isError(result)) {
    return result;
  }
  return result.success ? mapper(result.data) : { success: false, error: result.error };
}

/**
 * Convert a Promise to a Result
 */
export async function toResult<T>(promise: Promise<T>): Promise<Result<T, Error>> {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

/**
 * Debounce a function
 */
export function debounce<T extends readonly unknown[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle a function
 */
export function throttle<T extends readonly unknown[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let lastCall = 0;
  return (...args: T) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
}

/**
 * Check if two objects are deeply equal
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;
  
  if (typeof a !== 'object') return false;
  
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }
  
  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);
  
  if (keysA.length !== keysB.length) return false;
  
  return keysA.every(key => 
    Object.prototype.hasOwnProperty.call(b, key) && 
    deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
  );
}

/**
 * Generate a random UUID v4
 */
export function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Format a date to ISO string
 */
export function formatDateToIso(date: Date): string {
  return date.toISOString();
}

/**
 * Parse an ISO date string
 */
export function parseIsoDate(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Check if a string is a valid ISO date
 */
export function isIsoDateString(value: string): boolean {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
  return isoDateRegex.test(value) && !Number.isNaN(Date.parse(value));
}
