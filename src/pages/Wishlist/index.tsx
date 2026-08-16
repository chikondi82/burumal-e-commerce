import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileNav from '../../components/layout/MobileNav';
import EmptyState from '../../components/common/EmptyState';

export default function Wishlist() {
  const mockWishlist = [
    {
      id: 1,
      name: 'Nike Air Max',
      price: 85000,
      currency: 'BIF',
      image: 'https://via.placeholder.com/200',
      rating: 4.8,
      reviewCount: 126,
      seller: { name: 'Maison XYZ', verified: true },
    },
    {
      id: 2,
      name: 'Samsung Galaxy',
      price: 450000,
      currency: 'BIF',
      image: 'https://via.placeholder.com/200',
      rating: 4.6,
      reviewCount: 89,
      seller: { name: 'Tech Hub', verified: true },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
          
          {mockWishlist.length === 0 ? (
            <EmptyState
              title="Your wishlist is empty"
              description="Save items you love by clicking the heart icon on any product."
              icon={
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              action={{
                label: 'Start Shopping',
                onClick: () => (window.location.href = '/'),
              }}
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockWishlist.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-200 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
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
                    <button className="w-full mt-2 btn-primary text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
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
