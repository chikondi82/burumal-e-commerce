import { useState } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingUserId, setViewingUserId] = useState<number | null>(null);
  const [editUser, setEditUser] = useState({ name: '', email: '', phone: '', status: 'active' });
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [viewingOrdersUserId, setViewingOrdersUserId] = useState<number | null>(null);

  const mockUsers = [
    { id: 1, name: 'Jean Niyonzima', email: 'jean@example.com', phone: '+257 79 123 456', status: 'active', orders: 15, joined: '2024-01-15' },
    { id: 2, name: 'Marie Mugisha', email: 'marie@example.com', phone: '+257 79 234 567', status: 'active', orders: 23, joined: '2024-02-20' },
    { id: 3, name: 'Pierre Ndayisaba', email: 'pierre@example.com', phone: '+257 79 345 678', status: 'suspended', orders: 8, joined: '2024-03-10' },
    { id: 4, name: 'Claude Bizimungu', email: 'claude@example.com', phone: '+257 79 456 789', status: 'active', orders: 42, joined: '2024-01-05' },
    { id: 5, name: 'Annie Ntiranyibagira', email: 'annie@example.com', phone: '+257 79 567 890', status: 'blocked', orders: 3, joined: '2024-04-01' },
  ];

  const mockUserOrders: Record<number, Array<{
    id: string;
    product: string;
    seller: string;
    category: string;
    total: number;
    status: string;
    date: string;
    deliveryAddress: string;
  }>> = {
    1: [
      { id: 'ORD-001', product: 'Nike Air Max', seller: 'Maison XYZ', category: 'Shoes', total: 85000, status: 'completed', date: '2024-08-15', deliveryAddress: '123 Ave de l\'Independence, Bujumbura' },
      { id: 'ORD-005', product: 'Summer Dress', seller: 'Fashion House', category: 'Fashion', total: 45000, status: 'shipped', date: '2024-08-14', deliveryAddress: '456 Rue du Commerce, Bujumbura' },
      { id: 'ORD-008', product: 'Wireless Earbuds', seller: 'Burundi Electronics', category: 'Electronics', total: 35000, status: 'processing', date: '2024-08-13', deliveryAddress: '789 Blvd de la Paix, Bujumbura' },
    ],
    2: [
      { id: 'ORD-002', product: 'Samsung Galaxy S24', seller: 'Tech Hub', category: 'Electronics', total: 1200000, status: 'pending', date: '2024-08-15', deliveryAddress: '321 Avenue du Marche, Bujumbura' },
    ],
    3: [
      { id: 'ORD-003', product: 'Home Decor Set', seller: 'Home Decor Plus', category: 'Home', total: 125000, status: 'completed', date: '2024-08-10', deliveryAddress: '654 Rue de l\'Industrie, Gitega' },
    ],
    4: [
      { id: 'ORD-004', product: 'Beauty Kit', seller: 'Beauty Store', category: 'Beauty', total: 75000, status: 'delivered', date: '2024-08-08', deliveryAddress: '987 Avenue de la Republique, Ngozi' },
    ],
    5: [
      { id: 'ORD-006', product: 'Baby Clothes', seller: 'Baby World', category: 'Baby', total: 55000, status: 'cancelled', date: '2024-08-05', deliveryAddress: '147 Rue du Centre, Rumonge' },
    ],
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSuspend = () => {
    alert(`Suspend ${selectedUsers.length} users`);
  };

  const handleBlock = () => {
    alert(`Block ${selectedUsers.length} users`);
  };

  const handleReactivate = () => {
    alert(`Reactivate ${selectedUsers.length} users`);
  };

  const handleViewUser = (userId: number) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setViewingUserId(userId);
      setEditUser({ name: user.name, email: user.email, phone: user.phone, status: user.status });
      setShowViewModal(true);
    }
  };

  const handleSaveUser = () => {
    if (viewingUserId !== null) {
      const userIndex = mockUsers.findIndex(u => u.id === viewingUserId);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...editUser };
      }
      setShowViewModal(false);
      setViewingUserId(null);
    }
  };

  const handleViewUserOrders = (userId: number) => {
    setViewingOrdersUserId(userId);
    setShowOrdersModal(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">User Management</h1>
          <p className="text-gray-600">View, search, filter, and manage user accounts</p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="card mb-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <p className="font-medium">{selectedUsers.length} users selected</p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleSuspend}>
                  Suspend
                </Button>
                <Button variant="secondary" size="sm" onClick={handleBlock}>
                  Block
                </Button>
                <Button variant="secondary" size="sm" onClick={handleReactivate}>
                  Reactivate
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* View/Edit User Modal */}
        {showViewModal && viewingUserId !== null && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">User Details</h2>
            <div className="space-y-4">
              <Input
                label="User ID"
                value={viewingUserId.toString()}
                disabled
              />
              <Input
                label="Name"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
              <Input
                label="Email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
              <Input
                label="Phone"
                value={editUser.phone}
                onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editUser.status}
                  onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveUser}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* User Orders Modal */}
        {showOrdersModal && viewingOrdersUserId !== null && (
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">User Orders</h2>
              <Button variant="secondary" size="sm" onClick={() => setShowOrdersModal(false)}>Close</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Order ID</th>
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Seller</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Total</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Delivery Address</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUserOrders[viewingOrdersUserId]?.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{order.id}</td>
                      <td className="p-4">{order.product}</td>
                      <td className="p-4">{order.seller}</td>
                      <td className="p-4">{order.category}</td>
                      <td className="p-4">{order.total.toLocaleString()} BIF</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === 'completed' || order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">{order.date}</td>
                      <td className="p-4 max-w-xs truncate">{order.deliveryAddress}</td>
                    </tr>
                  ))}
                  {(!mockUserOrders[viewingOrdersUserId] || mockUserOrders[viewingOrdersUserId].length === 0) && (
                    <tr>
                      <td colSpan={8} className="p-4 text-center text-gray-600">No orders found for this user</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={(e) => {
                        setSelectedUsers(e.target.checked ? filteredUsers.map(u => u.id) : []);
                      }}
                    />
                  </th>
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Orders</th>
                  <th className="text-left p-4">Joined</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">ID: {user.id}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' :
                        user.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{user.orders}</td>
                    <td className="p-4">{user.joined}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleViewUser(user.id)}>View</Button>
                        <Button variant="secondary" size="sm" onClick={() => handleViewUserOrders(user.id)}>Orders</Button>
                      </div>
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
