import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';

export default function AdminProducts() {
  const mockProducts = [
    { id: 1, name: 'Nike Air Max', seller: 'Maison XYZ', price: 85000, status: 'active', reported: false, created: '2024-01-15' },
    { id: 2, name: 'Samsung Galaxy', seller: 'Tech Hub', price: 450000, status: 'active', reported: true, created: '2024-01-14' },
    { id: 3, name: 'Designer Dress', seller: 'Fashion House', price: 65000, status: 'pending', reported: false, created: '2024-01-13' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
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
          <h1 className="text-2xl font-bold mb-6">Product Moderation</h1>

          {/* Filters */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <select className="input-field w-auto">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Rejected</option>
              <option>Suspended</option>
            </select>
            <select className="input-field w-auto">
              <option>All Products</option>
              <option>Reported</option>
              <option>Unreported</option>
            </select>
            <input type="text" placeholder="Search products..." className="input-field flex-1" />
          </div>

          {/* Products Table */}
          <div className="card">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Seller</th>
                  <th className="text-center py-3 px-4">Price</th>
                  <th className="text-center py-3 px-4">Status</th>
                  <th className="text-center py-3 px-4">Reported</th>
                  <th className="text-center py-3 px-4">Created</th>
                  <th className="text-center py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4 text-gray-600">{product.seller}</td>
                    <td className="py-3 px-4 text-center font-bold">{product.price.toLocaleString()} BIF</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {product.reported ? (
                        <span className="text-red-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">{product.created}</td>
                    <td className="py-3 px-4 text-center">
                      {product.status === 'pending' ? (
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
