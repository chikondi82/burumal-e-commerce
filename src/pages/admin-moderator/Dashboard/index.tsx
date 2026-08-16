import { Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';

export default function ContentModeratorDashboard() {
  const mockStats = {
    pendingReviews: 45,
    reportedProducts: 12,
    flaggedReviews: 8,
    approvedToday: 23,
    rejectedToday: 5,
    pendingSellerVerifications: 3,
  };

  const pendingApprovals = [
    { id: 1, type: 'product', name: 'Nike Air Max', seller: 'Maison XYZ', reason: 'New product', submitted: '2024-01-15' },
    { id: 2, type: 'product', name: 'Samsung Galaxy', seller: 'Tech Hub', reason: 'New product', submitted: '2024-01-15' },
    { id: 3, type: 'seller', name: 'Fashion House', reason: 'New seller application', submitted: '2024-01-14' },
  ];

  const reportedContent = [
    { id: 1, type: 'review', content: 'Product description misleading', reporter: 'John Doe', target: 'Nike Air Max', date: '2024-01-15' },
    { id: 2, type: 'product', content: 'Counterfeit item suspected', reporter: 'Jane Smith', target: 'Designer Dress', date: '2024-01-14' },
    { id: 3, type: 'review', content: 'Inappropriate language', reporter: 'Bob Johnson', target: 'Samsung Galaxy', date: '2024-01-13' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product': return 'bg-blue-100 text-blue-800';
      case 'seller': return 'bg-purple-100 text-purple-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Content Moderation Dashboard</h1>
              <p className="text-gray-600">Product reviews, reports, and approvals</p>
            </div>
            <Button>Export Report</Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 text-sm">Pending Reviews</p>
              <p className="text-2xl font-bold">{mockStats.pendingReviews}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Reported Products</p>
              <p className="text-2xl font-bold text-red-600">{mockStats.reportedProducts}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Flagged Reviews</p>
              <p className="text-2xl font-bold text-yellow-600">{mockStats.flaggedReviews}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Approved Today</p>
              <p className="text-2xl font-bold text-green-600">{mockStats.approvedToday}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Rejected Today</p>
              <p className="text-2xl font-bold text-red-600">{mockStats.rejectedToday}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Seller Verifications</p>
              <p className="text-2xl font-bold text-purple-600">{mockStats.pendingSellerVerifications}</p>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Pending Approvals</h2>
              <Link to="/admin-moderator/approvals" className="text-primary-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(item.type)}`}>
                        {item.type.toUpperCase()}
                      </span>
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="text-sm text-gray-600">{item.seller} • {item.reason} • {item.submitted}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Approve</Button>
                    <Button variant="danger" size="sm">Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reported Content */}
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Reported Content</h2>
              <Link to="/admin-moderator/reports" className="text-primary-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {reportedContent.map((report) => (
                <div key={report.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(report.type)}`}>
                        {report.type.toUpperCase()}
                      </span>
                      <p className="font-medium">{report.content}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Reporter: {report.reporter} • Target: {report.target} • {report.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">Review</Button>
                    <Button variant="danger" size="sm">Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Moderation Activity</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">23</p>
                <p className="text-gray-600 text-sm">Approved Today</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">5</p>
                <p className="text-gray-600 text-sm">Rejected Today</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600">8</p>
                <p className="text-gray-600 text-sm">Flagged for Review</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">156</p>
                <p className="text-gray-600 text-sm">Total This Week</p>
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
