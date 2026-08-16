import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerAddresses() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const [addresses, setAddresses] = useState([
    {
      id: '1',
      label: '🏠 Home',
      province: 'Bujumbura Mairie',
      commune: 'Bujumbura Centre',
      zone: 'Zone 1',
      quarter: 'Quartier Asiatique',
      street: '123 Avenue de l\'Indépendance',
      additional: 'Near the market, blue gate',
      isDefault: true,
    },
    {
      id: '2',
      label: '💼 Work',
      province: 'Bujumbura Mairie',
      commune: 'Bujumbura Centre',
      zone: 'Zone 2',
      quarter: 'Quartier Commercial',
      street: '45 Rue du Commerce',
      additional: 'Opposite the bank',
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    label: '🏠 Home',
    province: '',
    commune: '',
    zone: '',
    quarter: '',
    street: '',
    additional: '',
  });

  const handleEdit = (address: any) => {
    setEditingId(address.id);
    setFormData({
      label: address.label,
      province: address.province,
      commune: address.commune,
      zone: address.zone,
      quarter: address.quarter,
      street: address.street,
      additional: address.additional,
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter((addr) => addr.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingId
            ? { ...formData, id: editingId, isDefault: addr.isDefault }
            : addr
        )
      );
      setEditingId(null);
    } else {
      setAddresses([
        ...addresses,
        { ...formData, id: Date.now().toString(), isDefault: false },
      ]);
    }
    setShowAddForm(false);
    setFormData({
      label: '🏠 Home',
      province: '',
      commune: '',
      zone: '',
      quarter: '',
      street: '',
      additional: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">📍 My Addresses</h1>
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingId(null);
                setFormData({
                  label: '🏠 Home',
                  province: '',
                  commune: '',
                  zone: '',
                  quarter: '',
                  street: '',
                  additional: '',
                });
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              + Add New Address
            </button>
          </div>

          {showAddForm && (
            <div className="card mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Address' : 'Add New Address'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                  <select
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="🏠 Home">🏠 Home</option>
                    <option value="💼 Work">💼 Work</option>
                    <option value="🏪 Other">🏪 Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Province *</label>
                    <input
                      type="text"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="e.g., Bujumbura Mairie"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commune *</label>
                    <input
                      type="text"
                      value={formData.commune}
                      onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="e.g., Bujumbura Centre"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
                    <input
                      type="text"
                      value={formData.zone}
                      onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="e.g., Zone 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quarter</label>
                    <input
                      type="text"
                      value={formData.quarter}
                      onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="e.g., Quartier Asiatique"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street / Landmark *</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="e.g., 123 Avenue de l'Indépendance"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Directions</label>
                  <textarea
                    value={formData.additional}
                    onChange={(e) => setFormData({ ...formData, additional: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="e.g., Near the market, blue gate"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    {editingId ? 'Update Address' : 'Add Address'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingId(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`card relative ${address.isDefault ? 'border-2 border-primary-500' : ''}`}
              >
                {address.isDefault && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded">
                    Default
                  </span>
                )}
                <div className="mb-4">
                  <p className="font-bold text-lg">{address.label}</p>
                  <p className="text-gray-600">{address.street}</p>
                  <p className="text-gray-600">{address.quarter}, {address.zone}</p>
                  <p className="text-gray-600">{address.commune}, {address.province}</p>
                  {address.additional && (
                    <p className="text-sm text-gray-500 mt-2">📍 {address.additional}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(address)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
