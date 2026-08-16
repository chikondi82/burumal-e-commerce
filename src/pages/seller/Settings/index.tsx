import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerSettings() {
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

  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);

  const [accountData, setAccountData] = useState({
    firstName: 'Jean',
    lastName: 'Niyonzima',
    email: 'jean@maisonxyz.bj',
    phone: '+257 79 123 456',
    twoFactorEnabled: false,
  });

  const [businessData, setBusinessData] = useState({
    businessName: 'Maison XYZ',
    businessType: 'Individual',
    registrationNumber: 'REG-2024-001234',
    taxId: 'TAX-2024-567890',
    businessAddress: 'Bujumbura, Quartier Mutanga',
    businessPhone: '+257 79 123 456',
    businessEmail: 'contact@maisonxyz.bj',
  });

  const [paymentData, setPaymentData] = useState({
    payoutMethod: 'bank_transfer',
    bankName: 'Bank of Burundi',
    accountNumber: '1234567890',
    accountHolder: 'Jean Niyonzima',
    branch: 'Bujumbura Main Branch',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    paymentNotifications: true,
    stockAlerts: true,
    reviews: true,
    marketing: false,
    promotions: true,
    systemUpdates: true,
  });

  const handleSave = () => {
    // In production, this would call an API to save the settings
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
            <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              <button
                onClick={() => setActiveTab('account')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'account'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'business'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Business
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'payments'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Payments
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'notifications'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Notifications
              </button>
            </div>

            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Account Settings</h2>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>Save</Button>
                      <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={accountData.firstName}
                          onChange={(e) => setAccountData({ ...accountData, firstName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900">{accountData.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={accountData.lastName}
                          onChange={(e) => setAccountData({ ...accountData, lastName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900">{accountData.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={accountData.email}
                        onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{accountData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={accountData.phone}
                        onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{accountData.phone}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        accountData.twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                      onClick={() => setAccountData({ ...accountData, twoFactorEnabled: !accountData.twoFactorEnabled })}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          accountData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="secondary">Change Password</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Business Settings */}
            {activeTab === 'business' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Business Information</h2>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>Save</Button>
                      <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={businessData.businessName}
                        onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{businessData.businessName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                    {isEditing ? (
                      <select
                        value={businessData.businessType}
                        onChange={(e) => setBusinessData({ ...businessData, businessType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      >
                        <option value="individual">Individual</option>
                        <option value="llc">LLC</option>
                        <option value="corporation">Corporation</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">{businessData.businessType}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={businessData.registrationNumber}
                          onChange={(e) => setBusinessData({ ...businessData, registrationNumber: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900">{businessData.registrationNumber}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={businessData.taxId}
                          onChange={(e) => setBusinessData({ ...businessData, taxId: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900">{businessData.taxId}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={businessData.businessAddress}
                        onChange={(e) => setBusinessData({ ...businessData, businessAddress: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{businessData.businessAddress}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Phone</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={businessData.businessPhone}
                          onChange={(e) => setBusinessData({ ...businessData, businessPhone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900">{businessData.businessPhone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={businessData.businessEmail}
                          onChange={(e) => setBusinessData({ ...businessData, businessEmail: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900">{businessData.businessEmail}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payments' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Payment & Payout Settings</h2>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>Save</Button>
                      <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payout Method</label>
                    {isEditing ? (
                      <select
                        value={paymentData.payoutMethod}
                        onChange={(e) => setPaymentData({ ...paymentData, payoutMethod: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      >
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="mobile_money">Mobile Money</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">{paymentData.payoutMethod.replace('_', ' ')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={paymentData.bankName}
                        onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{paymentData.bankName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={paymentData.accountNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, accountNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">••••••••{paymentData.accountNumber.slice(-4)}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={paymentData.accountHolder}
                        onChange={(e) => setPaymentData({ ...paymentData, accountHolder: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{paymentData.accountHolder}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={paymentData.branch}
                        onChange={(e) => setPaymentData({ ...paymentData, branch: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{paymentData.branch}</p>
                    )}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Payouts will be sent to this account. Please ensure all details are correct.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>

                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-sm text-gray-600">
                          {key === 'newOrders' && 'Get notified when you receive new orders'}
                          {key === 'paymentNotifications' && 'Get notified about payment confirmations'}
                          {key === 'stockAlerts' && 'Get notified when products are low in stock'}
                          {key === 'reviews' && 'Get notified when customers leave reviews'}
                          {key === 'marketing' && 'Receive marketing and promotional emails'}
                          {key === 'promotions' && 'Get notified about platform promotions'}
                          {key === 'systemUpdates' && 'Get notified about system updates and maintenance'}
                        </p>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                        onClick={() => setNotificationSettings({ ...notificationSettings, [key]: !value })}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
