import { useState } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminPromotions() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    name: '',
    type: 'discount',
    discount: '',
    startDate: '',
    endDate: '',
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPromoId, setEditingPromoId] = useState<number | null>(null);
  const [editPromotion, setEditPromotion] = useState({ name: '', type: 'discount', discount: '', status: 'active', startDate: '', endDate: '' });

  const mockPromotions = [
    { id: 1, name: 'Burundi Independence Sale', type: 'discount', discount: '10%', status: 'active', startDate: '2024-07-01', endDate: '2024-07-10' },
    { id: 2, name: 'Summer Clearance', type: 'clearance', discount: '25%', status: 'active', startDate: '2024-08-01', endDate: '2024-08-31' },
    { id: 3, name: 'New Customer Bonus', type: 'coupon', discount: '5000 BIF', status: 'active', startDate: '2024-01-01', endDate: '2024-12-31' },
    { id: 4, name: 'Flash Sale', type: 'discount', discount: '15%', status: 'scheduled', startDate: '2024-09-01', endDate: '2024-09-03' },
    { id: 5, name: 'Back to School', type: 'discount', discount: '20%', status: 'ended', startDate: '2024-01-15', endDate: '2024-02-15' },
  ];

  const handleCreatePromotion = () => {
    alert(`Create promotion: ${newPromotion.name}`);
    setShowCreateModal(false);
    setNewPromotion({ name: '', type: 'discount', discount: '', startDate: '', endDate: '' });
  };

  const handleActivate = (promoId: number) => {
    alert(`Activate promotion ${promoId}`);
  };

  const handleDeactivate = (promoId: number) => {
    alert(`Deactivate promotion ${promoId}`);
  };

  const handleEditPromotion = (promoId: number) => {
    const promo = mockPromotions.find(p => p.id === promoId);
    if (promo) {
      setEditingPromoId(promoId);
      setEditPromotion({ name: promo.name, type: promo.type, discount: promo.discount, status: promo.status, startDate: promo.startDate, endDate: promo.endDate });
      setShowEditModal(true);
    }
  };

  const handleSavePromotion = () => {
    if (editingPromoId !== null) {
      const promoIndex = mockPromotions.findIndex(p => p.id === editingPromoId);
      if (promoIndex !== -1) {
        mockPromotions[promoIndex] = { ...mockPromotions[promoIndex], ...editPromotion };
      }
      setShowEditModal(false);
      setEditingPromoId(null);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Promotions & Marketing</h1>
          <p className="text-gray-600">Create and manage promotional campaigns</p>
        </div>

        {/* Create Promotion Button */}
        <div className="mb-6">
          <Button onClick={() => setShowCreateModal(true)}>+ Create Promotion</Button>
        </div>

        {/* Create Promotion Modal */}
        {showCreateModal && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Create New Promotion</h2>
            <div className="space-y-4">
              <Input
                label="Promotion Name"
                placeholder="e.g., Burundi Independence Sale"
                value={newPromotion.name}
                onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newPromotion.type}
                  onChange={(e) => setNewPromotion({ ...newPromotion, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="discount">Discount</option>
                  <option value="clearance">Clearance</option>
                  <option value="coupon">Coupon</option>
                </select>
              </div>
              <Input
                label="Discount"
                placeholder="e.g., 10% or 5000 BIF"
                value={newPromotion.discount}
                onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
              />
              <Input
                label="Start Date"
                type="date"
                value={newPromotion.startDate}
                onChange={(e) => setNewPromotion({ ...newPromotion, startDate: e.target.value })}
              />
              <Input
                label="End Date"
                type="date"
                value={newPromotion.endDate}
                onChange={(e) => setNewPromotion({ ...newPromotion, endDate: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={handleCreatePromotion}>Create Promotion</Button>
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Promotion Modal */}
        {showEditModal && editingPromoId !== null && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Edit Promotion</h2>
            <div className="space-y-4">
              <Input
                label="Promotion ID"
                value={editingPromoId.toString()}
                disabled
              />
              <Input
                label="Promotion Name"
                value={editPromotion.name}
                onChange={(e) => setEditPromotion({ ...editPromotion, name: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={editPromotion.type}
                  onChange={(e) => setEditPromotion({ ...editPromotion, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="discount">Discount</option>
                  <option value="clearance">Clearance</option>
                  <option value="coupon">Coupon</option>
                </select>
              </div>
              <Input
                label="Discount"
                value={editPromotion.discount}
                onChange={(e) => setEditPromotion({ ...editPromotion, discount: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editPromotion.status}
                  onChange={(e) => setEditPromotion({ ...editPromotion, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="ended">Ended</option>
                </select>
              </div>
              <Input
                label="Start Date"
                type="date"
                value={editPromotion.startDate}
                onChange={(e) => setEditPromotion({ ...editPromotion, startDate: e.target.value })}
              />
              <Input
                label="End Date"
                type="date"
                value={editPromotion.endDate}
                onChange={(e) => setEditPromotion({ ...editPromotion, endDate: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={handleSavePromotion}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Promotions Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Discount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Start Date</th>
                  <th className="text-left p-4">End Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPromotions.map((promo) => (
                  <tr key={promo.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{promo.id}</td>
                    <td className="p-4 font-medium">{promo.name}</td>
                    <td className="p-4">{promo.type}</td>
                    <td className="p-4">{promo.discount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        promo.status === 'active' ? 'bg-green-100 text-green-800' :
                        promo.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {promo.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{promo.startDate}</td>
                    <td className="p-4">{promo.endDate}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {promo.status === 'active' ? (
                          <Button variant="secondary" size="sm" onClick={() => handleDeactivate(promo.id)}>Deactivate</Button>
                        ) : (
                          <Button variant="secondary" size="sm" onClick={() => handleActivate(promo.id)}>Activate</Button>
                        )}
                        <Button variant="secondary" size="sm" onClick={() => handleEditPromotion(promo.id)}>Edit</Button>
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
