/**
 * Database Utility Functions
 * ELAB Solutions International
 * 
 * Healthcare compliance utilities for database operations
 */

import { prisma } from './prisma';
import type { User, AuditLog } from '../../generated/prisma';

// ============================================================================
// AUDIT LOGGING UTILITIES
// ============================================================================

export interface AuditLogData {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  reason?: string;
}

/**
 * Create an audit log entry for compliance tracking
 */
export const createAuditLog = async (data: AuditLogData): Promise<AuditLog> => {
  return prisma.auditLog.create({
    data: {
      userId: data.userId,
      action: data.action,
      resource: data.resource,
      resourceId: data.resourceId,
      oldValues: data.oldValues ? JSON.stringify(data.oldValues) : undefined,
      newValues: data.newValues ? JSON.stringify(data.newValues) : undefined,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      sessionId: data.sessionId,
      reason: data.reason,
    },
  });
};

/**
 * Get audit logs for a specific user (GDPR compliance)
 */
export const getUserAuditLogs = async (userId: string, limit = 100) => {
  return prisma.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
};

/**
 * Get audit logs for a specific resource
 */
export const getResourceAuditLogs = async (
  resource: string,
  resourceId: string,
  limit = 50
) => {
  return prisma.auditLog.findMany({
    where: {
      resource,
      resourceId,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

// ============================================================================
// DATA VALIDATION UTILITIES
// ============================================================================

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitize user input for database storage
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// ============================================================================
// PAGINATION UTILITIES
// ============================================================================

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Create pagination parameters for Prisma queries
 */
export const createPaginationParams = (options: PaginationOptions) => {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
    page,
    limit,
  };
};

/**
 * Create paginated result object
 */
export const createPaginatedResult = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResult<T> => {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

// ============================================================================
// SEARCH UTILITIES
// ============================================================================

/**
 * Create search conditions for text fields
 */
export const createSearchCondition = (searchTerm: string, fields: string[]) => {
  if (!searchTerm.trim()) return {};

  const conditions = fields.map(field => ({
    [field]: {
      contains: searchTerm,
      mode: 'insensitive' as const,
    },
  }));

  return {
    OR: conditions,
  };
};

// ============================================================================
// DATA EXPORT UTILITIES (GDPR Compliance)
// ============================================================================

/**
 * Export all user data for GDPR compliance
 */
export const exportUserData = async (userId: string) => {
  const [user, applications, documents, payments, notifications, auditLogs] = 
    await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        include: {
          sessions: true,
        },
      }),
      prisma.application.findMany({
        where: { userId },
        include: {
          documents: true,
          payments: true,
          workflowSteps: true,
        },
      }),
      prisma.document.findMany({
        where: { userId },
      }),
      prisma.payment.findMany({
        where: { userId },
      }),
      prisma.notification.findMany({
        where: { userId },
      }),
      prisma.auditLog.findMany({
        where: { userId },
      }),
    ]);

  return {
    user,
    applications,
    documents,
    payments,
    notifications,
    auditLogs,
    exportedAt: new Date().toISOString(),
  };
};

/**
 * Delete all user data for GDPR compliance (Right to be forgotten)
 */
export const deleteUserData = async (userId: string, reason: string) => {
  // Create audit log before deletion
  await createAuditLog({
    userId,
    action: 'DELETE_USER_DATA',
    resource: 'User',
    resourceId: userId,
    reason,
  });

  // Delete in correct order to respect foreign key constraints
  await prisma.$transaction(async (tx) => {
    // Delete related data first
    await tx.auditLog.deleteMany({ where: { userId } });
    await tx.notification.deleteMany({ where: { userId } });
    await tx.workflowStep.deleteMany({
      where: { application: { userId } },
    });
    await tx.payment.deleteMany({ where: { userId } });
    await tx.document.deleteMany({ where: { userId } });
    await tx.application.deleteMany({ where: { userId } });
    await tx.session.deleteMany({ where: { userId } });
    
    // Finally delete the user
    await tx.user.delete({ where: { id: userId } });
  });
};

// ============================================================================
// HEALTH CHECK UTILITIES
// ============================================================================

/**
 * Perform comprehensive database health check
 */
export const performHealthCheck = async () => {
  try {
    const start = Date.now();
    
    // Test basic connectivity
    await prisma.$queryRaw`SELECT 1`;
    
    // Test each main table
    const [userCount, applicationCount, documentCount] = await Promise.all([
      prisma.user.count(),
      prisma.application.count(),
      prisma.document.count(),
    ]);
    
    const duration = Date.now() - start;
    
    return {
      status: 'healthy',
      duration,
      counts: {
        users: userCount,
        applications: applicationCount,
        documents: documentCount,
      },
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
};
