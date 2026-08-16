import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';

export default function AdminReports() {
  const mockStats = {
    totalRevenue: 85000000,
    totalOrders: 3420,
    totalUsers: 1250,
    totalSellers: 45,
    averageOrderValue: 24854,
    conversionRate: 3.2,
  };

  const topSellers = [
    { id: 1, name: 'Maison XYZ', revenue: 15000000, orders: 180 },
    { id: 2, name: 'Tech Hub', revenue: 12000000, orders: 150 },
    { id: 3, name: 'Fashion House', revenue: 9500000, orders: 120 },
  ];

  const topCategories = [
    { name: 'Electronics', percentage: 35, revenue: 29750000 },
    { name: 'Fashion', percentage: 28, revenue: 23800000 },
    { name: 'Beauty', percentage: 18, revenue: 15300000 },
    { name: 'Home', percentage: 12, revenue: 10200000 },
    { name: 'Others', percentage: 7, revenue: 5950000 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <Button>Export Report</Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 text-sm">Revenue</p>
              <p className="text-2xl font-bold">{(mockStats.totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Orders</p>
              <p className="text-2xl font-bold">{mockStats.totalOrders}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Users</p>
              <p className="text-2xl font-bold">{mockStats.totalUsers}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Sellers</p>
              <p className="text-2xl font-bold">{mockStats.totalSellers}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Avg Order</p>
              <p className="text-2xl font-bold">{mockStats.averageOrderValue.toLocaleString()}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Conversion</p>
              <p className="text-2xl font-bold">{mockStats.conversionRate}%</p>
            </div>
          </div>

          {/* Top Sellers */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">Top Sellers by Revenue</h2>
            <div className="space-y-3">
              {topSellers.map((seller, index) => (
                <div key={seller.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-3">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-gray-600">{seller.orders} orders</p>
                    </div>
                  </div>
                  <p className="font-bold">{(seller.revenue / 1000000).toFixed(1)}M BIF</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-gray-600">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{(category.revenue / 1000000).toFixed(1)}M BIF</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Platform Activity</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">+15%</p>
                <p className="text-gray-600 text-sm">Revenue Growth</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">+23%</p>
                <p className="text-gray-600 text-sm">New Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">+8%</p>
                <p className="text-gray-600 text-sm">New Sellers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600">+12%</p>
                <p className="text-gray-600 text-sm">Orders</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
