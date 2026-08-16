import { Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';

export default function LogisticsManagerDashboard() {
  const mockStats = {
    totalShipments: 3420,
    inTransit: 156,
    delivered: 2850,
    pending: 234,
    delayed: 45,
    averageDeliveryTime: 2.5,
  };

  const activeShipments = [
    { id: 'SHP-12345', order: 'ORD-12345', destination: 'Bujumbura', status: 'in_transit', eta: '2024-01-16', carrier: 'Express Delivery' },
    { id: 'SHP-12344', order: 'ORD-12344', destination: 'Gitega', status: 'in_transit', eta: '2024-01-17', carrier: 'Standard Shipping' },
    { id: 'SHP-12343', order: 'ORD-12343', destination: 'Bururi', status: 'pending', eta: '2024-01-18', carrier: 'Express Delivery' },
  ];

  const deliveryPartners = [
    { name: 'Express Delivery', active: 45, onTime: 92, rating: 4.8 },
    { name: 'Standard Shipping', active: 78, onTime: 88, rating: 4.5 },
    { name: 'Local Courier', active: 33, onTime: 85, rating: 4.2 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
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
              <h1 className="text-2xl font-bold">Logistics Dashboard</h1>
              <p className="text-gray-600">Shipping, delivery, and tracking</p>
            </div>
            <Button>Export Report</Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 text-sm">Total Shipments</p>
              <p className="text-2xl font-bold">{mockStats.totalShipments}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">In Transit</p>
              <p className="text-2xl font-bold text-blue-600">{mockStats.inTransit}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{mockStats.delivered}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{mockStats.pending}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Delayed</p>
              <p className="text-2xl font-bold text-red-600">{mockStats.delayed}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Avg Delivery</p>
              <p className="text-2xl font-bold">{mockStats.averageDeliveryTime} days</p>
            </div>
          </div>

          {/* Active Shipments */}
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Active Shipments</h2>
              <Link to="/admin-logistics/shipments" className="text-primary-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {activeShipments.map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{shipment.id}</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Order: {shipment.order} • {shipment.destination} • {shipment.carrier}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">ETA: {shipment.eta}</p>
                    <Button variant="secondary" size="sm" className="mt-1">
                      Track
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Partners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Delivery Partners</h2>
              <div className="space-y-4">
                {deliveryPartners.map((partner, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-gray-600">{partner.active} active shipments</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{partner.onTime}% on-time</p>
                      <p className="text-sm text-yellow-500">⭐ {partner.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Delivery Performance</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">On-Time Delivery Rate</span>
                  <span className="font-bold text-green-600">89.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '89.5%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Delivery Time</span>
                  <span className="font-bold">2.5 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Customer Satisfaction</span>
                  <span className="font-bold text-yellow-500">4.6/5.0</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">This Week</span>
                    <span className="font-bold text-green-600">+5.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">SHP-12345 Delivered</p>
                  <p className="text-sm text-gray-600">Bujumbura • Express Delivery</p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">SHP-12344 Picked Up</p>
                  <p className="text-sm text-gray-600">Gitega • Standard Shipping</p>
                </div>
                <span className="text-sm text-gray-500">4 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">SHP-12343 Delayed</p>
                  <p className="text-sm text-gray-600">Bururi • Express Delivery</p>
                </div>
                <span className="text-sm text-gray-500">6 hours ago</span>
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
