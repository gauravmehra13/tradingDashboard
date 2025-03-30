import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-gray-900 dark:text-white">
      <div className="text-center space-y-4">
        <AlertTriangle className="w-16 h-16 mx-auto text-red-500" />
        <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 mt-6 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-4 h-4 mr-2" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
