'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Clock, AlertCircle, XCircle, PlayCircle,
  FileText, Eye, Send, Cog, Trophy, Users, Calendar
} from 'lucide-react';
import { ServicePipeline, PipelineStage, ApplicantPipeline, PIPELINE_CONFIGS } from '@/lib/stores/pipeline-store';

interface PipelineFlowChartProps {
  pipeline: ApplicantPipeline;
  showDetails?: boolean;
  compact?: boolean;
  interactive?: boolean;
  onStageClick?: (stage: PipelineStage) => void;
}

const PipelineFlowChart: React.FC<PipelineFlowChartProps> = ({ 
  pipeline, 
  showDetails = true, 
  compact = false, 
  interactive = false,
  onStageClick 
}) => {
  const config = PIPELINE_CONFIGS[pipeline.pipelineType];
  
  if (!config) {
    return (
      <div className="text-center py-4 text-gray-500">
        Pipeline configuration not found for {pipeline.pipelineType}
      </div>
    );
  }

  const getStageStatus = (stageIndex: number) => {
    const currentIndex = pipeline.currentStageNumber - 1;
    
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const getStageIcon = (stage: PipelineStage, status: string) => {
    const iconClass = "h-5 w-5";
    
    if (status === 'completed') {
      return <CheckCircle className={`${iconClass} text-white`} />;
    }
    
    if (status === 'current') {
      switch (stage) {
        case PipelineStage.INQUIRY:
          return <FileText className={`${iconClass} text-white`} />;
        case PipelineStage.DOCUMENTS_SUBMITTED:
          return <FileText className={`${iconClass} text-white`} />;
        case PipelineStage.QC_PASSED:
          return <Eye className={`${iconClass} text-white`} />;
        case PipelineStage.APPLICATION_SUBMITTED:
          return <Send className={`${iconClass} text-white`} />;
        case PipelineStage.AUTHORITY_PROCESSING:
          return <Cog className={`${iconClass} text-white`} />;
        case PipelineStage.EXAM_SCHEDULED:
          return <Calendar className={`${iconClass} text-white`} />;
        case PipelineStage.RESULTS_RECEIVED:
          return <Trophy className={`${iconClass} text-white`} />;
        case PipelineStage.COMPLETED:
          return <Trophy className={`${iconClass} text-white`} />;
        case PipelineStage.INSUFFICIENCY:
          return <AlertCircle className={`${iconClass} text-white`} />;
        default:
          return <PlayCircle className={`${iconClass} text-white`} />;
      }
    }
    
    return <div className={`${iconClass.replace('h-5 w-5', 'h-3 w-3')} bg-gray-400 rounded-full`} />;
  };

  const getStageColors = (status: string, stage: PipelineStage) => {
    if (status === 'completed') {
      return {
        bg: 'bg-green-500',
        ring: 'ring-green-200',
        text: 'text-green-600'
      };
    }
    
    if (status === 'current') {
      if (stage === PipelineStage.INSUFFICIENCY || stage === PipelineStage.ADDITIONAL_DOCS_REQUIRED) {
        return {
          bg: 'bg-red-500',
          ring: 'ring-red-200',
          text: 'text-red-600'
        };
      }
      
      return {
        bg: 'bg-blue-500',
        ring: 'ring-blue-200',
        text: 'text-blue-600'
      };
    }
    
    return {
      bg: 'bg-gray-300',
      ring: 'ring-gray-200',
      text: 'text-gray-400'
    };
  };

  const getConnectionLineClass = (stageIndex: number) => {
    const currentIndex = pipeline.currentStageNumber - 1;
    
    if (stageIndex < currentIndex) {
      return 'bg-green-500';
    }
    
    return 'bg-gray-300';
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        {config.stages.map((stageInfo, index) => {
          const status = getStageStatus(index);
          const colors = getStageColors(status, stageInfo.stage);
          
          return (
            <div key={stageInfo.stage} className="flex items-center">
              <motion.div
                className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center ring-4 ${colors.ring}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={interactive ? { scale: 1.1 } : undefined}
              >
                {getStageIcon(stageInfo.stage, status)}
              </motion.div>
              
              {index < config.stages.length - 1 && (
                <div className={`w-4 h-0.5 mx-1 ${getConnectionLineClass(index)}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Service Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="text-2xl">{config.icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{config.name}</h3>
          <p className="text-sm text-gray-600">{config.description}</p>
        </div>
      </div>

      {/* Pipeline Flow */}
      <div className="relative">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-between">
            {config.stages.map((stageInfo, index) => {
              const status = getStageStatus(index);
              const colors = getStageColors(status, stageInfo.stage);
              const stageHistory = pipeline.stageHistory.find(h => h.stage === stageInfo.stage);
              
              return (
                <div key={stageInfo.stage} className="flex flex-col items-center flex-1">
                  {/* Stage Node */}
                  <motion.div
                    className={`relative w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center ring-4 ${colors.ring} cursor-pointer`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={interactive ? { scale: 1.1 } : undefined}
                    onClick={() => interactive && onStageClick && onStageClick(stageInfo.stage)}
                  >
                    {getStageIcon(stageInfo.stage, status)}
                    
                    {/* Pulse Animation for Current Stage */}
                    {status === 'current' && (
                      <motion.div
                        className={`absolute inset-0 rounded-full ${colors.bg} opacity-25`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Stage Info */}
                  <div className="mt-4 text-center max-w-32">
                    <h4 className={`font-medium text-sm ${colors.text}`}>
                      {stageInfo.name}
                    </h4>
                    
                    {showDetails && (
                      <>
                        <p className="text-xs text-gray-500 mt-1">
                          {stageInfo.description}
                        </p>
                        
                        {stageInfo.estimatedDuration && status !== 'completed' && (
                          <p className="text-xs text-gray-400 mt-1">
                            ⏱️ {stageInfo.estimatedDuration}
                          </p>
                        )}
                        
                        {stageHistory && stageHistory.completedAt && (
                          <div className="mt-2 text-xs">
                            <p className="text-green-600 font-medium">
                              ✅ Completed
                            </p>
                            {stageHistory.duration && (
                              <p className="text-gray-500">
                                took {stageHistory.duration}
                              </p>
                            )}
                          </div>
                        )}
                        
                        {status === 'current' && stageHistory && !stageHistory.completedAt && (
                          <div className="mt-2 text-xs">
                            <p className="text-blue-600 font-medium">
                              🔄 In Progress
                            </p>
                            <p className="text-gray-500">
                              since {new Date(stageHistory.enteredAt).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Connection Line */}
                  {index < config.stages.length - 1 && (
                    <motion.div
                      className={`absolute top-8 left-1/2 w-full h-1 ${getConnectionLineClass(index)} z-0`}
                      style={{ 
                        transform: 'translateX(50%)',
                        width: 'calc(100% - 2rem)'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: status === 'completed' ? 1 : 0.3 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {config.stages.map((stageInfo, index) => {
            const status = getStageStatus(index);
            const colors = getStageColors(status, stageInfo.stage);
            const stageHistory = pipeline.stageHistory.find(h => h.stage === stageInfo.stage);
            
            return (
              <motion.div
                key={stageInfo.stage}
                className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Stage Node */}
                <motion.div
                  className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center ring-2 ${colors.ring} flex-shrink-0`}
                  whileHover={interactive ? { scale: 1.1 } : undefined}
                  onClick={() => interactive && onStageClick && onStageClick(stageInfo.stage)}
                >
                  {getStageIcon(stageInfo.stage, status)}
                </motion.div>

                {/* Stage Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-sm ${colors.text}`}>
                      {stageInfo.name}
                    </h4>
                    
                    <div className="flex items-center space-x-2">
                      {status === 'completed' && (
                        <span className="text-xs text-green-600 font-medium">Completed</span>
                      )}
                      {status === 'current' && (
                        <span className="text-xs text-blue-600 font-medium">Current</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {stageInfo.description}
                  </p>
                  
                  {showDetails && stageHistory && (
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      {stageHistory.enteredAt && (
                        <span>
                          Started: {new Date(stageHistory.enteredAt).toLocaleDateString()}
                        </span>
                      )}
                      {stageHistory.duration && (
                        <span>Duration: {stageHistory.duration}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Connection Line to Next Stage */}
                {index < config.stages.length - 1 && (
                  <div className="absolute left-10 mt-16 w-0.5 h-4 bg-gray-300 ml-px" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Overall Progress */}
      {showDetails && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900">{pipeline.progressPercentage}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pipeline.progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Current Stage:</span>{' '}
              {pipeline.currentStageNumber} of {pipeline.totalStages}
            </div>
            
            {pipeline.estimatedCompletion && (
              <div>
                <span className="font-medium">Est. Completion:</span>{' '}
                {pipeline.estimatedCompletion}
              </div>
            )}
            
            <div>
              <span className="font-medium">Last Updated:</span>{' '}
              {new Date(pipeline.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineFlowChart;