
import { NextRequest } from 'next/server';
import {
  prisma,
  successResponse,
  errorResponse,
  handleApiError,
  authenticateRequest,
  requireRole
} from '@/lib/api/server/api-utils';
import { UserRole } from '@/generated/prisma';

interface RouteParams {
  params: { id: string };
}

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

    // Check permissions - only ADMIN and SUPER_ADMIN can delete users
    const canDeleteUser = requireRole(currentUser, [UserRole.ADMIN, UserRole.SUPER_ADMIN]);
    
    if (!canDeleteUser) {
      return errorResponse({
        code: 'FORBIDDEN',
        message: 'Insufficient permissions to delete users',
        statusCode: 403
      });
    }

    // Prevent self-deletion
    if (currentUser.id === id) {
      return errorResponse({
        code: 'SELF_DELETE_FORBIDDEN',
        message: 'Cannot delete your own account',
        statusCode: 400
      });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true
      }
    });

    if (!existingUser) {
      return errorResponse({
        code: 'USER_NOT_FOUND',
        message: 'User not found',
        statusCode: 404
      });
    }

    // Soft delete - update status to INACTIVE
    const deletedUser = await prisma.user.update({
      where: { id },
      data: {
        status: 'INACTIVE',
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
        updatedAt: true
      }
    });

    // Deactivate all user sessions
    await prisma.session.updateMany({
      where: { userId: id },
      data: { isActive: false }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: currentUser.id,
        action: 'DELETE_USER',
        resource: 'USER',
        resourceId: id,
        oldValues: JSON.stringify({
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          role: existingUser.role,
          status: existingUser.status
        }),
        newValues: JSON.stringify({
          status: 'INACTIVE',
          deletedBy: currentUser.id
        }),
        ipAddress: req.headers.get('x-forwarded-for') || 
                  req.headers.get('x-real-ip') || 
                  'Unknown',
        userAgent: req.headers.get('user-agent') || 'Unknown'
      }
    });

    return successResponse({
      user: deletedUser,
      message: 'User deleted successfully'
    });

  } catch (error) {
    return handleApiError(error);
  }
}
