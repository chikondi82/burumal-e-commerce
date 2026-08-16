import { useState } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminDeliveries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCourierModal, setShowCourierModal] = useState(false);
  const [viewingCourierId, setViewingCourierId] = useState<number | null>(null);
  const [editCourier, setEditCourier] = useState({ name: '', status: 'active', rating: 0, fulfillment: 0 });
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [viewingZoneId, setViewingZoneId] = useState<number | null>(null);
  const [editZone, setEditZone] = useState({ name: '', price: 0, estimatedDays: 1 });
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [viewingDeliveryId, setViewingDeliveryId] = useState<string | null>(null);
  const [viewDelivery, setViewDelivery] = useState({ id: '', order: '', courier: '', zone: '', status: '', date: '' });

  const mockDeliveries = [
    { id: 'DEL-001', order: 'ORD-001', courier: 'Express Burundi', zone: 'Bujumbura Zone 1', status: 'delivered', date: '2024-08-15' },
    { id: 'DEL-002', order: 'ORD-002', courier: 'Fast Logistics', zone: 'Bujumbura Zone 2', status: 'in_transit', date: '2024-08-15' },
    { id: 'DEL-003', order: 'ORD-003', courier: 'Express Burundi', zone: 'Gitega', status: 'pending', date: '2024-08-15' },
    { id: 'DEL-004', order: 'ORD-004', courier: 'Fast Logistics', zone: 'Ngozi', status: 'failed', date: '2024-08-14' },
    { id: 'DEL-005', order: 'ORD-005', courier: 'Express Burundi', zone: 'Rumonge', status: 'delivered', date: '2024-08-13' },
  ];

  const mockCouriers = [
    { id: 1, name: 'Express Burundi', status: 'active', deliveries: 2345, rating: 4.8, fulfillment: 98 },
    { id: 2, name: 'Fast Logistics', status: 'active', deliveries: 1876, rating: 4.5, fulfillment: 95 },
    { id: 3, name: 'Burundi Express', status: 'suspended', deliveries: 567, rating: 3.2, fulfillment: 85 },
  ];

  const deliveryZones = [
    { id: 1, name: 'Bujumbura Zone 1', price: 5000, estimatedDays: 1 },
    { id: 2, name: 'Bujumbura Zone 2', price: 5000, estimatedDays: 1 },
    { id: 3, name: 'Bujumbura Zone 3', price: 5000, estimatedDays: 1 },
    { id: 4, name: 'Bujumbura Zone 4', price: 5000, estimatedDays: 1 },
    { id: 5, name: 'Gitega', price: 10000, estimatedDays: 2 },
    { id: 6, name: 'Ngozi', price: 12000, estimatedDays: 2 },
    { id: 7, name: 'Rumonge', price: 15000, estimatedDays: 3 },
  ];

  const filteredDeliveries = mockDeliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.order.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.courier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || delivery.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleManageCourier = (courierId: number) => {
    const courier = mockCouriers.find(c => c.id === courierId);
    if (courier) {
      setViewingCourierId(courierId);
      setEditCourier({ name: courier.name, status: courier.status, rating: courier.rating, fulfillment: courier.fulfillment });
      setShowCourierModal(true);
    }
  };

  const handleSaveCourier = () => {
    if (viewingCourierId !== null) {
      const courierIndex = mockCouriers.findIndex(c => c.id === viewingCourierId);
      if (courierIndex !== -1) {
        mockCouriers[courierIndex] = { ...mockCouriers[courierIndex], ...editCourier };
      }
      setShowCourierModal(false);
      setViewingCourierId(null);
    }
  };

  const handleEditZone = (zoneId: number) => {
    const zone = deliveryZones.find(z => z.id === zoneId);
    if (zone) {
      setViewingZoneId(zoneId);
      setEditZone({ name: zone.name, price: zone.price, estimatedDays: zone.estimatedDays });
      setShowZoneModal(true);
    }
  };

  const handleSaveZone = () => {
    if (viewingZoneId !== null) {
      const zoneIndex = deliveryZones.findIndex(z => z.id === viewingZoneId);
      if (zoneIndex !== -1) {
        deliveryZones[zoneIndex] = { ...deliveryZones[zoneIndex], ...editZone };
      }
      setShowZoneModal(false);
      setViewingZoneId(null);
    }
  };

  const handleTrackDelivery = (deliveryId: string) => {
    const delivery = mockDeliveries.find(d => d.id === deliveryId);
    if (delivery) {
      setViewingDeliveryId(deliveryId);
      setViewDelivery({ ...delivery });
      setShowDeliveryModal(true);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Delivery & Logistics Management</h1>
          <p className="text-gray-600">Manage couriers, delivery zones, and track shipments</p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search deliveries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Courier Management Modal */}
        {showCourierModal && viewingCourierId !== null && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Courier Details</h2>
            <div className="space-y-4">
              <Input
                label="Courier ID"
                value={viewingCourierId.toString()}
                disabled
              />
              <Input
                label="Courier Name"
                value={editCourier.name}
                onChange={(e) => setEditCourier({ ...editCourier, name: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editCourier.status}
                  onChange={(e) => setEditCourier({ ...editCourier, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <Input
                label="Rating"
                type="number"
                step="0.1"
                value={editCourier.rating.toString()}
                onChange={(e) => setEditCourier({ ...editCourier, rating: parseFloat(e.target.value) || 0 })}
              />
              <Input
                label="Fulfillment Rate (%)"
                type="number"
                value={editCourier.fulfillment.toString()}
                onChange={(e) => setEditCourier({ ...editCourier, fulfillment: parseInt(e.target.value) || 0 })}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveCourier}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setShowCourierModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Zone Modal */}
        {showZoneModal && viewingZoneId !== null && (
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Zone Details</h2>
            <div className="space-y-4">
              <Input
                label="Zone ID"
                value={viewingZoneId.toString()}
                disabled
              />
              <Input
                label="Zone Name"
                value={editZone.name}
                onChange={(e) => setEditZone({ ...editZone, name: e.target.value })}
              />
              <Input
                label="Delivery Price (BIF)"
                type="number"
                value={editZone.price.toString()}
                onChange={(e) => setEditZone({ ...editZone, price: parseInt(e.target.value) || 0 })}
              />
              <Input
                label="Estimated Delivery Days"
                type="number"
                value={editZone.estimatedDays.toString()}
                onChange={(e) => setEditZone({ ...editZone, estimatedDays: parseInt(e.target.value) || 1 })}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveZone}>Save Changes</Button>
                <Button variant="secondary" onClick={() => setShowZoneModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Tracking Modal */}
        {showDeliveryModal && viewingDeliveryId !== null && (
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Delivery Tracking</h2>
              <Button variant="secondary" size="sm" onClick={() => setShowDeliveryModal(false)}>Close</Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery ID</label>
                  <p className="text-lg font-semibold">{viewDelivery.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                  <p className="text-lg font-semibold">{viewDelivery.order}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Courier</label>
                  <p className="text-lg font-semibold">{viewDelivery.courier}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Zone</label>
                  <p className="text-lg font-semibold">{viewDelivery.zone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    viewDelivery.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    viewDelivery.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                    viewDelivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {viewDelivery.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-lg font-semibold">{viewDelivery.date}</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-3">Tracking Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <p className="text-sm">Order Placed - {viewDelivery.date}</p>
                  </div>
                  <div className={`flex items-center ${viewDelivery.status === 'pending' ? 'opacity-50' : ''}`}>
                    <div className={`w-3 h-3 ${viewDelivery.status !== 'pending' ? 'bg-green-500' : 'bg-gray-300'} rounded-full mr-3`}></div>
                    <p className="text-sm">Picked up by Courier</p>
                  </div>
                  <div className={`flex items-center ${viewDelivery.status === 'pending' || viewDelivery.status === 'in_transit' ? 'opacity-50' : ''}`}>
                    <div className={`w-3 h-3 ${viewDelivery.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'} rounded-full mr-3`}></div>
                    <p className="text-sm">Out for Delivery</p>
                  </div>
                  <div className={`flex items-center ${viewDelivery.status !== 'delivered' ? 'opacity-50' : ''}`}>
                    <div className={`w-3 h-3 ${viewDelivery.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'} rounded-full mr-3`}></div>
                    <p className="text-sm">Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Couriers */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Couriers</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Courier</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Deliveries</th>
                  <th className="text-left p-4">Rating</th>
                  <th className="text-left p-4">Fulfillment</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCouriers.map((courier) => (
                  <tr key={courier.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{courier.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        courier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {courier.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{courier.deliveries}</td>
                    <td className="p-4">⭐ {courier.rating}</td>
                    <td className="p-4">{courier.fulfillment}%</td>
                    <td className="p-4">
                      <Button variant="secondary" size="sm" onClick={() => handleManageCourier(courier.id)}>Manage</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delivery Zones */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Delivery Zones</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Zone</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Estimated Days</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveryZones.map((zone) => (
                  <tr key={zone.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{zone.name}</td>
                    <td className="p-4">{zone.price.toLocaleString()} BIF</td>
                    <td className="p-4">{zone.estimatedDays} day(s)</td>
                    <td className="p-4">
                      <Button variant="secondary" size="sm" onClick={() => handleEditZone(zone.id)}>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deliveries Table */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Recent Deliveries</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Delivery ID</th>
                  <th className="text-left p-4">Order</th>
                  <th className="text-left p-4">Courier</th>
                  <th className="text-left p-4">Zone</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{delivery.id}</td>
                    <td className="p-4">{delivery.order}</td>
                    <td className="p-4">{delivery.courier}</td>
                    <td className="p-4">{delivery.zone}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        delivery.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        delivery.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                        delivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {delivery.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">{delivery.date}</td>
                    <td className="p-4">
                      <Button variant="secondary" size="sm" onClick={() => handleTrackDelivery(delivery.id)}>Track</Button>
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
