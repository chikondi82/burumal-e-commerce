import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileNav from '../../components/layout/MobileNav';
import Button from '../../components/common/Button';
import { cartService } from '../../services/cartService';

export default function Product() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, this would come from API
  const product = {
    id: id || '1',
    name: 'Nike Air Max',
    description: 'Comfortable and stylish running shoes with excellent cushioning and support. Perfect for daily wear and athletic activities.',
    price: 85000,
    currency: 'BIF',
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/400',
    ],
    stock: 15,
    rating: 4.8,
    reviewCount: 126,
    seller: {
      id: '1',
      name: 'Maison XYZ',
      verified: true,
      rating: 4.8,
      fulfillment: 98,
    },
    inStock: true,
  };

  const handleAddToCart = () => {
    cartService.addToCart(product, quantity);
    alert(`${quantity} ${product.name} added to cart!`);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + delta));
    setQuantity(newQuantity);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">⭐</span>
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="ml-1 text-gray-600">({product.reviewCount} {t('product.reviews')})</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-primary-600 mb-4">
                {product.price.toLocaleString()} {product.currency}
              </div>

              {/* Stock Status */}
              <div className="flex items-center mb-4">
                {product.inStock ? (
                  <span className="text-green-600 font-medium">✓ {t('product.inStock')}</span>
                ) : (
                  <span className="text-red-600 font-medium">✗ {t('product.outOfStock')}</span>
                )}
              </div>

              {/* Seller Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-600 mr-2">Seller:</span>
                  <span className="font-medium">{product.seller.name}</span>
                  {product.seller.verified && (
                    <span className="ml-2 text-green-600">✓ {t('product.verifiedSeller')}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>⭐ {product.seller.rating}</span>
                  <span>{product.seller.fulfillment}% fulfilled</span>
                </div>
                <Link
                  to={`/seller/${product.seller.id}`}
                  className="text-primary-600 text-sm font-medium mt-2 inline-block"
                >
                  {t('product.viewStore')} →
                </Link>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 border border-gray-300 rounded-l-lg flex items-center justify-center hover:bg-gray-100"
                >
                  −
                </button>
                <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center font-medium">
                  {quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 border border-gray-300 rounded-r-lg flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                fullWidth
                size="lg"
                disabled={!product.inStock}
              >
                {t('product.addToCart')}
              </Button>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">{t('product.description')}</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Delivery Info */}
              <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">{t('product.delivery')}</h2>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>📍 Bujumbura</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {t('product.estimatedDelivery')}: 1–2 days
                </p>
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
