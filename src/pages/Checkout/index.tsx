import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileNav from '../../components/layout/MobileNav';
import Button from '../../components/common/Button';
import { cartService } from '../../services/cartService';
import { authService } from '../../services/authService';

export default function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedDelivery, setSelectedDelivery] = useState<'standard' | 'express'>('standard');
  const [selectedPayment, setSelectedPayment] = useState<'mobile_money' | 'bank' | 'burundi_pay' | 'cash_on_delivery'>('cash_on_delivery');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [addressData, setAddressData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Bujumbura',
    additionalInfo: '',
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate('/auth/login', { state: { redirectTo: '/checkout' } });
      return;
    }

    // Load cart items
    const items = cartService.getCartItems();
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    setCartItems(items);

    // Pre-fill address with user data if available
    const user = authService.getUser();
    if (user) {
      setAddressData(prev => ({
        ...prev,
        fullName: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
      }));
    }
  }, [navigate]);

  const deliveryOptions = [
    { id: 'standard', name: t('checkout.standard'), fee: 3000, estimated: '3-5 days' },
    { id: 'express', name: t('checkout.express'), fee: 5000, estimated: '1-2 days' },
  ];

  const paymentMethods = [
    { id: 'mobile_money', name: t('checkout.mobileMoney'), icon: '📱' },
    { id: 'bank', name: t('checkout.bank'), icon: '🏦' },
    { id: 'burundi_pay', name: t('checkout.burundiPay'), icon: '💳' },
    { id: 'cash_on_delivery', name: t('checkout.cashOnDelivery'), icon: '💵' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const deliveryFee = selectedDelivery === 'standard' ? 3000 : 5000;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Validate address
    if (!addressData.fullName || !addressData.phone || !addressData.address) {
      alert('Please fill in all required address fields');
      return;
    }

    // Place order logic here
    // In production, this would call an API to create the order
    cartService.clearCart();
    navigate('/order-success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">{t('checkout.title')}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* 1. Delivery Address */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">1. Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={addressData.fullName}
                      onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={addressData.phone}
                      onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="+257 XX XXX XXX"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <input
                      type="text"
                      value={addressData.address}
                      onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Street address, apartment, etc."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={addressData.city}
                      onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information (Optional)</label>
                    <textarea
                      value={addressData.additionalInfo}
                      onChange={(e) => setAddressData({ ...addressData, additionalInfo: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Landmarks, building details, etc."
                    />
                  </div>
                </div>
              </div>

              {/* 2. Delivery Method */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">2. {t('checkout.deliveryMethod')}</h2>
                <div className="space-y-3">
                  {deliveryOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedDelivery === option.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedDelivery(option.id as 'standard' | 'express')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="delivery"
                            checked={selectedDelivery === option.id}
                            onChange={() => setSelectedDelivery(option.id as 'standard' | 'express')}
                            className="w-5 h-5 text-primary-600 mr-3"
                          />
                          <div>
                            <p className="font-medium">{option.name}</p>
                            <p className="text-sm text-gray-600">{option.estimated}</p>
                          </div>
                        </div>
                        <p className="font-bold">{option.fee.toLocaleString()} BIF</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">3. Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPayment(method.id as any)}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id as any)}
                          className="w-5 h-5 text-primary-600 mr-3"
                        />
                        <span className="text-2xl mr-3">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Information */}
                {selectedPayment === 'cash_on_delivery' && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">💵 Cash on Delivery</h3>
                    <p className="text-sm text-blue-700 mb-2">Pay when your order is delivered. No advance payment required.</p>
                    <p className="text-sm text-blue-700">Please have the exact amount ready: <strong>{total.toLocaleString()} BIF</strong></p>
                  </div>
                )}

                {selectedPayment === 'mobile_money' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">📱 Mobile Money Payment</h3>
                    <p className="text-sm text-green-700 mb-2">Make payment via your mobile money provider:</p>
                    <div className="space-y-2 text-sm text-green-700">
                      <p><strong>EcoCash:</strong> +257 79 123 456</p>
                      <p><strong>Lumitel:</strong> +257 79 234 567</p>
                      <p><strong>Smart:</strong> +257 79 345 678</p>
                      <p className="mt-2 font-medium">Amount: {total.toLocaleString()} BIF</p>
                    </div>
                  </div>
                )}

                {selectedPayment === 'bank' && (
                  <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">🏦 Bank Transfer</h3>
                    <p className="text-sm text-purple-700 mb-2">Transfer to our bank account:</p>
                    <div className="space-y-2 text-sm text-purple-700">
                      <p><strong>Bank:</strong> Bank of Burundi</p>
                      <p><strong>Account:</strong> 1234567890</p>
                      <p><strong>Account Name:</strong> BURUMAL Ltd</p>
                      <p className="mt-2 font-medium">Amount: {total.toLocaleString()} BIF</p>
                    </div>
                  </div>
                )}

                {selectedPayment === 'burundi_pay' && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">💳 BurundiPay</h3>
                    <p className="text-sm text-yellow-700 mb-2">Pay using BurundiPay:</p>
                    <div className="space-y-2 text-sm text-yellow-700">
                      <p><strong>Merchant ID:</strong> BURUMAL001</p>
                      <p><strong>Phone:</strong> +257 79 999 999</p>
                      <p className="mt-2 font-medium">Amount: {total.toLocaleString()} BIF</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-20">
                <h2 className="text-lg font-semibold mb-4">{t('checkout.orderSummary')}</h2>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          📦
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.product.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        {item.total.toLocaleString()} BIF
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product</span>
                    <span className="font-medium">
                      {subtotal.toLocaleString()} BIF
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">
                      {deliveryFee.toLocaleString()} BIF
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>{t('cart.total')}</span>
                      <span>{total.toLocaleString()} BIF</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  fullWidth
                  size="lg"
                  className="mt-6"
                >
                  {t('checkout.placeOrder')}
                </Button>

                <Link
                  to="/cart"
                  className="block text-center text-gray-600 mt-4 hover:underline text-sm"
                >
                  ← Back to Cart
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
