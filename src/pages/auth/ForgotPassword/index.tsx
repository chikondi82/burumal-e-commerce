import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending reset code
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-12">
          <div className="max-w-md mx-auto">
            {!sent ? (
              <>
                <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
                <p className="text-gray-600 mb-8">
                  Enter your phone number to receive a reset code
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+257 79 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  
                  <Button type="submit" fullWidth loading={loading}>
                    Send Reset Code
                  </Button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Code Sent!</h1>
                  <p className="text-gray-600">
                    We've sent a reset code to {phone}
                  </p>
                </div>
                
                <Button fullWidth onClick={() => navigate('/verify-otp')}>
                  Enter Code
                </Button>
              </>
            )}
            
            <div className="mt-6 text-center">
              <Link to="/login" className="text-primary-600 hover:underline">
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
