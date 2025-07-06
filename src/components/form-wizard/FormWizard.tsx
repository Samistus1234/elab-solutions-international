/**
 * Form Wizard Component
 * 
 * Main container for the multi-step application creation form
 */

'use client';

import { useEffect } from 'react';
import { useFormWizardStore } from '@/lib/form-wizard/form-wizard-store';
import { FormStep, FORM_STEP_ORDER, FORM_STEP_TITLES } from '@/types/form-wizard';
import { FormWizardHeader } from './FormWizardHeader';
import { FormWizardNavigation } from './FormWizardNavigation';
import { FormWizardStep } from './FormWizardStep';
import { FormWizardFooter } from './FormWizardFooter';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface FormWizardProps {
  onComplete?: (applicationId: string) => void;
  onCancel?: () => void;
}

export function FormWizard({ onComplete, onCancel }: FormWizardProps) {
  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    completedSteps,
    errors,
    isSubmitting,
    isDraft,
    isStepCompleted,
    getStepValidationErrors
  } = useFormWizardStore();

  // Load draft on mount if available
  useEffect(() => {
    // This could load a draft from localStorage or API
    console.log('Form wizard mounted');
  }, []);

  const getStepStatus = (step: FormStep) => {
    if (isStepCompleted(step)) {
      return 'completed';
    }
    if (step === currentStep) {
      return 'current';
    }
    if (getStepValidationErrors(step).length > 0) {
      return 'error';
    }
    return 'pending';
  };

  const getStepIcon = (step: FormStep) => {
    const status = getStepStatus(step);
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return (
          <div className={`
            h-5 w-5 rounded-full border-2 flex items-center justify-center text-xs font-medium
            ${status === 'current' 
              ? 'border-primary-500 bg-primary-500 text-white' 
              : 'border-gray-300 bg-white text-gray-500'
            }
          `}>
            {FORM_STEP_ORDER.indexOf(step) + 1}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div data-testid="form-wizard-header">
        <FormWizardHeader 
          isDraft={isDraft}
          onCancel={onCancel}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Navigation */}
        <div className="mb-8" data-testid="step-indicator">
          <div data-testid="step-navigation">
            <FormWizardNavigation 
              steps={FORM_STEP_ORDER}
              currentStep={currentStep}
              getStepIcon={getStepIcon}
              getStepStatus={getStepStatus}
            />
          </div>
        </div>

        {/* Main Form Content */}
        <div className="bg-white rounded-lg shadow-lg">
          {/* Step Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {FORM_STEP_TITLES[currentStep]}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Step {currentStepIndex + 1} of {totalSteps}
                </p>
              </div>
              
              {/* Step Status Indicator */}
              <div className="flex items-center space-x-2">
                {getStepValidationErrors(currentStep).length > 0 && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    {getStepValidationErrors(currentStep).length} error(s)
                  </span>
                )}
                {isStepCompleted(currentStep) && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Completed
                  </span>
                )}
                {isDraft && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Draft Saved
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="px-6 py-6">
            <FormWizardStep 
              step={currentStep}
              errors={errors[currentStep]}
            />
          </div>

          {/* Footer with Navigation */}
          <FormWizardFooter 
            onComplete={onComplete}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Your progress is automatically saved as you complete each step.{' '}
            <button className="text-primary-600 hover:text-primary-700 underline">
              Need help?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}