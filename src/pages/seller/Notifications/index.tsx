import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerNotifications() {
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

  const [filter, setFilter] = useState<string>('all');

  const notifications = [
    {
      id: 'NOTIF-001',
      type: 'order',
      title: 'New Order Received',
      message: 'You have received a new order #BUR10294 for 125,000 BIF',
      time: '5 minutes ago',
      read: false,
      icon: '🛒',
    },
    {
      id: 'NOTIF-002',
      type: 'payment',
      title: 'Payment Confirmed',
      message: 'Payment for order #BUR10293 has been confirmed',
      time: '1 hour ago',
      read: false,
      icon: '💳',
    },
    {
      id: 'NOTIF-003',
      type: 'product',
      title: 'Product Approved',
      message: 'Your product "Nike Shoes" has been approved and is now live',
      time: '2 hours ago',
      read: true,
      icon: '✅',
    },
    {
      id: 'NOTIF-004',
      type: 'stock',
      title: 'Low Stock Alert',
      message: 'Samsung Galaxy is running low on stock (3 units remaining)',
      time: '3 hours ago',
      read: false,
      icon: '📦',
    },
    {
      id: 'NOTIF-005',
      type: 'review',
      title: 'New Review',
      message: 'Jean left a 5-star review for Nike Shoes',
      time: '5 hours ago',
      read: true,
      icon: '⭐',
    },
    {
      id: 'NOTIF-006',
      type: 'payout',
      title: 'Payout Completed',
      message: 'Your payout of 250,000 BIF has been processed successfully',
      time: '1 day ago',
      read: true,
      icon: '💰',
    },
    {
      id: 'NOTIF-007',
      type: 'verification',
      title: 'Store Verification Update',
      message: 'Your store verification has been completed successfully',
      time: '2 days ago',
      read: true,
      icon: '🏪',
    },
    {
      id: 'NOTIF-008',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on August 20, 2024 from 2AM-4AM',
      time: '3 days ago',
      read: true,
      icon: '🔧',
    },
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-800';
      case 'payment': return 'bg-green-100 text-green-800';
      case 'product': return 'bg-purple-100 text-purple-800';
      case 'stock': return 'bg-orange-100 text-orange-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'payout': return 'bg-green-100 text-green-800';
      case 'verification': return 'bg-indigo-100 text-indigo-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    // In production, this would call an API to mark as read
    console.log('Mark as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    // In production, this would call an API to mark all as read
    console.log('Mark all as read');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">🔔 Notifications</h1>
              {unreadCount > 0 && (
                <Button variant="secondary" onClick={handleMarkAllAsRead}>
                  Mark All as Read ({unreadCount})
                </Button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('order')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'order' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setFilter('payment')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'payment' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Payments
              </button>
              <button
                onClick={() => setFilter('product')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'product' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setFilter('stock')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'stock' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Stock
              </button>
              <button
                onClick={() => setFilter('review')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'review' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setFilter('system')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'system' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                System
              </button>
            </div>

            {/* Notifications List */}
            <div className="card">
              <div className="divide-y">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 flex items-start gap-4 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                  >
                    <div className="text-2xl">{notification.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold">{notification.title}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                        {notification.type.toUpperCase()}
                      </span>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Settings */}
            <div className="card mt-6">
              <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
