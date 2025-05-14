
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-4 text-primary">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-500 mb-8">
          The page might have been removed or you might have mistyped the URL.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
