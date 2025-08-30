/**
 * Participant Panel Component
 */
'use client';

import { Conversation } from '@/types/messaging';
import { UserRole } from '@/types/business';

interface Participant {
  id: string;
  name: string;
  role: string;
  isOnline?: boolean;
}

interface ParticipantPanelProps {
  participants?: Participant[];
  conversation: Conversation;
  userRole: UserRole;
  onClose: () => void;
  className?: string;
}

export function ParticipantPanel({ 
  participants, 
  conversation, 
  userRole, 
  onClose, 
  className = '' 
}: ParticipantPanelProps) {
  // Use provided participants or fall back to conversation participants
  const displayParticipants = participants || conversation.participants.map(p => ({
    id: p.userId,
    name: p.userName,
    role: p.userRole,
    isOnline: p.isOnline
  }));

  return (
    <div className={`border-l border-gray-200 w-64 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">
          Participants ({displayParticipants.length})
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1"
          title="Close participants panel"
        >
          ×
        </button>
      </div>
      <div className="space-y-2">
        {displayParticipants.map((participant) => (
          <div key={participant.id} className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${participant.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {participant.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {participant.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
