import { useState } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminNotifications() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    channels: { inApp: true, sms: false, email: false, whatsapp: false },
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingNotificationId, setViewingNotificationId] = useState<number | null>(null);
  const [viewNotification, setViewNotification] = useState({ id: 0, title: '', message: '', channels: [''], sentDate: '', recipients: 0 });

  const mockNotifications = [
    { id: 1, title: 'BURUMAL Independence Sale 🇧🇮', message: 'Enjoy special discounts from verified Burundian sellers this week.', channels: ['in-app', 'sms'], sentDate: '2024-07-01', recipients: 1250 },
    { id: 2, title: 'New Payment Method Available', message: 'We now accept bank transfers for all orders.', channels: ['in-app', 'email'], sentDate: '2024-06-15', recipients: 890 },
    { id: 3, title: 'Seller Verification Update', message: 'New seller verification process now faster.', channels: ['in-app'], sentDate: '2024-05-20', recipients: 45 },
  ];

  const handleSendNotification = () => {
    alert(`Send notification: ${newNotification.title}`);
    setShowCreateModal(false);
    setNewNotification({ title: '', message: '', channels: { inApp: true, sms: false, email: false, whatsapp: false } });
  };

  const handleViewNotification = (notificationId: number) => {
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification) {
      setViewingNotificationId(notificationId);
      setViewNotification({ ...notification });
      setShowViewModal(true);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Platform Notifications</h1>
          <p className="text-gray-600">Send platform-wide announcements to users</p>
        </div>

        {/* Create Notification Button */}
        <div className="mb-6">
          <Button onClick={() => setShowCreateModal(true)}>+ Send Notification</Button>
        </div>

        {/* Create Notification Modal */}
        {showCreateModal && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Send Platform Notification</h2>
            <div className="space-y-4">
              <Input
                label="Title"
                placeholder="e.g., BURUMAL Independence Sale 🇧🇮"
                value={newNotification.title}
                onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  placeholder="Enter your message..."
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Channels</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newNotification.channels.inApp}
                      onChange={(e) => setNewNotification({ ...newNotification, channels: { ...newNotification.channels, inApp: e.target.checked } })}
                      className="mr-2"
                    />
                    <span>In-app</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newNotification.channels.sms}
                      onChange={(e) => setNewNotification({ ...newNotification, channels: { ...newNotification.channels, sms: e.target.checked } })}
                      className="mr-2"
                    />
                    <span>SMS</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newNotification.channels.email}
                      onChange={(e) => setNewNotification({ ...newNotification, channels: { ...newNotification.channels, email: e.target.checked } })}
                      className="mr-2"
                    />
                    <span>Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newNotification.channels.whatsapp}
                      onChange={(e) => setNewNotification({ ...newNotification, channels: { ...newNotification.channels, whatsapp: e.target.checked } })}
                      className="mr-2"
                    />
                    <span>WhatsApp</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSendNotification}>Send Notification</Button>
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* View Notification Modal */}
        {showViewModal && viewingNotificationId !== null && (
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Notification Details</h2>
              <Button variant="secondary" size="sm" onClick={() => setShowViewModal(false)}>Close</Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notification ID</label>
                  <p className="text-lg font-semibold">{viewNotification.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sent Date</label>
                  <p className="text-lg font-semibold">{viewNotification.sentDate}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <p className="text-lg font-semibold">{viewNotification.title}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <p className="text-sm bg-gray-50 p-3 rounded-lg">{viewNotification.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channels</label>
                  <div className="flex flex-wrap gap-2">
                    {viewNotification.channels.map((channel) => (
                      <span key={channel} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                  <p className="text-lg font-semibold">{viewNotification.recipients.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications History */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Notification History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Message</th>
                  <th className="text-left p-4">Channels</th>
                  <th className="text-left p-4">Recipients</th>
                  <th className="text-left p-4">Sent Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockNotifications.map((notification) => (
                  <tr key={notification.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{notification.id}</td>
                    <td className="p-4 font-medium">{notification.title}</td>
                    <td className="p-4 max-w-xs truncate">{notification.message}</td>
                    <td className="p-4">{notification.channels.join(', ')}</td>
                    <td className="p-4">{notification.recipients}</td>
                    <td className="p-4">{notification.sentDate}</td>
                    <td className="p-4">
                      <Button variant="secondary" size="sm" onClick={() => handleViewNotification(notification.id)}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
