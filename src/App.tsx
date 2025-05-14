
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import WeddingHalls from "./pages/WeddingHalls";
import Photography from "./pages/Photography";
import Decors from "./pages/Decors";
import Catering from "./pages/Catering";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Private route component
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  // Check if user is logged in (simplified version, would typically use a proper auth check)
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="/about" element={<PrivateRoute element={<AboutUs />} />} />
              <Route path="/wedding-halls" element={<PrivateRoute element={<WeddingHalls />} />} />
              <Route path="/photography" element={<PrivateRoute element={<Photography />} />} />
              <Route path="/decors" element={<PrivateRoute element={<Decors />} />} />
              <Route path="/catering" element={<PrivateRoute element={<Catering />} />} />
              <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
              <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
