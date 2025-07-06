/**
 * Conversation Header Component
 */
'use client';

interface ConversationHeaderProps {
  title: string;
  participants?: string[];
}

export function ConversationHeader({ title, participants }: ConversationHeaderProps) {
  return (
    <div className="border-b border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {participants && participants.length > 0 && (
        <p className="text-sm text-gray-500">
          {participants.length} participant{participants.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
