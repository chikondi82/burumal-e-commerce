import { useParams, Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileNav from '../../components/layout/MobileNav';
import Button from '../../components/common/Button';

export default function OrderDetails() {
  const { id } = useParams();

  const mockOrder = {
    id: id || 'ORD-12345',
    date: '2024-01-15',
    status: 'processing',
    total: 173000,
    currency: 'BIF',
    deliveryFee: 3000,
    paymentMethod: 'Mobile Money',
    deliveryAddress: {
      name: 'John Doe',
      phone: '+257 79 123 456',
      address: '123 Avenue de l\'Indépendance, Bujumbura, Burundi',
    },
    items: [
      {
        id: 1,
        name: 'Nike Air Max',
        price: 85000,
        quantity: 2,
        total: 170000,
        image: 'https://via.placeholder.com/100',
      },
    ],
  };

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
          <Link to="/orders" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Order #{mockOrder.id}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mockOrder.status)}`}>
                    {mockOrder.status.charAt(0).toUpperCase() + mockOrder.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Order Date: {mockOrder.date}</p>
                  <p>Payment Method: {mockOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Items */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {mockOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">
                        {item.total.toLocaleString()} {mockOrder.currency}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
                <div className="text-gray-600">
                  <p className="font-medium text-gray-900">{mockOrder.deliveryAddress.name}</p>
                  <p>{mockOrder.deliveryAddress.phone}</p>
                  <p>{mockOrder.deliveryAddress.address}</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-20">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {(mockOrder.total - mockOrder.deliveryFee).toLocaleString()} {mockOrder.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      {mockOrder.deliveryFee.toLocaleString()} {mockOrder.currency}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{mockOrder.total.toLocaleString()} {mockOrder.currency}</span>
                    </div>
                  </div>
                </div>

                {mockOrder.status === 'processing' && (
                  <Button variant="danger" fullWidth>
                    Cancel Order
                  </Button>
                )}

                <Link to="/" className="block text-center text-primary-600 mt-4 hover:underline text-sm">
                  Continue Shopping
                </Link>
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
