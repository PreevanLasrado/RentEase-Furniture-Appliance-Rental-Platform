import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-6 bg-white rounded-[32px] border border-gray-150/80 shadow-md max-w-2xl mx-auto"
    >
      {/* Animated Icon Circle */}
      <div className="relative">
        <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl animate-pulse" />
        <div className="bg-primary/5 text-primary p-8 rounded-full relative z-10">
          <ShoppingCart className="w-16 h-16 stroke-[1.5]" />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-2xl font-black text-gray-900">
          Your Cart is Empty
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Looks like you haven't added anything to your rental cart yet. Explore our premium appliances and furniture catalogues to upgrade your home today.
        </p>
      </div>

      <div className="pt-2">
        <motion.button
          onClick={() => navigate('/furniture-appliances')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          Browse Products
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EmptyCart;
