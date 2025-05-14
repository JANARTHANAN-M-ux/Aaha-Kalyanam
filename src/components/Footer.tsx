
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-darkPurple text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">
              <span className="text-primary">AAHA</span> <span className="text-gold">KALYANAM</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Your premier wedding planning service, creating unforgettable moments for your special day.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/wedding-halls" className="text-gray-300 hover:text-white transition-colors">
                  Wedding Halls
                </Link>
              </li>
              <li>
                <Link to="/photography" className="text-gray-300 hover:text-white transition-colors">
                  Photography
                </Link>
              </li>
              <li>
                <Link to="/decors" className="text-gray-300 hover:text-white transition-colors">
                  Decors
                </Link>
              </li>
              <li>
                <Link to="/catering" className="text-gray-300 hover:text-white transition-colors">
                  Catering
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Wedding Street, Chennai</li>
              <li>Tamil Nadu, India - 600001</li>
              <li>Phone: +91 98765 43210</li>
              <li>Email: info@aahakalyanam.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {currentYear} AAHA KALYANAM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
