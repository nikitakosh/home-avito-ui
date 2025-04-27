import { ProductInfoDto } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: ProductInfoDto[];
  isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading = false }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="card h-full">
            <div className="animate-pulse">
              <div className="aspect-video w-full bg-gray-300 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-5 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-4">No products found</h3>
        <p className="text-gray-500">
          We couldn't find any products matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;