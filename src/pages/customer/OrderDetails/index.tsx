import { Link, useParams } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';

export default function CustomerOrderDetails() {
  const { id } = useParams();

  const order = {
    id: `#BUR${id}`,
    product: 'Nike Air Max',
    image: 'https://via.placeholder.com/150',
    total: 85000,
    status: 'Out for delivery',
    statusColor: 'text-green-600',
    date: '15 Aug 2026',
    items: 1,
    seller: 'Maison XYZ',
    deliveryAddress: '123 Avenue de l\'Indépendance, Bujumbura, Burundi',
    paymentMethod: 'Cash on delivery',
  };

  const trackingTimeline = [
    { status: 'Order placed', date: '15 Aug, 10:30', completed: true },
    { status: 'Payment confirmed', date: '15 Aug, 10:31', completed: true },
    { status: 'Seller preparing', date: '15 Aug, 14:20', completed: true },
    { status: 'Courier assigned', date: '16 Aug, 08:15', completed: true },
    { status: 'Out for delivery', date: '16 Aug, 10:40', completed: true, current: true },
    { status: 'Delivered', date: 'Expected: 16 Aug, 18:00', completed: false },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <Link to="/orders" className="text-primary-600 hover:underline mb-4 inline-block">
            ← Back to Orders
          </Link>
          
          <h1 className="text-2xl font-bold mb-6">ORDER {order.id}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Info */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Product</h2>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{order.product}</p>
                    <p className="text-gray-600">Seller: {order.seller}</p>
                    <p className="text-gray-600">Qty: {order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">{order.total.toLocaleString()} BIF</p>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Order Tracking</h2>
                <div className="space-y-4">
                  {trackingTimeline.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                        }`}>
                          {step.completed ? '✓' : index + 1}
                        </div>
                        {index < trackingTimeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className={`font-medium ${step.current ? 'text-green-600' : ''}`}>
                          {step.status}
                          {step.current && ' ●'}
                        </p>
                        <p className="text-sm text-gray-600">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
                <p className="text-gray-600">{order.deliveryAddress}</p>
              </div>

              {/* Payment Method */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <p className="text-gray-600">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-20">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product</span>
                    <span className="font-medium">
                      {order.total.toLocaleString()} BIF
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">
                      5,000 BIF
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{(order.total + 5000).toLocaleString()} BIF</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="font-medium text-sm text-gray-600">Order Status</p>
                  <p className={order.statusColor + ' font-bold text-lg'}>{order.status}</p>
                </div>

                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    Track Order
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                    Contact Seller
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                    Need Help?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
