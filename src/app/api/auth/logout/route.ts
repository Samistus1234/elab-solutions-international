/**
 * Authentication API - Logout Endpoint
 * POST /api/auth/logout
 */

import { NextRequest } from 'next/server';
import { 
  prisma, 
  successResponse, 
  errorResponse, 
  authenticateRequest,
  handleApiError 
} from '@/lib/api/server/api-utils';

export async function POST(req: NextRequest) {
  try {
    // Authenticate the request
    const user = await authenticateRequest(req);
    if (!user) {
      return errorResponse({
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
        statusCode: 401
      });
    }

    // Get the access token from the Authorization header
    const authHeader = req.headers.get('authorization');
    const accessToken = authHeader?.replace('Bearer ', '');

    if (!accessToken) {
      return errorResponse({
        code: 'NO_TOKEN',
        message: 'No access token provided',
        statusCode: 400
      });
    }

    // Find and deactivate the session
    const session = await prisma.session.findFirst({
      where: {
        userId: user.id,
        sessionToken: accessToken,
        isActive: true
      }
    });

    if (session) {
      // Deactivate the session
      await prisma.session.update({
        where: { id: session.id },
        data: {
          isActive: false,
          lastUsedAt: new Date()
        }
      });
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGOUT',
        resource: 'SESSION',
        resourceId: session?.id || 'unknown',
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown',
        userAgent: req.headers.get('user-agent') || 'Unknown'
      }
    });

    return successResponse({
      message: 'Logged out successfully'
    });

  } catch (error) {
    return handleApiError(error);
  }
}

// Also support GET method for logout links
export async function GET(req: NextRequest) {
  return POST(req);
}
