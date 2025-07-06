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
    // Basic health check without database dependency for production deployment
    let dbStatus = 'not_configured';
    let dbTime = 0;
    let stats = {
      totalUsers: 0,
      totalApplications: 0,
      totalDocuments: 0,
      unreadNotifications: 0
    };

    // Only try database connection if DATABASE_URL is properly configured
    if (process.env.DATABASE_URL && process.env.DATABASE_URL !== 'file:./dev.db') {
      try {
        const dbStart = Date.now();
        await prisma.$queryRaw`SELECT 1`;
        dbTime = Date.now() - dbStart;
        dbStatus = 'connected';

        // Get basic stats only if database is connected
        const dbStats = await Promise.all([
          prisma.user.count(),
          prisma.application.count(),
          prisma.document.count(),
          prisma.notification.count({ where: { status: 'PENDING' } })
        ]);

        stats = {
          totalUsers: dbStats[0],
          totalApplications: dbStats[1],
          totalDocuments: dbStats[2],
          unreadNotifications: dbStats[3]
        };
      } catch (dbError) {
        console.warn('Database connection failed:', dbError);
        dbStatus = 'disconnected';
      }
    }

    return successResponse({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: dbStatus,
        responseTime: dbTime > 0 ? `${dbTime}ms` : 'N/A'
      },
      stats,
      uptime: process.uptime()
    });

  } catch (error) {
    console.error('Health check failed:', error);

    return errorResponse({
      code: 'HEALTH_CHECK_FAILED',
      message: 'System health check failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 503
    });
  }
}
