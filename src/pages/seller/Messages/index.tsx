import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerMessages() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (!user) {
      navigate('/auth/login');
      return;
    }
    // Redirect customers to access denied page with clear message
    if (user && user.role !== 'seller') {
      navigate('/access-denied');
      return;
    }
  }, [user, navigate]);

  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: 'CONV-001',
      customer: 'Jean',
      lastMessage: 'Is the blue version available?',
      time: '2 hours ago',
      unread: 2,
      status: 'active',
      messages: [
        { sender: 'customer', text: 'Hello, I\'m interested in your Nike Shoes', time: '2 hours ago' },
        { sender: 'seller', text: 'Hi Jean! Yes, we have them in stock. What size are you looking for?', time: '2 hours ago' },
        { sender: 'customer', text: 'I need size 42. Is the blue version available?', time: '2 hours ago' },
      ],
    },
    {
      id: 'CONV-002',
      customer: 'Marie',
      lastMessage: 'When will my order arrive?',
      time: '5 hours ago',
      unread: 1,
      status: 'active',
      messages: [
        { sender: 'customer', text: 'Hi, I ordered a dress from you. When will it arrive?', time: '5 hours ago' },
      ],
    },
    {
      id: 'CONV-003',
      customer: 'Pierre',
      lastMessage: 'Can I change the size?',
      time: '1 day ago',
      unread: 0,
      status: 'active',
      messages: [
        { sender: 'customer', text: 'I ordered a watch but I think I need a smaller size. Can I change it?', time: '1 day ago' },
        { sender: 'seller', text: 'Hi Pierre, we can help with that. Please contact us within 24 hours of ordering.', time: '1 day ago' },
      ],
    },
    {
      id: 'CONV-004',
      customer: 'Claude',
      lastMessage: 'Thank you for the quick delivery!',
      time: '2 days ago',
      unread: 0,
      status: 'closed',
      messages: [
        { sender: 'customer', text: 'Just received my order. Thank you for the quick delivery!', time: '2 days ago' },
        { sender: 'seller', text: 'You\'re welcome! We\'re glad you\'re happy with your purchase.', time: '2 days ago' },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      // In production, this would call an API to send the message
      setMessageText('');
    }
  };

  const handleSelectConversation = (conversation: any) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-2xl font-bold mb-6">💬 Customer Messages</h1>

            <div className="card" style={{ height: 'calc(100vh - 200px)' }}>
              <div className="flex h-full">
                {/* Conversations List */}
                <div className="w-1/3 border-r">
                  <div className="p-4 border-b">
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="overflow-y-auto" style={{ height: 'calc(100% - 70px)' }}>
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => handleSelectConversation(conversation)}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                          selectedConversation?.id === conversation.id ? 'bg-primary-50' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold">{conversation.customer}</p>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <span className="inline-block mt-1 px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Thread */}
                <div className="w-2/3 flex flex-col">
                  {selectedConversation ? (
                    <>
                      <div className="p-4 border-b flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{selectedConversation.customer}</p>
                          <p className="text-sm text-gray-500">{selectedConversation.status === 'active' ? 'Active' : 'Closed'}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm">View Order</Button>
                          <Button variant="secondary" size="sm">Close Conversation</Button>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {selectedConversation.messages.map((message: any, index: number) => (
                          <div
                            key={index}
                            className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.sender === 'seller'
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-gray-200 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <p className="text-xs mt-1 opacity-70">{message.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                          />
                          <Button onClick={handleSendMessage}>Send</Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <p className="text-4xl mb-4">💬</p>
                        <p>Select a conversation to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Communication Guidelines */}
            <div className="card mt-6 bg-blue-50 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Communication Guidelines</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Be professional and courteous in all communications</li>
                <li>• Respond to customer inquiries within 24 hours</li>
                <li>• Do not share personal contact information outside the platform</li>
                <li>• Do not attempt to bypass BURUMAL's payment system</li>
                <li>• Report any suspicious or inappropriate customer behavior</li>
                <li>• Keep all order-related discussions within the platform</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
