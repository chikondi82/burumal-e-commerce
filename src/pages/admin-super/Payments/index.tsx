import { useState } from 'react';
import Button from '../../../components/common/Button';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminPayments() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingPaymentId, setViewingPaymentId] = useState<string | null>(null);
  const [viewPayment, setViewPayment] = useState({ id: '', order: '', amount: 0, method: '', status: '', date: '', customer: '', seller: '' });

  const mockPayments = [
    { id: 'PAY-001', order: 'ORD-001', amount: 125000, method: 'Mobile Money', status: 'completed', date: '2024-08-15', customer: 'Jean Niyonzima', seller: 'Maison XYZ' },
    { id: 'PAY-002', order: 'ORD-002', amount: 850000, method: 'Bank Transfer', status: 'pending', date: '2024-08-15', customer: 'Marie Mugisha', seller: 'Tech Hub' },
    { id: 'PAY-003', order: 'ORD-003', amount: 45000, method: 'Mobile Money', status: 'completed', date: '2024-08-14', customer: 'Pierre Ndayisaba', seller: 'Fashion House' },
    { id: 'PAY-004', order: 'ORD-004', amount: 1200000, method: 'Mobile Money', status: 'failed', date: '2024-08-14', customer: 'Claude Bizimungu', seller: 'Burundi Electronics' },
    { id: 'PAY-005', order: 'ORD-005', amount: 125000, method: 'Bank Transfer', status: 'completed', date: '2024-08-13', customer: 'Annie Ntiranyibagira', seller: 'Home Decor Plus' },
  ];

  const financialOverview = {
    totalVolume: 85000000,
    successfulPayments: 3120,
    failedPayments: 45,
    pendingPayments: 23,
    totalRefunds: 1250000,
    platformCommission: 4250000,
    sellerBalances: 12500000,
  };

  const handleViewPayment = (paymentId: string) => {
    const payment = mockPayments.find(p => p.id === paymentId);
    if (payment) {
      setViewingPaymentId(paymentId);
      setViewPayment({ ...payment });
      setShowViewModal(true);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Payment & Financial Management</h1>
          <p className="text-gray-600">Monitor transactions, refunds, and platform revenue</p>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <p className="text-gray-600 text-sm">Total Volume</p>
            <p className="text-xl font-bold">{(financialOverview.totalVolume / 1000000).toFixed(1)}M BIF</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Successful</p>
            <p className="text-xl font-bold text-green-600">{financialOverview.successfulPayments}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Failed</p>
            <p className="text-xl font-bold text-red-600">{financialOverview.failedPayments}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-xl font-bold text-yellow-600">{financialOverview.pendingPayments}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Total Refunds</p>
            <p className="text-xl font-bold">{(financialOverview.totalRefunds / 1000000).toFixed(1)}M BIF</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Platform Commission</p>
            <p className="text-xl font-bold text-green-600">{(financialOverview.platformCommission / 1000000).toFixed(1)}M BIF</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Seller Balances</p>
            <p className="text-xl font-bold">{(financialOverview.sellerBalances / 1000000).toFixed(1)}M BIF</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Pending Payouts</p>
            <p className="text-xl font-bold text-yellow-600">1.25M BIF</p>
          </div>
        </div>

        {/* View Payment Modal */}
        {showViewModal && viewingPaymentId !== null && (
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Payment Details</h2>
              <Button variant="secondary" size="sm" onClick={() => setShowViewModal(false)}>Close</Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment ID</label>
                  <p className="text-lg font-semibold">{viewPayment.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                  <p className="text-lg font-semibold">{viewPayment.order}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                  <p className="text-lg font-semibold">{viewPayment.customer}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
                  <p className="text-lg font-semibold">{viewPayment.seller}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <p className="text-lg font-semibold">{viewPayment.amount.toLocaleString()} BIF</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <p className="text-lg font-semibold">{viewPayment.method}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    viewPayment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    viewPayment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {viewPayment.status.toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-lg font-semibold">{viewPayment.date}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payments Table */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Payment ID</th>
                  <th className="text-left p-4">Order</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Method</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{payment.id}</td>
                    <td className="p-4">{payment.order}</td>
                    <td className="p-4">{payment.amount.toLocaleString()} BIF</td>
                    <td className="p-4">{payment.method}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{payment.date}</td>
                    <td className="p-4">
                      <Button variant="secondary" size="sm" onClick={() => handleViewPayment(payment.id)}>View</Button>
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
