/**
 * Document Preview Component
 * 
 * Displays document previews with viewer capabilities
 */

'use client';

import { useState } from 'react';
import { DocumentUpload, DocumentAnnotation, AnnotationType } from '@/types/documents';
import { 
  Eye, 
  Download, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  FileText,
  Image as ImageIcon,
  File,
  X,
  MessageSquare,
  Flag,
  CheckCircle
} from 'lucide-react';

interface DocumentPreviewProps {
  document: DocumentUpload;
  readonly?: boolean;
  showAnnotations?: boolean;
  onAnnotationAdd?: (annotation: Omit<DocumentAnnotation, 'id' | 'createdAt'>) => void;
  onDownload?: () => void;
  className?: string;
}

export function DocumentPreview({
  document,
  readonly = false,
  showAnnotations = false,
  onAnnotationAdd,
  onDownload,
  className = ''
}: DocumentPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [annotations, setAnnotations] = useState<DocumentAnnotation[]>([]);
  const [selectedAnnotationType, setSelectedAnnotationType] = useState<AnnotationType>(AnnotationType.NOTE);

  // ========================================================================
  // UTILITY FUNCTIONS
  // ========================================================================

  const getFileIcon = () => {
    if (document.mimeType.startsWith('image/')) {
      return <ImageIcon className="h-8 w-8" />;
    } else if (document.mimeType === 'application/pdf') {
      return <FileText className="h-8 w-8" />;
    } else {
      return <File className="h-8 w-8" />;
    }
  };

  const canPreview = () => {
    return document.mimeType.startsWith('image/') || document.mimeType === 'application/pdf';
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  // ========================================================================
  // VIEWER CONTROLS
  // ========================================================================

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleFullscreen = () => setIsFullscreen(!isFullscreen);

  // ========================================================================
  // ANNOTATION HANDLING
  // ========================================================================

  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (readonly || !onAnnotationAdd) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const annotation: Omit<DocumentAnnotation, 'id' | 'createdAt'> = {
      documentId: document.id,
      type: selectedAnnotationType,
      page: 1, // For simplicity, assuming single page for now
      coordinates: { x, y, width: 2, height: 2 },
      content: '',
      authorId: 'current-user-id',
      authorName: 'Current User',
      updatedAt: new Date().toISOString(),
      isResolved: false
    };

    onAnnotationAdd?.(annotation);
  };

  // ========================================================================
  // RENDER METHODS
  // ========================================================================

  const renderPreviewContent = () => {
    if (!canPreview()) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
          {getFileIcon()}
          <p className="mt-4 text-sm text-gray-600">
            Preview not available for this file type
          </p>
          <button
            onClick={onDownload}
            className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Download to View
          </button>
        </div>
      );
    }

    if (document.mimeType.startsWith('image/')) {
      return (
        <div 
          className="relative overflow-hidden bg-gray-100 rounded-lg cursor-crosshair"
          onClick={handleCanvasClick}
          style={{ minHeight: '400px' }}
        >
          <img
            src={document.uploadUrl || document.thumbnailUrl}
            alt={document.originalName}
            className="w-full h-auto transition-transform"
            style={{ 
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center'
            }}
          />
          
          {/* Render annotations */}
          {showAnnotations && annotations.map((annotation) => (
            <div
              key={annotation.id}
              className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-50 rounded cursor-pointer"
              style={{
                left: `${annotation.coordinates.x}%`,
                top: `${annotation.coordinates.y}%`,
                width: `${annotation.coordinates.width}%`,
                height: `${annotation.coordinates.height}%`
              }}
              title={annotation.content}
            >
              <div className="text-xs bg-blue-500 text-white px-1 rounded">
                {annotation.type}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // PDF preview (placeholder - would need PDF.js or similar)
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg">
        <FileText className="h-16 w-16 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">PDF Document</p>
        <p className="text-sm text-gray-600 mb-4">
          {document.metadata.pages} page{document.metadata.pages !== 1 ? 's' : ''}
        </p>
        <button
          onClick={onDownload}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </button>
      </div>
    );
  };

  const renderAnnotationToolbar = () => {
    if (readonly) return null;

    return (
      <div className="flex items-center space-x-2 p-2 bg-gray-50 border-t">
        <span className="text-sm font-medium text-gray-700">Add annotation:</span>
        {Object.values(AnnotationType).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedAnnotationType(type)}
            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
              selectedAnnotationType === type
                ? 'bg-primary-100 text-primary-800 border border-primary-200'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {type === AnnotationType.NOTE && <MessageSquare className="h-3 w-3 mr-1" />}
            {type === AnnotationType.ISSUE && <Flag className="h-3 w-3 mr-1" />}
            {type === AnnotationType.APPROVAL && <CheckCircle className="h-3 w-3 mr-1" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    );
  };

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  const containerClasses = isFullscreen 
    ? 'fixed inset-0 z-50 bg-white' 
    : `bg-white rounded-lg shadow ${className}`;

  return (
    <div className={containerClasses}>
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {getFileIcon()}
          <div>
            <h3 className="text-lg font-medium text-gray-900 truncate max-w-xs">
              {document.originalName}
            </h3>
            <p className="text-sm text-gray-500">
              {formatFileSize(document.fileSize)} • {document.mimeType}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {canPreview() && (
            <>
              <button
                onClick={handleZoomOut}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              
              <span className="text-sm text-gray-600 min-w-[3rem] text-center">
                {zoom}%
              </span>
              
              <button
                onClick={handleZoomIn}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              <button
                onClick={handleRotate}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Rotate"
              >
                <RotateCw className="h-4 w-4" />
              </button>

              <button
                onClick={handleFullscreen}
                className="p-2 text-gray-400 hover:text-gray-600"
                title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </>
          )}

          <button
            onClick={onDownload}
            className="p-2 text-gray-400 hover:text-gray-600"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 p-4">
        {renderPreviewContent()}
      </div>

      {/* Annotation toolbar */}
      {showAnnotations && renderAnnotationToolbar()}
    </div>
  );
}