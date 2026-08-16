import { Link, useLocation } from 'react-router-dom';

export default function SuperAdminSidebar() {
  const location = useLocation();
  
  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/admin-super/dashboard' },
    { icon: '👥', label: 'Users', path: '/admin-super/users' },
    { icon: '🏪', label: 'Sellers', path: '/admin-super/sellers' },
    { icon: '📦', label: 'Products', path: '/admin-super/products' },
    { icon: '🗂', label: 'Categories', path: '/admin-super/categories' },
    { icon: '🛒', label: 'Orders', path: '/admin-super/orders' },
    { icon: '💳', label: 'Payments', path: '/admin-super/payments' },
    { icon: '🚚', label: 'Deliveries', path: '/admin-super/deliveries' },
    { icon: '⭐', label: 'Reviews', path: '/admin-super/reviews' },
    { icon: '⚖️', label: 'Disputes', path: '/admin-super/disputes' },
    { icon: '💰', label: 'Payouts', path: '/admin-super/payouts' },
    { icon: '🎟', label: 'Promotions', path: '/admin-super/promotions' },
    { icon: '📢', label: 'Notifications', path: '/admin-super/notifications' },
    { icon: '📈', label: 'Analytics', path: '/admin-super/analytics' },
    { icon: '📋', label: 'Reports', path: '/admin-super/reports' },
    { icon: '🔐', label: 'Roles & Permissions', path: '/admin-super/roles' },
    { icon: '📝', label: 'Audit Logs', path: '/admin-super/audit-logs' },
    { icon: '⚙️', label: 'Settings', path: '/admin-super/settings' },
    { icon: '🛠', label: 'System Health', path: '/admin-super/system-health' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">BURUMAL</h1>
        <p className="text-sm text-gray-400 mt-1">Super Admin</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
            <span>👤</span>
          </div>
          <div>
            <p className="font-medium">Super Admin</p>
            <p className="text-xs text-gray-400">admin@burumal.bi</p>
          </div>
        </div>
        <Link
          to="/logout"
          className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <span className="mr-2">🚪</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
