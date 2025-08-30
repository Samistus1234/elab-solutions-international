/**
 * Chat Interface Component
 * 
 * Main chat interface with conversation list and message area
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useMessagingStore } from '@/lib/messaging/messaging-store';
import { ConversationList } from './ConversationList';
import { MessageArea } from './MessageArea';
import { ConversationHeader } from './ConversationHeader';
import { MessageInput } from './MessageInput';
import { ParticipantPanel } from './ParticipantPanel';
import { Conversation, ConversationType } from '@/types/messaging';
import { UserRole } from '@/types/business';
import { 
  MessageSquare,
  Users,
  Settings,
  Phone,
  Video,
  Info,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ChatInterfaceProps {
  conversationId?: string;
  applicationId?: string;
  userRole: UserRole;
  height?: string;
  showParticipants?: boolean;
  allowFileUpload?: boolean;
  className?: string;
}

export function ChatInterface({
  conversationId,
  applicationId,
  userRole,
  height = '600px',
  showParticipants = true,
  allowFileUpload = true,
  className = ''
}: ChatInterfaceProps) {
  const {
    activeConversation,
    activeConversationId,
    setActiveConversation,
    getApplicationConversation,
    createApplicationConversation,
    currentTypingUsers,
    getTotalUnreadCount,
    sendMessage
  } = useMessagingStore();

  const [showParticipantPanel, setShowParticipantPanel] = useState(showParticipants);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messageAreaRef = useRef<HTMLDivElement>(null);

  // ========================================================================
  // EFFECTS
  // ========================================================================

  useEffect(() => {
    // Auto-create or find application conversation
    if (applicationId) {
      const appConversation = getApplicationConversation(applicationId);
      if (appConversation) {
        setActiveConversation(appConversation.id);
      } else {
        // Create new application conversation
        const createConversation = async () => {
          const participants = ['current-user-id', 'consultant-user-id']; // Would be determined by application
          const newConversationId = await createApplicationConversation(applicationId, participants);
          setActiveConversation(newConversationId);
        };
        createConversation();
      }
    } else if (conversationId) {
      setActiveConversation(conversationId);
    }
  }, [applicationId, conversationId, setActiveConversation, getApplicationConversation, createApplicationConversation]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [activeConversation?.lastMessage]);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  const handleConversationSelect = (selectedConversationId: string) => {
    setActiveConversation(selectedConversationId);
  };

  const handleToggleParticipants = () => {
    setShowParticipantPanel(!showParticipantPanel);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleCloseChat = () => {
    setActiveConversation(null);
  };

  const handleSendMessage = async (messageData: any) => {
    if (activeConversation) {
      await sendMessage(activeConversation.id, messageData);
    }
  };

  // ========================================================================
  // RENDER METHODS
  // ========================================================================

  const renderChatHeader = () => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-3">
        <MessageSquare className="h-6 w-6 text-primary-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {activeConversation?.title || 'Messages'}
          </h3>
          {currentTypingUsers.length > 0 && (
            <p className="text-sm text-green-600">
              {currentTypingUsers.join(', ')} {currentTypingUsers.length === 1 ? 'is' : 'are'} typing...
            </p>
          )}
        </div>
        {getTotalUnreadCount() > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {getTotalUnreadCount()}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {activeConversation && (
          <>
            {/* Call Actions */}
            <button
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
              title="Voice call"
            >
              <Phone className="h-4 w-4" />
            </button>
            
            <button
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
              title="Video call"
            >
              <Video className="h-4 w-4" />
            </button>

            {/* Participants Toggle */}
            {showParticipants && (
              <button
                onClick={handleToggleParticipants}
                className={`p-2 rounded-md hover:bg-gray-100 ${
                  showParticipantPanel ? 'text-primary-600 bg-primary-50' : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Toggle participants"
              >
                <Users className="h-4 w-4" />
              </button>
            )}

            {/* Info */}
            <button
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
              title="Conversation info"
            >
              <Info className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Window Controls */}
        <div className="flex items-center space-x-1 border-l border-gray-200 pl-2 ml-2">
          <button
            onClick={handleMinimize}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
            title={isMinimized ? "Restore" : "Minimize"}
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleFullscreen}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleCloseChat}
            className="p-1 text-gray-400 hover:text-red-600 rounded"
            title="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => (
    <div className="flex flex-1 overflow-hidden">
      {/* Conversation List */}
      {!conversationId && (
        <div className="w-80 border-r border-gray-200 bg-gray-50">
          <ConversationList
            userId="current-user-id"
            userRole={userRole}
            onConversationSelect={handleConversationSelect}
            className="h-full"
          />
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Conversation Header */}
            <ConversationHeader
              conversation={activeConversation}
              userRole={userRole}
              onToggleParticipants={handleToggleParticipants}
            />

            {/* Messages Area */}
            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 flex flex-col">
                <MessageArea
                  ref={messageAreaRef}
                  conversationId={activeConversation.id}
                  userRole={userRole}
                  className="flex-1"
                />
                
                <MessageInput
                  conversationId={activeConversation.id}
                  userRole={userRole}
                  allowFileUpload={allowFileUpload}
                  placeholder={`Message ${activeConversation.title}...`}
                  onSendMessage={handleSendMessage}
                />
              </div>

              {/* Participant Panel */}
              {showParticipantPanel && showParticipants && (
                <ParticipantPanel
                  conversation={activeConversation}
                  userRole={userRole}
                  onClose={() => setShowParticipantPanel(false)}
                  className="w-80 border-l border-gray-200"
                />
              )}
            </div>
          </>
        ) : (
          /* No Conversation Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {conversationId ? 'Loading conversation...' : 'Select a conversation'}
              </h3>
              <p className="text-gray-600">
                {conversationId 
                  ? 'Please wait while we load your conversation'
                  : 'Choose a conversation from the list to start messaging'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  const containerClasses = `
    ${isFullscreen ? 'fixed inset-0 z-50' : 'relative'}
    ${isMinimized ? 'h-16' : ''}
    flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden
    ${className}
  `;

  const contentStyle = {
    height: isFullscreen ? '100vh' : isMinimized ? '64px' : height
  };

  return (
    <div className={containerClasses} style={contentStyle}>
      {/* Header */}
      {renderChatHeader()}

      {/* Main Content */}
      {!isMinimized && (
        <div className="flex-1 overflow-hidden">
          {renderMainContent()}
        </div>
      )}

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleFullscreen} />
      )}
    </div>
  );
}