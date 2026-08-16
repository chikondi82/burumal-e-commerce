import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerReviews() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (!user) {
      navigate('/auth/login');
      return;
    }
    // Redirect customers to access denied page with clear message
    if (user && user.role !== 'seller') {
      navigate('/access-denied');
      return;
    }
  }, [user, navigate]);

  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [responseText, setResponseText] = useState('');

  const storeRating = {
    overall: 4.8,
    totalReviews: 126,
    distribution: {
      fiveStars: 108,
      fourStars: 12,
      threeStars: 4,
      twoStars: 1,
      oneStar: 1,
    },
  };

  const reviews = [
    {
      id: 'REV-001',
      customer: 'Jean',
      rating: 5,
      comment: 'Very good product and fast delivery. The quality exceeded my expectations!',
      product: 'Nike Shoes',
      date: '2024-08-15',
      response: null,
    },
    {
      id: 'REV-002',
      customer: 'Marie',
      rating: 4,
      comment: 'Good quality but delivery took a bit longer than expected. Overall satisfied.',
      product: 'Designer Dress',
      date: '2024-08-14',
      response: 'Thank you for your feedback, Marie! We apologize for the delay and appreciate your patience.',
    },
    {
      id: 'REV-003',
      customer: 'Pierre',
      rating: 5,
      comment: 'Excellent product! Will definitely buy again.',
      product: 'Samsung Galaxy',
      date: '2024-08-13',
      response: null,
    },
    {
      id: 'REV-004',
      customer: 'Claude',
      rating: 3,
      comment: 'The product is okay but not as described. The color is different.',
      product: 'Wireless Headphones',
      date: '2024-08-12',
      response: null,
    },
  ];

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleRespond = (review: any) => {
    setSelectedReview(review);
    setShowResponseModal(true);
  };

  const handleSubmitResponse = () => {
    // In production, this would call an API to submit the response
    setShowResponseModal(false);
    setSelectedReview(null);
    setResponseText('');
  };

  const handleReport = (reviewId: string) => {
    // In production, this would call an API to report the review
    console.log('Review reported:', reviewId);
    alert('Review reported to BURUMAL for review');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-2xl font-bold mb-6">⭐ Reviews</h1>

            {/* Store Rating Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Store Rating</h2>
                <div className="flex items-center mb-4">
                  <span className="text-5xl font-bold text-yellow-500 mr-4">{storeRating.overall}</span>
                  <div>
                    <p className="text-yellow-500 text-2xl">{renderStars(Math.round(storeRating.overall))}</p>
                    <p className="text-gray-600 text-sm">{storeRating.totalReviews} reviews</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {Object.entries(storeRating.distribution).reverse().map(([stars, count]) => (
                    <div key={stars} className="flex items-center">
                      <span className="text-sm w-12">{stars === 'fiveStars' ? '5 ⭐' : stars === 'fourStars' ? '4 ⭐' : stars === 'threeStars' ? '3 ⭐' : stars === 'twoStars' ? '2 ⭐' : '1 ⭐'}</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${(count / storeRating.totalReviews) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Rating Breakdown</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">5 Stars</span>
                    <span className="font-semibold">{((storeRating.distribution.fiveStars / storeRating.totalReviews) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">4 Stars</span>
                    <span className="font-semibold">{((storeRating.distribution.fourStars / storeRating.totalReviews) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">3 Stars</span>
                    <span className="font-semibold">{((storeRating.distribution.threeStars / storeRating.totalReviews) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">2 Stars</span>
                    <span className="font-semibold">{((storeRating.distribution.twoStars / storeRating.totalReviews) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">1 Star</span>
                    <span className="font-semibold">{((storeRating.distribution.oneStar / storeRating.totalReviews) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Reviews</h2>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Reviews</option>
                  <option>With Response</option>
                  <option>Without Response</option>
                  <option>Low Ratings</option>
                </select>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-3">
                          <p className="font-semibold">{review.customer}</p>
                          <span className="text-yellow-500">{renderStars(review.rating)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{review.product} • {review.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    
                    {review.response ? (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <p className="text-sm font-semibold text-blue-800 mb-1">Your Response:</p>
                        <p className="text-sm text-blue-700">{review.response}</p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleRespond(review)}>Respond</Button>
                        <Button variant="secondary" size="sm" onClick={() => handleReport(review.id)}>Report</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Response Modal */}
            {showResponseModal && selectedReview && (
              <div className="card mt-6">
                <h2 className="text-lg font-semibold mb-4">Respond to Review</h2>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">{selectedReview.customer}</p>
                  <p className="text-yellow-500">{renderStars(selectedReview.rating)}</p>
                  <p className="text-gray-700 mt-2">{selectedReview.comment}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Write your response to this review..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSubmitResponse}>Submit Response</Button>
                    <Button variant="secondary" onClick={() => setShowResponseModal(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
