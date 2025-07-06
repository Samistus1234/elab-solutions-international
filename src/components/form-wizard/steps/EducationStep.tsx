/**
 * Education Step Component
 * 
 * Educational background and qualifications form
 */

'use client';

import { useFormWizardStore } from '@/lib/form-wizard/form-wizard-store';
import { type EducationErrors } from '@/types/form-wizard';
import { GraduationCap, Plus, Trash2, Calendar, MapPin } from 'lucide-react';

interface EducationStepProps {
  errors?: EducationErrors;
}

export function EducationStep({ errors }: EducationStepProps) {
  const { applicationData, updateApplicationData } = useFormWizardStore();

  return (
    <div className="space-y-8">
      {/* Step Description */}
      <div className="text-center">
        <GraduationCap className="mx-auto h-12 w-12 text-primary-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Education Background
        </h3>
        <p className="text-gray-600">
          Add your educational qualifications and academic background.
        </p>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h4 className="font-medium text-blue-900 mb-2">Education Form Coming Soon</h4>
        <p className="text-blue-700 text-sm">
          This step will include comprehensive education forms with institution details, 
          degree information, and document upload capabilities.
        </p>
        <div className="mt-4 text-xs text-blue-600">
          Features will include:
          <ul className="mt-2 space-y-1">
            <li>• Multiple education entries</li>
            <li>• Institution verification</li>
            <li>• Degree and transcript details</li>
            <li>• GPA and honors information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}