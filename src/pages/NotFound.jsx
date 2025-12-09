import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-emerald-600 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Page not found
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate('/', { replace: true })}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
          >
            <Home className="h-5 w-5" />
            Go Home
          </button>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
