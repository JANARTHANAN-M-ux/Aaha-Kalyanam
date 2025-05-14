import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-orange-200 via-yellow-50 to-orange-50 text-gray-800 py-12 border-t border-orange-200 shadow-inner">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-extrabold font-playfair mb-3 tracking-wide text-orange-800">
              <span className="text-black">AAHA</span>{' '}
              <span className="text-orange-700">KALYANAM</span>
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your premier wedding planning service, creating unforgettable moments that last a lifetime.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-800 transition duration-300"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-800 transition duration-300"
              >
                <Facebook size={22} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-800 transition duration-300"
              >
                <Twitter size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-center md:ml-6">
            <h4 className="text-lg font-bold mb-4 text-orange-800 underline decoration-wavy underline-offset-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-700 font-medium">
              {[
                { path: "/about", label: "About Us" },
                { path: "/wedding-halls", label: "Wedding Halls" },
                { path: "/photography", label: "Photography" },
                { path: "/decors", label: "Decors" },
                { path: "/catering", label: "Catering" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-orange-700 transition duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4 text-orange-800 underline decoration-dotted underline-offset-4">
              Contact Us
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                📍 123 Wedding Street, Chennai
              </li>
              <li className="flex items-center gap-2">
                📫 Tamil Nadu, India - 600001
              </li>
              <li className="flex items-center gap-2">
                📞 +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                ✉️ info@aahakalyanam.com
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-orange-200 mt-10 pt-6 text-center text-sm text-gray-600">
          <p>
            © {currentYear}{' '}
            <span className="font-semibold text-orange-700">AAHA KALYANAM</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
