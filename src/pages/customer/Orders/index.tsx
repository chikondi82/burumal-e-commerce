import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerOrders() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState<'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');

  const mockOrders = [
    {
      id: '#BUR10293',
      product: 'Nike Air Max',
      image: 'https://via.placeholder.com/100',
      total: 85000,
      status: 'Out for delivery',
      statusColor: 'text-green-600',
      date: '16 Aug 2026',
      items: 1,
    },
    {
      id: '#BUR10288',
      product: 'Samsung A15',
      image: 'https://via.placeholder.com/100',
      total: 450000,
      status: 'Shipped',
      statusColor: 'text-blue-600',
      date: '15 Aug 2026',
      items: 1,
    },
    {
      id: '#BUR10280',
      product: 'T-Shirt x2',
      image: 'https://via.placeholder.com/100',
      total: 40000,
      status: 'Processing',
      statusColor: 'text-yellow-600',
      date: '14 Aug 2026',
      items: 2,
    },
    {
      id: '#BUR10275',
      product: 'Headphones',
      image: 'https://via.placeholder.com/100',
      total: 65000,
      status: 'Delivered',
      statusColor: 'text-green-600',
      date: '10 Aug 2026',
      items: 1,
    },
    {
      id: '#BUR10270',
      product: 'Watch',
      image: 'https://via.placeholder.com/100',
      total: 120000,
      status: 'Cancelled',
      statusColor: 'text-red-600',
      date: '8 Aug 2026',
      items: 1,
    },
  ];

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
  ] as const;

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'processing') return order.status === 'Processing';
    if (activeTab === 'shipped') return order.status === 'Shipped' || order.status === 'Out for delivery';
    if (activeTab === 'delivered') return order.status === 'Delivered';
    if (activeTab === 'cancelled') return order.status === 'Cancelled';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">🛒 My Orders</h1>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600">No orders found</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="card">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={order.image}
                        alt={order.product}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-lg">{order.id}</p>
                          <p className="text-gray-600">{order.product}</p>
                          <p className="text-sm text-gray-500">{order.date} • {order.items} item(s)</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl">{order.total.toLocaleString()} BIF</p>
                          <span className={order.statusColor + ' font-medium'}>
                            {order.status === 'Out for delivery' ? '🟢' : order.status === 'Shipped' ? '🔵' : order.status === 'Processing' ? '🟡' : order.status === 'Delivered' ? '✅' : '❌'} {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Link
                          to={`/orders/${order.id.slice(1)}`}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                        >
                          View Details
                        </Link>
                        {order.status === 'Out for delivery' && (
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm">
                            Track
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
