import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, User, ArrowLeft, MessageCircle, UserPlus } from 'lucide-react';
import { ProductGetByIdResponseDto, OwnerInfoDto } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import productService from '../services/productService';
import profileService from '../services/profileService';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, refreshUserInfo } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductGetByIdResponseDto | null>(null);
  const [owner, setOwner] = useState<OwnerInfoDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingFriend, setIsAddingFriend] = useState(false);

  const isFriend = user?.friends.some(friend => friend.id === owner?.id);
  const isCurrentUserOwner = user && owner && user.id === owner.id;

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const productId = parseInt(id, 10);
        const [productData, ownerData] = await Promise.all([
          productService.getProductById(productId),
          productService.getProductOwner(productId),
        ]);
        
        setProduct(productData);
        setOwner(ownerData);
      } catch (error) {
        console.error('Failed to load product:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddFriend = async () => {
    if (!owner) return;
    
    setIsAddingFriend(true);
    try {
      await profileService.addFriend(owner.id);
      await refreshUserInfo();
      // Show success message or feedback
    } catch (error) {
      console.error('Failed to add friend:', error);
      setError('Failed to add friend. Please try again.');
    } finally {
      setIsAddingFriend(false);
    }
  };

  const handleContactClick = () => {
    if (owner) {
      navigate(`/chat/${owner.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-8">
        <div className="bg-error-50 border border-error-200 text-error-700 p-4 rounded-md mb-6">
          <p>{error || 'Product not found'}</p>
        </div>
        <Link to="/products">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link to="/products">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to Products
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Image */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={product.imageUrl || 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'}
              alt={product.title}
              className="w-full h-auto object-cover aspect-video"
            />
            
            <div className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span>Posted {formatDate(product.dateCreate)}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-primary-600">
                  {formatCurrency(product.price)}
                </span>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seller Information */}
        {owner && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold mr-4">
                  {owner.firstname.charAt(0)}{owner.lastname.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{owner.firstname} {owner.lastname}</h3>
                  <p className="text-sm text-gray-600">{owner.email}</p>
                </div>
              </div>
              
              {/* Contact buttons */}
              {isCurrentUserOwner ? (
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-gray-600">This is your product</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {!isFriend && (
                    <Button 
                      variant="outline" 
                      fullWidth
                      leftIcon={<UserPlus className="h-5 w-5" />}
                      onClick={handleAddFriend}
                      isLoading={isAddingFriend}
                    >
                      Add to Friends
                    </Button>
                  )}
                  <Button 
                    variant="primary" 
                    fullWidth
                    leftIcon={<MessageCircle className="h-5 w-5" />}
                    onClick={handleContactClick}
                    disabled={!isFriend}
                  >
                    {isFriend ? 'Send Message' : 'Add as friend to message'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;