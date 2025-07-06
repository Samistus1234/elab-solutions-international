/**
 * API Utilities for ELAB Solutions International
 * 
 * Common utilities for API route handlers
 */

import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema, ZodError } from 'zod';
import { PrismaClient } from '@/generated/prisma';
import { verify } from 'jsonwebtoken';
import type { UserRole } from '@/types/business';
import { getPrismaClient } from '@/lib/db/setup';

// ============================================================================
// TYPES
// ============================================================================

export interface ApiContext {
  req: NextRequest;
  params?: Record<string, string>;
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  statusCode: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// ============================================================================
// DATABASE CLIENT
// ============================================================================

// Use the centralized Prisma client setup
export const prisma = getPrismaClient();

// ============================================================================
// RESPONSE HELPERS
// ============================================================================

export function successResponse<T>(
  data: T,
  meta?: ApiResponse<T>['meta']
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    meta
  });
}

export function errorResponse(
  error: ApiError
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error
    },
    { status: error.statusCode }
  );
}

export function validationErrorResponse(
  zodError: ZodError
): NextResponse<ApiResponse> {
  return errorResponse({
    code: 'VALIDATION_ERROR',
    message: 'Invalid request data',
    details: zodError.errors,
    statusCode: 400
  });
}

// ============================================================================
// AUTHENTICATION HELPERS
// ============================================================================

export async function authenticateRequest(
  req: NextRequest
): Promise<{ id: string; email: string; role: UserRole } | null> {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return null;
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = verify(token, JWT_SECRET) as any;

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { id: true, email: true, role: true, status: true }
    });

    if (!user || user.status !== 'ACTIVE') {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role as UserRole
    };
  } catch (error) {
    return null;
  }
}

export function requireAuth(
  allowedRoles?: UserRole[]
) {
  return async function(
    req: NextRequest,
    context: { params?: Record<string, string> }
  ) {
    const user = await authenticateRequest(req);

    if (!user) {
      return errorResponse({
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
        statusCode: 401
      });
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return errorResponse({
        code: 'FORBIDDEN',
        message: 'Insufficient permissions',
        statusCode: 403
      });
    }

    return { user, params: context.params };
  };
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export function validateRequest<T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: ZodError } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}

export async function parseRequestBody<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; response: NextResponse }> {
  try {
    const body = await req.json();
    const validation = validateRequest(schema, body);
    
    if (!validation.success) {
      return {
        success: false,
        response: validationErrorResponse(validation.error)
      };
    }

    return { success: true, data: validation.data };
  } catch (error) {
    return {
      success: false,
      response: errorResponse({
        code: 'INVALID_JSON',
        message: 'Invalid JSON in request body',
        statusCode: 400
      })
    };
  }
}

// ============================================================================
// PAGINATION HELPERS
// ============================================================================

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export function parsePaginationParams(
  searchParams: URLSearchParams
): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

export function createPaginationMeta(
  total: number,
  page: number,
  limit: number
) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  };
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error('API Error:', error);

  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  // Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any;
    
    switch (prismaError.code) {
      case 'P2002':
        return errorResponse({
          code: 'DUPLICATE_ENTRY',
          message: 'A record with this data already exists',
          statusCode: 409
        });
      case 'P2025':
        return errorResponse({
          code: 'NOT_FOUND',
          message: 'Record not found',
          statusCode: 404
        });
      default:
        return errorResponse({
          code: 'DATABASE_ERROR',
          message: 'Database operation failed',
          statusCode: 500
        });
    }
  }

  return errorResponse({
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred',
    statusCode: 500
  });
}


export function requireRole(
  user: { role: UserRole },
  allowedRoles: UserRole[]
): boolean {
  return allowedRoles.includes(user.role);
}
