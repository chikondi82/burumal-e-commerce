import { Link, useLocation } from 'react-router-dom';
import { authService } from '../../../services/authService';

const CustomerSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      section: 'Account',
      items: [
        { path: '/profile', label: 'My Profile', icon: '👤' },
        { path: '/orders', label: 'My Orders', icon: '📦' },
        { path: '/wishlist', label: 'Wishlist', icon: '❤️' },
        { path: '/addresses', label: 'Addresses', icon: '📍' },
        { path: '/payment-methods', label: 'Payment Methods', icon: '💳' },
      ],
    },
    {
      section: 'Activity',
      items: [
        { path: '/reviews', label: 'My Reviews', icon: '⭐' },
        { path: '/returns', label: 'Returns & Refunds', icon: '↩️' },
        { path: '/messages', label: 'Messages', icon: '💬' },
        { path: '/notifications', label: 'Notifications', icon: '🔔' },
      ],
    },
    {
      section: 'Settings',
      items: [
        { path: '/security', label: 'Settings', icon: '⚙️' },
        { path: '/help', label: 'Help & Support', icon: '📞' },
        { path: '/privacy', label: 'Privacy Policy', icon: '📄' },
      ],
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden lg:block">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">My Account</h2>

        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {section.section}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <span className="mr-3">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CustomerSidebar;
