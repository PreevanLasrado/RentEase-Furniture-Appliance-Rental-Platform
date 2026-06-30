import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stockStatus === 'Out of Stock' || (product.stock !== undefined ? product.stock <= 0 : false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >

      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden bg-gray-100">

        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={product.image || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* CATEGORY */}
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {product.category}
        </div>

        {/* OUT OF STOCK BADGE */}
        {isOutOfStock && (
          <div className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase z-10">
            Out of Stock
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* TOP */}
        <div className="flex items-start justify-between gap-4">

          {/* LEFT */}
          <div>

            {/* TITLE */}
            <h3 className="text-lg mb-2 font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* RATING */}
            <div className="flex items-center mt-1 gap-1">

              <Star className="w-4 h-4 mt-0.5 fill-amber-400 text-amber-400" />

              <span className="text-sm font-semibold text-gray-700">
                {product.rating}
              </span>

              <span className="text-sm text-gray-400 ml-1">
                (120 reviews)
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right shrink-0 flex flex-col items-end">

            {/* MONTHLY RENT */}
            <p className="text-[10px] text-gray-500 font-medium mt-1 mb-2 uppercase tracking-wider">Monthly Rent</p>

            {/* PRICE */}
            <div className="flex items-end justify-end gap-1 w-full">
              <span className="text-xl font-bold text-gray-900 leading-none">₹{product.monthlyRent}</span>
              <span className="text-sm text-gray-500 font-medium">/mo</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;