/**
 * Message Input Component
 */
'use client';

import { useState } from 'react';
import { UserRole } from '@/types/business';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  conversationId?: string;
  userRole?: UserRole;
  allowFileUpload?: boolean;
  placeholder?: string;
}

export function MessageInput({ 
  onSendMessage, 
  disabled, 
  conversationId, 
  userRole, 
  allowFileUpload, 
  placeholder = "Type a message..."
}: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </form>
  );
}
