import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerHelp() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: '1',
      question: 'How do I track my order?',
      answer: 'You can track your order by going to "My Orders" in your dashboard, clicking on the order, and viewing the tracking timeline. You\'ll receive notifications at each stage of delivery.',
      category: 'Orders',
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept Mobile Money (EcoCash, Lumitel, Smart), Bank Transfer, BurundiPay, and Cash on Delivery. You can manage your payment methods in the Payment Methods section.',
      category: 'Payment',
    },
    {
      id: '3',
      question: 'How do I request a return or refund?',
      answer: 'Go to "Returns & Refunds" in your dashboard and click "Request Return". Select your order, provide a reason, and submit. Our team will review your request within 24-48 hours.',
      category: 'Returns',
    },
    {
      id: '4',
      question: 'What is your return policy?',
      answer: 'You can return products within 7 days of delivery if they\'re defective, damaged, or not as described. The product must be in its original packaging with all tags attached.',
      category: 'Returns',
    },
    {
      id: '5',
      question: 'How do I contact a seller?',
      answer: 'You can communicate with sellers through the order-based messaging system. Go to "Messages" in your dashboard, select the order conversation, and send your message.',
      category: 'Orders',
    },
    {
      id: '6',
      question: 'Is my payment information secure?',
      answer: 'Yes, we use secure payment processing and never store raw card numbers. For mobile money and other methods, we work with trusted providers to ensure your information is protected.',
      category: 'Security',
    },
  ];

  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    message: '',
    orderId: '',
  });

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support ticket submitted successfully! We\'ll respond within 24 hours.');
    setFormData({ category: '', subject: '', message: '', orderId: '' });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">🆘 Help & Support</h1>

          {/* Quick Help */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">HOW CAN WE HELP?</h2>
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search help topics..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <span className="text-2xl mb-2 block">📦</span>
                <p className="font-medium">My Order</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <span className="text-2xl mb-2 block">💳</span>
                <p className="font-medium">Payment Problem</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <span className="text-2xl mb-2 block">🚚</span>
                <p className="font-medium">Delivery Problem</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <span className="text-2xl mb-2 block">↩️</span>
                <p className="font-medium">Return/Refund</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <span className="text-2xl mb-2 block">👤</span>
                <p className="font-medium">Account Problem</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <span className="text-2xl mb-2 block">🏪</span>
                <p className="font-medium">Seller Problem</p>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'faq'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'contact'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Contact Support
            </button>
          </div>

          {activeTab === 'faq' && (
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="card text-center py-12">
                  <p className="text-gray-600">No FAQs found matching your search</p>
                </div>
              ) : (
                filteredFaqs.map((faq) => (
                  <div key={faq.id} className="card">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded mb-2">
                          {faq.category}
                        </span>
                        <h3 className="font-bold text-lg">{faq.question}</h3>
                        <p className="text-gray-600 mt-2">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Create Support Ticket</h2>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="order">Order Issue</option>
                      <option value="payment">Payment Issue</option>
                      <option value="delivery">Delivery Issue</option>
                      <option value="return">Return/Refund</option>
                      <option value="account">Account Issue</option>
                      <option value="seller">Seller Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order ID (if applicable)</label>
                    <input
                      type="text"
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="#BURXXXXX"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="Please provide detailed information about your issue..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Submit Ticket
                </button>
              </form>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <p><strong>Email:</strong> support@burumal.bi</p>
                  <p><strong>Phone:</strong> +257 XX XXX XXX</p>
                  <p><strong>Support Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Tips for Faster Support</h3>
                <ul className="space-y-1 text-sm text-yellow-700 list-disc list-inside">
                  <li>Include your order ID when reporting order issues</li>
                  <li>Provide screenshots or photos when applicable</li>
                  <li>Be as specific as possible about your issue</li>
                  <li>Check our FAQ before submitting a ticket</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
