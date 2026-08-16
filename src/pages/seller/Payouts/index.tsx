import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerPayouts() {
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

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState('');

  const payoutData = {
    availableBalance: 850000,
    minimumPayout: 10000,
    currency: 'BIF',
  };

  const recentPayouts = [
    { id: 'PAYOUT-001', amount: 250000, status: 'completed', date: '2024-08-12', method: 'Bank Transfer' },
    { id: 'PAYOUT-002', amount: 500000, status: 'completed', date: '2024-08-03', method: 'Bank Transfer' },
    { id: 'PAYOUT-003', amount: 150000, status: 'completed', date: '2024-07-25', method: 'Bank Transfer' },
    { id: 'PAYOUT-004', amount: 300000, status: 'processing', date: '2024-08-15', method: 'Bank Transfer' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRequestPayout = () => {
    if (parseInt(requestAmount) >= payoutData.minimumPayout && parseInt(requestAmount) <= payoutData.availableBalance) {
      setShowRequestModal(false);
      setRequestAmount('');
      // In production, this would call an API to request the payout
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-2xl font-bold mb-6">💸 Payouts</h1>

            {/* Available Balance Card */}
            <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white mb-8">
              <p className="text-primary-100 text-sm mb-1">Available for Payout</p>
              <p className="text-4xl font-bold mb-2">{payoutData.availableBalance.toLocaleString()} {payoutData.currency}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-primary-100">Minimum payout: {payoutData.minimumPayout.toLocaleString()} {payoutData.currency}</p>
                <Button onClick={() => setShowRequestModal(true)} className="bg-white text-primary-600 hover:bg-gray-100">
                  Request Payout
                </Button>
              </div>
            </div>

            {/* Request Payout Modal */}
            {showRequestModal && (
              <div className="card mb-6">
                <h2 className="text-lg font-semibold mb-4">Request Payout</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount ({payoutData.currency})</label>
                    <input
                      type="number"
                      min={payoutData.minimumPayout}
                      max={payoutData.availableBalance}
                      value={requestAmount}
                      onChange={(e) => setRequestAmount(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder={`Enter amount (min: ${payoutData.minimumPayout.toLocaleString()})`}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Available: {payoutData.availableBalance.toLocaleString()} {payoutData.currency}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleRequestPayout}>Submit Request</Button>
                    <Button variant="secondary" onClick={() => setShowRequestModal(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Payouts */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Recent Payouts</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Payout ID</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Method</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPayouts.map((payout) => (
                      <tr key={payout.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{payout.id}</td>
                        <td className="p-4 font-semibold">{payout.amount.toLocaleString()} {payoutData.currency}</td>
                        <td className="p-4">{payout.method}</td>
                        <td className="p-4 text-gray-600">{payout.date}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                            {payout.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payout Information */}
            <div className="card mt-6">
              <h3 className="font-semibold mb-4">💡 Payout Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Payouts are processed within 3-5 business days</p>
                <p>• Minimum payout amount: {payoutData.minimumPayout.toLocaleString()} {payoutData.currency}</p>
                <p>• Funds will be transferred to your registered bank account</p>
                <p>• You will receive a notification when your payout is processed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
