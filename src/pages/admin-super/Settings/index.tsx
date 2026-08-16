import { useState } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminSettings() {
  const [activeTab, setActiveTab] = useState('marketplace');

  const marketplaceSettings = {
    name: 'BURUMAL',
    currency: 'BIF',
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'fr', 'rn'],
    minimumOrderValue: 5000,
    commissionRate: 5,
  };

  const deliverySettings = {
    standardDeliveryPrice: 5000,
    expressDeliveryPrice: 10000,
    estimatedDeliveryDays: 3,
    freeDeliveryThreshold: 50000,
  };

  const paymentSettings = {
    enabledMethods: ['mobile_money', 'bank_transfer'],
    mobileMoneyProvider: 'EcoCash',
    transactionLimit: 5000000,
  };

  const sellerSettings = {
    sellerCommission: 5,
    verificationRequired: true,
    subscriptionEnabled: false,
    subscriptionFee: 0,
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully');
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Platform Settings</h1>
          <p className="text-gray-600">Configure global platform settings</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'marketplace' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'delivery' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Delivery
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'payments' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Payments
          </button>
          <button
            onClick={() => setActiveTab('seller')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'seller' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Seller
          </button>
        </div>

        {/* Marketplace Settings */}
        {activeTab === 'marketplace' && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Marketplace Settings</h2>
            <div className="space-y-4">
              <Input
                label="Marketplace Name"
                value={marketplaceSettings.name}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="BIF">BIF (Burundian Franc)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="rn">Kirundi</option>
                </select>
              </div>
              <Input
                label="Minimum Order Value (BIF)"
                type="number"
                value={marketplaceSettings.minimumOrderValue}
              />
              <Input
                label="Commission Rate (%)"
                type="number"
                value={marketplaceSettings.commissionRate}
              />
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </div>
        )}

        {/* Delivery Settings */}
        {activeTab === 'delivery' && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Delivery Settings</h2>
            <div className="space-y-4">
              <Input
                label="Standard Delivery Price (BIF)"
                type="number"
                value={deliverySettings.standardDeliveryPrice}
              />
              <Input
                label="Express Delivery Price (BIF)"
                type="number"
                value={deliverySettings.expressDeliveryPrice}
              />
              <Input
                label="Estimated Delivery Days"
                type="number"
                value={deliverySettings.estimatedDeliveryDays}
              />
              <Input
                label="Free Delivery Threshold (BIF)"
                type="number"
                value={deliverySettings.freeDeliveryThreshold}
              />
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </div>
        )}

        {/* Payment Settings */}
        {activeTab === 'payments' && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Payment Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enabled Payment Methods</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span>Mobile Money</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span>Bank Transfer</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Credit Card</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Money Provider</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="EcoCash">EcoCash</option>
                  <option value="Lumitel">Lumitel</option>
                  <option value="Smart">Smart</option>
                </select>
              </div>
              <Input
                label="Transaction Limit (BIF)"
                type="number"
                value={paymentSettings.transactionLimit}
              />
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </div>
        )}

        {/* Seller Settings */}
        {activeTab === 'seller' && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Seller Settings</h2>
            <div className="space-y-4">
              <Input
                label="Seller Commission Rate (%)"
                type="number"
                value={sellerSettings.sellerCommission}
              />
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span>Require seller verification</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Enable seller subscription</span>
              </label>
              <Input
                label="Subscription Fee (BIF)"
                type="number"
                value={sellerSettings.subscriptionFee}
              />
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
