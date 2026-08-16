import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/auth/login');
      return;
    }
    // Redirect sellers to access denied page with clear message
    if (user && user.role === 'seller') {
      navigate('/access-denied');
      return;
    }
  }, [user, navigate]);

  const greeting = user ? `${user.firstName} ${user.lastName}` : 'Customer';

  const mockStats = {
    orders: 2,
    wishlist: 8,
    wallet: 25000,
  };

  const recentOrder = {
    id: '#BUR10293',
    product: 'Nike Shoes',
    total: 85000,
    status: 'Out for delivery',
    statusColor: 'text-green-600',
  };

  const recommendedProducts = [
    { id: '1', name: 'Nike Air Max', price: 85000, image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Samsung A15', price: 450000, image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'T-Shirt', price: 20000, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Good evening, {greeting} 👋</h1>
            <p className="text-gray-600">What are you looking for today?</p>
            <div className="mt-4 max-w-lg">
              <input
                type="text"
                placeholder="🔍 Search products..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* My Shopping Stats */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">MY SHOPPING</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600">🛒 Orders</p>
                <p className="text-2xl font-bold">{mockStats.orders}</p>
              </div>
              <div>
                <p className="text-gray-600">❤️ Wishlist</p>
                <p className="text-2xl font-bold">{mockStats.wishlist}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">💰 Wallet</p>
                <p className="text-2xl font-bold">{mockStats.wallet.toLocaleString()} BIF</p>
              </div>
            </div>
          </div>

          {/* Recent Order */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">📦 Recent Order</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-bold text-lg">{recentOrder.id}</p>
              <p className="text-gray-600">{recentOrder.product}</p>
              <p className="font-bold text-xl mt-2">{recentOrder.total.toLocaleString()} BIF</p>
              <div className="mt-4 flex items-center justify-between">
                <span className={recentOrder.statusColor + ' font-medium'}>🟢 {recentOrder.status}</span>
                <Link to="/orders" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Track Order
                </Link>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">⭐ Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                    <p className="font-bold text-primary-600">{product.price.toLocaleString()} BIF</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
