/**
 * Form Wizard Footer Component
 * 
 * Navigation buttons and form actions
 */

'use client';

import { useFormWizardStore } from '@/lib/form-wizard/form-wizard-store';
import { FormStep } from '@/types/form-wizard';
import { ChevronLeft, ChevronRight, Send, Save } from 'lucide-react';

interface FormWizardFooterProps {
  onComplete?: (applicationId: string) => void;
  isSubmitting: boolean;
}

export function FormWizardFooter({ onComplete, isSubmitting }: FormWizardFooterProps) {
  const {
    currentStep,
    canGoNext,
    canGoPrevious,
    goToNextStep,
    goToPreviousStep,
    submitApplication,
    saveDraft,
    getStepValidationErrors
  } = useFormWizardStore();

  const isReviewStep = currentStep === FormStep.REVIEW;
  const hasStepErrors = getStepValidationErrors(currentStep).length > 0;

  const handleNext = () => {
    if (!hasStepErrors) {
      goToNextStep();
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await submitApplication();
      if (result.success) {
        onComplete?.(result.applicationId);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      // Error handling is done in the store
    }
  };

  const handleSaveDraft = async () => {
    try {
      await saveDraft();
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <div>
          {canGoPrevious ? (
            <button
              onClick={goToPreviousStep}
              data-testid="back-button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
          ) : (
            <div /> // Empty div for spacing
          )}
        </div>

        {/* Center Actions */}
        <div className="flex items-center space-x-3">
          {/* Validation Errors */}
          {hasStepErrors && (
            <span className="text-sm text-red-600">
              Please fix {getStepValidationErrors(currentStep).length} error(s) before proceeding
            </span>
          )}

          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </button>
        </div>

        {/* Next/Submit Button */}
        <div>
          {isReviewStep ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || hasStepErrors}
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          ) : canGoNext ? (
            <button
              onClick={handleNext}
              disabled={hasStepErrors}
              data-testid="next-button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Progress Information */}
      <div className="mt-4 flex items-center justify-center">
        <p className="text-xs text-gray-500">
          All information is automatically saved as you progress through the form
        </p>
      </div>
    </div>
  );
}