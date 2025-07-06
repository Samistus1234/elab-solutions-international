/**
 * Document Upload Component
 * 
 * Drag & drop file upload with progress tracking and validation
 */

'use client';

import { useState, useRef, useCallback } from 'react';
import { useDocumentStore } from '@/lib/documents/document-store';
import { DocumentType } from '@/types/applications';
import { 
  validateDocumentFile, 
  formatFileSize, 
  getDocumentTypeDisplayName,
  DOCUMENT_TYPE_CONFIGS 
} from '@/types/documents';
import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  RotateCcw,
  Plus
} from 'lucide-react';

interface DocumentUploadProps {
  applicationId: string;
  documentType: DocumentType;
  maxFiles?: number;
  onUploadComplete?: (documentIds: string[]) => void;
  onUploadError?: (error: string) => void;
  className?: string;
}

interface FileWithPreview extends File {
  preview?: string;
  id: string;
  uploadProgress?: number;
  uploadStatus?: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export function DocumentUpload({
  applicationId,
  documentType,
  maxFiles = 5,
  onUploadComplete,
  onUploadError,
  className = ''
}: DocumentUploadProps) {
  const { uploadDocument, uploadMultipleDocuments, isUploading } = useDocumentStore();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const config = DOCUMENT_TYPE_CONFIGS[documentType];

  // ========================================================================
  // FILE HANDLING
  // ========================================================================

  const processFiles = useCallback((fileList: FileList | File[]) => {
    const newFiles: FileWithPreview[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach((file, index) => {
      // Check if we've reached max files
      if (files.length + newFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Validate file
      const validation = validateDocumentFile(file, documentType);
      if (!validation.valid) {
        errors.push(`${file.name}: ${validation.errors.join(', ')}`);
        return;
      }

      // Create file with preview
      const fileWithPreview: FileWithPreview = Object.assign(file, {
        id: `${Date.now()}-${index}`,
        uploadStatus: 'pending' as const,
        uploadProgress: 0
      });

      // Create preview for images
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }

      newFiles.push(fileWithPreview);
    });

    if (errors.length > 0) {
      onUploadError?.(errors.join(''));
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, [files.length, maxFiles, documentType, onUploadError]);

  // ========================================================================
  // DRAG & DROP HANDLERS
  // ========================================================================

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  // ========================================================================
  // UPLOAD ACTIONS
  // ========================================================================

  const uploadFiles = async () => {
    const pendingFiles = files.filter(f => f.uploadStatus === 'pending');
    if (pendingFiles.length === 0) return;

    try {
      const documentIds: string[] = [];

      for (const file of pendingFiles) {
        // Update file status
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, uploadStatus: 'uploading', uploadProgress: 0 }
            : f
        ));

        try {
          const documentId = await uploadDocument(file, applicationId, documentType);
          documentIds.push(documentId);

          // Update file status to completed
          setFiles(prev => prev.map(f => 
            f.id === file.id 
              ? { ...f, uploadStatus: 'completed', uploadProgress: 100 }
              : f
          ));
        } catch (error) {
          // Update file status to error
          setFiles(prev => prev.map(f => 
            f.id === file.id 
              ? { 
                  ...f, 
                  uploadStatus: 'error', 
                  error: error instanceof Error ? error.message : 'Upload failed' 
                }
              : f
          ));
        }
      }

      if (documentIds.length > 0) {
        onUploadComplete?.(documentIds);
      }
    } catch (error) {
      onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const retryUpload = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, uploadStatus: 'pending', error: undefined }
        : f
    ));
  };

  const clearAllFiles = () => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
  };

  // ========================================================================
  // UTILITY FUNCTIONS
  // ========================================================================

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-6 w-6" />;
    } else if (file.type === 'application/pdf') {
      return <FileText className="h-6 w-6" />;
    } else {
      return <File className="h-6 w-6" />;
    }
  };

  const getStatusIcon = (status: FileWithPreview['uploadStatus']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'uploading':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />;
      default:
        return null;
    }
  };

  const hasUploadableFiles = files.some(f => f.uploadStatus === 'pending');
  const hasCompletedFiles = files.some(f => f.uploadStatus === 'completed');

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg transition-colors
          ${dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${files.length >= maxFiles ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
          <Upload className={`h-12 w-12 mb-4 ${dragActive ? 'text-primary-500' : 'text-gray-400'}`} />
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload {getDocumentTypeDisplayName(documentType)}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4">
            {config.description}
          </p>

          <div className="space-y-2 text-xs text-gray-500 mb-4">
            <div>
              <strong>Accepted formats:</strong> {config.acceptedFormats.join(', ')}
            </div>
            <div>
              <strong>Maximum file size:</strong> {formatFileSize(config.maxFileSize)}
            </div>
            {config.maxPages && (
              <div>
                <strong>Maximum pages:</strong> {config.maxPages}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={files.length >= maxFiles}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Choose Files
            </button>
            
            <span className="text-sm text-gray-500">
              or drag and drop files here
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            {files.length}/{maxFiles} files selected
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={config.acceptedFormats.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Selected Files</h4>
            <button
              onClick={clearAllFiles}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white"
              >
                {/* File Icon/Preview */}
                <div className="flex-shrink-0">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded">
                      {getFileIcon(file)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(file.uploadStatus)}
                      
                      {file.uploadStatus === 'error' && (
                        <button
                          onClick={() => retryUpload(file.id)}
                          className="text-blue-600 hover:text-blue-700"
                          title="Retry upload"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-red-500"
                        title="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>

                  {/* Progress Bar */}
                  {file.uploadStatus === 'uploading' && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.uploadProgress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {file.uploadStatus === 'error' && file.error && (
                    <p className="text-xs text-red-600 mt-1">
                      {file.error}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Actions */}
      {files.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {hasCompletedFiles && (
              <span className="text-green-600">
                ✓ {files.filter(f => f.uploadStatus === 'completed').length} uploaded
              </span>
            )}
          </div>

          <div className="flex space-x-3">
            {hasUploadableFiles && (
              <button
                onClick={uploadFiles}
                disabled={isUploading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}