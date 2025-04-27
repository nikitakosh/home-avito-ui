import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { FriendInfoDto } from '../types';
import ContactList from '../components/chat/ContactList';
import ChatWindow from '../components/chat/ChatWindow';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ChatPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const { user } = useAuth();
  const { activeContact, setActiveContact } = useChat();
  const [isLoading, setIsLoading] = useState(true);

  // Set active contact from URL param
  useEffect(() => {
    if (user && userId && !activeContact) {
      const friend = user.friends.find(f => f.id === parseInt(userId, 10));
      if (friend) {
        setActiveContact(friend);
      }
    }
    setIsLoading(false);
  }, [user, userId, activeContact, setActiveContact]);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-gray-600">Chat with your contacts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[70vh]">
        <div className="md:col-span-1">
          <ContactList contacts={user.friends} />
        </div>

        <div className="md:col-span-2">
          {activeContact ? (
            <ChatWindow contact={activeContact} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg shadow-sm p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">Your messages</h2>
                <p className="text-gray-600 mb-4">
                  Select a contact to start chatting
                </p>
                {user.friends.length === 0 && (
                  <p className="text-gray-500 text-sm">
                    You haven't added any friends yet. Add friends from your profile.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;