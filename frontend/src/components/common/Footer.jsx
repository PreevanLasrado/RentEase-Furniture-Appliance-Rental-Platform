import React from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-primary-dark/40 pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer w-fit">
              <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg group-hover:-translate-y-0.5 transition-transform duration-300">
                <rect width="40" height="40" rx="12" className="fill-gray-800" />
                <path d="M14 27V13H21.5C24.5376 13 27 15.4624 27 18.5C27 21.5376 24.5376 24 21.5 24H18V27" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 24L26 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M40 12C33.3726 12 28 6.62742 28 0H40V12Z" className="fill-primary" />
              </svg>
              <span className="text-3xl font-extrabold tracking-tight">
                <span className="text-white">Rent</span>
                <span className="text-primary">Ease</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Upgrade your lifestyle with premium furniture and appliance rentals. Affordable, flexible, and delivered to your doorstep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-gray-300 hover:text-white">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-gray-300 hover:text-white">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-gray-300 hover:text-white">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-gray-300 hover:text-white">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'How It Works', 'Pricing', 'FAQs'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm">
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">Categories</h3>
            <ul className="space-y-3">
              {['Living Room', 'Bedroom', 'Kitchen Appliances', 'Office Furniture', 'Fitness Equipment'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm">
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest offers and updates.</p>
            <div className="relative mb-8 group">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary-light rounded-md transition-colors">
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@rentease.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Tech Avenue, Silicon Valley</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} RentEase. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
