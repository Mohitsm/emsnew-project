import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 text-center max-w-md w-full border border-gray-100 dark:border-gray-800">
        
        <div className="flex justify-center mb-4">
          <div className="bg-emerald-100 dark:bg-emerald-900/40 p-4 rounded-full">
            <AlertTriangle className="h-10 w-10 text-emerald-600" />
          </div>
        </div>

        <h1 className="text-8xl font-extrabold text-emerald-600 tracking-tight">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/", { replace: true })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Home className="h-5 w-5" />
            Go Home
          </button>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
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
