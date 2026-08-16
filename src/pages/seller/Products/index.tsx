import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';
import { productService } from '../../../services/productService';

export default function SellerProducts() {
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

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    productService.initializeMockProducts();
    setProducts(productService.getAllProducts());
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return product.stock > 0 && matchesSearch;
    if (filter === 'out-of-stock') return product.stock === 0 && matchesSearch;
    if (filter === 'low-stock') return product.stock > 0 && product.stock < 5 && matchesSearch;
    return matchesSearch;
  });

  const getStatusColor = (stock: number) => {
    if (stock === 0) return 'bg-red-100 text-red-800';
    if (stock < 5) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusLabel = (stock: number) => {
    if (stock === 0) return 'OUT OF STOCK';
    if (stock < 5) return 'LOW STOCK';
    return 'ACTIVE';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">📦 Products</h1>
              <Link to="/seller/products/add">
                <Button>+ Add Product</Button>
              </Link>
            </div>

            {/* Search and Filter */}
            <div className="card mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All ({products.length})
                  </button>
                  <button
                    onClick={() => setFilter('active')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'active' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Active ({products.filter(p => p.stock > 0).length})
                  </button>
                  <button
                    onClick={() => setFilter('low-stock')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'low-stock' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Low Stock ({products.filter(p => p.stock > 0 && p.stock < 5).length})
                  </button>
                  <button
                    onClick={() => setFilter('out-of-stock')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'out-of-stock' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Out of Stock ({products.filter(p => p.stock === 0).length})
                  </button>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Product</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Stock</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Rating</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product: any) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={product.images[0] || 'https://via.placeholder.com/100'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold">{product.price.toLocaleString()} BIF</td>
                        <td className="p-4">{product.stock}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.stock)}`}>
                            {getStatusLabel(product.stock)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">⭐</span>
                            <span className="text-sm">{product.rating} ({product.reviews})</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm">Edit</Button>
                            <Button variant="secondary" size="sm">Duplicate</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
