import { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { FriendInfoDto } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  contact: FriendInfoDto;
}

const ChatWindow = ({ contact }: ChatWindowProps) => {
  const { user } = useAuth();
  const { messages, sendMessage, isConnected } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Contact header */}
      <div className="flex items-center p-4 border-b">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
          {contact.firstname.charAt(0)}{contact.lastname.charAt(0)}
        </div>
        <div className="ml-3">
          <h3 className="font-semibold">
            {contact.firstname} {contact.lastname}
          </h3>
          <div className="text-xs text-gray-500">{contact.email}</div>
        </div>
        {!isConnected && (
          <div className="ml-auto flex items-center text-error-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Disconnected</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-center">No messages yet</p>
            <p className="text-center text-sm">Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isOwn={message.senderId === user.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="input flex-1 mr-2"
          disabled={!isConnected}
        />
        <Button 
          type="submit" 
          disabled={!isConnected || !newMessage.trim()}
          rightIcon={<Send className="h-4 w-4" />}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;