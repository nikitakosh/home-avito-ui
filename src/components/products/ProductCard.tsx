import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { ProductInfoDto } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ProductCardProps {
  product: ProductInfoDto;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product.id}`} className="card h-full transform transition hover:scale-[1.02]">
      <div className="relative">
        <div className="aspect-video w-full bg-gray-200 overflow-hidden">
          <img 
            src={product.imageUrl || 'https://www.completo.ru/upload/medialibrary/468/4684ddc20ba9e96620825fb3b525f36f.png'} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{product.location}</span>
        </div>
        
        <div className="mt-2">
          <span className="text-lg font-semibold text-primary-600">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;