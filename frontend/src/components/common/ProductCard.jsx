import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
          <Heart className="w-5 h-5" />
        </button>
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {product.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400 ml-1">(120 reviews)</span>
        </div>

        <div className="flex items-end justify-between mt-6">
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Monthly Rent</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">${product.monthlyRent}</span>
              <span className="text-sm text-gray-500 font-medium">/mo</span>
            </div>
          </div>
          
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 group-hover:bg-primary group-hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
