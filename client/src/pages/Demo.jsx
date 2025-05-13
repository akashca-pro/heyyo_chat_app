import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import { createSession, encryptMessage, decryptMessage } from '../services';
import { getUserKeyBundle, sendMessage, getMessages, getContacts } from '../services/api';

const socket = io('http://localhost:5000');

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchContacts = async () => {
      const response = await getContacts();
      setContacts(response.data);
    };

    const fetchMessages = async () => {
      if (selectedContact) {
        const conversationId = [user._id, selectedContact._id].sort().join('_');
        const response = await getMessages(conversationId);
        const decryptedMessages = await Promise.all(
          response.data.map(async (msg) => ({
            ...msg,
            content: await decryptMessage(msg.senderId, msg.deviceId, msg.encryptedMessage),
          }))
        );
        setMessages(decryptedMessages);
      }
    };

    fetchContacts();
    fetchMessages();

    socket.on('message', async (msg) => {
      if (msg.recipientId === user._id) {
        const decryptedContent = await decryptMessage(msg.senderId, msg.deviceId, msg.encryptedMessage);
        setMessages((prev) => [...prev, { ...msg, content: decryptedContent }]);
      }
    });

    return () => socket.off('message');
  }, [user, selectedContact]);

  const startConversation = async (contact) => {
    setSelectedContact(contact);
    const response = await getUserKeyBundle(contact._id);
    await createSession(response.data, contact._id);
  };

  const sendMessageHandler = async () => {
    if (!selectedContact || !messageInput) return;

    const encryptedMessage = await encryptMessage(selectedContact._id, selectedContact.registrationId, messageInput);
    const msg = {
      senderId: user._id,
      recipientId: selectedContact._id,
      deviceId: selectedContact.registrationId,
      encryptedMessage,
      conversationId: [user._id, selectedContact._id].sort().join('_'),
    };

    await sendMessage(msg);
    socket.emit('message', msg);
    setMessages((prev) => [...prev, { ...msg, content: messageInput }]);
    setMessageInput('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Contacts</h2>
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => startConversation(contact)}
          >
            {contact.username}
          </div>
        ))}
      </div>
      <div className="w-3/4 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 ${msg.senderId === user._id ? 'text-right' : 'text-left'}`}>
              <span className="bg-blue-500 text-white p-2 rounded">{msg.content}</span>
            </div>
          ))}
        </div>
        {selectedContact && (
          <div className="p-4 bg-white">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type a message..."
            />
            <button onClick={sendMessageHandler} className="mt-2 bg-blue-500 text-white p-2 rounded">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;