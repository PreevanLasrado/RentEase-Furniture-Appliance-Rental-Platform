import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';

const WishlistButton = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const active = isInWishlist(product.id || product._id);

  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation(); // prevent opening modal/details page
        toggleWishlist(product);
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg cursor-pointer transition-shadow focus:outline-none"
    >
      <Heart
        className={`w-4 h-4 transition-colors duration-300 ${
          active ? 'fill-[#E53935] text-[#E53935]' : 'text-gray-400 hover:text-[#E53935]'
        }`}
      />
    </motion.button>
  );
};

export default WishlistButton;
