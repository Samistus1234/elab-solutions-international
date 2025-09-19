/**
 * Pipeline Management Store
 * 
 * Zustand store for managing Odoo pipeline synchronization and real-time updates
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { generateId } from '@/lib/utils/id-generator';

// ============================================================================
// TYPES & ENUMS
// ============================================================================

export enum ServicePipeline {
  DATAFLOW = 'dataflow_verification',
  MUMARIS_PLUS = 'mumaris_plus',
  CGFNS = 'cgfns_ces',
  EXAM_BOOKING = 'exam_booking',
  ACADEMY = 'academy_tutorials',
  LICENSE_RENEWAL = 'license_renewals',
  CREDENTIALING = 'credentialing_classification',
  SHERYAN = 'sheryan_uae',
  QCHP = 'qchp_qatar',
  OMSB = 'omsb_oman',
  DHA_HAAD = 'dha_haad_mohap',
  VISA_SCREEN = 'visa_screen',
  NMCN_DASHBOARD = 'nmcn_dashboard_monitoring'
}

export enum PipelineStage {
  INQUIRY = 'inquiry',
  DOCUMENTS_SUBMITTED = 'documents_submitted',
  QC_PASSED = 'qc_passed',
  APPLICATION_SUBMITTED = 'application_submitted',
  AUTHORITY_PROCESSING = 'authority_processing',
  INSUFFICIENCY = 'insufficiency',
  ADDITIONAL_DOCS_REQUIRED = 'additional_docs_required',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  EXAM_SCHEDULED = 'exam_scheduled',
  RESULTS_RECEIVED = 'results_received',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  ON_HOLD = 'on_hold'
}

export interface PipelineStageInfo {
  stage: PipelineStage;
  name: string;
  description: string;
  icon: string;
  color: string;
  estimatedDuration?: string;
  requirements?: string[];
  nextActions?: string[];
}

export interface StageHistoryItem {
  stage: PipelineStage;
  stageName: string;
  enteredAt: string;
  completedAt?: string;
  duration?: string;
  notes?: string;
  handledBy?: string;
}

export interface ApplicantPipeline {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  referenceNumber: string;
  pipelineType: ServicePipeline;
  serviceName: string;
  currentStage: PipelineStage;
  currentStageNumber: number;
  totalStages: number;
  progressPercentage: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedConsultant?: string;
  estimatedCompletion?: string;
  actualCompletion?: string;
  stageHistory: StageHistoryItem[];
  lastUpdated: string;
  createdAt: string;
  metadata: {
    odooRecordId: string;
    tags?: string[];
    customFields?: Record<string, any>;
  };
}

export interface PipelineNotification {
  id: string;
  applicantId: string;
  applicantName: string;
  pipelineType: ServicePipeline;
  serviceName: string;
  event: 'stage_changed' | 'stage_delayed' | 'insufficiency' | 'completed';
  message: string;
  previousStage?: PipelineStage;
  newStage: PipelineStage;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface PipelineStats {
  totalApplicants: number;
  activeApplicants: number;
  completedThisMonth: number;
  averageProcessingTime: number;
  pipelineBreakdown: Record<ServicePipeline, {
    active: number;
    completed: number;
    completionRate: number;
    averageTime: number;
  }>;
  stageDistribution: Record<PipelineStage, number>;
}

// ============================================================================
// PIPELINE CONFIGURATIONS
// ============================================================================

export const PIPELINE_CONFIGS: Record<ServicePipeline, {
  name: string;
  description: string;
  icon: string;
  color: string;
  stages: PipelineStageInfo[];
}> = {
  [ServicePipeline.DATAFLOW]: {
    name: 'DataFlow Verification',
    description: 'UAE DataFlow credential verification process',
    icon: '🏥',
    color: 'blue',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'Initial Inquiry',
        description: 'Applicant inquiry received',
        icon: '📧',
        color: 'gray',
        estimatedDuration: '1-2 days'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Documents Submitted',
        description: 'Required documents uploaded',
        icon: '📄',
        color: 'yellow',
        estimatedDuration: '3-5 days',
        requirements: ['Degree Certificate', 'License', 'Experience Letters']
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'Quality Check Passed',
        description: 'Documents reviewed and approved',
        icon: '✅',
        color: 'green',
        estimatedDuration: '2-3 days'
      },
      {
        stage: PipelineStage.APPLICATION_SUBMITTED,
        name: 'Application Submitted',
        description: 'Application submitted to DataFlow',
        icon: '🚀',
        color: 'blue',
        estimatedDuration: '1 day'
      },
      {
        stage: PipelineStage.AUTHORITY_PROCESSING,
        name: 'Authority Processing',
        description: 'DataFlow processing application',
        icon: '⚙️',
        color: 'orange',
        estimatedDuration: '10-15 days'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'Completed',
        description: 'DataFlow report received',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.MUMARIS_PLUS]: {
    name: 'Mumaris Plus (Saudi Licensing)',
    description: 'Saudi Arabia healthcare licensing process',
    icon: '🇸🇦',
    color: 'green',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'Initial Inquiry',
        description: 'Applicant inquiry received',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Documents Submitted',
        description: 'Required documents uploaded',
        icon: '📄',
        color: 'yellow'
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'QC Passed',
        description: 'Documents quality checked',
        icon: '✅',
        color: 'green'
      },
      {
        stage: PipelineStage.APPLICATION_SUBMITTED,
        name: 'Submitted to SCFHS',
        description: 'Application submitted to Saudi authorities',
        icon: '🚀',
        color: 'blue'
      },
      {
        stage: PipelineStage.EXAM_SCHEDULED,
        name: 'Exam Scheduled',
        description: 'Professional exam scheduled',
        icon: '📝',
        color: 'purple'
      },
      {
        stage: PipelineStage.RESULTS_RECEIVED,
        name: 'Results Received',
        description: 'Exam results and license status',
        icon: '📊',
        color: 'blue'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'Licensed',
        description: 'Saudi professional license issued',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.CGFNS]: {
    name: 'CGFNS (CES Process)',
    description: 'Credentials Evaluation Service for US nursing',
    icon: '🇺🇸',
    color: 'red',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'Initial Inquiry',
        description: 'CES inquiry received',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Documents Submitted',
        description: 'Academic and license documents submitted',
        icon: '📄',
        color: 'yellow'
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'QC Passed',
        description: 'Documents verified and quality checked',
        icon: '✅',
        color: 'green'
      },
      {
        stage: PipelineStage.APPLICATION_SUBMITTED,
        name: 'Submitted to CGFNS',
        description: 'Application submitted to CGFNS',
        icon: '🚀',
        color: 'blue'
      },
      {
        stage: PipelineStage.AUTHORITY_PROCESSING,
        name: 'CGFNS Processing',
        description: 'CGFNS reviewing credentials',
        icon: '⚙️',
        color: 'orange'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'CES Report Issued',
        description: 'Credential evaluation report received',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.EXAM_BOOKING]: {
    name: 'Exam Booking Services',
    description: 'Professional exam scheduling and preparation',
    icon: '📝',
    color: 'purple',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'Exam Inquiry',
        description: 'Exam booking request received',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Eligibility Check',
        description: 'Exam eligibility documents submitted',
        icon: '📄',
        color: 'yellow'
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'Eligibility Confirmed',
        description: 'Exam eligibility verified',
        icon: '✅',
        color: 'green'
      },
      {
        stage: PipelineStage.EXAM_SCHEDULED,
        name: 'Exam Scheduled',
        description: 'Exam date and center booked',
        icon: '📅',
        color: 'blue'
      },
      {
        stage: PipelineStage.RESULTS_RECEIVED,
        name: 'Results Available',
        description: 'Exam results received',
        icon: '📊',
        color: 'orange'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'Process Complete',
        description: 'Exam process completed',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.ACADEMY]: {
    name: 'ELAB Academy Tutorials',
    description: 'Professional exam preparation and tutorials',
    icon: '🎓',
    color: 'indigo',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'Course Inquiry',
        description: 'Tutorial program inquiry',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Enrollment',
        description: 'Course enrollment completed',
        icon: '📝',
        color: 'blue'
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'Study Plan Created',
        description: 'Personalized study plan developed',
        icon: '📋',
        color: 'green'
      },
      {
        stage: PipelineStage.AUTHORITY_PROCESSING,
        name: 'Active Learning',
        description: 'Student actively taking courses',
        icon: '📚',
        color: 'orange'
      },
      {
        stage: PipelineStage.EXAM_SCHEDULED,
        name: 'Mock Exams',
        description: 'Practice examinations',
        icon: '📝',
        color: 'purple'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'Course Completed',
        description: 'Tutorial program finished',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  // Add configurations for other pipelines...
  [ServicePipeline.LICENSE_RENEWAL]: {
    name: 'License Renewals',
    description: 'Professional license renewal services',
    icon: '🔄',
    color: 'cyan',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'Renewal Request',
        description: 'License renewal request received',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Documents Updated',
        description: 'Renewal documents submitted',
        icon: '📄',
        color: 'yellow'
      },
      {
        stage: PipelineStage.APPLICATION_SUBMITTED,
        name: 'Submitted to Authority',
        description: 'Renewal application submitted',
        icon: '🚀',
        color: 'blue'
      },
      {
        stage: PipelineStage.AUTHORITY_PROCESSING,
        name: 'Authority Processing',
        description: 'License authority processing renewal',
        icon: '⚙️',
        color: 'orange'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'License Renewed',
        description: 'Professional license renewed',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.CREDENTIALING]: {
    name: 'Credentialing & Classification',
    description: 'Professional credentialing and job classification',
    icon: '🏅',
    color: 'amber',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'Credentialing Inquiry',
        description: 'Credentialing request received',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Credentials Submitted',
        description: 'Professional credentials submitted',
        icon: '📄',
        color: 'yellow'
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'Credentials Verified',
        description: 'Professional credentials verified',
        icon: '✅',
        color: 'green'
      },
      {
        stage: PipelineStage.APPLICATION_SUBMITTED,
        name: 'Classification Request',
        description: 'Job classification requested',
        icon: '🚀',
        color: 'blue'
      },
      {
        stage: PipelineStage.AUTHORITY_PROCESSING,
        name: 'Authority Review',
        description: 'Classification under review',
        icon: '⚙️',
        color: 'orange'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'Classification Complete',
        description: 'Professional classification issued',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.SHERYAN]: {
    name: 'Sheryan (UAE Licensing)',
    description: 'UAE professional licensing through Sheryan',
    icon: '🇦🇪',
    color: 'emerald',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'Licensing Inquiry',
        description: 'UAE licensing inquiry received',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Documents Submitted',
        description: 'Required documents uploaded',
        icon: '📄',
        color: 'yellow'
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'QC Passed',
        description: 'Documents quality checked',
        icon: '✅',
        color: 'green'
      },
      {
        stage: PipelineStage.APPLICATION_SUBMITTED,
        name: 'Submitted to Sheryan',
        description: 'Application submitted to UAE authorities',
        icon: '🚀',
        color: 'blue'
      },
      {
        stage: PipelineStage.AUTHORITY_PROCESSING,
        name: 'Authority Processing',
        description: 'UAE authority processing application',
        icon: '⚙️',
        color: 'orange'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'UAE License Issued',
        description: 'UAE professional license issued',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.QCHP]: {
    name: 'QCHP (Qatar Licensing)',
    description: 'Qatar healthcare professional licensing',
    icon: '🇶🇦',
    color: 'rose',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'Qatar Inquiry',
        description: 'Qatar licensing inquiry received',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Documents Submitted',
        description: 'Required documents uploaded',
        icon: '📄',
        color: 'yellow'
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'QC Passed',
        description: 'Documents quality checked',
        icon: '✅',
        color: 'green'
      },
      {
        stage: PipelineStage.APPLICATION_SUBMITTED,
        name: 'Submitted to QCHP',
        description: 'Application submitted to Qatar authority',
        icon: '🚀',
        color: 'blue'
      },
      {
        stage: PipelineStage.AUTHORITY_PROCESSING,
        name: 'QCHP Processing',
        description: 'Qatar authority processing application',
        icon: '⚙️',
        color: 'orange'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'Qatar License Issued',
        description: 'Qatar professional license issued',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.OMSB]: {
    name: 'OMSB (Oman Licensing)',
    description: 'Oman Medical Specialty Board licensing',
    icon: '🇴🇲',
    color: 'teal',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'Oman Inquiry',
        description: 'Oman licensing inquiry received',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Documents Submitted',
        description: 'Required documents uploaded',
        icon: '📄',
        color: 'yellow'
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'QC Passed',
        description: 'Documents quality checked',
        icon: '✅',
        color: 'green'
      },
      {
        stage: PipelineStage.APPLICATION_SUBMITTED,
        name: 'Submitted to OMSB',
        description: 'Application submitted to Oman authority',
        icon: '🚀',
        color: 'blue'
      },
      {
        stage: PipelineStage.AUTHORITY_PROCESSING,
        name: 'OMSB Processing',
        description: 'Oman authority processing application',
        icon: '⚙️',
        color: 'orange'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'Oman License Issued',
        description: 'Oman professional license issued',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.DHA_HAAD]: {
    name: 'DHA/HAAD/MOHAP Licensing',
    description: 'UAE health authority licensing',
    icon: '🏥',
    color: 'blue',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'UAE Health Authority Inquiry',
        description: 'UAE health authority licensing inquiry',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Documents Submitted',
        description: 'Required documents uploaded',
        icon: '📄',
        color: 'yellow'
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'QC Passed',
        description: 'Documents quality checked',
        icon: '✅',
        color: 'green'
      },
      {
        stage: PipelineStage.EXAM_SCHEDULED,
        name: 'Prometric Exam Scheduled',
        description: 'Professional exam scheduled',
        icon: '📝',
        color: 'purple'
      },
      {
        stage: PipelineStage.RESULTS_RECEIVED,
        name: 'Exam Results',
        description: 'Exam results received',
        icon: '📊',
        color: 'blue'
      },
      {
        stage: PipelineStage.APPLICATION_SUBMITTED,
        name: 'License Application',
        description: 'License application submitted',
        icon: '🚀',
        color: 'blue'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'UAE License Issued',
        description: 'UAE professional license issued',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.VISA_SCREEN]: {
    name: 'VisaScreen / International Licensure',
    description: 'US immigration visa screening for healthcare professionals',
    icon: '🛂',
    color: 'indigo',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'VisaScreen Inquiry',
        description: 'VisaScreen request received',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Documents Submitted',
        description: 'Required documents uploaded',
        icon: '📄',
        color: 'yellow'
      },
      {
        stage: PipelineStage.QC_PASSED,
        name: 'QC Passed',
        description: 'Documents quality checked',
        icon: '✅',
        color: 'green'
      },
      {
        stage: PipelineStage.APPLICATION_SUBMITTED,
        name: 'Submitted to CGFNS',
        description: 'VisaScreen application submitted',
        icon: '🚀',
        color: 'blue'
      },
      {
        stage: PipelineStage.AUTHORITY_PROCESSING,
        name: 'CGFNS Processing',
        description: 'CGFNS processing VisaScreen',
        icon: '⚙️',
        color: 'orange'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'VisaScreen Certificate',
        description: 'VisaScreen certificate issued',
        icon: '🎉',
        color: 'green'
      }
    ]
  },
  [ServicePipeline.NMCN_DASHBOARD]: {
    name: 'NMCN Dashboard Monitoring',
    description: 'UK NMC nursing registration monitoring',
    icon: '🇬🇧',
    color: 'violet',
    stages: [
      {
        stage: PipelineStage.INQUIRY,
        name: 'NMC Monitoring Request',
        description: 'NMC monitoring request received',
        icon: '📧',
        color: 'gray'
      },
      {
        stage: PipelineStage.DOCUMENTS_SUBMITTED,
        name: 'Setup Complete',
        description: 'NMC monitoring setup completed',
        icon: '⚙️',
        color: 'yellow'
      },
      {
        stage: PipelineStage.AUTHORITY_PROCESSING,
        name: 'Active Monitoring',
        description: 'Actively monitoring NMC status',
        icon: '👁️',
        color: 'orange'
      },
      {
        stage: PipelineStage.RESULTS_RECEIVED,
        name: 'Status Update',
        description: 'NMC status update received',
        icon: '📊',
        color: 'blue'
      },
      {
        stage: PipelineStage.COMPLETED,
        name: 'Monitoring Complete',
        description: 'NMC monitoring completed',
        icon: '🎉',
        color: 'green'
      }
    ]
  }
};

// ============================================================================
// INITIAL STATE
// ============================================================================

// Mock data for single applicant with multiple services
const mockPipelines: Record<string, ApplicantPipeline> = {
  'SERVICE-001': {
    id: 'pipeline-001',
    applicantId: 'APPLICANT-MAIN',
    applicantName: 'Dr. Ahmed Al-Mansouri',
    applicantEmail: 'ahmed.almansouri@email.com',
    referenceNumber: 'REF-2024-DATAFLOW',
    pipelineType: ServicePipeline.DATAFLOW,
    serviceName: 'DataFlow Verification',
    currentStage: PipelineStage.AUTHORITY_PROCESSING,
    currentStageNumber: 5,
    totalStages: 8,
    progressPercentage: 75,
    priority: 'high' as const,
    assignedConsultant: 'Ahmed Hassan',
    estimatedCompletion: '2024-09-15',
    stageHistory: [],
    lastUpdated: new Date().toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: {
      odooRecordId: 'ODO-001',
      tags: ['dataflow', 'uae', 'urgent']
    }
  },
  'SERVICE-002': {
    id: 'pipeline-002',
    applicantId: 'APPLICANT-MAIN',
    applicantName: 'Dr. Ahmed Al-Mansouri',
    applicantEmail: 'ahmed.almansouri@email.com',
    referenceNumber: 'REF-2024-LICENSE',
    pipelineType: ServicePipeline.DHA_HAAD,
    serviceName: 'DHA/HAAD License Application',
    currentStage: PipelineStage.DOCUMENTS_SUBMITTED,
    currentStageNumber: 2,
    totalStages: 8,
    progressPercentage: 25,
    priority: 'medium' as const,
    assignedConsultant: 'Fatima Al-Zahra',
    estimatedCompletion: '2024-10-30',
    stageHistory: [],
    lastUpdated: new Date().toISOString(),
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: {
      odooRecordId: 'ODO-002',
      tags: ['dha', 'license', 'pending']
    }
  },
  'SERVICE-003': {
    id: 'pipeline-003',
    applicantId: 'APPLICANT-MAIN',
    applicantName: 'Dr. Ahmed Al-Mansouri',
    applicantEmail: 'ahmed.almansouri@email.com',
    referenceNumber: 'REF-2024-MUMARIS',
    pipelineType: ServicePipeline.MUMARIS_PLUS,
    serviceName: 'Mumaris Plus Application',
    currentStage: PipelineStage.INQUIRY,
    currentStageNumber: 1,
    totalStages: 8,
    progressPercentage: 10,
    priority: 'low' as const,
    assignedConsultant: 'Omar Khalil',
    estimatedCompletion: '2024-12-15',
    stageHistory: [],
    lastUpdated: new Date().toISOString(),
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: {
      odooRecordId: 'ODO-003',
      tags: ['mumaris', 'initial', 'inquiry']
    }
  },
  'SERVICE-004': {
    id: 'pipeline-004',
    applicantId: 'APPLICANT-MAIN',
    applicantName: 'Dr. Ahmed Al-Mansouri',
    applicantEmail: 'ahmed.almansouri@email.com',
    referenceNumber: 'REF-2024-RENEWAL',
    pipelineType: ServicePipeline.LICENSE_RENEWAL,
    serviceName: 'License Renewal',
    currentStage: PipelineStage.COMPLETED,
    currentStageNumber: 8,
    totalStages: 8,
    progressPercentage: 100,
    priority: 'low' as const,
    assignedConsultant: 'Sarah Mitchell',
    actualCompletion: '2024-08-20',
    stageHistory: [],
    lastUpdated: new Date().toISOString(),
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: {
      odooRecordId: 'ODO-004',
      tags: ['renewal', 'completed', 'success']
    }
  },
  'SERVICE-005': {
    id: 'pipeline-005',
    applicantId: 'APPLICANT-MAIN',
    applicantName: 'Dr. Ahmed Al-Mansouri',
    applicantEmail: 'ahmed.almansouri@email.com',
    referenceNumber: 'REF-2024-CREDENTIALING',
    pipelineType: ServicePipeline.CREDENTIALING,
    serviceName: 'Credentialing & Classification',
    currentStage: PipelineStage.QC_PASSED,
    currentStageNumber: 3,
    totalStages: 8,
    progressPercentage: 40,
    priority: 'medium' as const,
    assignedConsultant: 'Ahmed Hassan',
    estimatedCompletion: '2024-11-01',
    stageHistory: [],
    lastUpdated: new Date().toISOString(),
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: {
      odooRecordId: 'ODO-005',
      tags: ['credentialing', 'qc-passed', 'classification']
    }
  }
};

const initialState = {
  applicantPipelines: mockPipelines,
  notifications: [] as PipelineNotification[],
  stats: null as PipelineStats | null,
  selectedApplicantId: null as string | null,
  selectedPipelineType: null as ServicePipeline | null,
  isConnected: false,
  loading: false,
  error: null as string | null,
  lastSync: null as string | null
};

// ============================================================================
// STORE INTERFACE
// ============================================================================

interface PipelineStore {
  // State
  applicantPipelines: Record<string, ApplicantPipeline>;
  notifications: PipelineNotification[];
  stats: PipelineStats | null;
  selectedApplicantId: string | null;
  selectedPipelineType: ServicePipeline | null;
  isConnected: boolean;
  loading: boolean;
  error: string | null;
  lastSync: string | null;

  // Computed Properties
  filteredPipelines: ApplicantPipeline[];
  unreadNotifications: PipelineNotification[];
  pipelinesInStage: (stage: PipelineStage) => ApplicantPipeline[];
  pipelinesOfType: (type: ServicePipeline) => ApplicantPipeline[];

  // Actions
  syncFromOdoo: () => Promise<void>;
  updatePipelineStage: (applicantId: string, newStage: PipelineStage, metadata?: any) => Promise<void>;
  addNotification: (notification: Omit<PipelineNotification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (notificationId: string) => void;
  clearNotifications: () => void;
  setSelectedApplicant: (applicantId: string | null) => void;
  setSelectedPipelineType: (pipelineType: ServicePipeline | null) => void;
  
  // Utility Methods
  getPipelineConfig: (pipelineType: ServicePipeline) => typeof PIPELINE_CONFIGS[ServicePipeline];
  getStageInfo: (pipelineType: ServicePipeline, stage: PipelineStage) => PipelineStageInfo | null;
  calculateProgress: (pipelineType: ServicePipeline, currentStage: PipelineStage) => number;
  estimateCompletion: (pipeline: ApplicantPipeline) => string;
  
  // Mock Data Methods
  generateMockData: () => Promise<void>;
  simulatePipelineUpdate: (applicantId: string) => Promise<void>;
}

// ============================================================================
// STORE IMPLEMENTATION
// ============================================================================

export const usePipelineStore = create<PipelineStore>()((set, get) => ({
  ...initialState,

  // Computed Properties
  get filteredPipelines() {
    const { applicantPipelines, selectedPipelineType } = get();
    const pipelines = Object.values(applicantPipelines);
    
    if (selectedPipelineType) {
      return pipelines.filter(p => p.pipelineType === selectedPipelineType);
    }
    
    return pipelines;
  },

  get unreadNotifications() {
    return get().notifications.filter(n => !n.isRead);
  },

  pipelinesInStage: (stage: PipelineStage) => {
    return Object.values(get().applicantPipelines).filter(p => p.currentStage === stage);
  },

  pipelinesOfType: (type: ServicePipeline) => {
    return Object.values(get().applicantPipelines).filter(p => p.pipelineType === type);
  },

  // Actions
  syncFromOdoo: async () => {
    set({ loading: true, error: null });
    
    try {
      const response = await fetch('/api/odoo/pipeline-sync');
      
      if (!response.ok) {
        throw new Error(`Failed to sync: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process and update pipelines based on Odoo data
      // This would be implemented based on your actual API response structure
      
      set({ 
        isConnected: true,
        lastSync: new Date().toISOString(),
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Sync failed',
        isConnected: false,
        loading: false 
      });
    }
  },

  updatePipelineStage: async (applicantId: string, newStage: PipelineStage, metadata?: any) => {
    const pipeline = get().applicantPipelines[applicantId];
    if (!pipeline) return;

    const previousStage = pipeline.currentStage;
    const config = get().getPipelineConfig(pipeline.pipelineType);
    const stageIndex = config.stages.findIndex(s => s.stage === newStage);
    const progress = get().calculateProgress(pipeline.pipelineType, newStage);

    // Add to stage history
    const historyItem: StageHistoryItem = {
      stage: newStage,
      stageName: config.stages[stageIndex]?.name || newStage,
      enteredAt: new Date().toISOString(),
      notes: metadata?.notes
    };

    // Update previous stage completion time
    const updatedHistory = [...pipeline.stageHistory];
    if (updatedHistory.length > 0) {
      const lastStage = updatedHistory[updatedHistory.length - 1];
      if (!lastStage.completedAt) {
        lastStage.completedAt = new Date().toISOString();
        lastStage.duration = calculateStageDuration(lastStage.enteredAt, lastStage.completedAt);
      }
    }
    updatedHistory.push(historyItem);

    // Update pipeline
    const updatedPipeline: ApplicantPipeline = {
      ...pipeline,
      currentStage: newStage,
      currentStageNumber: stageIndex + 1,
      progressPercentage: progress,
      stageHistory: updatedHistory,
      lastUpdated: new Date().toISOString(),
      ...(newStage === PipelineStage.COMPLETED && {
        actualCompletion: new Date().toISOString()
      })
    };

    set(state => ({
      applicantPipelines: {
        ...state.applicantPipelines,
        [applicantId]: updatedPipeline
      }
    }));

    // Add notification
    get().addNotification({
      applicantId,
      applicantName: pipeline.applicantName,
      pipelineType: pipeline.pipelineType,
      serviceName: pipeline.serviceName,
      event: 'stage_changed',
      message: `Stage updated from "${config.stages.find(s => s.stage === previousStage)?.name}" to "${config.stages[stageIndex]?.name}"`,
      previousStage,
      newStage,
      isRead: false,
      priority: newStage === PipelineStage.COMPLETED ? 'high' : 'medium'
    });
  },

  addNotification: (notification) => {
    const newNotification: PipelineNotification = {
      ...notification,
      id: generateId(),
      timestamp: new Date().toISOString()
    };

    set(state => ({
      notifications: [newNotification, ...state.notifications.slice(0, 99)] // Keep last 100
    }));
  },

  markNotificationRead: (notificationId: string) => {
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  setSelectedApplicant: (applicantId: string | null) => {
    set({ selectedApplicantId: applicantId });
  },

  setSelectedPipelineType: (pipelineType: ServicePipeline | null) => {
    set({ selectedPipelineType: pipelineType });
  },

  // Utility Methods
  getPipelineConfig: (pipelineType: ServicePipeline) => {
    return PIPELINE_CONFIGS[pipelineType];
  },

  getStageInfo: (pipelineType: ServicePipeline, stage: PipelineStage) => {
    const config = PIPELINE_CONFIGS[pipelineType];
    return config.stages.find(s => s.stage === stage) || null;
  },

  calculateProgress: (pipelineType: ServicePipeline, currentStage: PipelineStage) => {
    const config = PIPELINE_CONFIGS[pipelineType];
    const stageIndex = config.stages.findIndex(s => s.stage === currentStage);
    
    if (stageIndex === -1) return 0;
    
    return Math.round(((stageIndex + 1) / config.stages.length) * 100);
  },

  estimateCompletion: (pipeline: ApplicantPipeline) => {
    // Simple estimation based on current progress and historical data
    const remainingStages = pipeline.totalStages - pipeline.currentStageNumber;
    const averageStageTime = 3; // days
    const estimatedDays = remainingStages * averageStageTime;
    
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + estimatedDays);
    
    return completionDate.toISOString().split('T')[0];
  },

  // Mock Data Methods
  generateMockData: async () => {
    set({ loading: true });

    // Generate comprehensive mock pipeline data with realistic applicants
    const mockPipelines: Record<string, ApplicantPipeline> = {};
    
    // Detailed mock applicants with realistic data
    const mockApplicants = [
      {
        applicantId: 'APP-001',
        applicantName: 'Dr. Sarah Ahmed',
        applicantEmail: 'sarah.ahmed@email.com',
        referenceNumber: 'REF-2024-001',
        pipelineType: ServicePipeline.DATAFLOW,
        currentStage: PipelineStage.AUTHORITY_PROCESSING,
        currentStageNumber: 5,
        priority: 'high' as const,
        assignedConsultant: 'Ahmed Hassan',
        estimatedCompletion: '2024-09-15',
        metadata: {
          odooRecordId: 'ODO-001',
          tags: ['urgent', 'dataflow', 'uae'],
          customFields: {
            sourceCountry: 'UAE',
            targetCountry: 'Saudi Arabia',
            specialty: 'General Practice'
          }
        }
      },
      {
        applicantId: 'APP-002',
        applicantName: 'Nurse Maria Santos',
        applicantEmail: 'maria.santos@email.com',
        referenceNumber: 'REF-2024-002',
        pipelineType: ServicePipeline.DHA_HAAD,
        currentStage: PipelineStage.EXAM_SCHEDULED,
        currentStageNumber: 4,
        priority: 'high' as const,
        assignedConsultant: 'Fatima Al-Zahra',
        estimatedCompletion: '2024-10-05',
        metadata: {
          odooRecordId: 'ODO-002',
          tags: ['dha', 'nursing', 'philippines'],
          customFields: {
            sourceCountry: 'Philippines',
            targetCountry: 'UAE',
            examDate: '2024-09-20',
            specialty: 'General Nursing'
          }
        }
      },
      {
        applicantId: 'APP-003',
        applicantName: 'Dr. Ahmed Hassan',
        applicantEmail: 'ahmed.hassan@email.com',
        referenceNumber: 'REF-2024-003',
        pipelineType: ServicePipeline.CGFNS,
        currentStage: PipelineStage.DOCUMENTS_SUBMITTED,
        currentStageNumber: 2,
        priority: 'medium' as const,
        assignedConsultant: 'John Smith',
        estimatedCompletion: '2024-11-10',
        metadata: {
          odooRecordId: 'ODO-003',
          tags: ['cgfns', 'usa', 'cardiology'],
          customFields: {
            sourceCountry: 'Egypt',
            targetCountry: 'USA',
            specialty: 'Cardiology'
          }
        }
      },
      {
        applicantId: 'APP-004',
        applicantName: 'Priya Sharma',
        applicantEmail: 'priya.sharma@email.com',
        referenceNumber: 'REF-2024-004',
        pipelineType: ServicePipeline.VISA_SCREEN,
        currentStage: PipelineStage.COMPLETED,
        currentStageNumber: 6,
        priority: 'low' as const,
        assignedConsultant: 'Lisa Chen',
        estimatedCompletion: '2024-08-25',
        actualCompletion: '2024-08-28',
        metadata: {
          odooRecordId: 'ODO-004',
          tags: ['visascreen', 'completed', 'india'],
          customFields: {
            sourceCountry: 'India',
            targetCountry: 'USA',
            certificateNumber: 'VS-2024-0428',
            specialty: 'Staff Nursing'
          }
        }
      },
      {
        applicantId: 'APP-005',
        applicantName: 'Dr. Michael Chen',
        applicantEmail: 'michael.chen@email.com',
        referenceNumber: 'REF-2024-005',
        pipelineType: ServicePipeline.MUMARIS_PLUS,
        currentStage: PipelineStage.INSUFFICIENCY,
        currentStageNumber: 3,
        priority: 'urgent' as const,
        assignedConsultant: 'Omar Al-Rashid',
        estimatedCompletion: '2024-10-30',
        metadata: {
          odooRecordId: 'ODO-005',
          tags: ['mumaris', 'insufficiency', 'urgent', 'malaysia'],
          customFields: {
            sourceCountry: 'Malaysia',
            targetCountry: 'Saudi Arabia',
            specialty: 'Emergency Medicine',
            insufficiencyReason: 'Missing specialty board certification'
          }
        }
      },
      {
        applicantId: 'APP-006',
        applicantName: 'Fatima Al-Zahra',
        applicantEmail: 'fatima.alzahra@email.com',
        referenceNumber: 'REF-2024-006',
        pipelineType: ServicePipeline.QCHP,
        currentStage: PipelineStage.RESULTS_RECEIVED,
        currentStageNumber: 6,
        priority: 'high' as const,
        assignedConsultant: 'Khalid Mohammed',
        estimatedCompletion: '2024-09-10',
        metadata: {
          odooRecordId: 'ODO-006',
          tags: ['qchp', 'qatar', 'pediatric', 'jordan'],
          customFields: {
            sourceCountry: 'Jordan',
            targetCountry: 'Qatar',
            specialty: 'Pediatric Nursing',
            examScore: '82%'
          }
        }
      },
      {
        applicantId: 'APP-007',
        applicantName: 'Dr. James Wilson',
        applicantEmail: 'james.wilson@email.com',
        referenceNumber: 'REF-2024-007',
        pipelineType: ServicePipeline.OMSB,
        currentStage: PipelineStage.QC_PASSED,
        currentStageNumber: 3,
        priority: 'medium' as const,
        assignedConsultant: 'Sarah Thompson',
        estimatedCompletion: '2024-11-20',
        metadata: {
          odooRecordId: 'ODO-007',
          tags: ['omsb', 'oman', 'orthopedic', 'uk'],
          customFields: {
            sourceCountry: 'UK',
            targetCountry: 'Oman',
            specialty: 'Orthopedic Surgery'
          }
        }
      },
      {
        applicantId: 'APP-008',
        applicantName: 'Rajesh Kumar',
        applicantEmail: 'rajesh.kumar@email.com',
        referenceNumber: 'REF-2024-008',
        pipelineType: ServicePipeline.ACADEMY,
        currentStage: PipelineStage.ON_HOLD,
        currentStageNumber: 2,
        priority: 'low' as const,
        assignedConsultant: 'Mike Johnson',
        estimatedCompletion: '2024-12-15',
        metadata: {
          odooRecordId: 'ODO-008',
          tags: ['academy', 'on-hold', 'payment-pending', 'india'],
          customFields: {
            sourceCountry: 'India',
            targetCountry: 'Multiple',
            courseType: 'NCLEX-RN Preparation',
            paymentStatus: 'Pending'
          }
        }
      },
      {
        applicantId: 'APP-009',
        applicantName: 'Dr. Aisha Abdullah',
        applicantEmail: 'aisha.abdullah@email.com',
        referenceNumber: 'REF-2024-009',
        pipelineType: ServicePipeline.SHERYAN,
        currentStage: PipelineStage.APPLICATION_SUBMITTED,
        currentStageNumber: 4,
        priority: 'high' as const,
        assignedConsultant: 'Hassan Al-Mahmoud',
        estimatedCompletion: '2024-09-30',
        metadata: {
          odooRecordId: 'ODO-009',
          tags: ['sheryan', 'uae', 'radiology', 'syria'],
          customFields: {
            sourceCountry: 'Syria',
            targetCountry: 'UAE',
            specialty: 'Radiology'
          }
        }
      },
      {
        applicantId: 'APP-010',
        applicantName: 'Jennifer Thompson',
        applicantEmail: 'jennifer.thompson@email.com',
        referenceNumber: 'REF-2024-010',
        pipelineType: ServicePipeline.NMCN_DASHBOARD,
        currentStage: PipelineStage.AUTHORITY_PROCESSING,
        currentStageNumber: 3,
        priority: 'medium' as const,
        assignedConsultant: 'Rebecca Miller',
        estimatedCompletion: '2024-10-15',
        metadata: {
          odooRecordId: 'ODO-010',
          tags: ['nmcn', 'uk', 'nursing', 'australia'],
          customFields: {
            sourceCountry: 'Australia',
            targetCountry: 'UK',
            specialty: 'Critical Care Nursing'
          }
        }
      },
      {
        applicantId: 'APP-011',
        applicantName: 'Dr. Ibrahim Youssef',
        applicantEmail: 'ibrahim.youssef@email.com',
        referenceNumber: 'REF-2024-011',
        pipelineType: ServicePipeline.CREDENTIALING,
        currentStage: PipelineStage.QC_PASSED,
        currentStageNumber: 3,
        priority: 'high' as const,
        assignedConsultant: 'Dr. Sarah Johnson',
        estimatedCompletion: '2024-09-25',
        metadata: {
          odooRecordId: 'ODO-011',
          tags: ['credentialing', 'neurosurgery', 'lebanon'],
          customFields: {
            sourceCountry: 'Lebanon',
            targetCountry: 'Canada',
            specialty: 'Neurosurgery'
          }
        }
      },
      {
        applicantId: 'APP-012',
        applicantName: 'Rosa Martinez',
        applicantEmail: 'rosa.martinez@email.com',
        referenceNumber: 'REF-2024-012',
        pipelineType: ServicePipeline.LICENSE_RENEWAL,
        currentStage: PipelineStage.COMPLETED,
        currentStageNumber: 4,
        priority: 'low' as const,
        assignedConsultant: 'Carlos Rodriguez',
        estimatedCompletion: '2024-08-20',
        actualCompletion: '2024-08-18',
        metadata: {
          odooRecordId: 'ODO-012',
          tags: ['renewal', 'completed', 'spain'],
          customFields: {
            sourceCountry: 'Spain',
            targetCountry: 'UAE',
            specialty: 'Family Medicine',
            renewalType: 'DHA License Renewal'
          }
        }
      }
    ];

    // Generate mock notifications
    const mockNotifications: PipelineNotification[] = [
      {
        id: generateId(),
        applicantId: 'APP-005',
        applicantName: 'Dr. Michael Chen',
        pipelineType: ServicePipeline.MUMARIS_PLUS,
        serviceName: 'Mumaris Plus (Saudi Licensing)',
        event: 'insufficiency',
        message: 'Insufficiency noted: Missing specialty board certification documents required',
        newStage: PipelineStage.INSUFFICIENCY,
        previousStage: PipelineStage.DOCUMENTS_SUBMITTED,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        isRead: false,
        priority: 'high'
      },
      {
        id: generateId(),
        applicantId: 'APP-006',
        applicantName: 'Fatima Al-Zahra',
        pipelineType: ServicePipeline.QCHP,
        serviceName: 'QCHP Qatar License',
        event: 'stage_changed',
        message: 'Exam results received - passed with 82% score',
        newStage: PipelineStage.RESULTS_RECEIVED,
        previousStage: PipelineStage.AUTHORITY_PROCESSING,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        isRead: false,
        priority: 'medium'
      },
      {
        id: generateId(),
        applicantId: 'APP-004',
        applicantName: 'Priya Sharma',
        pipelineType: ServicePipeline.VISA_SCREEN,
        serviceName: 'VisaScreen Certificate',
        event: 'completed',
        message: 'VisaScreen certificate issued successfully - Certificate #VS-2024-0428',
        newStage: PipelineStage.COMPLETED,
        previousStage: PipelineStage.AUTHORITY_PROCESSING,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        isRead: true,
        priority: 'low'
      },
      {
        id: generateId(),
        applicantId: 'APP-002',
        applicantName: 'Nurse Maria Santos',
        pipelineType: ServicePipeline.DHA_HAAD,
        serviceName: 'DHA/HAAD/MOHaP',
        event: 'stage_changed',
        message: 'DHA exam scheduled for September 20th, 2024',
        newStage: PipelineStage.EXAM_SCHEDULED,
        previousStage: PipelineStage.QC_PASSED,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        isRead: true,
        priority: 'medium'
      },
      {
        id: generateId(),
        applicantId: 'APP-001',
        applicantName: 'Dr. Sarah Ahmed',
        pipelineType: ServicePipeline.DATAFLOW,
        serviceName: 'DataFlow Verification',
        event: 'stage_delayed',
        message: 'Processing delayed - Authority taking longer than expected (15+ days)',
        newStage: PipelineStage.AUTHORITY_PROCESSING,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        isRead: false,
        priority: 'high'
      }
    ];

    // Create pipeline objects from mock data
    for (const mockApp of mockApplicants) {
      const config = PIPELINE_CONFIGS[mockApp.pipelineType];
      const progressPercentage = get().calculateProgress(mockApp.pipelineType, mockApp.currentStage);
      
      // Generate realistic stage history based on current stage
      const stageHistory = generateMockStageHistory(config.stages, mockApp.currentStageNumber - 1);
      
      mockPipelines[mockApp.applicantId] = {
        id: generateId(),
        applicantId: mockApp.applicantId,
        applicantName: mockApp.applicantName,
        applicantEmail: mockApp.applicantEmail,
        referenceNumber: mockApp.referenceNumber,
        pipelineType: mockApp.pipelineType,
        serviceName: config.name,
        currentStage: mockApp.currentStage,
        currentStageNumber: mockApp.currentStageNumber,
        totalStages: config.stages.length,
        progressPercentage,
        priority: mockApp.priority,
        assignedConsultant: mockApp.assignedConsultant,
        estimatedCompletion: mockApp.estimatedCompletion,
        actualCompletion: mockApp.actualCompletion,
        stageHistory,
        lastUpdated: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - (30 + Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
        metadata: mockApp.metadata
      };
    }

    set({ 
      applicantPipelines: mockPipelines,
      notifications: mockNotifications,
      loading: false,
      lastSync: new Date().toISOString(),
      isConnected: true
    });
  },

  simulatePipelineUpdate: async (applicantId: string) => {
    const pipeline = get().applicantPipelines[applicantId];
    if (!pipeline) return;

    const config = get().getPipelineConfig(pipeline.pipelineType);
    const currentIndex = config.stages.findIndex(s => s.stage === pipeline.currentStage);
    
    if (currentIndex < config.stages.length - 1) {
      const nextStage = config.stages[currentIndex + 1].stage;
      await get().updatePipelineStage(applicantId, nextStage);
    }
  }
}));

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function calculateStageDuration(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return `${diffHours} hours`;
  }
  
  return `${diffDays} days`;
}

function generateMockStageHistory(stages: PipelineStageInfo[], currentStageIndex: number): StageHistoryItem[] {
  const history: StageHistoryItem[] = [];
  let currentDate = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);

  for (let i = 0; i <= currentStageIndex; i++) {
    const stage = stages[i];
    const enteredAt = currentDate.toISOString();
    const isCompleted = i < currentStageIndex;
    
    let completedAt: string | undefined;
    let duration: string | undefined;
    
    if (isCompleted) {
      const stageEndDate = new Date(currentDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
      completedAt = stageEndDate.toISOString();
      duration = calculateStageDuration(enteredAt, completedAt);
      currentDate = stageEndDate;
    }

    history.push({
      stage: stage.stage,
      stageName: stage.name,
      enteredAt,
      completedAt,
      duration,
      notes: isCompleted ? 'Stage completed successfully' : undefined
    });
  }

  return history;
}