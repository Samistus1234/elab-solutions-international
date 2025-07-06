/**
 * Form Wizard State Management Store
 * 
 * Manages the multi-step application creation form state
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { 
  FormStep, 
  FormWizardState, 
  ApplicationFormData, 
  FormErrors,
  FORM_STEP_ORDER,
  type FormWizardActions
} from '@/types/form-wizard';
import { ApplicationType, DocumentType } from '@/types/applications';
import { generateId } from '@/lib/utils/id-generator';

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialApplicationData: ApplicationFormData = {
  applicationType: null,
  targetCountry: '',
  urgency: 'standard',
  personalInfo: {
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    gender: 'prefer_not_to_say',
    nationality: '',
    countryOfBirth: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    passportNumber: '',
    passportCountry: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    maritalStatus: 'single',
    languages: [],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    }
  },
  education: [],
  experience: [],
  documents: [],
  consultantNotes: '',
  specialRequirements: ''
};

const initialFormWizardState: FormWizardState = {
  currentStep: FormStep.APPLICATION_TYPE,
  completedSteps: [],
  applicationData: initialApplicationData,
  errors: {},
  isDraft: false,
  isSubmitting: false
};

// ============================================================================
// FORM WIZARD STORE
// ============================================================================

interface FormWizardStore extends FormWizardState, FormWizardActions {
  // Additional computed properties
  currentStepIndex: number;
  totalSteps: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isStepCompleted: (step: FormStep) => boolean;
  getStepValidationErrors: (step: FormStep) => string[];
}

export const useFormWizardStore = create<FormWizardStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialFormWizardState,

        // Computed properties
        get currentStepIndex() {
          return FORM_STEP_ORDER.indexOf(get().currentStep);
        },

        get totalSteps() {
          return FORM_STEP_ORDER.length;
        },

        get canGoNext() {
          const { currentStepIndex, totalSteps } = get();
          return currentStepIndex < totalSteps - 1;
        },

        get canGoPrevious() {
          const { currentStepIndex } = get();
          return currentStepIndex > 0;
        },

        // Actions
        setCurrentStep: (step: FormStep) => {
          set({ currentStep: step });
        },

        goToNextStep: () => {
          const { currentStepIndex, totalSteps, currentStep, completedSteps } = get();
          if (currentStepIndex < totalSteps - 1) {
            const nextStep = FORM_STEP_ORDER[currentStepIndex + 1];
            
            // Mark current step as completed
            const updatedCompletedSteps = completedSteps.includes(currentStep)
              ? completedSteps
              : [...completedSteps, currentStep];

            set({ 
              currentStep: nextStep,
              completedSteps: updatedCompletedSteps
            });
          }
        },

        goToPreviousStep: () => {
          const { currentStepIndex } = get();
          if (currentStepIndex > 0) {
            const previousStep = FORM_STEP_ORDER[currentStepIndex - 1];
            set({ currentStep: previousStep });
          }
        },

        updateApplicationData: (data: Partial<ApplicationFormData>) => {
          set((state) => ({
            applicationData: {
              ...state.applicationData,
              ...data
            },
            isDraft: true
          }));
        },

        setErrors: (errors: Partial<FormErrors>) => {
          set((state) => ({
            errors: {
              ...state.errors,
              ...errors
            }
          }));
        },

        clearErrors: (step?: FormStep) => {
          set((state) => {
            if (step) {
              const { [step]: _, ...restErrors } = state.errors;
              return { errors: restErrors };
            }
            return { errors: {} };
          });
        },

        isStepCompleted: (step: FormStep) => {
          const { completedSteps } = get();
          return completedSteps.includes(step);
        },

        getStepValidationErrors: (step: FormStep) => {
          const { errors } = get();
          const stepErrors = errors[step];
          if (!stepErrors) return [];

          return Object.values(stepErrors).filter(Boolean) as string[];
        },

        saveDraft: async () => {
          const { applicationData } = get();
          set({ isDraft: true });

          try {
            // In a real implementation, this would call an API
            console.log('Saving draft:', applicationData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update local storage through persist middleware
            localStorage.setItem('application-draft', JSON.stringify({
              ...applicationData,
              savedAt: new Date().toISOString()
            }));

            console.log('Draft saved successfully');
          } catch (error) {
            console.error('Error saving draft:', error);
            throw new Error('Failed to save draft');
          }
        },

        submitApplication: async () => {
          const { applicationData } = get();
          set({ isSubmitting: true });

          try {
            // Validate all steps before submission
            const validationErrors = validateApplicationData(applicationData);
            if (Object.keys(validationErrors).length > 0) {
              set({ errors: validationErrors, isSubmitting: false });
              throw new Error('Please fix validation errors before submitting');
            }

            // In a real implementation, this would call the API
            console.log('Submitting application:', applicationData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Clear draft status and reset form
            set({ 
              isDraft: false, 
              isSubmitting: false 
            });

            // Clear draft from localStorage
            localStorage.removeItem('application-draft');

            console.log('Application submitted successfully');
            
            return {
              success: true,
              applicationId: generateId(),
              message: 'Application submitted successfully'
            };
          } catch (error) {
            set({ isSubmitting: false });
            console.error('Error submitting application:', error);
            throw error;
          }
        },

        resetForm: () => {
          set(initialFormWizardState);
          localStorage.removeItem('application-draft');
        }
      }),
      {
        name: 'form-wizard-storage',
        partialize: (state) => ({
          currentStep: state.currentStep,
          completedSteps: state.completedSteps,
          applicationData: state.applicationData,
          isDraft: state.isDraft
        })
      }
    ),
    { name: 'FormWizardStore' }
  )
);

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

function validateApplicationData(data: ApplicationFormData): FormErrors {
  const errors: FormErrors = {};

  // Validate Application Type
  if (!data.applicationType) {
    errors.application_type = { applicationType: 'Please select an application type' };
  }
  if (!data.targetCountry) {
    errors.application_type = { 
      ...errors.application_type, 
      targetCountry: 'Please select a target country' 
    };
  }

  // Validate Personal Information
  const personalErrors: any = {};
  if (!data.personalInfo.firstName.trim()) {
    personalErrors.firstName = 'First name is required';
  }
  if (!data.personalInfo.lastName.trim()) {
    personalErrors.lastName = 'Last name is required';
  }
  if (!data.personalInfo.dateOfBirth) {
    personalErrors.dateOfBirth = 'Date of birth is required';
  }
  if (!data.personalInfo.email.trim() || !isValidEmail(data.personalInfo.email)) {
    personalErrors.email = 'Valid email address is required';
  }
  if (!data.personalInfo.phone.trim()) {
    personalErrors.phone = 'Phone number is required';
  }
  if (!data.personalInfo.passportNumber.trim()) {
    personalErrors.passportNumber = 'Passport number is required';
  }
  if (!data.personalInfo.passportExpiryDate) {
    personalErrors.passportExpiryDate = 'Passport expiry date is required';
  }

  // Validate address
  if (!data.personalInfo.address.street.trim()) {
    personalErrors.address = { ...personalErrors.address, street: 'Street address is required' };
  }
  if (!data.personalInfo.address.city.trim()) {
    personalErrors.address = { ...personalErrors.address, city: 'City is required' };
  }
  if (!data.personalInfo.address.country.trim()) {
    personalErrors.address = { ...personalErrors.address, country: 'Country is required' };
  }

  if (Object.keys(personalErrors).length > 0) {
    errors.personal_info = personalErrors;
  }

  // Validate Education (at least one required)
  if (data.education.length === 0) {
    errors.education = { 0: { institution: 'At least one education entry is required' } };
  } else {
    data.education.forEach((edu, index) => {
      const eduErrors: any = {};
      if (!edu.institution.trim()) eduErrors.institution = 'Institution is required';
      if (!edu.degree.trim()) eduErrors.degree = 'Degree is required';
      if (!edu.field.trim()) eduErrors.field = 'Field of study is required';
      if (!edu.country.trim()) eduErrors.country = 'Country is required';
      if (!edu.startDate) eduErrors.startDate = 'Start date is required';
      if (!edu.isCurrentlyEnrolled && !edu.endDate) {
        eduErrors.endDate = 'End date is required';
      }

      if (Object.keys(eduErrors).length > 0) {
        errors.education = { ...errors.education, [index]: eduErrors };
      }
    });
  }

  // Validate Experience (at least one recommended)
  data.experience.forEach((exp, index) => {
    const expErrors: any = {};
    if (!exp.employer.trim()) expErrors.employer = 'Employer is required';
    if (!exp.position.trim()) expErrors.position = 'Position is required';
    if (!exp.country.trim()) expErrors.country = 'Country is required';
    if (!exp.startDate) expErrors.startDate = 'Start date is required';
    if (!exp.isCurrent && !exp.endDate) {
      expErrors.endDate = 'End date is required';
    }
    if (exp.responsibilities.length === 0) {
      expErrors.responsibilities = 'At least one responsibility is required';
    }

    if (Object.keys(expErrors).length > 0) {
      errors.experience = { ...errors.experience, [index]: expErrors };
    }
  });

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function loadDraftFromStorage(): ApplicationFormData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const draft = localStorage.getItem('application-draft');
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error('Error loading draft from storage:', error);
    return null;
  }
}

export function clearDraftFromStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('application-draft');
}