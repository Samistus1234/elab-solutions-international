/**
 * Form Wizard Header Component
 * 
 * Header with branding, save status, and cancel option
 */

'use client';

import { useState } from 'react';
import { useFormWizardStore } from '@/lib/form-wizard/form-wizard-store';
import { Save, X, AlertTriangle } from 'lucide-react';

interface FormWizardHeaderProps {
  isDraft: boolean;
  onCancel?: () => void;
}

export function FormWizardHeader({ isDraft, onCancel }: FormWizardHeaderProps) {
  const { saveDraft } = useFormWizardStore();
  const [isSaving, setIsSaving] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await saveDraft();
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isDraft) {
      setShowCancelConfirm(true);
    } else {
      onCancel?.();
    }
  };

  const confirmCancel = () => {
    setShowCancelConfirm(false);
    onCancel?.();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-primary-600">ELAB</span>
              </div>
              <div className="ml-4">
                <h1 className="text-lg font-medium text-gray-900">
                  New Application
                </h1>
                <p className="text-sm text-gray-500">
                  Complete the form to submit your application
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Save Draft Button */}
              <button
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>

              {/* Draft Status */}
              {isDraft && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Draft Saved
                </span>
              )}

              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">
                Cancel Application?
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  You have unsaved changes. Are you sure you want to cancel? Your draft will be lost.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={confirmCancel}
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-20 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Keep Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}