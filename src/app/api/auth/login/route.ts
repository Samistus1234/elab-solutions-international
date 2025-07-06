/**
 * Authentication API - Login Endpoint
 * POST /api/auth/login
 */

import { NextRequest } from 'next/server';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { 
  prisma, 
  successResponse, 
  errorResponse, 
  parseRequestBody,
  handleApiError 
} from '@/lib/api/server/api-utils';
import { LoginSchema } from '@/lib/api/server/validation-schemas';

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const bodyResult = await parseRequestBody(req, LoginSchema);
    if (!bodyResult.success) {
      return bodyResult.response;
    }

    const { email, password, rememberMe } = bodyResult.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        role: true,
        status: true,
        firstName: true,
        lastName: true,
        failedLoginAttempts: true,
        lockedUntil: true,
        lastLoginAt: true
      }
    });

    // Check if user exists
    if (!user) {
      return errorResponse({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
        statusCode: 401
      });
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return errorResponse({
        code: 'ACCOUNT_LOCKED',
        message: 'Account is temporarily locked due to too many failed login attempts',
        statusCode: 423
      });
    }

    // Check if account is active
    if (user.status !== 'ACTIVE') {
      return errorResponse({
        code: 'ACCOUNT_INACTIVE',
        message: 'Account is not active. Please contact support.',
        statusCode: 403
      });
    }

    // Verify password
    if (!user.passwordHash) {
      return errorResponse({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
        statusCode: 401
      });
    }

    const isPasswordValid = await compare(password, user.passwordHash);
    if (!isPasswordValid) {
      // Increment failed login attempts
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: user.failedLoginAttempts + 1,
          lockedUntil: user.failedLoginAttempts >= 4 ? 
            new Date(Date.now() + 15 * 60 * 1000) : // Lock for 15 minutes after 5 attempts
            undefined
        }
      });

      return errorResponse({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
        statusCode: 401
      });
    }

    // Generate JWT tokens
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
    
    const accessTokenExpiry = rememberMe ? '7d' : '1h';
    const refreshTokenExpiry = rememberMe ? '30d' : '7d';

    const accessToken = sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        type: 'access'
      },
      JWT_SECRET,
      { expiresIn: accessTokenExpiry }
    );

    const refreshToken = sign(
      {
        sub: user.id,
        type: 'refresh'
      },
      JWT_REFRESH_SECRET,
      { expiresIn: refreshTokenExpiry }
    );

    // Create session record
    const sessionExpiresAt = new Date();
    sessionExpiresAt.setDate(sessionExpiresAt.getDate() + (rememberMe ? 30 : 7));

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: sessionExpiresAt,
        deviceInfo: JSON.stringify({
          userAgent: req.headers.get('user-agent') || 'Unknown',
          rememberMe
        }),
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown'
      }
    });

    // Update user login info and reset failed attempts
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        lastActivityAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        resource: 'USER',
        resourceId: user.id,
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown',
        userAgent: req.headers.get('user-agent') || 'Unknown'
      }
    });

    return successResponse({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: rememberMe ? 7 * 24 * 60 * 60 : 60 * 60 // seconds
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
