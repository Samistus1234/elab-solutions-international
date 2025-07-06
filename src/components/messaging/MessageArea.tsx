/**
 * Message Area Component
 * 
 * Scrollable area displaying messages in a conversation
 */

'use client';

import { forwardRef, useEffect, useState } from 'react';
import { useMessagingStore } from '@/lib/messaging/messaging-store';
import { MessageBubble } from './MessageBubble';
import { Message, MessageType } from '@/types/messaging';
import { UserRole } from '@/types/business';
import { 
  Loader2,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

interface MessageAreaProps {
  conversationId: string;
  userRole: UserRole;
  className?: string;
}

export const MessageArea = forwardRef<HTMLDivElement, MessageAreaProps>(
  ({ conversationId, userRole, className = '' }, ref) => {
    const {
      messages,
      loading,
      error,
      markAsRead,
      currentTypingUsers
    } = useMessagingStore();

    const [autoScroll, setAutoScroll] = useState(true);
    const [isNearBottom, setIsNearBottom] = useState(true);

    const conversationMessages = messages[conversationId] || [];
    const currentUserId = 'current-user-id'; // Would come from auth store

    // ========================================================================
    // EFFECTS
    // ========================================================================

    useEffect(() => {
      // Mark messages as read when they come into view
      conversationMessages.forEach(message => {
        if (message.senderId !== currentUserId && !message.readBy.some(r => r.userId === currentUserId)) {
          markAsRead(conversationId, message.id);
        }
      });
    }, [conversationMessages, conversationId, currentUserId, markAsRead]);

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const nearBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      setIsNearBottom(nearBottom);
      setAutoScroll(nearBottom);
    };

    const handleReplyToMessage = (messageId: string) => {
      // This would trigger the message input to show reply context
      console.log('Reply to message:', messageId);
    };

    const handleEditMessage = (messageId: string, content: string) => {
      // This would open an edit modal or inline editor
      console.log('Edit message:', messageId, content);
    };

    const handleDeleteMessage = (messageId: string) => {
      // This would show a confirmation dialog
      console.log('Delete message:', messageId);
    };

    const scrollToBottom = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    };

    // ========================================================================
    // UTILITY FUNCTIONS
    // ========================================================================

    const shouldShowDateSeparator = (message: Message, index: number) => {
      if (index === 0) return true;
      
      const previousMessage = conversationMessages[index - 1];
      const messageDate = new Date(message.sentAt).toDateString();
      const previousDate = new Date(previousMessage.sentAt).toDateString();
      
      return messageDate !== previousDate;
    };

    const shouldGroupWithPrevious = (message: Message, index: number) => {
      if (index === 0) return false;
      
      const previousMessage = conversationMessages[index - 1];
      const timeDiff = new Date(message.sentAt).getTime() - new Date(previousMessage.sentAt).getTime();
      const fiveMinutes = 5 * 60 * 1000;
      
      return (
        previousMessage.senderId === message.senderId &&
        timeDiff < fiveMinutes &&
        !shouldShowDateSeparator(message, index)
      );
    };

    const formatDateSeparator = (dateString: string) => {
      const date = new Date(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }
    };

    // ========================================================================
    // RENDER METHODS
    // ========================================================================

    const renderDateSeparator = (dateString: string) => (
      <div className="flex items-center justify-center my-4">
        <div className="bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-gray-600">
            {formatDateSeparator(dateString)}
          </span>
        </div>
      </div>
    );

    const renderSystemMessage = (message: Message) => (
      <div className="flex items-center justify-center my-2">
        <div className="bg-gray-100 px-3 py-1 rounded-full max-w-md">
          <span className="text-xs text-gray-600">
            {message.content}
          </span>
        </div>
      </div>
    );

    const renderTypingIndicator = () => {
      if (currentTypingUsers.length === 0) return null;

      return (
        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm text-gray-500">
            {currentTypingUsers.join(', ')} {currentTypingUsers.length === 1 ? 'is' : 'are'} typing...
          </span>
        </div>
      );
    };

    const renderScrollToBottomButton = () => {
      if (isNearBottom) return null;

      return (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-4 right-4 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          title="Scroll to bottom"
        >
          <MessageSquare className="h-4 w-4" />
        </button>
      );
    };

    const renderLoadingState = () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );

    const renderErrorState = () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-600 mb-2">Failed to load messages</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );

    const renderEmptyState = () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start the conversation</h3>
          <p className="text-gray-600">Send a message to begin this conversation</p>
        </div>
      </div>
    );

    // ========================================================================
    // MAIN RENDER
    // ========================================================================

    if (loading && conversationMessages.length === 0) {
      return (
        <div className={`relative ${className}`} ref={ref}>
          {renderLoadingState()}
        </div>
      );
    }

    if (error) {
      return (
        <div className={`relative ${className}`} ref={ref}>
          {renderErrorState()}
        </div>
      );
    }

    if (conversationMessages.length === 0) {
      return (
        <div className={`relative ${className}`} ref={ref}>
          {renderEmptyState()}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`relative overflow-y-auto p-4 space-y-1 ${className}`}
        onScroll={handleScroll}
        style={{ scrollBehavior: autoScroll ? 'smooth' : 'auto' }}
      >
        {conversationMessages.map((message, index) => {
          const isOwn = message.senderId === currentUserId;
          const showDateSeparator = shouldShowDateSeparator(message, index);
          const groupWithPrevious = shouldGroupWithPrevious(message, index);
          const showAvatar = !isOwn && !groupWithPrevious;
          const showTimestamp = !groupWithPrevious;

          return (
            <div key={message.id}>
              {/* Date Separator */}
              {showDateSeparator && renderDateSeparator(message.sentAt)}

              {/* System Message */}
              {message.messageType === MessageType.SYSTEM ? (
                renderSystemMessage(message)
              ) : (
                /* Regular Message */
                <MessageBubble
                  message={message}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                  showTimestamp={showTimestamp}
                  allowReactions={true}
                  allowEditing={isOwn && userRole !== UserRole.APPLICANT}
                  onReply={handleReplyToMessage}
                  onEdit={handleEditMessage}
                  onDelete={handleDeleteMessage}
                  className={`${groupWithPrevious ? 'mt-1' : 'mt-4'} ${
                    index === conversationMessages.length - 1 ? 'mb-4' : ''
                  }`}
                />
              )}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {renderTypingIndicator()}

        {/* Scroll to Bottom Button */}
        {renderScrollToBottomButton()}
      </div>
    );
  }
);

MessageArea.displayName = 'MessageArea';