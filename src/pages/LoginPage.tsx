import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn, Mail, Lock } from 'lucide-react';
import { AuthenticationRequest } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<AuthenticationRequest>();

  const onSubmit = async (data: AuthenticationRequest) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        {loginError && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{loginError}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              id="email"
              autoComplete="email"
              placeholder="your@email.com"
              leftIcon={<Mail className="h-5 w-5" />}
              error={errors.email?.message}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            
            <Input
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              leftIcon={<Lock className="h-5 w-5" />}
              error={errors.password?.message}
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Don't have an account?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isLoading}
            leftIcon={<LogIn className="h-5 w-5" />}
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;