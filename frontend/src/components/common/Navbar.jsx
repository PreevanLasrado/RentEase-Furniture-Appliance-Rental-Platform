import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { PiArmchairFill } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass' : 'py-5 bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/30 border border-red-500/20 group-hover:scale-105 transition-transform duration-300">
            R
          </div>
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-gray-900">Rent</span>
            <span className="text-primary">Ease</span>
          </span>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search furniture, appliances..."
              className="w-full py-2.5 pl-12 pr-4 rounded-full bg-gray-100/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 shadow-sm group-hover:shadow-md"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
          <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors">Furniture & Appliances</a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About Us</a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact Us</a>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-primary" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          <button className="hidden md:flex items-center gap-2 bg-gray-900 hover:bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
            <User className="w-4 h-4" />
            Login / Signup
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-gray-200 mt-3 absolute w-full overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <a href="#" className="py-2 text-gray-800 font-medium border-b border-gray-100">Home</a>
              <a href="#categories" className="py-2 text-gray-800 font-medium border-b border-gray-100">Furniture & Appliances</a>
              <a href="#about" className="py-2 text-gray-800 font-medium border-b border-gray-100">About Us</a>
              <a href="#contact" className="py-2 text-gray-800 font-medium mb-2">Contact Us</a>
              <button className="w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                <User className="w-5 h-5" />
                Login / Signup
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
