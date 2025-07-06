/**
 * Business Domain Types for ELAB Solutions International
 * 
 * This file contains all business-specific type definitions including
 * user management, applications, services, and healthcare-related types.
 */

import type { ID, ISOString, Address, ContactInfo } from './index';

// ============================================================================
// USER MANAGEMENT TYPES
// ============================================================================

export enum UserRole {
  APPLICANT = 'applicant',
  CONSULTANT = 'consultant',
  ADMIN = 'admin',
  PARTNER = 'partner',
  INSTITUTION = 'institution',
  SUPER_ADMIN = 'super_admin'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification'
}

export interface UserProfile {
  readonly firstName: string;
  readonly lastName: string;
  readonly phone?: string;
  readonly country: string;
  readonly profession: string;
  readonly avatar?: string;
  readonly dateOfBirth?: ISOString;
  readonly gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  readonly address?: Address;
  readonly emergencyContact?: {
    readonly name: string;
    readonly relationship: string;
    readonly phone: string;
    readonly email?: string;
  };
}

export interface User {
  readonly id: ID;
  readonly email: string;
  readonly role: UserRole;
  readonly status: UserStatus;
  readonly profile: UserProfile;
  readonly preferences: UserPreferences;
  readonly createdAt: ISOString;
  readonly updatedAt: ISOString;
  readonly lastLoginAt?: ISOString;
  readonly emailVerifiedAt?: ISOString;
  readonly phoneVerifiedAt?: ISOString;
}

export interface UserPreferences {
  readonly language: 'en' | 'ar' | 'fr';
  readonly timezone: string;
  readonly notifications: {
    readonly email: boolean;
    readonly sms: boolean;
    readonly push: boolean;
    readonly marketing: boolean;
  };
  readonly privacy: {
    readonly profileVisibility: 'public' | 'private' | 'contacts_only';
    readonly showEmail: boolean;
    readonly showPhone: boolean;
  };
}

// ============================================================================
// APPLICATION MANAGEMENT TYPES
// ============================================================================

export enum ApplicationType {
  DATAFLOW = 'dataflow',
  LICENSING = 'licensing',
  PLACEMENT = 'placement',
  EXAM_PREP = 'exam_prep',
  CREDENTIAL_EVALUATION = 'credential_evaluation'
}

export enum ApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  IN_REVIEW = 'in_review',
  PENDING_DOCUMENTS = 'pending_documents',
  PENDING_PAYMENT = 'pending_payment',
  PROCESSING = 'processing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ApplicationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface Application {
  readonly id: ID;
  readonly userId: ID;
  readonly type: ApplicationType;
  readonly status: ApplicationStatus;
  readonly priority: ApplicationPriority;
  readonly data: ApplicationData;
  readonly workflow: WorkflowState;
  readonly assignedTo?: ID;
  readonly estimatedCompletion?: ISOString;
  readonly actualCompletion?: ISOString;
  readonly createdAt: ISOString;
  readonly updatedAt: ISOString;
  readonly submittedAt?: ISOString;
}

export interface ApplicationData {
  readonly personalInfo: PersonalInfo;
  readonly education: EducationInfo[];
  readonly experience: ExperienceInfo[];
  readonly documents: DocumentInfo[];
  readonly targetCountry: string;
  readonly targetProfession: string;
  readonly additionalInfo?: Record<string, unknown>;
}

export interface PersonalInfo {
  readonly fullName: string;
  readonly dateOfBirth: ISOString;
  readonly nationality: string;
  readonly passportNumber: string;
  readonly passportExpiry: ISOString;
  readonly maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  readonly languages: readonly {
    readonly language: string;
    readonly proficiency: 'basic' | 'intermediate' | 'advanced' | 'native';
  }[];
}

export interface EducationInfo {
  readonly id: ID;
  readonly institution: string;
  readonly degree: string;
  readonly field: string;
  readonly country: string;
  readonly startDate: ISOString;
  readonly endDate: ISOString;
  readonly gpa?: number;
  readonly documents: readonly DocumentInfo[];
}

export interface ExperienceInfo {
  readonly id: ID;
  readonly employer: string;
  readonly position: string;
  readonly department: string;
  readonly country: string;
  readonly startDate: ISOString;
  readonly endDate?: ISOString;
  readonly isCurrent: boolean;
  readonly responsibilities: readonly string[];
  readonly documents: readonly DocumentInfo[];
}

export interface DocumentInfo {
  readonly id: ID;
  readonly name: string;
  readonly type: DocumentType;
  readonly url: string;
  readonly size: number;
  readonly mimeType: string;
  readonly uploadedAt: ISOString;
  readonly verificationStatus: VerificationStatus;
  readonly expiryDate?: ISOString;
}

export enum DocumentType {
  PASSPORT = 'passport',
  DEGREE_CERTIFICATE = 'degree_certificate',
  TRANSCRIPT = 'transcript',
  LICENSE = 'license',
  EXPERIENCE_LETTER = 'experience_letter',
  IELTS_CERTIFICATE = 'ielts_certificate',
  OET_CERTIFICATE = 'oet_certificate',
  DATAFLOW_REPORT = 'dataflow_report',
  MEDICAL_CERTIFICATE = 'medical_certificate',
  POLICE_CLEARANCE = 'police_clearance',
  OTHER = 'other'
}

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

// ============================================================================
// WORKFLOW MANAGEMENT TYPES
// ============================================================================

export interface WorkflowState {
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly steps: readonly WorkflowStep[];
  readonly completedSteps: readonly number[];
  readonly estimatedCompletion: ISOString;
}

export interface WorkflowStep {
  readonly id: ID;
  readonly name: string;
  readonly description: string;
  readonly type: WorkflowStepType;
  readonly status: WorkflowStepStatus;
  readonly assignedTo?: ID;
  readonly dueDate?: ISOString;
  readonly completedAt?: ISOString;
  readonly dependencies: readonly ID[];
  readonly metadata?: Record<string, unknown>;
}

export enum WorkflowStepType {
  DOCUMENT_UPLOAD = 'document_upload',
  DOCUMENT_REVIEW = 'document_review',
  VERIFICATION = 'verification',
  PAYMENT = 'payment',
  EXTERNAL_SUBMISSION = 'external_submission',
  APPROVAL = 'approval',
  NOTIFICATION = 'notification'
}

export enum WorkflowStepStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
  FAILED = 'failed'
}

// ============================================================================
// SERVICE TYPES
// ============================================================================

export interface Service {
  readonly id: ID;
  readonly name: string;
  readonly description: string;
  readonly type: ApplicationType;
  readonly category: ServiceCategory;
  readonly pricing: ServicePricing;
  readonly requirements: readonly ServiceRequirement[];
  readonly timeline: ServiceTimeline;
  readonly isActive: boolean;
  readonly countries: readonly string[];
  readonly professions: readonly string[];
}

export enum ServiceCategory {
  CREDENTIALING = 'credentialing',
  LICENSING = 'licensing',
  EDUCATION = 'education',
  PLACEMENT = 'placement',
  CONSULTATION = 'consultation'
}

export interface ServicePricing {
  readonly basePrice: number;
  readonly currency: string;
  readonly additionalFees?: readonly {
    readonly name: string;
    readonly amount: number;
    readonly description: string;
  }[];
  readonly discounts?: readonly {
    readonly name: string;
    readonly percentage: number;
    readonly conditions: string;
  }[];
}

export interface ServiceRequirement {
  readonly id: ID;
  readonly name: string;
  readonly description: string;
  readonly type: 'document' | 'information' | 'payment' | 'exam';
  readonly isRequired: boolean;
  readonly validationRules?: Record<string, unknown>;
}

export interface ServiceTimeline {
  readonly estimatedDuration: number; // in days
  readonly milestones: readonly {
    readonly name: string;
    readonly estimatedDay: number;
    readonly description: string;
  }[];
}

// ============================================================================
// HEALTHCARE SPECIFIC TYPES
// ============================================================================

export enum HealthcareProfession {
  REGISTERED_NURSE = 'registered_nurse',
  LICENSED_PRACTICAL_NURSE = 'licensed_practical_nurse',
  MEDICAL_DOCTOR = 'medical_doctor',
  PHARMACIST = 'pharmacist',
  PHYSIOTHERAPIST = 'physiotherapist',
  MEDICAL_TECHNOLOGIST = 'medical_technologist',
  RADIOLOGIC_TECHNOLOGIST = 'radiologic_technologist',
  RESPIRATORY_THERAPIST = 'respiratory_therapist',
  OCCUPATIONAL_THERAPIST = 'occupational_therapist',
  SPEECH_THERAPIST = 'speech_therapist',
  DENTIST = 'dentist',
  DENTAL_HYGIENIST = 'dental_hygienist',
  OTHER = 'other'
}

export enum RegulatoryBody {
  DHA = 'dha', // Dubai Health Authority
  HAAD = 'haad', // Abu Dhabi Health Authority
  MOH_UAE = 'moh_uae', // Ministry of Health UAE
  SCFHS = 'scfhs', // Saudi Commission for Health Specialties
  QCHP = 'qchp', // Qatar Council for Healthcare Practitioners
  NCLEX = 'nclex', // National Council Licensure Examination
  CGFNS = 'cgfns', // Commission on Graduates of Foreign Nursing Schools
  NNAS = 'nnas', // National Nursing Assessment Service
  NMC = 'nmc', // Nursing and Midwifery Council
  HCPC = 'hcpc' // Health and Care Professions Council
}

export interface LicenseInfo {
  readonly id: ID;
  readonly licenseNumber: string;
  readonly issuingBody: RegulatoryBody;
  readonly profession: HealthcareProfession;
  readonly country: string;
  readonly issueDate: ISOString;
  readonly expiryDate: ISOString;
  readonly status: 'active' | 'expired' | 'suspended' | 'revoked';
  readonly verificationUrl?: string;
}

// ============================================================================
// EXAM AND EDUCATION TYPES
// ============================================================================

export interface ExamResult {
  readonly id: ID;
  readonly examType: ExamType;
  readonly score: number;
  readonly maxScore: number;
  readonly percentage: number;
  readonly result: 'pass' | 'fail';
  readonly examDate: ISOString;
  readonly certificateUrl?: string;
  readonly validUntil?: ISOString;
}

export enum ExamType {
  NCLEX_RN = 'nclex_rn',
  NCLEX_PN = 'nclex_pn',
  IELTS = 'ielts',
  OET = 'oet',
  TOEFL = 'toefl',
  PROMETRIC_DHA = 'prometric_dha',
  PROMETRIC_HAAD = 'prometric_haad',
  PROMETRIC_MOH = 'prometric_moh',
  SCFHS_EXAM = 'scfhs_exam',
  QCHP_EXAM = 'qchp_exam'
}

export interface Course {
  readonly id: ID;
  readonly title: string;
  readonly description: string;
  readonly examType: ExamType;
  readonly duration: number; // in hours
  readonly price: number;
  readonly currency: string;
  readonly level: 'beginner' | 'intermediate' | 'advanced';
  readonly prerequisites: readonly string[];
  readonly learningOutcomes: readonly string[];
  readonly isActive: boolean;
}

// ============================================================================
// PLACEMENT AND CAREER TYPES
// ============================================================================

export interface JobOpportunity {
  readonly id: ID;
  readonly title: string;
  readonly description: string;
  readonly employer: EmployerInfo;
  readonly location: Address;
  readonly profession: HealthcareProfession;
  readonly requirements: readonly string[];
  readonly benefits: readonly string[];
  readonly salary: SalaryInfo;
  readonly contractType: 'permanent' | 'temporary' | 'contract';
  readonly workSchedule: 'full_time' | 'part_time' | 'shift_work';
  readonly postedAt: ISOString;
  readonly expiresAt: ISOString;
  readonly isActive: boolean;
}

export interface EmployerInfo {
  readonly id: ID;
  readonly name: string;
  readonly type: 'hospital' | 'clinic' | 'nursing_home' | 'home_care' | 'other';
  readonly description: string;
  readonly logo?: string;
  readonly website?: string;
  readonly contact: ContactInfo;
  readonly size: 'small' | 'medium' | 'large' | 'enterprise';
  readonly accreditations: readonly string[];
}

export interface SalaryInfo {
  readonly min: number;
  readonly max: number;
  readonly currency: string;
  readonly period: 'hourly' | 'monthly' | 'annually';
  readonly additionalBenefits: readonly string[];
}

// ============================================================================
// ANALYTICS AND REPORTING TYPES
// ============================================================================

export interface ApplicationMetrics {
  readonly totalApplications: number;
  readonly applicationsByStatus: Record<ApplicationStatus, number>;
  readonly applicationsByType: Record<ApplicationType, number>;
  readonly averageProcessingTime: number;
  readonly successRate: number;
  readonly period: {
    readonly start: ISOString;
    readonly end: ISOString;
  };
}

export interface UserMetrics {
  readonly totalUsers: number;
  readonly activeUsers: number;
  readonly newUsers: number;
  readonly usersByRole: Record<UserRole, number>;
  readonly usersByCountry: Record<string, number>;
  readonly retentionRate: number;
}

export interface RevenueMetrics {
  readonly totalRevenue: number;
  readonly revenueByService: Record<string, number>;
  readonly averageOrderValue: number;
  readonly conversionRate: number;
  readonly currency: string;
}

// Additional types for services
export interface ApplicationWorkflow {
  readonly id: string;
  readonly applicationId: string;
  readonly currentStep: string;
  readonly status: ApplicationStatus;
  readonly steps: readonly WorkflowStep[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ApplicationDocument {
  readonly id: string;
  readonly applicationId: string;
  readonly documentId: string;
  readonly required: boolean;
  readonly status: VerificationStatus;
  readonly uploadedAt?: string;
  readonly verifiedAt?: string;
}

export interface ApplicationPayment {
  readonly id: string;
  readonly applicationId: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: 'pending' | 'completed' | 'failed';
  readonly paymentMethod: string;
  readonly transactionId?: string;
  readonly createdAt: string;
}

export interface ApplicationTimeline {
  readonly id: string;
  readonly applicationId: string;
  readonly event: string;
  readonly description: string;
  readonly timestamp: string;
  readonly userId?: string;
}

export interface UserActivity {
  readonly id: string;
  readonly userId: string;
  readonly action: string;
  readonly resource: string;
  readonly metadata?: Record<string, unknown>;
  readonly timestamp: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
}
