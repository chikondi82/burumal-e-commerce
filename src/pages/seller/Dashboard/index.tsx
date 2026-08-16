import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';

export default function SellerDashboard() {
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
  const mockStats = {
    totalOrders: 156,
    totalRevenue: 12500000,
    pendingOrders: 12,
    totalProducts: 45,
    rating: 4.8,
    fulfillment: 98,
    availableBalance: 850000,
    pendingBalance: 350000,
    totalEarnings: 5850000,
    lowStock: 4,
    pendingApproval: 2,
    newReviews: 3,
  };

  const recentOrders = [
    { id: 'BUR10293', customer: 'Jean', total: 125000, status: 'processing', date: '2024-08-15' },
    { id: 'BUR10292', customer: 'Marie', total: 85000, status: 'new', date: '2024-08-15' },
    { id: 'BUR10291', customer: 'Pierre', total: 450000, status: 'ready', date: '2024-08-14' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'NEW';
      case 'processing': return 'PROCESSING';
      case 'ready': return 'READY FOR DELIVERY';
      case 'shipped': return 'SHIPPED';
      case 'delivered': return 'DELIVERED';
      default: return status.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Good evening, Maison XYZ 👋</h1>
            <p className="text-gray-600">Your store is performing well this week.</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 text-sm mb-1">💰 SALES</p>
              <p className="text-2xl font-bold">{(mockStats.totalRevenue / 1000000).toFixed(2)}M BIF</p>
              <p className="text-sm text-green-600">+12.5%</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm mb-1">🛒 ORDERS</p>
              <p className="text-2xl font-bold">{mockStats.totalOrders}</p>
              <p className="text-sm text-green-600">+8.2%</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm mb-1">💵 BALANCE</p>
              <p className="text-2xl font-bold">{(mockStats.availableBalance / 1000).toFixed(0)}K BIF</p>
              <Link to="/seller/wallet" className="text-sm text-primary-600 hover:underline">Withdraw →</Link>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm mb-1">⭐ RATING</p>
              <p className="text-2xl font-bold text-yellow-500">{mockStats.rating}/5</p>
              <p className="text-sm text-gray-600">126 reviews</p>
            </div>
          </div>

          {/* Pending Actions */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">⚠️ Pending Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockStats.pendingOrders > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="font-semibold text-yellow-800">{mockStats.pendingOrders} new orders need processing</p>
                  <Link to="/seller/orders?status=new" className="text-sm text-yellow-600 hover:underline mt-2 block">View Orders →</Link>
                </div>
              )}
              {mockStats.lowStock > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="font-semibold text-orange-800">{mockStats.lowStock} products are low in stock</p>
                  <Link to="/seller/inventory" className="text-sm text-orange-600 hover:underline mt-2 block">View Inventory →</Link>
                </div>
              )}
              {mockStats.pendingApproval > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-800">{mockStats.pendingApproval} products awaiting approval</p>
                  <Link to="/seller/products?status=pending" className="text-sm text-blue-600 hover:underline mt-2 block">View Products →</Link>
                </div>
              )}
              {mockStats.newReviews > 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="font-semibold text-purple-800">{mockStats.newReviews} customer reviews need response</p>
                  <Link to="/seller/reviews" className="text-sm text-purple-600 hover:underline mt-2 block">View Reviews →</Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Link to="/seller/orders" className="text-primary-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">#{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{order.total.toLocaleString()} BIF</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
