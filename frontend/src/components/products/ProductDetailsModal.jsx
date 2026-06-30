import React, { useState, useEffect } from 'react';
import { X, Calendar, Shield, Truck, ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const ProductDetailsModal = ({ product, isOpen, onClose, isCartView }) => {
  const { addToCart, updateCartItemRent } = useCart();
  const [activeImage, setActiveImage] = useState('');
  const [selectedTenure, setSelectedTenure] = useState(null);

  useEffect(() => {
    if (product) {
      console.log('Product details in modal:', product);
      setActiveImage(product.image || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600');
      // If in cart view, default to the currently selected rent's tenure
      let defaultTenure = null;
      if (isCartView && product.currentMonthlyRent) {
        defaultTenure = product.tenureOptions?.find(opt => opt.rent === product.currentMonthlyRent);
      }
      if (!defaultTenure) {
        defaultTenure = product.tenureOptions?.find(opt => opt.months === 12) || product.tenureOptions?.[0];
      }
      setSelectedTenure(defaultTenure || { months: 12, rent: product.monthlyRent });
    }
  }, [product, isCartView]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, 1, selectedTenure.months);
    onClose();
  };

  const handleConfirmUpdate = () => {
    if (product.cartItemId && selectedTenure) {
      updateCartItemRent(product.cartItemId, selectedTenure.rent);
    }
    onClose();
  };

  const currentIndex = product.images ? product.images.indexOf(activeImage) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = product.images ? currentIndex < product.images.length - 1 : false;

  const handlePrevImage = () => {
    if (hasPrev) {
      setActiveImage(product.images[currentIndex - 1]);
    }
  };

  const handleNextImage = () => {
    if (hasNext) {
      setActiveImage(product.images[currentIndex + 1]);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] md:h-[680px] overflow-y-auto md:overflow-hidden z-10 no-scrollbar flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Images */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-gray-100 md:h-full flex-shrink-0">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="w-full md:w-[480px] h-[280px] md:h-[400px] rounded-3xl overflow-hidden bg-gray-50 flex items-center justify-center relative group/image">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {product.badge && (
                  <span className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10">
                    {product.badge}
                  </span>
                )}

                {/* Left & Right Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      disabled={!hasPrev}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${hasPrev
                        ? 'bg-[#1F1F1F]/80 hover:bg-[#1F1F1F] text-white hover:scale-105 cursor-pointer shadow-md'
                        : 'bg-white/80 text-gray-400 cursor-not-allowed opacity-50 shadow-xs'
                        }`}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      disabled={!hasNext}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${hasNext
                        ? 'bg-[#1F1F1F]/80 hover:bg-[#1F1F1F] text-white hover:scale-105 cursor-pointer shadow-md'
                        : 'bg-white/80 text-gray-400 cursor-not-allowed opacity-50 shadow-xs'
                        }`}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Delivery Info */}
              <div className="p-4 rounded-2xl bg-gray-50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E53935]">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Free Delivery & Assembly</h4>
                  <p className="text-xs text-gray-500 font-medium">Delivered to your room in {product.deliveryTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar md:h-full flex-1">
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{product.category}</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 leading-tight">{product.name}</h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500 gap-0.5">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">({product.reviewsCount} reviews)</span>
                  <span className="text-gray-300">|</span>
                  <span className={`text-xs font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Monthly Rent</p>
                  <p className="text-3xl font-black text-[#E53935] mt-1">
                    ₹{selectedTenure ? selectedTenure.rent : product.monthlyRent}
                    <span className="text-sm font-medium text-gray-500">/mo</span>
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Refundable Deposit</p>
                  <p className="text-lg font-bold text-gray-800 mt-1 flex items-center justify-end gap-1">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    ₹{product.securityDeposit}
                  </p>
                </div>
              </div>

              {/* Tenure Selection or Out of Stock Notification */}
              {!product.availability || product.stock <= 0 ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold flex items-center gap-2">
                  <span className="text-lg">⚠️</span> This item is currently unavailable.
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Select Rental Tenure (Months)
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {product.tenureOptions?.map((option) => (
                      <button
                        key={option.months}
                        onClick={() => setSelectedTenure(option)}
                        className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${selectedTenure?.months === option.months
                          ? 'border-[#E53935] bg-red-50/30 text-[#E53935] font-bold shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600 font-medium'
                          }`}
                      >
                        <p className="text-base">{option.months}</p>
                        <p className="text-[10px] opacity-80 mt-0.5">₹{option.rent}/mo</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium text-justify">{product.description}</p>
              </div>

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2.5">Specifications</h3>
                  <div className="border border-gray-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, val], index) => (
                          <tr
                            key={key}
                            className={`text-xs ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'} border-b border-gray-100 last:border-b-0`}
                          >
                            <td className="p-3 font-bold text-gray-500 w-1/3">{key}</td>
                            <td className="p-3 font-semibold text-gray-800">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            {isCartView ? (
              <div className="mt-8">
                <button
                  onClick={handleConfirmUpdate}
                  className="w-full py-4 px-6 rounded-full bg-[#E53935] hover:bg-[#C62828] font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center"
                >
                  Confirm
                </button>
              </div>
            ) : (
              <div className="mt-8 flex gap-4">
                <button
                  onClick={onClose}
                  className="py-4 px-6 rounded-full border-2 border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors flex-1 text-center cursor-pointer"
                >
                  Close Window
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.availability || product.stock <= 0}
                  className={`py-4 px-6 rounded-full font-bold text-white flex-2 flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${(product.availability && product.stock > 0)
                    ? 'bg-[#E53935] hover:bg-[#C62828] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {(product.availability && product.stock > 0) ? 'Rent Now (Add to Cart)' : 'Out of Stock'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductDetailsModal;
