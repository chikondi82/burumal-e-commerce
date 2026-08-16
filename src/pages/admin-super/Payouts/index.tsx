import { useState } from 'react';
import Button from '../../../components/common/Button';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminPayouts() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingPayoutId, setViewingPayoutId] = useState<string | null>(null);
  const [viewPayout, setViewPayout] = useState({ id: '', seller: '', amount: 0, status: '', requestedDate: '', processedDate: '', bankAccount: '', bankName: '', accountHolder: '' });

  const mockPayouts = [
    { id: 'PAY-001', seller: 'Maison XYZ', amount: 1250000, status: 'pending', requestedDate: '2024-08-15', processedDate: '', bankAccount: 'BI1234567890123456', bankName: 'Bank of Burundi', accountHolder: 'Maison XYZ Ltd' },
    { id: 'PAY-002', seller: 'Tech Hub', amount: 890000, status: 'processing', requestedDate: '2024-08-14', processedDate: '', bankAccount: 'BI9876543210987654', bankName: 'FINBURUNDI', accountHolder: 'Tech Hub Ltd' },
    { id: 'PAY-003', seller: 'Fashion House', amount: 2340000, status: 'completed', requestedDate: '2024-08-13', processedDate: '2024-08-14', bankAccount: 'BI1122334455667788', bankName: 'Bank of Burundi', accountHolder: 'Fashion House Ltd' },
    { id: 'PAY-004', seller: 'Burundi Electronics', amount: 3450000, status: 'completed', requestedDate: '2024-08-12', processedDate: '2024-08-13', bankAccount: 'BI9988776655443322', bankName: 'FINBURUNDI', accountHolder: 'Burundi Electronics Ltd' },
    { id: 'PAY-005', seller: 'Home Decor Plus', amount: 450000, status: 'pending', requestedDate: '2024-08-15', processedDate: '', bankAccount: 'BI5544332211009988', bankName: 'Ecobank Burundi', accountHolder: 'Home Decor Plus Ltd' },
  ];

  const handleApprovePayout = (payoutId: string) => {
    alert(`Approve payout ${payoutId}`);
  };

  const handleProcessPayout = (payoutId: string) => {
    alert(`Process payout ${payoutId}`);
  };

  const handleViewPayout = (payoutId: string) => {
    const payout = mockPayouts.find(p => p.id === payoutId);
    if (payout) {
      setViewingPayoutId(payoutId);
      setViewPayout({ ...payout });
      setShowViewModal(true);
    }
  };

  const handleUpdateStatus = (newStatus: string) => {
    if (viewingPayoutId !== null) {
      const payoutIndex = mockPayouts.findIndex(p => p.id === viewingPayoutId);
      if (payoutIndex !== -1) {
        mockPayouts[payoutIndex].status = newStatus;
        if (newStatus === 'completed' && !mockPayouts[payoutIndex].processedDate) {
          mockPayouts[payoutIndex].processedDate = new Date().toISOString().split('T')[0];
        }
        setViewPayout({ ...mockPayouts[payoutIndex] });
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Seller Payouts</h1>
          <p className="text-gray-600">Manage seller payout requests and transactions</p>
        </div>

        {/* View Payout Modal */}
        {showViewModal && viewingPayoutId !== null && (
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Payout Details</h2>
              <Button variant="secondary" size="sm" onClick={() => setShowViewModal(false)}>Close</Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payout ID</label>
                  <p className="text-lg font-semibold">{viewPayout.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
                  <p className="text-lg font-semibold">{viewPayout.seller}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <p className="text-lg font-semibold">{viewPayout.amount.toLocaleString()} BIF</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      viewPayout.status === 'completed' ? 'bg-green-100 text-green-800' :
                      viewPayout.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {viewPayout.status.toUpperCase()}
                    </span>
                    <select
                      value={viewPayout.status}
                      onChange={(e) => handleUpdateStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requested Date</label>
                  <p className="text-lg font-semibold">{viewPayout.requestedDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Processed Date</label>
                  <p className="text-lg font-semibold">{viewPayout.processedDate || 'Not processed yet'}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Bank Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <p className="text-sm">{viewPayout.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder</label>
                    <p className="text-sm">{viewPayout.accountHolder}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
                    <p className="text-sm font-mono bg-gray-50 p-2 rounded">{viewPayout.bankAccount}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {viewPayout.status === 'pending' && (
                  <Button size="sm" onClick={() => handleApprovePayout(viewingPayoutId)}>Approve</Button>
                )}
                {viewPayout.status === 'processing' && (
                  <Button size="sm" onClick={() => handleProcessPayout(viewingPayoutId)}>Process</Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Payouts Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Payout ID</th>
                  <th className="text-left p-4">Seller</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Requested Date</th>
                  <th className="text-left p-4">Processed Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPayouts.map((payout) => (
                  <tr key={payout.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{payout.id}</td>
                    <td className="p-4">{payout.seller}</td>
                    <td className="p-4">{payout.amount.toLocaleString()} BIF</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        payout.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payout.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payout.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{payout.requestedDate}</td>
                    <td className="p-4">{payout.processedDate || '-'}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {payout.status === 'pending' && (
                          <Button size="sm" onClick={() => handleApprovePayout(payout.id)}>Approve</Button>
                        )}
                        {payout.status === 'processing' && (
                          <Button size="sm" onClick={() => handleProcessPayout(payout.id)}>Process</Button>
                        )}
                        <Button variant="secondary" size="sm" onClick={() => handleViewPayout(payout.id)}>View</Button>
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
