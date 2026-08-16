import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileNav from '../../components/layout/MobileNav';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { cartService } from '../../services/cartService';
import { authService } from '../../services/authService';

export default function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    setCartItems(cartService.getCartItems());
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const deliveryFee = 3000;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    cartService.updateQuantity(itemId, newQuantity);
    setCartItems(cartService.getCartItems());
  };

  const handleRemoveItem = (itemId: string) => {
    cartService.removeFromCart(itemId);
    setCartItems(cartService.getCartItems());
  };

  const handleCheckout = () => {
    if (!authService.isAuthenticated()) {
      navigate('/auth/login', { state: { redirectTo: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          <div className="container py-12">
            <EmptyState
              title={t('cart.empty')}
              icon={
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              action={{
                label: t('cart.continueShopping'),
                onClick: () => (window.location.href = '/'),
              }}
            />
          </div>
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">{t('cart.title')}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="card flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.product.name}</h3>
                    <p className="text-primary-600 font-bold">
                      {item.product.price.toLocaleString()} {item.product.currency}
                    </p>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-100"
                      >
                        −
                      </button>
                      <div className="w-12 h-8 border-t border-b border-gray-300 flex items-center justify-center font-medium">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">

{item.total.toLocaleString()} {item.product.currency}
</p>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 text-sm mt-2 hover:underline"
                    >
                      {t('common.remove')}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-20">
                <h2 className="text-lg font-semibold mb-4">{t('checkout.orderSummary')}</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.subtotal')}</span>
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

                <Button fullWidth size="lg" onClick={handleCheckout}>
                  {t('cart.checkout')}
                </Button>

                <Link
                  to="/"
                  className="block text-center text-primary-600 mt-4 hover:underline"
                >
                  {t('cart.continueShopping')}
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
