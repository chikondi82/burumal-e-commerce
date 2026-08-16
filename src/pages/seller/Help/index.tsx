import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerHelp() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (!user) {
      navigate('/auth/login');
      return;
    }
    // Redirect customers to access denied page with clear message
    if (user && user.role !== 'seller') {
      navigate('/access-denied');
      return;
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState('faq');
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      id: 1,
      question: 'How do I add a new product?',
      answer: 'Go to the Products section and click "Add Product". Fill in all required information including name, description, price, images, and stock. Submit for review and your product will be live once approved.',
      category: 'Products',
    },
    {
      id: 2,
      question: 'How do I process an order?',
      answer: 'When you receive a new order, go to the Orders section. Review the order details, confirm the order, prepare the items, and mark as "Ready for Delivery" when ready for pickup.',
      category: 'Orders',
    },
    {
      id: 3,
      question: 'How do I request a payout?',
      answer: 'Navigate to the Payouts section. Your available balance will be shown. Click "Request Payout" and enter the amount you wish to withdraw. Minimum payout is 10,000 BIF.',
      category: 'Payments',
    },
    {
      id: 4,
      question: 'What is BURUMAL\'s commission rate?',
      answer: 'BURUMAL charges a 10% commission on all sales. This amount is automatically deducted from each order before the remaining amount is credited to your available balance.',
      category: 'Payments',
    },
    {
      id: 5,
      question: 'How do I track my seller performance?',
      answer: 'Visit the Performance section to view your seller rating, order fulfillment rate, on-time delivery rate, and other metrics. These metrics determine your seller level.',
      category: 'Account',
    },
    {
      id: 6,
      question: 'How do I respond to customer reviews?',
      answer: 'Go to the Reviews section. Click "Respond" on any review to write a response. Professional responses to reviews can improve your seller reputation.',
      category: 'Reviews',
    },
    {
      id: 7,
      question: 'What happens if I run out of stock?',
      answer: 'Your product will be marked as "Out of Stock" and won\'t be purchasable. Update your inventory in the Inventory section to restock items.',
      category: 'Products',
    },
    {
      id: 8,
      question: 'How do I contact customer support?',
      answer: 'You can contact support through this Help page by submitting a support ticket, or email us at support@burumal.bj. We typically respond within 24 hours.',
      category: 'Account',
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const [ticketData, setTicketData] = useState({
    subject: '',
    category: '',
    message: '',
  });

  const handleSubmitTicket = () => {
    // In production, this would call an API to submit the ticket
    alert('Support ticket submitted successfully!');
    setTicketData({ subject: '', category: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-2xl font-bold mb-6">🆘 Help & Support</h1>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'faq'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'contact'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Contact Support
              </button>
            </div>

            {/* FAQ Section */}
            {activeTab === 'faq' && (
              <>
                <div className="card mb-6">
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="card">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">{faq.category}</span>
                            <h3 className="font-semibold">{faq.question}</h3>
                          </div>
                          <p className="text-gray-600 text-sm">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="card text-center py-8">
                    <p className="text-gray-500">No FAQs found matching your search.</p>
                  </div>
                )}
              </>
            )}

            {/* Contact Support Section */}
            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Submit a Support Ticket</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        value={ticketData.subject}
                        onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="Brief description of your issue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={ticketData.category}
                        onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      >
                        <option value="">Select a category</option>
                        <option value="orders">Orders</option>
                        <option value="payments">Payments</option>
                        <option value="products">Products</option>
                        <option value="account">Account</option>
                        <option value="technical">Technical Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        value={ticketData.message}
                        onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="Describe your issue in detail..."
                      />
                    </div>
                    <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="card">
                    <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📧</span>
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-gray-600">support@burumal.bj</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📱</span>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-gray-600">+257 79 999 999</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💬</span>
                        <div>
                          <p className="font-medium">WhatsApp</p>
                          <p className="text-sm text-gray-600">+257 79 999 999</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h2 className="text-lg font-semibold mb-4">Support Hours</h2>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Monday - Friday: 8AM - 6PM</p>
                      <p>Saturday: 9AM - 2PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="card bg-blue-50 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Faster Support</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Include your order ID for order-related issues</li>
                      <li>• Provide screenshots if applicable</li>
                      <li>• Be as specific as possible about your issue</li>
                      <li>• Check our FAQ before submitting a ticket</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
