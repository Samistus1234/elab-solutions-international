/**
 * Authentication and Authorization Types for ELAB Solutions International
 * 
 * This file contains all authentication-related type definitions including
 * user sessions, permissions, and security-related types.
 */

import type { User, UserRole } from './business';
import type { ID, ISOString } from './index';

// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================

export interface AuthSession {
  readonly user: User;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresAt: ISOString;
  readonly issuedAt: ISOString;
  readonly sessionId: string;
  readonly deviceInfo: DeviceInfo;
}

export interface DeviceInfo {
  readonly userAgent: string;
  readonly ipAddress: string;
  readonly deviceType: 'mobile' | 'tablet' | 'desktop';
  readonly browser: string;
  readonly os: string;
  readonly location?: {
    readonly country: string;
    readonly city: string;
    readonly timezone: string;
  };
}

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
  readonly rememberMe?: boolean;
  readonly deviceInfo?: Partial<DeviceInfo>;
}

export interface RegisterData {
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly country: string;
  readonly profession: string;
  readonly phone?: string;
  readonly agreeToTerms: boolean;
  readonly subscribeToNewsletter?: boolean;
  readonly referralCode?: string;
}

export interface PasswordResetRequest {
  readonly email: string;
  readonly redirectUrl?: string;
}

export interface PasswordResetData {
  readonly token: string;
  readonly password: string;
  readonly confirmPassword: string;
}

export interface ChangePasswordData {
  readonly currentPassword: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
}

export interface EmailVerificationData {
  readonly token: string;
  readonly email?: string;
}

export interface PhoneVerificationData {
  readonly phone: string;
  readonly code: string;
}

export interface TwoFactorSetupData {
  readonly secret: string;
  readonly qrCode: string;
  readonly backupCodes: readonly string[];
}

export interface TwoFactorVerificationData {
  readonly code: string;
  readonly backupCode?: string;
}

// ============================================================================
// AUTHORIZATION TYPES
// ============================================================================

export enum Permission {
  // User management
  VIEW_USERS = 'view:users',
  CREATE_USERS = 'create:users',
  EDIT_USERS = 'edit:users',
  DELETE_USERS = 'delete:users',
  MANAGE_USER_ROLES = 'manage:user_roles',
  
  // Application management
  VIEW_APPLICATIONS = 'view:applications',
  CREATE_APPLICATIONS = 'create:applications',
  EDIT_APPLICATIONS = 'edit:applications',
  DELETE_APPLICATIONS = 'delete:applications',
  APPROVE_APPLICATIONS = 'approve:applications',
  ASSIGN_APPLICATIONS = 'assign:applications',
  
  // Document management
  VIEW_DOCUMENTS = 'view:documents',
  UPLOAD_DOCUMENTS = 'upload:documents',
  VERIFY_DOCUMENTS = 'verify:documents',
  DELETE_DOCUMENTS = 'delete:documents',
  
  // Service management
  VIEW_SERVICES = 'view:services',
  MANAGE_SERVICES = 'manage:services',
  
  // Payment management
  VIEW_PAYMENTS = 'view:payments',
  PROCESS_PAYMENTS = 'process:payments',
  REFUND_PAYMENTS = 'refund:payments',
  
  // Analytics and reporting
  VIEW_ANALYTICS = 'view:analytics',
  EXPORT_DATA = 'export:data',
  
  // System administration
  MANAGE_SETTINGS = 'manage:settings',
  VIEW_LOGS = 'view:logs',
  MANAGE_INTEGRATIONS = 'manage:integrations',
  
  // Content management
  MANAGE_CONTENT = 'manage:content',
  PUBLISH_CONTENT = 'publish:content',
  
  // Communication
  SEND_NOTIFICATIONS = 'send:notifications',
  MANAGE_TEMPLATES = 'manage:templates'
}

export interface RolePermissions {
  readonly role: UserRole;
  readonly permissions: readonly Permission[];
  readonly restrictions?: {
    readonly ownDataOnly?: boolean;
    readonly countryRestriction?: readonly string[];
    readonly serviceRestriction?: readonly string[];
  };
}

export interface PermissionCheck {
  readonly permission: Permission;
  readonly resourceId?: ID;
  readonly context?: Record<string, unknown>;
}

export interface AuthorizationContext {
  readonly user: User;
  readonly session: AuthSession;
  readonly permissions: readonly Permission[];
  readonly restrictions: Record<string, unknown>;
}

// ============================================================================
// SECURITY TYPES
// ============================================================================

export interface SecurityEvent {
  readonly id: ID;
  readonly type: SecurityEventType;
  readonly userId: ID;
  readonly sessionId: string;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly description: string;
  readonly metadata: Record<string, unknown>;
  readonly timestamp: ISOString;
  readonly resolved: boolean;
  readonly resolvedAt?: ISOString;
  readonly resolvedBy?: ID;
}

export enum SecurityEventType {
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILURE = 'login_failure',
  LOGOUT = 'logout',
  PASSWORD_CHANGE = 'password_change',
  PASSWORD_RESET = 'password_reset',
  EMAIL_VERIFICATION = 'email_verification',
  PHONE_VERIFICATION = 'phone_verification',
  TWO_FACTOR_ENABLED = 'two_factor_enabled',
  TWO_FACTOR_DISABLED = 'two_factor_disabled',
  SUSPICIOUS_LOGIN = 'suspicious_login',
  ACCOUNT_LOCKED = 'account_locked',
  ACCOUNT_UNLOCKED = 'account_unlocked',
  PERMISSION_DENIED = 'permission_denied',
  DATA_BREACH_ATTEMPT = 'data_breach_attempt',
  UNUSUAL_ACTIVITY = 'unusual_activity'
}

export interface LoginAttempt {
  readonly id: ID;
  readonly email: string;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly success: boolean;
  readonly failureReason?: string;
  readonly timestamp: ISOString;
  readonly location?: {
    readonly country: string;
    readonly city: string;
  };
}

export interface AccountLockout {
  readonly userId: ID;
  readonly reason: string;
  readonly lockedAt: ISOString;
  readonly lockedUntil?: ISOString;
  readonly attemptCount: number;
  readonly unlockToken?: string;
}

export interface SessionManagement {
  readonly maxConcurrentSessions: number;
  readonly sessionTimeout: number; // in minutes
  readonly idleTimeout: number; // in minutes
  readonly requireReauthentication: boolean;
  readonly allowMultipleDevices: boolean;
}

// ============================================================================
// JWT TOKEN TYPES
// ============================================================================

export interface JWTPayload {
  readonly sub: ID; // user ID
  readonly email: string;
  readonly role: UserRole;
  readonly permissions: readonly Permission[];
  readonly sessionId: string;
  readonly iat: number; // issued at
  readonly exp: number; // expires at
  readonly aud: string; // audience
  readonly iss: string; // issuer
  readonly jti: string; // JWT ID
}

export interface RefreshTokenPayload {
  readonly sub: ID; // user ID
  readonly sessionId: string;
  readonly tokenFamily: string;
  readonly iat: number; // issued at
  readonly exp: number; // expires at
  readonly aud: string; // audience
  readonly iss: string; // issuer
}

export interface TokenPair {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
  readonly tokenType: 'Bearer';
}

// ============================================================================
// OAUTH AND SOCIAL LOGIN TYPES
// ============================================================================

export enum OAuthProvider {
  GOOGLE = 'google',
  LINKEDIN = 'linkedin',
  APPLE = 'apple',
  MICROSOFT = 'microsoft'
}

export interface OAuthConfig {
  readonly provider: OAuthProvider;
  readonly clientId: string;
  readonly redirectUri: string;
  readonly scope: readonly string[];
  readonly state?: string;
}

export interface OAuthUserInfo {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar?: string;
  readonly emailVerified: boolean;
  readonly provider: OAuthProvider;
}

export interface SocialLoginRequest {
  readonly provider: OAuthProvider;
  readonly code: string;
  readonly state?: string;
  readonly redirectUri: string;
}

// ============================================================================
// API KEY MANAGEMENT TYPES
// ============================================================================

export interface ApiKey {
  readonly id: ID;
  readonly name: string;
  readonly key: string; // hashed
  readonly userId: ID;
  readonly permissions: readonly Permission[];
  readonly expiresAt?: ISOString;
  readonly lastUsedAt?: ISOString;
  readonly isActive: boolean;
  readonly createdAt: ISOString;
  readonly rateLimit?: {
    readonly requestsPerMinute: number;
    readonly requestsPerHour: number;
    readonly requestsPerDay: number;
  };
}

export interface CreateApiKeyRequest {
  readonly name: string;
  readonly permissions: readonly Permission[];
  readonly expiresAt?: ISOString;
  readonly rateLimit?: ApiKey['rateLimit'];
}

// ============================================================================
// AUDIT AND COMPLIANCE TYPES
// ============================================================================

export interface AuditLog {
  readonly id: ID;
  readonly userId: ID;
  readonly action: string;
  readonly resource: string;
  readonly resourceId?: ID;
  readonly oldValues?: Record<string, unknown>;
  readonly newValues?: Record<string, unknown>;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly timestamp: ISOString;
  readonly success: boolean;
  readonly errorMessage?: string;
}

export interface ComplianceReport {
  readonly id: ID;
  readonly type: 'gdpr' | 'hipaa' | 'sox' | 'pci_dss';
  readonly period: {
    readonly start: ISOString;
    readonly end: ISOString;
  };
  readonly findings: readonly {
    readonly severity: 'low' | 'medium' | 'high' | 'critical';
    readonly description: string;
    readonly recommendation: string;
    readonly status: 'open' | 'in_progress' | 'resolved';
  }[];
  readonly generatedAt: ISOString;
  readonly generatedBy: ID;
}

// ============================================================================
// AUTHENTICATION STATE TYPES
// ============================================================================

export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly user: User | null;
  readonly session: AuthSession | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly lastActivity: ISOString | null;
}

export interface AuthActions {
  readonly login: (credentials: LoginCredentials) => Promise<void>;
  readonly register: (data: RegisterData) => Promise<void>;
  readonly logout: () => Promise<void>;
  readonly refreshToken: () => Promise<void>;
  readonly forgotPassword: (email: string) => Promise<void>;
  readonly resetPassword: (data: PasswordResetData) => Promise<void>;
  readonly changePassword: (data: ChangePasswordData) => Promise<void>;
  readonly verifyEmail: (data: EmailVerificationData) => Promise<void>;
  readonly verifyPhone: (data: PhoneVerificationData) => Promise<void>;
  readonly enableTwoFactor: () => Promise<TwoFactorSetupData | null>;
  readonly verifyTwoFactor: (data: TwoFactorVerificationData) => Promise<void>;
  readonly disableTwoFactor: (password: string) => Promise<void>;
  readonly updateProfile: (data: Partial<User['profile']>) => Promise<void>;
  readonly checkPermission: (permission: Permission, resourceId?: ID) => boolean;
  readonly hasRole: (role: UserRole) => boolean;
  readonly hasAnyRole: (roles: UserRole[]) => boolean;
  readonly initialize: () => Promise<void>;
  readonly updateActivity: () => void;
  readonly clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;
