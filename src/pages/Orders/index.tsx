import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileNav from '../../components/layout/MobileNav';
import EmptyState from '../../components/common/EmptyState';

export default function Orders() {
  const mockOrders = [
    {
      id: 'ORD-12345',
      date: '2024-01-15',
      status: 'processing',
      total: 173000,
      currency: 'BIF',
      items: 2,
    },
    {
      id: 'ORD-12344',
      date: '2024-01-10',
      status: 'delivered',
      total: 65000,
      currency: 'BIF',
      items: 1,
    },
    {
      id: 'ORD-12343',
      date: '2024-01-05',
      status: 'delivered',
      total: 450000,
      currency: 'BIF',
      items: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>
          
          {mockOrders.length === 0 ? (
            <EmptyState
              title="No orders yet"
              description="You haven't placed any orders yet. Start shopping to see your orders here."
              icon={
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              action={{
                label: 'Start Shopping',
                onClick: () => (window.location.href = '/'),
              }}
            />
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Link
                  key={order.id}
                  to={`/orders/${order.id}`}
                  className="card block hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{order.items} item(s)</span>
                    <span className="font-bold text-primary-600">
                      {order.total.toLocaleString()} {order.currency}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
