/**
 * Role-Based Access Control (RBAC) System for ELAB Solutions International
 * 
 * This module provides comprehensive role and permission management
 * for the healthcare credentialing platform.
 */

import {
  Permission,
  RolePermissions,
  PermissionCheck,
  AuthorizationContext
} from '@/types/auth';
import { UserRole, User } from '@/types/business';
import { ID } from '@/types';

// ============================================================================
// PERMISSION DEFINITIONS
// ============================================================================

/**
 * Complete permission matrix for ELAB Solutions platform
 */
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  [UserRole.APPLICANT]: {
    role: UserRole.APPLICANT,
    permissions: [
      // Own data management
      Permission.VIEW_APPLICATIONS,
      Permission.CREATE_APPLICATIONS,
      Permission.EDIT_APPLICATIONS,
      Permission.VIEW_DOCUMENTS,
      Permission.UPLOAD_DOCUMENTS,
      Permission.VIEW_PAYMENTS,
      
      // Service access
      Permission.VIEW_SERVICES,
      
      // Profile management
      Permission.VIEW_USERS, // Own profile only
    ],
    restrictions: {
      ownDataOnly: true,
      countryRestriction: undefined,
      serviceRestriction: undefined
    }
  },

  [UserRole.CONSULTANT]: {
    role: UserRole.CONSULTANT,
    permissions: [
      // Application management
      Permission.VIEW_APPLICATIONS,
      Permission.EDIT_APPLICATIONS,
      Permission.ASSIGN_APPLICATIONS,
      
      // Document management
      Permission.VIEW_DOCUMENTS,
      Permission.VERIFY_DOCUMENTS,
      
      // User management (limited)
      Permission.VIEW_USERS,
      
      // Service management
      Permission.VIEW_SERVICES,
      
      // Communication
      Permission.SEND_NOTIFICATIONS,
      
      // Analytics (limited)
      Permission.VIEW_ANALYTICS
    ],
    restrictions: {
      ownDataOnly: false,
      countryRestriction: undefined, // Can be set per consultant
      serviceRestriction: undefined
    }
  },

  [UserRole.ADMIN]: {
    role: UserRole.ADMIN,
    permissions: [
      // Full application management
      Permission.VIEW_APPLICATIONS,
      Permission.CREATE_APPLICATIONS,
      Permission.EDIT_APPLICATIONS,
      Permission.DELETE_APPLICATIONS,
      Permission.APPROVE_APPLICATIONS,
      Permission.ASSIGN_APPLICATIONS,
      
      // Full document management
      Permission.VIEW_DOCUMENTS,
      Permission.UPLOAD_DOCUMENTS,
      Permission.VERIFY_DOCUMENTS,
      Permission.DELETE_DOCUMENTS,
      
      // User management
      Permission.VIEW_USERS,
      Permission.CREATE_USERS,
      Permission.EDIT_USERS,
      Permission.MANAGE_USER_ROLES,
      
      // Service management
      Permission.VIEW_SERVICES,
      Permission.MANAGE_SERVICES,
      
      // Payment management
      Permission.VIEW_PAYMENTS,
      Permission.PROCESS_PAYMENTS,
      Permission.REFUND_PAYMENTS,
      
      // Analytics and reporting
      Permission.VIEW_ANALYTICS,
      Permission.EXPORT_DATA,
      
      // Communication
      Permission.SEND_NOTIFICATIONS,
      Permission.MANAGE_TEMPLATES,
      
      // Content management
      Permission.MANAGE_CONTENT,
      Permission.PUBLISH_CONTENT
    ],
    restrictions: {
      ownDataOnly: false,
      countryRestriction: undefined,
      serviceRestriction: undefined
    }
  },

  [UserRole.PARTNER]: {
    role: UserRole.PARTNER,
    permissions: [
      // Application viewing
      Permission.VIEW_APPLICATIONS,
      
      // User management (limited)
      Permission.VIEW_USERS,
      Permission.CREATE_USERS,
      
      // Service access
      Permission.VIEW_SERVICES,
      
      // Analytics (limited)
      Permission.VIEW_ANALYTICS
    ],
    restrictions: {
      ownDataOnly: false,
      countryRestriction: undefined, // Set per partner
      serviceRestriction: undefined // Set per partner
    }
  },

  [UserRole.INSTITUTION]: {
    role: UserRole.INSTITUTION,
    permissions: [
      // Application viewing for recruitment
      Permission.VIEW_APPLICATIONS,
      
      // User viewing for recruitment
      Permission.VIEW_USERS,
      
      // Service access
      Permission.VIEW_SERVICES,
      
      // Analytics for recruitment
      Permission.VIEW_ANALYTICS
    ],
    restrictions: {
      ownDataOnly: false,
      countryRestriction: undefined, // Set per institution
      serviceRestriction: ['placement'] // Only placement-related services
    }
  },

  [UserRole.SUPER_ADMIN]: {
    role: UserRole.SUPER_ADMIN,
    permissions: Object.values(Permission), // All permissions
    restrictions: {
      ownDataOnly: false,
      countryRestriction: undefined,
      serviceRestriction: undefined
    }
  }
};

// ============================================================================
// RBAC SERVICE CLASS
// ============================================================================

export class RBACService {
  /**
   * Check if user has specific permission
   */
  static hasPermission(
    user: User,
    permission: Permission,
    resourceId?: ID,
    context?: Record<string, unknown>
  ): boolean {
    const rolePermissions = ROLE_PERMISSIONS[user.role];
    
    if (!rolePermissions) {
      return false;
    }

    // Check if permission exists in role
    if (!rolePermissions.permissions.includes(permission)) {
      return false;
    }

    // Apply restrictions
    return this.checkRestrictions(user, rolePermissions, permission, resourceId, context);
  }

  /**
   * Check multiple permissions (user must have ALL)
   */
  static hasAllPermissions(
    user: User,
    permissions: readonly Permission[],
    resourceId?: ID,
    context?: Record<string, unknown>
  ): boolean {
    return permissions.every(permission => 
      this.hasPermission(user, permission, resourceId, context)
    );
  }

  /**
   * Check multiple permissions (user must have ANY)
   */
  static hasAnyPermission(
    user: User,
    permissions: readonly Permission[],
    resourceId?: ID,
    context?: Record<string, unknown>
  ): boolean {
    return permissions.some(permission => 
      this.hasPermission(user, permission, resourceId, context)
    );
  }

  /**
   * Get all permissions for a user
   */
  static getUserPermissions(user: User): readonly Permission[] {
    const rolePermissions = ROLE_PERMISSIONS[user.role];
    return rolePermissions?.permissions || [];
  }

  /**
   * Check if user can access resource
   */
  static canAccessResource(
    user: User,
    resourceType: string,
    resourceId: ID,
    action: 'read' | 'write' | 'delete' | 'admin'
  ): boolean {
    const permissionMap: Record<string, Record<string, Permission>> = {
      application: {
        read: Permission.VIEW_APPLICATIONS,
        write: Permission.EDIT_APPLICATIONS,
        delete: Permission.DELETE_APPLICATIONS,
        admin: Permission.APPROVE_APPLICATIONS
      },
      user: {
        read: Permission.VIEW_USERS,
        write: Permission.EDIT_USERS,
        delete: Permission.DELETE_USERS,
        admin: Permission.MANAGE_USER_ROLES
      },
      document: {
        read: Permission.VIEW_DOCUMENTS,
        write: Permission.UPLOAD_DOCUMENTS,
        delete: Permission.DELETE_DOCUMENTS,
        admin: Permission.VERIFY_DOCUMENTS
      },
      payment: {
        read: Permission.VIEW_PAYMENTS,
        write: Permission.PROCESS_PAYMENTS,
        delete: Permission.REFUND_PAYMENTS,
        admin: Permission.PROCESS_PAYMENTS
      }
    };

    const permission = permissionMap[resourceType]?.[action];
    if (!permission) {
      return false;
    }

    return this.hasPermission(user, permission, resourceId, { resourceType, action });
  }

  /**
   * Check role hierarchy (higher roles can access lower role permissions)
   */
  static hasRoleOrHigher(user: User, requiredRole: UserRole): boolean {
    const roleHierarchy: Record<UserRole, number> = {
      [UserRole.APPLICANT]: 1,
      [UserRole.PARTNER]: 2,
      [UserRole.INSTITUTION]: 2,
      [UserRole.CONSULTANT]: 3,
      [UserRole.ADMIN]: 4,
      [UserRole.SUPER_ADMIN]: 5
    };

    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;

    return userLevel >= requiredLevel;
  }

  /**
   * Filter data based on user permissions and restrictions
   */
  static filterByPermissions<T extends { userId?: ID; country?: string }>(
    user: User,
    data: readonly T[],
    permission: Permission
  ): readonly T[] {
    if (!this.hasPermission(user, permission)) {
      return [];
    }

    const rolePermissions = ROLE_PERMISSIONS[user.role];
    const restrictions = rolePermissions?.restrictions;

    if (!restrictions) {
      return data;
    }

    return data.filter(item => {
      // Own data only restriction
      if (restrictions.ownDataOnly && item.userId !== user.id) {
        return false;
      }

      // Country restriction
      if (restrictions.countryRestriction && item.country) {
        if (!restrictions.countryRestriction.includes(item.country)) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Create authorization context for complex permission checks
   */
  static createAuthContext(
    user: User,
    sessionId: string,
    additionalContext?: Record<string, unknown>
  ): AuthorizationContext {
    return {
      user,
      session: {
        sessionId,
        user,
        accessToken: '', // Would be filled from actual session
        refreshToken: '',
        expiresAt: '',
        issuedAt: '',
        deviceInfo: {
          userAgent: '',
          ipAddress: '',
          deviceType: 'desktop',
          browser: '',
          os: ''
        }
      },
      permissions: this.getUserPermissions(user),
      restrictions: ROLE_PERMISSIONS[user.role]?.restrictions || {}
    };
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Check role-specific restrictions
   */
  private static checkRestrictions(
    user: User,
    rolePermissions: RolePermissions,
    permission: Permission,
    resourceId?: ID,
    context?: Record<string, unknown>
  ): boolean {
    const restrictions = rolePermissions.restrictions;

    if (!restrictions) {
      return true;
    }

    // Own data only restriction
    if (restrictions.ownDataOnly) {
      // For own data restrictions, we need to verify the resource belongs to the user
      if (resourceId && context?.resourceOwnerId && context.resourceOwnerId !== user.id) {
        return false;
      }
    }

    // Country restriction
    if (restrictions.countryRestriction && context?.country) {
      if (!restrictions.countryRestriction.includes(context.country as string)) {
        return false;
      }
    }

    // Service restriction
    if (restrictions.serviceRestriction && context?.serviceType) {
      if (!restrictions.serviceRestriction.includes(context.serviceType as string)) {
        return false;
      }
    }

    return true;
  }
}

// ============================================================================
// PERMISSION CHECKING UTILITIES
// ============================================================================

/**
 * Higher-order function to create permission-based guards
 */
export function requirePermission(permission: Permission) {
  return function (user: User | null, resourceId?: ID, context?: Record<string, unknown>): boolean {
    if (!user) {
      return false;
    }
    
    return RBACService.hasPermission(user, permission, resourceId, context);
  };
}

/**
 * Higher-order function to create role-based guards
 */
export function requireRole(role: UserRole) {
  return function (user: User | null): boolean {
    if (!user) {
      return false;
    }
    
    return RBACService.hasRoleOrHigher(user, role);
  };
}

/**
 * Permission checking decorators for common operations
 */
export const PermissionGuards = {
  // Application permissions
  canViewApplications: requirePermission(Permission.VIEW_APPLICATIONS),
  canCreateApplications: requirePermission(Permission.CREATE_APPLICATIONS),
  canEditApplications: requirePermission(Permission.EDIT_APPLICATIONS),
  canDeleteApplications: requirePermission(Permission.DELETE_APPLICATIONS),
  canApproveApplications: requirePermission(Permission.APPROVE_APPLICATIONS),

  // User permissions
  canViewUsers: requirePermission(Permission.VIEW_USERS),
  canCreateUsers: requirePermission(Permission.CREATE_USERS),
  canEditUsers: requirePermission(Permission.EDIT_USERS),
  canDeleteUsers: requirePermission(Permission.DELETE_USERS),
  canManageUserRoles: requirePermission(Permission.MANAGE_USER_ROLES),

  // Document permissions
  canViewDocuments: requirePermission(Permission.VIEW_DOCUMENTS),
  canUploadDocuments: requirePermission(Permission.UPLOAD_DOCUMENTS),
  canVerifyDocuments: requirePermission(Permission.VERIFY_DOCUMENTS),
  canDeleteDocuments: requirePermission(Permission.DELETE_DOCUMENTS),

  // Payment permissions
  canViewPayments: requirePermission(Permission.VIEW_PAYMENTS),
  canProcessPayments: requirePermission(Permission.PROCESS_PAYMENTS),
  canRefundPayments: requirePermission(Permission.REFUND_PAYMENTS),

  // Analytics permissions
  canViewAnalytics: requirePermission(Permission.VIEW_ANALYTICS),
  canExportData: requirePermission(Permission.EXPORT_DATA),

  // Role-based guards
  isApplicant: requireRole(UserRole.APPLICANT),
  isConsultant: requireRole(UserRole.CONSULTANT),
  isAdmin: requireRole(UserRole.ADMIN),
  isPartner: requireRole(UserRole.PARTNER),
  isInstitution: requireRole(UserRole.INSTITUTION),
  isSuperAdmin: requireRole(UserRole.SUPER_ADMIN)
};

// ============================================================================
// REACT HOOKS FOR PERMISSIONS
// ============================================================================

/**
 * Hook to check permissions in React components
 */
export function usePermissionCheck() {
  return {
    hasPermission: (user: User | null, permission: Permission, resourceId?: ID, context?: Record<string, unknown>) => {
      if (!user) return false;
      return RBACService.hasPermission(user, permission, resourceId, context);
    },
    
    hasRole: (user: User | null, role: UserRole) => {
      if (!user) return false;
      return RBACService.hasRoleOrHigher(user, role);
    },
    
    canAccess: (user: User | null, resourceType: string, resourceId: ID, action: 'read' | 'write' | 'delete' | 'admin') => {
      if (!user) return false;
      return RBACService.canAccessResource(user, resourceType, resourceId, action);
    }
  };
}

export default RBACService;
