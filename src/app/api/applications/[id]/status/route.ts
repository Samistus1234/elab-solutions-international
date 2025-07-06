/**
 * Application Status Management API
 * PUT /api/applications/[id]/status - Update application status with workflow management
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
import { UserRole } from '@/generated/prisma';
import { ApplicationStatusUpdateSchema } from '@/lib/api/server/validation-schemas';

interface RouteParams {
  params: { id: string };
}

// Status transition rules
const STATUS_TRANSITIONS = {
  'DRAFT': ['SUBMITTED', 'CANCELLED'],
  'SUBMITTED': ['IN_REVIEW', 'PENDING_DOCUMENTS', 'CANCELLED'],
  'IN_REVIEW': ['PENDING_DOCUMENTS', 'PENDING_PAYMENT', 'PROCESSING', 'APPROVED', 'REJECTED'],
  'PENDING_DOCUMENTS': ['IN_REVIEW', 'CANCELLED'],
  'PENDING_PAYMENT': ['PROCESSING', 'CANCELLED'],
  'PROCESSING': ['APPROVED', 'REJECTED', 'PENDING_DOCUMENTS'],
  'APPROVED': ['COMPLETED'],
  'REJECTED': ['IN_REVIEW'], // Allow resubmission after rejection
  'COMPLETED': [], // Final state
  'CANCELLED': [] // Final state
};

// ============================================================================
// PUT /api/applications/[id]/status - Update application status
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
    const bodyResult = await parseRequestBody(req, ApplicationStatusUpdateSchema);
    if (!bodyResult.success) {
      return bodyResult.response;
    }

    const { status: newStatus, reason, notes } = bodyResult.data;

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
        submittedAt: true
      }
    });

    if (!existingApplication) {
      return errorResponse({
        code: 'APPLICATION_NOT_FOUND',
        message: 'Application not found',
        statusCode: 404
      });
    }

    // Check permissions based on status change
    const canUpdateStatus = checkStatusUpdatePermissions(
      currentUser,
      existingApplication,
      newStatus
    );

    if (!canUpdateStatus.allowed) {
      return errorResponse({
        code: 'FORBIDDEN',
        message: canUpdateStatus.message,
        statusCode: 403
      });
    }

    // Validate status transition
    const currentStatus = existingApplication.status;
    const allowedTransitions = STATUS_TRANSITIONS[currentStatus as keyof typeof STATUS_TRANSITIONS] || [];
    
    if (!allowedTransitions.includes(newStatus)) {
      return errorResponse({
        code: 'INVALID_STATUS_TRANSITION',
        message: `Cannot transition from ${currentStatus} to ${newStatus}`,
        details: { 
          currentStatus, 
          newStatus, 
          allowedTransitions 
        },
        statusCode: 400
      });
    }

    // Prepare update data
    const updateData: any = {
      status: newStatus,
      updatedAt: new Date()
    };

    // Set submittedAt when status changes to SUBMITTED
    if (newStatus === 'SUBMITTED' && !existingApplication.submittedAt) {
      updateData.submittedAt = new Date();
    }

    // Set actualCompletion when status changes to COMPLETED
    if (newStatus === 'COMPLETED') {
      updateData.actualCompletion = new Date();
    }

    // Update the application status
    const updatedApplication = await prisma.application.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        documents: {
          select: {
            id: true,
            name: true,
            type: true,
            verificationStatus: true
          }
        },
        payments: {
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true
          }
        }
      }
    });

    // Create workflow step if needed
    await createWorkflowStep(id, currentStatus, newStatus, currentUser.id, notes);

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: currentUser.id,
        action: 'UPDATE_APPLICATION_STATUS',
        resource: 'APPLICATION',
        resourceId: id,
        oldValues: {
          status: currentStatus
        },
        newValues: {
          status: newStatus,
          reason,
          notes
        },
        reason,
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown',
        userAgent: req.headers.get('user-agent') || 'Unknown'
      }
    });

    // Send notification to relevant users
    await sendStatusUpdateNotification(updatedApplication, currentStatus, newStatus, currentUser);

    return successResponse({
      application: updatedApplication,
      message: `Application status updated to ${newStatus}`,
      statusTransition: {
        from: currentStatus,
        to: newStatus,
        updatedBy: currentUser.id,
        updatedAt: updateData.updatedAt
      }
    });

  } catch (error) {
    return handleApiError(error);
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function checkStatusUpdatePermissions(
  currentUser: any,
  application: any,
  newStatus: string
): { allowed: boolean; message: string } {
  const { role } = currentUser;
  const { userId, assignedTo } = application;

  // Super admin can do anything
  if (role === 'SUPER_ADMIN') {
    return { allowed: true, message: '' };
  }

  // Admin can update most statuses
  if (role === 'ADMIN') {
    return { allowed: true, message: '' };
  }

  // Consultant can update if assigned to them
  if (role === 'CONSULTANT' && assignedTo === currentUser.id) {
    // Consultants cannot cancel applications
    if (newStatus === 'CANCELLED') {
      return { 
        allowed: false, 
        message: 'Consultants cannot cancel applications' 
      };
    }
    return { allowed: true, message: '' };
  }

  // Applicant can only submit their own draft applications
  if (role === 'APPLICANT' && userId === currentUser.id) {
    if (newStatus === 'SUBMITTED' && application.status === 'DRAFT') {
      return { allowed: true, message: '' };
    }
    if (newStatus === 'CANCELLED' && ['DRAFT', 'SUBMITTED'].includes(application.status)) {
      return { allowed: true, message: '' };
    }
    return { 
      allowed: false, 
      message: 'Applicants can only submit draft applications or cancel early-stage applications' 
    };
  }

  return { 
    allowed: false, 
    message: 'Insufficient permissions to update application status' 
  };
}

async function createWorkflowStep(
  applicationId: string,
  fromStatus: string,
  toStatus: string,
  userId: string,
  notes?: string
) {
  try {
    // Get the current step order
    const lastStep = await prisma.workflowStep.findFirst({
      where: { applicationId },
      orderBy: { stepOrder: 'desc' },
      select: { stepOrder: true }
    });

    const nextOrder = (lastStep?.stepOrder || 0) + 1;

    await prisma.workflowStep.create({
      data: {
        applicationId,
        stepName: `Status Change: ${fromStatus} → ${toStatus}`,
        stepOrder: nextOrder,
        status: 'completed',
        notes: notes || `Status updated from ${fromStatus} to ${toStatus}`,
        assignedTo: userId,
        completedBy: userId,
        startedAt: new Date(),
        completedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Failed to create workflow step:', error);
    // Don't throw error as this is not critical
  }
}

async function sendStatusUpdateNotification(
  application: any,
  fromStatus: string,
  toStatus: string,
  updatedBy: any
) {
  try {
    // Create notification for the applicant
    await prisma.notification.create({
      data: {
        userId: application.userId,
        title: 'Application Status Updated',
        message: `Your application status has been updated from ${fromStatus} to ${toStatus}`,
        type: 'IN_APP',
        status: 'PENDING',
        channel: 'in_app',
        recipient: application.user.email,
        data: JSON.stringify({
          applicationId: application.id,
          fromStatus,
          toStatus,
          updatedBy: updatedBy.id
        })
      }
    });

    // Create notification for assigned consultant if different from updater
    if (application.assignedTo && application.assignedTo !== updatedBy.id) {
      await prisma.notification.create({
        data: {
          userId: application.assignedTo,
          title: 'Application Status Updated',
          message: `Application ${application.id} status updated from ${fromStatus} to ${toStatus}`,
          type: 'IN_APP',
          status: 'PENDING',
          channel: 'in_app',
          recipient: 'consultant',
          data: JSON.stringify({
            applicationId: application.id,
            fromStatus,
            toStatus,
            updatedBy: updatedBy.id
          })
        }
      });
    }
  } catch (error) {
    console.error('Failed to send status update notification:', error);
    // Don't throw error as this is not critical
  }
}
