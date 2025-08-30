/**
 * Application Management API - Individual Application Endpoints
 * GET /api/applications/[id] - Get application details
 * PUT /api/applications/[id] - Update application
 * DELETE /api/applications/[id] - Soft delete application
 */

import { NextRequest } from 'next/server';
import {
  prisma,
  successResponse,
  errorResponse,
  parseRequestBody,
  handleApiError,
  authenticateRequest
} from '@/lib/api/server/api-utils';
import { $Enums } from '@/generated/prisma';
import { UpdateApplicationSchema } from '@/lib/api/server/validation-schemas';

interface RouteParams {
  params: { id: string };
}

// ============================================================================
// GET /api/applications/[id] - Get application details
// ============================================================================

export async function GET(req: NextRequest, { params }: RouteParams) {
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

    const { id } = params;

    // Find the application with all related data
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            country: true,
            profession: true,
            avatar: true
          }
        },
        documents: {
          select: {
            id: true,
            name: true,
            type: true,
            originalName: true,
            size: true,
            verificationStatus: true,
            verifiedBy: true,
            verifiedAt: true,
            verificationNotes: true,
            uploadedAt: true,
            updatedAt: true
          },
          orderBy: { uploadedAt: 'desc' }
        },
        payments: {
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            description: true,
            reference: true,
            paidAt: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        },
        workflowSteps: {
          select: {
            id: true,
            stepName: true,
            stepOrder: true,
            status: true,
            notes: true,
            assignedTo: true,
            completedBy: true,
            startedAt: true,
            completedAt: true,
            dueDate: true
          },
          orderBy: { stepOrder: 'asc' }
        }
      }
    });

    if (!application) {
      return errorResponse({
        code: 'APPLICATION_NOT_FOUND',
        message: 'Application not found',
        statusCode: 404
      });
    }

    // Check permissions - using type assertion for role comparison
    const canViewApplication =
      (currentUser.role as string) === 'ADMIN' ||
      (currentUser.role as string) === 'SUPER_ADMIN' ||
      application.userId === currentUser.id ||
      application.assignedTo === currentUser.id;

    if (!canViewApplication) {
      return errorResponse({
        code: 'FORBIDDEN',
        message: 'Insufficient permissions to view this application',
        statusCode: 403
      });
    }

    return successResponse({ application });

  } catch (error) {
    return handleApiError(error);
  }
}

// ============================================================================
// PUT /api/applications/[id] - Update application
// ============================================================================

export async function PUT(req: NextRequest, { params }: RouteParams) {
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

    const { id } = params;

    // Parse and validate request body
    const bodyResult = await parseRequestBody(req, UpdateApplicationSchema);
    if (!bodyResult.success) {
      return bodyResult.response;
    }

    const updateData = bodyResult.data;

    // Process JSON fields to stringify them
    const processedUpdateData: any = { ...updateData };
    if (processedUpdateData.personalInfo && typeof processedUpdateData.personalInfo === 'object') {
      processedUpdateData.personalInfo = JSON.stringify(processedUpdateData.personalInfo);
    }
    if (processedUpdateData.additionalData && typeof processedUpdateData.additionalData === 'object') {
      processedUpdateData.additionalData = JSON.stringify(processedUpdateData.additionalData);
    }
    if (processedUpdateData.workflowState && typeof processedUpdateData.workflowState === 'object') {
      processedUpdateData.workflowState = JSON.stringify(processedUpdateData.workflowState);
    }

    // Check if application exists
    const existingApplication = await prisma.application.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        assignedTo: true,
        status: true,
        type: true,
        priority: true,
        targetCountry: true,
        targetProfession: true,
        personalInfo: true,
        additionalData: true
      }
    });

    if (!existingApplication) {
      return errorResponse({
        code: 'APPLICATION_NOT_FOUND',
        message: 'Application not found',
        statusCode: 404
      });
    }

    // Check permissions - using type assertion for role comparison
    const canUpdateApplication =
      (currentUser.role as string) === 'ADMIN' ||
      (currentUser.role as string) === 'SUPER_ADMIN' ||
      existingApplication.userId === currentUser.id ||
      existingApplication.assignedTo === currentUser.id;

    if (!canUpdateApplication) {
      return errorResponse({
        code: 'FORBIDDEN',
        message: 'Insufficient permissions to update this application',
        statusCode: 403
      });
    }

    // Applicants can only update their own applications if status is DRAFT
    if ((currentUser.role as string) === 'APPLICANT' && existingApplication.status !== 'DRAFT') {
      return errorResponse({
        code: 'APPLICATION_NOT_EDITABLE',
        message: 'Application cannot be edited after submission',
        statusCode: 400
      });
    }

    // Update the application
    const updatedApplication = await prisma.application.update({
      where: { id },
      data: {
        ...processedUpdateData,
        updatedAt: new Date()
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
        action: 'UPDATE_APPLICATION',
        resource: 'APPLICATION',
        resourceId: id,
        oldValues: JSON.stringify({
          status: existingApplication.status,
          priority: existingApplication.priority,
          targetCountry: existingApplication.targetCountry,
          targetProfession: existingApplication.targetProfession
        }),
        newValues: JSON.stringify(updateData),
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown',
        userAgent: req.headers.get('user-agent') || 'Unknown'
      }
    });

    return successResponse({
      application: updatedApplication,
      message: 'Application updated successfully'
    });

  } catch (error) {
    return handleApiError(error);
  }
}

// ============================================================================
// DELETE /api/applications/[id] - Soft delete application
// ============================================================================

export async function DELETE(req: NextRequest, { params }: RouteParams) {
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

    const { id } = params;

    // Check permissions - only ADMIN and SUPER_ADMIN can delete applications
    if ((currentUser.role as string) !== 'ADMIN' && (currentUser.role as string) !== 'SUPER_ADMIN') {
      return errorResponse({
        code: 'FORBIDDEN',
        message: 'Insufficient permissions to delete applications',
        statusCode: 403
      });
    }

    // Check if application exists
    const existingApplication = await prisma.application.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        type: true,
        status: true,
        targetCountry: true,
        targetProfession: true
      }
    });

    if (!existingApplication) {
      return errorResponse({
        code: 'APPLICATION_NOT_FOUND',
        message: 'Application not found',
        statusCode: 404
      });
    }

    // Soft delete - update status to CANCELLED
    const deletedApplication = await prisma.application.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        updatedAt: new Date()
      },
      select: {
        id: true,
        type: true,
        status: true,
        targetCountry: true,
        targetProfession: true,
        updatedAt: true
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: currentUser.id,
        action: 'DELETE_APPLICATION',
        resource: 'APPLICATION',
        resourceId: id,
        oldValues: JSON.stringify({
          status: existingApplication.status
        }),
        newValues: JSON.stringify({
          status: 'CANCELLED',
          deletedBy: currentUser.id
        }),
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown',
        userAgent: req.headers.get('user-agent') || 'Unknown'
      }
    });

    return successResponse({
      application: deletedApplication,
      message: 'Application deleted successfully'
    });

  } catch (error) {
    return handleApiError(error);
  }
}
