import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileNav from '../../components/layout/MobileNav';
import Button from '../../components/common/Button';

export default function Profile() {
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+257 79 123 456',
    avatar: 'https://via.placeholder.com/100',
  };

  const menuItems = [
    { icon: '📦', label: 'My Orders', path: '/orders' },
    { icon: '❤️', label: 'Wishlist', path: '/wishlist' },
    { icon: '📍', label: 'Addresses', path: '/addresses' },
    { icon: '💳', label: 'Payment Methods', path: '/payment-methods' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
    { icon: '📞', label: 'Help & Support', path: '/help' },
    { icon: '📄', label: 'Privacy Policy', path: '/privacy' },
    { icon: '🚪', label: 'Logout', path: '/logout', danger: true },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>
          
          {/* User Info Card */}
          <div className="card mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{mockUser.name}</h2>
                <p className="text-gray-600">{mockUser.email}</p>
                <p className="text-gray-600">{mockUser.phone}</p>
              </div>
            </div>
            <Button variant="secondary" className="mt-4">
              Edit Profile
            </Button>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`card flex items-center space-x-4 hover:shadow-md transition-shadow ${
                  item.danger ? 'text-red-600 hover:bg-red-50' : ''
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium flex-1">{item.label}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
