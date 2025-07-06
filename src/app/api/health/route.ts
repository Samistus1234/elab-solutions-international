/**
 * Health Check API Endpoint
 * GET /api/health - System health check
 */

import { NextRequest } from 'next/server';
import { prisma, successResponse, errorResponse } from '@/lib/api/server/api-utils';

export async function GET(req: NextRequest) {
  try {
    // Check database connection
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const dbTime = Date.now() - dbStart;

    // Get basic stats
    const stats = await Promise.all([
      prisma.user.count(),
      prisma.application.count(),
      prisma.document.count(),
      prisma.notification.count({ where: { status: 'PENDING' } })
    ]);

    return successResponse({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: 'connected',
        responseTime: `${dbTime}ms`
      },
      stats: {
        totalUsers: stats[0],
        totalApplications: stats[1],
        totalDocuments: stats[2],
        unreadNotifications: stats[3]
      },
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
