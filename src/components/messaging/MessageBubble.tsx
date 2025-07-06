/**
 * Message Bubble Component
 * 
 * Individual message display with reactions and actions
 */

'use client';

import { useState } from 'react';
import { Message, MessageType, MessageReaction } from '@/types/messaging';
import { useMessagingStore } from '@/lib/messaging/messaging-store';
import { 
  MoreHorizontal,
  Reply,
  Edit,
  Trash2,
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  File,
  Phone,
  Video,
  Calendar,
  Clock,
  User,
  Check,
  CheckCheck
} from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  allowReactions?: boolean;
  allowEditing?: boolean;
  onReply?: (messageId: string) => void;
  onEdit?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  className?: string;
}

export function MessageBubble({
  message,
  isOwn,
  showAvatar = true,
  showTimestamp = true,
  allowReactions = true,
  allowEditing = false,
  onReply,
  onEdit,
  onDelete,
  className = ''
}: MessageBubbleProps) {
  const { addReaction, removeReaction, downloadFile } = useMessagingStore();
  const [showActions, setShowActions] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  // ========================================================================
  // UTILITY FUNCTIONS
  // ========================================================================

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <ImageIcon className="h-5 w-5" />;
    } else if (mimeType === 'application/pdf') {
      return <FileText className="h-5 w-5" />;
    } else {
      return <File className="h-5 w-5" />;
    }
  };

  const getMessageTypeIcon = (type: MessageType) => {
    switch (type) {
      case MessageType.VIDEO_CALL:
        return <Video className="h-4 w-4" />;
      case MessageType.VOICE_NOTE:
        return <Phone className="h-4 w-4" />;
      case MessageType.APPOINTMENT:
        return <Calendar className="h-4 w-4" />;
      case MessageType.STAGE_UPDATE:
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getReadStatus = () => {
    const readCount = message.readBy.length;
    const currentUserId = 'current-user-id';
    
    if (!isOwn) return null;
    
    if (readCount === 1) {
      // Only sender has read it
      return <Check className="h-3 w-3 text-gray-400" />;
    } else {
      // Others have read it
      return <CheckCheck className="h-3 w-3 text-blue-500" />;
    }
  };

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  const handleReactionClick = async (emoji: string) => {
    const currentUserId = 'current-user-id';
    const existingReaction = message.reactions.find(
      r => r.userId === currentUserId && r.emoji === emoji
    );

    if (existingReaction) {
      await removeReaction(message.id, existingReaction.id);
    } else {
      await addReaction(message.id, emoji);
    }
    
    setShowReactionPicker(false);
  };

  const handleDownloadAttachment = (attachmentId: string) => {
    downloadFile(attachmentId);
  };

  const handleEditClick = () => {
    onEdit?.(message.id, message.content);
    setShowActions(false);
  };

  const handleDeleteClick = () => {
    onDelete?.(message.id);
    setShowActions(false);
  };

  const handleReplyClick = () => {
    onReply?.(message.id);
    setShowActions(false);
  };

  // ========================================================================
  // RENDER METHODS
  // ========================================================================

  const renderAvatar = () => {
    if (!showAvatar || isOwn) return null;

    return (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
        {message.senderAvatar ? (
          <img
            src={message.senderAvatar}
            alt={message.senderName}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <span className="text-xs font-medium text-gray-700">
            {message.senderName.split(' ').map(n => n[0]).join('')}
          </span>
        )}
      </div>
    );
  };

  const renderMessageHeader = () => {
    if (!showAvatar || isOwn) return null;

    return (
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-sm font-medium text-gray-900">
          {message.senderName}
        </span>
        <span className="text-xs text-gray-500">
          {message.senderRole}
        </span>
        {showTimestamp && (
          <span className="text-xs text-gray-400">
            {formatTime(message.sentAt)}
          </span>
        )}
      </div>
    );
  };

  const renderAttachments = () => {
    if (message.attachments.length === 0) return null;

    return (
      <div className="space-y-2 mt-2">
        {message.attachments.map((attachment) => (
          <div key={attachment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              {getFileIcon(attachment.mimeType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {attachment.fileName}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(attachment.fileSize)}
              </p>
            </div>
            <div className="flex space-x-2">
              {attachment.thumbnailUrl && (
                <button
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="Preview"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => handleDownloadAttachment(attachment.id)}
                className="p-1 text-gray-400 hover:text-gray-600"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderReactions = () => {
    if (!allowReactions || message.reactions.length === 0) return null;

    // Group reactions by emoji
    const groupedReactions = message.reactions.reduce((acc, reaction) => {
      if (!acc[reaction.emoji]) {
        acc[reaction.emoji] = [];
      }
      acc[reaction.emoji].push(reaction);
      return acc;
    }, {} as Record<string, MessageReaction[]>);

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {Object.entries(groupedReactions).map(([emoji, reactions]) => {
          const currentUserId = 'current-user-id';
          const hasReacted = reactions.some(r => r.userId === currentUserId);
          
          return (
            <button
              key={emoji}
              onClick={() => handleReactionClick(emoji)}
              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors ${
                hasReacted
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
              title={reactions.map(r => r.userName).join(', ')}
            >
              <span>{emoji}</span>
              <span>{reactions.length}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderReactionPicker = () => {
    if (!showReactionPicker) return null;

    const commonEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];

    return (
      <div className="absolute bottom-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex space-x-1 z-10">
        {commonEmojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleReactionClick(emoji)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    );
  };

  const renderActionMenu = () => {
    if (!showActions) return null;

    return (
      <div className="absolute top-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
        {allowReactions && (
          <button
            onClick={() => {
              setShowReactionPicker(!showReactionPicker);
              setShowActions(false);
            }}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Add reaction
          </button>
        )}
        {onReply && (
          <button
            onClick={handleReplyClick}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </button>
        )}
        {allowEditing && onEdit && isOwn && (
          <button
            onClick={handleEditClick}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
        )}
        {onDelete && isOwn && (
          <button
            onClick={handleDeleteClick}
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        )}
      </div>
    );
  };

  const renderMessageContent = () => {
    const typeIcon = getMessageTypeIcon(message.messageType);

    return (
      <div
        className={`relative px-4 py-2 rounded-lg max-w-md break-words ${
          isOwn
            ? 'bg-primary-600 text-white ml-auto'
            : 'bg-white border border-gray-200 text-gray-900'
        } ${message.isDeleted ? 'opacity-50 italic' : ''}`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Message Type Icon */}
        {typeIcon && (
          <div className="flex items-center space-x-2 mb-2">
            {typeIcon}
            <span className="text-xs opacity-75">
              {message.messageType.replace(/_/g, ' ')}
            </span>
          </div>
        )}

        {/* Reply Context */}
        {message.replyToId && (
          <div className={`mb-2 p-2 rounded border-l-2 ${
            isOwn 
              ? 'bg-primary-700 border-primary-400' 
              : 'bg-gray-50 border-gray-300'
          }`}>
            <p className="text-xs opacity-75">Replying to message</p>
          </div>
        )}

        {/* Message Content */}
        <div className="space-y-2">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          
          {/* Attachments */}
          {renderAttachments()}
        </div>

        {/* Message Footer */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            {message.editedAt && (
              <span className="text-xs opacity-50">edited</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {isOwn && showTimestamp && (
              <span className="text-xs opacity-50">
                {formatTime(message.sentAt)}
              </span>
            )}
            {getReadStatus()}
          </div>
        </div>

        {/* Action Menu */}
        {renderActionMenu()}
        
        {/* Reaction Picker */}
        {renderReactionPicker()}
      </div>
    );
  };

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} ${className}`}>
      <div className={`flex space-x-3 max-w-full ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        {renderAvatar()}

        {/* Message Container */}
        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          {/* Message Header */}
          {renderMessageHeader()}

          {/* Message Content */}
          {renderMessageContent()}

          {/* Reactions */}
          {renderReactions()}

          {/* Timestamp (for own messages when no header) */}
          {isOwn && showTimestamp && !showAvatar && (
            <span className="text-xs text-gray-400 mt-1">
              {formatTime(message.sentAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}