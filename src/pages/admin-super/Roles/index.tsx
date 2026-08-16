import { useState } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminRoles() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: '' });
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [viewingRoleId, setViewingRoleId] = useState<number | null>(null);
  const [viewRole, setViewRole] = useState({ id: 0, role: '', description: '', count: 0, permissions: [''] });
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState<number | null>(null);
  const [editAdmin, setEditAdmin] = useState({ name: '', email: '', role: '', status: 'active' });

  const adminRoles = [
    { id: 1, role: 'Super Admin', description: 'Full platform control and all permissions', count: 1, permissions: ['All'] },
    { id: 2, role: 'Finance Admin', description: 'Payments, refunds, commissions, and payouts', count: 3, permissions: ['Payments', 'Refunds', 'Payouts', 'Reports'] },
    { id: 3, role: 'Content Moderator', description: 'Product reviews, reports, and content approvals', count: 4, permissions: ['Products', 'Reviews', 'Categories'] },
    { id: 4, role: 'Logistics Manager', description: 'Couriers, delivery zones, and shipments', count: 2, permissions: ['Deliveries', 'Couriers', 'Zones'] },
    { id: 5, role: 'Marketing Manager', description: 'Campaigns, promotions, and analytics', count: 2, permissions: ['Promotions', 'Analytics', 'Notifications'] },
    { id: 6, role: 'Seller Admin', description: 'Seller verification and management', count: 0, permissions: ['Sellers', 'Products'] },
    { id: 7, role: 'Support Agent', description: 'Customer support and dispute resolution', count: 0, permissions: ['Support', 'Disputes', 'Orders'] },
  ];

  const mockAdmins = [
    { id: 1, name: 'Super Admin', email: 'admin@burumal.bi', role: 'Super Admin', status: 'active', lastActive: 'Now' },
    { id: 2, name: 'Finance Manager', email: 'finance@burumal.bi', role: 'Finance Admin', status: 'active', lastActive: '2 hours ago' },
    { id: 3, name: 'Content Lead', email: 'moderator@burumal.bi', role: 'Content Moderator', status: 'active', lastActive: '1 hour ago' },
    { id: 4, name: 'Logistics Coordinator', email: 'logistics@burumal.bi', role: 'Logistics Manager', status: 'active', lastActive: '30 mins ago' },
  ];

  const handleAddAdmin = () => {
    alert(`Add admin: ${newAdmin.name} as ${newAdmin.role}`);
    setShowAddModal(false);
    setNewAdmin({ name: '', email: '', role: '' });
  };

  const handleConfigureRole = (roleId: number) => {
    const role = adminRoles.find(r => r.id === roleId);
    if (role) {
      setViewingRoleId(roleId);
      setViewRole({ ...role });
      setShowRoleModal(true);
    }
  };

  const handleEditAdmin = (adminId: number) => {
    const admin = mockAdmins.find(a => a.id === adminId);
    if (admin) {
      setEditingAdminId(adminId);
      setEditAdmin({ name: admin.name, email: admin.email, role: admin.role, status: admin.status });
      setShowAdminModal(true);
    }
  };

  const handleSaveAdmin = () => {
    if (editingAdminId !== null) {
      const adminIndex = mockAdmins.findIndex(a => a.id === editingAdminId);
      if (adminIndex !== -1) {
        mockAdmins[adminIndex] = { ...mockAdmins[adminIndex], ...editAdmin };
      }
      setShowAdminModal(false);
      setEditingAdminId(null);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Roles & Permissions</h1>
          <p className="text-gray-600">Manage admin roles and assign permissions</p>
        </div>

        {/* Add Admin Button */}
        <div className="mb-6">
          <Button onClick={() => setShowAddModal(true)}>+ Add Admin</Button>
        </div>

        {/* Add Admin Modal */}
        {showAddModal && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Add New Admin</h2>
            <div className="space-y-4">
              <Input
                label="Name"
                placeholder="Admin name"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              />
              <Input
                label="Email"
                placeholder="admin@example.com"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select role</option>
                  {adminRoles.map((role) => (
                    <option key={role.id} value={role.role}>{role.role}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddAdmin}>Add Admin</Button>
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Configure Role Modal */}
        {showRoleModal && viewingRoleId !== null && (
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Configure Role</h2>
              <Button variant="secondary" size="sm" onClick={() => setShowRoleModal(false)}>Close</Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role ID</label>
                  <p className="text-lg font-semibold">{viewRole.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Admins</label>
                  <p className="text-lg font-semibold">{viewRole.count}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                  <p className="text-lg font-semibold">{viewRole.role}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{viewRole.description}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="flex flex-wrap gap-2">
                  {viewRole.permissions.map((permission) => (
                    <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Admin Modal */}
        {showAdminModal && editingAdminId !== null && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Edit Admin User</h2>
            <div className="space-y-4">
              <Input
                label="Admin ID"
                value={editingAdminId.toString()}
                disabled
              />
              <Input
                label="Name"
                value={editAdmin.name}
                onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
              />
              <Input
                label="Email"
                value={editAdmin.email}
                onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={editAdmin.role}
                  onChange={(e) => setEditAdmin({ ...editAdmin, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {adminRoles.map((role) => (
                    <option key={role.id} value={role.role}>{role.role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editAdmin.status}
                  onChange={(e) => setEditAdmin({ ...editAdmin, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveAdmin}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setShowAdminModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Roles */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Admin Roles</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Admins</th>
                  <th className="text-left p-4">Permissions</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminRoles.map((role) => (
                  <tr key={role.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{role.role}</td>
                    <td className="p-4 text-gray-600">{role.description}</td>
                    <td className="p-4">{role.count}</td>
                    <td className="p-4">{role.permissions.join(', ')}</td>
                    <td className="p-4">
                      <Button variant="secondary" size="sm" onClick={() => handleConfigureRole(role.id)}>Configure</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admin Users */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Admin Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Last Active</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockAdmins.map((admin) => (
                  <tr key={admin.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{admin.name}</td>
                    <td className="p-4">{admin.email}</td>
                    <td className="p-4">{admin.role}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        {admin.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{admin.lastActive}</td>
                    <td className="p-4">
                      <Button variant="secondary" size="sm" onClick={() => handleEditAdmin(admin.id)}>Edit</Button>
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
