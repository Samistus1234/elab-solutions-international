/**
 * Prisma Database Client Configuration
 * ELAB Solutions International
 * 
 * Features:
 * - Connection pooling for scalability
 * - Healthcare compliance logging
 * - Error handling and monitoring
 * - Development vs Production optimization
 */

import { PrismaClient } from '../../generated/prisma';

// Global variable to store Prisma client instance
declare global {
  var __prisma: PrismaClient | undefined;
}

// Database configuration based on environment
const getDatabaseConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    // Connection pool settings
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    
    // Logging configuration - disabled for development
    // log: isProduction 
    //   ? ['error', 'warn']
    //   : ['query', 'info', 'warn', 'error'],
    
    // Error formatting for healthcare compliance
    errorFormat: 'pretty' as const,
  };
};

// Create Prisma client with healthcare compliance features
const createPrismaClient = () => {
  const config = getDatabaseConfig();
  
  const prisma = new PrismaClient(config);
  
  // Healthcare compliance middleware
  prisma.$use(async (params, next) => {
    const start = Date.now();
    
    try {
      const result = await next(params);
      
      // Log successful operations for audit trail
      if (process.env.VERBOSE_LOGGING === 'true') {
        const duration = Date.now() - start;
        console.log(`Database operation: ${params.model}.${params.action} completed in ${duration}ms`);
      }
      
      return result;
    } catch (error) {
      // Log errors for compliance and monitoring
      console.error('Database operation failed:', {
        model: params.model,
        action: params.action,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });
      
      throw error;
    }
  });
  
  // GDPR compliance middleware for data access logging
  prisma.$use(async (params, next) => {
    // Log data access for sensitive models
    const sensitiveModels = ['User', 'Document', 'Application', 'Payment'];
    
    if (sensitiveModels.includes(params.model || '')) {
      // In production, this would integrate with your audit logging system
      if (process.env.DEBUG_MODE === 'true') {
        console.log(`GDPR Audit: Accessing ${params.model} with action ${params.action}`);
      }
    }
    
    return next(params);
  });
  
  return prisma;
};

// Singleton pattern for Prisma client
const prisma = globalThis.__prisma || createPrismaClient();

if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma;
}

// Connection health check
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Graceful shutdown
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    console.log('Database connection closed gracefully');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
};

// Database statistics for monitoring
export const getDatabaseStats = async () => {
  try {
    const [userCount, applicationCount, documentCount] = await Promise.all([
      prisma.user.count(),
      prisma.application.count(),
      prisma.document.count(),
    ]);
    
    return {
      users: userCount,
      applications: applicationCount,
      documents: documentCount,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to get database statistics:', error);
    return null;
  }
};

// Export the Prisma client instance
export { prisma };
export default prisma;

// Export Prisma types for use in the application
export type {
  User,
  Application,
  Document,
  Payment,
  Session,
  WorkflowStep,
  Notification,
  AuditLog,
  UserRole,
  UserStatus,
  ApplicationType,
  ApplicationStatus,
  ApplicationPriority,
  DocumentType,
  VerificationStatus,
  PaymentStatus,
  NotificationType,
  NotificationStatus,
} from '../../generated/prisma';
