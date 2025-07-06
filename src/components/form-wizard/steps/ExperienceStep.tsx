/**
 * Experience Step Component
 * 
 * Work experience and professional background form
 */

'use client';

import { useFormWizardStore } from '@/lib/form-wizard/form-wizard-store';
import { type ExperienceErrors } from '@/types/form-wizard';
import { Briefcase, Plus, Trash2, Calendar, MapPin } from 'lucide-react';

interface ExperienceStepProps {
  errors?: ExperienceErrors;
}

export function ExperienceStep({ errors }: ExperienceStepProps) {
  const { applicationData, updateApplicationData } = useFormWizardStore();

  return (
    <div className="space-y-8">
      {/* Step Description */}
      <div className="text-center">
        <Briefcase className="mx-auto h-12 w-12 text-primary-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Work Experience
        </h3>
        <p className="text-gray-600">
          Detail your professional work experience and employment history.
        </p>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h4 className="font-medium text-green-900 mb-2">Experience Form Coming Soon</h4>
        <p className="text-green-700 text-sm">
          This step will include comprehensive work experience forms with employer details, 
          job responsibilities, and professional references.
        </p>
        <div className="mt-4 text-xs text-green-600">
          Features will include:
          <ul className="mt-2 space-y-1">
            <li>• Multiple work experience entries</li>
            <li>• Employer verification details</li>
            <li>• Job responsibilities and achievements</li>
            <li>• Professional references and contacts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}