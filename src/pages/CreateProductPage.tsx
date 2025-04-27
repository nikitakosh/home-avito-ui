import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { ProductSaveRequestDto, ProductCategory } from '../types';
import productService from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';

const CreateProductPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ProductSaveRequestDto>({
    defaultValues: {
      category: ProductCategory.ELECTRONICS,
    }
  });

  // Redirect if not a seller
  if (user && user.role !== 'SELLER') {
    navigate('/profile');
    return null;
  }

  const onSubmit = async (data: ProductSaveRequestDto) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Add current date
      const productData = {
        ...data,
        dateCreate: new Date().toISOString(),
      };
      
      await productService.createProduct(productData);
      navigate('/profile');
    } catch (error) {
      console.error('Failed to create product:', error);
      setError('Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-6">Create New Listing</h1>
          
          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <Input
                label="Title"
                placeholder="Enter product title"
                error={errors.title?.message}
                {...register('title', { 
                  required: 'Title is required',
                  minLength: {
                    value: 3,
                    message: 'Title must be at least 3 characters'
                  }
                })}
              />
              
              <Textarea
                label="Description"
                placeholder="Describe your product in detail"
                rows={5}
                error={errors.description?.message}
                {...register('description', { 
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters'
                  }
                })}
              />
              
              <Input
                label="Price"
                type="number"
                placeholder="Enter price"
                error={errors.price?.message}
                {...register('price', { 
                  required: 'Price is required',
                  min: {
                    value: 1,
                    message: 'Price must be greater than 0'
                  },
                  valueAsNumber: true
                })}
              />
              
              <Select
                label="Category"
                options={Object.values(ProductCategory).map(category => ({
                  value: category,
                  label: category.charAt(0) + category.slice(1).toLowerCase().replace('_', ' ')
                }))}
                error={errors.category?.message}
                {...register('category', { 
                  required: 'Category is required' 
                })}
              />
              
              <Input
                label="Location"
                placeholder="Enter location (e.g., New York, NY)"
                error={errors.location?.message}
                {...register('location', { 
                  required: 'Location is required' 
                })}
              />
              
              <Input
                label="Image URL"
                placeholder="Enter URL for product image"
                error={errors.imageUrl?.message}
                {...register('imageUrl', { 
                  required: 'Image URL is required',
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                    message: 'Please enter a valid URL'
                  }
                })}
              />
              
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                >
                  Create Listing
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;