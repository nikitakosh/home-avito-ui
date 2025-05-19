import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from 'react';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { useAuth } from './AuthContext';
import { ChatMessageDto, FriendInfoDto } from '../types';
import chatService from '../services/chatService';

interface ChatContextType {
  messages: ChatMessageDto[];
  activeContact: FriendInfoDto | null;
  setActiveContact: (contact: FriendInfoDto) => void;
  sendMessage: (content: string) => void;
  isConnected: boolean;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const useChat = () => useContext(ChatContext);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { user, isAuthenticated, refreshUserInfo } = useAuth();
  const [messages, setMessages] = useState<ChatMessageDto[]>([]);
  const [activeContact, setActiveContact] = useState<FriendInfoDto | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  const stompClient = useRef<Stomp.Client | null>(null);

  const API_BASE_URL = (window as any).APP_CONFIG?.API_BASE_URL || 'http://localhost:8080';

  // Connect to WebSocket when authenticated and component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      connect();
    }
    
    return () => {
      disconnect();
    };
  }, [isAuthenticated, user]);

  // Load messages when active contact changes
  useEffect(() => {
    if (activeContact && user) {
      loadMessages();
    } else {
      setMessages([]);
    }
  }, [activeContact, user]);

  // Refresh user info periodically to get updated friends list
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        refreshUserInfo();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, refreshUserInfo]);

  const connect = () => {
    const socket = new SockJS(`${API_BASE_URL}/ws`);
    stompClient.current = Stomp.over(socket);
    
    stompClient.current.connect(
      {},
      () => {
        setIsConnected(true);
        
        if (user) {
          stompClient.current?.subscribe(
            `/user/${user.id}/queue/messages`,
            onMessageReceived
          );
        }
      },
      (error) => {
        console.error('STOMP error:', error);
        setIsConnected(false);
        // Try to reconnect after a delay
        setTimeout(() => {
          connect();
        }, 5000);
      }
    );
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect(() => {
        setIsConnected(false);
      });
    }
  };

  const onMessageReceived = (payload: Stomp.Message) => {
    const message: ChatMessageDto = JSON.parse(payload.body);
    
    // Add the new message if it's from the active contact
    if (
      activeContact && 
      ((message.senderId === activeContact.id && message.recipientId === user?.id) ||
       (message.senderId === user?.id && message.recipientId === activeContact.id))
    ) {
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  const loadMessages = async () => {
    if (!user || !activeContact) return;
    
    try {
      const fetchedMessages = await chatService.getChatMessages(user.id, activeContact.id);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = (content: string) => {
    if (!stompClient.current || !user || !activeContact || !isConnected) {
      console.error('Cannot send message: Missing required data or not connected');
      return;
    }
    
    if (content.trim() === '') return;
    
    const chatMessage: ChatMessageDto = {
      senderId: user.id,
      recipientId: activeContact.id,
      senderName: `${user.firstname} ${user.lastname}`,
      recipientName: `${activeContact.firstname} ${activeContact.lastname}`,
      content: content,
      timestamp: new Date(),
    };
    
    stompClient.current.send('/app/chat', {}, JSON.stringify(chatMessage));
    
    // Add message to local state
    setMessages((prevMessages) => [...prevMessages, chatMessage]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        activeContact,
        setActiveContact,
        sendMessage,
        isConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};