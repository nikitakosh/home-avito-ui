import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductInfoDto, ProductCategory } from '../types';
import { Search } from 'lucide-react';
import productService from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductInfoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc'>('price_asc');

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await productService.getAllProducts();
        let filteredProducts = [...allProducts];

        // Apply search filter
        if (searchQuery) {
          filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Apply sorting
        filteredProducts.sort((a, b) => {
          switch (sortBy) {
            case 'price_asc':
              return a.price - b.price;
            case 'price_desc':
              return b.price - a.price;
            default:
              return 0;
          }
        });

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [searchQuery, sortBy]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            Browse Products
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              options={[
                { value: 'price_asc', label: 'Price: Low to High' },
                { value: 'price_desc', label: 'Price: High to Low' }
              ]}
            />
          </div>
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner size="large" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="mb-6 flex justify-center">
              <div className="p-4 rounded-full bg-primary-50">
                <Search className="h-12 w-12 text-primary-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;