import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerMessages() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: '1',
      orderId: '#BUR10293',
      seller: 'Maison XYZ',
      sellerAvatar: '🏪',
      lastMessage: 'Yes, black color is available.',
      lastMessageTime: '10:40',
      unread: 0,
    },
    {
      id: '2',
      orderId: '#BUR10288',
      seller: 'Tech Hub',
      sellerAvatar: '💻',
      lastMessage: 'Your order has been shipped!',
      lastMessageTime: 'Yesterday',
      unread: 2,
    },
  ];

  const messages = [
    {
      id: '1',
      sender: 'customer',
      name: 'You',
      text: 'Can you confirm the color is black?',
      time: '10:30',
    },
    {
      id: '2',
      sender: 'seller',
      name: 'Maison XYZ',
      text: 'Yes, black color is available.',
      time: '10:35',
    },
    {
      id: '3',
      sender: 'system',
      name: 'BURUMAL',
      text: 'Please keep all payments inside BURUMAL for your safety.',
      time: '10:36',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      // In production, this would send the message to the server
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">💬 Messages</h1>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Communication Guidelines:</strong> All seller communication happens within orders. Keep payments inside BURUMAL for your safety. Never share personal payment information.
            </p>
          </div>

          {!selectedConversation ? (
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Order Conversations</h2>
              {conversations.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No conversations yet</p>
                  <p className="text-sm text-gray-500">Messages will appear here when you communicate with sellers</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer border-b last:border-0"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                        {conv.sellerAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-bold">{conv.seller}</p>
                          <p className="text-sm text-gray-500">{conv.lastMessageTime}</p>
                        </div>
                        <p className="text-sm text-gray-600">{conv.orderId}</p>
                        <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="card">
              <div className="flex items-center gap-4 pb-4 border-b mb-4">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Back
                </button>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  {selectedConversation.sellerAvatar}
                </div>
                <div>
                  <p className="font-bold">{selectedConversation.seller}</p>
                  <p className="text-sm text-gray-600">{selectedConversation.orderId}</p>
                </div>
              </div>

              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'customer' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}
                  >
                    {msg.sender === 'system' ? (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 max-w-md">
                        <p className="text-sm text-yellow-800">
                          <strong>{msg.name}:</strong> {msg.text}
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">{msg.time}</p>
                      </div>
                    ) : (
                      <div
                        className={`rounded-lg px-4 py-2 max-w-md ${
                          msg.sender === 'customer'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'customer' ? 'text-primary-200' : 'text-gray-500'}`}>
                          {msg.time}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
