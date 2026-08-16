import { useState } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingOrderId, setViewingOrderId] = useState<string | null>(null);
  const [editOrder, setEditOrder] = useState({ id: '', customer: '', seller: '', total: 0, status: 'pending', date: '', items: 0 });

  const mockOrders = [
    { id: 'ORD-001', customer: 'Jean Niyonzima', seller: 'Maison XYZ', total: 125000, status: 'completed', date: '2024-08-15', items: 3 },
    { id: 'ORD-002', customer: 'Marie Mugisha', seller: 'Tech Hub', total: 850000, status: 'pending', date: '2024-08-15', items: 1 },
    { id: 'ORD-003', customer: 'Pierre Ndayisaba', seller: 'Fashion House', total: 45000, status: 'processing', date: '2024-08-14', items: 2 },
    { id: 'ORD-004', customer: 'Claude Bizimungu', seller: 'Burundi Electronics', total: 1200000, status: 'shipped', date: '2024-08-14', items: 1 },
    { id: 'ORD-005', customer: 'Annie Ntiranyibagira', seller: 'Home Decor Plus', total: 125000, status: 'cancelled', date: '2024-08-13', items: 1 },
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCancelOrder = (orderId: string) => {
    if (confirm(`Are you sure you want to cancel order ${orderId}?`)) {
      alert(`Order ${orderId} cancelled`);
    }
  };

  const handleViewOrder = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      setViewingOrderId(orderId);
      setEditOrder({ ...order });
      setShowViewModal(true);
    }
  };

  const handleSaveOrder = () => {
    if (viewingOrderId !== null) {
      const orderIndex = mockOrders.findIndex(o => o.id === viewingOrderId);
      if (orderIndex !== -1) {
        mockOrders[orderIndex] = { ...mockOrders[orderIndex], ...editOrder };
      }
      setShowViewModal(false);
      setViewingOrderId(null);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Order Management</h1>
          <p className="text-gray-600">View, search, and manage all platform orders</p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by order ID, customer, or seller..."
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
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* View/Edit Order Modal */}
        {showViewModal && viewingOrderId !== null && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="space-y-4">
              <Input
                label="Order ID"
                value={editOrder.id}
                disabled
              />
              <Input
                label="Customer"
                value={editOrder.customer}
                onChange={(e) => setEditOrder({ ...editOrder, customer: e.target.value })}
              />
              <Input
                label="Seller"
                value={editOrder.seller}
                onChange={(e) => setEditOrder({ ...editOrder, seller: e.target.value })}
              />
              <Input
                label="Total (BIF)"
                type="number"
                value={editOrder.total.toString()}
                onChange={(e) => setEditOrder({ ...editOrder, total: parseInt(e.target.value) || 0 })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editOrder.status}
                  onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <Input
                label="Items"
                type="number"
                value={editOrder.items.toString()}
                onChange={(e) => setEditOrder({ ...editOrder, items: parseInt(e.target.value) || 0 })}
              />
              <Input
                label="Date"
                type="date"
                value={editOrder.date}
                onChange={(e) => setEditOrder({ ...editOrder, date: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveOrder}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Seller</th>
                  <th className="text-left p-4">Total</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Items</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.seller}</td>
                    <td className="p-4">{order.total.toLocaleString()} BIF</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{order.items}</td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleViewOrder(order.id)}>View</Button>
                        {order.status !== 'completed' && order.status !== 'cancelled' && (
                          <Button variant="secondary" size="sm" onClick={() => handleCancelOrder(order.id)}>Cancel</Button>
                        )}
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
