import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductCard from '../components/products/ProductCard';
import ProductDetailsModal from '../components/products/ProductDetailsModal';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
  const { user } = useAuth();
  const { wishlistItems, loading, fetchWishlist } = useWishlist();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Authentication check and fetch wishlist
  useEffect(() => {
    if (!user) {
      navigate('/', { state: { openLogin: true } });
    } else {
      fetchWishlist();
    }
  }, [user, navigate, fetchWishlist]);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col font-sans text-[#1F1F1F]">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-6 md:px-18 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 flex items-center gap-3">
                My Wishlist <Heart className="w-8 h-8 text-[#E53935] fill-[#E53935]" />
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Manage your saved premium products and rent them anytime
              </p>
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white py-2.5 px-5 rounded-full border border-gray-100 shadow-xs">
              Home / Wishlist
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-gray-500 font-semibold mt-4">Loading your wishlist...</p>
            </div>
          ) : wishlistItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xl max-w-xl mx-auto space-y-6"
            >
              <div className="w-20 h-20 bg-rose-50 text-[#E53935] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Heart className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-gray-900">Your Wishlist is Empty</h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Explore our premium furniture and appliance collections to add items you love.
                </p>
              </div>
              <button
                onClick={() => navigate('/furniture-appliances')}
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-primary text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full"
            >
              <AnimatePresence mode="popLayout">
                {wishlistItems.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <ProductCard
                      product={product}
                      onViewDetails={handleOpenDetails}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />

      {/* Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Wishlist;
