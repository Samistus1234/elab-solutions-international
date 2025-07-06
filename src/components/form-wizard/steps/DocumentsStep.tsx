/**
 * Documents Step Component
 * 
 * Document requirements and upload interface
 */

'use client';

import { useState, useEffect } from 'react';
import { useFormWizardStore } from '@/lib/form-wizard/form-wizard-store';
import { useDocumentStore } from '@/lib/documents/document-store';
import { type DocumentErrors } from '@/types/form-wizard';
import { DocumentType } from '@/types/applications';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import { DocumentList } from '@/components/documents/DocumentList';
import { UserRole } from '@/types/business';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Upload,
  ExternalLink
} from 'lucide-react';

interface DocumentsStepProps {
  errors?: DocumentErrors;
}

// Document requirements based on application type
const getRequiredDocuments = (applicationType: string): DocumentType[] => {
  const baseDocuments = [DocumentType.INTERNATIONAL_PASSPORT];
  
  switch (applicationType) {
    case 'dataflow':
    case 'mumaris_plus':
      return [
        ...baseDocuments,
        DocumentType.EDUCATION_DOCUMENT,
        DocumentType.LICENSE_DOCUMENT,
        DocumentType.WORK_EXPERIENCE_DOCUMENT
      ];
    case 'sheryan':
      return [
        ...baseDocuments,
        DocumentType.EDUCATION_DOCUMENT,
        DocumentType.LICENSE_DOCUMENT
      ];
    case 'license_renewal':
      return [
        ...baseDocuments,
        DocumentType.LICENSE_DOCUMENT
      ];
    case 'exam_booking':
      return [
        ...baseDocuments,
        DocumentType.EDUCATION_DOCUMENT
      ];
    default:
      return baseDocuments;
  }
};

const getDocumentDisplayName = (documentType: DocumentType): string => {
  const names: Record<DocumentType, string> = {
    [DocumentType.INTERNATIONAL_PASSPORT]: 'International Passport',
    [DocumentType.EDUCATION_DOCUMENT]: 'Education Certificate',
    [DocumentType.LICENSE_DOCUMENT]: 'Professional License',
    [DocumentType.WORK_EXPERIENCE_DOCUMENT]: 'Work Experience Letter'
  };
  return names[documentType] || documentType;
};

export function DocumentsStep({ errors }: DocumentsStepProps) {
  const { applicationData, updateApplicationData } = useFormWizardStore();
  const { getDocumentsByApplication } = useDocumentStore();
  const [activeUploadType, setActiveUploadType] = useState<DocumentType | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<DocumentType, string[]>>({} as Record<DocumentType, string[]>);

  // Mock application ID - in real app this would come from the form wizard
  const applicationId = 'temp-app-id'; // TODO: Get from submitted application
  
  const requiredDocuments = getRequiredDocuments(applicationData.applicationType || '');

  useEffect(() => {
    // Update uploaded documents tracking
    const documents = getDocumentsByApplication(applicationId);
    const documentsByType: Record<DocumentType, string[]> = {} as any;
    
    documents.forEach(doc => {
      if (!documentsByType[doc.documentType]) {
        documentsByType[doc.documentType] = [];
      }
      documentsByType[doc.documentType].push(doc.id);
    });
    
    setUploadedDocuments(documentsByType);
  }, [applicationId, getDocumentsByApplication]);

  const handleUploadComplete = (documentType: DocumentType, documentIds: string[]) => {
    setUploadedDocuments(prev => ({
      ...prev,
      [documentType]: [...(prev[documentType] || []), ...documentIds]
    }));
    setActiveUploadType(null);
  };

  const getDocumentStatus = (documentType: DocumentType) => {
    const docs = uploadedDocuments[documentType] || [];
    if (docs.length === 0) return 'missing';
    return 'uploaded';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'missing':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Upload className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'missing':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const allRequiredDocumentsUploaded = requiredDocuments.every(
    docType => getDocumentStatus(docType) === 'uploaded'
  );

  return (
    <div className="space-y-8">
      {/* Step Description */}
      <div className="text-center">
        <FileText className="mx-auto h-12 w-12 text-primary-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Document Requirements
        </h3>
        <p className="text-gray-600">
          Upload the required documents for your {applicationData.applicationType} application.
        </p>
      </div>

      {/* Requirements Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Document Requirements</h4>
            <p className="text-sm text-blue-700 mb-3">
              Please ensure all documents are clear, high-quality scans or photos. 
              Documents should be current and not expired.
            </p>
            <div className="text-sm text-blue-600">
              <strong>Required documents for {applicationData.applicationType}:</strong>
              <ul className="mt-1 space-y-1">
                {requiredDocuments.map(docType => (
                  <li key={docType} className="flex items-center">
                    {getStatusIcon(getDocumentStatus(docType))}
                    <span className="ml-2">{getDocumentDisplayName(docType)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload Sections */}
      <div className="space-y-6">
        {requiredDocuments.map(documentType => {
          const status = getDocumentStatus(documentType);
          const isActive = activeUploadType === documentType;
          
          return (
            <div key={documentType} className="bg-white border border-gray-200 rounded-lg">
              {/* Document Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(status)}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {getDocumentDisplayName(documentType)}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
                          {status === 'uploaded' ? 'Uploaded' : 'Required'}
                        </span>
                        {uploadedDocuments[documentType] && (
                          <span className="text-sm text-gray-500">
                            {uploadedDocuments[documentType].length} file(s)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {status === 'uploaded' && (
                      <button
                        onClick={() => setActiveUploadType(isActive ? null : documentType)}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        {isActive ? 'Hide Upload' : 'Add More'}
                      </button>
                    )}
                    {status === 'missing' && (
                      <button
                        onClick={() => setActiveUploadType(documentType)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Upload Interface */}
              {(isActive || status === 'missing') && (
                <div className="p-6">
                  <DocumentUpload
                    applicationId={applicationId}
                    documentType={documentType}
                    maxFiles={3}
                    onUploadComplete={(documentIds) => handleUploadComplete(documentType, documentIds)}
                    onUploadError={(error) => console.error('Upload error:', error)}
                  />
                </div>
              )}
              
              {/* Uploaded Documents List */}
              {status === 'uploaded' && !isActive && (
                <div className="px-6 pb-6">
                  <DocumentList
                    applicationId={applicationId}
                    documentType={documentType}
                    userRole={UserRole.APPLICANT}
                    showActions={true}
                    compactView={true}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Upload Progress</h4>
            <p className="text-sm text-gray-600">
              {Object.values(uploadedDocuments).flat().length} of {requiredDocuments.length} required document types uploaded
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {allRequiredDocumentsUploaded ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-700">All Required Documents Uploaded</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-700">
                  {requiredDocuments.length - Object.keys(uploadedDocuments).length} document types remaining
                </span>
              </>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(Object.keys(uploadedDocuments).length / requiredDocuments.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Validation Errors */}
      {errors && Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-900 mb-2">Please fix the following issues:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}