import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerReviews() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState<'pending' | 'my-reviews'>('pending');

  const pendingReviews = [
    {
      id: '1',
      product: 'Nike Air Max',
      image: 'https://via.placeholder.com/100',
      seller: 'Maison XYZ',
      deliveredDate: '15 Aug 2026',
      orderId: '#BUR10293',
    },
    {
      id: '2',
      product: 'Samsung A15',
      image: 'https://via.placeholder.com/100',
      seller: 'Tech Hub',
      deliveredDate: '10 Aug 2026',
      orderId: '#BUR10275',
    },
  ];

  const myReviews = [
    {
      id: '1',
      product: 'T-Shirt',
      image: 'https://via.placeholder.com/100',
      seller: 'Fashion House',
      rating: 5,
      review: 'Great quality, fits perfectly!',
      date: '5 Aug 2026',
    },
    {
      id: '2',
      product: 'Headphones',
      image: 'https://via.placeholder.com/100',
      seller: 'Electronics Plus',
      rating: 4,
      review: 'Good sound quality, but the bass could be better.',
      date: '1 Aug 2026',
    },
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
    ));
  };

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Review submitted successfully!');
    setSelectedProduct(null);
    setRating(0);
    setReviewText('');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">⭐ My Reviews</h1>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'pending'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Rate Your Purchases ({pendingReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('my-reviews')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'my-reviews'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              My Reviews ({myReviews.length})
            </button>
          </div>

          {activeTab === 'pending' && (
            <>
              {selectedProduct ? (
                <div className="card">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.product}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">{selectedProduct.product}</h2>
                      <p className="text-gray-600">by {selectedProduct.seller}</p>
                      <p className="text-sm text-gray-500">Delivered {selectedProduct.deliveredDate}</p>
                      <p className="text-sm text-gray-500">Order {selectedProduct.orderId}</p>
                    </div>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How was your product?
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Write a review
                      </label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="Share your experience with this product..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        📷 Add photos (optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <p className="text-gray-600 mb-2">Drag and drop photos here</p>
                        <p className="text-sm text-gray-500">or</p>
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
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(null)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {pendingReviews.length === 0 ? (
                    <div className="card text-center py-12">
                      <p className="text-gray-600 mb-4">No pending reviews</p>
                      <p className="text-sm text-gray-500">You'll see products here after delivery</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pendingReviews.map((item) => (
                        <div key={item.id} className="card">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.product}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold">{item.product}</h3>
                              <p className="text-sm text-gray-600">by {item.seller}</p>
                              <p className="text-sm text-gray-500">Delivered {item.deliveredDate}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedProduct(item)}
                            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                          >
                            Write Review
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {activeTab === 'my-reviews' && (
            <>
              {myReviews.length === 0 ? (
                <div className="card text-center py-12">
                  <p className="text-gray-600 mb-4">No reviews yet</p>
                  <p className="text-sm text-gray-500">Your reviews will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myReviews.map((review) => (
                    <div key={review.id} className="card">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={review.image}
                            alt={review.product}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold">{review.product}</h3>
                              <p className="text-sm text-gray-600">by {review.seller}</p>
                            </div>
                            <div className="flex">{renderStars(review.rating)}</div>
                          </div>
                          <p className="text-gray-700 mt-2">{review.review}</p>
                          <p className="text-sm text-gray-500 mt-2">{review.date}</p>
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
