import { useState } from 'react';
import Button from '../../../components/common/Button';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminDisputes() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingDisputeId, setViewingDisputeId] = useState<string | null>(null);
  const [viewDispute, setViewDispute] = useState({ id: '', order: '', customer: '', seller: '', type: '', status: '', date: '', description: '', resolution: '' });

  const mockDisputes = [
    { id: 'DSP-001', order: 'ORD-001', customer: 'Jean Niyonzima', seller: 'Maison XYZ', type: 'Product not received', status: 'open', date: '2024-08-15', description: 'Customer claims product was never delivered despite tracking showing delivered', resolution: '' },
    { id: 'DSP-002', order: 'ORD-002', customer: 'Marie Mugisha', seller: 'Tech Hub', type: 'Refund request', status: 'under_review', date: '2024-08-14', description: 'Product arrived damaged, customer requesting full refund', resolution: '' },
    { id: 'DSP-003', order: 'ORD-003', customer: 'Pierre Ndayisaba', seller: 'Fashion House', type: 'Damaged product', status: 'resolved', date: '2024-08-13', description: 'Product arrived with tears in fabric', resolution: 'Refund processed - 100% refund issued' },
    { id: 'DSP-004', order: 'ORD-004', customer: 'Claude Bizimungu', seller: 'Burundi Electronics', type: 'Wrong item delivered', status: 'open', date: '2024-08-12', description: 'Customer received different model than ordered', resolution: '' },
    { id: 'DSP-005', order: 'ORD-005', customer: 'Annie Ntiranyibagira', seller: 'Home Decor Plus', type: 'Quality issue', status: 'resolved', date: '2024-08-11', description: 'Product quality did not match description', resolution: 'Partial refund issued - 50% refund' },
  ];

  const filteredDisputes = mockDisputes.filter(dispute => {
    return filterStatus === 'all' || dispute.status === filterStatus;
  });

  const handleResolve = (disputeId: string) => {
    alert(`Resolve dispute ${disputeId}`);
  };

  const handleApproveRefund = (disputeId: string) => {
    alert(`Approve refund for dispute ${disputeId}`);
  };

  const handleViewDispute = (disputeId: string) => {
    const dispute = mockDisputes.find(d => d.id === disputeId);
    if (dispute) {
      setViewingDisputeId(disputeId);
      setViewDispute({ ...dispute });
      setShowViewModal(true);
    }
  };

  const handleUpdateStatus = (newStatus: string) => {
    if (viewingDisputeId !== null) {
      const disputeIndex = mockDisputes.findIndex(d => d.id === viewingDisputeId);
      if (disputeIndex !== -1) {
        mockDisputes[disputeIndex].status = newStatus;
        setViewDispute({ ...mockDisputes[disputeIndex] });
      }
    }
  };

  const handleUpdateResolution = (resolution: string) => {
    if (viewingDisputeId !== null) {
      const disputeIndex = mockDisputes.findIndex(d => d.id === viewingDisputeId);
      if (disputeIndex !== -1) {
        mockDisputes[disputeIndex].resolution = resolution;
        setViewDispute({ ...mockDisputes[disputeIndex] });
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Disputes & Returns Management</h1>
          <p className="text-gray-600">Handle customer disputes, returns, and refund requests</p>
        </div>

        {/* Filter */}
        <div className="card mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="under_review">Under Review</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* View Dispute Modal */}
        {showViewModal && viewingDisputeId !== null && (
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Dispute Details</h2>
              <Button variant="secondary" size="sm" onClick={() => setShowViewModal(false)}>Close</Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dispute ID</label>
                  <p className="text-lg font-semibold">{viewDispute.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                  <p className="text-lg font-semibold">{viewDispute.order}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                  <p className="text-lg font-semibold">{viewDispute.customer}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
                  <p className="text-lg font-semibold">{viewDispute.seller}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dispute Type</label>
                  <p className="text-lg font-semibold">{viewDispute.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-lg font-semibold">{viewDispute.date}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    viewDispute.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    viewDispute.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {viewDispute.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <select
                    value={viewDispute.status}
                    onChange={(e) => handleUpdateStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                  >
                    <option value="open">Open</option>
                    <option value="under_review">Under Review</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-sm bg-gray-50 p-3 rounded-lg">{viewDispute.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
                <textarea
                  value={viewDispute.resolution}
                  onChange={(e) => handleUpdateResolution(e.target.value)}
                  placeholder="Enter resolution details..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleResolve(viewingDisputeId)}>Mark as Resolved</Button>
                <Button variant="secondary" size="sm" onClick={() => handleApproveRefund(viewingDisputeId)}>Approve Refund</Button>
              </div>
            </div>
          </div>
        )}

        {/* Disputes Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Dispute ID</th>
                  <th className="text-left p-4">Order</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Seller</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDisputes.map((dispute) => (
                  <tr key={dispute.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{dispute.id}</td>
                    <td className="p-4">{dispute.order}</td>
                    <td className="p-4">{dispute.customer}</td>
                    <td className="p-4">{dispute.seller}</td>
                    <td className="p-4">{dispute.type}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        dispute.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        dispute.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {dispute.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{dispute.date}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleViewDispute(dispute.id)}>View</Button>
                        {dispute.status !== 'resolved' && (
                          <>
                            <Button size="sm" onClick={() => handleResolve(dispute.id)}>Resolve</Button>
                            <Button variant="secondary" size="sm" onClick={() => handleApproveRefund(dispute.id)}>Refund</Button>
                          </>
                        )}
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
