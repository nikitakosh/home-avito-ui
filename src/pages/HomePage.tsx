import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductInfoDto, ProductCategory } from '../types';
import { ShoppingBag, MessageCircle, Search, ArrowRight, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductGrid from '../components/products/ProductGrid';
import productService from '../services/productService';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductInfoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await productService.getAllProducts();
        setFeaturedProducts(products.slice(0, 8));
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10" />
        <div className="container-custom relative">
          <div className="flex flex-col md:flex-row items-center py-20 md:py-32">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                Find Your Next Great Deal
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                Discover unique items, connect with sellers, and find exactly what you're looking for in our marketplace.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                    leftIcon={<ShoppingBag className="h-4 w-4" />}
                  >
                    Start Shopping
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary-600 text-primary-600 hover:bg-primary-50"
                  >
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-xl opacity-20" />
                <img 
                  src="https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Marketplace"
                  className="relative rounded-xl shadow-2xl max-w-full h-auto transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category shortcuts */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <Link 
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 group"
            >
              View All Categories
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.values(ProductCategory).map((category) => (
              <Link 
                key={category} 
                to={`/products?category=${category}`}
                className="group p-6 text-center rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="mb-4 text-primary-500 flex justify-center">
                  <div className="p-3 rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors">
                    <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link 
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 group"
            >
              View All Products
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} isLoading={isLoading} />
        </div>
      </section>

      {/* Features section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 text-center rounded-xl hover:shadow-lg transition-all duration-300 bg-white">
              <div className="mb-6 text-primary-500 flex justify-center">
                <div className="p-4 rounded-full bg-primary-50">
                  <ShoppingBag className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Wide Selection</h3>
              <p className="text-gray-600">
                Find everything you need in one place, from everyday essentials to unique finds.
              </p>
            </div>
            <div className="p-8 text-center rounded-xl hover:shadow-lg transition-all duration-300 bg-white">
              <div className="mb-6 text-primary-500 flex justify-center">
                <div className="p-4 rounded-full bg-primary-50">
                  <MessageCircle className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Easy Communication</h3>
              <p className="text-gray-600">
                Chat directly with sellers to get more information or negotiate prices.
              </p>
            </div>
            <div className="p-8 text-center rounded-xl hover:shadow-lg transition-all duration-300 bg-white">
              <div className="mb-6 text-primary-500 flex justify-center">
                <div className="p-4 rounded-full bg-primary-50">
                  <Search className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Smart Search</h3>
              <p className="text-gray-600">
                Find exactly what you're looking for with our powerful search and filtering tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;