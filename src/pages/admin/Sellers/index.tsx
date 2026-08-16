import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';

export default function AdminSellers() {
  const mockSellers = [
    { id: 1, name: 'Tech Hub', email: 'tech@example.com', phone: '+257 79 123 456', status: 'pending', rating: 0, joined: '2024-01-15' },
    { id: 2, name: 'Fashion House', email: 'fashion@example.com', phone: '+257 79 234 567', status: 'verified', rating: 4.8, joined: '2024-01-14' },
    { id: 3, name: 'Maison XYZ', email: 'maison@example.com', phone: '+257 79 345 678', status: 'verified', rating: 4.6, joined: '2024-01-13' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">Seller Management</h1>

          {/* Filters */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <select className="input-field w-auto">
              <option>All Status</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Rejected</option>
              <option>Suspended</option>
            </select>
            <input type="text" placeholder="Search sellers..." className="input-field flex-1" />
          </div>

          {/* Sellers Table */}
          <div className="card">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Seller</th>
                  <th className="text-left py-3 px-4">Contact</th>
                  <th className="text-center py-3 px-4">Status</th>
                  <th className="text-center py-3 px-4">Rating</th>
                  <th className="text-center py-3 px-4">Joined</th>
                  <th className="text-center py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockSellers.map((seller) => (
                  <tr key={seller.id} className="border-b last:border-0">
                    <td className="py-3 px-4 font-medium">{seller.name}</td>
                    <td className="py-3 px-4 text-gray-600">
                      <p>{seller.email}</p>
                      <p className="text-sm">{seller.phone}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seller.status)}`}>
                        {seller.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {seller.rating > 0 ? `⭐ ${seller.rating}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">{seller.joined}</td>
                    <td className="py-3 px-4 text-center">
                      {seller.status === 'pending' ? (
                        <div className="flex gap-2 justify-center">
                          <Button size="sm">Approve</Button>
                          <Button variant="danger" size="sm">Reject</Button>
                        </div>
                      ) : (
                        <Button variant="secondary" size="sm">
                          View
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
