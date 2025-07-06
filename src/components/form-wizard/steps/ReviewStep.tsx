/**
 * Review Step Component
 * 
 * Final review and submission of the application
 */

'use client';

import { useFormWizardStore } from '@/lib/form-wizard/form-wizard-store';
import { type ReviewErrors, APPLICATION_TYPE_CONFIGS } from '@/types/form-wizard';
import { Eye, CheckCircle, AlertCircle, User, GraduationCap, Briefcase, FileText } from 'lucide-react';

interface ReviewStepProps {
  errors?: ReviewErrors;
}

export function ReviewStep({ errors }: ReviewStepProps) {
  const { applicationData, setCurrentStep } = useFormWizardStore();

  const selectedConfig = APPLICATION_TYPE_CONFIGS.find(
    config => config.type === applicationData.applicationType
  );

  const getSectionStatus = (hasData: boolean, hasErrors: boolean = false) => {
    if (hasErrors) return { icon: AlertCircle, color: 'text-red-500', status: 'Needs attention' };
    if (hasData) return { icon: CheckCircle, color: 'text-green-500', status: 'Complete' };
    return { icon: AlertCircle, color: 'text-yellow-500', status: 'Incomplete' };
  };

  const personalInfoComplete = !!(
    applicationData.personalInfo.firstName &&
    applicationData.personalInfo.lastName &&
    applicationData.personalInfo.email &&
    applicationData.personalInfo.phone
  );

  const educationComplete = applicationData.education.length > 0;
  const experienceComplete = applicationData.experience.length > 0;

  return (
    <div className="space-y-8">
      {/* Step Description */}
      <div className="text-center">
        <Eye className="mx-auto h-12 w-12 text-primary-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Review & Submit
        </h3>
        <p className="text-gray-600">
          Please review all information before submitting your application.
        </p>
      </div>

      {/* Application Summary */}
      {selectedConfig && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-medium text-blue-900 mb-4">Application Summary</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700 font-medium">Service Type:</span>
              <span className="text-blue-900 ml-2">{selectedConfig.name}</span>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Target Country:</span>
              <span className="text-blue-900 ml-2">{applicationData.targetCountry}</span>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Processing Priority:</span>
              <span className="text-blue-900 ml-2 capitalize">{applicationData.urgency}</span>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Estimated Duration:</span>
              <span className="text-blue-900 ml-2">{selectedConfig.estimatedDuration}</span>
            </div>
          </div>
        </div>
      )}

      {/* Section Status Overview */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Application Sections</h4>
        
        {/* Personal Information */}
        <div 
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => setCurrentStep('personal_info' as any)}
        >
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h5 className="font-medium text-gray-900">Personal Information</h5>
              <p className="text-sm text-gray-600">
                {applicationData.personalInfo.firstName} {applicationData.personalInfo.lastName}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {(() => {
              const status = getSectionStatus(personalInfoComplete);
              return (
                <>
                  <span className={`text-sm mr-2 ${status.color}`}>{status.status}</span>
                  <status.icon className={`h-5 w-5 ${status.color}`} />
                </>
              );
            })()}
          </div>
        </div>

        {/* Education */}
        <div 
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => setCurrentStep('education' as any)}
        >
          <div className="flex items-center">
            <GraduationCap className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h5 className="font-medium text-gray-900">Education Background</h5>
              <p className="text-sm text-gray-600">
                {educationComplete ? `${applicationData.education.length} education entries` : 'No education added'}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {(() => {
              const status = getSectionStatus(educationComplete);
              return (
                <>
                  <span className={`text-sm mr-2 ${status.color}`}>{status.status}</span>
                  <status.icon className={`h-5 w-5 ${status.color}`} />
                </>
              );
            })()}
          </div>
        </div>

        {/* Experience */}
        <div 
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => setCurrentStep('experience' as any)}
        >
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h5 className="font-medium text-gray-900">Work Experience</h5>
              <p className="text-sm text-gray-600">
                {experienceComplete ? `${applicationData.experience.length} work experience entries` : 'No experience added'}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {(() => {
              const status = getSectionStatus(experienceComplete);
              return (
                <>
                  <span className={`text-sm mr-2 ${status.color}`}>{status.status}</span>
                  <status.icon className={`h-5 w-5 ${status.color}`} />
                </>
              );
            })()}
          </div>
        </div>

        {/* Documents */}
        <div 
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => setCurrentStep('documents' as any)}
        >
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h5 className="font-medium text-gray-900">Documents</h5>
              <p className="text-sm text-gray-600">
                Document upload requirements
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2 text-yellow-500">Pending</span>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Terms and Conditions</h4>
        <div className="space-y-3 text-sm text-gray-600">
          <label className="flex items-start">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2">
              I confirm that all information provided is accurate and complete to the best of my knowledge.
            </span>
          </label>
          <label className="flex items-start">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2">
              I understand that providing false or misleading information may result in application rejection.
            </span>
          </label>
          <label className="flex items-start">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                Privacy Policy
              </a>.
            </span>
          </label>
        </div>
      </div>

      {/* Submission Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
          <div>
            <h5 className="font-medium text-yellow-800">Before You Submit</h5>
            <p className="text-sm text-yellow-700 mt-1">
              Please ensure all required sections are complete and all information is accurate. 
              Once submitted, some information cannot be changed without contacting support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}