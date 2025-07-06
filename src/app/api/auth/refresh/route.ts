/**
 * Authentication API - Refresh Token Endpoint
 * POST /api/auth/refresh
 */

import { NextRequest } from 'next/server';
import { verify, sign } from 'jsonwebtoken';
import { 
  prisma, 
  successResponse, 
  errorResponse, 
  parseRequestBody,
  handleApiError 
} from '@/lib/api/server/api-utils';
import { RefreshTokenSchema } from '@/lib/api/server/validation-schemas';

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const bodyResult = await parseRequestBody(req, RefreshTokenSchema);
    if (!bodyResult.success) {
      return bodyResult.response;
    }

    const { refreshToken } = bodyResult.data;

    // Verify refresh token
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
    
    let decoded: any;
    try {
      decoded = verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      return errorResponse({
        code: 'INVALID_REFRESH_TOKEN',
        message: 'Invalid or expired refresh token',
        statusCode: 401
      });
    }

    // Check if it's a refresh token
    if (decoded.type !== 'refresh') {
      return errorResponse({
        code: 'INVALID_TOKEN_TYPE',
        message: 'Invalid token type',
        statusCode: 401
      });
    }

    // Find session with this refresh token
    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            status: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!session || !session.isActive) {
      return errorResponse({
        code: 'SESSION_NOT_FOUND',
        message: 'Session not found or inactive',
        statusCode: 401
      });
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      // Clean up expired session
      await prisma.session.update({
        where: { id: session.id },
        data: { isActive: false }
      });

      return errorResponse({
        code: 'SESSION_EXPIRED',
        message: 'Session has expired',
        statusCode: 401
      });
    }

    // Check if user is still active
    if (session.user.status !== 'ACTIVE') {
      return errorResponse({
        code: 'ACCOUNT_INACTIVE',
        message: 'Account is not active',
        statusCode: 403
      });
    }

    // Generate new access token
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    
    const newAccessToken = sign(
      {
        sub: session.user.id,
        email: session.user.email,
        role: session.user.role,
        type: 'access'
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Update session with new access token and last used time
    await prisma.session.update({
      where: { id: session.id },
      data: {
        sessionToken: newAccessToken,
        lastUsedAt: new Date()
      }
    });

    // Update user last activity
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        lastActivityAt: new Date()
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'TOKEN_REFRESH',
        resource: 'SESSION',
        resourceId: session.id,
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown',
        userAgent: req.headers.get('user-agent') || 'Unknown'
      }
    });

    return successResponse({
      user: {
        id: session.user.id,
        email: session.user.email,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        role: session.user.role,
        status: session.user.status
      },
      tokens: {
        accessToken: newAccessToken,
        refreshToken: refreshToken, // Keep the same refresh token
        expiresIn: 60 * 60 // 1 hour in seconds
      },
      session: {
        id: session.id,
        expiresAt: session.expiresAt
      }
    });

  } catch (error) {
    return handleApiError(error);
  }
}
