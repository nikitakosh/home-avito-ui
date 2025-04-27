import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, MessageCircle, User, LogOut, PlusCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom mx-auto">
        <div className="flex justify-between items-center py-4 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center text-xl font-bold text-primary-600">
            <ShoppingBag className="h-6 w-6 mr-2" />
            <span>MarketSpace</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Products
            </Link>
            
            {isAuthenticated && (
              <>
                <Link to="/chat" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Chat
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Profile
                </Link>
                {user?.role === 'SELLER' && (
                  <Link 
                    to="/create-product" 
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Sell
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Auth buttons or user menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  Hi, {user?.firstname || 'User'}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  leftIcon={<LogOut className="h-4 w-4" />}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/products" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Products
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/chat" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Chat
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  {user?.role === 'SELLER' && (
                    <Link 
                      to="/create-product" 
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <PlusCircle className="h-5 w-5 mr-2" />
                      Sell
                    </Link>
                  )}
                  <button
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md w-full text-left"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link 
                    to="/login" 
                    className="btn btn-outline w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-primary w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;