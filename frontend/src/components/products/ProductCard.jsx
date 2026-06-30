import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import WishlistButton from './WishlistButton';
import ProductHoverActions from './ProductHoverActions';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-[460px] md:h-[400px]"
    >
      {/* Top Image Section */}
      <div className="relative h-64 overflow-hidden rounded-t-3xl bg-gray-50 flex items-center justify-center">
        <img
          src={product.image || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge (Top-Left) */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#2E3440]/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Wishlist Heart Icon (Top-Right) */}
        <div className="absolute top-4 right-4 z-10">
          <WishlistButton product={product} className="h-6 w-6 z-20" />
        </div>
      </div>

      {/* Product Content Section */}
      <div className="p-5 flex-1 flex flex-col -mb-2">
        {/* Name and Price Row */}
        <div>
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-extrabold text-lg text-gray-900 leading-snug line-clamp-2 w-2/3 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rent pricing right-aligned */}
            <div className="text-right w-1/3 flex flex-col justify-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Monthly Rent</span>
              <span className="text-xl font-black text-gray-900 mt-0.5">
                ₹{product.monthlyRent}
                <span className="text-xs font-semibold text-gray-500">/mo</span>
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500 gap-0.5">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold text-gray-800">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">({product.reviewsCount || 42} reviews)</span>
          </div>
        </div>

        {/* Bottom Actions section */}
        {/* We keep space for the buttons to avoid layout shifts.
            We transition between the stock/delivery label and buttons on hover! */}
        <div className="relative h-14 mt-3 flex items-center">
          {/* Default details (Stock / Delivery) */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.25 }}
            className={`w-full flex justify-between items-center text-xs font-bold text-gray-500 ${isHovered ? 'pointer-events-none' : 'pointer-events-auto'
              }`}
          >
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-gray-700">
                {product.availability ? '🟢 In Stock' : '🔴 Out of Stock'}
              </span>
            </div>
            <span className="text-gray-400">Delivered in {product.deliveryTime}</span>
          </motion.div>

          {/* Hover Buttons */}
          <div className="absolute inset-0 flex items-center">
            <ProductHoverActions
              isHovered={isHovered}
              onViewDetails={() => onViewDetails(product)}
              onAddToCart={() => addToCart(product, 1, 12)}
              isOutOfStock={!product.availability || product.stock <= 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
