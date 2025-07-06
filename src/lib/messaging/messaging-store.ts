/**
 * Real-time Messaging Store
 * 
 * Zustand store for comprehensive messaging functionality
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  Message,
  Conversation,
  ConversationType,
  MessageType,
  MessagePriority,
  ConversationStatus,
  ConversationParticipant,
  MessageAttachment,
  MessageNotification,
  MessageNotificationType,
  TypingIndicator,
  OnlineStatus,
  MessageSearch,
  MessageSearchResult,
  MessageReaction,
  MessageEventType,
  type MessagingStore as IMessagingStore,
  DEFAULT_CONVERSATION_SETTINGS,
  DEFAULT_PARTICIPANT_PERMISSIONS,
  DEFAULT_NOTIFICATION_SETTINGS,
  ADMIN_PARTICIPANT_PERMISSIONS
} from '@/types/messaging';
import { UserRole } from '@/types/business';
import { generateId } from '@/lib/utils/id-generator';

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState = {
  conversations: {} as Record<string, Conversation>,
  messages: {} as Record<string, Message[]>,
  activeConversationId: null as string | null,
  typingIndicators: [] as TypingIndicator[],
  onlineUsers: {} as Record<string, OnlineStatus>,
  notifications: [] as MessageNotification[],
  searchResults: [] as MessageSearchResult[],
  loading: false,
  error: null as string | null
};

// ============================================================================
// MESSAGING STORE IMPLEMENTATION
// ============================================================================

interface MessagingStore extends IMessagingStore {
  // Additional computed properties
  unreadConversations: Conversation[];
  activeConversation: Conversation | null;
  currentTypingUsers: string[];
  
  // Mock data methods
  createMockConversation: (applicationId: string, type: ConversationType) => Promise<string>;
  generateMockMessages: (conversationId: string, count: number) => void;
  simulateTyping: (conversationId: string, userId: string, duration: number) => void;
  simulateOnlineStatus: (userId: string, isOnline: boolean) => void;
}

export const useMessagingStore = create<MessagingStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // ========================================================================
        // COMPUTED PROPERTIES
        // ========================================================================

        get unreadConversations() {
          const { conversations } = get();
          return Object.values(conversations).filter(conv => 
            get().getUnreadCount(conv.id) > 0
          );
        },

        get activeConversation() {
          const { conversations, activeConversationId } = get();
          return activeConversationId ? conversations[activeConversationId] || null : null;
        },

        get currentTypingUsers() {
          const { typingIndicators, activeConversationId } = get();
          if (!activeConversationId) return [];
          
          const now = new Date();
          return typingIndicators
            .filter(t => 
              t.conversationId === activeConversationId && 
              new Date(t.expiresAt) > now
            )
            .map(t => t.userName);
        },

        // ========================================================================
        // CONVERSATION MANAGEMENT
        // ========================================================================

        createConversation: async (conversationData) => {
          const id = generateId();
          const now = new Date().toISOString();
          
          const conversation: Conversation = {
            id,
            ...conversationData,
            createdAt: now,
            updatedAt: now,
            unreadCount: {},
            isArchived: false,
            settings: { ...DEFAULT_CONVERSATION_SETTINGS, ...conversationData.settings },
            status: ConversationStatus.ACTIVE
          };

          set(state => ({
            conversations: {
              ...state.conversations,
              [id]: conversation
            },
            messages: {
              ...state.messages,
              [id]: []
            }
          }));

          // Create welcome system message
          if (conversation.type === ConversationType.APPLICATION) {
            await get().sendMessage(id, {
              senderId: 'system',
              senderName: 'System',
              senderRole: UserRole.ADMIN,
              content: `Application conversation created. All participants can now communicate about this application.`,
              messageType: MessageType.SYSTEM,
              conversationId: id,
              attachments: [],
              metadata: {
                applicationId: conversation.applicationId,
                isInternal: false
              }
            });
          }

          return id;
        },

        getConversation: (conversationId: string) => {
          return get().conversations[conversationId] || null;
        },

        updateConversation: async (conversationId: string, updates: Partial<Conversation>) => {
          set(state => ({
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...state.conversations[conversationId],
                ...updates,
                updatedAt: new Date().toISOString()
              }
            }
          }));
        },

        deleteConversation: async (conversationId: string) => {
          set(state => {
            const newConversations = { ...state.conversations };
            const newMessages = { ...state.messages };
            delete newConversations[conversationId];
            delete newMessages[conversationId];
            
            return {
              conversations: newConversations,
              messages: newMessages,
              activeConversationId: state.activeConversationId === conversationId 
                ? null 
                : state.activeConversationId
            };
          });
        },

        archiveConversation: async (conversationId: string) => {
          await get().updateConversation(conversationId, {
            isArchived: true,
            archivedAt: new Date().toISOString(),
            status: ConversationStatus.ARCHIVED
          });
        },

        unarchiveConversation: async (conversationId: string) => {
          await get().updateConversation(conversationId, {
            isArchived: false,
            archivedAt: undefined,
            status: ConversationStatus.ACTIVE
          });
        },

        // ========================================================================
        // PARTICIPANT MANAGEMENT
        // ========================================================================

        addParticipant: async (conversationId: string, participant: ConversationParticipant) => {
          const conversation = get().conversations[conversationId];
          if (!conversation) return;

          const updatedParticipants = [...conversation.participants, participant];
          await get().updateConversation(conversationId, {
            participants: updatedParticipants
          });

          // Send system message
          await get().sendMessage(conversationId, {
            senderId: 'system',
            senderName: 'System',
            senderRole: UserRole.ADMIN,
            content: `${participant.userName} joined the conversation`,
            messageType: MessageType.SYSTEM,
            conversationId,
            attachments: [],
            metadata: { isInternal: false }
          });
        },

        removeParticipant: async (conversationId: string, userId: string) => {
          const conversation = get().conversations[conversationId];
          if (!conversation) return;

          const participant = conversation.participants.find(p => p.userId === userId);
          const updatedParticipants = conversation.participants.filter(p => p.userId !== userId);
          
          await get().updateConversation(conversationId, {
            participants: updatedParticipants
          });

          if (participant) {
            // Send system message
            await get().sendMessage(conversationId, {
              senderId: 'system',
              senderName: 'System',
              senderRole: UserRole.ADMIN,
              content: `${participant.userName} left the conversation`,
              messageType: MessageType.SYSTEM,
              conversationId,
              attachments: [],
              metadata: { isInternal: false }
            });
          }
        },

        updateParticipantPermissions: async (conversationId: string, userId: string, permissions) => {
          const conversation = get().conversations[conversationId];
          if (!conversation) return;

          const updatedParticipants = conversation.participants.map(p =>
            p.userId === userId
              ? { ...p, permissions: { ...p.permissions, ...permissions } }
              : p
          );

          await get().updateConversation(conversationId, {
            participants: updatedParticipants
          });
        },

        // ========================================================================
        // MESSAGE MANAGEMENT
        // ========================================================================

        sendMessage: async (conversationId: string, messageData) => {
          const id = generateId();
          const now = new Date().toISOString();

          const message: Message = {
            id,
            ...messageData,
            sentAt: now,
            readBy: [{
              userId: messageData.senderId,
              userName: messageData.senderName,
              readAt: now
            }],
            reactions: []
          };

          set(state => ({
            messages: {
              ...state.messages,
              [conversationId]: [...(state.messages[conversationId] || []), message]
            }
          }));

          // Update conversation last message and unread counts
          const conversation = get().conversations[conversationId];
          if (conversation) {
            const newUnreadCount = { ...conversation.unreadCount };
            conversation.participants.forEach(participant => {
              if (participant.userId !== messageData.senderId) {
                newUnreadCount[participant.userId] = (newUnreadCount[participant.userId] || 0) + 1;
              }
            });

            await get().updateConversation(conversationId, {
              lastMessage: message,
              unreadCount: newUnreadCount
            });

            // Create notifications for participants
            await get().createMessageNotifications(message, conversation);
          }

          return id;
        },

        editMessage: async (messageId: string, content: string) => {
          set(state => ({
            messages: Object.fromEntries(
              Object.entries(state.messages).map(([convId, messages]) => [
                convId,
                messages.map(msg =>
                  msg.id === messageId
                    ? {
                        ...msg,
                        content,
                        editedAt: new Date().toISOString()
                      }
                    : msg
                )
              ])
            )
          }));
        },

        deleteMessage: async (messageId: string) => {
          set(state => ({
            messages: Object.fromEntries(
              Object.entries(state.messages).map(([convId, messages]) => [
                convId,
                messages.map(msg =>
                  msg.id === messageId
                    ? {
                        ...msg,
                        isDeleted: true,
                        deletedAt: new Date().toISOString(),
                        content: 'This message has been deleted'
                      }
                    : msg
                )
              ])
            )
          }));
        },

        replyToMessage: async (conversationId: string, replyToId: string, messageData) => {
          return await get().sendMessage(conversationId, {
            ...messageData,
            replyToId
          });
        },

        // ========================================================================
        // MESSAGE INTERACTIONS
        // ========================================================================

        markAsRead: async (conversationId: string, messageId: string) => {
          const currentUserId = 'current-user-id'; // Would come from auth store
          const currentUserName = 'Current User'; // Would come from auth store
          const now = new Date().toISOString();

          set(state => ({
            messages: {
              ...state.messages,
              [conversationId]: (state.messages[conversationId] || []).map(msg =>
                msg.id === messageId && !msg.readBy.some(r => r.userId === currentUserId)
                  ? {
                      ...msg,
                      readBy: [
                        ...msg.readBy,
                        {
                          userId: currentUserId,
                          userName: currentUserName,
                          readAt: now
                        }
                      ]
                    }
                  : msg
              )
            }
          }));
        },

        markConversationAsRead: async (conversationId: string) => {
          const currentUserId = 'current-user-id'; // Would come from auth store
          const messages = get().messages[conversationId] || [];
          
          for (const message of messages) {
            if (!message.readBy.some(r => r.userId === currentUserId)) {
              await get().markAsRead(conversationId, message.id);
            }
          }

          // Reset unread count for current user
          const conversation = get().conversations[conversationId];
          if (conversation) {
            const newUnreadCount = { ...conversation.unreadCount };
            newUnreadCount[currentUserId] = 0;
            
            await get().updateConversation(conversationId, {
              unreadCount: newUnreadCount
            });
          }
        },

        addReaction: async (messageId: string, emoji: string) => {
          const currentUserId = 'current-user-id'; // Would come from auth store
          const currentUserName = 'Current User'; // Would come from auth store

          const reaction: MessageReaction = {
            id: generateId(),
            userId: currentUserId,
            userName: currentUserName,
            emoji,
            reactedAt: new Date().toISOString()
          };

          set(state => ({
            messages: Object.fromEntries(
              Object.entries(state.messages).map(([convId, messages]) => [
                convId,
                messages.map(msg =>
                  msg.id === messageId
                    ? {
                        ...msg,
                        reactions: [...msg.reactions.filter(r => r.userId !== currentUserId || r.emoji !== emoji), reaction]
                      }
                    : msg
                )
              ])
            )
          }));
        },

        removeReaction: async (messageId: string, reactionId: string) => {
          set(state => ({
            messages: Object.fromEntries(
              Object.entries(state.messages).map(([convId, messages]) => [
                convId,
                messages.map(msg =>
                  msg.id === messageId
                    ? {
                        ...msg,
                        reactions: msg.reactions.filter(r => r.id !== reactionId)
                      }
                    : msg
                )
              ])
            )
          }));
        },

        // ========================================================================
        // FILE MANAGEMENT
        // ========================================================================

        uploadFile: async (conversationId: string, file: File): Promise<MessageAttachment> => {
          // Simulate file upload
          await new Promise(resolve => setTimeout(resolve, 1000));

          const attachment: MessageAttachment = {
            id: generateId(),
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            downloadUrl: URL.createObjectURL(file), // In real app, this would be server URL
            thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
            uploadedAt: new Date().toISOString()
          };

          // Send file message
          await get().sendMessage(conversationId, {
            senderId: 'current-user-id',
            senderName: 'Current User',
            senderRole: UserRole.APPLICANT,
            content: `Shared ${file.name}`,
            messageType: MessageType.FILE_UPLOAD,
            conversationId,
            attachments: [attachment],
            metadata: {
              priority: MessagePriority.NORMAL
            }
          });

          return attachment;
        },

        downloadFile: async (attachmentId: string) => {
          // In real implementation, this would fetch from server
          console.log('Downloading file:', attachmentId);
        },

        // ========================================================================
        // SEARCH
        // ========================================================================

        searchMessages: async (searchParams: MessageSearch): Promise<MessageSearchResult[]> => {
          const { messages, conversations } = get();
          const results: MessageSearchResult[] = [];

          Object.entries(messages).forEach(([conversationId, conversationMessages]) => {
            if (searchParams.conversationId && conversationId !== searchParams.conversationId) {
              return;
            }

            const conversation = conversations[conversationId];
            if (!conversation) return;

            conversationMessages.forEach(message => {
              let matches = true;

              // Text search
              if (searchParams.query && !message.content.toLowerCase().includes(searchParams.query.toLowerCase())) {
                matches = false;
              }

              // Sender filter
              if (searchParams.senderId && message.senderId !== searchParams.senderId) {
                matches = false;
              }

              // Message type filter
              if (searchParams.messageType && message.messageType !== searchParams.messageType) {
                matches = false;
              }

              // Date range filter
              if (searchParams.dateRange) {
                const messageDate = new Date(message.sentAt);
                const start = new Date(searchParams.dateRange.start);
                const end = new Date(searchParams.dateRange.end);
                if (messageDate < start || messageDate > end) {
                  matches = false;
                }
              }

              // Attachments filter
              if (searchParams.hasAttachments !== undefined) {
                const hasAttachments = message.attachments.length > 0;
                if (hasAttachments !== searchParams.hasAttachments) {
                  matches = false;
                }
              }

              if (matches) {
                results.push({
                  message,
                  conversation,
                  highlights: searchParams.query ? [searchParams.query] : [],
                  relevanceScore: 1.0
                });
              }
            });
          });

          set({ searchResults: results });
          return results;
        },

        clearSearchResults: () => {
          set({ searchResults: [] });
        },

        // ========================================================================
        // REAL-TIME FEATURES
        // ========================================================================

        setActiveConversation: (conversationId: string | null) => {
          set({ activeConversationId: conversationId });
          
          if (conversationId) {
            // Mark conversation as read when opened
            get().markConversationAsRead(conversationId);
          }
        },

        startTyping: (conversationId: string) => {
          const currentUserId = 'current-user-id';
          const currentUserName = 'Current User';
          const now = new Date();
          const expiresAt = new Date(now.getTime() + 5000); // 5 seconds

          const typingIndicator: TypingIndicator = {
            conversationId,
            userId: currentUserId,
            userName: currentUserName,
            startedAt: now.toISOString(),
            expiresAt: expiresAt.toISOString()
          };

          set(state => ({
            typingIndicators: [
              ...state.typingIndicators.filter(t => 
                !(t.conversationId === conversationId && t.userId === currentUserId)
              ),
              typingIndicator
            ]
          }));
        },

        stopTyping: (conversationId: string) => {
          const currentUserId = 'current-user-id';
          
          set(state => ({
            typingIndicators: state.typingIndicators.filter(t => 
              !(t.conversationId === conversationId && t.userId === currentUserId)
            )
          }));
        },

        updateOnlineStatus: (isOnline: boolean) => {
          const currentUserId = 'current-user-id';
          
          const status: OnlineStatus = {
            userId: currentUserId,
            isOnline,
            lastSeenAt: new Date().toISOString(),
            currentActivity: isOnline ? 'active' : undefined
          };

          set(state => ({
            onlineUsers: {
              ...state.onlineUsers,
              [currentUserId]: status
            }
          }));
        },

        // ========================================================================
        // NOTIFICATIONS
        // ========================================================================

        createMessageNotifications: async (message: Message, conversation: Conversation) => {
          const notifications: MessageNotification[] = [];
          
          conversation.participants.forEach(participant => {
            if (participant.userId === message.senderId) return;
            if (!participant.notificationSettings.enabled) return;

            let notificationType = MessageNotificationType.NEW_MESSAGE;
            
            // Determine notification type
            if (conversation.type === ConversationType.DIRECT) {
              notificationType = MessageNotificationType.DIRECT_MESSAGE;
            } else if (message.content.includes(`@${participant.userName}`)) {
              notificationType = MessageNotificationType.MENTION;
            } else if (message.metadata?.priority === MessagePriority.URGENT) {
              notificationType = MessageNotificationType.URGENT_MESSAGE;
            }

            const notification: MessageNotification = {
              id: generateId(),
              userId: participant.userId,
              conversationId: conversation.id,
              messageId: message.id,
              type: notificationType,
              title: `New message from ${message.senderName}`,
              body: message.content.substring(0, 100),
              priority: message.metadata?.priority || MessagePriority.NORMAL,
              sentAt: new Date().toISOString(),
              actionUrl: `/dashboard/messages/${conversation.id}`,
              metadata: {
                senderName: message.senderName,
                conversationTitle: conversation.title
              }
            };

            notifications.push(notification);
          });

          set(state => ({
            notifications: [...state.notifications, ...notifications]
          }));
        },

        getUnreadNotifications: () => {
          const currentUserId = 'current-user-id';
          return get().notifications.filter(n => n.userId === currentUserId && !n.readAt);
        },

        markNotificationAsRead: async (notificationId: string) => {
          set(state => ({
            notifications: state.notifications.map(n =>
              n.id === notificationId
                ? { ...n, readAt: new Date().toISOString() }
                : n
            )
          }));
        },

        clearAllNotifications: async () => {
          const currentUserId = 'current-user-id';
          set(state => ({
            notifications: state.notifications.filter(n => n.userId !== currentUserId)
          }));
        },

        // ========================================================================
        // UTILITY METHODS
        // ========================================================================

        getUnreadCount: (conversationId: string) => {
          const currentUserId = 'current-user-id';
          const conversation = get().conversations[conversationId];
          return conversation?.unreadCount[currentUserId] || 0;
        },

        getTotalUnreadCount: () => {
          const { conversations } = get();
          const currentUserId = 'current-user-id';
          
          return Object.values(conversations).reduce((total, conversation) => {
            return total + (conversation.unreadCount[currentUserId] || 0);
          }, 0);
        },

        getConversationsByType: (type: ConversationType) => {
          return Object.values(get().conversations).filter(conv => conv.type === type);
        },

        getApplicationConversation: (applicationId: string) => {
          return Object.values(get().conversations).find(conv => 
            conv.type === ConversationType.APPLICATION && conv.applicationId === applicationId
          ) || null;
        },

        createApplicationConversation: async (applicationId: string, participantIds: string[]) => {
          const participants: ConversationParticipant[] = participantIds.map((userId, index) => ({
            userId,
            userName: `User ${index + 1}`, // Would fetch from user store
            userRole: index === 0 ? UserRole.APPLICANT : UserRole.CONSULTANT, // First user is applicant
            joinedAt: new Date().toISOString(),
            permissions: index === 0 ? DEFAULT_PARTICIPANT_PERMISSIONS : ADMIN_PARTICIPANT_PERMISSIONS,
            isOnline: false,
            notificationSettings: DEFAULT_NOTIFICATION_SETTINGS
          }));

          return await get().createConversation({
            title: `Application ${applicationId}`,
            description: `Communication thread for application ${applicationId}`,
            type: ConversationType.APPLICATION,
            applicationId,
            participants,
            createdBy: participantIds[0],
            settings: DEFAULT_CONVERSATION_SETTINGS,
            metadata: {
              priority: MessagePriority.NORMAL,
              tags: ['application'],
              relatedDocuments: [],
              relatedStages: [],
              customFields: { applicationId }
            }
          });
        },

        // ========================================================================
        // MOCK DATA METHODS
        // ========================================================================

        createMockConversation: async (applicationId: string, type: ConversationType) => {
          const participants: ConversationParticipant[] = [
            {
              userId: 'user-1',
              userName: 'John Applicant',
              userRole: UserRole.APPLICANT,
              userAvatar: '/avatars/user-1.jpg',
              joinedAt: new Date().toISOString(),
              permissions: DEFAULT_PARTICIPANT_PERMISSIONS,
              isOnline: true,
              notificationSettings: DEFAULT_NOTIFICATION_SETTINGS
            },
            {
              userId: 'user-2',
              userName: 'Sarah Consultant',
              userRole: UserRole.CONSULTANT,
              userAvatar: '/avatars/user-2.jpg',
              joinedAt: new Date().toISOString(),
              permissions: ADMIN_PARTICIPANT_PERMISSIONS,
              isOnline: false,
              lastSeenAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
              notificationSettings: DEFAULT_NOTIFICATION_SETTINGS
            }
          ];

          return await get().createConversation({
            title: type === ConversationType.APPLICATION ? `Application ${applicationId}` : 'General Discussion',
            description: `Communication for application ${applicationId}`,
            type,
            applicationId: type === ConversationType.APPLICATION ? applicationId : undefined,
            participants,
            createdBy: 'user-1',
            settings: DEFAULT_CONVERSATION_SETTINGS,
            metadata: {
              priority: MessagePriority.NORMAL,
              tags: ['application', 'support'],
              relatedDocuments: [],
              relatedStages: [],
              customFields: { applicationId }
            }
          });
        },

        generateMockMessages: (conversationId: string, count: number) => {
          const messages = [
            'Hello! I have a question about my application status.',
            'Hi there! I\'d be happy to help you with that.',
            'Could you please check the document review stage?',
            'I can see that your documents are currently under review. Expected completion is 2-3 business days.',
            'Thank you for the update! Is there anything I need to do in the meantime?',
            'No action required on your end. We\'ll notify you once the review is complete.',
            'Great! I appreciate your help.',
            'You\'re welcome! Feel free to reach out if you have any other questions.'
          ];

          for (let i = 0; i < Math.min(count, messages.length); i++) {
            const isFromApplicant = i % 2 === 0;
            get().sendMessage(conversationId, {
              senderId: isFromApplicant ? 'user-1' : 'user-2',
              senderName: isFromApplicant ? 'John Applicant' : 'Sarah Consultant',
              senderRole: isFromApplicant ? UserRole.APPLICANT : UserRole.CONSULTANT,
              content: messages[i],
              messageType: MessageType.TEXT,
              conversationId,
              attachments: [],
              metadata: {
                priority: MessagePriority.NORMAL
              }
            });
          }
        },

        simulateTyping: (conversationId: string, userId: string, duration: number) => {
          const userName = userId === 'user-1' ? 'John Applicant' : 'Sarah Consultant';
          const now = new Date();
          const expiresAt = new Date(now.getTime() + duration);

          const typingIndicator: TypingIndicator = {
            conversationId,
            userId,
            userName,
            startedAt: now.toISOString(),
            expiresAt: expiresAt.toISOString()
          };

          set(state => ({
            typingIndicators: [
              ...state.typingIndicators.filter(t => 
                !(t.conversationId === conversationId && t.userId === userId)
              ),
              typingIndicator
            ]
          }));

          // Auto-remove after duration
          setTimeout(() => {
            set(state => ({
              typingIndicators: state.typingIndicators.filter(t => t.userId !== userId)
            }));
          }, duration);
        },

        simulateOnlineStatus: (userId: string, isOnline: boolean) => {
          const status: OnlineStatus = {
            userId,
            isOnline,
            lastSeenAt: new Date().toISOString(),
            currentActivity: isOnline ? 'active' : undefined
          };

          set(state => ({
            onlineUsers: {
              ...state.onlineUsers,
              [userId]: status
            }
          }));
        }
      }),
      {
        name: 'messaging-storage',
        partialize: (state) => ({
          conversations: state.conversations,
          messages: state.messages,
          notifications: state.notifications
        })
      }
    ),
    { name: 'MessagingStore' }
  )
);

export default useMessagingStore;