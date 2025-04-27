import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center text-xl font-bold text-white mb-4">
              <ShoppingBag className="h-6 w-6 mr-2" />
              <span>MarketSpace</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Your one-stop marketplace for buying and selling products. Connect with
              others and find what you need.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-400 hover:text-white transition-colors">
                  Messages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=ELECTRONICS" className="text-gray-400 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=VEHICLES" className="text-gray-400 hover:text-white transition-colors">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link to="/products?category=PROPERTIES" className="text-gray-400 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/products?category=JOBS" className="text-gray-400 hover:text-white transition-colors">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Market Street, City</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@marketspace.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} MarketSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;