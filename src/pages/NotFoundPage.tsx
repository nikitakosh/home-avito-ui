import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-300">404</h1>
        <h2 className="text-3xl font-semibold mt-6 mb-3">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button 
            variant="primary" 
            size="lg"
            leftIcon={<ArrowLeft className="h-5 w-5" />}
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;