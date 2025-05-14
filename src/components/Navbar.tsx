import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const logoImgStyle = {
  height: '50px',
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Logo on the Left */}
        <Link to="/dashboard" className="flex items-center">
          <img
            src="https://img10.hotstar.com/image/upload/f_auto,h_156/sources/r1/cms/prod/2770/1738140262770-t"
            alt="Logo"
            style={logoImgStyle}
          />
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden absolute right-4">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="font-medium hover:text-primary transition-colors">
            About Us
          </Link>
          <Link to="/wedding-halls" className="font-medium hover:text-primary transition-colors">
            Wedding Halls
          </Link>
          <Link to="/photography" className="font-medium hover:text-primary transition-colors">
            Photography
          </Link>
          <Link to="/decors" className="font-medium hover:text-primary transition-colors">
            Decors
          </Link>
          <Link to="/catering" className="font-medium hover:text-primary transition-colors">
            Catering
          </Link>
        </div>

        {/* User actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/cart" className="relative hover:text-primary transition-colors">
            <ShoppingCart size={22} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={logout}
            className="hover:text-primary transition-colors"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
          <div className="flex items-center">
            <User size={20} className="mr-2" />
            <span className="text-sm font-medium">{user?.username}</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-6 flex flex-col space-y-6 animate-fade-in">
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-gray-200 pb-2">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-gray-200 pb-2">About Us</Link>
          <Link to="/wedding-halls" onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-gray-200 pb-2">Wedding Halls</Link>
          <Link to="/photography" onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-gray-200 pb-2">Photography</Link>
          <Link to="/decors" onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-gray-200 pb-2">Decors</Link>
          <Link to="/catering" onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-gray-200 pb-2">Catering</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="text-lg font-medium flex items-center border-b border-gray-200 pb-2">
            <ShoppingCart size={20} className="mr-2" />
            Cart
            {items.length > 0 && (
              <span className="ml-2 bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <div className="border-b border-gray-200 pb-2 flex items-center">
            <User size={20} className="mr-2" />
            <span className="text-lg font-medium">{user?.username}</span>
          </div>
          <Button 
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex items-center justify-center"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
