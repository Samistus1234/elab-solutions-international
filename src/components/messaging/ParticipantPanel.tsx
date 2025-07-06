/**
 * Participant Panel Component
 */
'use client';

interface Participant {
  id: string;
  name: string;
  role: string;
  isOnline?: boolean;
}

interface ParticipantPanelProps {
  participants: Participant[];
}

export function ParticipantPanel({ participants }: ParticipantPanelProps) {
  return (
    <div className="border-l border-gray-200 w-64 p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">
        Participants ({participants.length})
      </h3>
      <div className="space-y-2">
        {participants.map((participant) => (
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
