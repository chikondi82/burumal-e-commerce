import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerPromotions() {
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

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    name: '',
    type: 'percentage',
    value: '',
    startDate: '',
    endDate: '',
    applicableProducts: 'all',
  });

  const promotions = [
    {
      id: 'PROM-001',
      name: 'Weekend Sale',
      type: 'percentage',
      value: 15,
      startDate: '2024-08-10',
      endDate: '2024-08-18',
      status: 'active',
      applicableProducts: 24,
      totalUses: 156,
    },
    {
      id: 'PROM-002',
      name: 'Flash Sale - Electronics',
      type: 'fixed',
      value: 10000,
      startDate: '2024-08-15',
      endDate: '2024-08-16',
      status: 'active',
      applicableProducts: 8,
      totalUses: 45,
    },
    {
      id: 'PROM-003',
      name: 'Back to School',
      type: 'percentage',
      value: 20,
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      status: 'active',
      applicableProducts: 15,
      totalUses: 234,
    },
    {
      id: 'PROM-004',
      name: 'Summer Clearance',
      type: 'percentage',
      value: 30,
      startDate: '2024-07-01',
      endDate: '2024-07-31',
      status: 'expired',
      applicableProducts: 32,
      totalUses: 567,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreatePromotion = () => {
    // In production, this would call an API to create the promotion
    setShowCreateModal(false);
    setNewPromotion({
      name: '',
      type: 'percentage',
      value: '',
      startDate: '',
      endDate: '',
      applicableProducts: 'all',
    });
  };

  const handleToggleStatus = (promotionId: string) => {
    // In production, this would call an API to toggle the promotion status
    console.log('Toggle promotion:', promotionId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">🎟️ Promotions</h1>
              <Button onClick={() => setShowCreateModal(true)}>+ Create Promotion</Button>
            </div>

            {/* Create Promotion Modal */}
            {showCreateModal && (
              <div className="card mb-6">
                <h2 className="text-lg font-semibold mb-4">Create New Promotion</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Name</label>
                    <input
                      type="text"
                      value={newPromotion.name}
                      onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="e.g., Weekend Sale"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                    <select
                      value={newPromotion.type}
                      onChange={(e) => setNewPromotion({ ...newPromotion, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="percentage">Percentage Discount</option>
                      <option value="fixed">Fixed Amount (BIF)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {newPromotion.type === 'percentage' ? 'Discount Percentage (%)' : 'Discount Amount (BIF)'}
                    </label>
                    <input
                      type="number"
                      value={newPromotion.value}
                      onChange={(e) => setNewPromotion({ ...newPromotion, value: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder={newPromotion.type === 'percentage' ? 'e.g., 15' : 'e.g., 10000'}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={newPromotion.startDate}
                        onChange={(e) => setNewPromotion({ ...newPromotion, startDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        value={newPromotion.endDate}
                        onChange={(e) => setNewPromotion({ ...newPromotion, endDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Applicable Products</label>
                    <select
                      value={newPromotion.applicableProducts}
                      onChange={(e) => setNewPromotion({ ...newPromotion, applicableProducts: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="all">All Products</option>
                      <option value="category">Specific Category</option>
                      <option value="selected">Selected Products</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreatePromotion}>Create Promotion</Button>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Promotions List */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Current Promotions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Promotion</th>
                      <th className="text-left p-4">Type</th>
                      <th className="text-left p-4">Value</th>
                      <th className="text-left p-4">Duration</th>
                      <th className="text-left p-4">Products</th>
                      <th className="text-left p-4">Uses</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotions.map((promotion) => (
                      <tr key={promotion.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{promotion.name}</td>
                        <td className="p-4 capitalize">{promotion.type}</td>
                        <td className="p-4 font-semibold">
                          {promotion.type === 'percentage' ? `${promotion.value}%` : `${promotion.value.toLocaleString()} BIF`}
                        </td>
                        <td className="p-4 text-sm">
                          {promotion.startDate} to {promotion.endDate}
                        </td>
                        <td className="p-4">{promotion.applicableProducts}</td>
                        <td className="p-4">{promotion.totalUses}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(promotion.status)}`}>
                            {promotion.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm">Edit</Button>
                            {promotion.status === 'active' && (
                              <Button variant="secondary" size="sm" onClick={() => handleToggleStatus(promotion.id)}>Pause</Button>
                            )}
                            {promotion.status === 'paused' && (
                              <Button size="sm" onClick={() => handleToggleStatus(promotion.id)}>Resume</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Promotion Tips */}
            <div className="card mt-6 bg-blue-50 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Promotion Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use percentage discounts for higher-priced items</li>
                <li>• Use fixed amount discounts for lower-priced items</li>
                <li>• Limited-time promotions create urgency and increase conversions</li>
                <li>• Target specific categories to boost slow-moving inventory</li>
                <li>• Monitor promotion performance to optimize future campaigns</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
