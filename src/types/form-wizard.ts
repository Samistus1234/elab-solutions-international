/**
 * Form Wizard Types for Application Creation
 * 
 * Defines the structure and validation for the multi-step application form
 */

import { ApplicationType, DocumentType } from './applications';

// ============================================================================
// FORM WIZARD STEP DEFINITIONS
// ============================================================================

export enum FormStep {
  APPLICATION_TYPE = 'application_type',
  PERSONAL_INFO = 'personal_info',
  EDUCATION = 'education',
  EXPERIENCE = 'experience',
  DOCUMENTS = 'documents',
  REVIEW = 'review'
}

export interface FormWizardState {
  currentStep: FormStep;
  completedSteps: FormStep[];
  applicationData: ApplicationFormData;
  errors: FormErrors;
  isDraft: boolean;
  isSubmitting: boolean;
}

// ============================================================================
// APPLICATION FORM DATA STRUCTURE
// ============================================================================

export interface ApplicationFormData {
  // Step 1: Application Type
  applicationType: ApplicationType | null;
  targetCountry: string;
  urgency: 'standard' | 'express' | 'urgent';
  
  // Step 2: Personal Information
  personalInfo: PersonalInfoForm;
  
  // Step 3: Education
  education: EducationForm[];
  
  // Step 4: Experience
  experience: ExperienceForm[];
  
  // Step 5: Documents
  documents: DocumentRequirement[];
  
  // Additional metadata
  consultantNotes?: string;
  specialRequirements?: string;
}

// ============================================================================
// PERSONAL INFORMATION FORM
// ============================================================================

export interface PersonalInfoForm {
  // Basic Information
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  nationality: string;
  countryOfBirth: string;
  
  // Contact Information
  email: string;
  phone: string;
  whatsapp?: string;
  address: AddressForm;
  
  // Passport Information
  passportNumber: string;
  passportCountry: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  
  // Additional Information
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  languages: LanguageForm[];
  emergencyContact?: EmergencyContactForm;
}

export interface AddressForm {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface LanguageForm {
  language: string;
  proficiency: 'basic' | 'intermediate' | 'advanced' | 'native';
  certified?: boolean;
  certificateType?: string;
}

export interface EmergencyContactForm {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

// ============================================================================
// EDUCATION FORM
// ============================================================================

export interface EducationForm {
  id: string;
  level: 'high_school' | 'diploma' | 'bachelor' | 'master' | 'doctorate' | 'certificate';
  institution: string;
  degree: string;
  field: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  isCurrentlyEnrolled: boolean;
  gpa?: number;
  gpaScale?: number;
  honors?: string;
  thesis?: string;
  documents: string[]; // Document IDs
}

// ============================================================================
// EXPERIENCE FORM
// ============================================================================

export interface ExperienceForm {
  id: string;
  employer: string;
  position: string;
  department: string;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'volunteer';
  country: string;
  city: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  responsibilities: string[];
  achievements?: string[];
  supervisorName?: string;
  supervisorContact?: string;
  documents: string[]; // Document IDs
}

// ============================================================================
// DOCUMENT REQUIREMENTS
// ============================================================================

export interface DocumentRequirement {
  type: DocumentType;
  name: string;
  description: string;
  isRequired: boolean;
  isUploaded: boolean;
  fileId?: string;
  fileName?: string;
  uploadDate?: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  rejectionReason?: string;
}

// ============================================================================
// FORM VALIDATION AND ERRORS
// ============================================================================

export interface FormErrors {
  [FormStep.APPLICATION_TYPE]?: ApplicationTypeErrors;
  [FormStep.PERSONAL_INFO]?: PersonalInfoErrors;
  [FormStep.EDUCATION]?: EducationErrors;
  [FormStep.EXPERIENCE]?: ExperienceErrors;
  [FormStep.DOCUMENTS]?: DocumentErrors;
  [FormStep.REVIEW]?: ReviewErrors;
}

export interface ApplicationTypeErrors {
  applicationType?: string;
  targetCountry?: string;
  urgency?: string;
}

export interface PersonalInfoErrors {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  email?: string;
  phone?: string;
  passportNumber?: string;
  passportExpiryDate?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  languages?: {
    [index: number]: {
      language?: string;
      proficiency?: string;
    };
  };
}

export interface EducationErrors {
  [index: number]: {
    institution?: string;
    degree?: string;
    field?: string;
    country?: string;
    startDate?: string;
    endDate?: string;
  };
}

export interface ExperienceErrors {
  [index: number]: {
    employer?: string;
    position?: string;
    country?: string;
    startDate?: string;
    endDate?: string;
    responsibilities?: string;
  };
}

export interface DocumentErrors {
  [type: string]: string;
}

export interface ReviewErrors {
  submission?: string;
}

// ============================================================================
// APPLICATION TYPE CONFIGURATIONS
// ============================================================================

export interface ApplicationTypeConfig {
  type: ApplicationType;
  name: string;
  description: string;
  icon: string;
  targetCountries: string[];
  estimatedDuration: string;
  requiredDocuments: DocumentType[];
  optionalDocuments: DocumentType[];
  minimumExperience?: number; // in years
  requiredEducation?: string[];
  additionalRequirements?: string[];
}

export const APPLICATION_TYPE_CONFIGS: ApplicationTypeConfig[] = [
  {
    type: ApplicationType.DATAFLOW,
    name: 'DataFlow Verification',
    description: 'Primary source verification of healthcare credentials for international practice',
    icon: '🏥',
    targetCountries: ['UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Kuwait', 'Oman'],
    estimatedDuration: '8-12 weeks',
    requiredDocuments: [
      DocumentType.INTERNATIONAL_PASSPORT,
      DocumentType.EDUCATION_DOCUMENT,
      DocumentType.LICENSE_DOCUMENT
    ],
    optionalDocuments: [
      DocumentType.WORK_EXPERIENCE_DOCUMENT
    ],
    minimumExperience: 0,
    requiredEducation: ['Nursing Degree', 'Medical Degree'],
    additionalRequirements: [
      'Valid professional license',
      'English proficiency certificate',
      'Good standing certificate'
    ]
  },
  {
    type: ApplicationType.MUMARIS_PLUS,
    name: 'MUMARIS+ Verification',
    description: 'Enhanced credential verification with additional authentication layers',
    icon: '🔐',
    targetCountries: ['UAE', 'Saudi Arabia'],
    estimatedDuration: '10-14 weeks',
    requiredDocuments: [
      DocumentType.INTERNATIONAL_PASSPORT,
      DocumentType.EDUCATION_DOCUMENT,
      DocumentType.LICENSE_DOCUMENT,
      DocumentType.WORK_EXPERIENCE_DOCUMENT
    ],
    optionalDocuments: [],
    minimumExperience: 2,
    requiredEducation: ['Bachelor Degree or Higher'],
    additionalRequirements: [
      'Minimum 2 years experience',
      'Advanced English proficiency',
      'Specialized training certificates'
    ]
  },
  {
    type: ApplicationType.SHERYAN,
    name: 'Sheryan Verification',
    description: 'Specialized verification for healthcare professionals in Saudi Arabia',
    icon: '🇸🇦',
    targetCountries: ['Saudi Arabia'],
    estimatedDuration: '6-10 weeks',
    requiredDocuments: [
      DocumentType.INTERNATIONAL_PASSPORT,
      DocumentType.EDUCATION_DOCUMENT,
      DocumentType.LICENSE_DOCUMENT
    ],
    optionalDocuments: [
      DocumentType.WORK_EXPERIENCE_DOCUMENT
    ],
    minimumExperience: 1,
    requiredEducation: ['Healthcare Professional Degree'],
    additionalRequirements: [
      'Saudi Arabia specific requirements',
      'Arabic language proficiency (preferred)',
      'Cultural orientation completion'
    ]
  },
  {
    type: ApplicationType.LICENSE_RENEWAL,
    name: 'License Renewal',
    description: 'Renewal of existing professional licenses and certifications',
    icon: '🔄',
    targetCountries: ['UAE', 'Saudi Arabia', 'Qatar', 'Bahrain'],
    estimatedDuration: '4-6 weeks',
    requiredDocuments: [
      DocumentType.LICENSE_DOCUMENT,
      DocumentType.WORK_EXPERIENCE_DOCUMENT
    ],
    optionalDocuments: [
      DocumentType.EDUCATION_DOCUMENT
    ],
    minimumExperience: 0,
    requiredEducation: [],
    additionalRequirements: [
      'Existing valid license',
      'Continuing education credits',
      'Good standing verification'
    ]
  },
  {
    type: ApplicationType.EXAM_BOOKING,
    name: 'Exam Booking',
    description: 'Schedule and manage professional examination bookings',
    icon: '📝',
    targetCountries: ['UAE', 'Saudi Arabia', 'Qatar'],
    estimatedDuration: '2-4 weeks',
    requiredDocuments: [
      DocumentType.INTERNATIONAL_PASSPORT,
      DocumentType.EDUCATION_DOCUMENT
    ],
    optionalDocuments: [
      DocumentType.WORK_EXPERIENCE_DOCUMENT
    ],
    minimumExperience: 0,
    requiredEducation: ['Relevant Professional Degree'],
    additionalRequirements: [
      'Exam eligibility verification',
      'Payment confirmation',
      'Identification documents'
    ]
  }
];

// ============================================================================
// FORM UTILITIES AND HELPERS
// ============================================================================

export interface FormWizardActions {
  setCurrentStep: (step: FormStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateApplicationData: (data: Partial<ApplicationFormData>) => void;
  setErrors: (errors: Partial<FormErrors>) => void;
  clearErrors: (step?: FormStep) => void;
  saveDraft: () => Promise<void>;
  submitApplication: () => Promise<{
    success: boolean;
    applicationId: string;
    message: string;
  }>;
  resetForm: () => void;
}

export const FORM_STEP_ORDER: FormStep[] = [
  FormStep.APPLICATION_TYPE,
  FormStep.PERSONAL_INFO,
  FormStep.EDUCATION,
  FormStep.EXPERIENCE,
  FormStep.DOCUMENTS,
  FormStep.REVIEW
];

export const FORM_STEP_TITLES: Record<FormStep, string> = {
  [FormStep.APPLICATION_TYPE]: 'Application Type',
  [FormStep.PERSONAL_INFO]: 'Personal Information',
  [FormStep.EDUCATION]: 'Education Background',
  [FormStep.EXPERIENCE]: 'Work Experience',
  [FormStep.DOCUMENTS]: 'Document Requirements',
  [FormStep.REVIEW]: 'Review & Submit'
};

export const FORM_STEP_DESCRIPTIONS: Record<FormStep, string> = {
  [FormStep.APPLICATION_TYPE]: 'Select the type of application and target country',
  [FormStep.PERSONAL_INFO]: 'Provide your personal and contact information',
  [FormStep.EDUCATION]: 'Add your educational background and qualifications',
  [FormStep.EXPERIENCE]: 'Detail your professional work experience',
  [FormStep.DOCUMENTS]: 'Upload required documents for verification',
  [FormStep.REVIEW]: 'Review all information before submitting'
};