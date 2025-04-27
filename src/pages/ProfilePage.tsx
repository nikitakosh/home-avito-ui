import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserCircle, Edit2, Check, X, ShoppingBag, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UpdateProfileInfoDto, UserRole } from '../types';
import profileService from '../services/profileService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProfilePage = () => {
  const { user, refreshUserInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<UpdateProfileInfoDto>();

  useEffect(() => {
    if (user) {
      reset({
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role as UserRole,
      });
    }
  }, [user, reset, isEditing]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const onSubmit = async (data: UpdateProfileInfoDto) => {
    if (!user) return;
    
    setIsUpdating(true);
    setUpdateError(null);
    
    try {
      await profileService.updateProfile(user.id, data);
      await refreshUserInfo();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setUpdateError('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            My Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Profile Information</h2>
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-primary-600 hover:text-primary-700"
                    leftIcon={<Edit2 className="h-4 w-4" />}
                  >
                    Edit
                  </Button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  {updateError && (
                    <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg relative mb-6">
                      <span className="block sm:inline">{updateError}</span>
                    </div>
                  )}

                  <div className="mb-6">
                    <Input
                      label="First Name"
                      id="firstname"
                      error={errors.firstname?.message}
                      {...register('firstname', {
                        required: 'First name is required',
                      })}
                    />
                  </div>

                  <div className="mb-6">
                    <Input
                      label="Last Name"
                      id="lastname"
                      error={errors.lastname?.message}
                      {...register('lastname', {
                        required: 'Last name is required',
                      })}
                    />
                  </div>

                  <div className="mb-8">
                    <Select
                      label="Role"
                      id="role"
                      options={[
                        { value: UserRole.BUYER, label: 'Buyer' },
                        { value: UserRole.SELLER, label: 'Seller' },
                      ]}
                      error={errors.role?.message}
                      {...register('role')}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                      isLoading={isUpdating}
                      leftIcon={<Check className="h-4 w-4" />}
                    >
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      leftIcon={<X className="h-4 w-4" />}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-xl opacity-20" />
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-3xl font-semibold text-primary-600">
                        {user.firstname.charAt(0)}{user.lastname.charAt(0)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="text-lg font-medium text-gray-900">
                      {user.firstname} {user.lastname}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-lg font-medium text-gray-900">{user.email}</p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Role</h3>
                    <p className="text-lg font-medium text-gray-900 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">My Products</h2>
                <Link to="/create-product">
                  <Button
                    variant="primary"
                    className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                    leftIcon={<ShoppingBag className="h-4 w-4" />}
                  >
                    Create Product
                  </Button>
                </Link>
              </div>

              {user.products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-full bg-primary-50">
                      <ShoppingBag className="h-12 w-12 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Yet</h3>
                  <p className="text-gray-600 mb-6">Start by creating your first product listing</p>
                  <Link to="/create-product">
                    <Button
                      variant="outline"
                      className="border-primary-600 text-primary-600 hover:bg-primary-50"
                      leftIcon={<ShoppingBag className="h-4 w-4" />}
                    >
                      Create Your First Product
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;