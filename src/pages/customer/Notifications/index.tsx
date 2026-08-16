import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerNotifications() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const [filter, setFilter] = useState<'all' | 'order' | 'payment' | 'promotion'>('all');

  const notifications = [
    {
      id: '1',
      type: 'order',
      icon: '📦',
      title: 'Order out for delivery',
      message: 'Your order #BUR10293 is out for delivery and will arrive soon.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: '2',
      type: 'order',
      icon: '✅',
      title: 'Order confirmed',
      message: 'Your order #BUR10288 has been confirmed by the seller.',
      time: 'Yesterday',
      unread: true,
    },
    {
      id: '3',
      type: 'payment',
      icon: '💳',
      title: 'Payment successful',
      message: 'Your payment of 85,000 BIF for order #BUR10293 was successful.',
      time: '2 days ago',
      unread: false,
    },
    {
      id: '4',
      type: 'promotion',
      icon: '🎉',
      title: 'Special offer!',
      message: 'Get 10% off on all electronics. Use code: TECH10',
      time: '3 days ago',
      unread: false,
    },
    {
      id: '5',
      type: 'order',
      icon: '🚚',
      title: 'Courier assigned',
      message: 'A courier has been assigned to your order #BUR10293.',
      time: '4 days ago',
      unread: false,
    },
    {
      id: '6',
      type: 'payment',
      icon: '💰',
      title: 'Refund completed',
      message: 'Your refund of 20,000 BIF has been processed.',
      time: '5 days ago',
      unread: false,
    },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    return notif.type === filter;
  });

  const markAsRead = (id: string) => {
    // In production, this would update the server
    console.log('Mark as read:', id);
  };

  const markAllAsRead = () => {
    // In production, this would update the server
    console.log('Mark all as read');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">🔔 Notifications</h1>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg"
            >
              Mark all as read
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('order')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                filter === 'order'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setFilter('payment')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                filter === 'payment'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Payments
            </button>
            <button
              onClick={() => setFilter('promotion')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                filter === 'promotion'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Promotions
            </button>
          </div>

          {filteredNotifications.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600">No notifications found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`card cursor-pointer transition-colors ${notif.unread ? 'bg-blue-50 border-l-4 border-l-primary-600' : ''}`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{notif.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold">{notif.title}</p>
                          <p className="text-gray-600 mt-1">{notif.message}</p>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{notif.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Notification Settings */}
          <div className="card mt-8">
            <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order updates</p>
                  <p className="text-sm text-gray-600">Get notified about your order status</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment updates</p>
                  <p className="text-sm text-gray-600">Get notified about payment confirmations and refunds</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promotions</p>
                  <p className="text-sm text-gray-600">Receive special offers and discounts</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Price alerts</p>
                  <p className="text-sm text-gray-600">Get notified when wishlist items drop in price</p>
                </div>
                <input type="checkbox" className="w-5 h-5 text-primary-600" />
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="font-medium mb-3">Delivery Method</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                    <span className="text-sm">Email notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                    <span className="text-sm">SMS notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                    <span className="text-sm">Push notifications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
