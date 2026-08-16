import { useState } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingProductId, setViewingProductId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState({ name: '', seller: '', category: '', price: 0, status: 'approved', stock: 0 });

  const mockProducts = [
    { id: 1, name: 'Nike Air Max', seller: 'Maison XYZ', category: 'Shoes', price: 85000, status: 'approved', stock: 45, views: 1234, sales: 89 },
    { id: 2, name: 'Samsung Galaxy S24', seller: 'Tech Hub', category: 'Electronics', price: 1200000, status: 'pending', stock: 20, views: 567, sales: 0 },
    { id: 3, name: 'Summer Dress Collection', seller: 'Fashion House', category: 'Fashion', price: 45000, status: 'approved', stock: 100, views: 2345, sales: 156 },
    { id: 4, name: 'Wireless Earbuds', seller: 'Burundi Electronics', category: 'Electronics', price: 35000, status: 'approved', stock: 75, views: 890, sales: 67 },
    { id: 5, name: 'Home Decor Set', seller: 'Home Decor Plus', category: 'Home', price: 125000, status: 'suspended', stock: 30, views: 345, sales: 12 },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleApprove = () => {
    alert(`Approve ${selectedProducts.length} products`);
  };

  const handleReject = () => {
    alert(`Reject ${selectedProducts.length} products`);
  };

  const handleSuspend = () => {
    alert(`Suspend ${selectedProducts.length} products`);
  };

  const handleViewProduct = (productId: number) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      setViewingProductId(productId);
      setEditProduct({ name: product.name, seller: product.seller, category: product.category, price: product.price, status: product.status, stock: product.stock });
      setShowViewModal(true);
    }
  };

  const handleEditProduct = (productId: number) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      setViewingProductId(productId);
      setEditProduct({ name: product.name, seller: product.seller, category: product.category, price: product.price, status: product.status, stock: product.stock });
      setShowViewModal(true);
    }
  };

  const handleSaveProduct = () => {
    if (viewingProductId !== null) {
      const productIndex = mockProducts.findIndex(p => p.id === viewingProductId);
      if (productIndex !== -1) {
        mockProducts[productIndex] = { ...mockProducts[productIndex], ...editProduct };
      }
      setShowViewModal(false);
      setViewingProductId(null);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Product & Catalog Management</h1>
          <p className="text-gray-600">Approve, reject, and manage marketplace products</p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by name or seller..."
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
              <option value="approved">Approved</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="card mb-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <p className="font-medium">{selectedProducts.length} products selected</p>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleApprove}>Approve</Button>
                <Button variant="secondary" size="sm" onClick={handleReject}>Reject</Button>
                <Button variant="secondary" size="sm" onClick={handleSuspend}>Suspend</Button>
              </div>
            </div>
          </div>
        )}

        {/* View/Edit Product Modal */}
        {showViewModal && viewingProductId !== null && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Product Details</h2>
            <div className="space-y-4">
              <Input
                label="Product ID"
                value={viewingProductId.toString()}
                disabled
              />
              <Input
                label="Product Name"
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              />
              <Input
                label="Seller"
                value={editProduct.seller}
                onChange={(e) => setEditProduct({ ...editProduct, seller: e.target.value })}
              />
              <Input
                label="Category"
                value={editProduct.category}
                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
              />
              <Input
                label="Price (BIF)"
                type="number"
                value={editProduct.price.toString()}
                onChange={(e) => setEditProduct({ ...editProduct, price: parseInt(e.target.value) || 0 })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editProduct.status}
                  onChange={(e) => setEditProduct({ ...editProduct, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <Input
                label="Stock"
                type="number"
                value={editProduct.stock.toString()}
                onChange={(e) => setEditProduct({ ...editProduct, stock: parseInt(e.target.value) || 0 })}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveProduct}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length}
                      onChange={(e) => {
                        setSelectedProducts(e.target.checked ? filteredProducts.map(p => p.id) : []);
                      }}
                    />
                  </th>
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Seller</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Stock</th>
                  <th className="text-left p-4">Views</th>
                  <th className="text-left p-4">Sales</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">ID: {product.id}</p>
                    </td>
                    <td className="p-4">{product.seller}</td>
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
                    <td className="p-4">{product.views}</td>
                    <td className="p-4">{product.sales}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleViewProduct(product.id)}>View</Button>
                        <Button variant="secondary" size="sm" onClick={() => handleEditProduct(product.id)}>Edit</Button>
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
