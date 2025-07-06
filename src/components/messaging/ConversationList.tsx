/**
 * Conversation List Component
 * 
 * Sidebar showing all conversations with search and filtering
 */

'use client';

import { useState, useMemo } from 'react';
import { useMessagingStore } from '@/lib/messaging/messaging-store';
import { Conversation, ConversationType } from '@/types/messaging';
import { UserRole } from '@/types/business';
import { 
  Search,
  Plus,
  Filter,
  MessageSquare,
  Users,
  Settings,
  Archive,
  MoreHorizontal,
  Clock,
  CheckCircle,
  Circle
} from 'lucide-react';

interface ConversationListProps {
  userId: string;
  userRole: UserRole;
  filter?: ConversationType;
  showArchived?: boolean;
  onConversationSelect: (conversationId: string) => void;
  className?: string;
}

export function ConversationList({
  userId,
  userRole,
  filter,
  showArchived = false,
  onConversationSelect,
  className = ''
}: ConversationListProps) {
  const {
    conversations,
    activeConversationId,
    getUnreadCount,
    createConversation,
    archiveConversation,
    unarchiveConversation,
    onlineUsers
  } = useMessagingStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<ConversationType | 'all'>('all');
  const [showNewConversationModal, setShowNewConversationModal] = useState(false);

  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  const filteredConversations = useMemo(() => {
    let filtered = Object.values(conversations);

    // Filter by archived status
    filtered = filtered.filter(conv => conv.isArchived === showArchived);

    // Filter by type
    if (filter) {
      filtered = filtered.filter(conv => conv.type === filter);
    } else if (selectedFilter !== 'all') {
      filtered = filtered.filter(conv => conv.type === selectedFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(conv =>
        conv.title.toLowerCase().includes(query) ||
        conv.description?.toLowerCase().includes(query) ||
        conv.lastMessage?.content.toLowerCase().includes(query) ||
        conv.participants.some(p => p.userName.toLowerCase().includes(query))
      );
    }

    // Sort by last message date
    return filtered.sort((a, b) => {
      const aTime = a.lastMessage ? new Date(a.lastMessage.sentAt).getTime() : new Date(a.updatedAt).getTime();
      const bTime = b.lastMessage ? new Date(b.lastMessage.sentAt).getTime() : new Date(b.updatedAt).getTime();
      return bTime - aTime;
    });
  }, [conversations, showArchived, filter, selectedFilter, searchQuery]);

  // ========================================================================
  // UTILITY FUNCTIONS
  // ========================================================================

  const formatLastMessageTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffMinutes = Math.floor(diffMs / (60 * 1000));

    if (diffDays > 0) {
      return diffDays === 1 ? 'Yesterday' : `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const getConversationIcon = (type: ConversationType) => {
    switch (type) {
      case ConversationType.DIRECT:
        return <MessageSquare className="h-4 w-4" />;
      case ConversationType.GROUP:
        return <Users className="h-4 w-4" />;
      case ConversationType.APPLICATION:
        return <Settings className="h-4 w-4" />;
      case ConversationType.SUPPORT:
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getParticipantAvatars = (conversation: Conversation) => {
    const otherParticipants = conversation.participants.filter(p => p.userId !== userId);
    return otherParticipants.slice(0, 3); // Show max 3 avatars
  };

  const isParticipantOnline = (participantId: string) => {
    return onlineUsers[participantId]?.isOnline || false;
  };

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  const handleConversationClick = (conversation: Conversation) => {
    onConversationSelect(conversation.id);
  };

  const handleArchiveConversation = async (conversationId: string, isArchived: boolean) => {
    if (isArchived) {
      await unarchiveConversation(conversationId);
    } else {
      await archiveConversation(conversationId);
    }
  };

  const handleCreateConversation = async () => {
    // This would open a modal to create a new conversation
    setShowNewConversationModal(true);
  };

  // ========================================================================
  // RENDER METHODS
  // ========================================================================

  const renderSearchAndFilters = () => (
    <div className="p-4 border-b border-gray-200 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value as any)}
          className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Types</option>
          <option value={ConversationType.DIRECT}>Direct</option>
          <option value={ConversationType.APPLICATION}>Application</option>
          <option value={ConversationType.GROUP}>Group</option>
          <option value={ConversationType.SUPPORT}>Support</option>
        </select>

        <button
          onClick={handleCreateConversation}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          New
        </button>
      </div>
    </div>
  );

  const renderConversationItem = (conversation: Conversation) => {
    const unreadCount = getUnreadCount(conversation.id);
    const isActive = activeConversationId === conversation.id;
    const avatars = getParticipantAvatars(conversation);
    const lastMessageTime = conversation.lastMessage 
      ? formatLastMessageTime(conversation.lastMessage.sentAt)
      : formatLastMessageTime(conversation.updatedAt);

    return (
      <div
        key={conversation.id}
        onClick={() => handleConversationClick(conversation)}
        className={`
          relative p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors
          ${isActive ? 'bg-primary-50 border-primary-200' : ''}
        `}
      >
        <div className="flex items-start space-x-3">
          {/* Avatar(s) */}
          <div className="flex-shrink-0 relative">
            {avatars.length === 1 ? (
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  {avatars[0].userAvatar ? (
                    <img
                      src={avatars[0].userAvatar}
                      alt={avatars[0].userName}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-700">
                      {avatars[0].userName.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                {isParticipantOnline(avatars[0].userId) && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
                )}
              </div>
            ) : (
              <div className="relative h-10 w-10">
                {avatars.slice(0, 2).map((participant, index) => (
                  <div
                    key={participant.userId}
                    className={`absolute h-7 w-7 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-700 ${
                      index === 0 ? 'top-0 left-0' : 'bottom-0 right-0'
                    }`}
                  >
                    {participant.userAvatar ? (
                      <img
                        src={participant.userAvatar}
                        alt={participant.userName}
                        className="h-7 w-7 rounded-full"
                      />
                    ) : (
                      participant.userName.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                {getConversationIcon(conversation.type)}
                <h4 className={`text-sm font-medium truncate ${
                  unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {conversation.title}
                </h4>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {lastMessageTime}
                </span>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center h-5 w-5 text-xs font-medium rounded-full bg-primary-600 text-white">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </div>
            </div>

            {/* Last Message */}
            {conversation.lastMessage && (
              <div className="flex items-center space-x-2">
                <p className={`text-sm truncate ${
                  unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                }`}>
                  {conversation.lastMessage.senderName === 'Current User' 
                    ? 'You: ' 
                    : `${conversation.lastMessage.senderName}: `
                  }
                  {conversation.lastMessage.content}
                </p>
              </div>
            )}

            {/* Participants Preview */}
            {conversation.type === ConversationType.GROUP && (
              <div className="flex items-center mt-1">
                <Users className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">
                  {conversation.participants.length} members
                </span>
              </div>
            )}
          </div>

          {/* Options Menu */}
          <div className="flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleArchiveConversation(conversation.id, conversation.isArchived);
              }}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              {conversation.isArchived ? (
                <Circle className="h-4 w-4" />
              ) : (
                <Archive className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Active Indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600"></div>
        )}
      </div>
    );
  };

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {showArchived ? 'Archived' : 'Messages'}
        </h2>
        <button
          className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Search and Filters */}
      {renderSearchAndFilters()}

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map(renderConversationItem)
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No matching conversations' : 'No conversations yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? 'Try adjusting your search terms'
                : 'Start a conversation to begin messaging'
              }
            </p>
            {!searchQuery && (
              <button
                onClick={handleCreateConversation}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Start Conversation
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{filteredConversations.length} conversations</span>
          {!showArchived && (
            <button
              onClick={() => {/* Toggle to archived view */}}
              className="text-primary-600 hover:text-primary-700"
            >
              View archived
            </button>
          )}
        </div>
      </div>
    </div>
  );
}