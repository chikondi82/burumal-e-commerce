import { useState } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminSellers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSellers, setSelectedSellers] = useState<number[]>([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingSellerId, setViewingSellerId] = useState<number | null>(null);
  const [editSeller, setEditSeller] = useState({ name: '', email: '', phone: '', status: 'verified' });
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [viewingProductsSellerId, setViewingProductsSellerId] = useState<number | null>(null);

  const mockSellers = [
    { id: 1, name: 'Maison XYZ', email: 'contact@maisonxyz.bi', phone: '+257 79 111 222', status: 'verified', products: 45, orders: 234, rating: 4.8, revenue: 12500000, joined: '2024-01-15' },
    { id: 2, name: 'Tech Hub', email: 'info@techhub.bi', phone: '+257 79 222 333', status: 'verified', products: 32, orders: 189, rating: 4.6, revenue: 8900000, joined: '2024-02-20' },
    { id: 3, name: 'Fashion House', email: 'sales@fashionhouse.bi', phone: '+257 79 333 444', status: 'pending', products: 0, orders: 0, rating: 0, revenue: 0, joined: '2024-04-01' },
    { id: 4, name: 'Burundi Electronics', email: 'shop@burundielectronics.bi', phone: '+257 79 444 555', status: 'verified', products: 67, orders: 312, rating: 4.9, revenue: 15600000, joined: '2024-01-05' },
    { id: 5, name: 'Home Decor Plus', email: 'info@homedecor.bi', phone: '+257 79 555 666', status: 'suspended', products: 28, orders: 45, rating: 3.2, revenue: 1200000, joined: '2024-03-10' },
  ];

  const mockSellerProducts: Record<number, Array<{
    id: number;
    name: string;
    category: string;
    price: number;
    status: string;
    stock: number;
    sales: number;
  }>> = {
    1: [
      { id: 1, name: 'Nike Air Max', category: 'Shoes', price: 85000, status: 'approved', stock: 45, sales: 89 },
      { id: 2, name: 'Adidas Running Shoes', category: 'Shoes', price: 75000, status: 'approved', stock: 30, sales: 67 },
      { id: 3, name: 'Puma Sneakers', category: 'Shoes', price: 65000, status: 'approved', stock: 25, sales: 45 },
    ],
    2: [
      { id: 4, name: 'Samsung Galaxy S24', category: 'Electronics', price: 1200000, status: 'approved', stock: 20, sales: 156 },
      { id: 5, name: 'iPhone 15', category: 'Electronics', price: 1500000, status: 'approved', stock: 15, sales: 98 },
    ],
    3: [],
    4: [
      { id: 6, name: 'Wireless Earbuds', category: 'Electronics', price: 35000, status: 'approved', stock: 75, sales: 234 },
      { id: 7, name: 'Bluetooth Speaker', category: 'Electronics', price: 45000, status: 'approved', stock: 50, sales: 189 },
      { id: 8, name: 'Smart Watch', category: 'Electronics', price: 85000, status: 'approved', stock: 35, sales: 145 },
    ],
    5: [
      { id: 9, name: 'Home Decor Set', category: 'Home', price: 125000, status: 'suspended', stock: 30, sales: 12 },
      { id: 10, name: 'Wall Art', category: 'Home', price: 45000, status: 'approved', stock: 40, sales: 23 },
    ],
  };

  const filteredSellers = mockSellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || seller.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectSeller = (sellerId: number) => {
    setSelectedSellers(prev => 
      prev.includes(sellerId) ? prev.filter(id => id !== sellerId) : [...prev, sellerId]
    );
  };

  const handleApprove = () => {
    alert(`Approve ${selectedSellers.length} sellers`);
  };

  const handleReject = () => {
    alert(`Reject ${selectedSellers.length} sellers`);
  };

  const handleSuspend = () => {
    alert(`Suspend ${selectedSellers.length} sellers`);
  };

  const handleReactivate = () => {
    alert(`Reactivate ${selectedSellers.length} sellers`);
  };

  const handleViewSeller = (sellerId: number) => {
    const seller = mockSellers.find(s => s.id === sellerId);
    if (seller) {
      setViewingSellerId(sellerId);
      setEditSeller({ name: seller.name, email: seller.email, phone: seller.phone, status: seller.status });
      setShowViewModal(true);
    }
  };

  const handleSaveSeller = () => {
    if (viewingSellerId !== null) {
      const sellerIndex = mockSellers.findIndex(s => s.id === viewingSellerId);
      if (sellerIndex !== -1) {
        mockSellers[sellerIndex] = { ...mockSellers[sellerIndex], ...editSeller };
      }
      setShowViewModal(false);
      setViewingSellerId(null);
    }
  };

  const handleViewSellerProducts = (sellerId: number) => {
    setViewingProductsSellerId(sellerId);
    setShowProductsModal(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Seller Management</h1>
          <p className="text-gray-600">Approve, verify, and manage seller accounts</p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by name or email..."
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
              <option value="verified">Verified</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedSellers.length > 0 && (
          <div className="card mb-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <p className="font-medium">{selectedSellers.length} sellers selected</p>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleApprove}>Approve</Button>
                <Button variant="secondary" size="sm" onClick={handleReject}>Reject</Button>
                <Button variant="secondary" size="sm" onClick={handleSuspend}>Suspend</Button>
                <Button variant="secondary" size="sm" onClick={handleReactivate}>Reactivate</Button>
              </div>
            </div>
          </div>
        )}

        {/* View/Edit Seller Modal */}
        {showViewModal && viewingSellerId !== null && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Seller Details</h2>
            <div className="space-y-4">
              <Input
                label="Seller ID"
                value={viewingSellerId.toString()}
                disabled
              />
              <Input
                label="Name"
                value={editSeller.name}
                onChange={(e) => setEditSeller({ ...editSeller, name: e.target.value })}
              />
              <Input
                label="Email"
                value={editSeller.email}
                onChange={(e) => setEditSeller({ ...editSeller, email: e.target.value })}
              />
              <Input
                label="Phone"
                value={editSeller.phone}
                onChange={(e) => setEditSeller({ ...editSeller, phone: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editSeller.status}
                  onChange={(e) => setEditSeller({ ...editSeller, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveSeller}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Seller Products Modal */}
        {showProductsModal && viewingProductsSellerId !== null && (
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Seller Products</h2>
              <Button variant="secondary" size="sm" onClick={() => setShowProductsModal(false)}>Close</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Product ID</th>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Price</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSellerProducts[viewingProductsSellerId]?.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{product.id}</td>
                      <td className="p-4 font-medium">{product.name}</td>
                      <td className="p-4">{product.category}</td>
                      <td className="p-4">{product.price.toLocaleString()} BIF</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          product.status === 'approved' ? 'bg-green-100 text-green-800' :
                          product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4">{product.sales}</td>
                    </tr>
                  ))}
                  {(!mockSellerProducts[viewingProductsSellerId] || mockSellerProducts[viewingProductsSellerId].length === 0) && (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-600">No products found for this seller</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sellers Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedSellers.length === filteredSellers.length}
                      onChange={(e) => {
                        setSelectedSellers(e.target.checked ? filteredSellers.map(s => s.id) : []);
                      }}
                    />
                  </th>
                  <th className="text-left p-4">Seller</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Products</th>
                  <th className="text-left p-4">Orders</th>
                  <th className="text-left p-4">Rating</th>
                  <th className="text-left p-4">Revenue</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSellers.map((seller) => (
                  <tr key={seller.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedSellers.includes(seller.id)}
                        onChange={() => handleSelectSeller(seller.id)}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-gray-600">ID: {seller.id}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{seller.email}</p>
                      <p className="text-sm text-gray-600">{seller.phone}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        seller.status === 'verified' ? 'bg-green-100 text-green-800' :
                        seller.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {seller.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{seller.products}</td>
                    <td className="p-4">{seller.orders}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span>{seller.rating}</span>
                      </div>
                    </td>
                    <td className="p-4">{(seller.revenue / 1000000).toFixed(1)}M BIF</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleViewSeller(seller.id)}>View</Button>
                        <Button variant="secondary" size="sm" onClick={() => handleViewSellerProducts(seller.id)}>Products</Button>
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
