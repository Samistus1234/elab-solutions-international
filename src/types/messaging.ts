/**
 * Real-time Messaging System Types
 * 
 * Comprehensive messaging system for application communication
 */

import { UserRole } from './business';
import { ApplicationStage } from './application-stages';

// ============================================================================
// CORE MESSAGING TYPES
// ============================================================================

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar?: string;
  content: string;
  messageType: MessageType;
  sentAt: string;
  editedAt?: string;
  readBy: MessageReadStatus[];
  reactions: MessageReaction[];
  attachments: MessageAttachment[];
  replyToId?: string;
  metadata?: MessageMetadata;
  isDeleted?: boolean;
  deletedAt?: string;
}

export enum MessageType {
  TEXT = 'text',
  SYSTEM = 'system',
  DOCUMENT_SHARE = 'document_share',
  STAGE_UPDATE = 'stage_update',
  APPOINTMENT = 'appointment',
  REMINDER = 'reminder',
  FILE_UPLOAD = 'file_upload',
  VIDEO_CALL = 'video_call',
  VOICE_NOTE = 'voice_note'
}

export interface MessageReadStatus {
  userId: string;
  userName: string;
  readAt: string;
}

export interface MessageReaction {
  id: string;
  userId: string;
  userName: string;
  emoji: string;
  reactedAt: string;
}

export interface MessageAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  downloadUrl: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

export interface MessageMetadata {
  applicationId?: string;
  documentId?: string;
  stageId?: string;
  appointmentId?: string;
  priority?: MessagePriority;
  tags?: string[];
  isInternal?: boolean;
  requiresResponse?: boolean;
  responseDeadline?: string;
}

export enum MessagePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

// ============================================================================
// CONVERSATION TYPES
// ============================================================================

export interface Conversation {
  id: string;
  title: string;
  description?: string;
  type: ConversationType;
  applicationId?: string;
  participants: ConversationParticipant[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  lastMessage?: Message;
  unreadCount: Record<string, number>; // userId -> count
  isArchived: boolean;
  archivedAt?: string;
  settings: ConversationSettings;
  metadata: ConversationMetadata;
  status: ConversationStatus;
}

export enum ConversationType {
  DIRECT = 'direct',
  APPLICATION = 'application',
  GROUP = 'group',
  SUPPORT = 'support',
  CONSULTATION = 'consultation',
  SYSTEM = 'system'
}

export interface ConversationParticipant {
  userId: string;
  userName: string;
  userRole: UserRole;
  userAvatar?: string;
  joinedAt: string;
  leftAt?: string;
  permissions: ParticipantPermissions;
  lastSeenAt?: string;
  isOnline: boolean;
  notificationSettings: ParticipantNotificationSettings;
}

export interface ParticipantPermissions {
  canSendMessages: boolean;
  canEditMessages: boolean;
  canDeleteMessages: boolean;
  canAddParticipants: boolean;
  canRemoveParticipants: boolean;
  canUploadFiles: boolean;
  canMentionUsers: boolean;
  canViewHistory: boolean;
}

export interface ParticipantNotificationSettings {
  enabled: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  mentionNotifications: boolean;
  muteUntil?: string;
}

export interface ConversationSettings {
  isPrivate: boolean;
  allowFileUploads: boolean;
  allowReactions: boolean;
  autoArchiveAfterDays?: number;
  requireApprovalForNewParticipants: boolean;
  messageRetentionDays?: number;
  allowedFileTypes: string[];
  maxFileSize: number;
}

export interface ConversationMetadata {
  applicationStage?: ApplicationStage;
  priority: MessagePriority;
  tags: string[];
  category?: string;
  relatedDocuments: string[];
  relatedStages: ApplicationStage[];
  customFields: Record<string, any>;
}

export enum ConversationStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  RESOLVED = 'resolved',
  ARCHIVED = 'archived',
  DELETED = 'deleted'
}

// ============================================================================
// MESSAGING FEATURES
// ============================================================================

export interface MessageThread {
  id: string;
  originalMessageId: string;
  messages: Message[];
  participantCount: number;
  createdAt: string;
  updatedAt: string;
  isResolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface MessageMention {
  id: string;
  messageId: string;
  mentionedUserId: string;
  mentionedUserName: string;
  mentionType: MentionType;
  position: number;
  length: number;
  notificationSent: boolean;
}

export enum MentionType {
  USER = 'user',
  ROLE = 'role',
  ALL = 'all',
  CHANNEL = 'channel'
}

export interface MessageSearch {
  query: string;
  conversationId?: string;
  senderId?: string;
  messageType?: MessageType;
  dateRange?: {
    start: string;
    end: string;
  };
  hasAttachments?: boolean;
  priority?: MessagePriority;
  tags?: string[];
}

export interface MessageSearchResult {
  message: Message;
  conversation: Conversation;
  highlights: string[];
  relevanceScore: number;
}

// ============================================================================
// REAL-TIME EVENTS
// ============================================================================

export interface MessageEvent {
  id: string;
  type: MessageEventType;
  conversationId: string;
  userId: string;
  userName: string;
  timestamp: string;
  data: Record<string, any>;
}

export enum MessageEventType {
  MESSAGE_SENT = 'message_sent',
  MESSAGE_EDITED = 'message_edited',
  MESSAGE_DELETED = 'message_deleted',
  MESSAGE_READ = 'message_read',
  USER_TYPING = 'user_typing',
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left',
  USER_ONLINE = 'user_online',
  USER_OFFLINE = 'user_offline',
  CONVERSATION_CREATED = 'conversation_created',
  CONVERSATION_UPDATED = 'conversation_updated',
  REACTION_ADDED = 'reaction_added',
  REACTION_REMOVED = 'reaction_removed'
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  userName: string;
  startedAt: string;
  expiresAt: string;
}

export interface OnlineStatus {
  userId: string;
  isOnline: boolean;
  lastSeenAt: string;
  currentActivity?: string;
}

// ============================================================================
// MESSAGING NOTIFICATIONS
// ============================================================================

export interface MessageNotification {
  id: string;
  userId: string;
  conversationId: string;
  messageId: string;
  type: MessageNotificationType;
  title: string;
  body: string;
  priority: MessagePriority;
  sentAt: string;
  readAt?: string;
  actionTaken?: boolean;
  actionUrl: string;
  metadata: Record<string, any>;
}

export enum MessageNotificationType {
  NEW_MESSAGE = 'new_message',
  MENTION = 'mention',
  DIRECT_MESSAGE = 'direct_message',
  APPLICATION_UPDATE = 'application_update',
  URGENT_MESSAGE = 'urgent_message',
  MISSED_CALL = 'missed_call',
  FILE_SHARED = 'file_shared',
  DEADLINE_REMINDER = 'deadline_reminder'
}

// ============================================================================
// MESSAGING STORE INTERFACE
// ============================================================================

export interface MessagingStore {
  // State
  conversations: Record<string, Conversation>;
  messages: Record<string, Message[]>; // conversationId -> messages
  activeConversationId: string | null;
  typingIndicators: TypingIndicator[];
  onlineUsers: Record<string, OnlineStatus>;
  notifications: MessageNotification[];
  searchResults: MessageSearchResult[];
  loading: boolean;
  error: string | null;

  // Conversation Management
  createConversation: (conversation: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  getConversation: (conversationId: string) => Conversation | null;
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  archiveConversation: (conversationId: string) => Promise<void>;
  unarchiveConversation: (conversationId: string) => Promise<void>;
  
  // Participant Management
  addParticipant: (conversationId: string, participant: ConversationParticipant) => Promise<void>;
  removeParticipant: (conversationId: string, userId: string) => Promise<void>;
  updateParticipantPermissions: (conversationId: string, userId: string, permissions: Partial<ParticipantPermissions>) => Promise<void>;
  
  // Message Management
  sendMessage: (conversationId: string, message: Omit<Message, 'id' | 'sentAt' | 'readBy' | 'reactions'>) => Promise<string>;
  editMessage: (messageId: string, content: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  replyToMessage: (conversationId: string, replyToId: string, message: Omit<Message, 'id' | 'sentAt' | 'readBy' | 'reactions' | 'replyToId'>) => Promise<string>;
  
  // Message Interactions
  markAsRead: (conversationId: string, messageId: string) => Promise<void>;
  markConversationAsRead: (conversationId: string) => Promise<void>;
  addReaction: (messageId: string, emoji: string) => Promise<void>;
  removeReaction: (messageId: string, reactionId: string) => Promise<void>;
  
  // File Management
  uploadFile: (conversationId: string, file: File) => Promise<MessageAttachment>;
  downloadFile: (attachmentId: string) => Promise<void>;
  
  // Search
  searchMessages: (searchParams: MessageSearch) => Promise<MessageSearchResult[]>;
  clearSearchResults: () => void;
  
  // Real-time Features
  setActiveConversation: (conversationId: string | null) => void;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
  updateOnlineStatus: (isOnline: boolean) => void;
  
  // Notifications
  getUnreadNotifications: () => MessageNotification[];
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  
  // Utility
  getUnreadCount: (conversationId: string) => number;
  getTotalUnreadCount: () => number;
  getConversationsByType: (type: ConversationType) => Conversation[];
  getApplicationConversation: (applicationId: string) => Conversation | null;
  createApplicationConversation: (applicationId: string, participants: string[]) => Promise<string>;
}

// ============================================================================
// MESSAGING COMPONENTS PROPS
// ============================================================================

export interface ChatInterfaceProps {
  conversationId?: string;
  applicationId?: string;
  userRole: UserRole;
  height?: string;
  showParticipants?: boolean;
  allowFileUpload?: boolean;
  className?: string;
}

export interface ConversationListProps {
  userId: string;
  userRole: UserRole;
  filter?: ConversationType;
  showArchived?: boolean;
  onConversationSelect: (conversationId: string) => void;
  className?: string;
}

export interface MessageBubbleProps {
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

// ============================================================================
// INTEGRATION TYPES
// ============================================================================

export interface ApplicationMessagingIntegration {
  applicationId: string;
  conversationId: string;
  autoNotifyOnStageChange: boolean;
  autoNotifyOnDocumentUpdate: boolean;
  allowApplicantMessaging: boolean;
  consultantAssigned?: string;
  escalationRules: EscalationRule[];
}

export interface EscalationRule {
  id: string;
  trigger: EscalationTrigger;
  condition: EscalationCondition;
  action: EscalationAction;
  isActive: boolean;
}

export enum EscalationTrigger {
  UNREAD_MESSAGES = 'unread_messages',
  NO_RESPONSE = 'no_response',
  URGENT_MESSAGE = 'urgent_message',
  DEADLINE_APPROACHING = 'deadline_approaching',
  STAGE_BLOCKED = 'stage_blocked'
}

export interface EscalationCondition {
  threshold: number;
  timeWindow: number; // in minutes
  priority?: MessagePriority;
  userRoles?: UserRole[];
}

export interface EscalationAction {
  type: EscalationActionType;
  notifyUsers: string[];
  message: string;
  autoAssign?: boolean;
  createTask?: boolean;
}

export enum EscalationActionType {
  NOTIFY_SUPERVISOR = 'notify_supervisor',
  ASSIGN_CONSULTANT = 'assign_consultant',
  CREATE_PRIORITY_TASK = 'create_priority_task',
  SEND_EMAIL = 'send_email',
  SEND_SMS = 'send_sms',
  ESCALATE_TO_ADMIN = 'escalate_to_admin'
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export const DEFAULT_CONVERSATION_SETTINGS: ConversationSettings = {
  isPrivate: false,
  allowFileUploads: true,
  allowReactions: true,
  autoArchiveAfterDays: 90,
  requireApprovalForNewParticipants: false,
  messageRetentionDays: 365,
  allowedFileTypes: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ],
  maxFileSize: 25 * 1024 * 1024 // 25MB
};

export const DEFAULT_PARTICIPANT_PERMISSIONS: ParticipantPermissions = {
  canSendMessages: true,
  canEditMessages: false,
  canDeleteMessages: false,
  canAddParticipants: false,
  canRemoveParticipants: false,
  canUploadFiles: true,
  canMentionUsers: true,
  canViewHistory: true
};

export const ADMIN_PARTICIPANT_PERMISSIONS: ParticipantPermissions = {
  canSendMessages: true,
  canEditMessages: true,
  canDeleteMessages: true,
  canAddParticipants: true,
  canRemoveParticipants: true,
  canUploadFiles: true,
  canMentionUsers: true,
  canViewHistory: true
};

export const DEFAULT_NOTIFICATION_SETTINGS: ParticipantNotificationSettings = {
  enabled: true,
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  mentionNotifications: true
};