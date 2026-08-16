import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerReturns() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const activeReturns = [
    {
      id: 'RET-001',
      orderId: '#BUR10280',
      product: 'Nike Shoes',
      image: 'https://via.placeholder.com/100',
      status: 'Return requested',
      statusColor: 'text-orange-600',
      reason: 'Wrong size',
      requestedDate: '14 Aug 2026',
    },
  ];

  const returnHistory = [
    {
      id: 'RET-002',
      orderId: '#BUR10250',
      product: 'T-Shirt',
      image: 'https://via.placeholder.com/100',
      status: 'Refunded',
      statusColor: 'text-green-600',
      reason: 'Defective',
      requestedDate: '5 Aug 2026',
      completedDate: '8 Aug 2026',
      refundAmount: 20000,
    },
    {
      id: 'RET-003',
      orderId: '#BUR10230',
      product: 'Headphones',
      image: 'https://via.placeholder.com/100',
      status: 'Rejected',
      statusColor: 'text-red-600',
      reason: 'Changed mind',
      requestedDate: '1 Aug 2026',
      completedDate: '2 Aug 2026',
    },
  ];

  const [formData, setFormData] = useState({
    orderId: '',
    reason: '',
    description: '',
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Return request submitted successfully!');
    setShowRequestForm(false);
    setFormData({ orderId: '', reason: '', description: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Return requested':
      case 'Under review':
        return 'text-orange-600';
      case 'Approved':
      case 'Return in progress':
      case 'Received':
        return 'text-blue-600';
      case 'Refund processing':
      case 'Refunded':
        return 'text-green-600';
      case 'Rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">↩️ Returns & Refunds</h1>
            <button
              onClick={() => setShowRequestForm(!showRequestForm)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              + Request Return
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>📋 Return Policy:</strong> You can return products within 7 days of delivery if they're defective, damaged, or not as described. Original packaging required.
            </p>
          </div>

          {showRequestForm && (
            <div className="card mb-6">
              <h2 className="text-lg font-semibold mb-4">Request a Return</h2>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order ID *</label>
                  <input
                    type="text"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="#BURXXXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Return *</label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Select a reason</option>
                    <option value="defective">Defective product</option>
                    <option value="damaged">Damaged during delivery</option>
                    <option value="wrong_item">Wrong item received</option>
                    <option value="wrong_size">Wrong size</option>
                    <option value="not_as_described">Not as described</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="Please provide details about the issue..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📷 Upload photos (optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-gray-600 mb-2">Upload photos of the product</p>
                    <button type="button" className="text-primary-600 hover:underline">
                      Browse files
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'active'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Active Returns ({activeReturns.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Return History ({returnHistory.length})
            </button>
          </div>

          {activeTab === 'active' && (
            <>
              {activeReturns.length === 0 ? (
                <div className="card text-center py-12">
                  <p className="text-gray-600 mb-4">No active returns</p>
                  <button
                    onClick={() => setShowRequestForm(true)}
                    className="text-primary-600 hover:underline"
                  >
                    Request a return
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeReturns.map((returnItem) => (
                    <div key={returnItem.id} className="card">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={returnItem.image}
                            alt={returnItem.product}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-bold">{returnItem.id}</p>
                              <p className="text-gray-600">{returnItem.product}</p>
                              <p className="text-sm text-gray-500">Order {returnItem.orderId}</p>
                              <p className="text-sm text-gray-500">Requested {returnItem.requestedDate}</p>
                            </div>
                            <span className={returnItem.statusColor + ' font-medium'}>
                              🟠 {returnItem.status}
                            </span>
                          </div>
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <strong>Reason:</strong> {returnItem.reason}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm">
                              View Details
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm">
                              Contact Support
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <>
              {returnHistory.length === 0 ? (
                <div className="card text-center py-12">
                  <p className="text-gray-600">No return history</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {returnHistory.map((returnItem) => (
                    <div key={returnItem.id} className="card">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={returnItem.image}
                            alt={returnItem.product}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-bold">{returnItem.id}</p>
                              <p className="text-gray-600">{returnItem.product}</p>
                              <p className="text-sm text-gray-500">Order {returnItem.orderId}</p>
                              <p className="text-sm text-gray-500">
                                Requested {returnItem.requestedDate}
                                {returnItem.completedDate && ` • Completed ${returnItem.completedDate}`}
                              </p>
                            </div>
                            <span className={getStatusColor(returnItem.status) + ' font-medium'}>
                              {returnItem.status === 'Refunded' ? '✅' : returnItem.status === 'Rejected' ? '❌' : '📋'} {returnItem.status}
                            </span>
                          </div>
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <strong>Reason:</strong> {returnItem.reason}
                            </p>
                            {returnItem.refundAmount && (
                              <p className="text-sm text-green-600 mt-1">
                                <strong>Refund:</strong> {returnItem.refundAmount.toLocaleString()} BIF
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
