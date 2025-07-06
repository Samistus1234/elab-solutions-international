/**
 * Application Management API - Main Endpoints
 * GET /api/applications - List applications with filtering and pagination
 * POST /api/applications - Create new application
 */

import { NextRequest } from 'next/server';
import { 
  prisma, 
  successResponse, 
  errorResponse, 
  parseRequestBody,
  handleApiError,
  authenticateRequest,
  parsePaginationParams,
  createPaginationMeta
} from '@/lib/api/server/api-utils';
import { CreateApplicationSchema, ApplicationQuerySchema } from '@/lib/api/server/validation-schemas';
import { UserRole } from '@/generated/prisma';
import { z } from 'zod';

// ============================================================================
// GET /api/applications - List applications with filtering
// ============================================================================

export async function GET(req: NextRequest) {
  try {
    // Authenticate the request
    const currentUser = await authenticateRequest(req);
    if (!currentUser) {
      return errorResponse({
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
        statusCode: 401
      });
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    
    // Convert string parameters to appropriate types
    const parsedParams = {
      ...queryParams,
      page: queryParams.page ? parseInt(queryParams.page) : 1,
      limit: queryParams.limit ? parseInt(queryParams.limit) : 10
    };

    // Validate query parameters
    const validation = ApplicationQuerySchema.safeParse(parsedParams);
    if (!validation.success) {
      return errorResponse({
        code: 'VALIDATION_ERROR',
        message: 'Invalid query parameters',
        details: validation.error.errors,
        statusCode: 400
      });
    }

    const {
      page,
      limit,
      search,
      type,
      status,
      priority,
      assignedTo,
      userId,
      targetCountry,
      targetProfession,
      sortBy,
      sortOrder
    } = validation.data;

    // Build where clause based on user role and filters
    const where: any = {};

    // Role-based filtering
    if (currentUser.role === 'APPLICANT') {
      where.userId = currentUser.id;
    } else if (currentUser.role === 'CONSULTANT') {
      where.OR = [
        { assignedTo: currentUser.id },
        { userId: currentUser.id }
      ];
    }
    // ADMIN and SUPER_ADMIN can see all applications

    // Apply filters
    if (type) where.type = type;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedTo) where.assignedTo = assignedTo;
    if (userId && (currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN')) {
      where.userId = userId;
    }
    if (targetCountry) where.targetCountry = { contains: targetCountry, mode: 'insensitive' };
    if (targetProfession) where.targetProfession = { contains: targetProfession, mode: 'insensitive' };

    // Search functionality
    if (search) {
      where.OR = [
        { personalInfo: { path: ['firstName'], string_contains: search } },
        { personalInfo: { path: ['lastName'], string_contains: search } },
        { personalInfo: { path: ['email'], string_contains: search } },
        { targetCountry: { contains: search, mode: 'insensitive' } },
        { targetProfession: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Calculate pagination
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const total = await prisma.application.count({ where });

    // Fetch applications with related data
    const applications = await prisma.application.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            country: true,
            profession: true
          }
        },
        documents: {
          select: {
            id: true,
            name: true,
            type: true,
            verificationStatus: true,
            uploadedAt: true
          }
        },
        payments: {
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            description: true,
            createdAt: true
          }
        },
        _count: {
          select: {
            documents: true,
            payments: true,
            workflowSteps: true
          }
        }
      },
      orderBy: {
        [sortBy]: sortOrder
      },
      skip: offset,
      take: limit
    });

    // Create pagination metadata
    const meta = createPaginationMeta(total, page, limit);

    return successResponse({
      applications,
      meta
    });

  } catch (error) {
    return handleApiError(error);
  }
}

// ============================================================================
// POST /api/applications - Create new application
// ============================================================================

export async function POST(req: NextRequest) {
  try {
    // Authenticate the request
    const currentUser = await authenticateRequest(req);
    if (!currentUser) {
      return errorResponse({
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
        statusCode: 401
      });
    }

    // Parse and validate request body
    const bodyResult = await parseRequestBody(req, CreateApplicationSchema);
    if (!bodyResult.success) {
      return bodyResult.response;
    }

    const {
      type,
      targetCountry,
      targetProfession,
      priority,
      personalInfo,
      additionalData
    } = bodyResult.data;

    // Create the application
    const application = await prisma.application.create({
      data: {
        userId: currentUser.id,
        type,
        status: 'DRAFT',
        priority,
        personalInfo: JSON.stringify(personalInfo),
        targetCountry,
        targetProfession,
        additionalData: JSON.stringify(additionalData || {}),
        workflowState: JSON.stringify({})
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            country: true,
            profession: true
          }
        },
        documents: {
          select: {
            id: true,
            name: true,
            type: true,
            verificationStatus: true,
            uploadedAt: true
          }
        },
        payments: {
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            description: true,
            createdAt: true
          }
        }
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: currentUser.id,
        action: 'CREATE_APPLICATION',
        resource: 'APPLICATION',
        resourceId: application.id,
        newValues: JSON.stringify({
          type,
          status: 'DRAFT',
          priority,
          targetCountry,
          targetProfession
        }),
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown',
        userAgent: req.headers.get('user-agent') || 'Unknown'
      }
    });

    return successResponse({
      application,
      message: 'Application created successfully'
    });

  } catch (error) {
    return handleApiError(error);
  }
}
