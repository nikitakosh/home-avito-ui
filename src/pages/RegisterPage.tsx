import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { RegisterRequest, UserRole } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch 
  } = useForm<RegisterRequest>({
    defaultValues: {
      role: UserRole.BUYER
    }
  });
  
  const password = watch('password');

  const onSubmit = async (data: RegisterRequest) => {
    setIsLoading(true);
    setRegisterError(null);
    
    try {
      await registerUser(data);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError('Registration failed. Please try again or use a different email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600">Join MarketSpace today</p>
        </div>
        
        {registerError && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{registerError}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                id="firstname"
                placeholder="John"
                leftIcon={<User className="h-5 w-5" />}
                error={errors.firstname?.message}
                {...register('firstname', { 
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name is too short'
                  }
                })}
              />
              
              <Input
                label="Last Name"
                type="text"
                id="lastname"
                placeholder="Doe"
                leftIcon={<User className="h-5 w-5" />}
                error={errors.lastname?.message}
                {...register('lastname', { 
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name is too short'
                  }
                })}
              />
            </div>
            
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
              autoComplete="new-password"
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
            
            <Select
              label="I want to"
              id="role"
              options={[
                { value: UserRole.BUYER, label: 'Buy Products' },
                { value: UserRole.SELLER, label: 'Sell Products' },
              ]}
              error={errors.role?.message}
              {...register('role', { 
                required: 'Please select a role' 
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Already have an account?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isLoading}
            leftIcon={<UserPlus className="h-5 w-5" />}
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;