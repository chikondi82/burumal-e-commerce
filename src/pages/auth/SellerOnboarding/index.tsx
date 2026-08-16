import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

export default function SellerOnboarding() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'individual',
    businessAddress: '',
    taxId: '',
    businessDescription: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [key, setKey] = useState(0);

  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setKey(prev => prev + 1);
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  if (submitted) {
    return (
      <div key={key} className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pb-20 md:pb-0">
          <div className="container py-12">
            <div className="max-w-md mx-auto text-center">
              <div className="text-6xl mb-4">✅</div>
              <h1 className="text-2xl font-bold mb-2">{t('sellerOnboarding.applicationSubmitted')}</h1>
              <p className="text-gray-600 mb-8">{t('sellerOnboarding.pendingApproval')}</p>
              
              <Link to="/">
                <Button fullWidth>
                  {t('sellerOnboarding.backToHome')}
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
        <MobileNav />
      </div>
    );
  }

  return (
    <div key={key} className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-2">{t('sellerOnboarding.title')}</h1>
            <p className="text-gray-600 mb-2">{t('sellerOnboarding.subtitle')}</p>
            <p className="text-gray-500 text-sm mb-8">{t('sellerOnboarding.description')}</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t('sellerOnboarding.businessName')}
                type="text"
                placeholder={t('sellerOnboarding.enterBusinessName')}
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('sellerOnboarding.businessType')}
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="individual">{t('sellerOnboarding.individual')}</option>
                  <option value="company">{t('sellerOnboarding.company')}</option>
                </select>
              </div>
              
              <Input
                label={t('sellerOnboarding.businessAddress')}
                type="text"
                placeholder={t('sellerOnboarding.enterBusinessAddress')}
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                required
              />
              
              <Input
                label={t('sellerOnboarding.taxId')}
                type="text"
                placeholder={t('sellerOnboarding.enterTaxId')}
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('sellerOnboarding.businessDescription')}
                </label>
                <textarea
                  name="businessDescription"
                  placeholder={t('sellerOnboarding.enterBusinessDescription')}
                  value={formData.businessDescription}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  required
                />
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                  required
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                  {t('sellerOnboarding.agreeTerms')}{' '}
                  <Link to="/terms" className="text-primary-600 hover:underline">
                    {t('sellerOnboarding.termsOfService')}
                  </Link>{' '}
                  {t('sellerOnboarding.and')}{' '}
                  <Link to="/seller-policy" className="text-primary-600 hover:underline">
                    {t('sellerOnboarding.sellerPolicy')}
                  </Link>
                </label>
              </div>
              
              <Button type="submit" fullWidth loading={loading}>
                {t('sellerOnboarding.submitApplication')}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
