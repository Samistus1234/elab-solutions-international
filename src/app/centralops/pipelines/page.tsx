'use client';

import { usePipelineStore } from '@/lib/stores/pipeline-store';
import { useState } from 'react';

export default function PipelinePage() {
  const { applicantPipelines } = usePipelineStore();
  const applicants = Object.values(applicantPipelines);

  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);

  // Upload states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Interview states
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [interviewType, setInterviewType] = useState('dataflow');

  // Payment states
  const [selectedService, setSelectedService] = useState('credentialing');
  const [paymentAmount, setPaymentAmount] = useState(750);

  // Handler functions
  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    setIsUploading(false);
    alert('Files uploaded successfully!');
    setShowUploadModal(false);
    setSelectedFiles([]);
    setUploadProgress(0);
  };

  const handleScheduleInterview = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
    alert(`Interview scheduled for ${selectedDate} at ${selectedTime}`);
    setShowInterviewModal(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handlePayment = () => {
    alert(`Processing payment of $${paymentAmount} for ${selectedService}`);
    setShowPaymentModal(false);
  };

  const handleExportCalendar = () => {
    const events = [
      'Document Deadline - Sep 8, 2024',
      'Interview Scheduling - Sep 10, 2024', 
      'Payment Due - Sep 15, 2024'
    ];
    
    const calendarData = events.join('\n');
    const blob = new Blob([calendarData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'elab-deadlines.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStageColor = (stage: string) => {
    const colors = {
      'inquiry': 'bg-blue-500',
      'documents_submitted': 'bg-yellow-500',  
      'qc_passed': 'bg-orange-500',
      'application_submitted': 'bg-purple-500',
      'authority_processing': 'bg-purple-600',
      'insufficiency': 'bg-red-500',
      'additional_docs_required': 'bg-orange-600',
      'interview_scheduled': 'bg-indigo-500',
      'exam_scheduled': 'bg-indigo-600',
      'results_received': 'bg-pink-500',
      'completed': 'bg-green-500',
      'cancelled': 'bg-gray-600',
      'on_hold': 'bg-red-500'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-400';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              👤 My Service Applications
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, <strong>Dr. Ahmed Al-Mansouri</strong> - Track your service applications progress
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Account ID</div>
            <div className="font-mono text-gray-700">APPLICANT-MAIN</div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-6">
          <strong>📊 Your Applications:</strong> {applicants.length} services in progress
        </div>

        {/* Next Actions & Urgent Tasks */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-red-500 text-white p-2 rounded-full mr-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-900">⚡ Urgent Actions Required</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start bg-white p-4 rounded-lg border border-red-200">
              <div className="bg-red-100 text-red-600 p-2 rounded-full mr-4 mt-1">
                📄
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-red-900">Upload Missing Documents</h4>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Due in 2 days</span>
                </div>
                <p className="text-red-700 text-sm mt-1">DHA License: Experience letter from previous employer required</p>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                >
                  Upload Now
                </button>
              </div>
            </div>
            <div className="flex items-start bg-white p-4 rounded-lg border border-orange-200">
              <div className="bg-orange-100 text-orange-600 p-2 rounded-full mr-4 mt-1">
                📅
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-orange-900">Schedule DataFlow Interview</h4>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Due in 5 days</span>
                </div>
                <p className="text-orange-700 text-sm mt-1">Authority processing complete - schedule your verification interview</p>
                <button 
                  onClick={() => setShowInterviewModal(true)}
                  className="mt-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
            <div className="flex items-start bg-white p-4 rounded-lg border border-yellow-200">
              <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full mr-4 mt-1">
                💰
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-yellow-900">Payment Due</h4>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Due Sep 15</span>
                </div>
                <p className="text-yellow-700 text-sm mt-1">Credentialing service: $750 balance remaining</p>
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {applicants.map((applicant) => {
          const progress = applicant.progressPercentage;
          const stageColor = getStageColor(applicant.currentStage);
          
          return (
            <div key={applicant.id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {applicant.serviceName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Ref: {applicant.referenceNumber}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                  applicant.priority === 'high' ? 'bg-red-500' : 
                  applicant.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  {applicant.priority.toUpperCase()}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Service Type:</p>
                  <p className="text-sm text-gray-900">{applicant.pipelineType.replace(/_/g, ' ').toUpperCase()}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Current Stage:</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${stageColor}`}>
                    {applicant.currentStage.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Consultant:</p>
                  <p className="text-sm text-gray-900">{applicant.assignedConsultant}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Progress:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{progress}% Complete</p>
                </div>

                {applicant.estimatedCompletion && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Expected Completion:</p>
                    <p className="text-sm text-gray-900">{applicant.estimatedCompletion}</p>
                  </div>
                )}
                
                {applicant.currentStage === 'completed' && applicant.actualCompletion && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">✅ Completed:</p>
                    <p className="text-sm text-green-600 font-medium">{applicant.actualCompletion}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(applicant.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Document Management Hub */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center mb-6">
          <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">📁 Document Management</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Core Documents */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 mb-3">📄 Core Documents</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <span className="text-green-600 mr-3">✅</span>
                  <span className="font-medium">Passport Copy</span>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <span className="text-green-600 mr-3">✅</span>
                  <span className="font-medium">Medical License</span>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center">
                  <span className="text-yellow-600 mr-3">⏳</span>
                  <span className="font-medium">University Transcripts</span>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Under Review</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <span className="text-red-600 mr-3">❌</span>
                  <span className="font-medium">Experience Letter</span>
                </div>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Missing</span>
              </div>
            </div>
          </div>

          {/* Service-Specific Documents */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 mb-3">🎯 Service Documents</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-900">DataFlow Verification</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">4/5 Complete</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>Primary Source Documents</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-red-600 mr-2">❌</span>
                    <span>Authority Response Form</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-purple-900">DHA License</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">2/6 Complete</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>Application Form</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-red-600 mr-2">❌</span>
                    <span>Good Standing Certificate</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Credentialing</span>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">3/4 Complete</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>CV & Portfolio</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-yellow-600 mr-2">⏳</span>
                    <span>Reference Letters (Under Review)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">📤 Quick Upload</h4>
              <p className="text-blue-700 text-sm mt-1">Upload missing documents to speed up your applications</p>
            </div>
            <button 
              onClick={() => setShowDocumentsModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Manage Documents
            </button>
          </div>
        </div>
      </div>

      {/* Service Dependencies & Flow */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center mb-6">
          <div className="bg-purple-500 text-white p-2 rounded-full mr-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">🔗 Service Dependencies</h3>
        </div>

        <div className="space-y-6">
          {/* Critical Path */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-3 flex items-center">
              <span className="mr-2">🚨</span>
              Critical Path - Action Required
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="bg-red-500 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center text-xs font-bold">
                    DF
                  </div>
                  <p className="text-xs mt-1">DataFlow</p>
                  <p className="text-xs text-red-600">75%</p>
                </div>
                <div className="flex-1 h-0.5 bg-red-300 relative">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <span className="text-red-600">→</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-400 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center text-xs font-bold">
                    DHA
                  </div>
                  <p className="text-xs mt-1">DHA License</p>
                  <p className="text-xs text-gray-600">Blocked</p>
                </div>
              </div>
              <div className="ml-4 text-sm text-red-700">
                <strong>⚠️ Blocking:</strong> DHA License requires DataFlow completion
              </div>
            </div>
          </div>

          {/* Independent Services */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3 flex items-center">
              <span className="mr-2">✅</span>
              Independent Services - Proceeding
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <div className="bg-green-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold">
                    CR
                  </div>
                  <p className="text-xs mt-1">Credentialing</p>
                  <p className="text-xs text-green-600">40%</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-800">Can proceed independently</p>
                  <p className="text-xs text-green-600">No dependencies blocking</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <div className="bg-gray-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold">
                    MP
                  </div>
                  <p className="text-xs mt-1">Mumaris</p>
                  <p className="text-xs text-gray-600">10%</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">Initial inquiry stage</p>
                  <p className="text-xs text-gray-600">Awaiting response</p>
                </div>
              </div>
            </div>
          </div>

          {/* Completed Services */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <span className="mr-2">🎉</span>
              Completed Services
            </h4>
            <div className="flex items-center space-x-3">
              <div className="text-center">
                <div className="bg-blue-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold">
                  LR
                </div>
                <p className="text-xs mt-1">License Renewal</p>
                <p className="text-xs text-green-600">100% ✓</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-800">Successfully completed Aug 20, 2024</p>
                <p className="text-xs text-blue-600">Can be used for future applications</p>
              </div>
            </div>
          </div>

          {/* Service Flow Timeline */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">📅 Recommended Service Flow</h4>
            <div className="flex items-center justify-between text-sm">
              <div className="text-center">
                <div className="bg-green-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold mb-1">1</div>
                <p className="text-xs">Complete DataFlow</p>
                <p className="text-xs text-gray-500">(Priority)</p>
              </div>
              <span className="text-gray-400">→</span>
              <div className="text-center">
                <div className="bg-yellow-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold mb-1">2</div>
                <p className="text-xs">Start DHA License</p>
                <p className="text-xs text-gray-500">(Next step)</p>
              </div>
              <span className="text-gray-400">→</span>
              <div className="text-center">
                <div className="bg-blue-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold mb-1">3</div>
                <p className="text-xs">Parallel Services</p>
                <p className="text-xs text-gray-500">(Credentialing, etc.)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Center & Financial Dashboard */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* Communication Center */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 text-white p-2 rounded-full mr-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">💬 Recent Communications</h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-blue-900">Ahmed Hassan</span>
                    <span className="text-xs text-blue-600 ml-2">Consultant</span>
                  </div>
                  <p className="text-sm text-blue-800">Your DataFlow verification is almost complete. Please schedule your interview by Sept 10th.</p>
                  <p className="text-xs text-blue-600 mt-1">2 hours ago</p>
                </div>
                <div className="bg-blue-500 w-2 h-2 rounded-full ml-2 mt-2"></div>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-yellow-900">DHA Authority</span>
                    <span className="text-xs text-yellow-600 ml-2">System</span>
                  </div>
                  <p className="text-sm text-yellow-800">Additional documentation required for license application. Check your email for details.</p>
                  <p className="text-xs text-yellow-600 mt-1">1 day ago</p>
                </div>
                <div className="bg-yellow-500 w-2 h-2 rounded-full ml-2 mt-2"></div>
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-green-900">ELAB System</span>
                    <span className="text-xs text-green-600 ml-2">Notification</span>
                  </div>
                  <p className="text-sm text-green-800">License renewal completed successfully! Certificate available for download.</p>
                  <p className="text-xs text-green-600 mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowMessagesModal(true)}
            className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            View All Messages
          </button>
        </div>

        {/* Financial Dashboard */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-500 text-white p-2 rounded-full mr-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">💰 Financial Overview</h3>
          </div>

          <div className="space-y-4">
            {/* Outstanding Balance */}
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-red-900">Outstanding Balance</span>
                <span className="text-lg font-bold text-red-700">$1,250</span>
              </div>
              <div className="text-sm text-red-600 space-y-1">
                <div className="flex justify-between">
                  <span>Credentialing Service</span>
                  <span>$750</span>
                </div>
                <div className="flex justify-between">
                  <span>DHA License Fee</span>
                  <span>$500</span>
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-green-900">Recent Payments</span>
                <span className="text-sm text-green-600">Last 30 days</span>
              </div>
              <div className="text-sm text-green-800 space-y-1">
                <div className="flex justify-between">
                  <span>DataFlow Service ✅</span>
                  <span>$850</span>
                </div>
                <div className="flex justify-between">
                  <span>License Renewal ✅</span>
                  <span>$200</span>
                </div>
              </div>
            </div>

            {/* Next Payment Due */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-yellow-900">Next Payment Due</span>
                <span className="text-sm text-yellow-600">Sep 15, 2024</span>
              </div>
              <div className="text-sm text-yellow-800">
                <div className="flex justify-between">
                  <span>Credentialing Balance</span>
                  <span className="font-bold">$750</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowPaymentModal(true)}
            className="w-full mt-4 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700"
          >
            Make Payment
          </button>
        </div>
      </div>

      {/* Calendar & Deadlines */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center mb-6">
          <div className="bg-indigo-500 text-white p-2 rounded-full mr-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">📅 Upcoming Deadlines & Events</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">Sep 8</div>
              <div className="text-xs text-red-500 mb-2">2 days left</div>
              <h4 className="font-semibold text-red-900">Document Deadline</h4>
              <p className="text-sm text-red-700 mt-1">Upload missing experience letter</p>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">Sep 10</div>
              <div className="text-xs text-orange-500 mb-2">4 days left</div>
              <h4 className="font-semibold text-orange-900">Interview Scheduling</h4>
              <p className="text-sm text-orange-700 mt-1">Schedule DataFlow verification interview</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">Sep 15</div>
              <div className="text-xs text-yellow-500 mb-2">9 days left</div>
              <h4 className="font-semibold text-yellow-900">Payment Due</h4>
              <p className="text-sm text-yellow-700 mt-1">Credentialing service balance $750</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-indigo-900">📱 Calendar Integration</h4>
              <p className="text-indigo-700 text-sm mt-1">Sync all deadlines with your calendar</p>
            </div>
            <button 
              onClick={handleExportCalendar}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Export Calendar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Your Applications Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{applicants.length}</p>
            <p className="text-sm text-gray-600">Total Services</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {applicants.filter(a => a.currentStage === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {applicants.filter(a => a.currentStage === 'authority_processing').length}
            </p>
            <p className="text-sm text-gray-600">In Processing</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {applicants.filter(a => a.priority === 'high').length}
            </p>
            <p className="text-sm text-gray-600">High Priority</p>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">📤 Upload Documents</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Documents to Upload
                </label>
                <input 
                  type="file"
                  multiple
                  onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected Files:</p>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </div>
                  ))}
                </div>
              )}

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleFileUpload(selectedFiles)}
                  disabled={selectedFiles.length === 0 || isUploading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interview Scheduling Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">📅 Schedule Interview</h3>
              <button 
                onClick={() => setShowInterviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Type
                </label>
                <select 
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="dataflow">DataFlow Verification</option>
                  <option value="dha">DHA License Interview</option>
                  <option value="credentialing">Credentialing Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select time...</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 You will receive a confirmation email with interview details and a calendar invite.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowInterviewModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleScheduleInterview}
                  className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">💰 Make Payment</h3>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>
                <select 
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    setPaymentAmount(e.target.value === 'credentialing' ? 750 : 500);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="credentialing">Credentialing Service - $750</option>
                  <option value="dha">DHA License Fee - $500</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Amount Due:</span>
                  <span className="text-xl font-bold text-green-600">${paymentAmount}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  🔒 Your payment is secured with 256-bit SSL encryption
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePayment}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Pay ${paymentAmount}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Modal */}
      {showMessagesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">💬 All Messages</h3>
              <button 
                onClick={() => setShowMessagesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Recent Messages */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                      AH
                    </div>
                    <div>
                      <span className="font-medium text-blue-900">Ahmed Hassan</span>
                      <span className="text-xs text-blue-600 ml-2">Consultant</span>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600">2 hours ago</span>
                </div>
                <p className="text-sm text-blue-800 mb-3">Your DataFlow verification is almost complete. Please schedule your interview by Sept 10th.</p>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                    Reply
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-300">
                    Mark Read
                  </button>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                      DHA
                    </div>
                    <div>
                      <span className="font-medium text-yellow-900">DHA Authority</span>
                      <span className="text-xs text-yellow-600 ml-2">System</span>
                    </div>
                  </div>
                  <span className="text-xs text-yellow-600">1 day ago</span>
                </div>
                <p className="text-sm text-yellow-800 mb-3">Additional documentation required for license application. Please upload your Good Standing Certificate.</p>
                <div className="flex space-x-2">
                  <button className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700">
                    Upload Document
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-300">
                    View Details
                  </button>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                      E
                    </div>
                    <div>
                      <span className="font-medium text-green-900">ELAB System</span>
                      <span className="text-xs text-green-600 ml-2">Notification</span>
                    </div>
                  </div>
                  <span className="text-xs text-green-600">3 days ago</span>
                </div>
                <p className="text-sm text-green-800 mb-3">License renewal completed successfully! Your certificate is now available for download.</p>
                <div className="flex space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                    Download Certificate
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                      FA
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Fatima Al-Zahra</span>
                      <span className="text-xs text-gray-600 ml-2">Consultant</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">1 week ago</span>
                </div>
                <p className="text-sm text-gray-800 mb-3">Welcome to ELAB! I'll be your consultant for the DHA license application. Please don't hesitate to reach out if you have any questions.</p>
                <div className="flex space-x-2">
                  <button className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700">
                    Reply
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                Compose New Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents Management Modal */}
      {showDocumentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">📁 Document Management</h3>
              <button 
                onClick={() => setShowDocumentsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Core Documents */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">📄 Core Documents</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium flex items-center">
                        <span className="text-green-600 mr-2">✅</span>
                        Passport Copy
                      </span>
                      <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        View
                      </button>
                    </div>
                    <p className="text-xs text-green-600">Verified on Aug 15, 2024</p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium flex items-center">
                        <span className="text-yellow-600 mr-2">⏳</span>
                        University Transcripts
                      </span>
                      <button className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Update
                      </button>
                    </div>
                    <p className="text-xs text-yellow-600">Under review since Sep 1, 2024</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium flex items-center">
                        <span className="text-red-600 mr-2">❌</span>
                        Experience Letter
                      </span>
                      <button 
                        onClick={() => setShowUploadModal(true)}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-700"
                      >
                        Upload
                      </button>
                    </div>
                    <p className="text-xs text-red-600">Required by Sep 8, 2024</p>
                  </div>
                </div>
              </div>

              {/* Service Documents */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">🎯 Service Documents</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">DataFlow Verification</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <span className="text-green-600 mr-1">✅</span>
                          Primary Source Documents
                        </span>
                        <button className="text-xs text-blue-600 hover:underline">View</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <span className="text-red-600 mr-1">❌</span>
                          Authority Response Form
                        </span>
                        <button className="text-xs text-blue-600 hover:underline">Upload</button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h5 className="font-medium text-purple-900 mb-2">DHA License</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <span className="text-green-600 mr-1">✅</span>
                          Application Form
                        </span>
                        <button className="text-xs text-purple-600 hover:underline">View</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <span className="text-red-600 mr-1">❌</span>
                          Good Standing Certificate
                        </span>
                        <button className="text-xs text-purple-600 hover:underline">Upload</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">⚡ Quick Actions</h4>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    📤 Upload Documents
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    📥 Download All
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                    📋 Document Checklist
                  </button>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">📊 Progress</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Core Documents</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}