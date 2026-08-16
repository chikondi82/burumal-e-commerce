import { Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';

export default function AdminDashboard() {
  const mockStats = {
    totalUsers: 1250,
    totalSellers: 45,
    totalOrders: 3420,
    totalRevenue: 85000000,
    pendingVerifications: 8,
    activeProducts: 1250,
  };

  const recentActivity = [
    { id: 1, type: 'new_seller', name: 'Tech Hub', time: '2 hours ago' },
    { id: 2, type: 'new_order', name: 'ORD-12345', time: '3 hours ago' },
    { id: 3, type: 'verification', name: 'Fashion House', time: '5 hours ago' },
    { id: 4, type: 'new_user', name: 'John Doe', time: '6 hours ago' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 text-sm">Users</p>
              <p className="text-2xl font-bold">{mockStats.totalUsers}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Sellers</p>
              <p className="text-2xl font-bold">{mockStats.totalSellers}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Orders</p>
              <p className="text-2xl font-bold">{mockStats.totalOrders}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Revenue</p>
              <p className="text-2xl font-bold">{(mockStats.totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{mockStats.pendingVerifications}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Products</p>
              <p className="text-2xl font-bold">{mockStats.activeProducts}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link to="/admin/sellers" className="block btn-primary text-center">
                  Review Seller Applications
                </Link>
                <Link to="/admin/products" className="block btn-secondary text-center">
                  Moderate Products
                </Link>
                <Link to="/admin/orders" className="block btn-secondary text-center">
                  View All Orders
                </Link>
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium capitalize">{activity.type.replace('_', ' ')}</p>
                      <p className="text-sm text-gray-600">{activity.name}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Verifications */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Pending Seller Verifications</h2>
              <Link to="/admin/sellers" className="text-primary-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="text-center py-8 text-gray-500">
              <p>8 sellers pending verification</p>
              <Link to="/admin/sellers" className="btn-primary inline-block mt-4">
                Review Now
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
