import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';

export default function AccessDenied() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      navigate('/auth/login');
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="card text-center p-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            
            <p className="text-gray-600 mb-6">
              {user?.role === 'customer' 
                ? "You are logged in as a customer. Seller dashboards are only accessible to seller accounts."
                : user?.role === 'seller'
                ? "You are logged in as a seller. Customer dashboards are only accessible to customer accounts."
                : "You don't have the required permissions to access this page."}
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-blue-800 font-semibold mb-2">💡 Did you know?</p>
              <p className="text-sm text-blue-700">
                {user?.role === 'customer'
                  ? "To become a seller and access seller features, you need to register as a seller account."
                  : user?.role === 'seller'
                  ? "Customer features are for shopping and browsing products. Seller features are for managing your store."
                  : "Please sign in with the correct account type to access this page."}
              </p>
            </div>
            
            <div className="space-y-3">
              {user?.role === 'customer' && (
                <button
                  onClick={() => navigate('/auth/seller-onboarding')}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Register as a Seller
                </button>
              )}
              
              <button
                onClick={() => user?.role === 'seller' ? navigate('/seller/dashboard') : navigate('/dashboard')}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                {user?.role === 'seller' ? 'Go to Seller Dashboard' : 'Go to Customer Dashboard'}
              </button>
              
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  navigate('/auth/login');
                }}
                className="w-full text-primary-600 py-3 hover:underline font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
