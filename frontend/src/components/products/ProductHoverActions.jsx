import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductHoverActions = ({ onViewDetails, onAddToCart, isHovered, isOutOfStock }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex items-center gap-3 w-full ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails();
        }}
        className="flex-1 py-3 px-4 text-[13px] md:text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 hover:bg-[#E53935] hover:text-white hover:border-[#E53935] hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer text-center"
      >
        View Details
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isOutOfStock) onAddToCart();
        }}
        disabled={isOutOfStock}
        className={`flex-1 py-3 px-4 text-[13px] md:text-sm font-semibold rounded-full border border-gray-200 shadow-sm flex items-center justify-center gap-1.5 transition-all duration-300 ${
          isOutOfStock
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            : 'bg-white text-gray-800 hover:bg-[#E53935] hover:text-white hover:border-[#E53935] hover:-translate-y-0.5 hover:shadow-md cursor-pointer'
        }`}
      >
        <ShoppingCart className="w-4 h-4" />
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </motion.div>
  );
};

export default ProductHoverActions;
