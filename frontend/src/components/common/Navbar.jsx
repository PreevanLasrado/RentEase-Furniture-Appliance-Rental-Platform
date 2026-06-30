import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, LogOut, ChevronDown, Calendar, Heart, Package, LayoutDashboard } from 'lucide-react';
import { PiArmchairFill } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from '../auth/AuthModal';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { fetchProducts } from '../../services/productService';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
  const searchContainerRef = useRef(null);
  const mobileSearchContainerRef = useRef(null);

  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  // Load products on mount for search suggestions
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (error) {
        console.error('Failed to load products in Navbar:', error);
      }
    };
    loadProducts();
  }, []);

  // Filter search suggestions based on query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchSuggestions([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const matches = allProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    ).slice(0, 5);
    setSearchSuggestions(matches);
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (mobileSearchContainerRef.current && !mobileSearchContainerRef.current.contains(event.target)) {
        setShowMobileSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setShowMobileSuggestions(false);
      setIsMobileMenuOpen(false);
      navigate('/furniture-appliances', { state: { searchQuery: searchQuery.trim() } });
    }
  };

  const handleSuggestionClick = (product) => {
    setShowSuggestions(false);
    setShowMobileSuggestions(false);
    setIsMobileMenuOpen(false);
    setSearchQuery('');
    navigate('/furniture-appliances', { state: { openProduct: product } });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass' : 'py-5 bg-transparent'
        }`}
    >
      <div className="container mx-auto px-18 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer w-fit">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg group-hover:-translate-y-0.5 transition-transform duration-300">
            <rect width="40" height="40" rx="13" className="fill-gray-800" />
            <path d="M14 27V13H21.5C24.5376 13 27 15.4624 27 18.5C27 21.5376 24.5376 24 21.5 24H18V27" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 24L26 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 12C33.3726 12 28 6.62742 28 0H40V12Z" className="fill-primary" />
          </svg>
          <span className="text-3xl font-black tracking-tight">
            <span className="text-gray-900">Rent</span>
            <span className="text-primary">Ease</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8" ref={searchContainerRef}>
          <form onSubmit={handleSearchSubmit} className="relative w-full group">
            <input
              type="text"
              placeholder="Search furniture, appliances..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full py-2.5 pl-12 pr-4 rounded-full bg-gray-100/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 shadow-sm group-hover:shadow-md text-sm font-semibold"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-primary transition-colors cursor-pointer" onClick={handleSearchSubmit} />

            {/* Desktop Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-50 left-0 right-0 top-[110%] bg-white border border-gray-150 rounded-2xl shadow-xl overflow-hidden py-1.5"
                >
                  {searchSuggestions.map((product) => (
                    <div
                      key={product._id || product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100'}
                        alt={product.name}
                        className="w-8 h-8 rounded-lg object-cover bg-gray-50 border border-gray-100 flex-shrink-0"
                      />
                      <div className="flex-grow min-w-0 text-left">
                        <p className="text-xs font-bold text-gray-800 truncate">{product.name}</p>
                        <p className="text-[9px] text-gray-450 font-bold uppercase tracking-wider mt-0.5">{product.category}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/furniture-appliances" className="text-sm font-medium hover:text-primary transition-colors">Furniture & Appliances</Link>
          <Link to="/aboutus" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
          <Link to="/contact-us" className="text-sm font-medium hover:text-primary transition-colors">Contact Us</Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {user && wishlistCount > 0 && (
            <Link to="/wishlist" className="relative p-2 rounded-full transition-colors group block" title="View Wishlist">
              <Heart className="w-6 h-6 text-gray-700 group-hover:text-[#E53935] group-hover:fill-[#E53935] transition-colors" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#E53935] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {wishlistCount}
              </span>
            </Link>
          )}

          <Link to="/cart" className="relative p-2 rounded-full transition-colors group block" title="View Cart">
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-primary" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                  {user.fullName.charAt(0)}
                </div>
                <span className="font-semibold text-sm text-gray-800">{user.fullName.split(' ')[0]}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                  >
                    {/* User Header */}
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Account</p>
                      <p className="font-bold text-gray-800 text-sm truncate mt-0.5">{user.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {/* Dropdown Items */}
                    <div className="p-1">
                      <Link
                        to="/my-orders"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:text-primary hover:bg-primary/5 transition-all text-sm font-semibold cursor-pointer group"
                      >
                        <Package className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                        My Orders
                      </Link>

                       <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:text-primary hover:bg-primary/5 transition-all text-sm font-semibold cursor-pointer group"
                      >
                        <User className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                        Profile
                      </Link>

                      {user && user.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-primary bg-primary/5 hover:bg-primary/10 transition-all text-sm font-bold cursor-pointer group"
                        >
                          <LayoutDashboard className="w-4.5 h-4.5 text-primary" />
                          Admin Dashboard
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-gray-50 p-1">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-all text-sm font-bold cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden md:flex items-center gap-2 bg-gray-900 hover:bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <User className="w-4 h-4" />
              Login / Signup
            </button>
          )}

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
              <div className="relative w-full" ref={mobileSearchContainerRef}>
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowMobileSuggestions(true);
                    }}
                    onFocus={() => setShowMobileSuggestions(true)}
                    className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-primary text-sm font-semibold"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer" onClick={handleSearchSubmit} />
                </form>

                {/* Mobile Suggestions Dropdown */}
                <AnimatePresence>
                  {showMobileSuggestions && searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-50 left-0 right-0 top-[105%] bg-white border border-gray-150 rounded-xl shadow-lg overflow-hidden py-1"
                    >
                      {searchSuggestions.map((product) => (
                        <div
                          key={product._id || product.id}
                          onClick={() => handleSuggestionClick(product)}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors"
                        >
                          <img
                            src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100'}
                            alt={product.name}
                            className="w-7 h-7 rounded-md object-cover bg-gray-50 border border-gray-100 flex-shrink-0"
                          />
                          <div className="flex-grow min-w-0 text-left">
                            <p className="text-xs font-bold text-gray-800 truncate">{product.name}</p>
                            <p className="text-[9px] text-gray-450 font-bold uppercase tracking-wider mt-0.5">{product.category}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-800 font-medium border-b border-gray-100">Home</Link>
              <Link to="/furniture-appliances" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-800 font-medium border-b border-gray-100">Furniture & Appliances</Link>
              <Link to="/aboutus" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-800 font-medium border-b border-gray-100">About Us</Link>
              <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-800 font-medium border-b border-gray-100">Contact Us</Link>
              {user && wishlistCount > 0 && (
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-800 font-medium border-b border-gray-100 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#E53935] fill-[#E53935]" />
                  Wishlist ({wishlistCount})
                </Link>
              )}
              {user ? (
                <div className="flex flex-col gap-2 border-t border-gray-100 pt-2">
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {user.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/my-rentals"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 text-gray-700 font-semibold border-b border-gray-100 flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-gray-500" />
                    My Rentals
                  </Link>
                  <Link
                    to="/my-orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 text-gray-700 font-semibold border-b border-gray-100 flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Package className="w-4 h-4 text-gray-500" />
                    My Orders
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 text-gray-700 font-semibold border-b border-gray-100 flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Login / Signup
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
