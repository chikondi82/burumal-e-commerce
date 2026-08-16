import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerPrivacy() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">📄 Privacy Policy</h1>

          <div className="card space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-gray-600 mb-2">
                BURUMAL collects information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Name, phone number, and email address</li>
                <li>Delivery addresses</li>
                <li>Payment information (processed securely)</li>
                <li>Order history and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Send you order confirmations and updates</li>
                <li>Provide customer support</li>
                <li>Improve our services and user experience</li>
                <li>Communicate about promotions and offers (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Information Sharing</h2>
              <p className="text-gray-600 mb-2">
                We share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Sellers to fulfill your orders</li>
                <li>Payment processors for secure transactions</li>
                <li>Delivery partners for shipping</li>
                <li>Service providers who assist our operations</li>
              </ul>
              <p className="text-gray-600 mt-2">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Your Rights</h2>
              <p className="text-gray-600 mb-2">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Access your personal information</li>
                <li>Update or correct your information</li>
                <li>Delete your account and data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Contact Us</h2>
              <p className="text-gray-600">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-600 mt-2">
                Email: privacy@burumal.bi<br />
                Phone: +257 XX XXX XXX
              </p>
            </section>

            <section>
              <p className="text-sm text-gray-500">
                Last updated: August 2026
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
