import { useState } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminReviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockReviews = [
    { id: 1, product: 'Nike Air Max', seller: 'Maison XYZ', customer: 'Jean Niyonzima', rating: 5, comment: 'Great product, fast delivery!', status: 'visible', date: '2024-08-15' },
    { id: 2, product: 'Samsung Galaxy S24', seller: 'Tech Hub', customer: 'Marie Mugisha', rating: 2, comment: 'Product not as described', status: 'visible', date: '2024-08-14' },
    { id: 3, product: 'Summer Dress', seller: 'Fashion House', customer: 'Pierre Ndayisaba', rating: 4, comment: 'Good quality but shipping was slow', status: 'hidden', date: '2024-08-13' },
    { id: 4, product: 'Wireless Earbuds', seller: 'Burundi Electronics', customer: 'Claude Bizimungu', rating: 5, comment: 'Excellent sound quality', status: 'visible', date: '2024-08-12' },
    { id: 5, product: 'Home Decor Set', seller: 'Home Decor Plus', customer: 'Annie Ntiranyibagira', rating: 1, comment: 'Fake product, do not buy!', status: 'reported', date: '2024-08-11' },
  ];

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || review.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleHideReview = (reviewId: number) => {
    alert(`Hide review ${reviewId}`);
  };

  const handleShowReview = (reviewId: number) => {
    alert(`Show review ${reviewId}`);
  };

  const handleDeleteReview = (reviewId: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      alert(`Delete review ${reviewId}`);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Reviews & Moderation</h1>
          <p className="text-gray-600">Moderate product reviews and handle reported content</p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
              <option value="reported">Reported</option>
            </select>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Seller</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Rating</th>
                  <th className="text-left p-4">Comment</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{review.product}</td>
                    <td className="p-4">{review.seller}</td>
                    <td className="p-4">{review.customer}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span>{review.rating}/5</span>
                      </div>
                    </td>
                    <td className="p-4 max-w-xs truncate">{review.comment}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        review.status === 'visible' ? 'bg-green-100 text-green-800' :
                        review.status === 'hidden' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {review.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{review.date}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {review.status === 'visible' ? (
                          <Button variant="secondary" size="sm" onClick={() => handleHideReview(review.id)}>Hide</Button>
                        ) : (
                          <Button variant="secondary" size="sm" onClick={() => handleShowReview(review.id)}>Show</Button>
                        )}
                        <Button variant="secondary" size="sm" onClick={() => handleDeleteReview(review.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
