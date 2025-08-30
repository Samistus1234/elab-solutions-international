/**
 * Conversation Header Component
 */
'use client';

import { Conversation } from '@/types/messaging';
import { UserRole } from '@/types/business';

interface ConversationHeaderProps {
  conversation: Conversation;
  userRole: UserRole;
  onToggleParticipants?: () => void;
  title?: string;
  participants?: string[];
}

export function ConversationHeader({ 
  conversation, 
  userRole, 
  onToggleParticipants,
  title,
  participants 
}: ConversationHeaderProps) {
  // Use conversation data if available, otherwise fall back to direct props
  const displayTitle = conversation?.title || title || 'Conversation';
  const displayParticipants = conversation?.participants || participants || [];

  return (
    <div className="border-b border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900">{displayTitle}</h2>
      {displayParticipants && displayParticipants.length > 0 && (
        <p className="text-sm text-gray-500">
          {displayParticipants.length} participant{displayParticipants.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
