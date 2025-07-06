/**
 * Form Wizard Step Component
 * 
 * Renders the appropriate step component based on current step
 */

'use client';

import { FormStep } from '@/types/form-wizard';
import { ApplicationTypeStep } from './steps/ApplicationTypeStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { EducationStep } from './steps/EducationStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { DocumentsStep } from './steps/DocumentsStep';
import { ReviewStep } from './steps/ReviewStep';

interface FormWizardStepProps {
  step: FormStep;
  errors?: any;
}

export function FormWizardStep({ step, errors }: FormWizardStepProps) {
  switch (step) {
    case FormStep.APPLICATION_TYPE:
      return <ApplicationTypeStep errors={errors} />;
    
    case FormStep.PERSONAL_INFO:
      return <PersonalInfoStep errors={errors} />;
    
    case FormStep.EDUCATION:
      return <EducationStep errors={errors} />;
    
    case FormStep.EXPERIENCE:
      return <ExperienceStep errors={errors} />;
    
    case FormStep.DOCUMENTS:
      return <DocumentsStep errors={errors} />;
    
    case FormStep.REVIEW:
      return <ReviewStep errors={errors} />;
    
    default:
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Step Not Found
          </h3>
          <p className="text-gray-600">
            The requested form step could not be found.
          </p>
        </div>
      );
  }
}