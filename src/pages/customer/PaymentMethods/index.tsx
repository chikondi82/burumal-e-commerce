import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerPaymentMethods() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'mobile_money',
      provider: 'EcoCash',
      lastFour: '4521',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mobile_money',
      provider: 'Lumitel',
      lastFour: '7890',
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'mobile_money',
    provider: '',
    phoneNumber: '',
  });

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMethod = {
      id: Date.now().toString(),
      type: formData.type,
      provider: formData.provider,
      lastFour: formData.phoneNumber.slice(-4),
      isDefault: paymentMethods.length === 0,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddForm(false);
    setFormData({ type: 'mobile_money', provider: '', phoneNumber: '' });
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'EcoCash': return '📱';
      case 'Lumitel': return '📱';
      case 'Smart': return '📱';
      default: return '💳';
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">💳 Payment Methods</h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              + Add Payment Method
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> We support Mobile Money (EcoCash, Lumitel, Smart), Bank Transfer, BurundiPay, and Cash on Delivery. Your payment information is securely stored.
            </p>
          </div>

          {showAddForm && (
            <div className="card mb-6">
              <h2 className="text-lg font-semibold mb-4">Add New Payment Method</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="mobile_money">Mobile Money</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="burundi_pay">BurundiPay</option>
                  </select>
                </div>
                {formData.type === 'mobile_money' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                      <select
                        value={formData.provider}
                        onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="">Select provider</option>
                        <option value="EcoCash">EcoCash</option>
                        <option value="Lumitel">Lumitel</option>
                        <option value="Smart">Smart</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="+257 XX XXX XXX"
                        required
                      />
                    </div>
                  </>
                )}
                {formData.type === 'bank' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Number</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Enter your bank account number"
                      required
                    />
                  </div>
                )}
                {formData.type === 'burundi_pay' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">BurundiPay Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="+257 XX XXX XXX"
                      required
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Add Payment Method
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {paymentMethods.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 mb-4">No payment methods added yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="text-primary-600 hover:underline"
              >
                Add your first payment method
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`card relative ${method.isDefault ? 'border-2 border-primary-500' : ''}`}
                >
                  {method.isDefault && (
                    <span className="absolute top-2 right-2 px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded">
                      Default
                    </span>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{getProviderIcon(method.provider)}</span>
                    <div>
                      <p className="font-bold text-lg">{method.provider}</p>
                      <p className="text-gray-600">**** {method.lastFour}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
