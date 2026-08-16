import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerStoreProfile() {
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

  const [isEditing, setIsEditing] = useState(false);
  const [storeData, setStoreData] = useState({
    name: 'Maison XYZ',
    description: 'Premium fashion and lifestyle products for the modern Burundian. We bring you the latest trends at affordable prices.',
    logo: 'https://via.placeholder.com/150',
    banner: 'https://via.placeholder.com/1200x300',
    category: 'Fashion',
    location: 'Bujumbura, Burundi',
    phone: '+257 79 123 456',
    email: 'contact@maisonxyz.bj',
    businessHours: 'Mon-Sat: 9AM-6PM',
    returnPolicy: '30-day return policy for unused items in original packaging.',
    deliveryPolicy: 'Nationwide delivery within 3-5 business days.',
    socialLinks: {
      facebook: 'https://facebook.com/maisonxyz',
      instagram: 'https://instagram.com/maisonxyz',
      whatsapp: '+257 79 123 456',
    },
  });

  const storeStats = {
    rating: 4.8,
    reviews: 126,
    products: 342,
    followers: 1250,
    joinedDate: 'January 2024',
  };

  const handleSave = () => {
    // In production, this would call an API to save the store data
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">🏪 My Store</h1>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit Store</Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                </div>
              )}
            </div>

            {/* Store Banner */}
            <div className="card mb-6 p-0 overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-primary-500 to-primary-600 relative">
                <img
                  src={storeData.banner}
                  alt="Store Banner"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Button variant="secondary">Change Banner</Button>
                  </div>
                )}
              </div>
              <div className="p-6 relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={storeData.logo}
                        alt="Store Logo"
                        className="w-24 h-24 rounded-lg border-4 border-white shadow-lg -mt-16 bg-white"
                      />
                      {isEditing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg -mt-16">
                          <Button variant="secondary" size="sm">Change Logo</Button>
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold flex items-center">
                        {storeData.name}
                        <span className="ml-2 text-green-600">✓</span>
                      </h2>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center">
                          <span className="text-yellow-500 mr-1">⭐</span>
                          {storeStats.rating} ({storeStats.reviews} reviews)
                        </span>
                        <span>{storeStats.products} products</span>
                        <span>{storeStats.followers} followers</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Joined {storeStats.joinedDate}</p>
                    </div>
                  </div>
                  <Button variant="secondary">View Public Store</Button>
                </div>
              </div>
            </div>

            {/* Store Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Store Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={storeData.name}
                        onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{storeData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    {isEditing ? (
                      <select
                        value={storeData.category}
                        onChange={(e) => setStoreData({ ...storeData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      >
                        <option value="Fashion">Fashion</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Home">Home & Garden</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Food">Food & Groceries</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{storeData.category}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={storeData.location}
                        onChange={(e) => setStoreData({ ...storeData, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{storeData.location}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={storeData.phone}
                        onChange={(e) => setStoreData({ ...storeData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{storeData.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={storeData.email}
                        onChange={(e) => setStoreData({ ...storeData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{storeData.email}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Store Description</h3>
                {isEditing ? (
                  <textarea
                    value={storeData.description}
                    onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-900">{storeData.description}</p>
                )}
              </div>
            </div>

            {/* Policies */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={storeData.businessHours}
                    onChange={(e) => setStoreData({ ...storeData, businessHours: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-900">{storeData.businessHours}</p>
                )}
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Return Policy</h3>
                {isEditing ? (
                  <textarea
                    value={storeData.returnPolicy}
                    onChange={(e) => setStoreData({ ...storeData, returnPolicy: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-900">{storeData.returnPolicy}</p>
                )}
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Delivery Policy</h3>
                {isEditing ? (
                  <textarea
                    value={storeData.deliveryPolicy}
                    onChange={(e) => setStoreData({ ...storeData, deliveryPolicy: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-900">{storeData.deliveryPolicy}</p>
                )}
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Social Links</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={storeData.socialLinks.facebook}
                        onChange={(e) => setStoreData({ ...storeData, socialLinks: { ...storeData.socialLinks, facebook: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <a href={storeData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                        {storeData.socialLinks.facebook}
                      </a>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={storeData.socialLinks.instagram}
                        onChange={(e) => setStoreData({ ...storeData, socialLinks: { ...storeData.socialLinks, instagram: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <a href={storeData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                        {storeData.socialLinks.instagram}
                      </a>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={storeData.socialLinks.whatsapp}
                        onChange={(e) => setStoreData({ ...storeData, socialLinks: { ...storeData.socialLinks, whatsapp: e.target.value } })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{storeData.socialLinks.whatsapp}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
