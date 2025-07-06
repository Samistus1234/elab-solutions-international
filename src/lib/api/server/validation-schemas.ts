/**
 * API Validation Schemas for ELAB Solutions International
 * 
 * Zod schemas for validating API requests
 */

import { z } from 'zod';

// ============================================================================
// COMMON SCHEMAS
// ============================================================================

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10)
});

export const IdParamSchema = z.object({
  id: z.string().cuid()
});

// ============================================================================
// AUTH SCHEMAS
// ============================================================================

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional().default(false)
});

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  profession: z.string().min(1, 'Profession is required'),
  consentGiven: z.boolean().refine(val => val === true, 'Consent is required')
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required')
});

// ============================================================================
// USER SCHEMAS
// ============================================================================

export const UpdateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  profession: z.string().optional(),
  avatar: z.string().url().optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  preferences: z.record(z.any()).optional()
});

// ============================================================================
// APPLICATION SCHEMAS
// ============================================================================

export const CreateApplicationSchema = z.object({
  type: z.enum(['DATAFLOW', 'LICENSING', 'PLACEMENT', 'EXAM_PREP', 'CREDENTIAL_EVALUATION']),
  targetCountry: z.string().min(1, 'Target country is required'),
  targetProfession: z.string().min(1, 'Target profession is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  personalInfo: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    dateOfBirth: z.string().datetime(),
    nationality: z.string(),
    passportNumber: z.string().optional(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      postalCode: z.string()
    }).optional()
  }),
  additionalData: z.record(z.any()).optional()
});

export const UpdateApplicationSchema = z.object({
  type: z.enum(['DATAFLOW', 'LICENSING', 'PLACEMENT', 'EXAM_PREP', 'CREDENTIAL_EVALUATION']).optional(),
  status: z.enum(['DRAFT', 'SUBMITTED', 'IN_REVIEW', 'PENDING_DOCUMENTS', 'PENDING_PAYMENT', 'PROCESSING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  targetCountry: z.string().min(1).optional(),
  targetProfession: z.string().min(1).optional(),
  personalInfo: z.record(z.any()).optional(),
  additionalData: z.record(z.any()).optional(),
  currentStep: z.string().optional(),
  workflowState: z.record(z.any()).optional(),
  assignedTo: z.string().cuid().optional(),
  estimatedCompletion: z.string().datetime().optional()
});

export const ApplicationStatusUpdateSchema = z.object({
  status: z.enum(['DRAFT', 'SUBMITTED', 'IN_REVIEW', 'PENDING_DOCUMENTS', 'PENDING_PAYMENT', 'PROCESSING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED']),
  reason: z.string().optional(),
  notes: z.string().optional()
});

export const ApplicationQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  type: z.enum(['DATAFLOW', 'LICENSING', 'PLACEMENT', 'EXAM_PREP', 'CREDENTIAL_EVALUATION']).optional(),
  status: z.enum(['DRAFT', 'SUBMITTED', 'IN_REVIEW', 'PENDING_DOCUMENTS', 'PENDING_PAYMENT', 'PROCESSING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assignedTo: z.string().cuid().optional(),
  userId: z.string().cuid().optional(),
  targetCountry: z.string().optional(),
  targetProfession: z.string().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'submittedAt', 'priority', 'status']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const UserQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  role: z.enum(['APPLICANT', 'CONSULTANT', 'ADMIN', 'PARTNER', 'INSTITUTION', 'SUPER_ADMIN']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION']).optional(),
  country: z.string().optional(),
  profession: z.string().optional(),
  sortBy: z.enum(['createdAt', 'lastName', 'email', 'lastLoginAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const UserRoleUpdateSchema = z.object({
  role: z.enum(['APPLICANT', 'CONSULTANT', 'ADMIN', 'PARTNER', 'INSTITUTION', 'SUPER_ADMIN'])
});

export const UserStatusUpdateSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION']),
  reason: z.string().optional()
});
