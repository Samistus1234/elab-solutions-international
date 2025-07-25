/**
 * Form Wizard Navigation Component
 * 
 * Progress indicators and step navigation
 */

'use client';

import { useFormWizardStore } from '@/lib/form-wizard/form-wizard-store';
import { FormStep, FORM_STEP_TITLES } from '@/types/form-wizard';

interface FormWizardNavigationProps {
  steps: FormStep[];
  currentStep: FormStep;
  getStepIcon: (step: FormStep) => React.ReactNode;
  getStepStatus: (step: FormStep) => 'completed' | 'current' | 'error' | 'pending';
}

export function FormWizardNavigation({ 
  steps, 
  currentStep, 
  getStepIcon, 
  getStepStatus 
}: FormWizardNavigationProps) {
  const { setCurrentStep, isStepCompleted } = useFormWizardStore();

  const handleStepClick = (step: FormStep) => {
    // Allow navigation to completed steps or current step
    if (isStepCompleted(step) || step === currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, stepIndex) => {
          const status = getStepStatus(step);
          const isClickable = isStepCompleted(step) || step === currentStep;
          
          return (
            <li key={step} className={`relative ${stepIndex !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
              {/* Connecting Line */}
              {stepIndex !== steps.length - 1 && (
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className={`h-0.5 w-full ${
                    isStepCompleted(step) ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                </div>
              )}

              {/* Step Button */}
              <button
                onClick={() => handleStepClick(step)}
                disabled={!isClickable}                data-testid={`step-${stepIndex + 1}`}
                className={`
                  relative w-10 h-10 flex items-center justify-center rounded-full border-2 
                  transition-colors duration-200
                  ${isClickable 
                    ? 'cursor-pointer hover:border-primary-400' 
                    : 'cursor-not-allowed'
                  }
                  ${status === 'completed' 
                    ? 'bg-primary-600 border-primary-600' 
                    : status === 'current'
                    ? 'border-primary-600 bg-white active'
                    : status === 'error'
                    ? 'border-red-500 bg-white'
                    : 'border-gray-300 bg-white'
                  }
                `}
                aria-current={step === currentStep ? 'step' : undefined}
              >
                <span className="sr-only">{FORM_STEP_TITLES[step]}</span>
                {getStepIcon(step)}
              </button>

              {/* Step Label */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-32 text-center">
                <p className={`
                  text-xs font-medium
                  ${status === 'current' 
                    ? 'text-primary-600' 
                    : status === 'completed'
                    ? 'text-gray-900'
                    : status === 'error'
                    ? 'text-red-600'
                    : 'text-gray-500'
                  }
                `}>
                  {FORM_STEP_TITLES[step]}
                </p>
                
                {/* Status Indicator */}
                {status === 'error' && (
                  <p className="text-xs text-red-500 mt-1">
                    Needs attention
                  </p>
                )}
                {status === 'completed' && (
                  <p className="text-xs text-green-600 mt-1">
                    Complete
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}