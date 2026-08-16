import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <img
              src="https://i.postimg.cc/dVMwGzsY/Burumal-logo.jpg"
              alt="BURUMAL"
              className="h-20 w-20 rounded-full object-cover mb-4"
            />
            <p className="text-gray-400 text-sm">
              {t('home.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition-colors">
                  {t('nav.search')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">
                  {t('footer.categories')}
                </Link>
              </li>
              <li>
                <Link to="/sellers" className="hover:text-white transition-colors">
                  {t('home.verifiedSellers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.customerService')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  {t('footer.helpCenter')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white transition-colors">
                  {t('footer.shippingInfo')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white transition-colors">
                  {t('footer.returns')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  {t('footer.termsOfService')}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  {t('footer.cookiePolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            <Link to="/admin-super/dashboard" className="hover:text-white transition-colors cursor-pointer">
              &copy;
            </Link>{' '}
            {new Date().getFullYear()} BURUMAL. {t('footer.allRightsReserved')}
          </p>
          <p className="mt-2">{t('footer.madeWithLove')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
