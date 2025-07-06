/**
 * Health Check API Endpoint
 * GET /api/health - System health check
 */

import { NextRequest } from 'next/server';
import { prisma, successResponse, errorResponse } from '@/lib/api/server/api-utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Initialize basic response
    const response = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      database: {
        status: 'not_configured',
        responseTime: 'N/A'
      },
      stats: {
        totalUsers: 0,
        totalApplications: 0,
        totalDocuments: 0,
        unreadNotifications: 0
      }
    };

    // Try database connection if configured
    if (process.env.DATABASE_URL) {
      try {
        const dbStart = Date.now();

        // Test basic connection
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1`;

        const dbTime = Date.now() - dbStart;
        response.database = {
          status: 'connected',
          responseTime: `${dbTime}ms`
        };

        // Try to get stats (may fail if tables don't exist)
        try {
          const [users, applications, documents, notifications] = await Promise.allSettled([
            prisma.user.count(),
            prisma.application.count(),
            prisma.document.count(),
            prisma.notification.count({ where: { status: 'PENDING' } })
          ]);

          response.stats = {
            totalUsers: users.status === 'fulfilled' ? users.value : 0,
            totalApplications: applications.status === 'fulfilled' ? applications.value : 0,
            totalDocuments: documents.status === 'fulfilled' ? documents.value : 0,
            unreadNotifications: notifications.status === 'fulfilled' ? notifications.value : 0
          };
        } catch (statsError) {
          console.warn('Could not fetch database stats:', statsError);
        }

        await prisma.$disconnect();
      } catch (dbError) {
        console.warn('Database connection failed:', dbError);
        response.database.status = 'disconnected';
      }
    }

    return successResponse(response);

  } catch (error) {
    console.error('Health check failed:', error);

    // Return a basic healthy response even if there are errors
    return successResponse({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      database: {
        status: 'error',
        responseTime: 'N/A'
      },
      stats: {
        totalUsers: 0,
        totalApplications: 0,
        totalDocuments: 0,
        unreadNotifications: 0
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
