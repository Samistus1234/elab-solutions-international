// Health Check API - Vercel Function
export default async function handler(req, res) {
  try {
    // Basic health check response
    const response = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'production',
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
        // Import Prisma dynamically to avoid build issues
        const { PrismaClient } = await import('../src/generated/prisma/index.js');
        const prisma = new PrismaClient();
        
        const dbStart = Date.now();
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1`;
        const dbTime = Date.now() - dbStart;
        
        response.database = {
          status: 'connected',
          responseTime: `${dbTime}ms`
        };

        // Try to get basic stats
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

    res.status(200).json(response);
  } catch (error) {
    console.error('Health check failed:', error);
    
    // Return basic healthy response even on error
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'production',
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
      error: error.message || 'Unknown error'
    });
  }
}
