import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ChatProvider } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';

const Layout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {isAuthenticated ? (
          <ChatProvider>
            <Outlet />
          </ChatProvider>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;