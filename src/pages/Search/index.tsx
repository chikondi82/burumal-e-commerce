import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileNav from '../../components/layout/MobileNav';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const mockProducts = [
    {
      id: 1,
      name: 'Nike Air Max',
      price: 85000,
      currency: 'BIF',
      image: 'https://via.placeholder.com/200',
      rating: 4.8,
      reviewCount: 126,
    },
    {
      id: 2,
      name: 'Samsung Galaxy',
      price: 450000,
      currency: 'BIF',
      image: 'https://via.placeholder.com/200',
      rating: 4.6,
      reviewCount: 89,
    },
    {
      id: 3,
      name: 'Designer Dress',
      price: 65000,
      currency: 'BIF',
      image: 'https://via.placeholder.com/200',
      rating: 4.9,
      reviewCount: 45,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">{t('nav.search')}</h1>
          
          {/* Search Bar */}
          <div className="mb-8">
            <div className="flex gap-4">
              <Input
                placeholder={t('common.search')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button>Search</Button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-4 flex-wrap">
            <select className="input-field w-auto">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Beauty</option>
            </select>
            <select className="input-field w-auto">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-square bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mb-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-xs text-gray-600 ml-1">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                  <p className="font-bold text-primary-600">
                    {product.price.toLocaleString()} {product.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
