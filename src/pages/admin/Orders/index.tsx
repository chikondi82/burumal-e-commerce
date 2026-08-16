import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';

export default function AdminOrders() {
  const mockOrders = [
    { id: 'ORD-12345', customer: 'John Doe', seller: 'Maison XYZ', total: 85000, status: 'pending', date: '2024-01-15' },
    { id: 'ORD-12344', customer: 'Jane Smith', seller: 'Tech Hub', total: 65000, status: 'shipped', date: '2024-01-14' },
    { id: 'ORD-12343', customer: 'Bob Johnson', seller: 'Fashion House', total: 450000, status: 'delivered', date: '2024-01-13' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">Order Management</h1>

          {/* Filters */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <select className="input-field w-auto">
              <option>All Status</option>
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <input type="text" placeholder="Search orders..." className="input-field flex-1" />
          </div>

          {/* Orders Table */}
          <div className="card">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Seller</th>
                  <th className="text-center py-3 px-4">Total</th>
                  <th className="text-center py-3 px-4">Status</th>
                  <th className="text-center py-3 px-4">Date</th>
                  <th className="text-center py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                    <td className="py-3 px-4 text-gray-600">{order.seller}</td>
                    <td className="py-3 px-4 text-center font-bold">{order.total.toLocaleString()} BIF</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">{order.date}</td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
