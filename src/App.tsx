import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const CreateProductPage = lazy(() => import('./pages/CreateProductPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><LoadingSpinner size="large" /></div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route path="register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/:userId" element={<ChatPage />} />
            <Route path="create-product" element={<CreateProductPage />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;