/**
 * Odoo Pipeline Sync Webhook Handler
 * 
 * Receives real-time updates from Odoo when applicant pipeline stages change
 * and syncs them with CentralOps dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { ServicePipeline, PipelineStage } from '@/lib/stores/pipeline-store';

// ============================================================================
// TYPES 
// ============================================================================

interface OdooWebhookPayload {
  event: 'pipeline_stage_changed' | 'applicant_created' | 'applicant_updated';
  timestamp: string;
  applicant_id: string;
  pipeline_type: ServicePipeline;
  previous_stage?: PipelineStage;
  current_stage: PipelineStage;
  stage_metadata: {
    stage_name: string;
    stage_description?: string;
    estimated_completion?: string;
    requirements?: string[];
    next_actions?: string[];
  };
  applicant_data: {
    name: string;
    email: string;
    phone?: string;
    reference_number: string;
    assigned_consultant?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
  };
  pipeline_metadata: {
    service_name: string;
    total_stages: number;
    current_stage_number: number;
    progress_percentage: number;
    estimated_completion_date?: string;
  };
}

// ============================================================================
// WEBHOOK HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const headersList = headers();
    const odooSignature = headersList.get('x-odoo-signature');
    const contentType = headersList.get('content-type');

    // Verify webhook signature (implement your security validation)
    if (!odooSignature || !isValidOdooSignature(odooSignature)) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const payload: OdooWebhookPayload = await request.json();
    
    // Validate required fields
    if (!payload.applicant_id || !payload.pipeline_type || !payload.current_stage) {
      return NextResponse.json(
        { error: 'Missing required fields in webhook payload' },
        { status: 400 }
      );
    }

    // Process the pipeline update
    const result = await processPipelineUpdate(payload);

    // Send real-time notifications to connected clients
    await notifyClients(payload);

    return NextResponse.json({
      success: true,
      message: 'Pipeline update processed successfully',
      applicant_id: payload.applicant_id,
      pipeline: payload.pipeline_type,
      stage: payload.current_stage,
      processed_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Odoo webhook processing error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process pipeline update',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// PIPELINE PROCESSING FUNCTIONS
// ============================================================================

async function processPipelineUpdate(payload: OdooWebhookPayload) {
  // Here you would integrate with your database to store/update the pipeline data
  // For now, we'll simulate the processing
  
  const pipelineUpdate = {
    applicantId: payload.applicant_id,
    pipelineType: payload.pipeline_type,
    previousStage: payload.previous_stage,
    currentStage: payload.current_stage,
    stageMetadata: payload.stage_metadata,
    applicantData: payload.applicant_data,
    pipelineMetadata: payload.pipeline_metadata,
    updatedAt: new Date().toISOString(),
    event: payload.event
  };

  // Store in database (implement your storage logic)
  console.log('Processing pipeline update:', pipelineUpdate);

  // You would integrate with your actual database here
  // await savePipelineUpdate(pipelineUpdate);

  return pipelineUpdate;
}

async function notifyClients(payload: OdooWebhookPayload) {
  // Send real-time notifications to relevant users
  // This could integrate with WebSocket connections, push notifications, etc.
  
  const notification = {
    type: 'pipeline_stage_changed',
    applicantId: payload.applicant_id,
    applicantName: payload.applicant_data.name,
    serviceName: payload.pipeline_metadata.service_name,
    newStage: payload.stage_metadata.stage_name,
    progressPercentage: payload.pipeline_metadata.progress_percentage,
    timestamp: payload.timestamp
  };

  // Implement your real-time notification system here
  console.log('Sending notification:', notification);
}

function isValidOdooSignature(signature: string): boolean {
  // Implement signature validation logic
  // This should verify that the webhook came from your Odoo instance
  
  const expectedSignature = process.env.ODOO_WEBHOOK_SECRET;
  if (!expectedSignature) {
    console.warn('ODOO_WEBHOOK_SECRET not configured');
    return false;
  }

  // In production, implement proper HMAC signature validation
  // For now, we'll do a simple comparison (replace with proper crypto validation)
  return signature === expectedSignature;
}

// ============================================================================
// GET ENDPOINT FOR FETCHING PIPELINE DATA
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicantId = searchParams.get('applicant_id');
    const pipelineType = searchParams.get('pipeline_type');

    if (applicantId) {
      // Fetch pipeline data for specific applicant
      const pipelineData = await getPipelineDataForApplicant(applicantId);
      return NextResponse.json(pipelineData);
    }

    if (pipelineType) {
      // Fetch all applicants in specific pipeline
      const pipelineApplicants = await getApplicantsInPipeline(pipelineType as ServicePipeline);
      return NextResponse.json(pipelineApplicants);
    }

    // Fetch all pipeline data
    const allPipelines = await getAllPipelineData();
    return NextResponse.json(allPipelines);

  } catch (error) {
    console.error('Pipeline data fetch error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch pipeline data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// DATA FETCHING FUNCTIONS
// ============================================================================

async function getPipelineDataForApplicant(applicantId: string) {
  // Mock data - replace with actual database queries
  return {
    applicantId,
    pipelines: [
      {
        type: ServicePipeline.DATAFLOW,
        serviceName: 'DataFlow Verification',
        currentStage: PipelineStage.QC_PASSED,
        currentStageNumber: 3,
        totalStages: 6,
        progressPercentage: 50,
        estimatedCompletion: '2024-02-15',
        stageHistory: [
          {
            stage: PipelineStage.INQUIRY,
            completedAt: '2024-01-10T09:00:00Z',
            duration: '2 days'
          },
          {
            stage: PipelineStage.DOCUMENTS_SUBMITTED,
            completedAt: '2024-01-15T14:30:00Z',
            duration: '3 days'
          },
          {
            stage: PipelineStage.QC_PASSED,
            completedAt: '2024-01-20T11:15:00Z',
            duration: '1 day'
          }
        ]
      }
    ]
  };
}

async function getApplicantsInPipeline(pipelineType: ServicePipeline) {
  // Mock data - replace with actual database queries
  return {
    pipelineType,
    applicants: [
      {
        applicantId: 'APP001',
        name: 'John Doe',
        email: 'john@example.com',
        currentStage: PipelineStage.DOCUMENTS_SUBMITTED,
        progressPercentage: 25,
        lastUpdated: '2024-01-20T10:00:00Z'
      }
    ]
  };
}

async function getAllPipelineData() {
  // Mock data - replace with actual database queries
  return {
    summary: {
      totalApplicants: 1247,
      activePipelines: 12,
      completedThisMonth: 89,
      averageProcessingTime: '21 days'
    },
    pipelineStats: Object.values(ServicePipeline).map(pipeline => ({
      type: pipeline,
      activeApplicants: Math.floor(Math.random() * 100) + 10,
      completionRate: Math.floor(Math.random() * 30) + 70,
      averageTime: `${Math.floor(Math.random() * 20) + 10} days`
    }))
  };
}