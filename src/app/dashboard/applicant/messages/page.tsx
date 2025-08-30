'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MessageSquare, Send, UserCircle } from 'lucide-react';
import { useState } from 'react';

export default function MessagesPage() {
  // In a real application, you would fetch messages/conversations data here
  const allConversations = [
    { 
      id: 1, 
      participant: 'Consultant John Doe', 
      lastMessage: 'Your application status has been updated.', 
      time: '2 hours ago',
      messages: [
        { id: 101, sender: 'Consultant John Doe', text: 'Hello! Your DataFlow application status has been updated to "Pending Review".', time: '2 hours ago' },
        { id: 102, sender: 'You', text: 'Thanks for the update, John! What are the next steps?', time: '1 hour ago' },
        { id: 103, sender: 'Consultant John Doe', text: 'You will receive an email shortly with details on the next phase.', time: '30 minutes ago' },
      ]
    },
    { 
      id: 2, 
      participant: 'Support Team', 
      lastMessage: 'Welcome to eLab Solutions!', 
      time: 'Yesterday',
      messages: [
        { id: 201, sender: 'Support Team', text: 'Welcome to eLab Solutions! We are here to help you with your global healthcare career.', time: 'Yesterday' },
        { id: 202, sender: 'You', text: 'Hi, I have a question about my profile setup.', time: 'Yesterday' },
      ]
    },
    { 
      id: 3, 
      participant: 'Admin Sarah Lee', 
      lastMessage: 'Please review the new document requirements.', 
      time: '3 days ago',
      messages: [
        { id: 301, sender: 'Admin Sarah Lee', text: 'Dear applicant, please note the updated document requirements for licensing in UAE.', time: '3 days ago' },
      ]
    },
  ]; // Placeholder for conversations data

  const [selectedConversation, setSelectedConversation] = useState(allConversations[0]); // Select first conversation by default

  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Messages</h1>
        
        {allConversations.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg mb-4">You have no messages yet.</p>
            <p>Start a new conversation or wait for a consultant to reach out!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]"> {/* Added height for better layout */}
            {/* Conversation List (Sidebar-like) */}
            <div className="md:col-span-1 border-r border-gray-200 pr-6 overflow-y-auto">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Conversations</h2>
              <ul className="space-y-2">
                {allConversations.map((conv) => (
                  <li 
                    key={conv.id} 
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conv.id ? 'bg-primary-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-semibold text-gray-800">{conv.participant}</p>
                    <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-gray-400 text-right">{conv.time}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Message Display Area */}
            <div className="md:col-span-2 pl-6 flex flex-col">
              {selectedConversation ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">{selectedConversation.participant}</h2>
                  <div className="flex-1 border border-gray-200 rounded-lg p-4 overflow-y-auto flex flex-col space-y-4">
                    {selectedConversation.messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`p-3 rounded-lg max-w-[70%] ${
                          msg.sender === 'You' ? 'bg-primary-100 self-end' : 'bg-gray-100 self-start'
                        }`}
                      >
                        <p className="font-semibold">{msg.sender}</p>
                        <p className="text-gray-800">{msg.text}</p>
                        <p className="text-xs text-gray-500 text-right mt-1">{msg.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 p-4 flex items-center">
                    <input type="text" placeholder="Type your message..." className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    <button className="ml-3 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors">
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <MessageSquare className="h-16 w-16 mr-4" />
                  <p className="text-xl">Select a conversation to view messages</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}