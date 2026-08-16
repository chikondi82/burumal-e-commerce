import { Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';

export default function SuperAdminDashboard() {
  // Today's Overview
  const todayStats = {
    sales: 4850000,
    orders: 127,
    newCustomers: 83,
    newSellers: 6,
  };

  // Comprehensive KPIs
  const kpis = {
    totalUsers: 1250,
    activeUsers: 890,
    newUsersToday: 83,
    totalSellers: 45,
    verifiedSellers: 38,
    pendingSellerApplications: 12,
    totalProducts: 2450,
    pendingProducts: 38,
    totalOrders: 3420,
    pendingOrders: 45,
    completedOrders: 3100,
    cancelledOrders: 175,
    totalSales: 85000000,
    platformCommission: 4250000,
    pendingSellerPayouts: 1250000,
    deliveryFailures: 23,
    openDisputes: 4,
  };

  // Pending Actions
  const pendingActions = [
    { type: 'Seller Verification', count: 12, icon: '🏪', link: '/admin-super/sellers' },
    { type: 'Product Approval', count: 38, icon: '📦', link: '/admin-super/products' },
    { type: 'Refund Requests', count: 7, icon: '💰', link: '/admin-super/payments' },
    { type: 'Open Disputes', count: 4, icon: '⚖️', link: '/admin-super/disputes' },
    { type: 'Payment Issues', count: 2, icon: '💳', link: '/admin-super/payments' },
  ];

  const adminRoles = [
    { role: 'Finance Admin', count: 3, status: 'active', lastActive: '2 hours ago' },
    { role: 'Content Moderator', count: 4, status: 'active', lastActive: '1 hour ago' },
    { role: 'Logistics Manager', count: 2, status: 'active', lastActive: '30 mins ago' },
    { role: 'Marketing Manager', count: 2, status: 'active', lastActive: '15 mins ago' },
    { role: 'Super Admin', count: 1, status: 'active', lastActive: 'Now' },
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High server load detected', time: '10 mins ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance in 2 hours', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Database backup completed', time: '2 hours ago' },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">BURUMAL ADMIN DASHBOARD</h1>
              <p className="text-gray-600">Platform overview and control center</p>
            </div>
            <Button>System Settings</Button>
          </div>

          {/* Today's Overview */}
          <div className="card mb-8 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <h2 className="text-lg font-semibold mb-4">Today's Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm opacity-90">Today's Sales</p>
                <p className="text-2xl font-bold">{todayStats.sales.toLocaleString()} BIF</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Orders</p>
                <p className="text-2xl font-bold">{todayStats.orders}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">New Customers</p>
                <p className="text-2xl font-bold">{todayStats.newCustomers}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">New Sellers</p>
                <p className="text-2xl font-bold">{todayStats.newSellers}</p>
              </div>
            </div>
          </div>

          {/* Pending Actions */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">Pending Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {pendingActions.map((action, index) => (
                <Link key={index} to={action.link} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-2xl mr-3">{action.icon}</span>
                  <div>
                    <p className="font-medium">{action.type}</p>
                    <p className="text-2xl font-bold text-primary-600">{action.count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Comprehensive KPIs */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">Platform KPIs</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Total Users</p>
                <p className="text-xl font-bold">{kpis.totalUsers}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Active Users</p>
                <p className="text-xl font-bold text-green-600">{kpis.activeUsers}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">New Users Today</p>
                <p className="text-xl font-bold text-blue-600">{kpis.newUsersToday}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Total Sellers</p>
                <p className="text-xl font-bold">{kpis.totalSellers}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Verified Sellers</p>
                <p className="text-xl font-bold text-green-600">{kpis.verifiedSellers}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Pending Applications</p>
                <p className="text-xl font-bold text-yellow-600">{kpis.pendingSellerApplications}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Total Products</p>
                <p className="text-xl font-bold">{kpis.totalProducts}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Pending Products</p>
                <p className="text-xl font-bold text-yellow-600">{kpis.pendingProducts}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Total Orders</p>
                <p className="text-xl font-bold">{kpis.totalOrders}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Pending Orders</p>
                <p className="text-xl font-bold text-yellow-600">{kpis.pendingOrders}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Completed Orders</p>
                <p className="text-xl font-bold text-green-600">{kpis.completedOrders}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Cancelled Orders</p>
                <p className="text-xl font-bold text-red-600">{kpis.cancelledOrders}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Total Sales</p>
                <p className="text-xl font-bold">{(kpis.totalSales / 1000000).toFixed(1)}M BIF</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Platform Commission</p>
                <p className="text-xl font-bold text-green-600">{(kpis.platformCommission / 1000000).toFixed(1)}M BIF</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Pending Payouts</p>
                <p className="text-xl font-bold text-yellow-600">{(kpis.pendingSellerPayouts / 1000000).toFixed(1)}M BIF</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Delivery Failures</p>
                <p className="text-xl font-bold text-red-600">{kpis.deliveryFailures}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-xs">Open Disputes</p>
                <p className="text-xl font-bold text-red-600">{kpis.openDisputes}</p>
              </div>
            </div>
          </div>

          {/* Admin Role Management */}
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Admin Role Management</h2>
              <Link to="/admin-super/roles" className="text-primary-600 hover:underline text-sm">
                Manage Roles
              </Link>
            </div>
            <div className="space-y-3">
              {adminRoles.map((role, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-600 font-bold">{role.count}</span>
                    </div>
                    <div>
                      <p className="font-medium">{role.role}</p>
                      <p className="text-sm text-gray-600">Last active: {role.lastActive}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${role.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {role.status.toUpperCase()}
                    </span>
                    <Button variant="secondary" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">System Health</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">API</span>
                  <span className="font-bold text-green-600">� Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Database</span>
                  <span className="font-bold text-green-600">🟢 Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payment Service</span>
                  <span className="font-bold text-green-600">🟢 Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">SMS</span>
                  <span className="font-bold text-green-600">🟢 Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-bold text-green-600">🟢 Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Storage</span>
                  <span className="font-bold text-green-600">🟢 Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivery API</span>
                  <span className="font-bold text-green-600">🟢 Operational</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">New seller approved</p>
                    <p className="text-sm text-gray-600">Tech Hub • by Finance Admin</p>
                  </div>
                  <span className="text-sm text-gray-500">5 mins ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">Campaign created</p>
                    <p className="text-sm text-gray-600">Summer Sale 2024 • by Marketing Manager</p>
                  </div>
                  <span className="text-sm text-gray-500">15 mins ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">Product flagged</p>
                    <p className="text-sm text-gray-600">Nike Air Max • by Content Moderator</p>
                  </div>
                  <span className="text-sm text-gray-500">30 mins ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Shipment delayed</p>
                    <p className="text-sm text-gray-600">SHP-12343 • by Logistics Manager</p>
                  </div>
                  <span className="text-sm text-gray-500">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Alerts */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">System Alerts</h2>
              <Link to="/admin-super/alerts" className="text-primary-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAlertColor(alert.type)}`}>
                      {alert.type.toUpperCase()}
                    </span>
                    <p className="ml-3 font-medium">{alert.message}</p>
                  </div>
                  <span className="text-sm text-gray-500">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
