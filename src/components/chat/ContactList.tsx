import { useState } from 'react';
import { FriendInfoDto } from '../../types';
import { useChat } from '../../contexts/ChatContext';
import { Search } from 'lucide-react';

interface ContactListProps {
  contacts: FriendInfoDto[];
}

const ContactList = ({ contacts }: ContactListProps) => {
  const { activeContact, setActiveContact } = useChat();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact => 
    `${contact.firstname} ${contact.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = (contact: FriendInfoDto) => {
    setActiveContact(contact);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-3">Contacts</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? 'No contacts found' : 'No contacts yet'}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredContacts.map(contact => (
              <li key={contact.id}>
                <button
                  className={`w-full text-left p-4 flex items-center hover:bg-gray-50 transition-colors ${
                    activeContact?.id === contact.id ? 'bg-primary-50' : ''
                  }`}
                  onClick={() => handleContactClick(contact)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                    {contact.firstname.charAt(0)}{contact.lastname.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{contact.firstname} {contact.lastname}</div>
                    <div className="text-sm text-gray-500 truncate">{contact.email}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactList;