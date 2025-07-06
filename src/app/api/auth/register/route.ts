/**
 * Authentication API - Register Endpoint
 * POST /api/auth/register
 */

import { NextRequest } from 'next/server';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { 
  prisma, 
  successResponse, 
  errorResponse, 
  parseRequestBody,
  handleApiError 
} from '@/lib/api/server/api-utils';
import { RegisterSchema } from '@/lib/api/server/validation-schemas';

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const bodyResult = await parseRequestBody(req, RegisterSchema);
    if (!bodyResult.success) {
      return bodyResult.response;
    }

    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      phone, 
      country, 
      profession,
      consentGiven 
    } = bodyResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return errorResponse({
        code: 'USER_EXISTS',
        message: 'An account with this email already exists',
        statusCode: 409
      });
    }

    // Hash password
    const passwordHash = await hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        phone,
        country,
        profession,
        role: 'APPLICANT',
        status: 'PENDING_VERIFICATION',
        consentGiven,
        consentDate: consentGiven ? new Date() : null,
        lastActivityAt: new Date()
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    // Generate JWT tokens
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

    const accessToken = sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        type: 'access'
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = sign(
      {
        sub: user.id,
        type: 'refresh'
      },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Create session record
    const sessionExpiresAt = new Date();
    sessionExpiresAt.setDate(sessionExpiresAt.getDate() + 7);

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: sessionExpiresAt,
        deviceInfo: JSON.stringify({
          userAgent: req.headers.get('user-agent') || 'Unknown',
          registrationSession: true
        }),
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown'
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'REGISTER',
        resource: 'USER',
        resourceId: user.id,
        newValues: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          status: user.status
        },
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown',
        userAgent: req.headers.get('user-agent') || 'Unknown'
      }
    });

    // Create welcome notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Welcome to ELAB Solutions',
        message: `Welcome ${firstName}! Your account has been created successfully. Please verify your email to get started.`,
        type: 'EMAIL',
        status: 'PENDING',
        channel: 'email',
        recipient: user.email,
        priority: 'normal',
        data: JSON.stringify({
          template: 'welcome',
          firstName: firstName,
          verificationRequired: true
        })
      }
    });

    return successResponse({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: 60 * 60 // 1 hour in seconds
      },
      session: {
        id: session.id,
        expiresAt: session.expiresAt
      },
      message: 'Account created successfully. Please check your email for verification instructions.'
    });

  } catch (error) {
    return handleApiError(error);
  }
}
